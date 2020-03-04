import produce from 'immer';

//global
const INITIAL_STATE = {
  profileUser: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.profileUser = action.payload.user;
      });
    default:
      return state;
  }
}
