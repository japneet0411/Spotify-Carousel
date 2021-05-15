const empty = require('is-empty');
const axios = require('axios');
import { userAuthModel } from './../models/userAuth';

export const login = async (req, res, next) => {
	console.log('In login');
	if (empty(req.body.username) || empty(req.body.password)) {
		res.status(200).send({
			message: 'Please fill in all the fields',
		});
	}
	await axios
		.post('http://localhost:5000/auth', {
			username: req.body.username,
			password: req.body.password,
		})
		.then((response) => {
			if (response.data.message) {
				res.status(200).send({
					message: 'Success',
				});
			}
			res.status(200).send({
				message: 'Unauthorized User',
			});
		});
};
