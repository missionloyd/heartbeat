const db = require('../lib/db');

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
    const unpivotedQuery = `
        SELECT DATE_TRUNC($1, measurement.ts) as timestamp, commodity.type, SUM(measurement.value) FROM measurement
        JOIN asset ON asset.id = measurement.asset_id
        JOIN commodity ON commodity.id = measurement.commodity_id
        WHERE asset.name = $2 AND
        measurement.ts >= $3 AND measurement.ts <= $4     
        GROUP BY asset.name, commodity.type, timestamp
    `;

    const pivotedQuery = `
        SELECT
        timestamp,
        CASE WHEN type = 'present_elec_kwh' THEN sum END AS present_elec_kwh,
        CASE WHEN type = 'present_co2_tonh' THEN sum END AS present_co2_tonh,
        CASE WHEN type = 'present_htwt_mmbtuh' THEN sum END AS present_htwt_mmbtuh,
        CASE WHEN type = 'present_wtr_usgal' THEN sum END AS present_wtr_usgal,
        CASE WHEN type = 'present_chll_tonh' THEN sum END AS present_chll_tonh
        FROM 
        (
            ${unpivotedQuery}
        )
        AS unpivoted_asset_measurement_table
    `;

    const summaryQuery = `
        SELECT
        AVG(present_elec_kwh) AS avg_present_elec_kwh,
        AVG(present_co2_tonh) AS avg_present_co2_tonh,
        AVG(present_htwt_mmbtuh) AS avg_present_htwt_mmbtuh,
        AVG(present_wtr_usgal) AS avg_present_wtr_usgal,
        AVG(present_chll_tonh) AS avg_present_chll_tonh
        FROM
        (
            ${pivotedQuery}
        )
        AS pivoted_asset_measurement_table
    `;

    const queryResult = await db.query(summaryQuery, [dateLevel, assetName, startingDate, endingDate]);

    const summary = queryResult.rows;

    return summary;
}

module.exports = { getAvgSummary };