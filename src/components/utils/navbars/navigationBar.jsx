//vnesem vse knjižnice ter css datoteko
import React from 'react';
import "./navigationBar.css"
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom"

// v spodnji funkciji uporabim boostrap knjižnico za navigacijski zavihek
export default function navigationBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">|DASH|</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" >HOME</Nav.Link>
                <Nav.Link as={Link} to="/rezka">REZKA</Nav.Link>
                <Nav.Link as={Link} to="/vreme">VREME</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    </div>
  )
}
