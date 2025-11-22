const LETTER_POOL = {
  A: 9, B: 2, C: 2,D: 4,
  E: 12, F: 2, G: 3, H: 2,
  I: 9, J: 1, K: 1, L: 4,
  M: 2, N: 6, O: 8, P: 2,
  Q: 1, R: 6, S: 4, T: 6,
  U: 4, V: 2, W: 2, X: 1,
  Y: 2, Z: 1
};

const SCORE_DICT = {
  A: 1, B: 3, C: 3, D: 2,
  E: 1, F: 4, G: 2, H: 4,
  I: 1, J: 8, K: 5, L: 1,
  M: 3, N: 1, O: 1, P: 3,
  Q: 10, R: 1, S: 1, T: 1,
  U: 1, V: 4, W: 4, X: 8,
  Y: 4, Z: 10
};
// const letterList = () => {
//   let list = [];
//   for (let [letter, count] of Object.entries(LETTER_POOL)) {
//     for (let i = 0; i < count; i++) {
//       list.push(letter);
//     }
//   }
//   return list;
// };

// let totalLetters = () => {
//   let pool = { ...LETTER_POOL };
//   let totalLetters = 0;
//   for (let quantity of Object.values(pool)) {
//     totalLetters += quantity;
//   }
//   return totalLetters;
// };


export const drawLetters = () => {
  let userList = [];
  let pool = { ...LETTER_POOL };

  while (userList.length < 10) {
    // recalculate total letters each iteration
    let totalLetters = Object.values(pool).reduce((sum, quantity) => sum + quantity, 0);

    // get random position by total letters
    let randomPosition = Math.floor(Math.random() * totalLetters ) + 1;
    let positionCounter = 0;

    for (let [letter, quantity] of Object.entries(pool)) {
      // positionCounter moves forward by quantity of current letter
      positionCounter += quantity;

      // check if randomPosition is within current letter's range
      if (positionCounter < randomPosition) {
        continue; // we haven't found our letter yet so continue the for loop to next letter
      } else {
        // if randomPosition is less than positionCounter, we found our letter
        userList.push(letter);
        pool[letter] -= 1;
        break; // exit the for loop
      }
    }
  }

  return userList;

};

export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersDict = {};

  for (let letter of lettersInHand) {
    const lowerCaseLetter = letter.toLowerCase();
    lettersDict[lowerCaseLetter] = (lettersDict[lowerCaseLetter] || 0) + 1;
  }

  for (const letter of input) {
    const lowerCaseLetter = letter.toLowerCase();
    if (!lettersDict[lowerCaseLetter]) {
      return false;
    }
    lettersDict[lowerCaseLetter] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  if (!word) {
    return 0;
  }

  if (word.length >= 7) {
    score += 8;
  }

  for (const letter of word.toUpperCase()) {
    let letterScore = SCORE_DICT[letter];
    score += letterScore;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
