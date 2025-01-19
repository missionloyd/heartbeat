const { Router } = require("express");
const { getDeviation } = require("../../get_routes/get_deviation");

const router = Router();

function deviationRouter() {
  router.post("/", async (req, res) => {
    const { assetName, measurementTypeName, startDate, endDate, dateLevel, aggregation, measurementPredictionTypeId = 0 } = req.body;

    let data = [];

    if (!assetName || !measurementTypeName || !startDate || !endDate || !dateLevel || !aggregation) {
      console.log("*** Missing Data (/deviation) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    try {
      const deviation = await getDeviation(
        assetName,
        measurementTypeName,
        startDate,
        endDate,
        dateLevel,
        measurementPredictionTypeId,
        aggregation
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