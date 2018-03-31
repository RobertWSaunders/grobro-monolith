require('dotenv').config();

const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const auth = require('./auth/auth');
const db = require('./db')(logger);
const express = require('express');
const path = require('path');
const api = require('./api');
const http = require('http');

const IS_PROD = process.env.NODE_ENV === 'production';
const FORCE_SSL = process.env.FORCE_SSL === 'true';
const port = process.env.PORT || 3000;

const BUNDLE_DIR = path.join(__dirname, '../client/bundle');

// Express Server
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO Setup
const io = require('socket.io')(server, {
	path: '/socket',
	serveClient: false,
	transports: ['websocket']
});

// Configure Socket Handlers
require('./socket')(io, logger);

// HTTPS Redirect
if (IS_PROD) {
	if (FORCE_SSL) {
		app.enable('trust proxy');
		app.use((req, res, next) => {
				if (req.secure) {
					next();
				} else {
					res.redirect('https://' + req.headers.host + req.url);
				}
		});
	}
}

// Controllers
const ctrs = require('./controllers')(db);

// Restful API Endpoints (Mainly Auth)
app.use('/api/', auth(db), api(ctrs));

// Static Files
app.use(express.static(BUNDLE_DIR));

// Database Synchronization and Server Start
db.sequelize.sync().then(() => {
	logger.info('Database has synchronized successfully!');

	server.listen(port, () => {
		logger.info('Server successfully started!');
	});
}).catch((err) => {
	logger.error('Database could not synchronize! Cannot start server.');
});
