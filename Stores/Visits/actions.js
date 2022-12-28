import {
  VISITS_CLEANUP,

  // listing
  VISITS_SET_JOB,
  VISITS_GET_JOB,
  VISITS_SET_SKILL,
  VISITS_GET_ENGINEERS,
  VISITS_SET_ENGINEERS,
  VISITS_GET_JOB_FAILURE,
  VISITS_GET_SKILL,
  VISITS_SET_LISTING,
  VISITS_START_LISTING,
  VISITS_GET_LISTING_FAILURE,
  VISITS_CONTRACTORS_VIEW_OPEN_AND_FETCH,
  VISITS_CONTRACTORS_SET_JOB,

  // filter
  VISITS_CLEAR_FILTERS,
  VISITS_SET_DATEFILTER,
  VISITS_SET_FILTER_QUERY,

  // add
  VISITS_ADD,
  VISITS_SUBMIT_SUCCESS,
  VISITS_SUBMIT_FAILURE,

  // edit
  VISITS_EDIT,

  // get
  VISITS_GET_FAILURE,
  VISITS_SET_CURRENT_VISIT,
  VISITS_GET_ASSIGN_VISIT,

  // delete modal
  VISITS_DELETE_SUBMIT,
  VISITS_OPEN_DELETE_MODAL,
  VISITS_CLOSE_DELETE_MODAL,
  VISITS_DELETE_SUBMIT_SUCCESS,
  VISITS_DELETE_SUBMIT_FAILURE,
} from "./constants";

export const visitDeleteSubmit = (payload) => ({
  type: VISITS_DELETE_SUBMIT,
  payload,
});

export const visitDeleteSubmitSuccess = (payload) => ({
  type: VISITS_DELETE_SUBMIT_SUCCESS,
  payload,
});

export const visitDeleteSubmitFailure = () => ({
  type: VISITS_DELETE_SUBMIT_FAILURE,
});

export const visitDeleteModalOpen = (payload) => ({
  type: VISITS_OPEN_DELETE_MODAL,
  payload,
});

export const visitDeleteModalClose = (payload) => ({
  type: VISITS_CLOSE_DELETE_MODAL,
  payload,
});

export const visitSubmitEdit = (payload) => ({
  type: VISITS_EDIT,
  payload,
});

export const getVisitFailure = () => ({
  type: VISITS_GET_FAILURE,
});

export const getVisitAssigned = (payload) => ({
  type: VISITS_GET_ASSIGN_VISIT,
  payload,
});

export const setCurrentVisit = (payload) => ({
  type: VISITS_SET_CURRENT_VISIT,
  payload,
});

export const visitSubmitAdd = (payload) => ({
  type: VISITS_ADD,
  payload,
});

export const visitSubmitSuccess = (payload) => ({
  type: VISITS_SUBMIT_SUCCESS,
  payload,
});

export const visitSubmitFailure = () => ({
  type: VISITS_SUBMIT_FAILURE,
});

export const visitCleanup = () => ({
  type: VISITS_CLEANUP,
});

export const getVisitListing = (payload) => ({
  type: VISITS_START_LISTING,
  payload,
});

export const getVisitListingFailure = () => ({
  type: VISITS_GET_LISTING_FAILURE,
});

export const setVisitListing = (payload) => ({
  type: VISITS_SET_LISTING,
  payload,
});

export const getSkills = () => ({
  type: VISITS_GET_SKILL,
});

export const setSkills = (payload) => ({
  type: VISITS_SET_SKILL,
  payload,
});

export const getEngineers = (payload) => ({
  type: VISITS_GET_ENGINEERS,
  payload,
});

export const setEngineers = (payload) => ({
  type: VISITS_SET_ENGINEERS,
  payload,
});

export const visitFilterCleanup = (payload) => ({
  type: VISITS_CLEAR_FILTERS,
  payload,
});

export const setVisitDateFiltter = (payload) => ({
  type: VISITS_SET_DATEFILTER,
  payload,
});

export const getJobForVisit = (payload) => ({
  type: VISITS_GET_JOB,
  payload,
});

export const getJobForVisitFailure = () => ({
  type: VISITS_GET_JOB_FAILURE,
});

export const setJobForVisit = (payload) => ({
  type: VISITS_SET_JOB,
  payload,
});

export const setVisitQueryFilter = (payload) => ({
  type: VISITS_SET_FILTER_QUERY,
  payload,
});

export const contractorsViewStartFetching = (payload) => ({
  type: VISITS_CONTRACTORS_VIEW_OPEN_AND_FETCH,
  payload,
});

export const setContractor = (payload) => ({
  type: VISITS_CONTRACTORS_SET_JOB,
  payload,
});
