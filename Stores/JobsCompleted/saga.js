import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";

import { getjobsCompletedSuccess, getjobsCompletedFailure } from "./actions";

// Get All Jobs Completed Function
export function* fetchjobCompleted({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const allData = yield select((state) => state)
  const query = payload?.query ? payload?.query : "";
  try {
    const data = yield call(
      api(token).get,
      `/api/customer-completed-order`
    );
    yield put(getjobsCompletedSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching visits!"
      )
    );
    yield put(getjobsCompletedFailure(error));
  }
}

export function* getJobsCompletedFlow() {
  yield takeEvery(constant.GET_JOB_COMPLETED_REQUEST, fetchjobCompleted);
}

export default function* JobsCompletedSaga() {
  yield all([getJobsCompletedFlow()]);
}
