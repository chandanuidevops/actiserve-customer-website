import * as types from "./constants";

export const getCategoryDetailsRequest = (payload) => ({
  type: types.GET_CATEGORY_DETAILS_REQUEST,
  payload,
});

export const getCategoryDetailsSuccess = (payload) => ({
  type: types.GET_CATEGORY_DETAILS_SUCCESS,
  payload,
});

export const getCategoryDetailsFailure = (payload) => ({
  type: types.GET_CATEGORY_DETAILS_FAILURE,
  payload,
});

export const searchRequest = (payload) => ({
  type: types.SEARCH_REQUEST,
  payload,
});

export const searchRequestSuccess = (payload) => ({
  type: types.SEARCH_REQUEST_SUCCESS,
  payload,
});

export const searchRequestFailure = (payload) => ({
  type: types.SEARCH_REQUEST_FAILURE,
  payload,
});

export const customerRequest = (payload) => ({
  type: types.CUSTOMER_REQUEST,
  payload,
});

export const customerRequestSuccess = (payload) => ({
  type: types.CUSTOMER_REQUEST_SUCCESS,
  payload,
});

export const customerRequestFailure = (payload) => ({
  type: types.CUSTOMER_REQUEST_FAILURE,
  payload,
});
