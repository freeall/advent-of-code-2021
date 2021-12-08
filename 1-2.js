const fs = require('fs')

const data = fs.readFileSync('1.txt', 'utf-8').split('\n').map(s => Number(s))
const grouped = data.map((number, i) => {
  const previous1 = data[i - 1]
  const previous2 = data[i - 2]

  if (i === 0) return number
  if (i === 1) return number + previous1
  return number + previous1 + previous2
}).slice(2)
let increased = 0

grouped.forEach((number, i) => {
  if (!i) return

  const previous = grouped[i - 1]
  if (number > previous) increased++
})

console.log(`Increased ${increased} times`)
