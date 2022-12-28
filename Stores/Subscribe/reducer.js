import produce from 'immer'

import {
  //
  CHECK_SUBSCRIPTION_STATUS,
  CHECK_SUBSCRIPTION_STATUS_SUCCESS,
  CHECK_SUBSCRIPTION_STATUS_FAILURE,
  //
  SUBSCRIBE_USER,
  SUBSCRIBE_USER_SUCCESS,
  SUBSCRIBE_USER_FAILURE,
  //
  UNSUBSCRIBE_USER,
  UNSUBSCRIBE_USER_SUCCESS,
  UNSUBSCRIBE_USER_FAILURE,
} from './constants'

export const initialState = {
  isCheckingSubscription: false,
  subscribeData: {},
  //
  isSubscribing: false,
}

const SubscribeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHECK_SUBSCRIPTION_STATUS:
        draft.isCheckingSubscription = true
        break
      case CHECK_SUBSCRIPTION_STATUS_SUCCESS:
        draft.isCheckingSubscription = false
        draft.subscribeData = action.payload
        break
      case CHECK_SUBSCRIPTION_STATUS_FAILURE:
        draft.isCheckingSubscription = false
        break

      case SUBSCRIBE_USER:
        draft.isSubscribing = true
        break
      case SUBSCRIBE_USER_SUCCESS:
        draft.isSubscribing = false
        draft.subscribeData = action.payload
        break
      case SUBSCRIBE_USER_FAILURE:
        draft.isSubscribing = false
        break

      case UNSUBSCRIBE_USER:
        draft.isSubscribing = true
        break
      case UNSUBSCRIBE_USER_SUCCESS:
        draft.isSubscribing = false
        break
      case UNSUBSCRIBE_USER_FAILURE:
        draft.isSubscribing = false

        break

      default:
        return state
    }
  })
export default SubscribeReducer
