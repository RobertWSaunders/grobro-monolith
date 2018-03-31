import { put, take, all, call, select } from 'redux-saga/effects';
import { actionCreators, actionTypes } from './GrobroActions';
import { selectors } from './GrobroReducer';

const ACCESS_TOKEN_STORAGE = 'grobroAccessToken';

export function* rootSaga(opt) {
	yield all([
		authSaga(opt),
		logoutSaga(opt),
		bootstrapSaga(opt)
	]);
}

function* bootstrapSaga(opt) {

	const accessToken = yield call(opt.getValue, ACCESS_TOKEN_STORAGE);

	yield put(actionCreators.bootstrapComplete({ accessToken }));
}

function* authSaga(opt) {
	const bootstrapComplete = yield take(actionTypes.BOOTSTRAP_COMPLETE);

	const accessToken = bootstrapComplete.data.accessToken;

	while (true) {
		const auth = yield take([actionTypes.AUTHENTICATED]);

		yield call(opt.setValue, ACCESS_TOKEN_STORAGE, auth.data.accessToken);
	}
}

function* logoutSaga(opt) {
	while (true) {
		yield take(actionTypes.LOGOUT);

		yield call(opt.removeValue, ACCESS_TOKEN_STORAGE);
	}
}
