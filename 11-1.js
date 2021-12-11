const fs = require('fs')

const energyMap = fs.readFileSync('11.txt', 'utf8').trim().split('\n').map(row => row.split('').map(Number))
let flashCount = 0

new Array(100).fill(0).forEach(() => nextStep())
console.log(`After 100 steps there were ${flashCount} flashes`)

function nextStep() {
  energyMap.forEach((row, y) => row.forEach((_, x) => energyMap[y][x] += 1))
  energyMap.forEach((row, y) => row.forEach((value, x) => {
    if (value === 10) flash(x, y)
  }))
}

function flash(x, y) {
  flashCount++
  energyMap[y][x] = 0
  const points = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1]
  ]
  points.forEach(([x, y]) => {
    const isPointOutsideofMap = x < 0 || y < 0 || x >= energyMap[0].length || y >= energyMap.length
    if (isPointOutsideofMap) return

    const hasAlreadyFlashedThisStepFlashed = energyMap[y][x] === 0 || energyMap[y][x] === 10
    if (hasAlreadyFlashedThisStepFlashed) return

    energyMap[y][x] += 1
    const shouldFlash = energyMap[y][x] === 10
    if (shouldFlash) flash(x, y)
  })
}
