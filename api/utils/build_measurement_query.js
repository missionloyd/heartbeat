const { commodityTranslations } = require("../constants/commodity_translations");

function buildMeasurementQuery(commoditiesRows) {

    // -----------------------------------------------
    // Create the duplicate "historical" measurement table...
    // -----------------------------------------------

    // ---------------------------------------------------

    let historicalCaseStatements = "";
    for(let i = 0; i < commoditiesRows.length; i++) {

        const commodityType = commoditiesRows[i]['type'];

        const historicalCaseString = `CASE WHEN type = '${commodityType}' THEN sum END AS historical_${commodityType},`;

        historicalCaseStatements += historicalCaseString;
    }

    // Remove the comma for the last column; this is for proper SQL syntax:
    historicalCaseStatements = historicalCaseStatements.substring(0, historicalCaseStatements.length - 1);

    // ---------------------------------------------------

    const unpivotedHistoricalQuery = `
        SELECT 
        DATE_TRUNC($1, measurement.ts) as timestamp, 
        commodity.type, 
        SUM(measurement.value) FROM measurement
        JOIN asset ON asset.id = measurement.asset_id
        JOIN commodity ON commodity.id = measurement.commodity_id
        WHERE asset.name = $2
        GROUP BY asset.name, commodity.type, timestamp
    `;

    const pivotedHistoricalQuery = `
        SELECT
        timestamp,
        ${historicalCaseStatements}
        FROM 
        (
            ${unpivotedHistoricalQuery}
        )
        AS unpivoted_measurement
    `;

    // ------------------------------------

    let historicalSumStatements = "";
    for(let i = 0; i < commoditiesRows.length; i++) {

        const commodityType = commoditiesRows[i]['type'];

        const historicalSumString = `SUM(historical_${commodityType}) AS historical_${commodityType},`; 

        historicalSumStatements += historicalSumString;
    }

    // Remove the comma for the last column; this is for proper SQL syntax:
    historicalSumStatements = historicalSumStatements.substring(0, historicalSumStatements.length - 1);

    // ------------------------------------

    const pivotedHistoricalAlias = "pivoted_historical_measurement";

    const pivotedHistoricalTableQuery = `
        SELECT
        timestamp,
        ${historicalSumStatements}
        FROM 
        (
            ${pivotedHistoricalQuery}
        )
        AS ${pivotedHistoricalAlias}
        GROUP BY timestamp
    `;

    // -----------------------------------------------
    // Ending the historical measurement table...
    // -----------------------------------------------


    // -----------------------------------------------
    // Create the present measurement table...
    // -----------------------------------------------

    // ---------------------------------------------------

    let presentCaseStatements = "";
    for(let i = 0; i < commoditiesRows.length; i++) {

        const commodityType = commoditiesRows[i]['type'];

        const presentCaseString = `CASE WHEN type = '${commodityType}' THEN sum END AS ${commodityType},`;

        presentCaseStatements += presentCaseString;
    }

    // Remove the comma for the last column; this is for proper SQL syntax:
    presentCaseStatements = presentCaseStatements.substring(0, presentCaseStatements.length - 1);

    // ---------------------------------------------------

    const unpivotedPresentQuery = `
        SELECT 
        DATE_TRUNC($1, measurement.ts) as timestamp, 
        commodity.type, 
        SUM(measurement.value) FROM measurement
        JOIN asset ON asset.id = measurement.asset_id
        JOIN commodity ON commodity.id = measurement.commodity_id
        WHERE asset.name = $2 AND
        measurement.ts >= $3 AND measurement.ts < $4     
        GROUP BY asset.name, commodity.type, timestamp
    `;

    const pivotedPresentQuery = `
        SELECT
        timestamp,
        ${presentCaseStatements}
        FROM
        (
            ${unpivotedPresentQuery}
        )
        AS unpivoted_measurement
    `;

    // -----------------------------------------------

    let presentSumStatements = "";
    for(let i = 0; i < commoditiesRows.length; i++) {

        const commodityType = commoditiesRows[i]['type'];

        const presentSumString = `SUM(${commodityType}) AS ${commodityType},`;

        presentSumStatements += presentSumString;
    }

    // Remove the comma for the last column; this is for proper SQL syntax:
    presentSumStatements = presentSumStatements.substring(0, presentSumStatements.length - 1);

    // ------------------------------------------------

    const pivotedPresentAlias = "pivoted_present_measurement";
    
    const pivotedPresentTableQuery = `
        SELECT
        timestamp,
        ${presentSumStatements}
        FROM 
        (
            ${pivotedPresentQuery}
        )
        AS ${pivotedPresentAlias}
        GROUP BY timestamp
    `;


    // -----------------------------------------------
    // Ending the present measurement table...
    // -----------------------------------------------

    // -----------------------------------------------
    // Joining both measurement tables...
    // -----------------------------------------------

    // ------------------------------------------------------



    // ------------------------------------------------------
    
    // Empty string is for the "present" columns:
    const commodityColumnPrefixes = ["", "historical_"]

    let finalColumns = ""
    for(let prefix of commodityColumnPrefixes) {

        for(let i = 0; i < commoditiesRows.length; i++) {

            const commodityType = commoditiesRows[i]['type'];

            const commodity = commodityTranslations[commodityType];

            const finalColumnString = `${commodityType} AS ${prefix}${commodity},`;

            finalColumns += finalColumnString;
        }

    }

    // Remove the comma for the last column; this is for proper SQL syntax:
    finalColumns = finalColumns.substring(0, finalColumns.length - 1);

    // ------------------------------------------------------

    
    const pivotedPresentMeasurementAlias = "pivoted_present_measurement_table";
    const pivotedPresentHistoricalAlias = "pivoted_historical_measurement_table";

    const finalMeasurementTableQuery = `
        SELECT
        ${pivotedPresentMeasurementAlias}.timestamp,
        ${finalColumns}
        FROM 
        (
            ${pivotedPresentTableQuery}
        )
        AS ${pivotedPresentMeasurementAlias}
        LEFT JOIN
        (
            ${pivotedHistoricalTableQuery}
        )
        AS ${pivotedPresentHistoricalAlias}
        ON ${pivotedPresentHistoricalAlias}.timestamp = ${pivotedPresentMeasurementAlias}.timestamp - INTERVAL '1 YEAR'
        ORDER BY ${pivotedPresentMeasurementAlias}.timestamp ASC
    `;

    // -----------------------------------------------
    // Ending the joining of both measurement tables...
    // -----------------------------------------------


    return finalMeasurementTableQuery;

}

module.exports = { buildMeasurementQuery };
