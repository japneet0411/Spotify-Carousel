import { playlistsModel } from '../../../models/playlists';
import { refreshPlaylists } from './refreshPlaylists';
import randomItem from 'random-item';

export const refreshSeedTracks = async (req, res) => {
	const playlists = await playlistsModel.find({}).exec();
	for (var i = 0; i < playlists.length; i++) {
		var listOfTracks = playlists[i].listOfTracks;
		var seedTracks = [];
		for (var j = 0; j < 5; j++) {
			seedTracks.push(randomItem(listOfTracks));
		}
		console.log(seedTracks);
		await playlistsModel
			.findOneAndUpdate(
				{
					playlistName: playlists[i].playlistName,
				},
				{
					seedTracks: seedTracks,
				}
			)
			.exec();
	}
	refreshPlaylists();
	res.status(200).send('Refreshed Playlist');
};
