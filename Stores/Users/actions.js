import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_PENDING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
} from "./constants";
const actions = {
  // update profile
  updateUserProfile: (payload) => {
    return {
      type: UPDATE_USER_PROFILE,
      payload,
    };
  },
  updateUserProfilePending: (payload) => {
    return {
      type: UPDATE_USER_PROFILE_PENDING,
      payload,
    };
  },
  updateUserProfileSuccess: (payload) => {
    return {
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload,
    };
  },
  updateUserProfileFailure: (payload) => {
    return {
      type: UPDATE_USER_PROFILE_FAILURE,
      payload,
    };
  },
};
export default actions;
