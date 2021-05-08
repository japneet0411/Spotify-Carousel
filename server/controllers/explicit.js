import { usersModel } from './../models/users';

export const explicitStatus = async(req, res) => {
    await usersModel.findOneAndUpdate({
        username: req.params.username
    }, {
        explicit: req.body.explicit
    }).exec();
}