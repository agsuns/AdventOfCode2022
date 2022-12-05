const { getInput } = require('../inputGetter');

const data = getInput();
const linesArray = data.split(/\r\n|\n|\r/);

const doSectionsOverlap = (section1, section2) => {
  const { biggestSec, smallestSec } =
    section1[1] >= section2[1]
      ? { biggestSec: section1, smallestSec: section2 }
      : { biggestSec: section2, smallestSec: section1 };

  if (smallestSec[1] <= biggestSec[1] && smallestSec[1] >= biggestSec[0])
    return true;
  return false;
};

const sectionMap = (line) => {
  const sections = line.split(',');

  let section1 = sections[0].split('-');
  section1 = section1.map((item) => Number(item));
  let section2 = sections[1].split('-');
  section2 = section2.map((item) => Number(item));

  return { section1, section2 };
};

const result = linesArray.reduce((acc, line) => {
  const { section1, section2 } = sectionMap(line);
  if (doSectionsOverlap(section1, section2)) return acc + 1;
  return acc;
}, 0);

console.log(result);
