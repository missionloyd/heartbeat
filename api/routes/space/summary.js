const { Router } = require("express");
const { getSummary } = require("../../get_routes/get_summary");
const { returnOrErrorFlag } = require("../../utils/return_or_error_flag");
const {
  measurementQueryTypes,
} = require("../../constants/measurement_query_types");

const router = Router();

function summaryRouter() {
  router.post("/", async (req, res) => {
    const { assetName, startDate, endDate, dateLevel, aggregation, isHistoricalIncluded, measurementPredictionTypeId = 0 } = req.body;

    let data = [];

    if (!assetName || !startDate || !endDate || !dateLevel || !aggregation) {
      console.log("*** Missing Data (/summary) ***");
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
        averages: {
          space: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.Asset.value,
            historicalFlag,
            measurementPredictionTypeId,
            aggregation
          ),
          campus: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.AssetComplementary.value,
            historicalFlag,
            measurementPredictionTypeId,
            aggregation
          ),
        },
        sums: {
          space: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "SUM",
            measurementQueryTypes.Asset.value,
            historicalFlag,
            measurementPredictionTypeId,
            aggregation
          ),
          campus: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "SUM",
            measurementQueryTypes.AssetComplementary.value,
            historicalFlag,
            measurementPredictionTypeId,
            aggregation
          ),
        },
        stddevs: {
          space: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "STDDEV",
            measurementQueryTypes.Asset.value,
            historicalFlag,
            measurementPredictionTypeId,
            aggregation
          ),
          campus: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "STDDEV",
            measurementQueryTypes.AssetComplementary.value,
            historicalFlag,
            measurementPredictionTypeId,
            aggregation
          ),
        },
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

module.exports = { summaryRouter };
