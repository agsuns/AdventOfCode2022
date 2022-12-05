const { getInput } = require('../inputGetter');

const data = getInput();
const linesArray = data.split(/\r\n|\n|\r/);

const gameJudge = {
  [['rock', 'draw']]: 'rock',
  [['rock', 'win']]: 'paper',
  [['rock', 'loss']]: 'scissors',
  [['paper', 'loss']]: 'rock',
  [['paper', 'draw']]: 'paper',
  [['paper', 'win']]: 'scissors',
  [['scissors', 'win']]: 'rock',
  [['scissors', 'loss']]: 'paper',
  [['scissors', 'draw']]: 'scissors',
};

const outcomeScoreMap = {
  loss: 0,
  draw: 3,
  win: 6,
};

const shapeScoreMap = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const opponentsPlayMap = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
};

const expectedResultMap = {
  X: 'loss',
  Y: 'draw',
  Z: 'win',
};

const singleRoundScore = (opponentsPlay, expectedResult) => {
  const opponentsPlayMapped = opponentsPlayMap[opponentsPlay];
  const expectedResultMapped = expectedResultMap[expectedResult];
  const yourPlayMapped = gameJudge[[opponentsPlayMapped, expectedResultMapped]];

  const shapeScore = shapeScoreMap[yourPlayMapped];
  const outcomeScore = outcomeScoreMap[expectedResultMapped];

  return shapeScore + outcomeScore;
};

const totalScore = linesArray.reduce((acc, line) => {
  return acc + singleRoundScore(line[0], line[2]);
}, 0);

console.log(totalScore);
