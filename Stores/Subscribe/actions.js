import {
  CHECK_SUBSCRIPTION_STATUS,
  CHECK_SUBSCRIPTION_STATUS_SUCCESS,
  CHECK_SUBSCRIPTION_STATUS_FAILURE,
  SUBSCRIBE_USER,
  SUBSCRIBE_USER_SUCCESS,
  SUBSCRIBE_USER_FAILURE,
  UNSUBSCRIBE_USER,
  UNSUBSCRIBE_USER_SUCCESS,
  UNSUBSCRIBE_USER_FAILURE,
} from './constants'

//Check subscription
export const checkSubscription = (payload) => ({
  type: CHECK_SUBSCRIPTION_STATUS,
  payload,
})
export const checkSubscriptionSuccess = (payload) => ({
  type: CHECK_SUBSCRIPTION_STATUS_SUCCESS,
  payload,
})
export const checkSubscriptionFailure = (payload) => ({
  type: CHECK_SUBSCRIPTION_STATUS_FAILURE,
  payload,
})
// Subscribe user
export const subscribeUser = (payload) => ({
  type: SUBSCRIBE_USER,
  payload,
})
export const subscribeUserSuccess = (payload) => ({
  type: SUBSCRIBE_USER_SUCCESS,
  payload,
})
export const subscribeUserFailure = (payload) => ({
  type: SUBSCRIBE_USER_FAILURE,
  payload,
})
// Unubscribe user
export const unsubscribeUser = (payload) => ({
  type: UNSUBSCRIBE_USER,
  payload,
})
export const unsubscribeUserSuccess = (payload) => ({
  type: UNSUBSCRIBE_USER_SUCCESS,
  payload,
})
export const unsubscribeUserFailure = (payload) => ({
  type: UNSUBSCRIBE_USER_FAILURE,
  payload,
})
