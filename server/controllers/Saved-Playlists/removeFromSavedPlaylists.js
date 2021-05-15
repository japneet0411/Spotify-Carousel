import { usersModel } from './../../models/users';

export const removeFromSavedPlaylists = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	var playlists = query.savedPlaylists;
	const index = playlists.indexOf(req.body.playlist);
	console.log(playlists);
	playlists.splice(index, 1);
	console.log(playlists);
	await usersModel
		.findOneAndUpdate(
			{
				username: req.params.username,
			},
			{
				savedPlaylists: playlists,
			}
		)
		.exec();
};
