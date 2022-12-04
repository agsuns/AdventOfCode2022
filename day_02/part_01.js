const { getInput } = require('../InputGrabber');

const data = getInput();
const linesArray = data.split(/\r\n|\n|\r/);

const gameJudge = {
  [['rock', 'rock']]: 'draw',
  [['rock', 'paper']]: 'win',
  [['rock', 'scissors']]: 'loss',
  [['paper', 'rock']]: 'loss',
  [['paper', 'paper']]: 'draw',
  [['paper', 'scissors']]: 'win',
  [['scissors', 'rock']]: 'win',
  [['scissors', 'paper']]: 'loss',
  [['scissors', 'scissors']]: 'draw',
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

const yourPlayMap = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

const singleRoundScore = (opponentsPlay, yourPlay) => {
  const opponentsPlayMapped = opponentsPlayMap[opponentsPlay];
  const yourPlayMapped = yourPlayMap[yourPlay];

  const shapeScore = shapeScoreMap[yourPlayMapped];
  const gameResult = gameJudge[[opponentsPlayMapped, yourPlayMapped]];
  const outcomeScore = outcomeScoreMap[gameResult];

  return shapeScore + outcomeScore;
};

const totalScore = linesArray.reduce((acc, line) => {
  return acc + singleRoundScore(line[0], line[2]);
}, 0);

console.log(totalScore);
