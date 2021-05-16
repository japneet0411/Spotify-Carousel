import React from 'react';
import './carousel.scss';
import './carousel.css';
import Carousel from './../../components/Carousel/Carousel';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
//import Bar from '../../components/Navbar/navbar'

function Slider() {
	const username = sessionStorage.getItem('user');
	const history = useHistory();
	axios
		.post('http://localhost:5000/checkAuthentication', {
			username: username,
		})
		.then((response) => {
			if (response.data.message) {
				Swal.fire(response.data.message);
			}
			sessionStorage.clear();
			history.push('/login');
		});

	return (
		<div>
			<Carousel />
		</div>
	);
}
export default Slider;
