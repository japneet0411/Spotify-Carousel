import { usersModel } from './../../models/users';
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import { spotifyApi } from './../appAuth';
require('dotenv').config();

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: nodeFetch,
});

export const refreshPlaylist = async () => {
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
	playlists = await playlistsModel.find({}).exec();
	for (var i = 101; i < playlists.length; i++) {
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
		await unsplash.photos
			.getRandom({
				//query: 'pastel',
				contentFilter: 'high',
				orientation: 'landscape',
				featured: true,
				count: 1,
			})
			.then(async (result) => {
				if (result.errors) {
					console.log(result.errors[0]);
				} else {
					var carouselImage = result.response[0].urls.raw;
					await playlistsModel
						.findOneAndUpdate(
							{
								playlistName: playlists[i].playlistName,
							},
							{
								carouselImage: carouselImage,
							}
						)
						.exec();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	console.log('Completed refreshing playlists');
};
