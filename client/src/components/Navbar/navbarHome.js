import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';
import './Navbar.scss';
import { Link } from 'react-router-dom';

function Bar() {
	return (
		<Navbar collapseOnSelect expand='false' bg='dark' variant='dark'>
			<Navbar.Brand href='#'>
				<Link to='/' className='regular'>
					App Name
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />

			<Navbar.Collapse
				id='responsive-navbar-nav'
				style={{ textAlign: 'right' }}>
				<hr class='Line'></hr>
				<Nav className='px-1'>
					<Nav.Link href='#'>
						<Link to='/about' className='regular'>
							About
						</Link>
					</Nav.Link>
					<Nav.Link href='#'>
						<Link to='/contactUs' className='regular'>
							Contact Us
						</Link>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
export default Bar;
