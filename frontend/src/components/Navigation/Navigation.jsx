import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navigation">
      <Link to="/" className="logo gradientText">Nebula-Nexus</Link>

      <button
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active-link' : ''}`} onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active-link' : ''}`} onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="/auth/login" className={({ isActive }) => `nav-link${isActive ? ' active-link' : ''}`} onClick={() => setOpen(false)}>Login</NavLink>
        <NavLink to="/auth/signup" className="nav-link signup" onClick={() => setOpen(false)}>Sign Up</NavLink>
      </div>
    </nav>
  )
}

export default Navigation