const { Router } = require("express");
const memCached = require("memcached");
const { getDeviation } = require("../../get_routes/get_deviation");
const { promisify } = require("util");

// ----------------------------------------------
const cacheContainerHost = process.env.CACHE_CONTAINER;
const cacheContainerPort = process.env.CACHE_PORT;
const memCache = new memCached(`${cacheContainerHost}:${cacheContainerPort}`);

// Allow the get method to be used asynchronously:
memCache.get = promisify(memCache.get);
// ----------------------------------------------

const deviationRouter = Router();

deviationRouter.post("/", async (req, res) => {
  const { assetName, commodityName, startDate, endDate, dateLevel } =
    req.body;

  let data = [];

  if (!assetName || !commodityName || !startDate || !endDate || !dateLevel) {
    console.log("*** Missing Data (/deviation) ***");
    return res.json({
      data,
      status: "bad",
      message: "missing data",
    });
  }

  const isMeasurementPrediction = false;

  // Remove any white spaces, from assetName, so that a key can be created properly:
  const unspacedAssetName = assetName.replace(/\s+/g, "");
  const dataKey = `${unspacedAssetName}:${commodityName}:${startDate}:${endDate}:${dateLevel}:${isMeasurementPrediction}`;

  try {

    const cacheData = await memCache.get(dataKey);

    if (cacheData === undefined) {
      const deviation = await getDeviation(
        assetName,
        commodityName,
        startDate,
        endDate,
        dateLevel,
        isMeasurementPrediction
      );

      data = [...deviation];
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

  // 1 hour Cache TTL
  const timeToLiveInSec = 60 * 60;

  const dataValue = JSON.stringify(data);

  memCache.set(dataKey, dataValue, timeToLiveInSec, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Set cache key [${dataKey}]`);
    }
  });

  return res.json({
    data,
    status: "ok",
  });
});

module.exports = { deviationRouter };