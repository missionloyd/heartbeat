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
//  - Sum of all commodity type columns

async function getSumSummary(assetName, startingDate, endingDate, dateLevel) {

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

    let sumColumns = "";
    for(let prefix of commodityColumnPrefixes) {

        for(let i = 0; i < commoditiesRows.length; i++) {

            const commodityType = commoditiesRows[i]['type'];

            const commodity = commodityTranslations[commodityType];

            const sumColumnString = `SUM(${prefix}${commodity}) AS sum_${prefix}${commodity},`;

            sumColumns += sumColumnString;
        }

    }

    // Remove the comma for the last column; this is for proper SQL syntax:
    sumColumns = sumColumns.substring(0, sumColumns.length - 1);

    // ------------------------------------------------------

     const summaryQuery = `
        SELECT
        ${sumColumns}
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

module.exports = { getSumSummary };
