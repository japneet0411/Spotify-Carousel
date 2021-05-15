const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
	albumCover: {
		type: String,
		required: true,
	},
	trackId: {
		type: String,
		required: true,
		unique: true,
	},
	explicit: {
		type: Boolean,
		required: true,
	},
	savedBy: {
		type: Number,
		default: 0,
	},
	recommendedTo: {
		type: Number,
		default: 0,
	},
});

trackSchema.index(
	{
		name: 1,
		artist: 1,
		explicit: 1,
	},
	{
		unique: true,
	}
);

export const tracksModel = new mongoose.model('tracks', trackSchema);
