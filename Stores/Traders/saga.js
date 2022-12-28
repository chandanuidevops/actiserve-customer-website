import {all, call, put, select, take, takeEvery} from 'redux-saga/effects'
import {successAlert, errorAlert} from '../Alerts/actions'
import api from '../../utils/api'
import * as constant from './constants'
import QueryString from 'query-string'
import moment from 'moment'

import {
  validateCustomerSuccess,
  validateCustomerFailure,
  registerTraderSuccess,
  registerTraderFailure,
  addDetailsSuccess,
  addDetailsFailure,
  getPostCodeSuccess,
  getPostCodeFailure,
  getCategoriesSuccess,
  getCategoriesFailure,
  addAreacodeSuccess,
  addAreacodeFailure,
  addDocumentSuccess,
  addDocumentFailure,
  getDocumentListingSuccess,
  getDocumentListingFailure,
  getInformationSuccess,
  getInformationFailure,
  fetchPostCodeSuccess,
  fetchPostCodeFailure,
  updateAreacodeSuccess,
  updateAreacodeFailure,
  getLoginSuccess,
  getLoginFailure,
  addSpecificDocumentSuccess,
  addSpecificDocumentFailure,
  allDocumentsSuccess,
  allDocumentsFailure,
  saveFinishSignupSuccess,
  saveFinishSignupFailure,
  getTraderEmailSuccess,
  getTraderEmailFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  setNewPasswordSuccess,
  setNewPasswordFailure,


} from './actions'

export function* validateCustomer({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const query = payload?.query ? payload?.query : ''
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/check-email`,
      payload,
    )
    yield put(validateCustomerSuccess(data))
  } catch (error) {
    yield put(validateCustomerFailure(error?.response?.status))
  }
}

export function* registerTraderData({payload}) {
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/first-step`,
      payload,
    )
    yield put(registerTraderSuccess(data?.data))
  } catch (e) {
    yield put(registerTraderFailure(e))
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else if (e.message !== undefined)
      yield put(errorAlert('Error while register!'))
  }
}

export function* addDetailsData({payload}) {
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/second-step/${payload.trader_id}`,
      payload,
    )

    yield put(addDetailsSuccess(data?.data))
  } catch (e) {
    yield put(addDetailsFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while editing Category!'))
  }
}
export function* getPostcodeData({payload}) {
  try {
    const data = yield call(
      api(null).get,
      `api/trader-signup/postcode-group/${payload}`,
    )

    yield put(getPostCodeSuccess(data?.data))
  } catch (e) {
    yield put(getPostCodeFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting Postcodes!'))
  }
}

export function* getcategoryData({payload}) {
  try {
    const data = yield call(api(null).get, `api/trader-signup/category-filter`)

    yield put(getCategoriesSuccess(data?.data))
  } catch (e) {
    yield put(getCategoriesFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting categories!'))
  }
}
export function* addAreaCodeData({payload}) {
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/postcode-cover`,
      payload,
    )
    if (data?.data?.length == 0) {
      yield put(errorAlert(data.message))
      yield put(addAreacodeFailure())
    } else {
      yield put(addAreacodeSuccess(data?.data))
    }
  } catch (e) {
    yield put(addAreacodeFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while adding postcode!'))
  }
}

export function* addDocumentData({payload}) {
  const id = payload?.trader_id

  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/fourth-step/common-document-upload/${id}`,
      payload.data,
    )

    yield put(addDocumentSuccess(data?.data))
    yield put(successAlert('Data saved successfully!'))
  } catch (e) {
    yield put(addDocumentFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while documents!'))
  }
}

export function* addSpecificDocumentData({payload}) {
  const id = payload?.trader_setting_id

  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/fourth-step/category-document-upload/${id}`,
      payload.data,
    )

    yield put(addSpecificDocumentSuccess(data?.data))
    yield put(successAlert('Data saved successfully!'))
  } catch (e) {
    yield put(addSpecificDocumentFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while documents!'))
  }
}

export function* getDocumentListData({payload}) {
  try {
    const data = yield call(
      api(null).get,
      `api/trader-signup/types-of-category/document-list/${payload}?true=all`,
    )

    yield put(getDocumentListingSuccess(data?.data))
  } catch (e) {
    yield put(getDocumentListingFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting document upload list!'))
  }
}

export function* getInformationData({payload}) {
  try {
    const data = yield call(
      api(null).get,
      `api/trader-signup/second-step/show/${payload}`,
    )

    yield put(getInformationSuccess(data?.data))
  } catch (e) {
    yield put(getInformationFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting personal information!'))
  }
}

export function* fetchPostcodesData({payload}) {
  try {
    const data = yield call(
      api(null).get,
      `api/trader-signup/third-step/show/${payload}`,
    )

    yield put(fetchPostCodeSuccess(data?.data))
  } catch (e) {
    yield put(fetchPostCodeFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting postcodes!'))
  }
}

export function* updateAreaCodeData({payload}) {
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/third-step/update`,
      payload,
    )
    if (data?.data?.length == 0) {
      yield put(errorAlert(data.message))
      yield put(updateAreacodeFailure())
    } else {
      yield put(updateAreacodeSuccess(data?.data))
    }
  } catch (e) {
    yield put(updateAreacodeFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while updating postcode!'))
  }
}
export function* getLoginData({payload}) {
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/check-login`,
      payload,
    )

    yield put(getLoginSuccess(data?.data))
  } catch (e) {
    yield put(getLoginFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while login!'))
  }
}

export function* getAllDocumentsData({payload}) {
  try {
    const data = yield call(
      api(null).get,
      `api/trader-signup/fourth-step/show/${payload}`,
    )
    if (data?.data?.trader_details?.is_active) {
      window.location.href = `${process.env.NEXT_PUBLIC_TRADER_PORTAL}`
    }

    yield put(allDocumentsSuccess(data?.data))
  } catch (e) {
    yield put(allDocumentsFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting documents!'))
  }
}

export function* saveFinishSignupData({payload}) {
  const id = payload?.trader_id
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/fourth-step/finished-up/${id}`,
      payload.data,
    )
    console.log('data>', data)
    yield put(saveFinishSignupSuccess(data))
    yield put(successAlert('Your SignUp Process Completed Successfully!'))
  } catch (e) {
    yield put(saveFinishSignupFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while login!'))
  }
}

export function* getTraderEmailData({payload}) {
  const token = yield select((state) => state?.AuthReducer?.token)
  const localToken = window.localStorage.getItem('token')
  let tokenparse = token ?? localToken
  if (!tokenparse) tokenparse = process.env.NEXT_PUBLIC_APP_TOKEN
  try {
    const response = yield call(
      api(tokenparse).get,
      `api/getTrader/${payload?.id}`,
    )
    if (response) {
      console.log('response::', response)
      yield put(getTraderEmailSuccess(response?.data?.email))
    }
  } catch (e) {
    yield put(getTraderEmailFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while fetching trader email!'))
  }
}


export function* submitResetPasswordData({payload}) {
  // const id = payload?.trader_id
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/forgot-password`,
      payload,
    )
    console.log('data>', data)
    yield put(resetPasswordSuccess(data))
    yield put(successAlert('Please check your email to set new password!'))
  } catch (e) {
    yield put(resetPasswordFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while login!'))
  }
}

export function* submitNewPasswordData({payload}) {
  // const id = payload?.trader_id
  try {
    const data = yield call(
      api(null).post,
      `api/trader-signup/set-password`,
      payload,
    )
    console.log('data>', data)
    yield put(setNewPasswordSuccess(data))
    yield put(successAlert('Your password has been updated!'))
  } catch (e) {
    yield put(setNewPasswordFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while login!'))
  }
}

export function* validateCustomerFlow() {
  yield takeEvery(constant.VALIDATE_TRADER_CUSTOMER, validateCustomer)
}

export function* registerTraderFlow() {
  yield takeEvery(constant.REGISTER_TRADER, registerTraderData)
}
export function* addDetailsFlow() {
  yield takeEvery(constant.PERSONAL_DETAIL, addDetailsData)
}

export function* getPostcodeFlow() {
  yield takeEvery(constant.GET_POSTCODE, getPostcodeData)
}

export function* getcategoryFlow() {
  yield takeEvery(constant.GET_CATEGORIES, getcategoryData)
}

export function* addAreaCodeFlow() {
  yield takeEvery(constant.ADD_AREACODE, addAreaCodeData)
}

export function* addDocumentFlow() {
  yield takeEvery(constant.ADD_DOCUMENT, addDocumentData)
}

export function* addSpecificDocumentFlow() {
  yield takeEvery(constant.ADD_SPECIFIC_DOCUMENT, addSpecificDocumentData)
}

export function* getDocumentListFlow() {
  yield takeEvery(constant.GET_DOCUMENTLISTING, getDocumentListData)
}

export function* getInformationFlow() {
  yield takeEvery(constant.GET_PERSONAL_INFORMATION, getInformationData)
}

export function* fetchPostcodesFlow() {
  yield takeEvery(constant.FETCH_POSTCODE, fetchPostcodesData)
}

export function* updateAreaCodeFlow() {
  yield takeEvery(constant.UPDATE_AREACODE, updateAreaCodeData)
}

export function* getLoginFlow() {
  yield takeEvery(constant.CHECK_LOGIN, getLoginData)
}

export function* getAllDocumentsFlow() {
  yield takeEvery(constant.GET_ALL_DOCUMENT, getAllDocumentsData)
}

export function* saveFinishSignupFlow() {
  yield takeEvery(constant.FINISH_SIGNUP, saveFinishSignupData)
}

export function* getTraderEmailFlow() {
  yield takeEvery(constant.GET_TRADER_EMAIL, getTraderEmailData)
}
export function* submitResetPasswordFlow() {
  yield takeEvery(constant.RESET_PASSWORD, submitResetPasswordData)
}

export function* submitNewPasswordFlow() {
  yield takeEvery(constant.SET_PASSWORD, submitNewPasswordData)
}



export default function* TraderSaga() {
  yield all([
    validateCustomerFlow(),
    registerTraderFlow(),
    addDetailsFlow(),
    getPostcodeFlow(),
    getcategoryFlow(),
    addAreaCodeFlow(),
    addDocumentFlow(),
    getDocumentListFlow(),
    getInformationFlow(),
    fetchPostcodesFlow(),
    updateAreaCodeFlow(),
    getLoginFlow(),
    addSpecificDocumentFlow(),
    getAllDocumentsFlow(),
    saveFinishSignupFlow(),
    getTraderEmailFlow(),
    submitResetPasswordFlow(),
    submitNewPasswordFlow() ,
  ])
}
