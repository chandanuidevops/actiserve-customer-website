import {all, call, put, select, take, takeEvery} from 'redux-saga/effects'
import {successAlert, errorAlert} from '../Alerts/actions'
import api from '../../utils/api'
import * as constant from './constants'
import QueryString from 'query-string'
import moment from 'moment'

import {
  getGroupDetailsSuccess,
  getGroupDetailsFailure,
  //
  getGroupCategoriesSuccess,
  getGroupCategoriesFailure,
  //
  getGroupSuccess,
  getGroupFailure,
  //
  getCategoriesSuccess,
  getCategoriesFailure,
  //
  getProductSuccess,
  getProductFailure,
  //
  validateLocationSuccess,
  validateLocationFailure,
  resetValidateLocation,
  //
  validateDirectLocationSuccess,
  validateDirectLocationFailure,
  //
  validateProductSuccess,
  validateProductFailure,
} from './actions'

export function* fetchgroupDetails({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(token).get,
      `/api/category/product-list?location=${payload}`,
    )
    yield put(getGroupDetailsSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching group details!',
      ),
    )
    yield put(getGroupDetailsFailure(error))
  }
}

export function* fetchgroupCateDetails({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(token).get,
      `/api/category/product-list?location=${payload}`,
    )
    yield put(getGroupCategoriesSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching category details for selected city!',
      ),
    )
    yield put(getGroupCategoriesFailure(error))
  }
}

export function* fetchGroupListingDetails({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(api().get, `/api/postcode-group-list?all=true`)
    yield put(getGroupSuccess(data?.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching postcode group!',
      ),
    )
    yield put(getGroupFailure(error))
  }
}

export function* fetchCategories({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api().get,
      `/api/category-postcode-group/${payload}?all=true`,
    )
    yield put(getCategoriesSuccess(data?.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching categories!',
      ),
    )
    yield put(getCategoriesFailure(error))
  }
}

export function* fetchProduct({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(api().get, `/api/product-postcode-group/${payload}`)
    yield put(getProductSuccess(data?.data?.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching product!',
      ),
    )
    yield put(getProductFailure(error))
  }
}

export function* validateLocation({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(api().get, `/api/postcode-group-name/${payload}`)
    yield put(validateLocationSuccess(data.data.data))
    // yield put(resetValidateLocation())
  } catch (error) {
    yield put(validateLocationFailure(error.response.status))
    // yield put(resetValidateLocation())
  }
}

export function* validateDirectLocation({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(api().get, `/api/postcode-group-name/${payload}`)
    yield put(validateDirectLocationSuccess(data.data.data))
  } catch (error) {
    yield put(validateDirectLocationFailure(error.response.status))
  }
}

export function* validateProduct({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const staticToken = process.env.NEXT_PUBLIC_APP_TOKEN
  let tokenparse = token ?? staticToken
  const {cancelToken, ...options} = payload
  let query = QueryString.stringify(options)
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const data = yield call(
      api(token).get,
      `/api/search-group/search-category/search-product?${query}`,
    )
    yield put(validateProductSuccess(data?.data))
  } catch (error) {
    yield put(validateProductFailure(error?.response?.status))
  }
}

export function* getgroupDetailsFlow() {
  yield takeEvery(constant.GET_GROUP_DETAILS_REQUEST, fetchgroupDetails)
}

export function* getgroupCateDetailsFlow() {
  yield takeEvery(constant.GET_GROUP_CATEGORIES_REQUEST, fetchgroupCateDetails)
}

export function* getGroupListingFlow() {
  yield takeEvery(constant.GET_GROUPS_REQUEST, fetchGroupListingDetails)
}

export function* getCategoriesFlow() {
  yield takeEvery(constant.GET_CATEGORIES_REQUEST, fetchCategories)
}

export function* getProductsFlow() {
  yield takeEvery(constant.GET_PRODUCT_REQUEST, fetchProduct)
}

export function* validateLocationFlow() {
  yield takeEvery(constant.VALIDATE_LOCATION_REQUEST, validateLocation)
}

export function* validateDirectLocationFlow() {
  yield takeEvery(
    constant.VALIDATE_DIRECT_LOCATION_REQUEST,
    validateDirectLocation,
  )
}

export function* validateProductFlow() {
  yield takeEvery(constant.VALIDATE_PRODUCT_REQUEST, validateProduct)
}

export default function* groupDetailsSaga() {
  yield all([
    getgroupDetailsFlow(),
    getgroupCateDetailsFlow(),
    getGroupListingFlow(),
    getCategoriesFlow(),
    getProductsFlow(),
    validateLocationFlow(),
    validateDirectLocationFlow(),
    validateProductFlow(),
  ])
}
