const { campusHeartbeatAssets } = require("./resources");
const { getSummary } = require("../get_routes/get_summary");
const pool = require("../database/database");
const {
  unpivotedMeasurementQueries,
} = require("../constants/unpivoted_measurement_queries");

async function calculateAvgOfAsset(
  startDate,
  endDate,
  assetName,
  commodityName,
  dateLevel
) {
  const pointsQuery = unpivotedMeasurementQueries[2];

  const data = await pool.query(pointsQuery, [
    startDate,
    endDate,
    assetName,
    commodityName,
    dateLevel,
  ]);

  const n = data.rowCount;

  const values = data.rows.map((row) => row["value"]);

  let sum = 0.0;
  for (value of values) {
    sum += parseFloat(value);
  }

  let avg;
  if (n == 0) {
    avg = 0.0;
  } else {
    avg = sum / n;
  }

  return avg;
}

async function calculateAvgOfOtherAssets(
  startDate,
  endDate,
  assetName,
  commodityName,
  dateLevel
) {
  const complementaryPointsQuery = unpivotedMeasurementQueries[3];

  const data = await pool.query(complementaryPointsQuery, [
    startDate,
    endDate,
    assetName,
    commodityName,
    dateLevel,
  ]);

  const n = data.rowCount;

  const values = data.rows.map((row) => row["value"]);

  let sum = 0.0;
  for (value of values) {
    sum += parseFloat(value);
  }

  const avg = sum / n;

  return avg;
}

async function testSummaryAvg() {
  const commodityName = "elec_kwh";
  const startDate = "2019-10-01";
  const endDate = "2023-01-31";
  const dateLevel = "MONTH";
  const sqlAggregateFunction = "AVG";
  const isHistoricalIncluded = false;

  for (assetName of campusHeartbeatAssets) {
    const calculatedCampusAvg = await calculateAvgOfOtherAssets(
      startDate,
      endDate,
      assetName,
      commodityName,
      dateLevel
    );

    const campusAvgSummary = await getSummary(
      assetName,
      commodityName,
      startDate,
      endDate,
      dateLevel,
      sqlAggregateFunction,
      3,
      isHistoricalIncluded
    );

    // -------------------------------------------

    const calculatedBuildingAvg = await calculateAvgOfAsset(
      startDate,
      endDate,
      assetName,
      commodityName,
      dateLevel
    );

    const buildingAvgSummary = await getSummary(
      assetName,
      commodityName,
      startDate,
      endDate,
      dateLevel,
      sqlAggregateFunction,
      2,
      isHistoricalIncluded
    );

    // -------------------------------------------

    let buildingAvg = buildingAvgSummary[0]["electricity"];
    if (buildingAvg == null) {
      buildingAvg = 0.0;
    } else {
      buildingAvg = parseFloat(buildingAvg);
    }

    let campusAvg = campusAvgSummary[0]["electricity"];
    if (campusAvg == null) {
      campusAvg = 0.0;
    } else {
      campusAvg = parseFloat(campusAvg);
    }

    // -------------------------------------------

    console.log(
      `API returns : ${Math.round(campusAvg)} <-> Calculated : ${Math.round(calculatedCampusAvg)}`
    );
    console.log(
      `API returns : ${Math.round(buildingAvg)} <-> Calculated : ${Math.round(calculatedBuildingAvg)}`
    );

    // -------------------------------------------

    const buildingCheck =
      Math.round(buildingAvg) === Math.round(calculatedBuildingAvg);
    const campusCheck =
      Math.round(campusAvg) === Math.round(calculatedCampusAvg);

    if (!buildingCheck && !campusCheck) {
      console.log(
        `Building and Campus averages for ${assetName} may not be correct.`
      );
      return false;
    } else if (!campusCheck) {
      console.log(`Campus averages for ${assetName} may not be correct.`);
      return false;
    } else if (!buildingCheck) {
      console.log(`Building averages for ${assetName} may not be correct.`);
      return false;
    } else {
      console.log(`${assetName} passed the test.`);
    }

    console.log("********************************");
  }

  return true;
}

module.exports = testSummaryAvg;
