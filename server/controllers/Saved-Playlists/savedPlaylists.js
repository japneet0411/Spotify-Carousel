import { usersModel } from './../../models/users';
import { playlistsModel } from './../../models/playlists';

export const savedPlaylists = async(req, res) => {
    const query = await usersModel.findOne({
        username: req.params.username
    });
    const playlists = query.playlists;
    const savedPlaylists = [];
    for(var i=0; i<playlists.length; i++){
        var playlist = await playlistsModel.findOne({
            playlistName: playlists[i]
        }).exec();
        savedPlaylists.push({
            name: playlist.playlistName,
            description: playlist.playlistDescription,
            coverImage: playlist.coverImage
        });
    }
    res.status(200).send(savedPlaylists);
}