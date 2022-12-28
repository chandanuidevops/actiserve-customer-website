import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";

import {
  getVisitsSuccess,
  getVisitsFailure,
  setTradersStaff,
  addVisitSuccess,
  addVisitFailure,
} from "./actions";
import { getComplaintsListing } from "../Jobs/actions";

// Get All Outcome Function
export function* fetchVistsList({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const query = payload?.query ? payload?.query : "";
  try {
    const data = yield call(
      api(token).get,
      `/api/customer-active-order?all=true${query}`
    );
    yield put(getVisitsSuccess(data.data));
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
    yield put(getVisitsFailure(error));
  }
}

// GET STAFF
export function* getTradersStaffFromTrader({
  payload = { cancelToken: null },
}) {
  const { cancelToken, traderId, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  const user = yield select((state) => state?.AuthReducer?.user);
  let query = traderId ? `&trader_id=${traderId}` : "";
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      // `/api/trader-staff?all=true`,
      `/api/trader-staff/?all=true&trader_id=${user?.trader_id}`
    );
    if (data) {
      yield put(setTradersStaff(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Unable to get Trader Staff"));
  }
}

export function* addVisit({ payload = { cancelToken: null } }) {
  const currentVisit = yield select(
    (state) => state?.VisitsReducer?.currentVisit
  );
  const { cancelToken } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token, cancelToken).post,
      `/api/trader/assign-visit/${payload?.order_id}`,
      payload
    );
    if (data) {
      yield put(addVisitSuccess(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Unable to assign visit"));
  }
}

export function* getVisitsListFlow() {
  yield takeEvery(constant.GET_VISIT_REQUEST, fetchVistsList);
}
export function* getTraderStaffFlow() {
  yield takeEvery(constant.VISITS_GET_TRADER_STAFF, getTradersStaffFromTrader);
}
export function* addVisitFlow() {
  yield takeEvery(constant.ADD_VISIT_REQUEST, addVisit);
}

export default function* VisitsSaga() {
  yield all([getVisitsListFlow(), getTraderStaffFlow(), addVisitFlow()]);
}
