const { Router } = require('express');
const { getLatestData } = require('../../utils/get_latest_data');
const latestRouter = Router();


// Get the latest data in the past 24 hours
latestRouter.post('/', async (request, response) => {

    const { assetName, commodityType } = request.body;

    let data;

    try {

      data = await getLatestData(assetName, commodityType);

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

module.exports = latestRouter;
