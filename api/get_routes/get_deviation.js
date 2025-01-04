const {
  commodityTranslations,
  reversedCommodityTranslations,
} = require("../constants/commodity_translations");
const db = require("../lib/db");
const { deviationQuery } = require("../constants/deviation_query");

async function getDeviation(
  assetName,
  commodityName,
  startDate,
  endDate,
  dateLevel,
  isMeasurementPrediction,
  aggregation,
) {
  const geometryCommodityIdList = [1, 2, 3, 4, 5];

  const queryResult = await db.query(deviationQuery(aggregation, geometryCommodityIdList), [
    dateLevel,
    startDate,
    endDate,
    assetName,
    reversedCommodityTranslations[commodityName],
    isMeasurementPrediction
  ]);

  const rows = [];
  
  for (const row of queryResult.rows) {
    row['commodity'] = commodityTranslations[row['commodity']]
    rows.push(row);
  }

  return rows;
}

module.exports = { getDeviation };