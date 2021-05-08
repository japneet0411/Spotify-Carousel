import { usersModel } from './../../models/users';
import { tracksModel } from './../../models/tracks';
import { spotifyApi } from './../appAuth';
import randomItem from 'random-item';
const empty = require('is-empty');

export const getRecommendations = async(username) => {
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
        username: username
    }).exec();
    const tracks = query.savedTracks;
    const currentRecommended = query.recommendedTracks;
    for(var i=0; i<currentRecommended.length; i++){
        var track = await tracksModel.findOne({
            trackId: currentRecommended[i]
        }).exec();
        await tracksModel.findOneAndUpdate({
            trackId: currentRecommended[i]
        }, {
            recommendedTo: track.recommendedTo-1
        }).exec();
    }
    await usersModel.findOneAndUpdate({
        username: username
    }, {
        recommendedTracks: []
    }).exec();
    var seedTracks = [];
    for(var i=0; i<5; i++){
        seedTracks.push(randomItem(tracks));
    }
    await spotifyApi
            .getRecommendations({
                seed_tracks: seedTracks,
                min_popularity: 50,
                target_popularity: 85,
                limit: 20
            })
            .then(async(data) => {
                for(var j=0; j<data.body.tracks.length; j++){
                    console.log(data.body.tracks[j].id);
                    await usersModel.findOneAndUpdate({
                        username: username
                    },{
                        $push: {
                            recommendedTracks: data.body.tracks[j].id
                        }
                    }).exec();
                    var query2 = await tracksModel.findOne({
                        trackId: data.body.tracks[j].id
                    });
                    if(query2){
                        await tracksModel.findOneAndUpdate({
                            trackId: data.body.tracks[j].id
                        }, {
                            recommendedTo: query2.recommendedTo+1
                        }).exec();
                    }
                    else{
                        await spotifyApi
                            .getTrack(data.body.tracks[j].id)
                            .then(async(data) => {
                                var result = data.body;
                                await tracksModel.create({
                                    name: result.name,
                                    artist: result.artists[0].name,
                                    albumCover: result.album.images[1].url,
                                    trackId: result.id,
                                    explicit: result.explicit,
                                    recommendedTo: 1
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                }
        })
        .catch((err) => {
          console.log("Something went wrong!", err);
        });
}