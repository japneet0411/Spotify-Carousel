import { spotifyApi } from './../appAuth';
import { tracksModel } from './../../models/tracks';
import { usersModel } from './../../models/users';
const empty = require('is-empty');

export const saveTrack = async(req, res) => {
    if (empty(spotifyApi.getAccessToken())){
        await spotifyApi
        .clientCredentialsGrant()
        .then((data) => {
          spotifyApi.setAccessToken(data.body['access_token']);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    const userQuery = await usersModel.findOne({
        username: req.params.username
    });
    const savedTracks = userQuery.savedTracks;
    if(savedTracks.indexOf(req.body.trackId)==-1){
        await usersModel.findOneAndUpdate({
            username: req.params.username,
        }, {
            $push: {
                savedTracks: req.body.trackId
            }
        }).exec();
        await spotifyApi
            .getTrack(req.body.trackId)
            .then(async(data) => {
                var result = data.body;
                await tracksModel.create({
                    name: result.name,
                    artist: result.artists[0].name,
                    albumCover: result.album.images[1].url,
                    trackId: result.id,
                    explicit: result.explicit,
                    savedBy: 1
                });
            })
            .catch((err) => {
                console.log(err);
        });
    }
    else{
        const query = await tracksModel.findOne({
            trackId: req.body.trackId
        }).exec();
        console.log("Query", query);
        const result = await tracksModel.findOneAndUpdate({
            trackId: req.body.trackId
        }, {
            savedBy: query.savedBy+1
        }).exec();
        console.log("Result", result);
    }
}