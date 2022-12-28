import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import api from "../../utils/api";
import actions from "./actions";
import {
  SUBMIT_PROMOTIONAL_FORM
} from "./constants";
import { successAlert, errorAlert } from "../Alerts/actions";
const {
  submitDetailsFormSuccess,
  submitDetailsFormFailure,
} = actions;
// eslint-disable-file camelcase

export function* submitPromotionalForm({ payload }) {
  try {
    const { data } = yield call(
      api().post,
      `/api/questionAnswerStore`,
      payload
    );
    if (data) {
      yield put(successAlert("Form submitted successfully!"));
      yield put(submitDetailsFormSuccess());
    }
  } catch (e) {
    yield put(submitDetailsFormFailure());
    yield put(errorAlert(e?.response?.data?.error?.message ?? `Error while submitting form`));
  }
}
export function* submitPromotionalFormSaga() {
  yield takeEvery(SUBMIT_PROMOTIONAL_FORM, submitPromotionalForm);
}

export default function* PromotionalSaga() {
  yield all([
    submitPromotionalFormSaga(),
  ]);
}
