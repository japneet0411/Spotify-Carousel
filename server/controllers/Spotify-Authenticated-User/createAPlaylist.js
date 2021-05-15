import { userSpotifyApiAuth } from './../userSpotifyAuth';

export const createAPlaylist = async (req, res) => {
	const name = req.body.name;
	const description = req.body.description;
	const status = req.body.status;
	await userSpotifyApiAuth
		.createPlaylist(name, {
			description: description,
			status: status,
		})
		.then((data) => {
			res.status(200).send({
				message: 'Successfully created playlist!',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
