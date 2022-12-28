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

import produce from "immer";
const initialState = {
  isProductLoading: false,
  productList: [],
  isServiceLoading: false,
  serviceList: [],
  isPopularServiceLoading: false,
  popularServiceList: [],
};

const ServicesReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_POPULAR_SERVICES:
        draft.isPopularServiceLoading = true;
        break;
      case GET_POPULAR_SERVICES_SUCCESS:
        draft.isPopularServiceLoading = false;
        draft.popularServiceList = action.payload;
        break;
      case GET_POPULAR_SERVICES_FAILURE:
        draft.isPopularServiceLoading = false;
        draft.popularServiceList = [];
        break;

      case GET_SERVICE_RESULT:
        draft.isServiceLoading = true;
        break;
      case GET_SERVICE_RESULT_SUCCESS:
        draft.isServiceLoading = false;
        draft.serviceList = action.payload;
        break;
      case GET_SERVICE_RESULT_FAILURE:
        draft.isServiceLoading = false;
        draft.serviceList = [];
        break;

      case GET_PRODUCT_LIST:
        draft.isProductLoading = true;
        break;
      case GET_PRODUCT_LIST_SUCCESS:
        draft.isProductLoading = false;
        draft.productList = action.payload;
        break;
      case GET_PRODUCT_LIST_FAILURE:
        draft.isProductLoading = false;
        draft.productList = [];
        break;
      default:
        return state;
    }
  });
};
export default ServicesReducer;
