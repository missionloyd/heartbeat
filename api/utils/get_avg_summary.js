const db = require('../lib/db');
const { commodityTranslations } = require('../constants/commodity_translations');
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


    // ------------------------------------------------------
    
    const commodityColumnPrefixes = ["", "historical_"];

    let avgColumns = "";
    for(let prefix of commodityColumnPrefixes) {

        for(let i = 0; i < commoditiesRows.length; i++) {

            const commodityType = commoditiesRows[i]['type'];

            const commodity = commodityTranslations[commodityType];

            const avgColumnString = `AVG(${prefix}${commodity}) AS avg_${prefix}${commodity},`;

            avgColumns += avgColumnString;
        }

    }

    // Remove the comma for the last column; this is for proper SQL syntax:
    avgColumns = avgColumns.substring(0, avgColumns.length - 1);

    // ------------------------------------------------------

    const summaryQuery = `
        SELECT
        ${avgColumns}
        FROM
        (
            ${measurementQuery}
        )
        AS pivoted_avg_measurement_table
    `;

    const queryResult = await db.query(summaryQuery, [dateLevel, assetName, startingDate, endingDate]);

    const summary = queryResult.rows;

    return summary;
}

module.exports = { getAvgSummary };