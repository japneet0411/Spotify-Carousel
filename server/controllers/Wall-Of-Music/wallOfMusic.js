import { tracksModel } from './../../models/tracks';
import { usersModel } from './../../models/users';

export const wallOfMusic = async(req, res) => {
    console.log("In wall of music");
    const query = await usersModel.findOne({
        username: req.params.username
    });
    console.log(query);
    const tracks = query.savedTracks;
    const trackDetails = [];
    for(var i=0; i<tracks.length; i++){
        var track = await tracksModel.findOne({
            trackId: tracks[i]
        }).exec();
        trackDetails.push({
            main: track.name,
            subtext: track.artist,
            image: track.albumCover
        });
    } 
    console.log(trackDetails);
    res.status(200).send(trackDetails);
}