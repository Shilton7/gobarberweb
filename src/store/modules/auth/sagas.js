import api from '~/services/api';
import history from '~/services/history';
import { toast } from 'react-toastify';
import { signInSuccess, signFailure } from './actions';
import { takeLatest, call, put, all } from 'redux-saga/effects';

//request login
export function* signInRequest({ payload }) {
  try {
    const { email, password } = payload;

    //metodo,url,params
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é prestador.');
      return;
    }

    //setando Authorization ao logar
    api.defaults.headers.Authorization = `Bearer ${token}`;

    //sucesso
    yield put(signInSuccess(token, user));

    //redicionar pra dashboard
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}

//Criar conta
export function* signUpRequest({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    //login
    history.push('/');
  } catch (error) {
    toast.error('Falha criação da conta.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    //setando Authorization sem passar pelo logar
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

//logoff
export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signInRequest),
  takeLatest('@auth/SIGN_UP_REQUEST', signUpRequest),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
