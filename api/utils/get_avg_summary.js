const db = require('../lib/db');
const { buildMeasurementQuery } = require('./build_measurement_query');

// Inputs :
//  - Name of Asset (STRING)
//  - Starting Date (STRING)
//  - Ending Date (STRING)
//  - Date Level (STRING) such as hour, day, month
// ~~~~~~~~~~~~~~~~
// Outputs (Table Columns) : 
//  - Average of all commodity type columns

async function getAvgSummary(assetName, startingDate, endingDate, dateLevel) {

    // $1 : dateLevel
    // $2 : assetName
    // $3 : startingDate
    // $4 : endingDate

    const commoditiesQuery = `
        SELECT type FROM commodity
    `;

    const commodotiesQueryResult = await db.query(commoditiesQuery);

    const commoditiesRows = commodotiesQueryResult.rows;

    const measurementQuery = buildMeasurementQuery(commoditiesRows);

    let columnStatements = "";
    for(i = 0; i < commoditiesRows.length; i++) {

        const commodityType = commoditiesRows[i]['type'];

        const presentColumnString = `AVG(${commodityType}) AS avg_${commodityType},`;

        let historicalColumnString = "";

        if(i == commoditiesRows.length - 1) {
            historicalColumnString = `AVG(historical_${commodityType}) AS avg_historical_${commodityType}`;
        } else {
            historicalColumnString = `AVG(historical_${commodityType}) AS avg_historical_${commodityType},`;
        }

        
        columnStatements += presentColumnString;
        columnStatements += historicalColumnString;
    }

    const summaryQuery = `
        SELECT
        ${columnStatements}
        FROM
        (
            ${measurementQuery}
        )
        AS pivoted_measurement_table
    `;

    const queryResult = await db.query(summaryQuery, [dateLevel, assetName, startingDate, endingDate]);

    const summary = queryResult.rows;

    return summary;
}

module.exports = { getAvgSummary };