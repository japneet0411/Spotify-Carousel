const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		immutable: true,
	},
	savedTracks: {
		type: [String],
		immutable: (doc) => doc.username === 'guest',
	},
	recommendedTracks: {
		type: [String],
		immutable: (doc) => doc.username === 'guest',
	},
	savedPlaylists: {
		type: [String],
		immutable: (doc) => doc.username === 'guest',
	},
	explicit: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export const usersModel = mongoose.model('users', userSchema);
