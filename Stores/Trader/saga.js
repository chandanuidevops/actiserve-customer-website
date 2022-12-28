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
  SUBMIT_TRADER_FORM
} from "./constants";
import { successAlert, errorAlert } from "../Alerts/actions";
const {
  submitTraderFormSuccess,
  submitTraderFormFailure,
} = actions;
// eslint-disable-file camelcase

export function* submitTraderFormData({ payload }) {
  try {
    const { data } = yield call(
      api().post,
      `/api/storeTrader`,
      payload
    );
    if (data) {
      yield put(successAlert("Form submitted successfully!"));
      yield put(submitTraderFormSuccess());
    }
  } catch (e) {
    yield put(submitTraderFormFailure());
    yield put(errorAlert(e?.response?.data?.error?.message ?? `Error while submitting form`));
  }
}
export function* submitTraderFormSaga() {
  yield takeEvery(SUBMIT_TRADER_FORM, submitTraderFormData);
}

export default function* TraderSaga() {
  yield all([
    submitTraderFormSaga(),
  ]);
}
