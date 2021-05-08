import { usersModel } from './../../models/users';
import { playlistsModel } from './../../models/playlists';

export const savedPlaylists = async(req, res) => {
    console.log("In saved playlists");
    const query = await usersModel.findOne({
        username: req.params.username
    });
    const playlists = query.savedPlaylists;
    const savedPlaylists = [];
    for(var i=0; i<playlists.length; i++){
        var playlist = await playlistsModel.findOne({
            playlistName: playlists[i]
        }).exec();
        savedPlaylists.push({
            main: playlist.playlistName,
            subtext: playlist.playlistDescription,
            image: playlist.coverImage,
            id: playlist.playlistName
        });
    }
    res.status(200).send(savedPlaylists);
}