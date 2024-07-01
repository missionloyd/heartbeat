function returnOrErrorFlag(flag) {
  const errorMessage = "Value passed in for flag is not a boolean string.";

  // If the flag is already a boolean, return it directly
  if (typeof flag === "boolean") {
    return flag;
  }

  // Convert the flag to a string and then lowercase it for evaluation
  const tempFlag = !flag ? flag : flag.toLowerCase();

  let evalFlag;

  try {
    // Attempt to evaluate the flag as a boolean string
    evalFlag = eval(tempFlag);
  } catch (error) {
    throw errorMessage;
  }

  // After evaluating, check the outcomes
  if (evalFlag === undefined || evalFlag === null) {
    evalFlag = false;
  } else if (evalFlag === true || evalFlag === false) {
    // The flag is a valid boolean
  } else {
    throw errorMessage;
  }

  return evalFlag;
}

module.exports = { returnOrErrorFlag };