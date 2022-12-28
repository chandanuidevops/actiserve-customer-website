import * as types from './constants'

export const validateCustomer = (payload) => ({
  type: types.VALIDATE_TRADER_CUSTOMER,
  payload,
})

export const validateCustomerSuccess = (payload) => ({
  type: types.VALIDATE_TRADER_CUSTOMER_SUCCESS,
  payload,
})

export const validateCustomerFailure = (payload) => ({
  type: types.VALIDATE_TRADER_CUSTOMER_FAILURE,
  payload,
})
export const validateCustomerReset = (payload) => ({
  type: types.VALIDATE_TRADER_CUSTOMER_RESET,
  payload,
})

export const registerTrader = (payload) => ({
  type: types.REGISTER_TRADER,
  payload,
})

export const registerTraderSuccess = (payload) => ({
  type: types.REGISTER_TRADER_SUCCESS,
  payload,
})

export const registerTraderFailure = (payload) => ({
  type: types.REGISTER_TRADER_FAILURE,
  payload,
})

export const addDetails = (payload) => ({
  type: types.PERSONAL_DETAIL,
  payload,
})

export const addDetailsSuccess = (payload) => ({
  type: types.PERSONAL_DETAIL_SUCCESS,
  payload,
})

export const addDetailsFailure = (payload) => ({
  type: types.PERSONAL_DETAIL_FAILURE,
  payload,
})

export const getPostCode = (payload) => ({
  type: types.GET_POSTCODE,
  payload,
})

export const getPostCodeSuccess = (payload) => ({
  type: types.GET_POSTCODE_SUCCESS,
  payload,
})

export const getPostCodeFailure = (payload) => ({
  type: types.GET_POSTCODE_FAILURE,
  payload,
})

export const getCategories = (payload) => ({
  type: types.GET_CATEGORIES,
  payload,
})

export const getCategoriesSuccess = (payload) => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload,
})

export const getCategoriesFailure = (payload) => ({
  type: types.GET_CATEGORIES_FAILURE,
  payload,
})

export const addAreacode = (payload) => ({
  type: types.ADD_AREACODE,
  payload,
})

export const addAreacodeSuccess = (payload) => ({
  type: types.ADD_AREACODE_SUCCESS,
  payload,
})

export const addAreacodeFailure = (payload) => ({
  type: types.ADD_AREACODE_FAILURE,
  payload,
})

export const addDocument = (payload) => ({
  type: types.ADD_DOCUMENT,
  payload,
})

export const addDocumentSuccess = (payload) => ({
  type: types.ADD_DOCUMENT_SUCCESS,
  payload,
})

export const addDocumentFailure = (payload) => ({
  type: types.ADD_DOCUMENT_FAILURE,
  payload,
})

export const addSpecificDocument = (payload) => ({
  type: types.ADD_SPECIFIC_DOCUMENT,
  payload,
})

export const addSpecificDocumentSuccess = (payload) => ({
  type: types.ADD_SPECIFIC_DOCUMENT_SUCCESS,
  payload,
})

export const addSpecificDocumentFailure = (payload) => ({
  type: types.ADD_SPECIFIC_DOCUMENT_FAILURE,
  payload,
})

export const getDocumentListing = (payload) => ({
  type: types.GET_DOCUMENTLISTING,
  payload,
})

export const getDocumentListingSuccess = (payload) => ({
  type: types.GET_DOCUMENTLISTING_SUCCESS,
  payload,
})

export const getDocumentListingFailure = (payload) => ({
  type: types.GET_DOCUMENTLISTING_FAILURE,
  payload,
})

export const getInformation = (payload) => ({
  type: types.GET_PERSONAL_INFORMATION,
  payload,
})

export const getInformationSuccess = (payload) => ({
  type: types.GET_PERSONAL_INFORMATION_SUCCESS,
  payload,
})

export const getInformationFailure = (payload) => ({
  type: types.GET_PERSONAL_INFORMATION_FAILURE,
  payload,
})

export const fetchPostCode = (payload) => ({
  type: types.FETCH_POSTCODE,
  payload,
})

export const fetchPostCodeSuccess = (payload) => ({
  type: types.FETCH_POSTCODE_SUCCESS,
  payload,
})

export const fetchPostCodeFailure = (payload) => ({
  type: types.FETCH_POSTCODE_FAILURE,
  payload,
})

export const updateAreacode = (payload) => ({
  type: types.UPDATE_AREACODE,
  payload,
})

export const updateAreacodeSuccess = (payload) => ({
  type: types.UPDATE_AREACODE_SUCCESS,
  payload,
})

export const updateAreacodeFailure = (payload) => ({
  type: types.UPDATE_AREACODE_FAILURE,
  payload,
})

export const getLogin = (payload) => ({
  type: types.CHECK_LOGIN,
  payload,
})

export const getLoginSuccess = (payload) => ({
  type: types.CHECK_LOGIN_SUCCESS,
  payload,
})

export const getLoginFailure = (payload) => ({
  type: types.CHECK_LOGIN_FAILURE,
  payload,
})

export const disableAdding = (payload) => ({
  type: types.DISABLE_ADDING,
  payload,
})

export const allDocuments = (payload) => ({
  type: types.GET_ALL_DOCUMENT,
  payload,
})

export const allDocumentsSuccess = (payload) => ({
  type: types.GET_ALL_DOCUMENT_SUCCESS,
  payload,
})

export const allDocumentsFailure = (payload) => ({
  type: types.GET_ALL_DOCUMENT_FAILURE,
  payload,
})

export const saveFinishSignup = (payload) => ({
  type: types.FINISH_SIGNUP,
  payload,
})

export const saveFinishSignupSuccess = (payload) => ({
  type: types.FINISH_SIGNUP_SUCCESS,
  payload,
})

export const saveFinishSignupFailure = (payload) => ({
  type: types.FINISH_SIGNUP_FAILURE,
  payload,
})

export const getTraderEmail = (payload) => ({
  type: types.GET_TRADER_EMAIL,
  payload,
})

export const getTraderEmailSuccess = (payload) => ({
  type: types.GET_TRADER_EMAIL_SUCCESS,
  payload,
})

export const getTraderEmailFailure = (payload) => ({
  type: types.GET_TRADER_EMAIL_FAILURE,
  payload,
})

export const resetPassword = (payload) => ({
  type: types.RESET_PASSWORD,
  payload,
})

export const resetPasswordSuccess = (payload) => ({
  type: types.RESET_PASSWORD_SUCCESS,
  payload,
})

export const resetPasswordFailure = (payload) => ({
  type: types.RESET_PASSWORD_FAILURE,
  payload,
})

export const setNewPassword = (payload) => ({
  type: types.SET_PASSWORD,
  payload,
})

export const setNewPasswordSuccess = (payload) => ({
  type: types.SET_PASSWORD_SUCCESS,
  payload,
})

export const setNewPasswordFailure = (payload) => ({
  type: types.SET_PASSWORD_FAILURE,
  payload,
})
export const resetSignup = (payload) => ({
  type: types.RESET_SIGNUP,
  payload,
})








