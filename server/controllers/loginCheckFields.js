const empty = require('is-empty');
import { userAuthModel } from './../models/userAuth';

export const loginCheckFields = async (req, res, next) => {
	console.log('In login');
	if (empty(req.body.username) || empty(req.body.password)) {
		res.status(200).send({
			message: 'Please fill in all the fields',
		});
	}
	res.redirect('/login');
};
