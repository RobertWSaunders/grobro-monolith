require('dotenv').config();
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const auth = require('./auth/auth');
const db = require('./db')(logger);
const express = require('express');
const path = require('path');
const api = require('./api');

const IS_PROD = process.env.NODE_ENV === 'production';
const FORCE_SSL = process.env.FORCE_SSL === 'true';
const port = process.env.PORT || 3000;

const BUNDLE_DIR = path.join(__dirname, '../client/bundle');

// Express Server
const app = express();

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

// Authentication Middleware
app.use(auth(db));

// Controllers
const ctrs = require('./controllers')(db);

// Restful API Endpoints (Mainly Auth)
app.use('/api/', api(ctrs));

// Static Files
app.use(express.static(BUNDLE_DIR));

// Database Synchronization and Server Start
db.sequelize.sync().then(() => {
	logger.info('Database has synchronized successfully!');

	app.listen(port, () => {
		logger.info('Server successfully started!');
	});
}).catch((err) => {
	logger.error('Database could not synchronize! Cannot start server.');
});
