const spotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

export var spotifyApi = new spotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

//Set up client credentials authorization for the app
export const appAuth = async(req, res) => { 
    spotifyApi
        .clientCredentialsGrant()
        .then((data) => {
          spotifyApi.setAccessToken(data.body['access_token']);
          res.cookie('accessToken', data.body['access_token'], {
              httpOnly: true,
              secure: true,
              maxAge: 90000
          });
          res.status(200).send('Received Access Token');
        })
        .catch((err) => {
            console.log(err)
        });
}