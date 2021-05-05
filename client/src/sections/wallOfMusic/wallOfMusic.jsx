import React from 'react';
import CardLayout from './../../components/Card-Layout/Card-Layout';

function WallOfMusic(){
    return(
        <div>
            <CardLayout 
            serverURL = {"http://localhost:5000/guest/wallOfMusic"} 
            heading = {"Wall Of Music"}
            subheading = {"Lorem Ipsum Dolor Sit Amet"}
            />
        </div>
    )
}

export default WallOfMusic;