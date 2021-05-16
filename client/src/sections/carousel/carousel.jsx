import React from 'react';
import './carousel.scss';
import './carousel.css';
import Carousel from './../../components/Carousel/Carousel';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';
//import Bar from '../../components/Navbar/navbar'

function Slider() {
	const username = sessionStorage.getItem('user');
	const history = useHistory();
	const params = useParams();
	if (!username || username !== params.username) {
		Swal.fire('Unauthorized User. Please login first');
		sessionStorage.clear();
		history.push('/login');
		return null;
	} else {
		return (
			<div>
				<Carousel />
			</div>
		);
	}
}
export default Slider;
