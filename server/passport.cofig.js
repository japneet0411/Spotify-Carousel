const passport = require('passport');

const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

import { userAuthModel } from './models/userAuth';

console.log('In passport.js');

passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (username, done) {
	User.findOne({ username: username }, function (err, user) {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'username',
		},
		function (username, password, done) {
			userAuthModel.findOne({ username: username }, function (err, user) {
				console.log(user);
				// If Error Occurs, Return the Error
				if (err) {
					return done(err);
				}
				// User Not Found
				if (!user) {
					return done(null, false, {
						message: 'Incorrect Username or Password',
					});
				}
				// User Entered Wrong Password
				if (!(bcrypt.hashSync(password, user.salt) == user.password)) {
					return done(null, false, {
						message: 'Incorrect Username or Password',
					});
				}
				//console.log(req.user);
				// Everything's Fine
				return done(null, user);
			});
		}
	)
);
