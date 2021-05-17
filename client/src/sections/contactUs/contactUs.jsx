import React from 'react';
import './contactUs.scss';
import './contactUs.css';
import Navbar from './../../components/Navbar/navbar';
import { Button, Form } from 'react-bootstrap';
function Contact() {
	return (
		<div className='contact'>
			<Navbar />
			<div id='head'>
				<p class='text'>Contact Us</p>
			</div>
			<div id='body'>
				Having any Queries?<br></br>
				Provide your Details below, we will reach to you Asap!<br></br>
				<Form>
					<Form.Group controlId='formBasicName'>
						<Form.Label>Name</Form.Label>
						<Form.Control type='text' placeholder='Enter Name' />
					</Form.Group>

					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control type='email' placeholder='Enter email' />
						<Form.Text className='text-muted'>
							We'll never share your data with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId='ControlTextarea1'>
						<Form.Label>Feedback/Queries</Form.Label>
						<Form.Control as='textarea' rows={3} />
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default Contact;
