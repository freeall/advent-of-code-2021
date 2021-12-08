const fs = require('fs')

const fish = fs.readFileSync('6.txt', 'utf-8').trim().split('\n')[0].split(',').map(Number).reduce((fish, daysToCreateNewFish) => {
  fish[daysToCreateNewFish] = fish[daysToCreateNewFish] || 0
  fish[daysToCreateNewFish]++
  return fish
}, { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 })
console.log(fish)
let day = 0

console.log(`Day ${day}: ${JSON.stringify(fish)}`)
new Array(256).fill(0).forEach(() => {
  nextDay()
  const length = Object.values(fish).reduce((length, i) => length + i)
  console.log(`Day ${++day}: ${JSON.stringify(length)}`)
})

function nextDay() {
  let addFish = 0
  const newFishies = fish[0]
  fish[0] = fish[1]
  fish[1] = fish[2]
  fish[2] = fish[3]
  fish[3] = fish[4]
  fish[4] = fish[5]
  fish[5] = fish[6]
  fish[6] = fish[7] + newFishies
  fish[7] = fish[8]
  fish[8] = newFishies
}
