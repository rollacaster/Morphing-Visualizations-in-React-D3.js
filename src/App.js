import React from 'react'
import './App.css'
import { pack, hierarchy } from 'd3-hierarchy'

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

function App() {
  return (
    <div style={{ paddingLeft: '2rem' }}>
      <h1>Morphing Viz with D3.js & React</h1>
      <svg width="500" height="500">
        {animalsPack.map(({ x, y, r, data: { name } }) => (
          <circle
            key={name}
            cx={x}
            cy={y}
            r={r}
            fill="transparent"
            stroke="black"
          />
        ))}
      </svg>
    </div>
  )
}

export default App
