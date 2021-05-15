import { usersModel } from './../../models/users';

export const removeFromSavedPlaylists = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: username,
		})
		.exec();
	var playlists = query.savedPlaylists;
	const index = playlists.indexOf(req.body.playlist);
	playlists.splice(index, 1);
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
