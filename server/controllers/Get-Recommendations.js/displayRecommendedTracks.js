import { usersModel } from './../../models/users';
import { tracksModel } from './../../models/playlists';

export const savedPlaylists = async(req, res) => {
    const query = await usersModel.findOne({
        username: req.params.username
    });
    const tracks = query.recommendedTracks;
    const recommendedTracks = [];
    for(var i=0; i<tracks.length; i++){
        var track = await tracksModel.findOne({
            trackId: tracks[i]
        }).exec();
        recommendedTracks.push({
            name: track.name,
            artist: track.artist,
            albumCover: track.albumCover
        });
    }
    res.status(200).send(recommendedTracks);
}