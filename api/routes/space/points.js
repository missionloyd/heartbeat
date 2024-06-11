const { Router } = require("express");
const { getPoints } = require("../../get_routes/get_points");

const router = Router();

// Get Data points for an asset (default in days)
function pointsRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName, startDate, endDate, dateLevel, isHistoricalIncluded } = req.body;

    let data = [];

    if (!assetName || !startDate || !endDate || !dateLevel) {
      console.log("*** Missing Data (/points) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    let historicalFlag;

    const errorMessage =
      "Value passed in for historical flag is not a boolean string.";

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
      data = {
        points: await getPoints(assetName, startDate, endDate, dateLevel, historicalFlag),
      };
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

module.exports = { pointsRouter };
