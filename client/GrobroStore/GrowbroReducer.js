import { actionTypes } from './GrobroActions';

export const reducerMount = 'grobro';

const initialState = {
	user: {},
	accessToken: null,
	authenticated: false
};

export const selectors = {
	getUser: (state) => state[reducerMount].user,
	getAccessToken: (state) => state[reducerMount].accessToken,
	getAuthenticated: (state) => state[reducerMount].authenticated
};

/**
 * Reducer handlers.
 * @type {Object}
 */
const handlers = {
	[actionTypes.BOOTSTRAP_COMPLETE]: (state, action) => {
		const { refreshToken, accessToken } = action.data;

		return {
			...state,
			accessToken,
			refreshToken,
			bootstrapLoading: false
		};
	},

	[actionTypes.AUTHENTICATED]: (state, action) => {
		const { accessToken, user } = action.data;

		return {
			...state,
			user,
			refreshToken,
			authenticated: true
		};
	}
};

export function reducer(state = initialState, action) {
		if (handlers[action.type]) return handlers[action.type](state, action);
		return state;
}
