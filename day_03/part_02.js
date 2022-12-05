const { getInput } = require('../inputGetter');

const data = getInput();
const linesArray = data.split(/\r\n|\n|\r/);

const getPriorityValue = (letter) => {
  if (/[a-z]/.test(letter)) return letter.charCodeAt(0) - 96;
  return letter.charCodeAt(0) - 38;
};

const getItemType = (line1, line2, line3) => {
  for (let i = 0; i < line1.length; i++) {
    if (line2.includes(line1[i]) && line3.includes(line1[i])) return line1[i];
  }
};

let result = 0;
for (let i = 0; i < linesArray.length; i += 3) {
  result += getPriorityValue(
    getItemType(linesArray[i], linesArray[i + 1], linesArray[i + 2]),
  );
}

console.log(result);
