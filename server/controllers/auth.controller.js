const jwt = require('jsonwebtoken');

const JWT_ISSUER = 'Grobro Authentication';

const { AUTH_SECRET } = process.env;

function createAccessToken(userId) {
	return jwt.sign({
		userId
	}, AUTH_SECRET, {
		issuer: JWT_ISSUER
	});
}

module.exports = (db) => ({
	// authentication controller
});
