const db = require('../lib/db');
const { buildMeasurementQuery } = require('./build_measurement_query');

// Inputs :
//  - Name of Asset (STRING)
//  - Starting Date (STRING)
//  - Ending Date (STRING)
//  - Date Level (STRING) such as hour, day, month
// ~~~~~~~~~~~~~~~~
// Outputs (Table Columns) : 
//  - timestamp (of specified datelevel) of when measurement of commodity was taken.
//  - type of commodity
//  - sum of commodity measurement during that timestamp datelevel.

async function getPoints(assetName, startingDate, endingDate, dateLevel) {

    // $1 : dateLevel
    // $2 : assetName
    // $3 : startingDate
    // $4 : endingDate

    const commoditiesQuery = `
        SELECT type FROM commodity
    `

    const commodotiesQueryResult = await db.query(commoditiesQuery);

    const commoditiesRows = commodotiesQueryResult.rows;

    const measurementQuery = buildMeasurementQuery(commoditiesRows);

    const queryResult = await db.query(measurementQuery, [dateLevel, assetName, startingDate, endingDate]);

    const points = queryResult.rows;

    return points;
}

module.exports = { getPoints };
