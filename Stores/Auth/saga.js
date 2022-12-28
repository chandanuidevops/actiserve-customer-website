import {all, call, put, select, takeLatest, takeEvery} from 'redux-saga/effects'
import api from '../../utils/api'
import actions from './actions'
import {
  CONTRACTOR_CHECK,
  CONTRACTOR_LOGIN,
  CONTRACTOR_LOGOUT,
  CONTRACTOR_SENT_RESET_PASSWORD,
  ACTIVATE_USER,
  ACCOUNT_ACTIVATE,
  CUSTOMER_SIGNUP,
  CUSTOMER_LOGIN,
  CUSTOMER_FORGOT_PASSWORD,
  CUSTOMER_RESET_PASSWORD,
  UPDATE_CUSTOMER_USER_PROFILE,
  CHANGE_PASSWORD,
  EMAIL_VERIFY_PASSWORD,
  GET_PASSWORD_SET,
  VERIFY_LINK,
  UPDATE_PASSWORD,
  VERIFY_LINK_DATA,
} from './constants'
import {selectToken} from './selectors'
import {successAlert, errorAlert} from '../Alerts/actions'
const {
  checkFailure,
  checkSuccess,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  activateAccountSuccess,
  activateAccountFailure,
  updatePasswordSuccess,
  updatePasswordFailure,
  activateUserSuccess,
  activateUserFailure,
  sentResetLinkSuccess,
  sentResetLinkFailure,
  updateUserProfilePending,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  changePasswordSuccess,
  changePasswordFailure,
  emailVerifyPasswordSuccess,
  emailVerifyPasswordFailure,
  getPasswordSetSuccess,
  getPasswordSetFailure,
  verifyLinkSuccess,
  verifyLinkFailure,
  verifyLinkDataSuccess,
  verifyLinkDataFailure,
  CustomerResetPasswordSuccess,
  CustomerResetPasswordFailure,
} = actions
// eslint-disable-file camelcase
export function* checkAuth({token, history}) {
  if (token) {
    try {
      const userInfo = yield call(api(token).post, `/api/auth/customer/me`)
      yield put(checkSuccess({token, user: userInfo.data}))
      // if (history.route === "/login") {
      //   history.replace('/test')
      // }
      // history.replace(
      //   history.location.state && history.location.state.referrer
      //     ? history.location.state.referrer.pathname
      //     : "/d"
      // );
    } catch (e) {
  
      yield put(checkFailure(e))
      localStorage.clear()
      if (history.route !== '/login') history.replace('/login')
    }
  } else {
    yield put(errorAlert('Invalid token!'))
    yield put(checkFailure('Invalid token'))
  }
}

export function* checkAuthFlow() {
  yield takeLatest(CONTRACTOR_CHECK, checkAuth)
}

export function* login({credentials, history}) {
  try {
    const loginResponse = yield call(
      api(null, null, true).post,
      `/api/auth/traders-admin/login`,
      credentials,
    )
    const {access_token} = loginResponse.data.data
    if (access_token) {
      const userInfoResponse = yield call(
        api(access_token, null, true).post,
        `/api/auth/traders-admin/me`,
      )
      yield put(
        loginSuccess({token: access_token, user: userInfoResponse.data.data}),
      )
      localStorage.setItem('token', access_token)
      history.push(
        history.location.state &&
          history.location.state.referrer &&
          history.location.state.referrer.pathname !== '/login'
          ? history.location.state.referrer.pathname
          : '/d/jobs',
      )
    } else if (history.location.pathname !== '/login') history.replace('/login')
  } catch (e) {
    yield put(loginFailure(e))
   
    yield put(errorAlert(e?.response?.data?.message))
    localStorage.clear()
    if (history.location.pathname !== '/login') history.replace('/login')
  }
}
export function* loginFlow() {
  yield takeLatest(CONTRACTOR_LOGIN, login)
}

export function* logout({history}) {
  try {
    const token = yield select((state) => state?.AuthReducer?.token)
    const response = yield call(api(token).post, `/api/auth/customer/logout`)
    if (response && response.code == 200) {
      yield put(logoutSuccess())
      yield localStorage.removeItem('token')
      yield put(successAlert('Logged Out Successfully!'))
      history.replace('/')
    }
  } catch (e) {
  
    yield put(logoutFailure(e))
    // history.replace("/login");
  }
}
export function* logoutFlow() {
  yield takeLatest(CONTRACTOR_LOGOUT, logout)
}

export function* sentResetLink({payload, history}) {
  try {
    const response = yield call(
      api(null, null, true).post,
      `/api/auth/contractors/password/email`,
      payload,
    )
    const data = response.data
 
    if (data) {
      successAlert(data.message)
      sentResetLinkSuccess()
      history.push(
        history.location.state &&
          history.location.state.referrer &&
          history.location.state.referrer.pathname !== '/login'
          ? history.location.state.referrer.pathname
          : '/d',
      )
    } else if (history.location.pathname !== '/login') history.replace('/login')
  } catch (e) {
  
    yield put(sentResetLinkFailure(e))
    localStorage.clear()
    yield put(errorAlert('Error while login!'))
    localStorage.clear()
    if (history.location.pathname !== '/login') history.replace('/login')
    localStorage.clear()
  }
}
export function* activateEmailAccount({payload}) {
  try {
 
    const token = yield select(selectToken)
    const {data} = yield call(
      api(token).post,
      `/api/auth/one-time-invitation/email`,
      payload,
    )
    if (data) {
      yield put(successAlert('Verification Link Sent Successfully!'))
      yield put(activateAccountSuccess())
      yield put(activateUserSuccess())
    }
  } catch (e) {
    yield put(activateAccountFailure())
    yield put(errorAlert('Error while sending activation link!'))
  }
}
export function* activateUserAccount({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const response = yield call(
      api(token).post,
      `/api/auth/user/change-status`,
      payload,
    )
    if (response) {
   
      yield put(successAlert(response.message))
      yield put(activateUserSuccess())
    }
  } catch (e) {
    yield put(activateUserFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while activating account!'))
  }
}
export function* customerSignupFlow({credentials, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const response = yield call(
      api(null).post,
      `/api/customer-signup/add`,
      credentials,
    )
    if (response) {
    
      yield put(successAlert(response.message))
      history.push('/login')
    }
  } catch (e) {
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while signing up!'))
  }
}
export function* customerLogin({credentials, history, page}) {
  const token = yield select((state) => state?.AuthReducer?.token)

  try {
    const response = yield call(
      api(null).post,
      `/api/auth/customer/login`,
      credentials,
    )

    const {access_token} = response.data
    if (response?.data?.access_token !== undefined) {
      const userInfoResponse = yield call(
        api(access_token, null, true).post,
        `/api/auth/customer/me`,
      )

      yield put(
        loginSuccess({token: access_token, user: userInfoResponse.data.data}),
      )
      yield localStorage.setItem('token', access_token)
      if (history?.route === '/checkout') {
        history.push('/checkout')
      } else {
        history.push('/')
      }
    }
    // else if (history.location.pathname !== "/login")
    //   history.replace("/login");

    // if (response?.data?.access_token !== undefined) {
 
    //   yield put(successAlert("Logged in Successfully"));
    //   history.push('/test')
    // } else {
 
    //   history.push('/login')
    // }
  } catch (e) {
    yield put(errorAlert('Error while login!'))
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while signing up!'))
  }
}
export function* customerForgotPassword({credentials, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const response = yield call(
      api(null).post,
      `/api/auth/customer/password/email`,
      credentials,
    )
    if (response) {
      yield put(successAlert(response?.message))
    }
  } catch (e) {
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while sending email!'))
  }
}
export function* customerResetPassword({credentials, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const response = yield call(
      api(null).post,
      `/api/auth/customer/password/reset`,
      credentials,
    )
    if (response) {
      yield put(successAlert(response?.message))
      yield put(CustomerResetPasswordSuccess())
    }
  } catch (e) {
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while resetting password!'))
    yield put(CustomerResetPasswordFailure())
  }
}

// Update user profile
export function* updateUserProfile({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  yield put(updateUserProfilePending({isUserSaving: true}))
  try {
    const profileResponse = yield call(
      api(token).post,
      `api/auth/customer/edit`,
      payload,
    )
    yield put(updateUserProfileSuccess({data: profileResponse.data}))
    // update the auth user
    yield put(loginSuccess({token: token, user: profileResponse.data}))
    yield put(successAlert('Profile update successfully!'))
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === 'string'
          ? error
          : 'The current password is incorrect!',
      ),
    )
    yield put(updateUserProfileFailure({error: error}))
  }
}

export function* changePassword({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const profileResponse = yield call(
      api(token).post,
      `api/customers/change-password`,
      payload,
    )
    if (profileResponse) {
      yield put(changePasswordSuccess({data: profileResponse.data}))
      yield put(successAlert('Password updated successfully!'))
    }
  } catch (e) {
    yield put(changePasswordFailure(e))
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (typeof e.response.data.error === 'string')
      yield put(errorAlert(e.response.data.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while attaching payment method!'))
  }
}

export function* verifyEmailPassword({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  try {
    const res = yield call(
      api(token).post,
      `api/auth/customer/verify-email-password`,
      payload?.data,
    )
    if (res) {
      yield put(emailVerifyPasswordSuccess({data: res.data}))
      yield put(successAlert('Password added successfully!'))
      history.push('/login')
    }
  } catch (e) {
    yield put(emailVerifyPasswordFailure(e))
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (typeof e.response.data.error === 'string')
      yield put(errorAlert(e.response.data.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while verifying Email'))
  }
}

export function* getPasswordSetData({payload, history}) {
  const token = yield select((state) => state?.AuthReducer?.token)

  try {
    const res = yield call(
      api(token).post,
      `api/auth/customer/email/verify/${payload}`,
    )

    if (res) {
      // yield put(successAlert('Email Verified successfully!'))
      yield put(getPasswordSetSuccess({data: res.data}))
    }
  } catch (e) {
    if (e?.response?.data?.data?.is_pwd_cust == true) {
      // history.push('/login')
    } else if (e?.response?.data?.data?.is_pwd_cust == false) {
      yield put(getPasswordSetFailure(e?.response?.data))
    } else {
      yield put(getPasswordSetFailure(e))
    }
    // if (typeof e === 'string') yield put(errorAlert(e))
    // else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    // else if (typeof e.response.data.error === 'string')
    //   yield put(errorAlert(e.response.data.error))
    // else if (e.message !== undefined)
    //   yield put(errorAlert('Error while fetching Customer details'))
  }
}

export function* verifyLink({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const response = yield call(
      api(tokenparse).post,
      `api/customers/checkemail`,
      payload,
    )
    if (response) {
      yield put(verifyLinkSuccess(response?.data))
    }
  } catch (e) {
    yield put(verifyLinkFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while verifying link!'))
  }
}

export function* updateUsersPassword({payload, Router}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const response = yield call(
      api(tokenparse).post,
      `/api/auth/one-time-sign-up/user`,
      payload?.data,
    )
    if (response) {
      // yield put(successAlert(response.message))
      yield put(updatePasswordSuccess())
      // if(payload?.data?.role=='customer'){
      //   payload.Router.push('/password-confirmation')
      //   localStorage.setItem('can_access_cppage', true)
      // }
     
    }
  } catch (e) {
   
    yield put(errorAlert('Something went wrong!'))
  }
}

export function* verifyLinkDataAction({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const response = yield call(
      api(tokenparse).post,
      `api/auth/one-time-sign-up/verify-link`,
      payload,
    )
  
    if (response) {
      yield put(verifyLinkDataSuccess(response?.data?.code))
    }
  } catch (e) {

    yield put(verifyLinkDataFailure(e?.response?.data?.code))
    // if (typeof e === 'string') yield put(errorAlert(e))
    // else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    // else yield put(errorAlert('Error while verifying link!'))
  }
}

export function* updatePasswordFlow() {
  yield takeEvery(UPDATE_PASSWORD, updateUsersPassword)
}

export function* sentResetLinkFlow() {
  yield takeLatest(CONTRACTOR_SENT_RESET_PASSWORD, sentResetLink)
}
export function* activateUserFlow() {
  yield takeEvery(ACTIVATE_USER, activateUserAccount)
}
export function* activateEmailFlow() {
  yield takeEvery(ACCOUNT_ACTIVATE, activateEmailAccount)
}
export function* customerSignUpFlow() {
  yield takeEvery(CUSTOMER_SIGNUP, customerSignupFlow)
}
export function* customerLoginFlow() {
  yield takeEvery(CUSTOMER_LOGIN, customerLogin)
}
export function* customerForgotPasswordFlow() {
  yield takeEvery(CUSTOMER_FORGOT_PASSWORD, customerForgotPassword)
}
export function* customerResetPasswordFlow() {
  yield takeEvery(CUSTOMER_RESET_PASSWORD, customerResetPassword)
}

export function* watchUpdateProfileFlow() {
  yield takeEvery(UPDATE_CUSTOMER_USER_PROFILE, updateUserProfile)
}

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePassword)
}
export function* watchEmailVerifyPassword() {
  yield takeEvery(EMAIL_VERIFY_PASSWORD, verifyEmailPassword)
}
export function* getPasswordSetFlow() {
  yield takeEvery(GET_PASSWORD_SET, getPasswordSetData)
}
export function* verifyResetLink() {
  yield takeEvery(VERIFY_LINK, verifyLink)
}
export function* verifyDataLink() {
  yield takeEvery(VERIFY_LINK_DATA, verifyLinkDataAction)
}

export default function* rootAuthSaga() {
  yield all([
    loginFlow(),
    checkAuthFlow(),
    logoutFlow(),
    sentResetLinkFlow(),
    activateUserFlow(),
    activateEmailFlow(),
    customerSignUpFlow(),
    customerLoginFlow(),
    customerForgotPasswordFlow(),
    customerResetPasswordFlow(),
    watchUpdateProfileFlow(),
    watchChangePassword(),
    watchEmailVerifyPassword(),
    getPasswordSetFlow(),
    verifyResetLink(),
    updatePasswordFlow(),
    verifyDataLink(),
  ])
}
