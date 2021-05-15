const empty = require('is-empty');
import { userAuthModel } from './../models/userAuth';

export const auth = async (req, res, next) => {
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
