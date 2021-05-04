import { spotifyApi } from '../appAuth';
import { playlistsModel } from './../../models/playlists';

export const getRecommendations = async(req, res) => {
    const playlists = await playlistsModel.find({}).exec();
    for(var i=2; i<playlists.length; i++){
        console.log(i);
        await spotifyApi
            .getRecommendations({
            seed_tracks: playlists[i].seedTracks,
            min_popularity: 50,
            target_popularity: 85,
            limit: 5
          })
            .then(async(data) => {
                for(var j=0; j<data.body.tracks.length; j++){
                    //console.log(data.body.tracks[j].id);
                    await playlistsModel.findOneAndUpdate({
                        playlistName: playlists[i].playlistName
                    },{
                        $push: {
                            listOfTracks: data.body.tracks[j].id
                        }
                    })
                }
        })
        .catch((err) => {
          console.log("Something went wrong!", err);
        });
    }
    res.status(200).send("Generated recommendations based on seed tracks");
}