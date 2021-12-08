const fs = require('fs')

const data = fs.readFileSync('5.txt', 'utf-8').trim().split('\n')

const lines = data.reduce((lines, line) => {
  const [from, to] = line.split(' -> ')
  const [x1, y1] = from.split(',').map(Number)
  const [x2, y2] = to.split(',').map(Number)
  lines.push([[x1, y1], [x2, y2]])
  return lines
}, [])
const maxX = Math.max(...lines.map(line => Math.max(...line.map(p => p[0]))))
const maxY = Math.max(...lines.map(line => Math.max(...line.map(p => p[1]))))

const map = []

lines.forEach(([[x1, y1], [x2, y2]]) => {
  const isVertical = x1 === x2
  const isHorizontal = y1 === y2
  const isDiagonal = !isVertical && !isHorizontal

  if (isVertical) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      map[y] = map[y] || []
      map[y][x1] = (map[y][x1] || 0) + 1
    }
  }
  if (isHorizontal) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      map[y1] = map[y1] || []
      map[y1][x] = (map[y1][x] || 0) + 1
    }
  }
  if (isDiagonal) {
    let [x, y] = [x1, y1]
    while (x !== x2 && y !== y2) {
      map[y] = map[y] || []
      map[y][x] = (map[y][x] || 0) + 1
      x += x1 > x2 ? -1 : 1
      y += y1 > y2 ? -1 : 1
    }
    map[y] = map[y] || []
    map[y][x] = (map[y][x] || 0) + 1
  }
})

let overlaps = 0
let mapStr = ''

for (let x = 0; x <= maxX; x++) {
  for (let y = 0; y <= maxY; y++) {
    mapStr += map[x]?.[y] || '.'

    if (map[x] && map[x][y] >= 2) {
      // console.log(`[${x},${y}] ${map[x][y]}`)
      overlaps++
    }
  }
  mapStr += '\n'
}

console.log(mapStr)
console.log(`There are ${overlaps} overlaps`)
