import {all, call, put, select, take, takeEvery} from 'redux-saga/effects'
import {successAlert, errorAlert} from '../Alerts/actions'
import api from '../../utils/api'
import * as constant from './constants'
import QueryString from 'query-string'
import moment from 'moment'

import {
  validateCustomerSuccess,
  validateCustomerFailure,
  setCustomerVerified,
  //
  getCustomerAddress,
  getCustomerAddressSuccess,
  getCustomerAddressFailure,
  //
  addCustomerAddressSuccess,
  addCustomerAddressFailure,
  //
  editCustomerAddressSuccess,
  editCustomerAddressFailure,
  //
  validatePostcodeSuccess,
  validatePostcodeFailure,
  //
  resendVerifyEmailSuccess,
  resendVerifyEmailFailure,
} from './actions'

export function* validateCustomer({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(api(null).post, `api/customers/checkemail`, payload)
    yield put(validateCustomerSuccess(data?.code))
    yield put(setCustomerVerified(data?.data))
  } catch (error) {
    yield put(validateCustomerFailure(error?.response?.status))
  }
}
export function* fetchCustomerAddress({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(token).get,
      `/api/customers-addresses?customer_id=${payload}`,
    )
    yield put(getCustomerAddressSuccess(data?.data?.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching customer address!',
      ),
    )
    yield put(getCustomerAddressFailure(error))
  }
}

export function* addAddress({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(token).post,
      `api/customers-addresses/add`,
      payload.data,
    )
    yield put(addCustomerAddressSuccess())
    yield put(successAlert('Address Added Successfully!'))
    if (payload?.data?.customer_id) {
      yield put(getCustomerAddress(payload?.data?.customer_id))
    }
  } catch (e) {
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while adding address!'))
    yield put(addCustomerAddressFailure())
  }
}

export function* editAddress({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(token).post,
      `api/customers-addresses/edit/${payload?.id}`,
      payload,
    )
    yield put(editCustomerAddressSuccess())
    yield put(successAlert('Address Updated Successfully!'))
    if (payload?.data?.customer_id) {
      yield put(getCustomerAddress(payload?.data?.customer_id))
    }
  } catch (e) {
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while updating address!'))
    yield put(editCustomerAddressFailure())
  }
}

export function* editCustomer({payload}) {
  const token = payload?.token
  const customerId = payload?.id
  const history = payload?.history
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(token).post,
      `/api/customers/edit/${customerId}`,
      payload?.data,
    )
    yield put(editCustomerSuccess())
    yield put(
      successAlert(
        'Password Updated Successfully!, Login to view your orders!',
      ),
    )
    history.push('/login')
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while updating password!',
      ),
    )
    yield put(editCustomerFailure(error))
  }
}

export function* validatePostcodeData({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(null).post,
      `/api/customer-check-postcode`,
      payload,
    )
    yield put(validatePostcodeSuccess(data?.code))
  } catch (error) {
    yield put(validatePostcodeFailure(error?.response?.data?.code))
  }
}
export function* resendVerifyLinkData({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''

  console.log('payload::', payload)
  try {
    const data = yield call(
      api(null).post,
      `/api/auth/one-time-invitation/email`,
      payload?.data,
    )
    yield put(resendVerifyEmailSuccess(data?.code))
    yield put(successAlert('Verification link sent successfully!'))
  } catch (error) {
    yield put(resendVerifyEmailFailure(error?.response?.data?.code))
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while sending verification link!',
      ),
    )
  }
}

export function* validateCustomerFlow() {
  yield takeEvery(constant.VALIDATE_CUSTOMER, validateCustomer)
}

export function* fetchCustomerAddressFlow() {
  yield takeEvery(constant.GET_CUSTOMER_ADDRESS, fetchCustomerAddress)
}

export function* addCustomerAddressFlow() {
  yield takeEvery(constant.ADD_CUSTOMER_ADDRESS, addAddress)
}

export function* editCustomerAddressFlow() {
  yield takeEvery(constant.EDIT_CUSTOMER_ADDRESS, editAddress)
}

export function* editCustomerFlow() {
  yield takeEvery(constant.EDIT_CUSTOMER, editCustomer)
}

export function* validatePostcodeFlow() {
  yield takeEvery(constant.VALIDATE_POSTCODE, validatePostcodeData)
}

export function* resendVerifyLinkFlow() {
  yield takeEvery(constant.RESEND_VERIFY_MAIL, resendVerifyLinkData)
}

export default function* CustomerFlowSaga() {
  yield all([
    validateCustomerFlow(),
    fetchCustomerAddressFlow(),
    addCustomerAddressFlow(),
    editCustomerAddressFlow(),
    editCustomerFlow(),
    validatePostcodeFlow(),
    resendVerifyLinkFlow(),
  ])
}
