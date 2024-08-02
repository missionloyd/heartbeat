const { campusHeartbeatAssets } = require("./resources");
const { getSummary } = require("../get_routes/get_summary");

async function testSummarySum() {
  const commodityName = "elec_kwh";
  const startDate = "2019-10-01";
  const endDate = "2023-01-31";
  const dateLevel = "MONTH";
  const sqlAggregateFunction = "SUM";
  const isHistoricalIncluded = false;

  const expectedTotalSumSummary = await getSummary(
    "Arena Auditorium",
    commodityName,
    startDate,
    endDate,
    dateLevel,
    sqlAggregateFunction,
    5,
    isHistoricalIncluded
  );

  let expectedTotalSum = expectedTotalSumSummary[0]["electricity"];
  if (expectedTotalSum == null) {
    expectedTotalSum = 0.0;
  } else {
    expectedTotalSum = parseFloat(expectedTotalSum);
  }

  for (assetName of campusHeartbeatAssets) {
    const buildingSumSummary = await getSummary(
      assetName,
      commodityName,
      startDate,
      endDate,
      dateLevel,
      sqlAggregateFunction,
      2,
      isHistoricalIncluded
    );

    const campusSumSummary = await getSummary(
      assetName,
      commodityName,
      startDate,
      endDate,
      dateLevel,
      sqlAggregateFunction,
      3,
      isHistoricalIncluded
    );

    let buildingSum = buildingSumSummary[0]["electricity"];
    if (buildingSum == null) {
      buildingSum = 0.0;
    } else {
      buildingSum = parseFloat(buildingSum);
    }

    let campusSum = campusSumSummary[0]["electricity"];
    if (campusSum == null) {
      campusSum = 0.0;
    } else {
      campusSum = parseFloat(campusSum);
    }

    const totalSum = buildingSum + campusSum;

    console.log(
      `${buildingSum} + ${campusSum} = ${totalSum} =?= ${expectedTotalSum}`
    );

    if (totalSum === expectedTotalSum) {
      console.log(`${assetName} passed the test.`);
      console.log("********************************");
    } else {
      console.log(`${assetName} sums may not be correct.`);
      return false;
    }
  }

  return true;
}

module.exports = testSummarySum;
