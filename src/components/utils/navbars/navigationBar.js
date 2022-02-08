import React from 'react';
import "./navigationBar.css"
import {Navbar, Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';

//links enables switching pages with no reloading 
import {Link} from "react-router-dom"

/**
 * 
 * @param {*} setToken - state parameter that sets token to undefined and thus logs out the user  
 * @returns Nabvigation bar
 */
export default function navigationBar({setToken}) {

  const handleLogout = () => {

    setToken("undefined")
    
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand  as={Link} to="/">|DASH|</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              
                <Nav.Link as={Link} to="/" >HOME</Nav.Link>
                <Nav.Link as={Link} to="/power">POWER</Nav.Link>
                <Nav.Link as={Link} to="/weather">WEATHER</Nav.Link>
            
              </Nav>

              <Nav>
                <Nav.Link onClick={handleLogout} >LOGOUT</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            
          </Navbar>
    </div>
  )
}

navigationBar.propTypes = {
  setToken: PropTypes.func.isRequired
}