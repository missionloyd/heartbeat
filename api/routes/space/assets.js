const { Router } = require('express');
const { getAssets } = require('../../utils/get_assets');

const assetsRouter = Router();

assetsRouter.post('/', async (request, response) => {

    const { parentAsset } = request.body;

    let data;

    try {

      data = {
        assets: await getAssets(parentAsset),
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

module.exports = assetsRouter;