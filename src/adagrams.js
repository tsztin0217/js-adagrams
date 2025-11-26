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

const getTotalLetters = (pool) => {
  return Object.values(pool).reduce((sum, quantity) => sum + quantity, 0);
};

const drawSingleLetter = (pool) => {
  const totalLetters = getTotalLetters(pool);
  const randomPosition = Math.floor(Math.random() * totalLetters ) + 1;
  let positionCounter = 0;

  for (const [letter, quantity] of Object.entries(pool)) {
    // positionCounter moves forward by quantity of current letter
    // in order to eventually get to where randomPosition is
    positionCounter += quantity;

    // check if randomPosition is within current letter's range
    if (positionCounter < randomPosition) {
      continue; // we haven't found our letter yet so continue the for loop to next letter
    } else {
      // we found our letter when positionCounter is equal or larger than randomPosition
      pool[letter] -= 1;
      return letter;
    }
  }
};

export const drawLetters = () => {
  const userList = [];
  const pool = { ...LETTER_POOL };

  while (userList.length < 10) {
    const letter = drawSingleLetter(pool);
    userList.push(letter);
  }

  return userList;

};

export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersDict = {};

  for (const letter of lettersInHand) {
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
  let highestScore = 0;
  let highestWord = '';
  let highestLength = 0;

  for (const word of words) {
    const score = scoreWord(word);
    const wordLength = word.length;

    if (score > highestScore){
      highestScore = score;
      highestWord = word;
      highestLength = wordLength;
    } else if (score === highestScore) {
      // tie-breaking rules:
      // 1. if new word is 10 letters and current isn't, take new word
      if (wordLength === 10 && highestLength !== 10) {
        highestWord = word;
        highestLength = wordLength;
      }
      // 2. if current word is 10 letters, keep it (don't replace)
      else if (highestLength === 10) {
        continue; // continue to the next loop until the last word of the list
      }
      // 3. neither is 10 letters, pick shorter word
      else if (wordLength < highestLength) {
        highestWord = word;
        highestLength = wordLength;
      }
      // 4. same length or new word is longer, keep current (first one wins)
    }
  }

  return {word: highestWord, score: highestScore};
};