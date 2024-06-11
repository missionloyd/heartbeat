const { Router } = require("express");
const { getLatest } = require("../../get_routes/get_latest");
const router = Router();

// Get the latest data in the past 24 hours
function latestRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName, isHistoricalIncluded } = req.body;

    let data = [];

    if (!assetName) {
      console.log("*** Missing Data (/latest) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    let historicalFlag;

    const errorMessage = "Value passed in for historical flag is not a boolean string.";

    try {
      const flag = !isHistoricalIncluded
        ? isHistoricalIncluded
        : isHistoricalIncluded.toLowerCase();

      historicalFlag = eval(flag);

      // After evaluating, outcomes include:
      //  - true/false (YES)
      //  - null/undefined (YES, convert to false)
      //  - evaluatable (NO, throw error)
      //  - unevaluatable (NO, error will be thrown automatically)

      if (historicalFlag === undefined || historicalFlag === null) {
        historicalFlag = false;
      } else if (historicalFlag === true || historicalFlag === false) {
        // GOOD TO GO...
      } else {
        throw errorMessage;
      }
    } catch (error) {
      console.log(errorMessage);

      return res.json({
        data,
        status: "bad",
        message: errorMessage,
      });
    }

    try {
      data = await getLatest(assetName, historicalFlag);
    } catch (error) {
      console.log(error);

      return res.json({
        data: [],
        status: 500,
        message: error,
      });
    }

    return res.json({
      data,
      status: "ok",
    });
  });

  return router;
}

module.exports = { latestRouter };
