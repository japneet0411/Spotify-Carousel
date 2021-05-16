import React from 'react';
import CardLayout from './../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function GetRecommendations() {
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
			<Bar />
			<br />
			<CardLayout
				serverURL={'http://localhost:5000/' + username + '/getRecommendations'}
				heading={'Recommended For You'}
				subheading={'Lorem Ipsum Dolor Sit Amet'}
				type={'trackModal'}
				delete={false}
				loginWithSpotify={true}
			/>
		</div>
	);
}

export default GetRecommendations;
