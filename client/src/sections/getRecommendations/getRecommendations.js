import React from 'react';
import CardLayout from './../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/Navbar';

function GetRecommendations() {
	const username = sessionStorage.getItem('user');
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
