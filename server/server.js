const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();
require('./controllers/passport.cofig');

const app = express();

import { router } from './routes/router';

app.use(logger('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: 'halo',
		resave: true,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: true,
		},
	})
);
app.use(cookieParser('halo'));
app.use(passport.initialize());
app.use(passport.session());
app.use('', router);

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Successfuly connected to MongoDB');
	})
	.catch((err) => {
		console.log('Waiting to connect to MongoDB');
	});

export const start = () => {
	app.listen(5000);
	console.log('Listening on port 5000');
};
