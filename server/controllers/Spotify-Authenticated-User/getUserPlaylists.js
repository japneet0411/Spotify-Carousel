import { userSpotifyApiAuth } from '../userSpotifyAuth';

export const getUserPlaylists = async (req, res) => {
	if (empty(userSpotifyApiAuth.getAccessToken())) {
		userSpotifyApiAuth
			.refreshAccessToken()
			.then((data) => {
				userSpotifyApiAuth.setAccessToken(data.body['access_token']);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	await userSpotifyApiAuth
		.addTracksToPlaylist(playlist, ['spotify:track:' + trackId])
		.then((data) => {
			res.status(200).send({
				message: 'Added track to playlist',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
