const fs = require('fs')

const heightmap = fs.readFileSync('9.txt', 'utf-8').trim().split('\n')

let totalRiskLevel = 0
heightmap.forEach((y, y1) => {
  y.split('').forEach((x, x1) => {
    const up = heightmap[y1 - 1] ? Number(heightmap[y1 - 1][x1]) : Infinity
    const down = heightmap[y1 + 1] ? Number(heightmap[y1 + 1][x1]) : Infinity
    const left = heightmap[y1][x1 - 1] ? Number(heightmap[y1][x1 - 1]) : Infinity
    const right = heightmap[y1][x1 + 1] ? Number(heightmap[y1][x1 + 1]) : Infinity
    const here = Number(x)
    // console.log(here, up, down, left, right)
    if (here < up && here < down && here < left && here < right) {
      totalRiskLevel += here + 1
    }
  })
})

console.log(`Total risk level: ${totalRiskLevel}`)
