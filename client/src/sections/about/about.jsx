import React from 'react';
import './about.scss';
import './about.css';
import Navbar from './../../components/Navbar/navbarHome';
const About = () => {
	return (
		<div className='about'>
			<Navbar />
			<div id='head'>
				<p class='text'>About</p>
			</div>
			<div id='body'>
				<p class='details'>
					This is the IWPT Project made by: <br></br>
					Aayushi Verma<br></br>
					Japneet Kaur<br></br>
					Swayam Shresth Mohapatra
				</p>
			</div>
		</div>
	);
};

export default About;
