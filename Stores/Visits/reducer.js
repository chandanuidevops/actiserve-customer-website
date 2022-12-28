import produce from "immer";

import {
  VISITS_CLEANUP,

  // listing
  // VISITS_GET_ENGINEERS,
  VISITS_SET_SKILL,
  VISITS_SET_JOB,
  VISITS_GET_JOB,
  VISITS_GET_JOB_FAILURE,
  VISITS_SET_LISTING,
  VISITS_START_LISTING,
  VISITS_GET_LISTING_FAILURE,
  VISITS_CONTRACTORS_VIEW_OPEN_AND_FETCH,
  VISITS_CONTRACTORS_SET_JOB,

  // filter
  VISITS_CLEAR_FILTERS,
  VISITS_SET_DATEFILTER,
  VISITS_SET_FILTER_QUERY,
  VISITS_SET_ENGINEERS,

  // add
  VISITS_ADD,
  VISITS_SUBMIT_SUCCESS,
  VISITS_SUBMIT_FAILURE,

  // get
  VISITS_SET_CURRENT_VISIT,
  VISITS_GET_ASSIGN_VISIT,
  VISITS_GET_FAILURE,

  // edit
  VISITS_EDIT,

  // delete modal
  VISITS_DELETE_SUBMIT,
  VISITS_OPEN_DELETE_MODAL,
  VISITS_CLOSE_DELETE_MODAL,
  VISITS_DELETE_SUBMIT_SUCCESS,
  VISITS_DELETE_SUBMIT_FAILURE,
} from "./constants";

export const initialState = {
  isModalOpen: false,
  job: null,
  currentVisit: null,
  isEditing: false,
  isFetching: false,
  isFetchingJob: false,
  isSubmiting: false,
  isFetchingVisits: false,
  // filterDateRange: null,
  // engineers: [],
  // filterQuery: "",
  // skills: [],
  // canApplyFilter: false,
  visits: { data: [] },
  currentVisit: {},
  isDeleteModalOpen: false,
  isDeleting: false,
  deletingVisitDetails: {},
  alert: {},
  // currentContractor: {},
};

const visitReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case VISITS_CLEANUP:
        return initialState;
      case VISITS_START_LISTING:
        draft.isFetchingVisits = true;
        break;
      case VISITS_SET_SKILL:
        draft.skills = action.payload;
        break;
      case VISITS_SET_LISTING:
        draft.isFetchingVisits = false;
        draft.visits = action.payload;
        break;
      case VISITS_GET_LISTING_FAILURE:
        draft.isFetchingVisits = false;
        draft.job = null;
        break;
      case VISITS_SET_ENGINEERS:
        draft.engineers = action.payload;
        break;
      case VISITS_GET_JOB:
        draft.isFetchingJob = true;
        break;
      case VISITS_GET_JOB_FAILURE:
        draft.isFetchingJob = false;
        draft.job = null;
        break;
      case VISITS_SET_JOB:
        draft.job = action.payload;
        draft.isFetchingJob = false;
        break;
      case VISITS_CLEAR_FILTERS:
        draft.filterQuery = "";
        draft.canApplyFilter = false;
        draft.filterDateRange = null;
        draft.isFetchingVisits = true;
        break;
      case VISITS_SET_DATEFILTER:
        draft.canApplyFilter = true;
        draft.filterDateRange = action.payload;
        break;
      case VISITS_SET_FILTER_QUERY:
        draft.canApplyFilter = true;
        draft.filterQuery = action.payload;
        break;
      case VISITS_ADD:
        draft.isSubmiting = true;
        break;
      case VISITS_SUBMIT_SUCCESS:
        draft.isSubmiting = false;
        draft.currentVisit = action.payload;
        break;
      case VISITS_SUBMIT_FAILURE:
        draft.isSubmiting = false;
        break;
      case VISITS_GET_ASSIGN_VISIT:
        draft.isFetching = true;
        break;
      case VISITS_SET_CURRENT_VISIT:
        draft.currentVisit = action.payload;
        draft.isFetching = false;
        break;
      case VISITS_GET_FAILURE:
        draft.isFetching = false;
        break;
      case VISITS_EDIT:
        draft.isSubmiting = true;
        draft.isEditing = true;
        break;
      case VISITS_DELETE_SUBMIT:
        draft.isDeleting = true;
        break;
      case VISITS_DELETE_SUBMIT_SUCCESS:
        draft.isDeleting = false;
        break;
      case VISITS_DELETE_SUBMIT_FAILURE:
        draft.isDeleting = false;
        break;
      case VISITS_OPEN_DELETE_MODAL:
        draft.isDeleteModalOpen = true;
        draft.deletingVisitDetails = action.payload;
        break;
      case VISITS_CLOSE_DELETE_MODAL:
        draft.isDeleteModalOpen = false;
        draft.deletingVisitDetails = {};
        break;
      case VISITS_CONTRACTORS_VIEW_OPEN_AND_FETCH:
        draft.isFetchingContractor = true;
        break;
      case VISITS_CONTRACTORS_SET_JOB:
        draft.isFetchingContractor = false;
        draft.currentContractor = action.payload;
        break;
      default:
        return state;
    }
  });

export default visitReducer;
