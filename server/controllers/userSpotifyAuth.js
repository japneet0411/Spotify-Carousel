const spotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
require('dotenv').config();
const empty = require('is-empty');

import { token } from 'morgan';
import { spotifyUserAuthModel } from '../models/spotifyUserAuth';

var scopes = ['playlist-modify-public', 'playlist-modify-private', 'playlist-read-private', 
'playlist-read-collaborative', 'user-library-modify', 'user-library-read'],
    redirectUri = 'http://localhost:5000/callback',
    clientId = process.env.CLIENT_ID,
    clientSecret = process.env.CLIENT_SECRET,
    state = process.env.STATE;

export var userSpotifyApiAuth = new spotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
});

const authorizeURL = userSpotifyApiAuth.createAuthorizeURL(scopes, state);

var username;

export const userSpotifyAuth = async(req, res) => {
    console.log(authorizeURL);
    username = req.params.username;
    console.log(username);
    res.status(200).send({
        url: authorizeURL
    });
    /*const code = await axios.get(authorizeURL);
    console.log(code);
    userSpotifyApiAuth
        .authorizationCodeGrant(code)
        .then(async(data) => {
            console.log(data.body['access_token']);
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
        });*/
}

export const spotifyAuthUser = async(req, res) => {
    const code = req.query.code;
    userSpotifyApiAuth
        .authorizationCodeGrant(code)
        .then(async(data) => {
            console.log(data.body['access_token']);
            userSpotifyApiAuth.setAccessToken(data.body['access_token']);
            userSpotifyApiAuth.setRefreshToken(data.body['refresh_token']);
            await spotifyUserAuthModel.create({
                username: username,
                accessToken: data.body['access_token'],
                refreshToken: data.body['refresh_token']
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const isAuthenticatedWithSpotify = async(req, res) => {
    console.log(userSpotifyApiAuth);
    const query = await spotifyUserAuthModel.findOne({
        username: req.params.username
    }).exec();
    if(query){
        res.status(200).send({
            message: 'Success'
        });
    }
    else{
        res.status(200).send({
            message: 'Authenticate with Spotify'
        });
    }
}

export const addToLibrary = async(req, res) => {
    const query = await spotifyUserAuthModel.findOne({
        username: req.params.username
    }).exec();
    userSpotifyApiAuth.setRefreshToken(query.refreshToken);
    await userSpotifyApiAuth
                .refreshAccessToken()
                .then((data) => {
                    userSpotifyApiAuth.setAccessToken(data.body['access_token']);
                })
                .catch((err) => {
                    console.log(err);
                })
    console.log(userSpotifyApiAuth);
    //const trackId = req.body.trackId;
    userSpotifyApiAuth
        .getMe()
        .then((data) => {
            userSpotifyApiAuth
                .getUserPlaylists(data.body.id)
                .then((data) => {
                    console.log(data.body);
                    var playlistInfo = [];
                    for(var i=0; i<data.body.items.length; i++){
                        playlistInfo.push({
                            name: data.body.items[i].name,
                            id: data.body.items[i].id
                        });
                    }
                    res.status(200).send({
                        details: playlistInfo
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

export const addTrackToPlaylist = async(req, res) => {
    const query = await spotifyUserAuthModel.findOne({
        username: req.params.username
    }).exec();
    userSpotifyApiAuth.setRefreshToken(query.refreshToken);
    await userSpotifyApiAuth
                .refreshAccessToken()
                .then((data) => {
                    userSpotifyApiAuth.setAccessToken(data.body['access_token']);
                })
                .catch((err) => {
                    console.log(err);
                })
    const trackId = req.body.trackId;
    const playlist = req.body.playlist;
    await userSpotifyApiAuth
        .addTracksToPlaylist(playlist, ["spotify:track:"+trackId])
        .then((data) => {
            res.status(200).send({
                message: "Added track to playlist"
            });
        })
        .catch((err) => {
            console.log(err);
        });
}