const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const empty = require('is-empty');
import { playlistsModel } from './../../models/playlists';
import { spotifyApi } from './../appAuth';

export const fetchData = async(req, res) => {
    const browser = await puppeteer.launch();
    var page = await browser.newPage();
    const playlists = req.body.playlists;
    for(var i=0; i<playlists.length; i++){
        console.log(i);
        await page.goto(playlists[i]);
        const content = await page.content();
        const $ = cheerio.load(content);
        const name = $('a', 'h1').html();
        const description = $('yt-formatted-string', '#description').text();
        const coverImage = $('yt-img-shadow').find('img').attr('src');
        const tracks = [];
        var count = 0;
        $('ytd-playlist-video-renderer').each((i, elem) => {
            var track = $(elem).find('h3').find('a').text();
            var artist = $(elem).find('ytd-channel-name').find('yt-formatted-string').find('a').text();
            track = track.trim();
            artist = artist.trim();
            if((track.indexOf('-') == -1) && (track.indexOf('[') == -1) && (track.indexOf('(') == -1) && (track.indexOf('|') == -1) && (track.indexOf("'") == -1) && (artist.indexOf('- Topic') == -1)){
                tracks.push({
                    track: track,
                    artist: artist});
                count++;
            }
            if(count==5)
                return false;
        });
        await playlistsModel.create({
            playlistName: name,
            playlistDescription: description,
            coverImage: coverImage,
            seedTracks: [],
            listOfTracks: []
        });
        if (empty(spotifyApi.getAccessToken())){
            await spotifyApi
            .clientCredentialsGrant()
            .then((data) => {
              spotifyApi.setAccessToken(data.body['access_token']);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        for(var j=0; j<tracks.length; j++){
            await spotifyApi
                .searchTracks('track:'+tracks[j].track+' artist:'+tracks[j].artist, { limit: 1 })
                .then(async(data) => {
                    await playlistsModel.findOneAndUpdate({
                        playlistName: name
                    }, {
                        $push: { 
                            seedTracks: data.body.tracks.items[0].id,
                            listOfTracks: data.body.tracks.items[0].id
                        }
                    })
                })
                .catch(() => {
                    console.log("Could not retrieve this track: "+ tracks[j].track);
            });
        }
    }
    await browser.close();
    const listOfPlaylists = await playlistsModel.find({}).exec();
    for(var i=0; i<listOfPlaylists.length; i++){
        if(empty(listOfPlaylists[i].seedTracks))
            await playlistsModel.findOneAndDelete({
                playlistName: listOfPlaylists[i].playlistName
            });
    }
    res.status(200).send("Successfully initialized");
};