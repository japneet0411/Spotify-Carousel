import { usersModel } from './../../models/users';

export const getTrackStatus = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	const savedTracks = query.savedTracks;
	console.log('In get track status', savedTracks);
	if (savedTracks.indexOf(req.body.trackId) === -1) {
		console.log('Not in saved tracks');
		res.status(200).send({
			saved: false,
		});
	} else {
		console.log('Saved track');
		res.status(200).send({
			saved: true,
		});
	}
};
