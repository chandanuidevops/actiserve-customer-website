import { all, call, put, select, takeEvery } from "redux-saga/effects";
import api from "../../utils/api";
import actions from "./actions.js";
import { UPDATE_USER_PROFILE } from "./constants";
import { successAlert, errorAlert } from "../Alerts/actions";
import authActions from "../Auth/actions";
const {
  updateUserProfilePending,
  updateUserProfileSuccess,
  updateUserProfileFailure,
} = actions;

const { loginSuccess } = authActions;

// Update user profile
export function* updateUserProfile({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  yield put(updateUserProfilePending({ isUserSaving: true }));
  try {
    const profileResponse = yield call(
      api(token).post,
      `api/auth/customer/edit`,
      payload
    );
    yield put(updateUserProfileSuccess({ data: profileResponse.data }));
    // update the auth user
    yield put(loginSuccess({ token: token, user: profileResponse.data }));
    yield put(successAlert("Profile update successfully!"));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string" ? error : "Error while updating profile!"
      )
    );
    yield put(updateUserProfileFailure({ error: error }));
  }
}

// Action watchers

export function* watchUpdateProfile() {
  yield takeEvery(UPDATE_USER_PROFILE, updateUserProfile);
}

export default function* usersSaga() {
  yield all([watchUpdateProfile()]);
}
