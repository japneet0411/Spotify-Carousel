import React from 'react';
import CardLayout from '../../components/Card-Layout/Card-Layout';
import Bar from './../../components/Navbar/navbar';


function SavedPlaylists()
{
    return (
        <div>
            <Bar />
            <br />
            <CardLayout 
            serverURL = {"http://localhost:5000/guest/listSavedPlaylists"} 
            heading = {"Your Saved Playlists"}
            subheading = {"Lorem Ipsum Dolor Sit Amet"}
            type = {'playlist'}
            delete = {true}
            loginWithSpotify = {false}
            />
        </div>
    )
}
export default SavedPlaylists;