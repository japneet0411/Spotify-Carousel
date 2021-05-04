const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

export const userAuthModel = mongoose.model('user-auth', userAuthSchema);