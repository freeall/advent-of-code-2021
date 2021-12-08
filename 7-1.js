const fs = require('fs')

const positions = fs.readFileSync('7.txt', 'utf-8').trim().split('\n')[0].split(',').map(Number)
const maxPosition = Math.max(...positions)

let bestPositionDay = 0
let bestPositionFuelConsumptiom = fuelToPosition(0)

new Array(maxPosition + 1).fill(0).forEach((_, i) => {
  console.log(`${i}: ${fuelToPosition(i)}`)

  if (fuelToPosition(i) < bestPositionFuelConsumptiom) {
    bestPositionDay = i
    bestPositionFuelConsumptiom = fuelToPosition(i)
  }
})
console.log(`Best position: ${bestPositionDay} (${fuelToPosition(bestPositionDay)})`)

function fuelToPosition (endPosition) {
  return positions.reduce((fuelToPosition, currentPosition) => fuelToPosition + Math.abs(endPosition - currentPosition), 0)
}
