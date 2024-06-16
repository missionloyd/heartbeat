const { Router } = require("express");
const { getDeviation } = require("../../get_routes/get_deviation");

const router = Router();

function deviationRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
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

    try {

      const isMeasurementPrediction = false;

      const deviation = await getDeviation(
        assetName,
        commodityName,
        startDate,
        endDate,
        dateLevel,
        isMeasurementPrediction
      );

      data = [...deviation];
      
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

module.exports = { deviationRouter };