import { spotifyApi } from './../appAuth';
import randomItem from 'random-item';
import { usersModel } from './../../models/users';
const empty = require('is-empty');

export const recommendTrack = async (req, res) => {
	if (empty(spotifyApi.getAccessToken())) {
		await spotifyApi
			.clientCredentialsGrant()
			.then((data) => {
				spotifyApi.setAccessToken(data.body['access_token']);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	const track = req.body.trackId;
	console.log(req.params.username);
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	console.log(query);
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
					min_acousticness: acousticness - 0.25,
					max_acousticness: acousticness + 0.25,
					target_acousticness: acousticness,
					min_danceability: danceability - 0.25,
					max_danceability: danceability + 0.25,
					target_danceability: danceability,
					min_energy: energy - 0.25,
					max_energy: energy + 0.25,
					target_energy: energy,
					min_instrumentalness: instrumentalness - 0.25,
					max_instrumentalness: instrumentalness + 0.25,
					target_instrumentalness: instrumentalness,
					key: key,
					min_liveness: liveness - 0.25,
					max_liveness: liveness + 0.25,
					target_liveness: liveness,
					target_loudness: loudness,
					target_mode: mode,
					min_popularity: 50,
					max_popularity: 100,
					target_popularity: 75,
					min_speechiness: speechiness - 0.25,
					max_speechiness: speechiness + 0.25,
					target_speechiness: speechiness,
					target_tempo: tempo,
					target_valence: valence,
					seed_tracks: [track],
					limit: 5,
				})
				.then((data) => {
					var count = 0;
					var track = randomItem(data.body.tracks);
					while (
						!query.explicit ||
						(query.explicit && track.explicit === false && count != 5)
					) {
						track = randomItem(data.body.tracks);
					}
					//console.log(track);
					if (query.savedTracks.indexOf(track) === -1) {
						var recommendedTrack = {
							name: track.name,
							artist: track.artists[0].name,
							trackId: track.id,
							album: track.album.images[0].url,
							message: 'Success',
							saved: false,
						};
					} else {
						var recommendedTrack = {
							name: track.name,
							artist: track.artists[0].name,
							trackId: track.id,
							album: track.album.images[0].url,
							message: 'Success',
							saved: true,
						};
					}
					res.status(200).send(recommendedTrack);
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});
};
