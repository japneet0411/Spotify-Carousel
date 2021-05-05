const spotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

export var spotifyApi = new spotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});