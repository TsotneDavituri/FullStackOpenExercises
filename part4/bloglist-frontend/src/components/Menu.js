import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: '23px',
    color: 'navy',
  }

  return (
    <Navbar
      style={{ backgroundColor: '#6fa8dc', borderRadius: '8px' }}
      expand="lg"
    >
      <Navbar.Brand as={Link} to="/" style={padding}>
        blogs
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/create" style={padding}>
            create
          </Nav.Link>
          <Nav.Link as={Link} to="/users" style={padding}>
            users
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
