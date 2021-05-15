import React from 'react';
import CardLayout from './../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/Navbar';

function GetRecommendations() {
	return (
		<div>
			<Bar />
			<br />
			<CardLayout
				serverURL={'http://localhost:5000/guest/getRecommendations'}
				heading={'Recommended For You'}
				subheading={'Lorem Ipsum Dolor Sit Amet'}
				type={'track'}
				delete={false}
				loginWithSpotify={true}
			/>
		</div>
	);
}

export default GetRecommendations;
