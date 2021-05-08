import { userSpotifyApiAuth } from './../userSpotifyAuth';
const empty = require('is-empty');

export const addToLibrary = async(req, res) => {
    if(empty(userSpotifyApiAuth.getAccessToken())){
        userSpotifyApiAuth
        .refreshAccessToken()
        .then((data) => {
              userSpotifyApiAuth.setAccessToken(data.body['access_token']);
            })
        .catch((err) => {
            console.log(err);
        })
    }
    const trackId = req.body.trackId;
    userSpotifyApiAuth
        .addToMySavedTracks([trackId])
        .then((data) => {
            res.status(200).send({
                message: "Added track to library"
            });
        })
        .catch((err) => {
            console.log(err);
        });
}