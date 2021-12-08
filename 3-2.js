const fs = require('fs')

const data = fs.readFileSync('3.txt', 'utf-8').trim().split('\n')

const oxygenRatingBits = getOxygenRating(data)
const oxygenRating = Number(`0b${oxygenRatingBits}`)
const co2RatingBits = getCo2Rating(data)
const co2Rating = Number(`0b${co2RatingBits}`)
const lifeSupportRating = oxygenRating * co2Rating
console.log(`oxygenRatingBits=${oxygenRatingBits}(${oxygenRating}) co2RatingBits=${co2RatingBits}(${co2Rating}) lifeSupportRating=${lifeSupportRating}`)


function getOxygenRating (arr) {
  let filtered = [...data]
  for (let position = 0; position < 12; position++) {
    if (filtered.length === 1) continue
    const bitUses = getBitUses(filtered)
    const bitMostUsedInPosition = bitUses[position][0] > bitUses[position][1]
      ? '0'
      : bitUses[position][0] < bitUses[position][1]
        ? '1'
        : '='
    filtered = filtered.filter(value => {
      if (value[position] === bitMostUsedInPosition) return true
      if (bitMostUsedInPosition === '=' && value[position] === '1') return true
      return false
    })
  }
  return filtered[0]
}

function getCo2Rating (arr) {
  let filtered = [...data]
  for (let position = 0; position < 12; position++) {
    if (filtered.length === 1) continue
    const bitUses = getBitUses(filtered)
    const bitLeastUsedInPosition = bitUses[position][0] > bitUses[position][1]
      ? '1'
      : bitUses[position][0] < bitUses[position][1]
        ? '0'
        : '='
    filtered = filtered.filter(value => {
      if (value[position] === bitLeastUsedInPosition) return true
      if (bitLeastUsedInPosition === '=' && value[position] === '0') return true
      return false
    })
  }
  return filtered[0]
}


function getBitUses (arr) {
  const initVector = new Array(12).fill(1).map(_ => ([0, 0]))
  const bitUses = arr.reduce((bitUses, value) => {
    for (let i = 0; i < 12; i++) {
      bitUses[i][value[i]] += 1
    }

    return bitUses
  }, initVector)
  return bitUses
}
