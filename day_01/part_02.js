const { getInput } = require('../inputGetter');

const data = getInput();
const linesArray = data.split(/\r\n|\r|\n/);

let helper = 0;
const parsedArray = [];

for (let i = 0; i < linesArray.length; i++) {
  if (linesArray[i] === '') {
    parsedArray.push(helper);
    helper = 0;
  }
  helper += Number(linesArray[i]);
}

parsedArray.sort((a, b) => b - a);
const sum = parsedArray[0] + parsedArray[1] + parsedArray[2];
console.log(sum);
