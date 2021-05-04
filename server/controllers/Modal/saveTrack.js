import { spotifyApi } from './../appAuth';
import { tracksModel } from './../../models/tracks';
import { usersModel } from './../../models/users';

export const saveTrack = async(req, res) => {
    const query = tracksModel.findOne({
        trackId: req.params.trackId
    }).exec();
    if(query){
        await usersModel.findOneAndUpdate({
            username: req.params.username,
        }, {
            $push: {
                savedTracks: req.body.trackId
            }
        }).exec();
        await tracksModel.findOneAndUpdate({
            track_id: req.params.track_id
        }, {
            savedBy: query.savedBy+1
        }).exec();
    }
    else{
        await spotifyApi
            .getTrack(req.params.track_id)
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
}