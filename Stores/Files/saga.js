import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";
import { UPLOAD_PRODUCT_FILE_REQUEST } from './constants'
import { uploadFileSuccess, uploadFileFailure } from "./actions";

export function* uploadFile({ payload }) {
  try {
    const data = yield call(
      api(null).post,
      `/api/files/store/file`, payload
    );
    yield put(successAlert("Images uploaded successfully, You can proceed with checkout now!"))
    yield put(uploadFileSuccess(data.data));
  } catch (error) {
    yield put(uploadFileFailure(error));
  }
}

export function* uploadFileFlow() {
  yield takeEvery(UPLOAD_PRODUCT_FILE_REQUEST, uploadFile);
}

export default function* FileSaga() {
  yield all([
    uploadFileFlow(),
  ]);
}
