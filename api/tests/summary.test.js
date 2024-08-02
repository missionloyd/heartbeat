const testSummarySum = require("./test_summary_sum");
const testSummaryAvg = require("./test_summary_avg");
const testSummaryStddev = require("./test_summary_stddev");

test("Test the Summary Sum", async () => {
  const isCorrect = await testSummarySum();
  expect(isCorrect).toBe(true);
}, 5000000);

test("Test the Summary Average", async () => {
  const isCorrect = await testSummaryAvg();
  expect(isCorrect).toBe(true);
}, 5000000);

test("Test the Summary Standard Deviation", async () => {
  const isCorrect = await testSummaryStddev();
  expect(isCorrect).toBe(true);
}, 5000000);
