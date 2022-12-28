import * as types from "./constants";

export const getCardsRequest = (payload) => ({
  type: types.GET_CARDS_REQUEST,
  payload,
});

export const getCardsSuccess = (payload) => ({
  type: types.GET_CARDS_SUCCESS,
  payload,
});

export const getCardsFailure = (payload) => ({
  type: types.GET_CARDS_FAILURE,
  payload,
});


export const editOrder = (payload) => ({
  type: types.EDIT_ORDER,
  payload,
});

export const editOrderSuccess = (payload) => ({
  type: types.EDIT_ORDER_SUCCESS,
  payload,
});

export const editOrderFailure = (payload) => ({
  type: types.EDIT_ORDER_FAILURE,
  payload,
});

export const attachPaymentMethod = (payload) => ({
  type: types.ATTACH_PAYMENT_METHOD,
  payload,
});
export const attachPaymentMethodSuccess = (payload) => ({
  type: types.ATTACH_PAYMENT_METHOD_SUCCESS,
  payload,
});
export const attachPaymentMethodFailure = (payload) => ({
  type: types.ATTACH_PAYMENT_METHOD_FAILURE,
  payload,
});


export const getCustomerCards = (payload) => ({
  type: types.GET_CUSTOMER_CARDS,
  payload,
});
export const getCustomerCardsSuccess = (payload) => ({
  type: types.GET_CUSTOMER_CARDS_SUCCESS,
  payload,
});
export const getCustomerCardsFailure = (payload) => ({
  type: types.GET_CUSTOMER_CARDS_FAILURE,
  payload,
});

export const addCustomerCards = (payload) => ({
  type: types.ADD_CUSTOMER_CARD,
  payload,
});
export const addCustomerCardsSuccess = (payload) => ({
  type: types.ADD_CUSTOMER_CARD_SUCCESS,
  payload,
});
export const addCustomerCardsFailure = (payload) => ({
  type: types.ADD_CUSTOMER_CARD_FAILURE,
  payload,
});

export const deleteCustomerCards = (payload) => ({
  type: types.DELETE_CUSTOMER_CARD,
  payload,
});
export const deleteCustomerCardsSuccess = (payload) => ({
  type: types.DELETE_CUSTOMER_CARD_SUCCESS,
  payload,
});
export const deleteCustomerCardsFailure = (payload) => ({
  type: types.DELETE_CUSTOMER_CARD_FAILURE,
  payload,
});