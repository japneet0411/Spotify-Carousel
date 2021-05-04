import { tracksModel } from './../../models/tracks';
import { usersModel } from './../../models/users';

export const wallOfMusic = async(req, res) => {
    const query = await usersModel.findOne({
        username: req.params.username
    });
    const tracks = query.savedTracks;
    const trackDetails = [];
    for(var i=0; i<tracks.length; i++){
        var track = await tracksModel.findOne({
            trackId: tracks[i]
        }).exec();
        trackDetails.push({
            name: track.name,
            artist: track.artist,
            albumCover: track.albumCover
        });
    } 
    res.status(200).send(trackDetails);
}