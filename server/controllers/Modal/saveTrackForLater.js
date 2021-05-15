import { usersModel } from './../../models/users';

export const saveTrackForLater = async (req, res) => {
	await usersModel
		.findOneAndUpdate(
			{
				username: username,
			},
			{
				$push: {
					savedForLater: req.body.trackId,
				},
			}
		)
		.exec();
};
