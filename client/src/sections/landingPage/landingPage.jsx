import React from 'react';
import './landingPage.scss';
import './landingPage.css';
import Background from './../../Images/background.jpg';
import Navbar from './../../components/Navbar/NavbarHome';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<div id='Home'>
			<Navbar />

			<img className='background-Img' alt='background' src={Background}></img>
			<center>
				<h1 className='Heading'>Application Name</h1>
			</center>
			<p className='description'>
				Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum
				Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.
				Lorem Ipsum Dolor Sit Amet.Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor
				Sit Amet.
			</p>
			<Button className='button' variant='dark'>
				<Link to='/login' className='regular'>
					Log In
				</Link>
			</Button>
			<Button className='button' variant='dark'>
				<Link to='/signUp' className='regular'>
					Sign Up
				</Link>
			</Button>
			<Button className='button' variant='dark'>
				<Link to='/guest/carousel' className='regular'>
					Try as Guest
				</Link>
			</Button>
		</div>
	);
}
export default LandingPage;
