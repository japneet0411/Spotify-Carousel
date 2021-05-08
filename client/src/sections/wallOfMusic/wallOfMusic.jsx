import React from 'react';
import CardLayout from './../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/navbar';

function WallOfMusic(){
    return(
        <div>
            <Bar />
            <br />
            <CardLayout 
            serverURL = {"http://localhost:5000/guest/wallOfMusic"} 
            heading = {"Wall Of Music"}
            subheading = {"Lorem Ipsum Dolor Sit Amet"}
            type = {'track'}
            delete = {true}
            loginWithSpotify = {true}
            />
        </div>
    )
}

export default WallOfMusic;