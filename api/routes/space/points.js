const { Router } = require('express');
const { getPoints } = require('../../utils/get_points');

const pointsRouter = Router();

// Get Data points for an asset (default in days)
pointsRouter.post('/', async (request, response) => {

    const { assetName, startingDate, endingDate, dateLevel } = request.body;

    const points = await getPoints(assetName, startingDate, endingDate, dateLevel,);

    // *********
    // TODO : Error-handling.
    // *********

    response.json(points);
});

module.exports = pointsRouter;
