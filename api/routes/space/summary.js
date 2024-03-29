const { Router } = require('express');
const { getAvgSummary } = require('../../utils/get_avg_summary');
const { getSumSummary } = require('../../utils/get_sum_summary');
const { getStandardDeviationSummary } = require('../../utils/get_standard_deviation_summary');

const summaryRouter = Router();

summaryRouter.post('/', async (request, response) => {

    const { assetName, startingDate, endingDate, dateLevel } = request.body;

    const averageSummary = await getAvgSummary(assetName, startingDate, endingDate, dateLevel);
    const sumSummary = await getSumSummary(assetName, startingDate, endingDate, dateLevel);
    const standardDeviationSummary = await getStandardDeviationSummary(assetName, startingDate, endingDate, dateLevel);

    const summary = {
        "averages" : averageSummary,
        "sums" : sumSummary,
        "standard deviations" : standardDeviationSummary
    };

    // *********
    // TODO : Error-handling.
    // *********

    response.json(summary);
});

module.exports = summaryRouter;
