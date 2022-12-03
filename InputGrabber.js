const fs = require('fs');
const path = require('path');

const filePath = path.join('.', 'input.txt');
const getInput = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (e) {
    console.log('Error:', e.message);
    return '';
  }
};

module.exports = { getInput };
