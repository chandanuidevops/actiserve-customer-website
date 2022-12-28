import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,

  GET_SERVICE_RESULT,
  GET_SERVICE_RESULT_SUCCESS,
  GET_SERVICE_RESULT_FAILURE,

  GET_POPULAR_SERVICES,
  GET_POPULAR_SERVICES_SUCCESS,
  GET_POPULAR_SERVICES_FAILURE,

} from "./constants";

export const getPopularServices = (payload) => {
  return {
    type: GET_POPULAR_SERVICES,
    payload,
  };
};

export const getPopularServicesSuccess = (payload) => {
  return {
    type: GET_POPULAR_SERVICES_SUCCESS,
    payload,
  };
};

export const getPopularServicesFailure = (payload) => {
  return {
    type: GET_POPULAR_SERVICES_FAILURE,
    payload,
  };
};

export const getServiceResult = (payload) => {
  return {
    type: GET_SERVICE_RESULT,
    payload,
  };
};

export const getServiceResultSuccess = (payload) => {
  return {
    type: GET_SERVICE_RESULT_SUCCESS,
    payload,
  };
};

export const getServiceResultFailure = (payload) => {
  return {
    type: GET_SERVICE_RESULT_FAILURE,
    payload,
  };
};

export const getProductList = (payload) => {
  return {
    type: GET_PRODUCT_LIST,
    payload,
  };
};

export const getProductListSuccess = (payload) => {
  return {
    type: GET_PRODUCT_LIST_SUCCESS,
    payload,
  };
};

export const getProductListFailure = (payload) => {
  return {
    type: GET_PRODUCT_LIST_FAILURE,
    payload,
  };
};