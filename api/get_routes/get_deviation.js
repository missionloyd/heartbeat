const {
  measurementTypeTranslations,
  reversedMeasurementTypeTranslations,
} = require("../constants/measurement_type_translations");
const db = require("../lib/db");
const { deviationQuery } = require("../constants/deviation_query");

async function getDeviation(
  assetName,
  measurementTypeName,
  startDate,
  endDate,
  dateLevel,
  measurementPredictionTypeId,
  aggregation,
) {
  const geometryMeasurementTypeIdList = [1, 2, 3, 4, 5];

  const queryResult = await db.query(deviationQuery(aggregation, geometryMeasurementTypeIdList), [
    dateLevel,
    startDate,
    endDate,
    assetName,
    reversedMeasurementTypeTranslations[measurementTypeName],
    measurementPredictionTypeId
  ]);

  const rows = [];
  
  for (const row of queryResult.rows) {
    row['measurement_type'] = measurementTypeTranslations[row['measurement_type']]
    rows.push(row);
  }

  return rows;
}

module.exports = { getDeviation };