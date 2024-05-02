function buildMeasurementQuery(commoditiesRows) {

    // -----------------------------------------------
    // Create the duplicate "historical" measurement table...
    // -----------------------------------------------

    let historicalCaseStatements = "";
    for(i = 0; i < commoditiesRows.length; i++) {

        const commodityType = commoditiesRows[i]['type'];

        let caseString = ""; 
        
        if(i == commoditiesRows.length - 1) {
            caseString = `CASE WHEN type = '${commodityType}' THEN sum END AS ${commodityType}`;
        } else {
            caseString = `CASE WHEN type = '${commodityType}' THEN sum END AS ${commodityType},`;
        }

        historicalCaseStatements += caseString;
    }

    const unpivotedHistoricalQuery = `
        SELECT DATE_TRUNC($1, measurement.ts) as timestamp, commodity.type, SUM(measurement.value) FROM measurement
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

    const historicalTableName = "pivoted_measurement";

    // -----------------------------------------------
    // Ending the historical measurement table...
    // -----------------------------------------------



    // -----------------------------------------------
    // Create the main present measurement table...
    // -----------------------------------------------

    let presentCaseStatements = "";
    for(i = 0; i < commoditiesRows.length; i++) {

        const commodityType = commoditiesRows[i]['type'];
        const caseString = `SUM(CASE WHEN type = '${commodityType}' THEN sum END) AS ${commodityType},`;
        let historicalString = "";

        if(i == commoditiesRows.length - 1) {
            historicalString = `SUM(${historicalTableName}.${commodityType}) AS historical_${commodityType}`;
        } else {
            historicalString = `SUM(${historicalTableName}.${commodityType}) AS historical_${commodityType},`;
        }

        
        presentCaseStatements += caseString;
        presentCaseStatements += historicalString;
    }

    const unpivotedPresentQuery = `
        SELECT DATE_TRUNC($1, measurement.ts) as timestamp, commodity.type, SUM(measurement.value) FROM measurement
        JOIN asset ON asset.id = measurement.asset_id
        JOIN commodity ON commodity.id = measurement.commodity_id
        WHERE asset.name = $2 AND
        measurement.ts >= $3 AND measurement.ts < $4     
        GROUP BY asset.name, commodity.type, timestamp
    `;

    const mainPivotedMeasurementQuery = `
        SELECT
        unpivoted_present_measurement.timestamp,
        ${presentCaseStatements}
        FROM
        (
            ${unpivotedPresentQuery}
        )
        AS unpivoted_present_measurement
        LEFT JOIN
        (
            ${pivotedHistoricalQuery}
        )
        AS ${historicalTableName}
        ON ${historicalTableName}.timestamp = unpivoted_present_measurement.timestamp - INTERVAL '1 YEAR'
        GROUP BY unpivoted_present_measurement.timestamp
    `;

    
    // -----------------------------------------------
    // Ending the main present measurement table...
    // -----------------------------------------------

    return mainPivotedMeasurementQuery;

}

module.exports = { buildMeasurementQuery }
