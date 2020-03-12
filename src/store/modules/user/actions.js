export function updateProfilRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfilSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfilFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
