const { getInput } = require('../inputGetter')

const lines = getInput().split(/\r\n|\n|\r/g)

const jsonifyInput = (input) => {
  const jsonifiedInput = {"/": {}}
  let path = []
  let commandRgx = /^\$ (?<command>cd|ls)[ ]?(?<dirName>.+)?/

  for(let i = 0; i < input.length; i++) {
    if (commandRgx.test(input[i])) {
      const match = input[i].match(commandRgx)

      if (match?.groups?.command === 'cd') {
        if (match.groups.dirName === '..') {
          path.pop()
          continue
        }

        path.push(match.groups.dirName)
      }
    }
    else {
      let objRef = jsonifiedInput
      path.forEach(subPath => {
        objRef = objRef[subPath]
      })

      const fileRgx = /^(?<fileSize>\d+) (?<fileName>.+)/
      const dirRgx = /^dir (?<dirName>.+)/

      if (fileRgx.test(input[i])) {
        const match = input[i].match(fileRgx)

        objRef[match.groups.fileName] = +match.groups.fileSize
        continue
      }
      if (dirRgx.test(input[i])) {
        const match = input[i].match(dirRgx)

        objRef[match.groups.dirName] = {}
        continue
      }
    }
  }
  return jsonifiedInput
}

const analyzeDirSizes = (json) => {
  let dirSize = 0

  for (key in json) {
    if (typeof json[key] === 'number') {
      dirSize += json[key]
    }
    else {
      dirSize += analyzeDirSizes(json[key])
    }
  }

  json.dirSize  = dirSize
  return dirSize
}

const getSmallerSize = (json) => {
  let smallest = json.dirSize
  if (json.dirSize >= requiredSpace && json.dirSize < smallest) temp = json.dirSize

  for (key in json) {
    if (typeof json[key] !== 'object') continue

    const innerDirSize = getSmallerSize(json[key])
    if ( innerDirSize >= requiredSpace && innerDirSize < smallest) smallest = innerDirSize
  }
  return smallest
}

const json = jsonifyInput(lines)
const outermostSize = analyzeDirSizes(json)
const requiredSpace = 30000000 - (70000000 - outermostSize)

// console.log(JSON.stringify(json, null, 2))
console.log(getSmallerSize(json))

