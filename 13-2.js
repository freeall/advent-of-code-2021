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
  const [foldedX, foldedY] = folds.reduce((newPoint, nextFold) =>
    fold(newPoint, nextFold), [x, y])

  map[foldedY][foldedX] = '#'
})

function fold ([x, y], [foldDirection, foldNumber]) {
  if (foldDirection === 'x') x = x <= foldNumber ? x : x - (2 * (x - foldNumber))
  if (foldDirection === 'y') y = y <= foldNumber ? y : y - (2 * (y - foldNumber))
  return [x, y]
}

print()

function print () {
  let maxX = 0
  let maxY = 0
  map.forEach((ys, y) => ys.forEach((char, x) => {
    if (char !== '#') return
    maxX = Math.max(x, maxX)
    maxY = Math.max(y, maxY)
  }))

  console.log(map.slice(0, maxY + 1).map(xs => xs.slice(0, maxX + 1).join('')).join('\n'))
}
