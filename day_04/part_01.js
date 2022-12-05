const { getInput } = require('../inputGetter');

const data = getInput();
const linesArray = data.split(/\r\n|\n|\r/);

const doesSectionContain = (section1, section2) => {
  if (section1[0] <= section2[0] && section1[1] >= section2[1]) return true;
  if (section2[0] <= section1[0] && section2[1] >= section1[1]) return true;
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
  if (doesSectionContain(section1, section2)) return acc + 1;
  return acc;
}, 0);

console.log(result);
