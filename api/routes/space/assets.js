const { Router } = require('express');
const { getAssets } = require('../../utils/get_assets');

const assetsRouter = Router();

assetsRouter.post('/', async (request, response) => {

    const { parentAsset } = request.body;

    const assets = await getAssets(parentAsset);

    // *********
    // TODO : Error-handling.
    // *********

    response.json(assets);
});

module.exports = assetsRouter;