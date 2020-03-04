import api from '~/services/api';
import history from '~/services/history';
import { toast } from 'react-toastify';
import { signInSuccess, signFailure } from './actions';
import { takeLatest, call, put, all } from 'redux-saga/effects';

//request
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

    //sucesso
    yield put(signInSuccess(token, user));

    //redicionar pra dashboard
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signInRequest)]);
