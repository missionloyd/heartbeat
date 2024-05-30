const db = require("../lib/db");
const { deviationQuery } = require("../constants/deviation_query");

async function getDeviation(
  assetName,
  commodityName,
  startDate,
  endDate,
  dateLevel
) {
  const queryResult = await db.query(deviationQuery, [
    dateLevel,
    startDate,
    endDate,
    assetName,
    commodityName,
  ]);

  const deviation = queryResult.rows;

  return deviation;
}

module.exports = { getDeviation };