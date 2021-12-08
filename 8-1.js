const fs = require('fs')

const entries = fs.readFileSync('8.txt', 'utf-8').trim().split('\n')
  .map(line => ({
    signalPattern: line.split(' | ')[0].split(' '),
    outputValue: line.split(' | ')[1].split(' ')
  }))

const easyOutputDigits = entries.reduce((easyOutputDigits, { outputValue }) => {
  return easyOutputDigits + outputValue.filter(isAnEasyOutputDigit).length
}, 0)

console.log(`The number of easy output digits is ${easyOutputDigits}`)

function isAnEasyOutputDigit (segments) {
  return segments.length === 2 || // 1
    segments.length === 4 || // 4
    segments.length === 3 || // 7
    segments.length === 7 // 8
}
