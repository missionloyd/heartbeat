const { Router } = require("express");
const { getPoints } = require("../../get_routes/get_points");
const { returnOrErrorFlag } = require("../../utils/return_or_error_flag");

const router = Router();

// Get Data points for an asset (default in days)
function pointsRouter() {
  router.post("/", async (req, res) => {
    const { assetName, startDate, endDate, dateLevel, aggregation, isHistoricalIncluded, measurementPredictionTypeId = 0 } = req.body;

    let data = [];

    if (!assetName || !startDate || !endDate || !dateLevel || !aggregation) {
      console.log("*** Missing Data (/points) ***");
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
      data = {
        points: await getPoints(assetName, startDate, endDate, dateLevel, aggregation, historicalFlag, measurementPredictionTypeId),
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
