const { getInput } = require('../InputGrabber');

const data = getInput();
const linesArray = data.split(/\r\n|\r|\n/);
let mostCalories = 0;
let helper = 0;

for (let i = 0; i < linesArray.length; i++) {
  if (linesArray[i] === '') {
    if (helper > mostCalories) mostCalories = helper;
    helper = 0;
  }
  helper += Number(linesArray[i]);
}

console.log(mostCalories);
