import { usersModel } from './../../models/users';
import { tracksModel } from './../../models/tracks';
const empty = require('is-empty');

export const displayRecommendedTracks = async (req, res) => {
	const query = await usersModel.findOne({
		username: req.params.username,
	});
	const explicitStatus = query.explicit;
	if (empty(query.recommendedTracks)) {
		res.status(200).send({
			message: 'Save tracks to generate recommendations',
		});
	} else {
		const tracks = query.recommendedTracks;
		const recommendedTracks = [];
		for (var i = 0; i < tracks.length; i++) {
			var track = await tracksModel
				.findOne({
					trackId: tracks[i],
				})
				.exec();
			if (!explicitStatus || (explicitStatus && track.explicit === false))
				recommendedTracks.push({
					main: track.name,
					subtext: track.artist,
					image: track.albumCover,
					id: track.trackId,
					message: 'Success',
				});
		}
		res.status(200).send({
			items: recommendedTracks,
		});
	}
};
