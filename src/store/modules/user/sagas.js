import api from '~/services/api';
import { toast } from 'react-toastify';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import { takeLatest, call, put, all } from 'redux-saga/effects';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    //unindo 2 objetos
    const profileUser = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profileUser);

    toast.success('Perfil atualizado com sucesso!');

    //sucesso
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error('Falha ao atualizar seus dados');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  //takeLatest('@user/UPDATE_PROFILE_SUCCESS', signUpRequest),
]);
