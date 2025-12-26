import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Dashboard() {
  const [data, setData] = useState({
    visitors: 0,
    pageViews: 0,
    avgTime: '0m'
  })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setData({
        visitors: Math.floor(Math.random() * 1000) + 500,
        pageViews: Math.floor(Math.random() * 5000) + 2000,
        avgTime: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 60)}s`
      })
    }, 500)
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        maxWidth: '800px',
        margin: '2rem auto'
      }}>
        <div style={{ 
          padding: '1.5rem', 
          border: '1px solid #646cff', 
          borderRadius: '8px',
          background: '#1a1a1a'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#646cff' }}>Visitors</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.visitors}</p>
        </div>
        <div style={{ 
          padding: '1.5rem', 
          border: '1px solid #646cff', 
          borderRadius: '8px',
          background: '#1a1a1a'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#646cff' }}>Page Views</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.pageViews}</p>
        </div>
        <div style={{ 
          padding: '1.5rem', 
          border: '1px solid #646cff', 
          borderRadius: '8px',
          background: '#1a1a1a'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#646cff' }}>Avg Time</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{data.avgTime}</p>
        </div>
      </div>
      <nav style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Go to Home</Link>
        <Link to="/about">Go to About</Link>
      </nav>
    </div>
  )
}

export default Dashboard
