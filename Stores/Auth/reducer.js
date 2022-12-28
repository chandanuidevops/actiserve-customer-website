import produce from 'immer'
import {
  CONTRACTOR_CHECK,
  CONTRACTOR_CHECK_FAILURE,
  CONTRACTOR_CHECK_SUCCESS,
  CONTRACTOR_LOGIN,
  CONTRACTOR_LOGIN_FAILURE,
  CONTRACTOR_LOGIN_SUCCESS,
  CONTRACTOR_LOGOUT,
  CONTRACTOR_LOGOUT_FAILURE,
  CONTRACTOR_LOGOUT_SUCCESS,
  CONTRACTOR_REGISTER_SAGA,

  // password
  CONTRACTOR_SENT_RESET_PASSWORD_SUCCESS,
  CONTRACTOR_SENT_RESET_PASSWORD_FAILURE,
  CONTRACTOR_SENT_RESET_PASSWORD_PENDING,
  ACTIVATE_USER,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE,
  // CUSTOMER SIGNUP
  CUSTOMER_SIGNUP,
  CUSTOMER_SIGNUP_SUCCESS,
  CUSTOMER_SIGNUP_FAILURE,
  // CUSTOMER LOGIN
  CUSTOMER_LOGIN,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGIN_FAILURE,
  // CUSTOMER FORGOT PASSWORD
  CUSTOMER_FORGOT_PASSWORD,
  CUSTOMER_FORGOT_PASSWORD_SUCCESS,
  CUSTOMER_FORGOT_PASSWORD_FAILURE,
  // CUSTOMER RESET PASSWORD
  CUSTOMER_RESET_PASSWORD,
  CUSTOMER_RESET_PASSWORD_SUCCESS,
  CUSTOMER_RESET_PASSWORD_FAILURE,
  UPDATE_CUSTOMER_USER_PROFILE,
  UPDATE_CUSTOMER_USER_PROFILE_PENDING,
  UPDATE_CUSTOMER_USER_PROFILE_SUCCESS,
  UPDATE_CUSTOMER_USER_PROFILE_FAILURE,
  //
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  //
  EMAIL_VERIFY_PASSWORD,
  EMAIL_VERIFY_PASSWORD_SUCCESS,
  EMAIL_VERIFY_PASSWORD_FAILURE,
  GET_PASSWORD_SET,
  GET_PASSWORD_SET_SUCCESS,
  GET_PASSWORD_SET_FAILURE,
  //
  VERIFY_LINK,
  VERIFY_LINK_SUCCESS,
  VERIFY_LINK_FAILURE,
  //
  VERIFY_LINK_DATA,
  VERIFY_LINK_DATA_SUCCESS,
  VERIFY_LINK_DATA_FAILURE,
  //
  GET_TRADER_EMAIL,
  GET_TRADER_EMAIL_SUCCESS,
  GET_TRADER_EMAIL_FAILURE,
  UPDATE_PASSWORD,
  UDPATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  RESET_UPDATE_PASSWORD,
} from './constants'

export const initialState = {
  isSagaRegistered: false,
  isLoggingIn: false,
  isAuthenticating: false,
  isLoggingOut: false,
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  permissions: ['NO ACCESS', 'READ', 'WRITE', 'ADMIN'],
  isResetPassword: false,
  activeUserData: {},
  isActivatingUser: false,
  isCustomerLoggginIn: false,
  isSigningUp: false,
  isForgotPasswordSubmit: false,
  updateProfileError: null,
  isUpdatingProfileLoading: false,
  updateUserProfile: null,
  isChangePasswordLoading: false,
  changePasswordError: null,
  isVerifying: false,
  isFetchingPasswordSet: false,
  passwordSet: {},
  //
  isVerifyingLink: false,
  isResetLinkValid: false,
  //
  isVerifyingLinkData: false,
  isLinkDataVerified: null,
  //
  isFetchingTraderEmail: false,
  isTraderFetchSuccess: false,
  //
  isResettingPassword: false,
  isResetPasswordSuccess: false,
  updatingPasswordData: {},
  isUpdatingPassword: false,
  isUpdateSuccess: false,
  canUpdatePassword:true,
}

/* eslint-disable default-case, no-param-reassign */
const AuthReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONTRACTOR_REGISTER_SAGA:
        draft.isSagaRegistered = true
        break
      case CONTRACTOR_LOGIN:
        draft.isLoggingIn = true
        draft.error = null
        break
      case CONTRACTOR_LOGIN_SUCCESS:
        draft.isAuthenticated = true
        draft.isLoggingIn = false
        draft.user = action.payload.user
        draft.token = action.payload.token
        draft.error = null
        break
      case CONTRACTOR_LOGIN_FAILURE:
        draft.isLoggingIn = false
        draft.error = action.error
        break
      case CONTRACTOR_CHECK:
        draft.isAuthenticating = true
        break
      case CONTRACTOR_CHECK_SUCCESS:
        draft.isAuthenticated = true
        draft.isAuthenticating = false
        draft.user = action.payload.user
        draft.token = action.payload.token
        break
      case CONTRACTOR_CHECK_FAILURE:
        return initialState
      case CONTRACTOR_LOGOUT:
        draft.isLoggingOut = true
        draft.error = null
        break
      case CONTRACTOR_LOGOUT_SUCCESS:
        draft.isAuthenticated = false
        draft.user = null
        draft.token = null
        draft.isSagaRegistered = false
        draft.isLoggingIn = false
        draft.isAuthenticating = false
        draft.isLoggingOut = false
        draft.error = null
        draft.permissions = ['NO ACCESS', 'READ', 'WRITE', 'ADMIN']
        draft.isResetPassword = false
        break
      case CONTRACTOR_LOGOUT_FAILURE:
        draft.isLoggingOut = false
        draft.error = action.error
        break

      case CONTRACTOR_SENT_RESET_PASSWORD_SUCCESS:
        draft.isResetPassword = false
        break
      case CONTRACTOR_SENT_RESET_PASSWORD_FAILURE:
        draft.isResetPassword = false
        break
      case CONTRACTOR_SENT_RESET_PASSWORD_PENDING:
        draft.isResetPassword = true
        break

      case ACTIVATE_USER:
        draft.isActivatingUser = true
        draft.activeUserData = action.payload
        break
      case ACTIVATE_USER_SUCCESS:
        draft.isActivatingUser = false
        draft.activeUserData = {}
        draft.isUserActive = true
        break
      case ACTIVATE_USER_FAILURE:
        draft.isActivatingUser = false
        draft.isUserActive = false
        break

      // CUSTOMER LOGIN
      case CUSTOMER_SIGNUP:
        draft.isSigningUp = true
        break
      case CUSTOMER_SIGNUP_SUCCESS:
        draft.isSigningUp = false
        break
      case CUSTOMER_SIGNUP_FAILURE:
        draft.isSigningUp = false
        break
      // CUSTOMER LOGIN
      case CUSTOMER_LOGIN:
        draft.isCustomerLoggginIn = true
        break
      case CUSTOMER_LOGIN_SUCCESS:
        draft.isCustomerLoggginIn = false
        break
      case CUSTOMER_LOGIN_FAILURE:
        draft.isCustomerLoggginIn = false
        break
      // CUSTOMER forgot password
      case CUSTOMER_FORGOT_PASSWORD:
        draft.isForgotPasswordSubmit = true
        break
      case CUSTOMER_FORGOT_PASSWORD_SUCCESS:
        draft.isForgotPasswordSubmit = false
        break
      case CUSTOMER_FORGOT_PASSWORD_FAILURE:
        draft.isForgotPasswordSubmit = false
        break

      case UPDATE_CUSTOMER_USER_PROFILE:
        break

      case UPDATE_CUSTOMER_USER_PROFILE_PENDING:
        draft.isUpdatingProfileLoading = true
        draft.updateUserProfile = null
        draft.updateProfileError = null
        break
      case UPDATE_CUSTOMER_USER_PROFILE_SUCCESS:
        draft.isUpdatingProfileLoading = false
        draft.updateUserProfile = action.payload.data
        draft.updateProfileError = null
        break
      case UPDATE_CUSTOMER_USER_PROFILE_FAILURE:
        draft.updateProfileError = action.payload.error
        draft.updateUserProfile = null
        draft.isUpdatingProfileLoading = false
        break
      case CHANGE_PASSWORD:
        draft.isChangePasswordLoading = true
        break
      case CHANGE_PASSWORD_SUCCESS:
        draft.isChangePasswordLoading = false
        break
      case CHANGE_PASSWORD_FAILURE:
        draft.isChangePasswordLoading = false
        break
      case EMAIL_VERIFY_PASSWORD:
        draft.isVerifying = true
        break
      case EMAIL_VERIFY_PASSWORD_SUCCESS:
        draft.isVerifying = false
        break
      case EMAIL_VERIFY_PASSWORD_FAILURE:
        draft.isVerifying = false
        break
      case GET_PASSWORD_SET:
        draft.isFetchingPasswordSet = true
        break
      case GET_PASSWORD_SET_SUCCESS:
        draft.isFetchingPasswordSet = false
        draft.passwordSet = action.payload.data
        break
      case GET_PASSWORD_SET_FAILURE:
        draft.isFetchingPasswordSet = false
        draft.passwordSet = action?.error?.data
        break
      case VERIFY_LINK:
        draft.isVerifyingLink = true
        draft.isResetLinkValid = false
        break
      case VERIFY_LINK_SUCCESS:
        draft.isVerifyingLink = false
        draft.isResetLinkValid = action.payload
        break
      case VERIFY_LINK_FAILURE:
        draft.isVerifyingLink = false
        break
      case VERIFY_LINK_DATA:
        draft.isVerifyingLinkData = true
        draft.isLinkDataVerified = null
        break
      case VERIFY_LINK_DATA_SUCCESS:
        draft.isVerifyingLinkData = false
        draft.isLinkDataVerified = 200
        break
      case VERIFY_LINK_DATA_FAILURE:
        draft.isVerifyingLinkData = false
        draft.isLinkDataVerified = 404
        break
      case GET_TRADER_EMAIL:
        draft.isFetchingTraderEmail = false
        draft.isTraderFetchSuccess = false
        break
      case GET_TRADER_EMAIL_SUCCESS:
        draft.isFetchingTraderEmail = false
        draft.isTraderFetchSuccess = true
        break

      case CUSTOMER_RESET_PASSWORD:
        draft.isResettingPassword = true
        draft.isResetPasswordSuccess = false
        break

      case CUSTOMER_RESET_PASSWORD_SUCCESS:
        draft.isResettingPassword = false
        draft.isResetPasswordSuccess = true
        break
      case CUSTOMER_RESET_PASSWORD_FAILURE:
        draft.isResettingPassword = false
        draft.isResetPasswordSuccess = false
        break
        case UPDATE_PASSWORD:
        draft.isUpdatingPassword = true
        draft.isUpdateSuccess = false
        draft.updatingPasswordData = action.payload
        break
      case UDPATE_PASSWORD_SUCCESS:
        draft.isUpdatingPassword = false
        draft.isUpdateSuccess = true
        draft.updatingPasswordData = null
        draft.canUpdatePassword=false
        break
      case UPDATE_PASSWORD_FAILURE:
        draft.isUpdatingPassword = false,
        draft.canUpdatePassword=true
        break
      case RESET_UPDATE_PASSWORD:
        draft.isUpdateSuccess = false
        break
      default:
        return state
    }
  })

export default AuthReducer
