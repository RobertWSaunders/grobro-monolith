// Request Methods
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';

// API Endpoint Constants
const API_SUFFIX = '/api/v1';
const LOGIN_ENDPOINT = '/auth/session';
const SIGNUP_ENDPOINT = '/auth/signup';

const grobroMiddlwareActionTypes = {
	INVOKE_API_CALL: '@@/grobroMiddleware/INVOKE_API_CALL',
	INVOKE_API_FAIL: '@@/grobroMiddleware/INVOKE_API_FAIL'
};

const apiRequestTypes = {
	LOGIN_REQUEST: '@@/grobro/LOGIN_REQUEST'
};

const apiSuccessTypes = {
	AUTHENTICATED: '@@/grobro/AUTHENTICATED'
};

const apiErrorTypes = {
	AUTHENTICATION_ERROR: '@@/grobro/AUTHENTICATION_ERROR'
};

const normalTypes = {
	LOGOUT: '@@/grobro/LOGOUT',
	BOOTSTRAP_COMPLETE: '@@/grobro/BOOTSTRAP_COMPLETE'
};

export const actionTypes = {
	...hackerMiddlwareActionTypes,
	...apiRequestTypes,
	...apiSuccessTypes,
	...apiErrorTypes,
	...normalTypes
};

const normalActionCreators = {
	logout: () => ({ type: actionTypes.LOGOUT }),
	bootstrapComplete: (data) => ({ type: actionTypes.BOOTSTRAP_COMPLETE, data })
};

const invokeAPIActionCreators = {
	login: (credentials) => ({
		type: actionTypes.INVOKE_API_CALL,
		data: {
			types: [actionTypes.LOGIN_REQUEST, actionTypes.AUTHENTICATED, actionTypes.AUTHENTICATION_ERROR],
			request: {
				url: `${API_SUFFIX}${LOGIN_ENDPOINT}`,
				method: POST,
				body: credentials
			}
		}
	})
};

export const actionCreators = {
		...normalActionCreators,
		...invokeAPIActionCreators
};
