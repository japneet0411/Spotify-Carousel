import { usersModel } from './../../models/users';

export const getTrackStatus = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	const savedTracks = query.savedTracks;
	if (savedTracks.indexOf(req.body.trackId) === -1) {
		res.status(200).send({
			saved: false,
		});
	} else {
		res.status(200).send({
			saved: true,
		});
	}
};
