const fs = require('fs')

const data = fs.readFileSync('2.txt', 'utf-8').split('\n')
let horizontal = 0
let depth = 0
let aim = 0

data.forEach(str => {
  const [command, valueStr] = str.split(' ')
  const value = Number(valueStr)
  if (command === 'forward') {
    horizontal += value
    depth += aim * value
  }
  if (command === 'down') aim += value
  if (command === 'up') aim -= value
})

console.log(`horizontal=${horizontal}, depth=${depth}, aim=${aim}, horizontal*depth=${horizontal * depth}`)
