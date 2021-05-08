import { usersModel } from './../../models/users';
import { spotifyApi } from './../appAuth';
const empty = require('is-empty');

export const savedForLater = async(req, res) => {
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
    const query = await usersModel.findOne({
        username: req.params.username
    }).exec();
    const tracks = query.savedForLater;
    if(tracks.indexOf(req.body.trackId)===-1){
        await usersModel.findOneAndUpdate({
            username: req.params.username
        }, {
            $push: {
                savedForLater: req.body.trackId
            }
        }).exec();
        res.status(200).send({
            message: "Track has been added to your saved for later playlist"
        });
    }
    else{
        res.status(200).send({
            message: "This track is already present in your saved for later playlist"
        });
    }
}