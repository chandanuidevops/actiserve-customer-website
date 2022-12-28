import produce from 'immer'
import {
  //FETCH LIST
  VALIDATE_CUSTOMER,
  VALIDATE_CUSTOMER_SUCCESS,
  VALIDATE_CUSTOMER_FAILURE,
  VALIDATE_CUSTOMER_RESET,
  SET_CUSTOMER_VERIFIED,
  RESET_CUSTOMER_VERIFIED,
  //
  GET_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESS_SUCCESS,
  GET_CUSTOMER_ADDRESS_FAILURE,
  //
  ADD_CUSTOMER_ADDRESS,
  ADD_CUSTOMER_ADDRESS_SUCCESS,
  ADD_CUSTOMER_ADDRESS_FAILURE,
  //
  EDIT_CUSTOMER_ADDRESS,
  EDIT_CUSTOMER_ADDRESS_SUCCESS,
  EDIT_CUSTOMER_ADDRESS_FAILURE,
  //
  VALIDATE_POSTCODE,
  VALIDATE_POSTCODE_FAILURE,
  VALIDATE_POSTCODE_SUCCESS,
  //
  RESEND_VERIFY_MAIL,
  RESEND_VERIFY_MAIL_SUCCESS,
  RESEND_VERIFY_MAIL_FAILURE,
} from './constants'

export const initialState = {
  //Listing
  isValidatingCustomer: false,
  validateCustomer: [],
  isEmailVerified: {},
  //Listing
  isFetchingCustomerAddress: false,
  customerAddress: [],
  //
  isValidatingPostcode: false,
  isPostcodeValid: '',
  //
  isAddingAddress: false,
  isAddingSuccess: false,
  isEditingSuccess: false,
  isSubmitting: false,
  isSubmittedSuccess: false,
  //
  isSendingEmail: false,
}

const CustomerFlowReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case VALIDATE_CUSTOMER:
        draft.isValidatingCustomer = true
        break
      case VALIDATE_CUSTOMER_SUCCESS:
        draft.isValidatingCustomer = false
        draft.validateCustomer = action.payload
        break
      case VALIDATE_CUSTOMER_FAILURE:
        draft.isValidatingCustomer = false
        draft.validateCustomer = action.payload
        break
      case VALIDATE_CUSTOMER_RESET:
        draft.isValidatingCustomer = false
        draft.validateCustomer = []
        break
      case SET_CUSTOMER_VERIFIED:
        draft.isEmailVerified = action.payload
        break
      case RESET_CUSTOMER_VERIFIED:
        draft.isEmailVerified = {}
        break
      // address
      case GET_CUSTOMER_ADDRESS:
        draft.isFetchingCustomerAddress = true
        draft.isEditingSuccess = false
        break
      case GET_CUSTOMER_ADDRESS_SUCCESS:
        draft.isFetchingCustomerAddress = false
        draft.customerAddress = action.payload
        break
      case GET_CUSTOMER_ADDRESS_FAILURE:
        draft.isFetchingCustomerAddress = false
        break
      case VALIDATE_POSTCODE:
        draft.isValidatingPostcode = true
        break
      case VALIDATE_POSTCODE_SUCCESS:
        draft.isValidatingPostcode = false
        draft.isPostcodeValid = action.payload
        break
      case VALIDATE_POSTCODE_FAILURE:
        draft.isValidatingPostcode = false
        draft.isPostcodeValid = action.payload
        break
      case ADD_CUSTOMER_ADDRESS:
        draft.isSubmitting = true
        draft.isSubmittedSuccess = false
        break
      case ADD_CUSTOMER_ADDRESS_SUCCESS:
        draft.isSubmitting = false
        draft.isSubmittedSuccess = true
        break
      case ADD_CUSTOMER_ADDRESS_FAILURE:
        draft.isSubmitting = false
        draft.isSubmittedSuccess = false
        break
      case EDIT_CUSTOMER_ADDRESS:
        draft.isSubmitting = true
        draft.isSubmittedSuccess = false
        break
      case EDIT_CUSTOMER_ADDRESS_SUCCESS:
        draft.isSubmitting = false
        draft.isSubmittedSuccess = true
        break
      case EDIT_CUSTOMER_ADDRESS_FAILURE:
        draft.isEditingAddress = false
        draft.isSubmittedSuccess = false
        break
      case RESEND_VERIFY_MAIL:
        draft.isSendingEmail = true
        break
      case RESEND_VERIFY_MAIL_SUCCESS:
        draft.isSendingEmail = false
        break
      case RESEND_VERIFY_MAIL_FAILURE:
        draft.isSendingEmail = false
        break
      default:
        return state
    }
  })

export default CustomerFlowReducer
