import { usersModel } from './../../models/users';

export const createUser = async(req, res) => {
    await usersModel.create({
        username: req.body.username
    });
    res.status(200).send("Created New User");
}