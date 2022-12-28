import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import api from '../../utils/api';
import QueryString from 'query-string';
import {
  getBlogsListingSuccess,
  getBlogsListingFailure,
  getLatestBlogsSuccess,
  getLatestBlogsFailure,
  getSingleBlogSuccess,
  getSingleBlogFailure,
} from './actions';

import {
  GET_BLOGS_LISTING,
  GET_LATEST_BLOGS,
  GET_SINGLE_BLOGS,
} from './constants';

import { errorAlert, successAlert } from '../Alerts/actions';



export function* getBlogsData({payload}) {
  let query = "";
  query = QueryString.stringify(payload);
  try {
  
    const data = yield call(
      api(null).get,
      `api/customer-blogs?${query}`,
    )

    yield put(getBlogsListingSuccess(data.data))
  } catch (e) {
    yield put(getBlogsListingFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting blogs!'))
  }
}
export function* getLatestBlogsData({payload}) {
  try {
 
    const data = yield call(
      api(null).get,
      `api/customer-latest-blogs`,
    )

    yield put(getLatestBlogsSuccess(data?.data))
  } catch (e) {
    yield put(getLatestBlogsFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting blogs!'))
  }
}

export function* getSingleBlogsData({payload}) {

  try {
    const data = yield call(
      api(null).get,
      `api/customer-blog/${payload}`,
    )

    yield put(getSingleBlogSuccess(data?.data))
  } catch (e) {
    yield put(getSingleBlogFailure())
    if (typeof e === 'string') yield put(errorAlert(e))
    else if (typeof e.error === 'string') yield put(errorAlert(e.error))
    else yield put(errorAlert('Error while getting blogs!'))
  }
}

export function* getBlogsFlow() {
  yield takeEvery(GET_BLOGS_LISTING, getBlogsData);
}

export function* getLatestBlogsFlow() {
  yield takeEvery(GET_LATEST_BLOGS, getLatestBlogsData);
}
export function* getSingleBlogsFlow() {
  yield takeEvery(GET_SINGLE_BLOGS, getSingleBlogsData);
}


export default function* BlogsSaga() {
  yield all([
   
    getBlogsFlow(),
    getLatestBlogsFlow(),
    getSingleBlogsFlow(),
  ]);
}
