const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const usersRouter = require('./api/routers/user-router');
const db = require('./database/config');

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
	session({
		resave: false, //avoid recreeating sessions that have not changed
		saveUninitialized: false, // to comply with GDPR Laws
		secret: '3o&5S$fLY7SU!lljThjtRHQ', // cryptographically sign the cookie
		store: new KnexSessionStore({
			knex: db, // configured instance of knex
			createtable: true, //if the sessions table doesn't exist, create it automatically
		}),
	})
);

server.use(usersRouter);

server.use((err, req, res, next) => {
	console.log(err);

	res.status(500).json({
		message: 'Something went wrong',
	});
});

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`);
});
