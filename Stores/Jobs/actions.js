import {
  GET_JOBS,
  GET_JOBS_SUCCESS,
  GET_JOBS_PENDING,
  GET_JOBS_FAILURE,
  JOBS_GET_FILTER_DATA,
  JOBS_GET_FILTER_DATA_SUCCESS,
  JOBS_GET_FILTER_DATA_FAILURE,
  JOBS_CLEANUP,
  JOBS_SET_DATEFILTER,
  JOBS_EDIT_SUBMIT,
  JOBS_EDIT_SUBMIT_SUCCESS,
  JOBS_EDIT_SUBMIT_FAILURE,
  // Job Visit
  GET_JOBS_VISITS,
  GET_JOBS_VISITS_SUCCESS,
  GET_JOBS_VISITS_FAILURE,
  GET_JOBS_VISITS_PENDING,
  GET_JOBS_COSTS,
  GET_JOBS_COSTS_SUCCESS,
  GET_JOBS_COSTS_FAILURE,
  GET_JOBS_COSTS_PENDING,
  // Job Triage
  GET_JOBS_TRIAGES,
  GET_JOBS_TRIAGES_SUCCESS,
  GET_JOBS_TRIAGES_FAILURE,
  GET_JOBS_TRIAGES_PENDING,
  JOBS_SAVE_TRIAGE,
  JOBS_SAVE_TRIAGE_SUCCESS,
  JOBS_SAVE_TRIAGE_FAILURE,
  // notes
  JOBS_GET_NOTES,
  JOBS_GET_NOTES_SUCCESS,
  JOBS_GET_NOTES_FAILURE,
  JOBS_DELETE_NOTE,
  JOBS_DELETE_NOTE_SUCCESS,
  JOBS_DELETE_NOTE_FAILURE,
  JOBS_SET_EDIT_NOTE,
  JOBS_EDIT_NOTE,
  JOBS_EDIT_NOTE_SUCCESS,
  JOBS_EDIT_NOTE_FAILURE,
  JOBS_ADD_NOTE,
  JOBS_ADD_NOTE_SUCCESS,
  JOBS_ADD_NOTE_FAILURE,
  JOBS_CANCEL_NOTE_EDIT,
  JOBS_VIEW_OPEN_AND_FETCH,
  JOBS_SET_JOB,

  // visit
  OPEN_ADD_VISIT_MODEL,
  CLOSE_VISIT_MODEL,
  OPEN_ADD_VISIT_MODELS,
  OPEN_ADD_VISIT_VIEW_MODELS,
  // add visit
  ADD_JOB_VISIT,
  ADD_JOB_VISIT_SUCCESS,
  ADD_JOB_VISIT_FAILURE,
  ADD_JOB_VISIT_PENDING,
  OPEN_EDIT_VISIT_MODEL,
  REJECT_JOB_VISIT,
  VISITS_GET_ENGINEERS,
  VISITS_SET_ENGINEERS,
  VISITS_GET_JOB,
  VISITS_SET_JOB,
  VISITS_GET_JOB_FAILURE,
  VISITS_START_LISTING,
  VISITS_SET_LISTING,
  VISITS_GET_LISTING_FAILURE,
  VISITS_OPEN_DELETE_MODAL,
  VISITS_CLOSE_DELETE_MODAL,
  SET_CURRENT_VISIT,
  VISITS_START_LISTINGS,
  VISITS_SET_LISTINGS,
  VISITS_START_LIST,
  GET_VISIT_DETAIL,
  OPEN_VISIT_LISTING_MODEL,
  CLOSE_VISIT_LISTING_MODEL,
  OPEN_VIEW_VISIT_DETAIL_MODEL,
  CLOSE_VIEW_VISIT_DETAIL_MODEL,
  OPEN_RESCHEDULE_VISIT_MODEL,
  CLOSE_RESCHEDULE_VISIT_MODEL,
  CLOSE_VISIT_DETAIL_MODEL,
  CLOSE_VISIT_VIEW_MODEL,
} from "./constants";

//Action call for get jobs from api that call saga function
export const getJobs = (payload) => {
  return {
    type: GET_JOBS,
    payload,
  };
};

// Action call pending status action call.
export const getJobsPending = (payload) => {
  return {
    type: GET_JOBS_PENDING,
    payload,
  };
};

// Action call when jobs api call success and get response from API.
export const getJobsSuccess = (payload) => {
  return {
    type: GET_JOBS_SUCCESS,
    payload,
  };
};

// Action call once the api getting failure
export const getJobsFailure = (payload) => {
  return {
    type: GET_JOBS_FAILURE,
    payload,
  };
};

// Action call pending status action call.
export const getJobsVisitsPending = (payload) => {
  return {
    type: GET_JOBS_VISITS_PENDING,
    payload,
  };
};

// Action call when jobs visits api call success and get response from API.
export const getJobsVisitsSuccess = (payload) => {
  return {
    type: GET_JOBS_VISITS_SUCCESS,
    payload,
  };
};

// Action call once the api getting failure
export const getJobsVisitsFailure = (payload) => {
  return {
    type: GET_JOBS_VISITS_FAILURE,
    payload,
  };
};

// Action call when job cleanup.
export const jobCleanUp = () => {
  return {
    type: JOBS_CLEANUP,
  };
};

// Actions for set date filter data.
export const setFilterDateRange = (payload) => {
  return {
    type: JOBS_SET_DATEFILTER,
    payload,
  };
};

// Action for geting filter data from api.
export const getFilterData = (payload) => {
  return {
    type: JOBS_GET_FILTER_DATA,
    payload,
  };
};

export const submitJobEdit = (payload) => ({
  type: JOBS_EDIT_SUBMIT,
  payload,
});

export const submitJobEditSuccess = (payload) => ({
  type: JOBS_EDIT_SUBMIT_SUCCESS,
  payload,
});

export const submitJobEditFailure = (payload) => ({
  type: JOBS_EDIT_SUBMIT_FAILURE,
  payload,
});

// Action for get filter data success
export const getFilterDataSuccess = (payload) => {
  return {
    type: JOBS_GET_FILTER_DATA_SUCCESS,
    payload,
  };
};

// Action for get filter data failure.
export const getFilterDataFailure = (payload) => {
  return {
    type: JOBS_GET_FILTER_DATA_FAILURE,
    payload,
  };
};

//Action call for get jobs visits from api that call saga function
export const getJobsVisits = (payload) => {
  return {
    type: GET_JOBS_VISITS,
    payload,
  };
};

//Action call for get jobs costs from api that call saga function
export const getJobsCosts = (payload) => {
  return {
    type: GET_JOBS_COSTS,
    payload,
  };
};

// Action call pending status action call.
export const getJobsCostsPending = (payload) => {
  return {
    type: GET_JOBS_COSTS_PENDING,
    payload,
  };
};

// Action call when jobs Costs api call success and get response from API.
export const getJobsCostsSuccess = (payload) => {
  return {
    type: GET_JOBS_COSTS_SUCCESS,
    payload,
  };
};

// Action call once the api getting failure
export const getJobsCostsFailure = (payload) => {
  return {
    type: GET_JOBS_COSTS_FAILURE,
    payload,
  };
};

//Action call for get jobs costs from api that call saga function
export const getJobsTriages = (payload) => {
  return {
    type: GET_JOBS_TRIAGES,
    payload,
  };
};

// Action call pending status action call.
export const getJobsTriagesPending = (payload) => {
  return {
    type: GET_JOBS_TRIAGES_PENDING,
    payload,
  };
};

// Action call when jobs Triages api call success and get response from API.
export const getJobsTriagesSuccess = (payload) => {
  return {
    type: GET_JOBS_TRIAGES_SUCCESS,
    payload,
  };
};

// Action call once the api getting failure
export const getJobsTriagesFailure = (payload) => {
  return {
    type: GET_JOBS_TRIAGES_FAILURE,
    payload,
  };
};

export const jobsSaveTriage = (payload) => ({
  type: JOBS_SAVE_TRIAGE,
  payload,
});

export const jobsSaveTriageSuccess = (payload) => ({
  type: JOBS_SAVE_TRIAGE_SUCCESS,
  payload,
});

export const jobsSaveTriageFailure = (payload) => ({
  type: JOBS_SAVE_TRIAGE_FAILURE,
  payload,
});

// Action call pending status action call
export const jobsAddNote = (payload, postSuccess) => ({
  type: JOBS_ADD_NOTE,
  payload,
  postSuccess,
});

// Action call when add jobs notes api call success and get response from API
export const jobsAddNoteSuccess = (payload) => ({
  type: JOBS_ADD_NOTE_SUCCESS,
  payload,
});

// Action call once the api getting failure
export const jobsAddNoteFailure = (payload) => ({
  type: JOBS_ADD_NOTE_FAILURE,
  payload,
});

// Action call pending status action call
export const jobsGetNotes = (payload) => ({
  type: JOBS_GET_NOTES,
  payload,
});

// Action call when jobs notes api call success and get response from API
export const jobsGetNotesSuccess = (payload) => ({
  type: JOBS_GET_NOTES_SUCCESS,
  payload,
});

// Action call once the api getting failure
export const jobsGetNotesFailure = (payload) => ({
  type: JOBS_GET_NOTES_FAILURE,
  payload,
});

// Action call pending status action call
export const jobsDeleteNote = (payload) => ({
  type: JOBS_DELETE_NOTE,
  payload,
});

// Action call when delete jobs notes api call success and get response from API
export const jobsDeleteNoteSuccess = (payload) => ({
  type: JOBS_DELETE_NOTE_SUCCESS,
  payload,
});

// Action call once the api getting failure
export const jobsDeleteNoteFailure = (payload) => ({
  type: JOBS_DELETE_NOTE_FAILURE,
  payload,
});

// Action call when edit jobs notes api call success and get response from API
export const jobsSetEditNote = (payload) => ({
  type: JOBS_SET_EDIT_NOTE,
  payload,
});

// Action call once the api getting failure
export const jobsCancelEditNote = (payload) => ({
  type: JOBS_CANCEL_NOTE_EDIT,
  payload,
});

// Action call once the api getting failure
export const jobsEditNote = (payload, postSuccess) => ({
  type: JOBS_EDIT_NOTE,
  payload,
  postSuccess,
});

// Action call when edit jobs Triages api call success and get response from API
export const jobsEditNoteSuccess = (payload) => ({
  type: JOBS_EDIT_NOTE_SUCCESS,
  payload,
});

// Action call once the api getting failure
export const jobsEditNoteFailure = (payload) => ({
  type: JOBS_EDIT_NOTE_FAILURE,
  payload,
});

// Action call once the api getting job
export const jobsViewStartFetching = (payload) => ({
  type: JOBS_VIEW_OPEN_AND_FETCH,
  payload,
});

// Action call when view jobs api call success and get response from API
export const setJob = (payload) => ({
  type: JOBS_SET_JOB,
  payload,
});

export const addJobVisit = (payload) => ({
  type: ADD_JOB_VISIT,
  payload,
});

export const addJobVisitSuccess = (payload) => ({
  type: ADD_JOB_VISIT_SUCCESS,
  payload,
});

export const addJobVisitFailure = (payload) => ({
  type: ADD_JOB_VISIT_FAILURE,
  payload,
});

export const addJobVisitPending = (payload) => ({
  type: ADD_JOB_VISIT_PENDING,
  payload,
});

export const openAddJobVisitModel = (payload) => ({
  type: OPEN_ADD_VISIT_MODEL,
  payload,
});

export const openAddJobVisitModels = (payload) => ({
  type: OPEN_ADD_VISIT_MODELS,
  payload,
});

export const openAddJobVisitViewModels = (payload) => {
  return {
    type: OPEN_ADD_VISIT_VIEW_MODELS,
    payload,
  };
};
export const closeJobVisitModel = (payload) => ({
  type: CLOSE_VISIT_MODEL,
  payload,
});
export const closeJobVisitDetailModel = (payload) => ({
  type: CLOSE_VISIT_DETAIL_MODEL,
  payload,
});
// export const closeJobVisitViewModel = (payload) => ({
//   type: CLOSE_VISIT_VIEW_MODEL,
//   payload,
// });

export const openEditJobVisitModel = (payload) => ({
  type: OPEN_EDIT_VISIT_MODEL,
  payload,
});

export const rejectJobVisit = (payload) => ({
  type: REJECT_JOB_VISIT,
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

export const getVisitListing = (payload) => ({
  type: VISITS_START_LISTING,
  payload,
});

export const getVisitListingDetails = (payload) => {
  return {
    type: VISITS_START_LISTINGS,
    payload,
  };
};
export const getVisitListingDetail = (payload) => {
  return {
    type: VISITS_START_LIST,
    payload,
  };
};
export const getVisitListingFailure = () => ({
  type: VISITS_GET_LISTING_FAILURE,
});

export const setVisitListing = (payload) => ({
  type: VISITS_SET_LISTING,
  payload,
});
export const setVisitListingDetails = (payload) => ({
  type: VISITS_SET_LISTINGS,
  payload,
});

export const setJobForVisit = (payload) => ({
  type: VISITS_SET_JOB,
  payload,
});

export const openDeleteModal = (payload) => ({
  type: VISITS_OPEN_DELETE_MODAL,
  payload,
});
export const closeDeleteModal = (payload) => ({
  type: VISITS_CLOSE_DELETE_MODAL,
  payload,
});

export const setCurrentVisit = (payload) => ({
  type: SET_CURRENT_VISIT,
  payload,
});

export const openRescheduleModel = (payload) => ({
  type: OPEN_RESCHEDULE_VISIT_MODEL,
  payload,
});

export const closeReschduleModel = (payload) => ({
  type: CLOSE_RESCHEDULE_VISIT_MODEL,
  payload,
});

export const openVisitListingModel = (payload) => ({
  type: OPEN_VISIT_LISTING_MODEL,
  payload,
});

export const closeVisitListingModel = (payload) => ({
  type: CLOSE_VISIT_LISTING_MODEL,
  payload,
});

export const openVisitDetailModel = (payload) => ({
  type: OPEN_VIEW_VISIT_DETAIL_MODEL,
  payload,
});

export const closeVisitDetailModel = (payload) => ({
  type: CLOSE_VIEW_VISIT_DETAIL_MODEL,
  payload,
});
