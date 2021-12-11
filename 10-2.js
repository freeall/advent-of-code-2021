const fs = require('fs')

const linesWithSyntaxErrors = fs.readFileSync('10.txt', 'utf-8').trim().split('\n')
const closingChars = {
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>'
}
const scoreTable = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}
const completionScoreTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

const incompleteLines = linesWithSyntaxErrors.filter(line => {
  const stillOpenCharacters = getStillOpenCharacters(line)
  return !!stillOpenCharacters
})
const incompleteScores = incompleteLines.map(line => {
  const stillOpenCharacters = getStillOpenCharacters(line)
  const closingCharacers = stillOpenCharacters.split('').map(char => closingChars[char]).reverse()
  const completionSum = closingCharacers.reduce((completionSum, char) =>
    completionSum * 5 + completionScoreTable[char], 0)
  return completionSum
}).sort((a, b) => a - b)

console.log(`There are ${incompleteScores.length} incomplete lines.`)
console.log(`The lowest score is ${incompleteScores[0]}.`)
console.log(`The highest score is ${incompleteScores[incompleteScores.length - 1]}.`)
console.log(`The middle score is ${incompleteScores[Math.floor(incompleteScores.length / 2)]}.`)

function getStillOpenCharacters (line) {
  const stack = []
  const score = line.split('').reduce((score, char) => {
    if (score > 0) return score

    const isOpenChar = '[({<'.includes(char)
    const isClosingChar = ']})>'.includes(char)
    if (isOpenChar) {
      stack.push(char)
      return 0
    }
    if (isClosingChar) {
      const lastOpeningChar = stack[stack.length - 1]
      if (closingChars[lastOpeningChar] !== char) return scoreTable[char]

      stack.pop()
    }
    return score
  }, 0)
  return score === 0 ? stack.join('') : null
}

