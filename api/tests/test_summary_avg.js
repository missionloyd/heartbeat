const { campusHeartbeatAssets } = require("./resources");
const { getSummary } = require("../get_routes/get_summary");
const db = require("../lib/db");
const {
  unpivotedMeasurementQueries,
} = require("../constants/unpivoted_measurement_queries");
const {
  commodityTranslations,
} = require("../constants/commodity_translations");

async function calculateAvgOfAsset(
  startDate,
  endDate,
  assetName,
  commodityName,
  dateLevel
) {
  const pointsQuery = unpivotedMeasurementQueries[2];

  const data = await db.query(pointsQuery, [
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

  const data = await db.query(complementaryPointsQuery, [
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

async function testSummaryAvg(commodity, truncatedDateLevel) {
  const commodityName = commodity;
  const startDate = "2019-10-01";
  const endDate = "2023-01-31";
  const dateLevel = truncatedDateLevel;
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

    let translatedCommodity = commodityTranslations[commodityName];

    let buildingAvg = buildingAvgSummary[0][translatedCommodity];

    if (buildingAvg == null) {
      buildingAvg = 0.0;
    } else {
      buildingAvg = parseFloat(buildingAvg);
    }

    let campusAvg = campusAvgSummary[0][translatedCommodity];
    if (campusAvg == null) {
      campusAvg = 0.0;
    } else {
      campusAvg = parseFloat(campusAvg);
    }

    // -------------------------------------------

    console.log(
      `Campus API ${truncatedDateLevel}-ly ${commodity} value : ${Math.round(campusAvg)} <-> Campus Calculated ${truncatedDateLevel}-ly ${commodity} value : ${Math.round(calculatedCampusAvg)}`
    );
    console.log(
      `Campus API ${truncatedDateLevel}-ly ${commodity} value : ${Math.round(buildingAvg)} <-> Campus Calculated ${truncatedDateLevel}-ly ${commodity} value : ${Math.round(calculatedBuildingAvg)}`
    );

    // -------------------------------------------

    const buildingCheck =
      Math.round(buildingAvg) === Math.round(calculatedBuildingAvg);
    const campusCheck =
      Math.round(campusAvg) === Math.round(calculatedCampusAvg);

    if (!buildingCheck && !campusCheck) {
      console.log(
        `Building and Campus ${truncatedDateLevel}-ly ${commodity} averages for ${assetName} may not be correct.`
      );
      return false;
    } else if (!campusCheck) {
      console.log(
        `Campus ${truncatedDateLevel}-ly ${commodity} averages for ${assetName} may not be correct.`
      );
      return false;
    } else if (!buildingCheck) {
      console.log(
        `Building ${truncatedDateLevel}-ly ${commodity} averages for ${assetName} may not be correct.`
      );
      return false;
    } else {
      console.log(
        `${assetName} passed the ${truncatedDateLevel}-ly ${commodity} AVG test.`
      );
    }

    console.log("********************************");
  }

  return true;
}

module.exports = testSummaryAvg;
