const { Router } = require("express");
const { getPoints } = require("../../get_routes/get_points");
const { returnOrErrorFlag } = require("../../utils/return_or_error_flag");

const pointsRouter = Router();

pointsRouter.post("/", async (req, res) => {
  const { assetName, commodityName, startDate, endDate, dateLevel, isHistoricalIncluded, isMeasurementPrediction } = req.body;

  let data = [];

  if (!assetName || !commodityName || !startDate || !endDate || !dateLevel) {
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
      points: await getPoints(assetName, commodityName, startDate, endDate, dateLevel, historicalFlag, predictionFlag),
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

module.exports = { pointsRouter };
