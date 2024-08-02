const { campusHeartbeatAssets } = require("./resources");
const { getSummary } = require("../get_routes/get_summary");
const pool = require("../database/database");
const {
  unpivotedMeasurementQueries,
} = require("../constants/unpivoted_measurement_queries");

async function calculateStddevOfAsset(
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

  // -------------------------------------------------

  let sum = 0.0;
  for (value of values) {
    sum += parseFloat(value);
  }

  // -------------------------------------------------

  let avg;
  if (n == 0) {
    // return 0 as the standard deviation will be 0 anyways...
    return 0;
  } else {
    avg = sum / n;
  }

  // -------------------------------------------------

  let sigma = 0.0;
  for (value of values) {
    const deviation = value - avg;
    const deviation_squared = deviation * deviation;
    sigma += deviation_squared;
  }

  if (sigma === 0.0) {
    // return 0 as the standard deviation will be 0 anyways...
    return 0;
  }

  const standardDeviation = Math.sqrt(sigma / (n - 1));

  return standardDeviation;
}

async function calculateStddevOfOtherAssets(
  startDate,
  endDate,
  assetName,
  commodityName,
  dateLevel
) {
  const pointsQuery = unpivotedMeasurementQueries[3];

  const data = await pool.query(pointsQuery, [
    startDate,
    endDate,
    assetName,
    commodityName,
    dateLevel,
  ]);

  const n = data.rowCount;

  const values = data.rows.map((row) => row["value"]);

  // -------------------------------------------------

  let sum = 0.0;
  for (value of values) {
    sum += parseFloat(value);
  }

  // -------------------------------------------------

  let avg;
  if (n == 0) {
    // return 0 as the standard deviation will be 0 anyways...
    return 0;
  } else {
    avg = sum / n;
  }

  // -------------------------------------------------

  let sigma = 0.0;
  for (value of values) {
    const deviation = value - avg;
    const deviation_squared = deviation * deviation;
    sigma += deviation_squared;
  }

  if (sigma === 0.0) {
    // return 0 as the standard deviation will be 0 anyways...
    return 0;
  }

  const standardDeviation = Math.sqrt(sigma / (n - 1));

  return standardDeviation;
}

async function testSummaryStddev() {
  const commodityName = "elec_kwh";
  const startDate = "2019-10-01";
  const endDate = "2023-01-31";
  const dateLevel = "MONTH";
  const sqlAggregateFunction = "STDDEV";
  const isHistoricalIncluded = false;

  for (assetName of campusHeartbeatAssets) {
    const calculatedCampusStddev = await calculateStddevOfOtherAssets(
      startDate,
      endDate,
      assetName,
      commodityName,
      dateLevel
    );

    const campusStddevSummary = await getSummary(
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

    const calculatedBuildingStddev = await calculateStddevOfAsset(
      startDate,
      endDate,
      assetName,
      commodityName,
      dateLevel
    );

    const buildingStddevSummary = await getSummary(
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

    let buildingStddev = buildingStddevSummary[0]["electricity"];
    if (buildingStddev == null) {
      buildingStddev = 0.0;
    } else {
      buildingStddev = parseFloat(buildingStddev);
    }

    let campusStddev = campusStddevSummary[0]["electricity"];
    if (campusStddev == null) {
      campusStddev = 0.0;
    } else {
      campusStddev = parseFloat(campusStddev);
    }

    // -------------------------------------------

    console.log(
      `API returns : ${Math.round(campusStddev)} <-> Calculated : ${Math.round(calculatedCampusStddev)}`
    );
    console.log(
      `API returns : ${Math.round(buildingStddev)} <-> Calculated : ${Math.round(calculatedBuildingStddev)}`
    );

    // -------------------------------------------

    const buildingCheck =
      Math.round(buildingStddev) === Math.round(calculatedBuildingStddev);
    const campusCheck =
      Math.round(campusStddev) === Math.round(calculatedCampusStddev);

    if (!buildingCheck && !campusCheck) {
      console.log(
        `Building and Campus standard deviations for ${assetName} may not be correct.`
      );
      return false;
    } else if (!campusCheck) {
      console.log(
        `Campus standard deviations for ${assetName} may not be correct.`
      );
      return false;
    } else if (!buildingCheck) {
      console.log(
        `Building standard deviations for ${assetName} may not be correct.`
      );
      return false;
    } else {
      console.log(`${assetName} passed the test.`);
    }

    console.log("********************************");
  }

  return true;
}

module.exports = testSummaryStddev;
