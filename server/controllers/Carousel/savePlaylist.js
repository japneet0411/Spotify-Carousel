import { usersModel } from './../../models/users';

export const savePlaylist = async(req, res) => {
     await usersModel.findOneAndUpdate({
         username: req.params.username
     }, {
         $push: {
             savedPlaylist: req.body.playlist
         }
     });
}