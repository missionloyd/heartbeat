const { Router } = require("express");
const { getLatest } = require("../../get_routes/get_latest");
const { returnOrErrorFlag } = require("../../utils/return_or_error_flag");
const router = Router();

// Get the latest data in the past 24 hours
function latestRouter() {
  router.post("/", async (req, res) => {
    const { assetName, isHistoricalIncluded, aggregation, measurementPredictionTypeId = 0 } = req.body;

    let data = [];

    if (!assetName || !aggregation) {
      console.log("*** Missing Data (/latest) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    let historicalFlag;

    try {
      historicalFlag = returnOrErrorFlag(isHistoricalIncluded);
    } catch (error) {
      console.log(error.message);

      return res.json({
        data,
        status: "bad",
        message: error.message,
      });
    }

    try {
      data = await getLatest(assetName, historicalFlag, measurementPredictionTypeId, aggregation);
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
