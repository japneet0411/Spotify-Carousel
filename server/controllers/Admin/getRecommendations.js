import { spotifyApi } from '../appAuth';
import { playlistsModel } from './../../models/playlists';
const empty = require('is-empty');

export const getRecommendations = async (req, res) => {
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
	const playlists = await playlistsModel.find({}).exec();
	for (var i = 0; i < playlists.length; i++) {
		console.log(i);
		await spotifyApi
			.getRecommendations({
				seed_tracks: playlists[i].seedTracks,
				min_popularity: 50,
				target_popularity: 85,
				limit: 5,
			})
			.then(async (data) => {
				for (var j = 0; j < data.body.tracks.length; j++) {
					//console.log(data.body.tracks[j].id);
					await playlistsModel.findOneAndUpdate(
						{
							playlistName: playlists[i].playlistName,
						},
						{
							$push: {
								listOfTracks: data.body.tracks[j].id,
							},
						}
					);
				}
			})
			.catch((err) => {
				console.log('Something went wrong!', err);
			});
	}
	res.status(200).send('Generated recommendations based on seed tracks');
};
