import * as types from "./constants";

export const uploadFileRequest = (payload) => ({
  type: types.UPLOAD_PRODUCT_FILE_REQUEST,
  payload,
});

export const uploadFileSuccess = (payload) => ({
  type: types.UPLOAD_PRODUCT_FILE_SUCCESS,
  payload,
});

export const uploadFileFailure = (payload) => ({
  type: types.UPLOAD_PRODUCT_FILE_FAILURE,
  payload,
});