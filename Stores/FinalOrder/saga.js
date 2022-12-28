import {all, call, put, select, take, takeEvery} from 'redux-saga/effects'
import {successAlert, errorAlert} from '../Alerts/actions'
import api from '../../utils/api'
import * as constant from './constants'
import QueryString from 'query-string'

import {
  createPaymentSuccess,
  createPaymentFailure,
  addOrderSuccess,
  addOrderFailure,
  getOrderFlowSuccess,
  getOrderFlowFailure,
  getAddonsSuccess,
  getAddonsFailure,
  editVisitSuccess,
  editVisitFailure,
  closeVisitEditModal,
  getOrderFlow as getOrderFlowAction,
  deleteImagesSuccess,
  deleteImagesFailure,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
  editAddonSuccess,
  editAddonFailure,
  checkMaxJobSuccess,
  checkMaxJobFailure,
  getQuoteAdjustDataSuccess,
  getQuoteAdjustDataFailure,
  payQuoteAdjustSuccess,
  payQuoteAdjustFailure,
  acceptQuoteAdjustSuccess,
  acceptQuoteAdjustFailure,
  rejectQuoteAdjustSuccess,
  rejectQuoteAdjustFailure,
  getQuoteAdjustData as getQuoteAdjustDataAction,
} from './actions'

export function* addOrderData({payload, history}) {
  const staticToken = process.env.NEXT_PUBLIC_APP_TOKEN
  const query = payload?.query ? payload?.query : ''

  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN

  try {
    const data = yield call(
      api(tokenparse).post,
      `api/customer-create-order/add`,
      payload.data,
    )
    if (data) {
      yield put(addOrderSuccess(data.data))
     // yield put(successAlert('Service Booked Successfully!'))
      let order_details = JSON.stringify(data.data)
      yield localStorage.setItem('order_details', order_details)
      yield localStorage.setItem('actiserve_cart_productqa_values', '')
      yield localStorage.setItem('actiserve_cart_productqa_details', '')
      yield localStorage.setItem('actiserve_cart_product', '')
      yield localStorage.setItem('actiserve_cart_productqa', '')
      yield localStorage.setItem('actiserve_cart_images', '')
      yield localStorage.setItem('cartItems', '')
      yield localStorage.setItem('urbanserve_includes_items', '')
    }
  } catch (error) {
    yield put(addOrderFailure(error))
    if (typeof error === 'string') yield put(errorAlert(error))
    else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* createPaymentData({payload, history}) {
  const staticToken = process.env.NEXT_PUBLIC_APP_TOKEN
  const query = payload?.query ? payload?.query : ''

  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = payload?.data?.access_token
    ? payload?.data?.access_token
    : token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN

  try {
    const data = yield call(
      api(tokenparse).post,
      `api/customer-create-order/final`,
      payload.data,
    )
    if (data) {
      yield put(createPaymentSuccess(data.data))
      yield put(successAlert('Payment Successfully done!'))
    }
  } catch (error) {
    yield put(createPaymentFailure(error))
    if (typeof error === 'string') yield put(errorAlert(error))
    else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* editVisitData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)

  try {
    const data = yield call(
      api(token).post,
      `api/customer-note/edit/${payload?.id}`,
      payload.data,
    )
    if (data) {
      yield put(editVisitSuccess(data.data))
      yield put(successAlert('Note / Instruction updated successfully!'))
      yield put(closeVisitEditModal())
      yield put(getOrderFlowAction(payload?.order_id))
    }
  } catch (error) {
    yield put(editVisitFailure(error))
    if (typeof error === 'string') yield put(errorAlert(error))
    else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* getOrderFlowData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const data = yield call(
      api(token).get,
      `/api/order/order-flow-view/${payload}`,
    )
    yield put(getOrderFlowSuccess(data.data))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : error?.error
          ? error?.error
          : 'Error while fetching order flow view!',
      ),
    )
    yield put(getOrderFlowFailure(error))
  }
}

export function* getAddonsData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const data = yield call(
      api(token).get,
      `/api/order/visits/addon/${payload}`,
    )
    if (data) {
      yield put(getAddonsSuccess(data.data))
    }
  } catch (error) {
    yield put(getAddonsFailure(error))
    // if (typeof error === 'string') yield put(errorAlert(error))
    // else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* deleteImages({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)

  console.log('payload>>', payload)
  try {
    const data = yield call(
      api(null).post,
      `api/files/multi-delete/file`,
      payload,
    )
    if (data) {
      yield put(deleteImagesSuccess(data.data))
      yield put(successAlert('File Deleted Succefully!'))
    }
  } catch (error) {
    yield put(deleteImagesFailure(error))
    // if (typeof error === 'string') yield put(errorAlert(error))
    // else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* getOrderDetailsData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  console.log('payload::', payload)
  try {
    const data = yield call(api(token).get, `/api/product-order/${payload}`)
    if (data) {
      yield put(getOrderDetailsSuccess(data.data))
    }
  } catch (error) {
    yield put(getOrderDetailsFailure(error))
    // if (typeof error === 'string') yield put(errorAlert(error))
    // else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* editAddonData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const data = yield call(
      api(token).post,
      `api/customer-visit-addon/add/${payload?.id}`,
      payload.addon_details,
    )
    if (data) {
      yield put(editAddonSuccess(data.data))
      yield put(successAlert('Addon added successfully!'))
      yield put(getOrderFlowAction(payload?.order_id))
      yield put(closeVisitEditModal())
    }
  } catch (error) {
    yield put(editAddonFailure(error))
    if (typeof error === 'string') yield put(errorAlert(error))
    else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* checkMaxJobData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  console.log('token::', token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const data = yield call(
      api(tokenparse).post,
      `api/check-product-max-job`,
      payload,
    )
    if (data) {
      yield put(checkMaxJobSuccess(data.data))
    }
  } catch (error) {
    yield put(checkMaxJobFailure(error))
    if (typeof error === 'string') yield put(errorAlert(error))
    else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* getQuoteAdjustData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const data = yield call(
      api(tokenparse).post,
      `/api/get-quote-adjustment-data`,
      payload,
    )
    if (data) {
      yield put(getQuoteAdjustDataSuccess(data.data))
    }
  } catch (error) {
    yield put(getQuoteAdjustDataFailure(error))
    if (typeof error === 'string') yield put(errorAlert(error))
    else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}

export function* payQuoteAdjustData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const data = yield call(
      api(tokenparse).post,
      `/api/quote-adjustment-paid`,
      payload?.data,
    )
    if (data) {
      yield put(payQuoteAdjustSuccess(data.data))
      yield put(
        getQuoteAdjustDataAction({
          customer_id: payload?.orderData?.customer_id,
          order_id: payload?.orderData?.order_id,
        }),
      )
    }
  } catch (error) {
    yield put(payQuoteAdjustFailure(error))
    if (typeof error === 'string') yield put(errorAlert(error))
    else if (typeof error.error === 'string') yield put(errorAlert(error.error))
  }
}
export function* acceptQuoteAdjustData({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  console.log('acceptQuoteAdjustData', payload)

  try {
    const {data} = yield call(
      api(token).post,
      `/api/quote-adjustment-pay-and-accept`,
      payload?.data,
    )
    if (data) {
      yield put(acceptQuoteAdjustSuccess(data))
      yield put(successAlert('Quote adjustment accepted successfully!'))
      yield put(
        getQuoteAdjustDataAction({
          customer_id: payload?.orderData?.customer_id,
          order_id: payload?.orderData?.order_id,
        }),
      )
    }
  } catch (e) {
    yield put(acceptQuoteAdjustFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while accepting quote adjustment!'))
  }
}

export function* rejectQuoteAdjustData({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)

  try {
    const {data} = yield call(
      api(token).post,
      `/api/quote-adjustment-reject`,
      payload?.data,
    )
    if (data) {
      yield put(rejectQuoteAdjustSuccess(data))
      yield put(successAlert('Quote adjustment rejected successfully!'))
      yield put(
        getQuoteAdjustDataAction({
          customer_id: payload?.orderData?.customer_id,
          order_id: payload?.orderData?.order_id,
        }),
      )
    }
  } catch (e) {
    yield put(rejectQuoteAdjustFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while rejecting quote adjustment!'))
  }
}
export function* addOrderFlow() {
  yield takeEvery(constant.ADD_ORDER, addOrderData)
}

export function* createPaymentFlow() {
  yield takeEvery(constant.CREATE_PAYMENT, createPaymentData)
}

export function* editVisitFlow() {
  yield takeEvery(constant.EDIT_VISIT, editVisitData)
}

export function* getOrderFlow() {
  yield takeEvery(constant.GET_ORDER_FLOW, getOrderFlowData)
}

export function* getAddonsFlow() {
  yield takeEvery(constant.GET_ADDONS, getAddonsData)
}

export function* deleteImagesFlow() {
  yield takeEvery(constant.DELETE_IMAGE, deleteImages)
}

export function* getOrderDetailsFlow() {
  yield takeEvery(constant.GET_ORDER_DETAILS, getOrderDetailsData)
}

export function* editAddonFlow() {
  yield takeEvery(constant.EDIT_ADDON, editAddonData)
}

export function* checkMaxJobFlow() {
  yield takeEvery(constant.CHECK_MAX_JOB, checkMaxJobData)
}

export function* payQuoteAdjustFlow() {
  yield takeEvery(constant.PAY_QUOTEADJUST, payQuoteAdjustData)
}

export function* getQuoteAdjustFlow() {
  yield takeEvery(constant.GET_QUOTEADJUST_DATA, getQuoteAdjustData)
}
export function* acceptQuoteAdjustFlow() {
  yield takeEvery(constant.ACCEPT_QUOTEADJUST_DATA, acceptQuoteAdjustData)
}
export function* rejectQuoteAdjustFlow() {
  yield takeEvery(constant.REJECT_QUOTEADJUST_DATA, rejectQuoteAdjustData)
}

export default function* FinalOrderSaga() {
  yield all([
    createPaymentFlow(),
    addOrderFlow(),
    getOrderFlow(),
    getAddonsFlow(),
    editVisitFlow(),
    deleteImagesFlow(),
    getOrderDetailsFlow(),
    editAddonFlow(),
    checkMaxJobFlow(),
    payQuoteAdjustFlow(),
    getQuoteAdjustFlow(),
    acceptQuoteAdjustFlow(),
    rejectQuoteAdjustFlow(),
    payQuoteAdjustFlow(),
  ])
}
