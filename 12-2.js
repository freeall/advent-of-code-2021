const fs = require('fs')

const input = fs.readFileSync('12.txt', 'utf8').trim().split('\n')
const vertices = input.reduce((vertices, edge) => {
  const [from, to] = edge.split('-')
  vertices[from] = vertices[from] || { edges: [] }
  vertices[to] = vertices[to] || { edges: [] }
  return vertices
}, {})
input.forEach(edge => {
  const [from, to] = edge.split('-')
  vertices[from].edges.push(to)
  vertices[to].edges.push(from)
})
const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const paths = []

traverse('start', [])
console.log(paths)
console.log(`There are ${paths.length} paths`)


function traverse (verticeName, visited) {
  const vertice = vertices[verticeName]
  const isSmallCave = lowercase.includes(verticeName[0]) // enough to check first characteer
  const isLargeCave = uppercase.includes(verticeName[0]) // enough to check first characteer

  if (verticeName === 'start' && visited.length) return // do not visit start again

  // if this is a small cave and you have not visited a small cave twice before it's ok to visit it
  const hasAlreadyVisitedThisCave = visited.some(visitedVerticeName => visitedVerticeName === verticeName)
  const hasVisitedASingleSmallCaveTwice = visited.filter((verticeName, index) => lowercase.includes(verticeName[0]) && visited.indexOf(verticeName) !== index).length > 0
  if (isSmallCave && hasVisitedASingleSmallCaveTwice && hasAlreadyVisitedThisCave) return

  visited = [...visited, verticeName]

  if (verticeName === 'end') return paths.push(visited)

  vertice.edges.forEach(edge => traverse(edge, visited))
}
