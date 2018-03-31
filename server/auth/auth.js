const jwt = require('jsonwebtoken');

const { AUTH_SECRET } = process.env;

const ERRORS = {
	BAD_REQUEST: {
			code: 400,
			type: "VALIDATION"
	},
	UNAUTHORIZED: {
			code: 401,
			type: "AUTHORIZATION"
	}
};

const ERROR_MESSAGES = {
	MISSING_TOKEN: "Missing access token!",
	INVALID_TOKEN: "Invalid access token!"
};

function createError(errorTemplate, message, data = {}) {
	return Object.assign({}, errorTemplate, { message, data });
}

function getBearer(req) {
	if (!req.headers || !req.headers.authorization) return false;
	const split = req.headers.authorization.split(' ');
	if (split.length !== 2 || split[0] !== 'Bearer') return false;
	return split[1];
}

module.exports = () => (req, res, next) => {

};
