const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
	playlistName: {
		type: String,
		required: true,
		unique: true,
	},
	listOfTracks: {
		type: [String],
	},
	playlistDescription: {
		type: String,
		required: true,
	},
	seedTracks: {
		type: [String],
		required: true,
	},
	carouselImage: {
		type: String,
		unique: true,
	},
	coverImage: {
		type: String,
		unique: true,
	},
});

export const playlistsModel = mongoose.model('playlists', playlistSchema);
