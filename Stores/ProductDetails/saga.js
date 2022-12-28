import {all, call, put, select, take, takeEvery} from 'redux-saga/effects'
import {successAlert, errorAlert} from '../Alerts/actions'
import api from '../../utils/api'
import * as constant from './constants'
import QueryString from 'query-string'
import moment from 'moment'

import {
  getProductDetailsSuccess,
  getProductDetailsFailure,
  //
  getProductQASuccess,
  getProductQAFailure,
  //
  getProductOfferingSuccess,
  getProductOfferingFailure,
  //
  getPackageBuilderSuccess,
  getPackageBuilderFailure,
  //
  getProductOfferDetailSuccess,
  getProductOfferDetailFailure,
} from './actions'

// Product data
export function* fetchProductDetails({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(token).get,
      `/api/product-detail/${payload?.group_id}/${payload?.productSlug}`,
    )
    yield put(getProductDetailsSuccess(data.data))
  } catch (error) {
    // yield put(
    //   errorAlert(
    //     typeof error === "string"
    //       ? error
    //       : error?.error
    //         ? error?.error
    //         : "Error while fetching product details!"
    //   )
    // );
    yield put(getProductDetailsFailure(error))
  }
}

// Product qa data
export function* fetchProductQADetails({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const {...options} = payload
  let query = QueryString.stringify(options)
  try {
    const data = yield call(
      api(token).get,
      `/api/final-product/question-answer?${query}&all=true`,
    )
    yield put(getProductQASuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching product qa details!',
      ),
    )
    yield put(getProductQAFailure(error))
  }
}

export function* getProductOffering({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const data = yield call(
      api(token).post,
      `/api/customer-product-offering?all=true`,
      payload,
    )
    yield put(getProductOfferingSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetch product offer!',
      ),
    )
    yield put(getProductOfferingFailure(error))
  }
}

export function* fetchPackageBuilder({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const {...options} = payload
  let query = QueryString.stringify(options)
  try {
    const data = yield call(
      api(token).get,
      `/api/customer-package-group?${query}`,
      payload,
    )
    yield put(getPackageBuilderSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetch packages!',
      ),
    )
    yield put(getPackageBuilderFailure(error))
  }
}

// Product Offer Detail
export function* fetchProductOfferDetail({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const data = yield call(
      api(token).get,
      `/api/customer-product-offering/detail-view/${payload?.id}`,
    )
    yield put(getProductOfferDetailSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching product offer detail!',
      ),
    )
    yield put(getProductOfferDetailFailure(error))
  }
}

export function* getPackageBuilderFlow() {
  yield takeEvery(constant.GET_PACKAGE_BUILDER_REQUEST, fetchPackageBuilder)
}

export function* getProductDetailsFlow() {
  yield takeEvery(constant.GET_PRODUCT_DETAILS_REQUEST, fetchProductDetails)
}

export function* getProductQADetailsFlow() {
  yield takeEvery(constant.GET_PRODUCT_QA_REQUEST, fetchProductQADetails)
}

export function* getProductOfferingFlow() {
  yield takeEvery(constant.GET_PRODUCT_OFFERING_REQUEST, getProductOffering)
}

export function* getProductOfferDetailFlow() {
  yield takeEvery(
    constant.GET_PRODUCT_OFFER_DETAIL_REQUEST,
    fetchProductOfferDetail,
  )
}

export default function* ProductDetailsSaga() {
  yield all([
    getPackageBuilderFlow(),
    getProductDetailsFlow(),
    getProductQADetailsFlow(),
    getProductOfferingFlow(),
    getProductOfferDetailFlow(),
  ])
}
