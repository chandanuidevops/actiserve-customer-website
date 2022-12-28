import * as types from "./constants";

export const getVisitsRequest = (payload) => ({
  type: types.GET_VISIT_REQUEST,
  payload,
});

export const getVisitsSuccess = (payload) => ({
  type: types.GET_VISIT_SUCCESS,
  payload,
});

export const getVisitsFailure = (payload) => ({
  type: types.GET_VISIT_FAILURE,
  payload,
});

//ADD MODAL
export const openVisitAddModal = (payload) => ({
  type: types.OPEN_VISIT_ADD_MODAL,
  payload,
});
export const closeVisitAddModal = (payload) => ({
  type: types.CLOSE_VISIT_ADD_MODAL,
  payload,
});
// EDIT MODAL
export const openVisitEditModal = (payload) => ({
  type: types.OPEN_VISIT_EDIT_MODAL,
  payload,
});
export const closeVisitEditModal = (payload) => ({
  type: types.CLOSE_VISIT_EDIT_MODAL,
  payload,
});

// GET STAFF
export const getTradersStaff = (payload) => ({
  type: types.VISITS_GET_TRADER_STAFF,
  payload,
});

export const setTradersStaff = (payload) => ({
  type: types.VISITS_SET_TRADER_STAFF,
  payload,
});

// ADD VISIT
export const addVisit = (payload) => ({
  type: types.ADD_VISIT_REQUEST,
  payload,
});

export const addVisitSuccess = (payload) => ({
  type: types.ADD_VISIT_SUCCESS,
  payload,
});

export const addVisitFailure = (payload) => ({
  type: types.ADD_VISIT_FAILURE,
  payload,
});

// REJECT VISIT
export const openDeleteModal = (payload) => ({
  type: types.VISITS_OPEN_DELETE_MODAL,
  payload,
});
export const closeDeleteModal = (payload) => ({
  type: types.VISITS_CLOSE_DELETE_MODAL,
  payload,
});
