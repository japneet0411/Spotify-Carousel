import { tracksModel } from './../../models/tracks';
import { usersModel } from './../../models/users';

export const wallOfMusic = async (req, res) => {
	console.log('In wall of music');
	const query = await usersModel.findOne({
		username: req.params.username,
	});
	console.log(query);
	const tracks = query.savedTracks;
	console.log(tracks);
	const trackDetails = [];
	for (var i = 0; i < tracks.length; i++) {
		var track = await tracksModel
			.findOne({
				trackId: tracks[i],
			})
			.exec();
		if (!query.explicit || (query.explicit && track.explicit === false)) {
			trackDetails.push({
				main: track.name,
				subtext: track.artist,
				image: track.albumCover,
				id: track.trackId,
			});
		}
	}
	console.log(trackDetails);
	res.status(200).send({
		items: trackDetails,
	});
};
