const { Router } = require("express");
const { getPoints } = require("../../get_routes/get_points");

const router = Router();

// Get Data points for an asset (default in days)
function pointsRouter(cache, cacheTTL) {
  router.post("/", async (req, res) => {
    const { assetName, startDate, endDate, dateLevel } = req.body;

    let data = [];

    if (!assetName || !startDate || !endDate || !dateLevel) {
      console.log("*** Missing Data (/points) ***");
      return res.json({
        data,
        status: "bad",
        message: "missing data",
      });
    }

    try {
      data = {
        points: await getPoints(assetName, startDate, endDate, dateLevel),
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
