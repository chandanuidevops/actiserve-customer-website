import * as types from "./constants";

export const getVisits = (payload) => ({
  type: types.GET_VISITS,
  payload,
});

export const getVisitsSuccess = (payload) => ({
  type: types.GET_VISITS_SUCCESS,
  payload,
});

export const getVisitsFailure = (payload) => ({
  type: types.GET_VISITS_FAILURE,
  payload,
});
