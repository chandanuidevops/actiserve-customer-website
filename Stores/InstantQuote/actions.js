import * as types from "./constants";

export const getGroupRequest = (payload) => ({
  type: types.GET_GROUP_REQUEST,
  payload,
});

export const getGroupSuccess = (payload) => ({
  type: types.GET_GROUP_SUCCESS,
  payload,
});

export const getGroupFailure = (payload) => ({
  type: types.GET_GROUP_FAILURE,
  payload,
});

export const addGroupRequest = (payload) => ({
  type: types.ADD_GROUP_REQUEST,
  payload,
});

export const addGroupSuccess = (payload) => ({
  type: types.ADD_GROUP_SUCCESS,
  payload,
});

export const addGroupFailure = (payload) => ({
  type: types.ADD_GROUP_FAILURE,
  payload,
});
