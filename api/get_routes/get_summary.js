const {
  commodityTranslations,
} = require("../constants/commodity_translations");
const db = require("../lib/db");
const { buildSummaryCteQuery } = require("../utils/build_summary_cte_query");

async function getSummary(
  assetName,
  commodityName,
  startDate,
  endDate,
  dateLevel,
  sqlAggregateFunction,
  measurementQueryType,
  isHistoricalIncluded,
  isMeasurementPrediction
) {

  let commodities;
  if (commodityName == "%") {
    const commodityQuery = await db.query("SELECT type FROM commodity");
    commodities = commodityQuery.rows.map((row) => row["type"]);
  } else {
    commodities = [commodityName];
  }

  const { cteTableName, cteQuery } = buildSummaryCteQuery(
    commodities,
    measurementQueryType,
    isHistoricalIncluded
  );

  // ------------------------------------------------------
  let commodityColumnPrefixes;
  if (isHistoricalIncluded) {
    commodityColumnPrefixes = ["", "historical_"];
  } else {
    commodityColumnPrefixes = [""];
  }

  let aggregateColumns = "";
  for (let prefix of commodityColumnPrefixes) {
    for (commodity of commodities) {
      const commodityName = commodityTranslations[commodity];

      const aggregateColumnString = `${sqlAggregateFunction}(${prefix}${commodity}) AS ${prefix}${commodityName},`;

      aggregateColumns += aggregateColumnString;
    }
  }

  // Remove the comma for the last column; this is for proper SQL syntax:
  aggregateColumns = aggregateColumns.substring(0, aggregateColumns.length - 1);

  // ------------------------------------------------------

  const aggregateSummaryQuery = `
    ${cteQuery}
    SELECT
      ${aggregateColumns}
    FROM
      ${cteTableName}
  `;

  const queryResult = await db.query(aggregateSummaryQuery, [
    dateLevel,
    assetName,
    commodityName,
    startDate,
    endDate,
    isMeasurementPrediction
  ]);

  const summary = queryResult.rows;

  return summary;
}

module.exports = { getSummary };
