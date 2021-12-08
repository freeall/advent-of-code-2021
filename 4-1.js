const fs = require('fs')

const data = fs.readFileSync('4.txt', 'utf-8').trim().split('\n')

const numbers = data[0].split(',').map(Number)
const boardsData = data.slice(2)
const boards = chunkify(boardsData, 6, 1)
  .map(lines =>
    lines.map(line =>
      chunkify(line.split(''), 3, 1).map(number => ({
        number: Number(number.join('').trim()),
        marked: false
      }))))
numbers.forEach(number => {
  mark(number)
  // console.log(JSON.stringify(boards, null, 2))
  const winner = winnerBoard()
  if (winner) {
    console.log(winner)
    let sum = 0
    winner.forEach(lines => lines.forEach(mark => {
      if (!mark.marked) {
        sum += mark.number
      }
    }))
    console.log('sum', sum)
    console.log('last number', number)
    console.log('answer', sum * number)
    process.exit(1)

    /*
    The score of the winning board can now be calculated.
    Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188.
    Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.
    To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?


    */
  }
})
// console.log(JSON.stringify(boards, null, 2))

function chunkify (arr, chunkSize, skip) {
  let R = []
  for (let i = 0, len = arr.length; i < len; i += chunkSize) {
    R.push(arr.slice(i, i + (chunkSize - skip)))
  }
  return R
}

function mark (number) {
  // console.log(`Marking ${number}`)
  boards.forEach(lines =>
    lines.forEach(line =>
      line.forEach(mark => {
        mark.marked = mark.marked || (mark.number === number)
      }
    )))
}

function winnerBoard () {
  return boards.find(lines =>
    lines.find(line =>
      line.every(mark =>
        !!mark.marked)))
}
