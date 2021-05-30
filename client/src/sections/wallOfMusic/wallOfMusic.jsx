import React from 'react';
import CardLayout from './../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/navbar';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function WallOfMusic() {
	const username = sessionStorage.getItem('user');
	const history = useHistory();
	const params = useParams();
	if (params.username === 'guest') {
		Swal.fire({
			icon: 'warning',
			title: 'You must be logged in to use this feature'});
		history.push('/login');
		return null;
	}
	if (!username || username !== params.username) {
		Swal.fire({
			icon: 'error',
			title: 'Unauthorized User. Please login first'});
		sessionStorage.clear();
		history.push('/login');
		return null;
	} else {
		return (
			<div>
				<Bar />
				<br />
				<CardLayout
					serverURL={'http://localhost:5000/' + username + '/wallOfMusic'}
					heading={'Wall Of Music'}
					subheading={'Lorem Ipsum Dolor Sit Amet'}
					type={'trackModal'}
					delete={true}
					loginWithSpotify={true}
				/>
			</div>
		);
	}
}

export default WallOfMusic;
