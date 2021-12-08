const fs = require('fs')

const data = fs.readFileSync('1.txt', 'utf-8').split('\n').map(s => Number(s))
let increased = 0

data.forEach((number, i) => {
  if (!i) return

  const previous = data[i - 1]
  if (number > previous) increased++
})
console.log(`Increased ${increased} times`)
