const mongoose = require('mongoose');

const spotifyUserAuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    }
});

export const spotifyUserAuthModel = mongoose.model('spotify-user-auth', spotifyUserAuthSchema);