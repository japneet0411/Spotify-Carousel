import React from 'react';
import CardLayout from './../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/Navbar';

function WallOfMusic() {
	const username = sessionStorage.getItem('user');
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

export default WallOfMusic;
