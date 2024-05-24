const { Router } = require("express");
const { getAssets } = require("../get_routes/get_assets");

const router = Router();

function assetsRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { parentAssetName } = req.body;

    let data = [];

    if (!parentAssetName) {
      console.log("*** Missing Data (/assets) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    try {
      data = {
        assets: await getAssets(parentAssetName),
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

  return router;
}

module.exports = { assetsRouter };