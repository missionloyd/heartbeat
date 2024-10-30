const { Router } = require("express");
const { getAssets } = require("../get_routes/get_assets");

const assetsRouter = Router();

assetsRouter.post("/", async (req, res) => {
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

module.exports = { assetsRouter };