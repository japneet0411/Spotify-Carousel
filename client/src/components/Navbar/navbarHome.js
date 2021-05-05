import React from "react"
import {Navbar,Nav} from 'react-bootstrap'
import './navbar.css'
import './navbar.scss'

function Bar()
{
return( 

<Navbar collapseOnSelect expand="false" bg="dark" variant="dark">
  <Navbar.Brand href="#home">App Name</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  
  <Navbar.Collapse id="responsive-navbar-nav">
  <hr class="Line"></hr>
  <Nav className="px-1">
  <Nav.Link href="#">About</Nav.Link>
  <Nav.Link href="#">Contact Us</Nav.Link>


  </Nav>
  </Navbar.Collapse>
</Navbar>

)}
export default Bar;