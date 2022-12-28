import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";

import {
  getGroupSuccess,
  getGroupFailure,
  addGroupSuccess,
  addGroupFailure,
} from "./actions";

export function* fetchGroup({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const query = payload?.query ? payload?.query : "";
  try {
    const data = yield call(
      api(token).get,
      `/api/quote-qa-list?group_id=${payload?.id}`
    );
    yield put(getGroupSuccess(data?.data?.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching group details!"
      )
    );
    yield put(getGroupFailure(error));
  }
}

export function* addGroup({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const query = payload?.query ? payload?.query : "";
  try {
    const data = yield call(
      api(token).post,
      `api/quote-qa-summary/add`, payload?.data
    );
    yield put(addGroupSuccess(data?.data?.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching adding group!"
      )
    );
    yield put(addGroupFailure(error));
  }
}

export function* getGroupFlow() {
  yield takeEvery(constant.GET_GROUP_REQUEST, fetchGroup);
}

export function* addGroupFlow() {
  yield takeEvery(constant.ADD_GROUP_REQUEST, addGroup);
}

export default function* InstantQuoteSaga() {
  yield all([getGroupFlow(),addGroupFlow()]);
}
