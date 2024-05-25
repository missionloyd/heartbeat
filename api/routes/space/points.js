const { Router } = require("express");
const { getPoints } = require("../../get_routes/get_points");

const router = Router();

// Get Data points for an asset (default in days)
function pointsRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName, startingDate, endingDate, dateLevel } = req.body;

    let data = [];

    if (!assetName || !startingDate || !endingDate || !dateLevel) {
      console.log("*** Missing Data (/points) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    try {
      data = {
        points: await getPoints(assetName, startingDate, endingDate, dateLevel),
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

module.exports = { pointsRouter };
