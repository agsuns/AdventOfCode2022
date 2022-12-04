const { getInput } = require('../InputGrabber');

const data = getInput();
const linesArray = data.split(/\r\n|\n|\r/);

const getPriorityValue = (letter) => {
  if (/[a-z]/.test(letter)) return letter.charCodeAt(0) - 96;
  return letter.charCodeAt(0) - 38;
};

const getItemType = (line) => {
  for (let i = 0; i < line.length / 2; i++) {
    for (let j = line.length / 2; j < line.length; j++) {
      if (line[i] === line[j]) return line[i];
    }
  }
};

const result = linesArray.reduce((acc, line) => {
  return acc + getPriorityValue(getItemType(line));
}, 0);

console.log(result);
