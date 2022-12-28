import {
  JOBS_CLEANUP,
  GET_JOBS_FAILURE,
  GET_JOBS_PENDING,
  GET_JOBS_SUCCESS,
  GET_JOBS_VISITS,
  GET_JOBS_VISITS_SUCCESS,
  GET_JOBS_VISITS_FAILURE,
  GET_JOBS_VISITS_PENDING,
  JOBS_EDIT_SUBMIT,
  JOBS_EDIT_SUBMIT_SUCCESS,
  JOBS_EDIT_SUBMIT_FAILURE,
  GET_JOBS_COSTS,
  GET_JOBS_COSTS_SUCCESS,
  GET_JOBS_COSTS_FAILURE,
  GET_JOBS_COSTS_PENDING,
  GET_JOBS_TRIAGES,
  GET_JOBS_TRIAGES_SUCCESS,
  GET_JOBS_TRIAGES_FAILURE,
  GET_JOBS_TRIAGES_PENDING,
  JOBS_SAVE_TRIAGE,
  JOBS_SAVE_TRIAGE_SUCCESS,
  JOBS_SAVE_TRIAGE_FAILURE,
  // filter listings by date
  JOBS_SET_DATEFILTER,
  JOBS_GET_FILTER_DATA,
  JOBS_GET_FILTER_DATA_SUCCESS,
  JOBS_GET_FILTER_DATA_FAILURE,
  // job notes
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
  JOBS_OPEN_CONTACTS_ADD,
  JOBS_CLOSE_CONTACTS_ADD,
  JOBS_OPEN_CONTACTS_EDIT,
  JOBS_CLOSE_CONTACTS_EDIT,
  JOBS_ADD_NOTE,
  JOBS_ADD_NOTE_SUCCESS,
  JOBS_ADD_NOTE_FAILURE,
  JOBS_CANCEL_NOTE_EDIT,
  JOBS_VIEW_OPEN_AND_FETCH,
  JOBS_SET_JOB,

  // add visit
  GET_VISIT_DETAILS,
  ADD_JOB_VISIT_SUCCESS,
  ADD_JOB_VISIT_FAILURE,
  ADD_JOB_VISIT_PENDING,

  // visit
  OPEN_ADD_VISIT_MODEL,
  OPEN_ADD_VISIT_VIEW_MODELS,
  OPEN_ADD_VISIT_MODELS,
  CLOSE_VISIT_MODEL,
  CLOSE_VISIT_DETAIL_MODEL,
  CLOSE_VISIT_VIEW_MODEL,
  OPEN_EDIT_VISIT_MODEL,
  REJECT_JOB_VISIT,
  VISITS_GET_ENGINEERS,
  VISITS_SET_ENGINEERS,
  VISITS_GET_JOB,
  VISITS_SET_JOB,
  VISITS_GET_JOB_FAILURE,
  VISITS_START_LISTING,
  VISITS_START_LISTINGS,
  VISITS_SET_LISTING,
  VISITS_SET_LISTINGS,
  VISITS_GET_LISTING_FAILURE,
  VISITS_CLOSE_DELETE_MODAL,
  VISITS_OPEN_DELETE_MODAL,
  SET_CURRENT_VISIT,
  VISITS_OPEN_RESCHEDULE_MODAL,
  VISITS_CLOSE_RESCHEDULE_MODAL,
  GET_VISIT_DETAIL,
  VISITS_START_LIST,
  OPEN_VISIT_LISTING_MODEL,
  CLOSE_VISIT_LISTING_MODEL,
  OPEN_VIEW_VISIT_DETAIL_MODEL,
  CLOSE_VIEW_VISIT_DETAIL_MODEL,
  OPEN_RESCHEDULE_VISIT_MODEL,
  CLOSE_RESCHEDULE_VISIT_MODEL,
} from "./constants";

import produce from "immer";
const initialState = {
  isJobLoading: false,
  jobs: [],
  visits: [],
  costs: [],
  triages: [],
  errorMessage: null,
  jobReload: false,
  isFetchingFilters: false,
  filters: {
    filterDateRange: null,
    customers: [],
    case_managers: [],
    contractors: [],
    status: "",
    postcode: "",
    customer_id: "",
    contractor_id: "",
    case_manager: "",
  },
  isVisitLoading: false,
  isCostLoading: false,
  isTriagesLoading: false,
  notes: {
    data: [],
    currentNote: null,
    isFetching: false,
    isDeleting: false,
    isEditingNote: false,
    isAddLoading: false,
    isSubmiting: false,
  },
  isTriageSubmiting: false,
  isFetching: false,

  currentJob: {},
  isSubmiting: false,
  isVisitModelOpen: false,
  isViewModelOpen: false,
  isVisitSubmiting: false,
  jobVisitStatus: null,
  isJobVisitFetching: false,
  isJobVisitEditing: false,
  engineers: [],
  currentVisit: {},
  isDeleteModalOpen: false,

  rejectingVisitDetails: {},

  visitListingModel: false,
  resceduleModel: false,
  viewVisitDetail: false,
};

const JobReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_JOBS_PENDING:
        draft.isJobLoading = true;
        draft.jobReload = false;
        break;
      case GET_JOBS_SUCCESS:
        draft.jobs = action.payload.jobs.data;
        draft.isJobLoading = false;
        draft.isDeleteModalOpen = false;
        break;
      case GET_JOBS_FAILURE:
        draft.errorMessage = action.payload.error;
        draft.isJobLoading = false;
        break;
      case GET_JOBS_VISITS_PENDING:
        draft.isVisitLoading = true;
        break;
      case GET_JOBS_VISITS_SUCCESS:
        draft.visits = action.payload.visits.data;
        draft.isVisitLoading = false;
        break;
      case GET_JOBS_VISITS_FAILURE:
        draft.errorMessage = action.payload.error;
        draft.isVisitLoading = false;
        break;
      case GET_JOBS_COSTS_PENDING:
        draft.isCostLoading = true;
        break;
      case GET_JOBS_COSTS_SUCCESS:
        draft.costs = action.payload.costs.data;
        draft.isCostLoading = false;
        break;
      case GET_JOBS_COSTS_FAILURE:
        draft.errorMessage = action.payload.error;
        draft.isCostLoading = false;
        break;
      case GET_JOBS_TRIAGES_PENDING:
        draft.isTriagesLoading = true;
        break;
      case GET_JOBS_TRIAGES_SUCCESS:
        draft.triages = action.payload.triages;
        draft.isTriagesLoading = false;
        break;
      case GET_JOBS_TRIAGES_FAILURE:
        draft.errorMessage = action.payload.error;
        draft.isTriagesLoading = false;
        break;
      case JOBS_CLEANUP:
        return initialState;
      case JOBS_SET_DATEFILTER:
        draft.filters.filterDateRange = action.payload;
        break;
      case JOBS_GET_FILTER_DATA:
        draft.isFetchingFilters = true;
        break;
      case JOBS_GET_FILTER_DATA_SUCCESS:
        draft.isFetchingFilters = false;
        draft.filters = { ...draft.filters, ...action.payload };
        break;
      case JOBS_GET_FILTER_DATA_FAILURE:
        draft.isFetchingFilters = false;
        break;
      case JOBS_ADD_NOTE:
        draft.notes.isAddLoading = true;
        break;
      case JOBS_ADD_NOTE_SUCCESS:
        draft.notes.isAddLoading = false;
        break;
      case JOBS_ADD_NOTE_FAILURE:
        draft.notes.isAddLoading = false;
        break;
      case JOBS_GET_NOTES:
        draft.notes.isFetching = true;
        break;
      case JOBS_GET_NOTES_SUCCESS:
        draft.notes.isFetching = false;
        draft.notes.data = action.payload;
        break;
      case JOBS_GET_NOTES_FAILURE:
        draft.notes.isFetching = false;
        break;
      case JOBS_DELETE_NOTE:
        draft.notes.isDeleting = true;
        break;
      case JOBS_DELETE_NOTE_SUCCESS:
        draft.notes.isDeleting = false;
        break;
      case JOBS_DELETE_NOTE_FAILURE:
        draft.notes.isDeleting = false;
        break;
      case JOBS_SET_EDIT_NOTE:
        draft.notes.isEditingNote = true;
        draft.notes.currentNote = action.payload;
        break;
      case JOBS_CANCEL_NOTE_EDIT:
        draft.notes.isEditingNote = false;
        draft.notes.currentNote = null;
        break;
      case JOBS_EDIT_NOTE:
        draft.notes.isSubmiting = true;
        break;
      case JOBS_EDIT_NOTE_SUCCESS:
        draft.notes.isEditingNote = false;
        draft.notes.currentNote = null;
        draft.notes.isSubmiting = false;
        break;
      case JOBS_EDIT_NOTE_FAILURE:
        draft.notes.isSubmiting = false;
        break;
      case JOBS_SAVE_TRIAGE:
        draft.isTriageSubmiting = true;
        break;
      case JOBS_SAVE_TRIAGE_SUCCESS:
        draft.triages = action.payload;
        draft.isTriageSubmiting = false;
        break;
      case JOBS_SAVE_TRIAGE_FAILURE:
        draft.isTriageSubmiting = false;
        break;
      case JOBS_VIEW_OPEN_AND_FETCH:
        draft.isFetching = true;
        break;
      case JOBS_SET_JOB:
        draft.isFetching = false;
        draft.currentJob = action.payload;
        break;

      case JOBS_EDIT_SUBMIT:
        draft.isSubmiting = true;
        break;
      case JOBS_EDIT_SUBMIT_SUCCESS:
        draft.isSubmiting = false;
        break;
      case JOBS_EDIT_SUBMIT:
        draft.isSubmiting = false;
        break;

      case GET_VISIT_DETAILS:
        draft.isVisitModelsOpen = true;
        draft.isVisitModelOpen = true;
        draft.currentJob = action.payload?.job;
        break;
      case ADD_JOB_VISIT_PENDING:
        draft.isVisitSubmiting = true;
        break;

      case ADD_JOB_VISIT_SUCCESS:
        draft.isVisitModelsOpen = false;
        draft.isVisitModelOpen = false;
        draft.isViewModelOpen = false;
        draft.isVisitSubmiting = false;
        draft.viewVisitDetail = false;
        draft.jobVisitStatus = null;
        draft.isJobVisitEditing = false;
        draft.isJobVisitFetching = false;
        draft.currentVisit = {};
        draft.currentJob = {};
        break;
      //TO CLOSE ADD AND EDIT MODEL
      case CLOSE_VISIT_MODEL:
        draft.isVisitModelsOpen = false;
        draft.isVisitModelOpen = false;
        draft.isViewModelOpen = false;
        draft.isVisitSubmiting = false;
        draft.jobVisitStatus = null;
        draft.isJobVisitEditing = false;
        draft.isJobVisitFetching = false;
        draft.currentVisit = {};
        draft.currentJob = {};
        break;

      // TO CLOSE THE RESCHEDULE MODEL
      case CLOSE_VISIT_DETAIL_MODEL:
        draft.isVisitModelsOpen = false;
        draft.isVisitModelOpen = false;
        draft.isViewModelOpen = false;
        draft.isVisitSubmiting = false;
        draft.jobVisitStatus = null;
        draft.isJobVisitEditing = false;
        draft.isJobVisitFetching = false;
        draft.currentVisit = {};
        draft.currentJob = {};
        break;

      // TO CLOSE THE VIEW MODEL
      case CLOSE_VIEW_VISIT_DETAIL_MODEL:
        // draft.isVisitModelsOpen = false;
        // draft.isVisitModelOpen = false;
        // draft.isViewModelOpen = false;
        draft.viewVisitDetail = false;
        draft.isVisitSubmiting = false;
        draft.jobVisitStatus = null;
        draft.isJobVisitEditing = false;
        draft.isJobVisitFetching = false;
        draft.currentVisit = null;
        // draft.currentJob = {};
        // draft.isVisitModelsOpen = true;
        //  draft.isVisitModelOpen = false;
        draft.isFetching = false;
        break;

      case OPEN_ADD_VISIT_MODEL:
        draft.isVisitModelOpen = true;
        draft.isViewModelOpen = false;
        draft.jobVisitStatus = action.payload.status;
        draft.currentJob = action.payload?.job;
        draft.isDeleteModalOpen = false;
        draft.rejectingVisitDetails = {};
        break;
      case OPEN_VIEW_VISIT_DETAIL_MODEL:
        // visit detail model open
        draft.isViewModelOpen = true;
        draft.viewVisitDetail = true;
        draft.isJobVisitEditing = true;
        draft.isJobVisitFetching = true;
        draft.jobVisitStatus = action.payload.status;
        draft.currentVisit = action.payload.data;

        break;
      // ALL VISITS DETAILS MODELS
      case OPEN_ADD_VISIT_MODELS:
        draft.isVisitModelsOpen = true;
        draft.visits = action.payload?.data;
        draft.isJobVisitFetching = true;
        draft.isJobVisitEditing = true;
        draft.jobVisitStatus = action.payload.status;
        draft.currentJob = action.payload?.job;
        break;
      case OPEN_EDIT_VISIT_MODEL:
        draft.isVisitModelsOpen = false;
        draft.isVisitModelOpen = true;
        draft.currentVisit = action.payload.data;
        draft.visits = action.payload?.data;
        draft.isJobVisitEditing = true;
        draft.isJobVisitFetching = true;
        draft.jobVisitStatus = action.payload.status;
        //  draft.currentJob = action.payload?.job;

        break;

      case REJECT_JOB_VISIT:
        draft.isVisitModelOpen = false;
        draft.isVisitSubmiting = false;
        draft.jobVisitStatus = action.payload?.status;
        break;

      case VISITS_SET_ENGINEERS:
        draft.engineers = action.payload.data;
        break;
      //SEE THE LIST OF VISITS
      case VISITS_SET_LISTING:
        draft.visits = action.payload.data;
        draft.isJobVisitFetching = false;
        break;
      case VISITS_SET_LISTINGS:
        draft.visits = action.payload.data;
        draft.isJobVisitFetching = false;
        break;

      case VISITS_CLOSE_DELETE_MODAL:
        draft.isDeleteModalOpen = false;
        draft.rejectingVisitDetails = {};
        break;

      case VISITS_OPEN_DELETE_MODAL:
        draft.isDeleteModalOpen = true;
        draft.rejectingVisitDetails = action.payload;
        break;

      case SET_CURRENT_VISIT:
        draft.currentVisit = action.payload.data;
        break;
      case GET_VISIT_DETAIL:
        draft.currentVisit = action.payload.data;
        break;
      case VISITS_START_LISTINGS:
        draft.currentVisit = action.payload.data;

        break;

      case VISITS_START_LIST:
        draft.currentVisit = action.payload.data;

        break;
      // case OPEN_VISIT_LISTING_MODEL:
      //   draft.visitListingModel = true;
      //   break;

      // case CLOSE_VISIT_LISTING_MODEL:
      //   draft.visitListingModel = false;
      //   break;

      // case OPEN_VIEW_VISIT_DETAIL_MODEL:
      //   draft.viewVisitDetail = true;
      //   break;

      // case CLOSE_VIEW_VISIT_DETAIL_MODEL:
      //   draft.viewVisitDetail = false;
      //   break;

      // case OPEN_RESCHEDULE_VISIT_MODEL:
      //   draft.resceduleModel = true;
      //   break;

      // case CLOSE_RESCHEDULE_VISIT_MODEL:
      //   draft.resceduleModel = false;
      //   break;
      default:
        return state;
    }
  });
};
export default JobReducer;
