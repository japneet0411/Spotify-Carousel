import { usersModel } from './../../models/users';

export const savePlaylist = async (req, res) => {
	const playlist = await usersModel
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
};
