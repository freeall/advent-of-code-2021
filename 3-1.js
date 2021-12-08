const fs = require('fs')

const data = fs.readFileSync('3.txt', 'utf-8').trim().split('\n')

const initVector = new Array(12).fill(1).map(_ => ([0, 0]))
const bitUses = data.reduce((bitUses, value) => {
  for (let i = 0; i < 12; i++) {
    bitUses[i][value[i]] += 1
  }

  return bitUses
}, initVector)
const endBits = bitUses.map(([zeroes, ones]) => zeroes > ones ? 0 : 1).join('')
const gammaRateBits = bitUses.map(([zeroes, ones]) => zeroes > ones ? 1 : 0).join('')
const epsilonRateBits = bitUses.map(([zeroes, ones]) => zeroes > ones ? 0 : 1).join('')
const gammaRate = Number(`0b${gammaRateBits}`)
const epsilonRate = Number(`0b${epsilonRateBits}`)
console.log(`gammaRateBits=${gammaRateBits}(${gammaRate}) epsilonRateBits=${epsilonRateBits}(${epsilonRate})`)
console.log(`Power consumption=${gammaRate * epsilonRate}`)
