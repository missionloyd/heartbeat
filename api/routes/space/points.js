const { Router } = require("express");
const { getPoints } = require("../../get_routes/get_points");
const { returnOrErrorFlag } = require("../../utils/return_or_error_flag");

const router = Router();

// Get Data points for an asset (default in days)
function pointsRouter() {
  router.post("/", async (req, res) => {
    const { assetName, startDate, endDate, dateLevel, isHistoricalIncluded, isMeasurementPrediction } = req.body;

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
    let predictionFlag;

    try {
      historicalFlag = returnOrErrorFlag(isHistoricalIncluded);
      predictionFlag = returnOrErrorFlag(isMeasurementPrediction);
    } catch (error) {
      console.log(error.message);

      return res.json({
        data,
        status: "bad",
        message: error.message,
      });
    }

    try {
      data = {
        points: await getPoints(assetName, startDate, endDate, dateLevel, historicalFlag, predictionFlag),
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
