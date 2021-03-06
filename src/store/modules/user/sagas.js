import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';

import { updateProfilSuccess, updateProfilFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert(
      'Atualizado com sucesso',
      'Seu perfil foi atualizado com sucesso!',
    );

    yield put(updateProfilSuccess(response.data));
  } catch (error) {
    Alert.alert(
      'Erro com a atualização',
      'Houve um erro com a atualização de seu perfil, verifique seus dados!',
    );
    yield put(updateProfilFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
