import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import moment from 'moment'
import api from '../../utils/api'
import QueryString from 'query-string'
import {
  checkSubscriptionSuccess,
  checkSubscriptionFailure,
  subscribeUserSuccess,
  subscribeUserFailure,
  unsubscribeUserSuccess,
  unsubscribeUserFailure,
} from './actions'

import {
  CHECK_SUBSCRIPTION_STATUS,
  SUBSCRIBE_USER,
  UNSUBSCRIBE_USER,
} from './constants'

import {errorAlert, successAlert} from '../Alerts/actions'

export function* checkSubscription({payload}) {
  try {
    const data = yield call(
      api(null).post,
      `api/check-subscribe-unsubscribe`,
      payload,
    )

 

    yield put(checkSubscriptionSuccess(data.data))
  } catch (e) {
    yield put(checkSubscriptionFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while checking subscribtion status!'))
  }
}
export function* subscribeUser({payload}) {
  try {
    const data = yield call(
      api(null).post,
      payload?.is_mail_subscribe
        ? `api/subscribe-mail`
        : `api/unsubscribe-mail`,
      payload
    )
    yield put(subscribeUserSuccess(data?.data))
    yield put(successAlert(`You have ${payload?.is_mail_subscribe?'subscribed':'unsubscribed '} successfully!`))

    
  } catch (e) {
    yield put(subscribeUserFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert(`Error while ${payload?.is_mail_subscribe?'subscribing':'unsubscribing'}!`))
  }
}

export function* unsubscribeUser({payload}) {
  try {
    const data = yield call(api(null).get, `api/unsubscribe-mail`, payload)

    yield put(unsubscribeUserSuccess(data?.data))
  } catch (e) {
    yield put(unsubscribeUserFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while unsubscribing!'))
  }
}

export function* checkSubscriptionFlow() {
  yield takeEvery(CHECK_SUBSCRIPTION_STATUS, checkSubscription)
}

export function* subscribeUserFlow() {
  yield takeEvery(SUBSCRIBE_USER, subscribeUser)
}
export function* unsubscribeUserFlow() {
  yield takeEvery(UNSUBSCRIBE_USER, unsubscribeUser)
}

export default function* SubscribeSaga() {
  yield all([
    checkSubscriptionFlow(),
    subscribeUserFlow(),
    unsubscribeUserFlow(),
  ])
}
