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
  .size([500, 500])
  .padding(20)
const animalsPack = createPack(animalsHierarchy()).descendants()

const createTree = tree().size([500, 480])
const animalsTree = createTree(animalsHierarchy())

function App() {
  const [toggle, setToggle] = useState(true)
  return (
    <div style={{ paddingLeft: '2rem' }}>
      <h1>Morphing Viz with D3.js & React</h1>
      <button onClick={() => setToggle(!toggle)}>Morph</button>
      <svg width="500" height="500">
        {toggle ? (
          animalsPack.map(({ x, y, r, data: { name } }) => (
            <circle
              key={name}
              cx={x}
              cy={y}
              r={r}
              fill="transparent"
              stroke="black"
            />
          ))
        ) : (
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
                    stroke="black"
                  />
                )
              )}
            {animalsTree.descendants().map(({ x, y, data: { name } }) => (
              <circle
                key={name}
                cx={x}
                cy={y}
                r={10}
                fill="transparent"
                stroke="black"
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}

export default App
