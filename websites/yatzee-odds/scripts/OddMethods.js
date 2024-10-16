const D = []; // Dictionary of factorials to speed up runtime
const PowOf6 = []; // Powers of 6 to speed up runtime

function SixToThePowerOf(x) {
  if (x === 1) {
    return 6;
  }
  if (PowOf6[x] != undefined) {
    return PowOf6[x];
  } else {
    const power = 6 * SixToThePowerOf(x - 1);
    PowOf6[x] = power;
    return power;
  }
}

function factorial(num) {
  if (D[num] != undefined) {
    return D[num];
  } else {
    if (num === 0) {
      return 1;
    }
    if (num === 1) {
      return 1;
    } else {
      const value = num * factorial(num - 1);
      D[num] = value;
      return value;
    }
  }
}

function nCr(n, k) {
  return factorial(n) / (factorial(n - k) * factorial(k));
}

function oddsOfX(X, num, dice) {
  let count = 0;
  for (const i of dice) {
    if (i !== num) {
      count += 1;
    }
  }
  // 5-count is how many you already have, X is how many you want to get.
  const have = 5 - count;
  // Thus X-have is how many you need to roll. count - needToRoll is how many you need to not roll
  const needToRoll = X - have;
  const needToNotRoll = count - needToRoll;
  // to check if you already have it see if need to roll is either 0 or negative
  if (needToRoll <= 0) {
    return 1;
  }
  // otherwise return the textbook probability
  const oddsOf1 = (1 / 6) ** needToRoll * (5 / 6) ** needToNotRoll;
  const permutations = nCr(count, needToRoll);
  return oddsOf1 * permutations;
}

function oddsOfFH(numOf2, numOf3, dice) {
  let countNumOf2 = 0;
  let countNumOf3 = 0;
  for (const i of dice) {
    if (i === numOf2) {
      countNumOf2 += 1;
    }
    if (i === numOf3) {
      countNumOf3 += 1;
    }
  }
  if (countNumOf2 > 2) {
    // Just in case we have to reroll some of the dice
    countNumOf2 = 2;
  }
  if (countNumOf3 > 3) {
    countNumOf3 = 3;
  }
  const count = 5 - countNumOf2 - countNumOf3; // Number of dice that we are going to reroll in total
  if (count === 0) {
    // Check if we already have it
    return 1;
  }
  const permutations = nCr(count, 3 - countNumOf3); // Can either do nCr for (count, countNumOf3) or (count, countNumOf2), it should be the same
  return permutations / SixToThePowerOf(count);
}

function oddsOfSmallStraight(startNum, dice) {
  const nums = [1, 1, 1, 1]; // Keep track of what numbers we have hit
  let have = 0; // count how many we have already
  for (const i of dice) {
    if (i - startNum >= 0 && i - startNum < 4 && nums[i - startNum] === 1) {
      nums[i - startNum] = 0;
      have += 1;
    }
  }
  if (have >= 4) {
    return 1;
  }
  const reroll = 5 - have;

  // The permutations of when the last dice is one of the four already chosen
  let permutations = 4 * nCr(reroll, 2) * factorial(reroll - 2); // We will always have at least 2 for rerolling so I'm not too worried about negative numbers
  // If there is a possible distinct element to the set, we have to add those permutations as well
  if (startNum === 1 || startNum === 3) {
    permutations += factorial(reroll);
  }
  return permutations / SixToThePowerOf(reroll);
}

function oddsOfLargeStraight(startNum, dice) {
  const nums = [1, 1, 1, 1, 1]; // Keep track of what numbers we have hit
  let have = 0; // count how many we have already
  for (const i of dice) {
    if (i - startNum >= 0 && i - startNum < 5 && nums[i - startNum] === 1) {
      nums[i - startNum] = 0;
      have += 1;
    }
  }
  if (have >= 5) {
    return 1;
  }
  const reroll = 5 - have;

  // The permutations is just the factorial of how many you need, since each one has to be distinct
  const permutations = factorial(reroll);
  return permutations / SixToThePowerOf(reroll);
}
