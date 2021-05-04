const spotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
require('dotenv').config();

import { spotifyUserAuthModel } from '../models/spotifyUserAuth';

var scopes = ['playlist-modify-public', 'playlist-modify-private', 'playlist-read-private', 
'playlist-read-collaborative', 'user-library-modify', 'user-library-read'],
    redirectUri = 'http://localhost:5000/:username/wallOfMusic',
    clientId = process.env.CLIENT_ID,
    clientSecret = process.env.CLIENT_SECRET,
    state = process.env.STATE;

export var userSpotifyApiAuth = new spotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
});

const authorizeURL = userSpotifyApiAuth.createAuthorizeURL(scopes, state);

const code = axios.get(authorizeURL);

export const userSpotifyAuth = async(req, res) => {
    userSpotifyApiAuth
        .authorizationCodeGrant(code)
        .then((data) => {
            await spotifyUserAuthModel.create({
                username: req.params.username,
                accessToken: data.body['access_token'],
                refreshToken: data.body['refresh_token']
            });
            userSpotifyApiAuth.setAccessToken(data.body['access_token']);
            userSpotifyApiAuth.setRefreshToken(data.body['refresh_token']);
        })
        .catch((err) => {
            console.log(err);
        });
}
