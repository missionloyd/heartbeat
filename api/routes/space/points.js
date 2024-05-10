const { Router } = require('express');
const { getPoints } = require('../../utils/get_points');

const pointsRouter = Router();

// Get Data points for an asset (default in days)
pointsRouter.post('/', async (request, response) => {

    const { assetName, startingDate, endingDate, dateLevel } = request.body;

    let data;

    try {

      data = {
        points: await getPoints(assetName, startingDate, endingDate, dateLevel,),
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

module.exports = pointsRouter;
