import React, { useState } from 'react';
import './login.css';
import './login.scss';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	const loginUser = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/login', {
				username: username,
				password: password,
			})
			.then((response) => {
				console.log(response);
				Swal.fire(response.data.message).then((result) => {
					if (result.isConfirmed) {
						if (response.data.message === 'Success') {
							sessionStorage.setItem('user', username);
							history.push('/' + username + '/carousel');
						}
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='parent'>
			<Form className='Form'>
				<center>
					<h2>LOGIN</h2>
				</center>
				<Form.Group controlId='formGroupEmail'>
					<Form.Label className='label pos'>Username</Form.Label>
					<Form.Control
						className='box'
						type='text'
						placeholder='Enter username'
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='formGroupPassword'>
					<Form.Label className='label'>Password</Form.Label>
					<Form.Control
						className='box'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<p className='text-muted text'>
					Don't have an account yet?<Link to='/signUp'>Sign Up</Link>
				</p>
				<button className='btns' onClick={(e) => loginUser(e)}>
					Log In
				</button>
			</Form>
		</div>
	);
}
export default Login;
