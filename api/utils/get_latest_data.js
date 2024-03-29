const db = require('../lib/db');

// Inputs :
//  - Name of Asset (STRING)
//  - Type of Commodity (STRING)
// ~~~~~~~~~~~~~~~~
// Outputs (Data from the last 24 hours) : 
//  - timestamp of when measurement of commodity was taken
//  - name of asset
//  - type of commodity
//  - value of commodity measurement

async function getLatestData(assetName, commodityType) {

    // $1 : assetName
    // $2 : commodityType
    const query = `
    SELECT measurement.ts, asset.name, commodity.type, measurement.value FROM measurement
    JOIN asset ON asset.id = measurement.asset_id
    JOIN commodity ON commodity.id = measurement.commodity_id
    WHERE asset.name = $1 AND commodity.type = $2
    AND AGE( NOW(), ts ) < INTERVAL '24 HOURS'
    `;

    const queryResult = await db.query(query, [assetName, commodityType]);

    const latestData = queryResult.rows;

    return latestData;
}

module.exports = { getLatestData };