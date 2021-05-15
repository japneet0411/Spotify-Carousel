import React from 'react';
import CardLayout from '../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/Navbar';

function SavedPlaylists() {
	const username = sessionStorage.getItem('user');
	return (
		<div>
			<Bar />
			<br />
			<CardLayout
				serverURL={'http://localhost:5000/' + username + '/listSavedPlaylists'}
				heading={'Your Saved Playlists'}
				subheading={'Lorem Ipsum Dolor Sit Amet'}
				type={'carouselModal'}
				delete={true}
				loginWithSpotify={false}
			/>
		</div>
	);
}
export default SavedPlaylists;
