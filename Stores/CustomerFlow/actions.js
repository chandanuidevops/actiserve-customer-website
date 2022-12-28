import * as types from './constants'

export const validateCustomer = (payload) => ({
  type: types.VALIDATE_CUSTOMER,
  payload,
})

export const validateCustomerSuccess = (payload) => ({
  type: types.VALIDATE_CUSTOMER_SUCCESS,
  payload,
})

export const validateCustomerFailure = (payload) => ({
  type: types.VALIDATE_CUSTOMER_FAILURE,
  payload,
})

export const validateCustomerReset = (payload) => ({
  type: types.VALIDATE_CUSTOMER_RESET,
  payload,
})

export const setCustomerVerified = (payload) => ({
  type: types.SET_CUSTOMER_VERIFIED,
  payload,
})

export const resetCustomerVerified = (payload) => ({
  type: types.RESET_CUSTOMER_VERIFIED,
  payload,
})

// GET CUSTOMER ADDRESS LISTING
export const getCustomerAddress = (payload) => ({
  type: types.GET_CUSTOMER_ADDRESS,
  payload,
})

export const getCustomerAddressSuccess = (payload) => ({
  type: types.GET_CUSTOMER_ADDRESS_SUCCESS,
  payload,
})

export const getCustomerAddressFailure = (payload) => ({
  type: types.GET_CUSTOMER_ADDRESS_FAILURE,
  payload,
})

// ADD CUSTOMER ADDRESS LISTING
export const addCustomerAddress = (payload) => ({
  type: types.ADD_CUSTOMER_ADDRESS,
  payload,
})

export const addCustomerAddressSuccess = (payload) => ({
  type: types.ADD_CUSTOMER_ADDRESS_SUCCESS,
  payload,
})

export const addCustomerAddressFailure = (payload) => ({
  type: types.ADD_CUSTOMER_ADDRESS_FAILURE,
  payload,
})

// EDIT CUSTOMER ADDRESS LISTING
export const editCustomerAddress = (payload) => ({
  type: types.EDIT_CUSTOMER_ADDRESS,
  payload,
})

export const editCustomerAddressSuccess = (payload) => ({
  type: types.EDIT_CUSTOMER_ADDRESS_SUCCESS,
  payload,
})

export const editCustomerAddressFailure = (payload) => ({
  type: types.EDIT_CUSTOMER_ADDRESS_FAILURE,
  payload,
})

// EDIT CUSTOMER ADDRESS LISTING
export const editCustomer = (payload) => ({
  type: types.EDIT_CUSTOMER,
  payload,
})

export const editCustomerSuccess = (payload) => ({
  type: types.EDIT_CUSTOMER_SUCCESS,
  payload,
})

export const editCustomerFailure = (payload) => ({
  type: types.EDIT_CUSTOMER_FAILURE,
  payload,
})

// VALIDATE POSTCODE
export const validatePostcode = (payload) => ({
  type: types.VALIDATE_POSTCODE,
  payload,
})

export const validatePostcodeSuccess = (payload) => ({
  type: types.VALIDATE_POSTCODE_SUCCESS,
  payload,
})

export const validatePostcodeFailure = (payload) => ({
  type: types.VALIDATE_POSTCODE_FAILURE,
  payload,
})

// RESEND VERIFY EMAIL
export const resendVerifyEmail = (payload) => ({
  type: types.RESEND_VERIFY_MAIL,
  payload,
})

export const resendVerifyEmailSuccess = (payload) => ({
  type: types.RESEND_VERIFY_MAIL_SUCCESS,
  payload,
})

export const resendVerifyEmailFailure = (payload) => ({
  type: types.RESEND_VERIFY_MAIL_FAILURE,
  payload,
})
