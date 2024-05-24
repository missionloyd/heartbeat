const { Router } = require("express");
const { getSummary } = require("../../get_routes/get_summary");
const {
  measurementQueryTypes,
} = require("../../constants/measurement_query_types");

const router = Router();

function summaryRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName, startingDate, endingDate, dateLevel } = req.body;

    let data = [];

    if (!assetName || !startingDate || !endingDate || !dateLevel) {
      console.log("*** Missing Data (/summary) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    try {
      data = {
        averages: {
          space: await getSummary(
            assetName,
            startingDate,
            endingDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.Asset.value
          ),
          campus: await getSummary(
            assetName,
            startingDate,
            endingDate,
            dateLevel,
            "AVG",
            measurementQueryTypes.AssetComplementary.value
          ),
        },
        sums: {
          space: await getSummary(
            assetName,
            startingDate,
            endingDate,
            dateLevel,
            "SUM",
            measurementQueryTypes.Asset.value
          ),
          campus: await getSummary(
            assetName,
            startingDate,
            endingDate,
            dateLevel,
            "SUM",
            measurementQueryTypes.AssetComplementary.value
          ),
        },
        stddevs: {
          space: await getSummary(
            assetName,
            startingDate,
            endingDate,
            dateLevel,
            "STDDEV",
            measurementQueryTypes.Asset.value
          ),
          campus: await getSummary(
            assetName,
            startingDate,
            endingDate,
            dateLevel,
            "STDDEV",
            measurementQueryTypes.AssetComplementary.value
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
