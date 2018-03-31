const jwt = require('jsonwebtoken');

const { AUTH_SECRET } = process.env;
const V1_EXCEPTION_REGEX = /^\/auth\//;

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
	MISSING_TOKEN: "Missing auth token!",
	INVALID_TOKEN: "Invalid token!"
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

	if (req.url.match(V1_EXCEPTION_REGEX)) return next();

	const token = getBearer(req);

	if (!token) return res.status(ERRORS.BAD_REQUEST.code).json(createError(ERRORS.BAD_REQUEST, ERROR_MESSAGES.MISSING_TOKEN));

	jwt.verify(token, AUTH_SECRET, (err, decoded) => {
			if (err) return res.status(ERRORS.UNAUTHORIZED.code).json(createError(ERRORS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_TOKEN, err));
			req.user = decoded;
			next();
	});
};
