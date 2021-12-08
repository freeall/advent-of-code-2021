const fs = require('fs')

const data = fs.readFileSync('2.txt', 'utf-8').split('\n')
let horizontal = 0
let depth = 0

data.forEach(str => {
  const [command, valueStr] = str.split(' ')
  const value = Number(valueStr)
  if (command === 'forward') horizontal += value
  if (command === 'down') depth += value
  if (command === 'up') depth -= value
})

console.log(`horizontal=${horizontal}, depth=${depth}, horizontal*y=${horizontal*y}`)
