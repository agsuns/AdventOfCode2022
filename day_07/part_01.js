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

const sizeLimit = 100000
const getTotalDirSize = (json) => {
  let dirSize = json.dirSize <= sizeLimit ? json.dirSize : 0

  for (key in json) {
    if (typeof json[key] === 'object') dirSize += getTotalDirSize(json[key])
  }
  return dirSize
}

const json = jsonifyInput(lines)
analyzeDirSizes(json)

// console.log(JSON.stringify(json, null, 2))
console.log(getTotalDirSize(json))

