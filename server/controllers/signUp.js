const validator = require('validator');
const empty = require('is-empty');
const bcrypt = require('bcryptjs');

import { userAuthModel } from './../models/userAuth';
import { usersModel } from './../models/users';

export const signUp = async (req, res) => {
	if (
		empty(req.body.username) ||
		empty(req.body.password) ||
		empty(req.body.email) ||
		empty(req.body.confirmPassword)
	) {
		res.status(200).send({
			message: 'Please fill in all the fields',
		});
	}
	if (!validator.isEmail(req.body.email)) {
		res.status(200).send({
			message: 'Please enter correct email',
		});
	}
	if (!validator.isStrongPassword(req.body.password)) {
		res.status(200).send({
			message: 'Please enter a strong password',
		});
	}
	if (!(req.body.password === req.body.confirmPassword)) {
		res.status(200).send({
			message: 'Confirm password does not match the given password',
		});
	}
	var query = await userAuthModel
		.findOne({
			username: req.body.username,
		})
		.exec();
	if (query) {
		res.status(200).send({
			message: 'Username already taken',
		});
	} else {
		query = await userAuthModel.findOne({
			email: req.body.email,
		});
		if (query) {
			res.status(200).send({
				message: 'An account already exists with this email ID',
			});
		} else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(req.body.password, salt);
			await userAuthModel.create({
				username: req.body.username,
				email: req.body.email,
				password: hash,
				salt: salt,
			});
			await usersModel.create({
				username: req.body.username,
			});
			res.status(200).send({
				message: 'Successfully created account',
			});
		}
	}
};
