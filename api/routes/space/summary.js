const { Router } = require('express');
const { getAvgSummary } = require('../../utils/get_avg_summary');
const { getSumSummary } = require('../../utils/get_sum_summary');
const { getStandardDeviationSummary } = require('../../utils/get_standard_deviation_summary');

const summaryRouter = Router();

summaryRouter.post('/', async (request, response) => {

    const { assetName, startingDate, endingDate, dateLevel } = request.body;

    let data;

    try {

      data = {
        averages: await getAvgSummary(assetName, startingDate, endingDate, dateLevel),
        sums: await getSumSummary(assetName, startingDate, endingDate, dateLevel),
        stddevs: await getStandardDeviationSummary(assetName, startingDate, endingDate, dateLevel),
      };

    } catch (error) {

      console.log(error);
      return response.json({
        data: [],
        status: 500,
        message: error,
      });

    }

    return response.json({
      data,
      status: "ok",
    });
    
});

module.exports = summaryRouter;
