import React from 'react';
import CardLayout from '../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/Navbar';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function SavedPlaylists() {
	const username = sessionStorage.getItem('user');
	const history = useHistory();
	const params = useParams();
	if (params.username === 'guest') {
		Swal.fire('You must be signed up to use this feature');
		history.push('/login');
		return null;
	}
	if (!username || username !== params.username) {
		Swal.fire('Unauthorized User. Please login first');
		sessionStorage.clear();
		history.push('/login');
		return null;
	} else {
		return (
			<div>
				<Bar />
				<br />
				<CardLayout
					serverURL={
						'http://localhost:5000/' + username + '/listSavedPlaylists'
					}
					heading={'Your Saved Playlists'}
					subheading={'Lorem Ipsum Dolor Sit Amet'}
					type={'carouselModal'}
					delete={true}
					loginWithSpotify={false}
				/>
			</div>
		);
	}
}
export default SavedPlaylists;
