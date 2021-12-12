const fs = require('fs')

/*
 aa
b  c
b  c
 dd
e  f
e  f
 gg

{
  "a":"d",
  "b":"e",
  "c":"a",
  "d":"f",
  "e":"g",
  "f":"b",
  "g":"c"
}
 dd
e  a
e  a
 ff
g  b
g  b
 cc

*/
const SIGNAL_PATTERN_TO_NUMBER = {
  abcefg: '0',
  cf: '1',
  acdeg: '2',
  acdfg: '3',
  bcdf: '4',
  abdfg: '5',
  abdefg: '6',
  acf: '7',
  abcdefg: '8',
  abcdfg: '9'
}

const entries = fs.readFileSync('8.txt', 'utf-8').trim().split('\n')
  .map(line => ({
    signalPattern: line.split(' | ')[0].split(' '),
    outputValue: line.split(' | ')[1].split(' ')
  }))

const outputSum = entries.reduce((outputSum, { signalPattern, outputValue }) => {
  const mapping = map(signalPattern)
  const output = Number(outputValue.map(char => getNumber(char, mapping)).join(''))
  return outputSum + output
}, 0)
console.log(`Combined output sum is ${outputSum}`)

function getNumber (signalPattern, mapping) {
  const mappedSignalPattern = signalPattern.split('').map(char => mapping[char]).sort().join('')
  const number = SIGNAL_PATTERN_TO_NUMBER[mappedSignalPattern]
  return number
}

function map (signalPatterns) {
  const one = signalPatterns.find(pattern => pattern.length === 2)
  const four = signalPatterns.find(pattern => pattern.length === 4)
  const seven = signalPatterns.find(pattern => pattern.length === 3)
  const eight = signalPatterns.find(pattern => pattern.length === 7)
  const dOrG = 'abcdefg'.split('').filter(char => includedInPatternsCount(signalPatterns, char) === 7)
  const a = seven.split('').find(char => !one.includes(char))
  const b = 'abcdefg'.split('').find(char => includedInPatternsCount(signalPatterns, char) === 6)
  const c = 'abcdefg'.split('').find(char => char !== a && includedInPatternsCount(signalPatterns, char) === 8)
  const d = dOrG.find(char => four.includes(char))
  const e = 'abcdefg'.split('').find(char => includedInPatternsCount(signalPatterns, char) === 4)
  const f = 'abcdefg'.split('').find(char => includedInPatternsCount(signalPatterns, char) === 9)
  const g = dOrG.find(char => char !== d)

  return {
    [a]: 'a',
    [b]: 'b',
    [c]: 'c',
    [d]: 'd',
    [e]: 'e',
    [f]: 'f',
    [g]: 'g'
  }
}

function includedInPatternsCount (signalPatterns, char) {
  return signalPatterns.reduce((includedInPatternsCount, pattern) =>
    includedInPatternsCount + (pattern.includes(char) ? 1 : 0), 0)
}

/*

 aa
b  c
b  c
 dd
e  f
e  f
 gg

0: abcefg
1: cf
2: acdeg
3: acdfg
4: bcdf
5: abdfg
6: abdefg
7: acf
8: abcdefg
9: abcdfg

In how many numbers does each signal occur?
a: 8
b: 6 unique
c: 8
d: 7
e: 4 unique
f: 9 unique
g: 7
*/
