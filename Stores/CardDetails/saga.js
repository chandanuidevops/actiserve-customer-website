import {all, call, put, select, take, takeEvery} from 'redux-saga/effects'
import {successAlert, errorAlert} from '../Alerts/actions'
import api from '../../utils/api'
import * as constant from './constants'
import QueryString from 'query-string'
import moment from 'moment'

import {
  getCardsSuccess,
  getCardsFailure,
  getCardsRequest as getCardsAction,
  editOrderSuccess,
  editOrderFailure,
  attachPaymentMethodSuccess,
  attachPaymentMethodFailure,
  getCustomerCards as getCustomerCardsAction,
  getCustomerCardsSuccess,
  getCustomerCardsFailure,
  deleteCustomerCardsSuccess,
  deleteCustomerCardsFailure,
  addCustomerCardsSuccess,
  addCustomerCardsFailure,
} from './actions'

import {getVisitsRequest} from '../OrderVisits/actions'

export function* fetchCardDetails({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  const query = payload?.query ? payload?.query : ''
  console.log('Pyal>>', payload)
  try {
    const data = yield call(
      api(tokenparse).get,
      `/api/stripe/payment-method/${payload?.order_id}`,
    )
    yield put(getCardsSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching card details!',
      ),
    )
    yield put(getCardsFailure(error))
  }
}

export function* editOrder({payload, history}) {
  console.log('hid>>', payload)
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const data = yield call(
      api(token).post,
      `/api/product-order/edit/${payload.id}/customer-detail`,
      payload.data,
    )
    yield put(editOrderSuccess())
    if (payload?.type === 'one-off') {
      yield put(successAlert('Service booked  successfully!'))
    } else {
      yield put(successAlert('Subscription added successfully.'))
    }
    payload?.history?.replace('/confirmation')
    if (payload?.from === 'single-order') {
      yield put(getVisitsRequest())
    }
  } catch (e) {
    yield put(editOrderFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
  }
}

export function* attachPaymentMethod({payload = {cancelToken: null}}) {
  const {cancelToken, id} = payload
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const {data} = yield call(
      api(token, cancelToken).post,
      `/api/stripe/payment-method/add/${id}`,
      payload,
    )
    if (data) {
      yield put(attachPaymentMethodSuccess(data))
      yield put(getCardsAction({order_id: id}))
      yield put(successAlert('Payment method added successfully!'))
    }
  } catch (e) {
    yield put(attachPaymentMethodFailure(e))
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (typeof e.response.data.error === 'string')
      yield put(errorAlert(e.response.data.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while attaching payment method!'))
  }
}

export function* getCustomerCards({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  console.log('Pyal>>', payload)
  try {
    const data = yield call(
      api(token).get,
      `/api/stripe/payment-method/customer/${payload}`,
    )
    yield put(getCustomerCardsSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching card details!',
      ),
    )
    yield put(getCustomerCardsFailure(error))
  }
}

export function* deleteCustomerCard({payload = {cancelToken: null}}) {
  const {cancelToken, id} = payload
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const {data} = yield call(
      api(token, cancelToken).post,
      `/api/stripe/payment-method/remove/customer/${payload?.customer_id}`,
      payload?.data,
    )
    if (data) {
      yield put(deleteCustomerCardsSuccess(data))
      yield put(getCustomerCardsAction(payload?.customer_id))
      yield put(successAlert('Payment method removed successfully!'))
    }
  } catch (e) {
    yield put(deleteCustomerCardsFailure(e))
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (typeof e.response.data.error === 'string')
      yield put(errorAlert(e.response.data.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while deleting payment method!'))
  }
}

export function* addCustomerCard({payload = {cancelToken: null}}) {
  const {cancelToken, id} = payload
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const {data} = yield call(
      api(token, cancelToken).post,
      `/api/stripe/payment-method/add/customer/${payload?.customer_id}`,
      payload?.data,
    )
    if (data) {
      yield put(addCustomerCardsSuccess(data))
      yield put(successAlert('Payment method added successfully!'))
      yield put(getCustomerCardsAction(payload?.customer_id))
    }
  } catch (e) {
    yield put(addCustomerCardsFailure(e))
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (typeof e.response.data.error === 'string')
      yield put(errorAlert(e.response.data.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while adding payment method!'))
  }
}

export function* getCardDetailsFlow() {
  yield takeEvery(constant.GET_CARDS_REQUEST, fetchCardDetails)
}

export function* editOrderFlow() {
  yield takeEvery(constant.EDIT_ORDER, editOrder)
}

export function* attachPaymentMethodFlow() {
  yield takeEvery(constant.ATTACH_PAYMENT_METHOD, attachPaymentMethod)
}

export function* getCustomerCardsflow() {
  yield takeEvery(constant.GET_CUSTOMER_CARDS, getCustomerCards)
}

export function* deleteCustomerCardsflow() {
  yield takeEvery(constant.DELETE_CUSTOMER_CARD, deleteCustomerCard)
}

export function* addCustomerCardsflow() {
  yield takeEvery(constant.ADD_CUSTOMER_CARD, addCustomerCard)
}

export default function* CardDetailsSaga() {
  yield all([
    getCardDetailsFlow(),
    editOrderFlow(),
    attachPaymentMethodFlow(),
    getCustomerCardsflow(),
    deleteCustomerCardsflow(),
    addCustomerCardsflow(),
  ])
}
