import { spotifyApi } from './../appAuth';
const empty = require('is-empty');

export const recommendTrack = async(req, res) => {
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
    const track = req.params.track;
    spotifyApi
        .getAudioFeaturesForTrack(track)
        .then((data) => {
            const response = data.body;
            const acousticness = response.acousticness;
            const danceability = response.danceability;
            const energy = response.energy;
            const instrumentalness = response.instrumentalness;
            const key = response.key;
            const liveness = response.liveness;
            const loudness = response.loudness;
            const mode = response.mode;
            const speechiness = response.speechiness;
            const tempo = response.tempo;
            const valence = response.valence;
            spotifyApi
                .getRecommendations({
                    min_acousticness: acousticness-0.1,
                    max_acousticness: acousticness+0.1,
                    target_acousticness: acousticness,
                    min_danceability: danceability-0.1,
                    max_danceability: danceability+0.1,
                    target_danceability: danceability,
                    min_energy: energy-0.1,
                    max_energy: energy+0.1,
                    target_energy: energy,
                    min_instrumentalness: instrumentalness-0.1,
                    max_instrumentalness: instrumentalness+0.1,
                    target_instrumentalness: instrumentalness,
                    key: key,
                    min_liveness: liveness-0.1,
                    max_liveness: liveness+0.1,
                    target_liveness: liveness,
                    target_loudness: loudness,
                    target_mode: mode,
                    min_popularity: 50,
                    max_popularity: 100,
                    target_popularity: 75,
                    min_speechiness: speechiness-0.1,
                    max_speechiness: speechiness+0.1,
                    target_speechiness: speechiness,
                    target_tempo: tempo,
                    target_valence: valence,
                    seed_tracks: [track],
                    limit: 5
                })
                .then((data) => {
                    var recommendedTracks = [];
                    for(var i=0; i<data.body.tracks.length; i++){
                        recommendedTracks.push({
                            name: data.body.tracks[i].name,
                            artist: data.body.tracks[i].artists[0].name,
                            track_id: data.body.tracks[i].id
                        });
                    }
                    res.status(200).send(recommendedTracks);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
    }); 
}
