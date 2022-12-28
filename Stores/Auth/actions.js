import {
  CONTRACTOR_REGISTER_SAGA,
  CONTRACTOR_CHECK,
  CONTRACTOR_CHECK_FAILURE,
  CONTRACTOR_CHECK_SUCCESS,
  CONTRACTOR_LOGIN,
  CONTRACTOR_LOGIN_FAILURE,
  CONTRACTOR_LOGIN_SUCCESS,
  CONTRACTOR_LOGOUT,
  CONTRACTOR_LOGOUT_FAILURE,
  CONTRACTOR_LOGOUT_SUCCESS,
  CONTRACTOR_SENT_RESET_PASSWORD,
  CONTRACTOR_SENT_RESET_PASSWORD_PENDING,
  CONTRACTOR_SENT_RESET_PASSWORD_SUCCESS,
  CONTRACTOR_SENT_RESET_PASSWORD_FAILURE,
  ACCOUNT_ACTIVATE,
  ACCOUNT_ACTIVATE_SUCCESS,
  ACCOUNT_ACTIVATE_FAILURE,
  // UPDATE PASSWORD
  UPDATE_PASSWORD,
  UDPATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  //TERMINATE
  ACTIVATE_USER,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE,
  // CUSTOMER SIGN UP
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
} from './constants'
const actions = {
  registerSaga: () => {
    return {
      type: CONTRACTOR_REGISTER_SAGA,
    }
  },
  login: (credentials, history) => {
    return {
      type: CONTRACTOR_LOGIN,
      credentials,
      history,
    }
  },
  loginSuccess: (payload) => {
    return {
      type: CONTRACTOR_LOGIN_SUCCESS,
      payload,
    }
  },
  loginFailure: (error) => {
    return {
      type: CONTRACTOR_LOGIN_FAILURE,
      error,
    }
  },
  check: (token, history) => {
    return {
      type: CONTRACTOR_CHECK,
      token,
      history,
    }
  },

  checkSuccess: (payload) => {
    return {
      type: CONTRACTOR_CHECK_SUCCESS,
      payload,
    }
  },
  checkFailure: (error) => {
    return {
      type: CONTRACTOR_CHECK_FAILURE,
      error,
    }
  },
  logout: (history) => {
    return {
      type: CONTRACTOR_LOGOUT,
      history,
    }
  },
  logoutSuccess: (payload) => {
    return {
      type: CONTRACTOR_LOGOUT_SUCCESS,
      payload,
    }
  },
  logoutFailure: (error) => {
    return {
      type: CONTRACTOR_LOGOUT_FAILURE,
      error,
    }
  },
  sentResetLink: (payload) => {
    return {
      type: CONTRACTOR_SENT_RESET_PASSWORD,
      payload,
    }
  },
  sentResetLinkPending: (payload) => {
    return {
      type: CONTRACTOR_SENT_RESET_PASSWORD_PENDING,
      payload,
    }
  },
  sentResetLinkSucces: (payload) => {
    return {
      type: CONTRACTOR_SENT_RESET_PASSWORD_SUCCESS,
      payload,
    }
  },
  sentResetLinkFailer: (payload) => {
    return {
      type: CONTRACTOR_SENT_RESET_PASSWORD_FAILURE,
      payload,
    }
  },

  activateAccount: (payload) => {
    return {
      type: ACCOUNT_ACTIVATE,
      payload,
    }
  },
  activateAccountSuccess: (payload) => {
    return {
      type: ACCOUNT_ACTIVATE_SUCCESS,
      payload,
    }
  },
  activateAccountFailure: (payload) => {
    return {
      type: ACCOUNT_ACTIVATE_FAILURE,
      payload,
    }
  },
  updatePassword: (payload) => {
    return {
      type: UPDATE_PASSWORD,
      payload,
    }
  },
  updatePasswordSuccess: (payload) => {
    return {
      type: UDPATE_PASSWORD_SUCCESS,
    }
  },
  updatePasswordFailure: (payload) => {
    return {
      type: UPDATE_PASSWORD_FAILURE,
      payload,
    }
  },
  activateUser: (payload) => {
    return {
      type: ACTIVATE_USER,
      payload,
    }
  },
  activateUserSuccess: (payload) => {
    return {
      type: ACTIVATE_USER_SUCCESS,
      payload,
    }
  },
  activateUserFailure: (payload) => {
    return {
      type: ACTIVATE_USER_FAILURE,
      payload,
    }
  },
  // CUSTOMER SIGNUP
  CustomerSignUp: (credentials, history) => {
    return {
      type: CUSTOMER_SIGNUP,
      credentials,
      history,
    }
  },
  CustomerSignUpSuccess: (payload) => {
    return {
      type: CUSTOMER_SIGNUP_SUCCESS,
      payload,
    }
  },
  CustomerSignUpFailure: (error) => {
    return {
      type: CUSTOMER_SIGNUP_FAILURE,
      error,
    }
  },
  // CUSTOMER LOGIN
  CustomerLogin: (credentials, history) => {
    return {
      type: CUSTOMER_LOGIN,
      credentials,
      history,
    }
  },
  CustomerLoginSuccess: (payload) => {
    return {
      type: CUSTOMER_LOGIN_SUCCESS,
      payload,
    }
  },
  CustomerLoginFailure: (error) => {
    return {
      type: CUSTOMER_LOGIN_FAILURE,
      error,
    }
  },
  // FORGOT LOGIN
  CustomerForgotPassword: (credentials, history) => {
    return {
      type: CUSTOMER_FORGOT_PASSWORD,
      credentials,
      history,
    }
  },
  CustomerForgotPasswordSuccess: (payload) => {
    return {
      type: CUSTOMER_FORGOT_PASSWORD_SUCCESS,
      payload,
    }
  },
  CustomerForgotPasswordFailure: (error) => {
    return {
      type: CUSTOMER_FORGOT_PASSWORD_FAILURE,
      error,
    }
  },
  // RESET LOGIN
  CustomerResetPassword: (credentials, history) => {
    return {
      type: CUSTOMER_RESET_PASSWORD,
      credentials,
      history,
    }
  },
  CustomerResetPasswordSuccess: (payload) => {
    return {
      type: CUSTOMER_RESET_PASSWORD_SUCCESS,
      payload,
    }
  },
  CustomerResetPasswordFailure: (error) => {
    return {
      type: CUSTOMER_RESET_PASSWORD_FAILURE,
      error,
    }
  },

  // update profile
  updateUserProfile: (payload) => {
    console.log('actions>>>>>>', payload)
    return {
      type: UPDATE_CUSTOMER_USER_PROFILE,
      payload,
    }
  },
  updateUserProfilePending: (payload) => {
    return {
      type: UPDATE_CUSTOMER_USER_PROFILE_PENDING,
      payload,
    }
  },
  updateUserProfileSuccess: (payload) => {
    return {
      type: UPDATE_CUSTOMER_USER_PROFILE_SUCCESS,
      payload,
    }
  },
  updateUserProfileFailure: (payload) => {
    return {
      type: UPDATE_CUSTOMER_USER_PROFILE_FAILURE,
      payload,
    }
  },
  changePassword: (payload) => {
    return {
      type: CHANGE_PASSWORD,
      payload,
    }
  },
  changePasswordSuccess: (payload) => {
    return {
      type: CHANGE_PASSWORD_SUCCESS,
    }
  },
  changePasswordFailure: (payload) => {
    return {
      type: CHANGE_PASSWORD_FAILURE,
      payload,
    }
  },

  // Verify Email and set password
  emailVerifyPassword: (payload, history) => {
    return {
      type: EMAIL_VERIFY_PASSWORD,
      payload,
      history,
    }
  },
  emailVerifyPasswordSuccess: (payload) => {
    return {
      type: EMAIL_VERIFY_PASSWORD_SUCCESS,
      payload,
    }
  },
  emailVerifyPasswordFailure: (error) => {
    return {
      type: EMAIL_VERIFY_PASSWORD_FAILURE,
      error,
    }
  },

  // Verify Email and set password
  getPasswordSet: (payload, history) => {
    return {
      type: GET_PASSWORD_SET,
      payload,
      history,
    }
  },
  getPasswordSetSuccess: (payload) => {
    return {
      type: GET_PASSWORD_SET_SUCCESS,
      payload,
    }
  },
  getPasswordSetFailure: (error) => {
    return {
      type: GET_PASSWORD_SET_FAILURE,
      error,
    }
  },
  // Verify Email and set password
  // verifyEmail: (payload) => {
  //   return {
  //     type: GET_PASSWORD_SET,
  //     payload,

  //   };
  // },
  // verifyEmailSuccess: (payload) => {
  //   return {
  //     type: GET_PASSWORD_SET_SUCCESS,
  //     payload,
  //   };
  // },
  // getPasswordSetFailure: (error) => {
  //   return {
  //     type: GET_PASSWORD_SET_FAILURE,
  //     error,
  //   };
  // },
  // Verify Email and set password
  verifyLink: (payload) => {
    return {
      type: VERIFY_LINK,
      payload,
    }
  },
  verifyLinkSuccess: (payload) => {
    return {
      type: VERIFY_LINK_SUCCESS,
      payload,
    }
  },
  verifyLinkFailure: (error) => {
    return {
      type: VERIFY_LINK_FAILURE,
      error,
    }
  },
  // Verify Email and set password
  verifyLinkData: (payload) => {
    return {
      type: VERIFY_LINK_DATA,
      payload,
    }
  },
  verifyLinkDataSuccess: (payload) => {
    return {
      type: VERIFY_LINK_DATA_SUCCESS,
      payload,
    }
  },
  verifyLinkDataFailure: (error) => {
    return {
      type: VERIFY_LINK_DATA_FAILURE,
      error,
    }
  },
  // Verify Email and set password
  getTraderEmail: (payload) => {
    return {
      type: GET_TRADER_EMAIL,
      payload,
    }
  },
  getTraderEmailSuccess: (payload) => {
    return {
      type: GET_TRADER_EMAIL_SUCCESS,
      payload,
    }
  },
  getTraderEmailFailure: (error) => {
    return {
      type: GET_TRADER_EMAIL_FAILURE,
      error,
    }
  },
}
export default actions
