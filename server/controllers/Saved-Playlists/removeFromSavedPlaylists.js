import { usersModel } from './../../models/users';

export const removeFromSavedForLater = async(req, res) => {
    const query = await usersModel.findOne({
        username: username
    }).exec();
    var playlists = query.savedPlaylists;
    playlists = playlists.splice(playlists.indexOf(req.body.playlist), 1);
    await usersModel.findOneAndUpdate({
        username: req.params.username
    }, {
        savedPlaylists: playlists
    }).exec();
}