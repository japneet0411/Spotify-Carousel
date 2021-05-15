const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	savedTracks: {
		type: [String],
	},
	recommendedTracks: {
		type: [String],
	},
	savedPlaylists: {
		type: [String],
	},
	savedForLater: {
		type: [String],
	},
	explicit: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export const usersModel = mongoose.model('users', userSchema);
