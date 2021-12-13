const fs = require('fs')

const lines = fs.readFileSync('13.txt', 'utf-8').trim().split('\n')
const folds = lines
  .filter(line => line.includes('fold along'))
  .map(line => line.split('fold along ').pop())
  .map(line => line.split('='))
const coordinates = lines.filter(line => line.includes(',')).map(line => line.split(',').map(Number))
const maxX = Math.max(...coordinates.map(([x, y]) => x))
const maxY = Math.max(...coordinates.map(([x, y]) => y))
const map = new Array(maxY + 1).fill(0).map(xs => new Array(maxX + 1).fill('.'))

coordinates.forEach(([x, y]) => {
  const [foldedX, foldedY] = fold([x, y], folds[0])

  map[foldedY][foldedX] = '#'
})

function fold ([x, y], [foldDirection, foldNumber]) {
  if (foldDirection === 'x') x = x <= foldNumber ? x : x - (2 * (x - foldNumber))
  if (foldDirection === 'y') y = y <= foldNumber ? y : y - (2 * (y - foldNumber))
  return [x, y]
}
const totalCoordinates = map.reduce((totalCoordinates, xs) => totalCoordinates + xs.filter(x => x === '#').length, 0)
print()
console.log(`After folding the total coordinates are now ${totalCoordinates}`)

function print () {
  console.log(map.map(xs => xs.join('')).join('\n'))
}
