function returnOrErrorFlag(flag) {
  const errorMessage = "Value passed in for flag is not a boolean string.";

  const tempFlag = !flag ? flag : flag.toLowerCase();

  let evalFlag;

  try {
    evalFlag = eval(tempFlag);
  } catch (error) {
    throw errorMessage;
  }

  // After evaluating, outcomes include:
  //  - true/false (YES)
  //  - null/undefined (YES, convert to false)
  //  - evaluatable (NO, throw error)
  //  - unevaluatable (NO, error will be thrown automatically)

  if (evalFlag === undefined || evalFlag === null) {
    evalFlag = false;
  } else if (evalFlag === true || evalFlag === false) {
    // GOOD TO GO...
  } else {
    throw errorMessage;
  }

  return evalFlag;
}

module.exports = { returnOrErrorFlag };