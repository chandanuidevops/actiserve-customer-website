import produce from "immer";
import {
  UPDATE_USER_PROFILE_PENDING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
} from "./constants";

const initialState = {
  updateProfileError: null,
  isUpdatingProfileLoading: false,
  updateUserProfile: null,
};
const UserReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_USER_PROFILE_PENDING:
        draft.isUpdatingProfileLoading = true;
        draft.updateUserProfile = null;
        draft.updateProfileError = null;
        break;
      case UPDATE_USER_PROFILE_SUCCESS:
        draft.isUpdatingProfileLoading = false;
        draft.updateUserProfile = action.payload.data;
        draft.updateProfileError = null;
        break;
      case UPDATE_USER_PROFILE_FAILURE:
        draft.updateProfileError = action.payload.error;
        draft.updateUserProfile = null;
        draft.isUpdatingProfileLoading = false;
        break;

      default:
        return state;
    }
  });
};
export default UserReducer;
