const { getInput } = require('../inputGetter');

const datastream = getInput()

let result = 0
const subsetSize = 14

const isSetUnique = (subset) => {
  const set = new Set(subset)

  if (set.size === subset.length) return true
  return false
}

for(let i = 0; i < datastream.length - subsetSize; i++) {
  if (isSetUnique(datastream.slice(i, i + subsetSize))) {
    result = i + subsetSize
    break
  }
}

console.log(result)