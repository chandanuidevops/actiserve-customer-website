import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_PRODUCT_LIST,
  GET_SERVICE_RESULT,
  GET_POPULAR_SERVICES,

} from "./constants";
import { successAlert, errorAlert } from "../Alerts/actions";
import {
  getProductListSuccess,
  getProductListFailure,
  getServiceResultSuccess,
  getServiceResultFailure,
  getPopularServicesSuccess,
  getPopularServicesFailure
} from "./actions";
import moment from "moment";
import api from "../../utils/api";
import QueryString from "query-string";

export function* getProductListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  const localToken = window.localStorage.getItem('token');
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const data = yield call(
      api(tokenparse, cancelToken).get,
      `/api/category/final-product/product-list?all=true`
    );
    if (data) {
      yield put(getProductListSuccess(data.data));
    }
  } catch (e) {
    yield put(getProductListFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching product list!"));
  }
}

export function* getServiceResultList({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const localToken = window.localStorage.getItem('token');
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const data = yield call(
      api(tokenparse, null).get,
      `/api/final-product/product-details/${payload.product_id}/?postcode=${payload.postcode}`
    );
    if (data) {
      yield put(getServiceResultSuccess(data?.data?.data));
    }
  } catch (e) {
    yield put(getServiceResultFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching result!"));
  }
}

export function* getPopularServiceListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  const localToken = window.localStorage.getItem('token');
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const data = yield call(
      api(tokenparse, cancelToken).get,
      `/api/popular-service?popular_service=true&all=true`
    );
    if (data) {
      yield put(getPopularServicesSuccess(data.data));
    }
  } catch (e) {
    yield put(getPopularServicesFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching product list!"));
  }
}

export function* getProductListlFlow() {
  yield takeEvery(GET_PRODUCT_LIST, getProductListing);
}

export function* getServiceResultFlow() {
  yield takeEvery(GET_SERVICE_RESULT, getServiceResultList);
}

export function* getPopulerServiceFlow() {
  yield takeEvery(GET_POPULAR_SERVICES, getPopularServiceListing);
}

export default function* servicesSaga() {
  yield all([
    getProductListlFlow(),
    getServiceResultFlow(),
    getPopulerServiceFlow(),
  ]);
}
