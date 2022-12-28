import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";

import {
  getVisitsSuccess,
  getVisitsFailure,
} from "./actions";

export function* fetchVisitDetails({ payload, history }) {
  const query = payload?.query ? payload?.query : "";
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const data = yield call(
      api(token).get,
      `api/customer-visit-list`,
    );
    if (data) {
      yield put(getVisitsSuccess(data.data));
    }
  } catch (error) {
    yield put(getVisitsFailure(error));
    if (typeof error === "string") yield put(errorAlert(error));
    else if (typeof error.error === "string") yield put(errorAlert(error.error));
  }
}

export function* getVisitDetailsFlow() {
  yield takeEvery(constant.GET_VISITS, fetchVisitDetails);
}

export default function* VisitDetailsSaga() {
  yield all([getVisitDetailsFlow()]);
}
