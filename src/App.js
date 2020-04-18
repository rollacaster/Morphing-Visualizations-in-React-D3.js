import React from 'react'
import './App.css'

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

function App() {
  return (
    <div style={{ paddingLeft: '2rem' }}>
      <h1>Morphing Viz with D3.js & React</h1>
    </div>
  )
}

export default App
