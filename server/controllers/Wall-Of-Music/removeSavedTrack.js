import { tracksModel } from '../../models/tracks';
import { usersModel } from '../../models/users';

export const removeSavedTrack = async (req, res) => {
	const query = await usersModel.findOne({
		username: req.params.username,
	});
	var tracks = query.savedTracks;
	const index = tracks.indexOf(req.body.trackId);
	tracks.splice(index, 1);
	await usersModel
		.findOneAndUpdate(
			{
				username: req.params.username,
			},
			{
				savedTracks: tracks,
			}
		)
		.exec();
	const trackQuery = await tracksModel
		.findOne({
			trackId: req.body.trackId,
		})
		.exec();
	await tracksModel
		.findOneAndUpdate(
			{
				trackId: req.body.trackId,
			},
			{
				savedBy: trackQuery.savedBy - 1,
			}
		)
		.exec();
};
