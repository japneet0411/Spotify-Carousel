import React from "react"
import {Navbar,Nav} from 'react-bootstrap'
import './navbar.css'
import './navbar.scss'

function Items(elem)
{
  var link=`# ${elem}`
   return ( <Nav.Link href={link}>{elem}</Nav.Link>)
}
function Bar(props)
{
return( 

<Navbar collapseOnSelect expand="false" bg="dark" variant="dark">
  <Navbar.Brand href="#home">App Name</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-0 px-3">
  
      {props.items.map(Items)}
</Nav>
  </Navbar.Collapse>
</Navbar>

)}
export default Bar;