import React, { useState } from 'react'
import './App.css'
import { pack, hierarchy, tree } from 'd3-hierarchy'

const data = {
  name: 'Animals',
  children: [
    {
      name: 'Fish',
      children: [
        { name: 'Marine', children: [{ name: 'Hailbut' }] },
        { name: 'Fresh Water', children: [{ name: 'Rainbow trout' }] }
      ]
    },
    {
      name: 'Mammals',
      children: [{ name: 'Dog' }, { name: 'Cat' }, { name: 'Mouse' }]
    }
  ]
}

const animalsHierarchy = () => hierarchy(data).sum(() => 1)
const createPack = pack()
  .size([500, 490])
  .padding(20)
const animalsPack = createPack(animalsHierarchy()).descendants()

const createTree = tree().size([500, 480])
const animalsTree = createTree(animalsHierarchy())

const prepareData = () => {
  return animalsPack.map((packItem, i) => ({
    packItem,
    treeItem: animalsTree.descendants()[i]
  }))
}

console.log(prepareData())

const colors = ['#F2B950', '#F29441', '#D9753B', '#D9501E']

const lineLength = (x1, y1, x2, y2) => {
  const a = y1 - y2
  const b = x1 - x2
  return Math.sqrt(a ** 2 + b ** 2)
}

function App() {
  const [toggle, setToggle] = useState(true)
  return (
    <div style={{ paddingLeft: '2rem' }}>
      <h1>Morphing Viz with D3.js & React</h1>
      <button onClick={() => setToggle(!toggle)}>Morph</button>
      <svg width="500" height="500">
        <g transform="translate(0, 10 )">
          {animalsTree
            .links()
            .map(
              ({ source: { x: x1, y: y1 }, target: { x: x2, y: y2 } }, i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="darkgray"
                  style={{
                    opacity: toggle ? 1 : 0,
                    transition: 'all 2s',
                    strokeDasharray: lineLength(x1, y1, x2, y2),
                    strokeDashoffset: toggle ? 0 : lineLength(x1, y1, x2, y2)
                  }}
                />
              )
            )}
          {prepareData().map(
            ({
              treeItem: {
                x,
                y,
                data: { name },
                depth
              },
              packItem: { x: cx, y: cy, r }
            }) => (
              <circle
                style={{ transition: 'all 3s' }}
                key={name}
                cx={toggle ? x : cx}
                cy={toggle ? y : cy}
                r={toggle ? 10 : r}
                fill={colors[depth]}
              />
            )
          )}
        </g>
      </svg>
    </div>
  )
}

export default App
