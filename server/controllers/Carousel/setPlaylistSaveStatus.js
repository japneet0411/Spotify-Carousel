import { usersModel } from './../../models/users';

export const setPlaylistSaveStatus = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	const savedPlaylists = query.savedPlaylists;
	console.log(savedPlaylists);
	if (savedPlaylists.indexOf(req.body.playlistName) === -1) {
		await usersModel
			.findOneAndUpdate(
				{
					username: req.params.username,
				},
				{
					$push: {
						savedPlaylists: req.body.playlistName,
					},
				}
			)
			.exec();
		res.status(200).send({
			message: 'Saved Playlist',
			saved: true,
		});
	} else {
		const query = await usersModel
			.findOne({
				username: req.params.username,
			})
			.exec();
		var playlists = query.savedPlaylists;
		playlists = playlists.splice(
			playlists.indexOf(req.body.playlistName) - 1,
			1
		);
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
		res.status(200).send({
			message: 'Removed saved playlist',
			saved: false,
		});
	}
};
