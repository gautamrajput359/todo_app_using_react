import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
            <div className="logo">iTask</div>
            <ul className='list'>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
    </nav>
  )
}

export default Navbar
