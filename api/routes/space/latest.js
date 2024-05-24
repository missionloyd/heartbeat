const { Router } = require("express");
const { getLatest } = require("../../get_routes/get_latest");
const router = Router();

// Get the latest data in the past 24 hours
function latestRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName } = req.body;

    let data = [];

    if (!assetName) {
      console.log("*** Missing Data (/latest) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    try {
      data = await getLatest(assetName);
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

module.exports = { latestRouter };
