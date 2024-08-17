const { Router } = require("express");
const { getSummary } = require("../../get_routes/get_summary");
const memCached = require("memcached");
const { promisify } = require("util");
const { returnOrErrorFlag } = require("../../utils/return_or_error_flag");
const {
  measurementQueryTypes,
} = require("../../constants/measurement_query_types");

const summaryRouter = Router();

// ----------------------------------------------
const cacheContainerHost = process.env.CACHE_CONTAINER;
const cacheContainerPort = process.env.CACHE_PORT;
const memCache = new memCached(`${cacheContainerHost}:${cacheContainerPort}`);

// Allow the get method to be used asynchronously:
memCache.get = promisify(memCache.get);
// ----------------------------------------------

summaryRouter.post("/", async (req, res) => {
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

  // Remove any white spaces, from assetName, so that a key can be created properly:
  const unspacedAssetName = assetName.replace(/\s+/g, "");
  const dataKey = `${unspacedAssetName}:${commodityName}:${startDate}:${endDate}:${dateLevel}:${historicalFlag}:${predictionFlag}`;

  try {

    const cacheData = await memCache.get(dataKey);

    if (cacheData === undefined) {
      
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

    } else {
      console.log("Cached...");

      data = JSON.parse(cacheData);

      return res.json({
        data,
        status: "ok",
      });
    }

  } catch (error) {
    console.log(error);
    return res.json({
      data: [],
      status: 500,
      message: error,
    });
  }

  // 1 Hour Cache TTL
  const timeToLiveInSec = 60 * 60;
  
  const dataValue = JSON.stringify(data);
  
  memCache.set(dataKey, dataValue, timeToLiveInSec, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Set key [${dataKey}]`);
    }
  });

  return res.json({
    data,
    status: "ok",
  });
});

module.exports = { summaryRouter };
