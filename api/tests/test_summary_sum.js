const { campusHeartbeatAssets } = require("./resources");
const { getSummary } = require("../get_routes/get_summary");
const {
  commodityTranslations,
} = require("../constants/commodity_translations");

async function testSummarySum(commodity, truncatedDateLevel) {
  const commodityName = commodity;
  const startDate = "2019-10-01";
  const endDate = "2023-01-31";
  const dateLevel = truncatedDateLevel;
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

  let translatedCommodity = commodityTranslations[commodityName];

  let expectedTotalSum = expectedTotalSumSummary[0][translatedCommodity];

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

    let buildingSum = buildingSumSummary[0][translatedCommodity];
    if (buildingSum == null) {
      buildingSum = 0.0;
    } else {
      buildingSum = parseFloat(buildingSum);
    }

    let campusSum = campusSumSummary[0][translatedCommodity];
    if (campusSum == null) {
      campusSum = 0.0;
    } else {
      campusSum = parseFloat(campusSum);
    }

    const totalSum = buildingSum + campusSum;

    console.log(
      `${buildingSum} + ${campusSum} = ${totalSum} =?= ${expectedTotalSum}`
    );

    const isSumSimilar = Math.round(totalSum) === Math.round(expectedTotalSum);

    if (isSumSimilar) {
      console.log(
        `${assetName} passed the ${truncatedDateLevel}-ly ${commodity} SUM test.`
      );
      console.log("********************************");
    } else {
      console.log(
        `${truncatedDateLevel}-ly ${commodity} SUMs for ${assetName} may not be correct.`
      );
      return false;
    }
  }

  return true;
}

module.exports = testSummarySum;
