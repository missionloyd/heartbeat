const { Router } = require("express");
const { getSummary } = require("../../get_routes/get_summary");
const { returnOrErrorFlag } = require("../../utils/return_or_error_flag");
const {
  measurementQueryTypes,
} = require("../../constants/measurement_query_types");

const router = Router();

function summaryRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName, commodityName, startDate, endDate, dateLevel, isHistoricalIncluded, isMeasurementPrediction } = req.body;

    let data = [];

    if (!assetName || !commodityName || !startDate || !endDate || !dateLevel) {
      console.log("*** Missing Data (/summary) ***");
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

      // Promise.all() fetches all asynchronous queries concurrently...
      // (FUTURE CONSIDERATION) -> multithreading?
      const [avgSpace, avgCampus, sumSpace, sumCampus, stdSpace, stdCampus] =
        await Promise.all([
          getSummary(
            assetName,
            commodityName,
            startDate,
            endDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.Summary.value,
            historicalFlag,
            predictionFlag
          ),
          getSummary(
            assetName,
            commodityName,
            startDate,
            endDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.SummaryComplementary.value,
            historicalFlag,
            predictionFlag
          ),
          getSummary(
            assetName,
            commodityName,
            startDate,
            endDate,
            dateLevel,
            "SUM",
            measurementQueryTypes.Summary.value,
            historicalFlag,
            predictionFlag
          ),
          getSummary(
            assetName,
            commodityName,
            startDate,
            endDate,
            dateLevel,
            "SUM",
            measurementQueryTypes.SummaryComplementary.value,
            historicalFlag,
            predictionFlag
          ),
          getSummary(
            assetName,
            commodityName,
            startDate,
            endDate,
            dateLevel,
            "STDDEV",
            measurementQueryTypes.Summary.value,
            historicalFlag,
            predictionFlag
          ),
          getSummary(
            assetName,
            commodityName,
            startDate,
            endDate,
            dateLevel,
            "STDDEV",
            measurementQueryTypes.SummaryComplementary.value,
            historicalFlag,
            predictionFlag
          ),
        ]);

      data = {
        averages: {
          space: avgSpace,
          campus: avgCampus,
        },
        sums: {
          space: sumSpace,
          campus: sumCampus,
        },
        stddevs: {
          space: stdSpace,
          campus: stdCampus,
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
