import { usersModel } from './../../models/users';

export const removeFromSavedForLater = async(req, res) => {
    const query = await usersModel.findOne({
        username: username
    }).exec();
    var tracks = query.savedForLater;
    tracks = tracks.splice(tracks.indexOf(req.body.trackId), 1);
    await usersModel.findOneAndUpdate({
        username: req.params.username
    }, {
        savedForLater: tracks
    }).exec();
}