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

const totalSyntaxErrorSum = linesWithSyntaxErrors.reduce((totalSyntaxErrorSum, line) => {
  const score = calculateScore(line)
  console.log(`Score ${score} for line ${line}`)
  return totalSyntaxErrorSum + score
}, 0)

console.log(`Total syntax error sum: ${totalSyntaxErrorSum}`)

function calculateScore (line) {
  const stack = []
  return line.split('').reduce((score, char) => {
    if (score > 0) return score

    const isOpenChar = '[({<'.includes(char)
    const isClosingChar = ']})>'.includes(char)
    if (isOpenChar) {
      stack.push(char)
      return 0
    }
    if (isClosingChar) {
      const lastOpeningChar = stack.pop()
      if (closingChars[lastOpeningChar] !== char) return scoreTable[char]
    }
    return score
  }, 0)
}
