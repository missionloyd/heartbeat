const { Router } = require("express");
const { getSummary } = require("../../get_routes/get_summary");
const {
  measurementQueryTypes,
} = require("../../constants/measurement_query_types");

const router = Router();

function summaryRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName, startDate, endDate, dateLevel, isHistoricalIncluded } = req.body;

    let data = [];

    if (!assetName || !startDate || !endDate || !dateLevel) {
      console.log("*** Missing Data (/summary) ***");
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
        averages: {
          space: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.Asset.value,
            historicalFlag
          ),
          campus: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.AssetComplementary.value,
            historicalFlag
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
            historicalFlag
          ),
          campus: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "SUM",
            measurementQueryTypes.AssetComplementary.value,
            historicalFlag
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
            historicalFlag
          ),
          campus: await getSummary(
            assetName,
            startDate,
            endDate,
            dateLevel,
            "STDDEV",
            measurementQueryTypes.AssetComplementary.value,
            historicalFlag
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
