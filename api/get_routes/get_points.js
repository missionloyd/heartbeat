const {
  measurementQueryTypes,
} = require("../constants/measurement_query_types");
const db = require("../lib/db");
const { buildPointsCteQuery } = require("../utils/build_points_cte_query");

async function getPoints(
  assetName,
  commodityName,
  startDate,
  endDate,
  dateLevel,
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

  const { cteTableName, cteQuery } = buildPointsCteQuery(
    commodities,
    measurementQueryTypes.Points.value,
    isHistoricalIncluded
  );

  const pointsQuery = `
    ${cteQuery}
    SELECT
      *
    FROM
      ${cteTableName}
  `;

  const queryResult = await db.query(pointsQuery, [
    startDate,
    endDate,
    assetName,
    commodityName,
    isMeasurementPrediction,
    dateLevel
  ]);

  const points = queryResult.rows;

  return points;
}

module.exports = { getPoints };
