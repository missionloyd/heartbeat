const { Router } = require('express');
const { getLatestData } = require('../../utils/get_latest_data');

const latestRouter = Router();

// Get the latest data in the past 24 hours
latestRouter.post('/', async (request, response) => {

    const { assetName, commodityType } = request.body;

    const latestData = await getLatestData(assetName, commodityType);

    // *********
    // TODO : Error-handling.
    // *********

    response.json(latestData);
});

module.exports = latestRouter;
