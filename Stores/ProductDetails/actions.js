import * as types from './constants'

export const getProductDetailsRequest = (payload) => ({
  type: types.GET_PRODUCT_DETAILS_REQUEST,
  payload,
})

export const getProductDetailsSuccess = (payload) => ({
  type: types.GET_PRODUCT_DETAILS_SUCCESS,
  payload,
})

export const getProductDetailsFailure = (payload) => ({
  type: types.GET_PRODUCT_DETAILS_FAILURE,
  payload,
})


//
export const getProductQARequest = (payload) => ({
  type: types.GET_PRODUCT_QA_REQUEST,
  payload,
})

export const getProductQASuccess = (payload) => ({
  type: types.GET_PRODUCT_QA_SUCCESS,
  payload,
})

export const getProductQAFailure = (payload) => ({
  type: types.GET_PRODUCT_QA_FAILURE,
  payload,
})

export const resetProductQA = (payload) => ({
  type: types.RESET_PRODUCT_QA,
  payload,
})

//PRODUCT OFFERING
export const getProductOfferingRequest = (payload) => {
  return {
    type: types.GET_PRODUCT_OFFERING_REQUEST,
    payload,
  }
}

export const getProductOfferingSuccess = (payload) => ({
  type: types.GET_PRODUCT_OFFERING_SUCCESS,
  payload,
})

export const getProductOfferingFailure = (payload) => ({
  type: types.GET_PRODUCT_OFFERING_FAILURE,
  payload,
})

//PACKAGE BUILDER
export const getPackageBuilderRequest = (payload) => {
  return {
    type: types.GET_PACKAGE_BUILDER_REQUEST,
    payload,
  }
}

export const getPackageBuilderSuccess = (payload) => ({
  type: types.GET_PACKAGE_BUILDER_SUCCESS,
  payload,
})

export const getPackageBuilderFailure = (payload) => ({
  type: types.GET_PACKAGE_BUILDER_FAILURE,
  payload,
})

//PRODUCT OFFER DETAIL
export const getProductOfferDetailRequest = (payload) => {
  return {
    type: types.GET_PRODUCT_OFFER_DETAIL_REQUEST,
    payload,
  }
}

export const getProductOfferDetailSuccess = (payload) => ({
  type: types.GET_PRODUCT_OFFER_DETAIL_SUCCESS,
  payload,
})

export const getProductOfferDetailFailure = (payload) => ({
  type: types.GET_PRODUCT_OFFER_DETAIL_FAILURE,
  payload,
})
