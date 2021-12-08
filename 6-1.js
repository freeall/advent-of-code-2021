const fs = require('fs')

const fish = fs.readFileSync('6.txt', 'utf-8').trim().split('\n')[0].split(',').map(Number)
let day = 0

console.log(`Day ${day}: ${fish.length}`)
new Array(80).fill(0).forEach(() => {
  nextDay()
  console.log(`Day ${++day}: ${fish.length}`)
})

function nextDay () {
  let addFish = 0
  fish.forEach((daysToCreateNewFish, i) => {
    if (daysToCreateNewFish === 0) {
      addFish++
      fish[i] = 6
      return
    }
    fish[i]--
  })
  fish.push(...Array(addFish).fill(8))
}
