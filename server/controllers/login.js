const empty = require('is-empty');
import { userAuthModel } from './../models/userAuth';

export const login = async (req, res, next) => {
	console.log('In login');
	if (empty(req.body.username) || empty(req.body.password)) {
		res.status(200).send({
			message: 'Please fill in all the fields',
		});
	}
	console.log('This is it', req.user);
	try {
		//If user is authenticated: Store user's email in session cookie
		var data = req.session;
		data.username = req.user.username;
		res.status(200).send({
			message: 'Success',
		});
	} catch (e) {
		console.log(e);
	}
};
