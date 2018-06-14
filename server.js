const port = 80;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const validator = require('express-validator');

const socketio = require('socket.io');
const ejs = require('ejs');
//new
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const model = require('./models/user.model');


//This function will allow us to retrict the access to the routes
global.secure = function isAuthenticated(type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				} else {
					response.redirect('/');
				}
			} else {
				return next();
			}
		}
		response.redirect('/');
	}
};
//end of new

app.use(validator());
app.use(bodyParser.json(), bodyParser.urlencoded({
	extended: true
}));

//new
app.use(cookieParser());
app.use(session({
	cookieName: 'session',
	secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	resave: true,
	saveUninitialized: true
}));
// NEW 06/05/2018 - HTTPS

app.set('trust proxy', 1);

app.use(function (req, res, next) {
	for (var item in req.body) {
		req.sanitize(item).escape();
	}
	next();
});

// END NEW


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (email, callback) {
	callback(null, email);
});

passport.deserializeUser(function (email, callback) {
	model.read(email, function (data) {
		callback(null, data);
	})
});
//end of new

global.connection = mysql.createConnection({
	host: '34.243.203.139',
	user: 'wfdai',
	password: 'ieY4eemaJeifoh4z',
	database: 'mydb',
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});



//Midleware that sets the isAuthenticated variable in all views
app.use(function (request, response, next) {
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});

app.set('view engine', 'ejs');
app.set('views', 'views');

//app.use('/', require('./controllers/index.route'));
app.use('/public', express.static('public'));
app.use('/users/public', express.static('public'));

//new
app.use('/login', require('./controllers/login.route'));
app.use('/logout', require('./controllers/logout.route'));
app.use('/registarempresa', require('./controllers/registarempresa.route'));
app.use('/update_user', require('./controllers/user.route'));
app.use('/users', require('./controllers/user.route'));
app.use('/admin', require('./controllers/admin.route'));
app.use('/', require('./controllers/sms.route'));
app.use('/usersEdit', require('./controllers/userEdit.route'));



app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
	console.log('Connected');
	io.on('disconnect', () => {
		console.log('Disconnected');
	})
})