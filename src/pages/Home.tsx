import { Link } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

      </div>
      <h1>ProjetoA (Vite + React + Docker)</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <nav style={{ marginTop: '2rem' }}>
        <Link to="/about" style={{ marginRight: '1rem' }}>Go to About</Link>
        <Link to="/dashboard">Go to Dashboard</Link>
      </nav>
    </>
  )
}

export default Home
