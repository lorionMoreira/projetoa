import { Link } from 'react-router-dom'

function About() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>About Page</h1>
      <p>
        This is a React + Vite project configured to run in Docker with a base path of <code>/projecta/</code>.
      </p>
      <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '2rem auto' }}>
        <li>✅ Development environment with hot reload</li>
        <li>✅ Production build with nginx</li>
        <li>✅ Configured for reverse proxy at /projecta/</li>
        <li>✅ React Router with proper basename</li>
      </ul>
      <nav style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Go to Home</Link>
        <Link to="/dashboard">Go to Dashboard</Link>
      </nav>
    </div>
  )
}

export default About
