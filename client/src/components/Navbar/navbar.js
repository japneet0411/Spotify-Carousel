import React, { useState, useEffect } from "react"
import {Navbar,Nav} from 'react-bootstrap'
import Switch from "react-switch";
import './navbar.css'
import './Navbar.scss'

function Bar(props)
{
const[checked,handleChange]=useState(true);
const [expanded, setExpanded] = useState(false);



 function Change(){
    setExpanded(true);
    if(checked === true)
          handleChange(false);
    else
          handleChange(true);
    }

return( 

<Navbar collapseOnSelect expand="false" bg="dark" variant="dark" expanded={!(props.modalOpen) && expanded}
  >
  <Navbar.Brand href="#home">App Name</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
  
  <Navbar.Collapse id="responsive-navbar-nav">
  <hr class="Line"></hr>
  <Nav className="px-1" style={{ textAlign: 'right' }}>
  <Nav.Link href="#" onClick={() => setExpanded(false)}>Carousel</Nav.Link>
  <Nav.Link href="#" onClick={() => setExpanded(false)}>Wall of Music</Nav.Link>
  <Nav.Link href="#" onClick={() => setExpanded(false)}>Get Recommendations</Nav.Link>
  <Nav.Link href="#" onClick={() => setExpanded(false)}>Tracks Saved for Later</Nav.Link>
  <Nav.Link href="#" onClick={() => setExpanded(false)}>Saved Playlists</Nav.Link>
  <Nav.Link href="#" onClick={() => setExpanded(false)} style={{ marginLeft: '65%'}}>Explicit Tracks </Nav.Link>
      <Switch 
      className="toggle" 
      onChange={Change} 
      checked={checked} 
      checkedIcon={false} 
      uncheckedIcon={false}
      width={50}
      height={25}
      onColor={'#1681FF'}
      offColor={'#CFCFCF'}
       /> 
  

  </Nav>
  </Navbar.Collapse>
</Navbar>

)}
export default Bar;