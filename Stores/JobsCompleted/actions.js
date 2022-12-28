import * as types from "./constants";

export const getjobsCompletedRequest = (payload) => ({
  type: types.GET_JOB_COMPLETED_REQUEST,
  payload,
});

export const getjobsCompletedSuccess = (payload) => ({
  type: types.GET_JOB_COMPLETED_SUCCESS,
  payload,
});

export const getjobsCompletedFailure = (payload) => ({
  type: types.GET_JOB_COMPLETED_FAILURE,
  payload,
});
