import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";

import {
  getCategoryDetailsSuccess,
  getCategoryDetailsFailure,
  searchRequestSuccess,
  searchRequestFailure,
  customerRequestSuccess,
  customerRequestFailure,
} from "./actions";
import { getComplaintsListing } from "../Jobs/actions";

export function* fetchCategoryDetails({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const query = payload?.query ? payload?.query : "";
  try {
    const data = yield call(
      api(token).get,
      `/api/category-detail/${payload?.categorySlug}`
    );
    yield put(getCategoryDetailsSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching category details!"
      )
    );
    yield put(getCategoryDetailsFailure(error));
  }
}

export function* searchRequestData({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const staticToken = process.env.NEXT_PUBLIC_APP_TOKEN
  let tokenparse = token ?? staticToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  const { cancelToken, ...options } = payload;
  let query = QueryString.stringify(options);
  
  try {
    const data = yield call(
      api(token).get,
      `/api/search-by-name?${query}`
    );
    yield put(searchRequestSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while searching!"
      )
    );
    yield put(searchRequestFailure(error));
  }
}

export function* customerRequest({ payload }) {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWN0aXNlcnZlLWFwaS5zbGlja3RlY2hub2xvZ2llcy5jby51a1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYzNDgxNjc3NSwiZXhwIjoxNjM0ODI3NTc1LCJuYmYiOjE2MzQ4MTY3NzUsImp0aSI6IlkxMHZlQThXN0xHNlhES2UiLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.BQmkX3RA7bRaPVZNKgw40BUumtxp3GxJDUkVKHdC9IY';
  try {
    const data = yield call(
      api(token).get,
      `/api/users/${payload?.id}`
    );
    yield put(customerRequestSuccess(data?.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching user details!"
      )
    );
    yield put(customerRequestFailure(error));
  }
}

export function* getCategoryDetailsFlow() {
  yield takeEvery(constant.GET_CATEGORY_DETAILS_REQUEST, fetchCategoryDetails);
}

export function* searchServiceFlow() {
  yield takeEvery(constant.SEARCH_REQUEST, searchRequestData);
}

export function* customerReqFlow() {
  yield takeEvery(constant.CUSTOMER_REQUEST, customerRequest);
}


export default function* CategoryDetailsSaga() {
  yield all([getCategoryDetailsFlow(), searchServiceFlow(), customerReqFlow()]);
}
