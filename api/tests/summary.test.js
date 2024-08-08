const testSummarySum = require("./test_summary_sum");
const testSummaryAvg = require("./test_summary_avg");
const testSummaryStddev = require("./test_summary_stddev");

const timeAllowed = 5_000_000;
// ----------------------------------------------------------------------------------
test(
  `Test the HOUR-ly Summary for elec_kwh`,
  async () => {
    const commodityName = "elec_kwh";
    const truncatedDateLevel = "HOUR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the DAY-ly Summary for elec_kwh`,
  async () => {
    const commodityName = "elec_kwh";
    const truncatedDateLevel = "DAY";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the MONTH-ly Summary for elec_kwh`,
  async () => {
    const commodityName = "elec_kwh";
    const truncatedDateLevel = "MONTH";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the YEAR-ly Summary for elec_kwh`,
  async () => {
    const commodityName = "elec_kwh";
    const truncatedDateLevel = "YEAR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// ----------------------------------------------------------------------------------
test(
  `Test the HOUR-ly Summary for htwt_mmbtuh`,
  async () => {
    const commodityName = "htwt_mmbtuh";
    const truncatedDateLevel = "HOUR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the DAY-ly Summary for htwt_mmbtuh`,
  async () => {
    const commodityName = "htwt_mmbtuh";
    const truncatedDateLevel = "DAY";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the MONTH-ly Summary for htwt_mmbtuh`,
  async () => {
    const commodityName = "htwt_mmbtuh";
    const truncatedDateLevel = "MONTH";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the YEAR-ly Summary for htwt_mmbtuh`,
  async () => {
    const commodityName = "htwt_mmbtuh";
    const truncatedDateLevel = "YEAR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// ----------------------------------------------------------------------------------
test(
  `Test the HOUR-ly Summary for wtr_usgal`,
  async () => {
    const commodityName = "wtr_usgal";
    const truncatedDateLevel = "HOUR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the DAY-ly Summary for wtr_usgal`,
  async () => {
    const commodityName = "wtr_usgal";
    const truncatedDateLevel = "DAY";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the MONTH-ly Summary for wtr_usgal`,
  async () => {
    const commodityName = "wtr_usgal";
    const truncatedDateLevel = "MONTH";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the YEAR-ly Summary for wtr_usgal`,
  async () => {
    const commodityName = "wtr_usgal";
    const truncatedDateLevel = "YEAR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// ----------------------------------------------------------------------------------
test(
  `Test the HOUR-ly Summary for chll_tonh`,
  async () => {
    const commodityName = "chll_tonh";
    const truncatedDateLevel = "HOUR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the DAY-ly Summary for chll_tonh`,
  async () => {
    const commodityName = "chll_tonh";
    const truncatedDateLevel = "DAY";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the MONTH-ly Summary for chll_tonh`,
  async () => {
    const commodityName = "chll_tonh";
    const truncatedDateLevel = "MONTH";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the YEAR-ly Summary for chll_tonh`,
  async () => {
    const commodityName = "chll_tonh";
    const truncatedDateLevel = "YEAR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// ----------------------------------------------------------------------------------
test(
  `Test the HOUR-ly Summary for co2_tonh`,
  async () => {
    const commodityName = "co2_tonh";
    const truncatedDateLevel = "HOUR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the DAY-ly Summary for co2_tonh`,
  async () => {
    const commodityName = "co2_tonh";
    const truncatedDateLevel = "DAY";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the MONTH-ly Summary for co2_tonh`,
  async () => {
    const commodityName = "co2_tonh";
    const truncatedDateLevel = "MONTH";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
test(
  `Test the YEAR-ly Summary for co2_tonh`,
  async () => {
    const commodityName = "co2_tonh";
    const truncatedDateLevel = "YEAR";

    const isSumCorrect = await testSummarySum(
      commodityName,
      truncatedDateLevel
    );
    const isAvgCorrect = await testSummaryAvg(
      commodityName,
      truncatedDateLevel
    );
    const isStddevCorrect = await testSummaryStddev(
      commodityName,
      truncatedDateLevel
    );

    const isAllCorrect = isSumCorrect && isAvgCorrect && isStddevCorrect;

    expect(isAllCorrect).toBe(true);
  },
  timeAllowed
);
// ----------------------------------------------------------------------------------
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// ----------------------------------------------------------------------------------
