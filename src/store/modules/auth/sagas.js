import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess } from './actions';
import { takeLatest, call, put, all } from 'redux-saga/effects';

//request
export function* signInRequest({ payload }) {
  const { email, password } = payload;

  //metodo,url,params
  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Usuário não é prestador.');
    return;
  }

  //sucesso
  yield put(signInSuccess(token, user));

  //redicionar pra dashboard
  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signInRequest)]);
