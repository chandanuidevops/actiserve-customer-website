import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";

import {
  getQuotesSuccess,
  getQuotesFailure,
  //
  getSingleQuoteSuccess,
  getSingleQuoteFailure,
  //
  saveQuoteSuccess,
  saveQuoteFailure,
  //
  getVisitQuotesSuccess,
  getVisitQuotesFailure,
} from "./actions";
import { getOrderFlow as getOrderFlowAction } from "../FinalOrder/actions";

export function* fetchQuotes({ payload, history }) {
  const query = payload?.query ? payload?.query : "";
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const data = yield call(
      api(token).get,
      `api/customer-quotation-list`,
    );
    if (data) {
      yield put(getQuotesSuccess(data.data));
    }
  } catch (error) {
    yield put(getQuotesFailure(error));
    if (typeof error === "string") yield put(errorAlert(error));
    else if (typeof error.error === "string") yield put(errorAlert(error.error));
  }
}

export function* fetchSingleQuotes({ payload, history }) {
  const query = payload?.query ? payload?.query : "";
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(
      api(token).get,
      `api/customer-single-quotation/${payload}`,
    );
    if (data) {
      yield put(getSingleQuoteSuccess(data?.data));
    }
  } catch (error) {
    yield put(getSingleQuoteFailure(error));
    if (typeof error === "string") yield put(errorAlert(error));
    else if (typeof error.error === "string") yield put(errorAlert(error.error));
  }
}
export function* saveQuoteData({ payload, history }) {
  const query = payload?.query ? payload?.query : "";
  const token = yield select((state) => state?.AuthReducer?.token);
console.log("paylod>>",payload)
  try {
    const data = yield call(
      api(token).post,
      `api/customer-quotation-accepted-rejected/${payload?.id}`,
      payload?.data
    );
    if (data) {
      yield put(saveQuoteSuccess(data?.data));
    }
    if (payload?.type === 'accept') {
      yield put(successAlert('Quote Accepted Successfully!'));
    } else if (payload?.type === 'reject') {
      yield put(successAlert('Quote Rejected Successfully!'));
    }
    yield put(getOrderFlowAction(payload?.order_id))
  } catch (error) {
    yield put(saveQuoteFailure(error));
    if (typeof error === "string") yield put(errorAlert(error));
    else if (typeof error.error === "string") yield put(errorAlert(error.error));
  }
}

export function* fetchVisitQuotes({ payload, history }) {
  const query = payload?.query ? payload?.query : "";
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const data = yield call(
      api(token).get,
      `api/quotation?order_id=${payload}`,
    );
    if (data) {
      yield put(getVisitQuotesSuccess(data.data));
    }
  } catch (error) {
    yield put(getVisitQuotesFailure(error));
    if (typeof error === "string") yield put(errorAlert(error));
    else if (typeof error.error === "string") yield put(errorAlert(error.error));
  }
}

export function* getQuotesFlow() {
  yield takeEvery(constant.GET_QUOTES, fetchQuotes);
}
export function* getSingleQuoteFlow() {
  yield takeEvery(constant.GET_SINGLE_QUOTES, fetchSingleQuotes);
}
export function* saveQuoteFlow() {
  yield takeEvery(constant.SAVE_QUOTE, saveQuoteData);
}
export function* getVisitQuoteFlow() {
  yield takeEvery(constant.GET_VISIT_QUOTE, fetchVisitQuotes);
}


export default function* QuoteDetailsSaga() {
  yield all([getQuotesFlow(), getSingleQuoteFlow(), saveQuoteFlow(),getVisitQuoteFlow()]);
}
