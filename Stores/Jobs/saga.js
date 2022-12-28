import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_JOBS,
  JOBS_GET_FILTER_DATA,
  GET_JOBS_VISITS,
  GET_JOBS_COSTS,
  GET_JOBS_TRIAGES,
  JOBS_DELETE_NOTE,
  JOBS_EDIT_NOTE,
  JOBS_ADD_NOTE,
  JOBS_GET_NOTES,
  JOBS_SAVE_TRIAGE,
  JOBS_VIEW_OPEN_AND_FETCH,
  JOBS_EDIT_SUBMIT,
  ADD_JOB_VISIT,
  VISITS_GET_ENGINEERS,
  VISITS_GET_JOB,
  VISITS_SET_JOB,
  VISITS_GET_JOB_FAILURE,
  VISITS_START_LISTING,
  VISITS_START_LISTINGS,
  VISITS_START_LIST,
  VISITS_SET_LISTING,
  VISITS_SET_LISTINGS,
  VISITS_GET_LISTING_FAILURE,
  REJECT_JOB_VISIT,
  GET_VISIT_DETAIL,
} from "./constants";
import { successAlert, errorAlert } from "../Alerts/actions";
import {
  getJobsSuccess,
  getJobsFailure,
  getJobsPending,
  getFilterDataSuccess,
  getFilterDataFailure,
  getJobsVisitsSuccess,
  getJobsVisitsFailure,
  getJobsVisitsPending,
  getJobsCostsSuccess,
  getJobsCostsFailure,
  getJobsCostsPending,
  getJobsTriagesSuccess,
  getJobsTriagesFailure,
  getJobsTriagesPending,
  jobsSaveTriageSuccess,
  jobsSaveTriageFailure,
  // notes actions
  jobsGetNotes as jobsGetNotesAction,
  jobsGetNotesSuccess,
  jobsGetNotesFailure,
  jobsDeleteNoteSuccess,
  jobsDeleteNoteFailure,
  jobsEditNoteSuccess,
  jobsEditNoteFailure,
  jobsAddNoteSuccess,
  jobsAddNoteFailure,
  setJob,
  getJobs as getJobsListingAction,
  submitJobEditSuccess,
  submitJobEditFailure,
  addJobVisitPending,
  setEngineers,
  setVisitListing,
  setVisitListingDetails,
  setJobForVisit,
  getVisitListingFailure,
  addJobVisitSuccess,
  addJobVisitFailure,
  setCurrentVisit,
} from "./actions";
import moment from "moment";
import api from "../../utils/api";
import QueryString from "query-string";

export function* getJobs({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;

  const token = yield select((state) => state?.AuthReducer?.token);
  yield put(getJobsPending({ isJobLoading: true }));
  const filters = yield select((state) => state?.JobReducer?.filters);
  const fields = ["status", "postcode"];
  let _filters = {};
  fields.forEach((key) => {
    if (filters[key]) _filters[key] = filters[key];
  });
  if (Array.isArray(filters.filterDateRange)) {
    const [fromDate, toDate] = filters.filterDateRange;
    _filters = {
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      ..._filters,
    };
  }
  let query = "";
  query = QueryString.stringify({ ...options, ..._filters });
  try {
    const jobsResponse = yield call(
      api(token, cancelToken).get,
      `/api/contractors/jobs?${query}`
    );
    if (
      jobsResponse.code >= 200 &&
      jobsResponse.code <= 300 &&
      jobsResponse.status === "success"
    ) {
      yield put(getJobsSuccess({ jobs: jobsResponse.data }));
    } else {
      yield put(errorAlert("Error while retrieving roles!"));
      yield put(getJobsFailure({ error: jobsResponse.message }));
    }
  } catch (e) {
    console.log(e);
    yield put(getJobsFailure({ error: e }));
  }
}

export function* getJobsVisits({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  yield put(getJobsVisitsPending({ isVisitLoading: true }));
  try {
    const visitsResponse = yield call(
      api(token).get,
      `/api/jobs/${payload.id}/visits`
    );
    if (
      visitsResponse.code >= 200 &&
      visitsResponse.code <= 300 &&
      visitsResponse.status === "success"
    ) {
      yield put(getJobsVisitsSuccess({ visits: visitsResponse.data }));
    } else {
      yield put(errorAlert("Error while retrieving jobs visits!"));
      yield put(getJobsVisitsFailure({ error: visitsResponse.message }));
    }
  } catch (e) {
    console.log(e);
    yield put(getJobsVisitsFailure({ error: e }));
  }
}

export function* getJobsCosts({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  yield put(getJobsCostsPending({ isCostLoading: true }));
  try {
    const costsResponse = yield call(
      api(token).get,
      `/api/jobs/${payload.id}/job-costs`
    );
    if (
      costsResponse.code >= 200 &&
      costsResponse.code <= 300 &&
      costsResponse.status === "success"
    ) {
      yield put(getJobsCostsSuccess({ costs: costsResponse.data }));
    } else {
      yield put(errorAlert("Error while retrieving jobs costs!"));
      yield put(getJobsCostsFailure({ error: costsResponse.message }));
    }
  } catch (e) {
    console.log(e);
    yield put(getJobsCostsFailure({ error: e }));
  }
}

export function* getJobsTriages({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  yield put(getJobsTriagesPending({ isCostLoading: true }));
  try {
    const triagesResponse = yield call(
      api(token).get,
      `/api/jobs/${payload.id}/triages?all=true`
    );
    if (
      triagesResponse.code >= 200 &&
      triagesResponse.code <= 300 &&
      triagesResponse.status === "success"
    ) {
      yield put(getJobsTriagesSuccess({ triages: triagesResponse.data }));
    } else {
      yield put(errorAlert("Error while retrieving jobs triages!"));
      yield put(getJobsTriagesFailure({ error: triagesResponse.message }));
    }
  } catch (e) {
    console.log(e);
    yield put(getJobsTriagesFailure({ error: e }));
  }
}

const formatDate = (date) => moment(date).format("DD-MM-YYYY");

// Get Filter's jobs data from API
export function* getFilterData() {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(api(token).get, `/api/jobs/filter`);
    yield put(getFilterDataSuccess(data));
  } catch (e) {
    yield put(getFilterDataFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching filter data!"));
  }
}

export function* jobsGetNotes({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).get,
      `/api/jobs/${payload?.jobId}/notes?all=true`
    );
    yield put(jobsGetNotesSuccess(data));
  } catch (e) {
    yield put(jobsGetNotesFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching notes!"));
  }
}

export function* jobsAddNote({ payload, postSuccess }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      `/api/jobs/${payload.jobId}/notes/add`,
      payload
    );
    yield put(jobsAddNoteSuccess(data));
    if (postSuccess) postSuccess();
    yield put(jobsGetNotesAction({ jobId: payload.jobId }));
  } catch (e) {
    yield put(jobsAddNoteFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding note!"));
  }
}

export function* jobsSaveTriage({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const URL = `/api/jobs/${payload.id}/triages/save`;
    const { data } = yield call(api(token).post, URL, payload.payload);
    yield put(jobsSaveTriageSuccess(data));
    yield put(successAlert("Triage saved successfully!"));
  } catch (e) {
    yield put(jobsSaveTriageFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while editing triage!"));
  }
}

export function* jobsEditNote({ payload, postSuccess }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      `/api/jobs/notes/edit/${payload.id}`,
      payload
    );
    yield put(jobsEditNoteSuccess(data));
    if (postSuccess) postSuccess();
    yield put(jobsGetNotesAction({ jobId: data.job_id }));
  } catch (e) {
    yield put(jobsEditNoteFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while editing note!"));
  }
}

export function* jobsDeleteNote({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).delete,
      `/api/jobs/notes/${payload.id}`
    );
    yield put(jobsDeleteNoteSuccess(data));
    yield put(jobsGetNotesAction({ jobId: payload.job_id }));
  } catch (e) {
    yield put(jobsDeleteNoteFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting note!"));
  }
}

export function* openJobsView({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(api(token).get, `/api/jobs/${payload?.id}`);
    if (data && data.id) {
      yield put(setJob(data));
    }
  } catch (e) {
    yield put(setJob(null));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching Job!"));
  }
}

export function* submitJobEdit({ payload }) {
  const token = yield select((state) => state.AuthReducer?.token);
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).post,
      `/api/jobs/change-status`,
      payload
    );
    yield put(getJobsListingAction());
    yield put(successAlert("Job updated successfully!"));
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while editing Job!"));
  }
}

export function* assignJobVisit({ payload }) {
  const token = yield select((state) => state.AuthReducer?.token);
  yield put(addJobVisitPending());
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).post,
      `/api/jobs/status-visit/edit/${payload.job_id}`,
      payload
    );

    yield put(addJobVisitSuccess(data));
    yield put(getJobsListingAction());
    if (payload.status === "allocated") {
      yield put(successAlert("Job visit updated successfully!"));
    } else if (payload.status === "rejected") {
      yield put(successAlert("Job visit Rejected successfully!"));
    }
  } catch (e) {
    yield put(addJobVisitFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while updating Job visit! "));
  }
}

export function* getEngineersFromContractor({
  payload = { cancelToken: null },
}) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  let query = QueryString.stringify(options);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `api/contractors/engineers?${query}&&activated=true`
    );
    if (data) {
      yield put(setEngineers(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Unable to get Engineers"));
  }
}

export function* getVisitListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const job = yield select((state) => state?.JobReducer?.currentJob);
  const token = yield select((state) => state?.AuthReducer?.token);

  const id = payload.id || job?.id;

  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/jobs/${id}/visits`
    );
    if (data) {
      yield put(setVisitListing(data));

      // try {
      //   const visitDetails = yield call(
      //     api(token, cancelToken).get,
      //      `/api/jobs/visits/${data?.data[0]?.id}/details`

      //   );
      //   if (visitDetails) {
      //     yield put(setCurrentVisit(visitDetails));
      //   }
      // } catch (e) {
      //   yield put(getVisitListingFailure());
      //   if (typeof e === "string") yield put(errorAlert(e));
      //   else if (typeof e.error === "string") yield put(errorAlert(e.error));
      //   else yield put(errorAlert("Error while fetching Visit details!"));
      // }
    }
  } catch (e) {
    yield put(getVisitListingFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching Visits!"));
  }
}

export function* getVisitListingDetails({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  const id = payload.visit_id;

  try {
    const visitDetails = yield call(
      api(token, cancelToken).get,
      `/api/jobs/visits/${id}/details`
    );
    if (visitDetails) {
      yield put(setCurrentVisit(visitDetails));
    }
  } catch (e) {
    yield put(getVisitListingFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching Visit details!"));
  }
}

// export function* getVisitListingDetail({ payload }) {
//   const { cancelToken, ...options } = payload;
//   const job = yield select((state) => state?.JobReducer?.currentJob);
//   const token = yield select((state) => state?.AuthReducer?.token);
//   const id = payload.id || job?.id;
//   //const id = payload.visit_id;
//   //try {
//   // const { data } = yield call(
//   //   api(token, cancelToken).get,
//   //   `/api/jobs/${id}/visits`
//   // );
//   // if (data) {
//   //yield put(setVisitListing(data));

//   try {
//     const visitDetails = yield call(
//       api(token, cancelToken).get,
//       `/api/jobs/visits/${id}/details`
//     );
//     if (visitDetails) {
//       yield put(setCurrentVisit(visitDetails));
//     }
//   } catch (e) {
//     yield put(getVisitListingFailure());
//     if (typeof e === "string") yield put(errorAlert(e));
//     else if (typeof e.error === "string") yield put(errorAlert(e.error));
//     else yield put(errorAlert("Error while fetching Visit details!"));
//   }
//   // }
//   //} catch (e) {
//   //   yield put(getVisitListingFailure());
//   //   if (typeof e === "string") yield put(errorAlert(e));
//   //   else if (typeof e.error === "string") yield put(errorAlert(e.error));
//   //   else yield put(errorAlert("Error while fetching Visits!"));
//   // }
// }

export function* getVisitListingFlow() {
  yield takeEvery(VISITS_START_LISTING, getVisitListing);
}

export function* getEngineerFlow() {
  yield takeEvery(VISITS_GET_ENGINEERS, getEngineersFromContractor);
}

// Set watcher for Getting jobs list from server
export function* watchGetJobs() {
  yield takeEvery(GET_JOBS, getJobs);
}

// Action watcher for getting jobs filter data.
export function* getFilterDataFlow() {
  yield takeEvery(JOBS_GET_FILTER_DATA, getFilterData);
}

// Set watcher for Getting jobs list from server
export function* watchGetJobsVisits() {
  yield takeEvery(GET_JOBS_VISITS, getJobsVisits);
}

// Set watcher for Getting jobs list from server
export function* watchGetJobsCosts() {
  yield takeEvery(GET_JOBS_COSTS, getJobsCosts);
}

// Set watcher for Getting jobs list from server
export function* watchGetJobsTriages() {
  yield takeEvery(GET_JOBS_TRIAGES, getJobsTriages);
}

// Set watcher for Getting jobs notes from server
export function* jobsGetNotesFlow() {
  yield takeEvery(JOBS_GET_NOTES, jobsGetNotes);
}

// Set watcher for Adding jobs notes from server
export function* jobsAddNoteFlow() {
  yield takeEvery(JOBS_ADD_NOTE, jobsAddNote);
}

// Set watcher for Editing jobs note from server
export function* jobsEditNoteFlow() {
  yield takeEvery(JOBS_EDIT_NOTE, jobsEditNote);
}

// Set watcher for Deleting jobs note from server
export function* jobsDeleteNoteFlow() {
  yield takeEvery(JOBS_DELETE_NOTE, jobsDeleteNote);
}

// Set watcher for Saving jobs triage from server
export function* jobsSaveTriageFlow() {
  yield takeEvery(JOBS_SAVE_TRIAGE, jobsSaveTriage);
}

// Set watcher for Getting job from server
export function* openJobsViewFlow() {
  yield takeEvery(JOBS_VIEW_OPEN_AND_FETCH, openJobsView);
}

export function* submitJobEditFlow() {
  yield takeEvery(JOBS_EDIT_SUBMIT, submitJobEdit);
}

export function* assignJobVisitFlow() {
  yield takeEvery(ADD_JOB_VISIT, assignJobVisit);
  // yield takeEvery(REJECT_JOB_VISIT, assignJobVisit);
}

export function* getVisitDetailFlow() {
  yield takeEvery(VISITS_START_LISTINGS, getVisitListingDetails);
}
// export function* getVisitDetailFlows() {
//   yield takeEvery(VISITS_START_LIST, getVisitListingDetail);
// }

export default function* jobsSaga() {
  yield all([
    watchGetJobs(),
    getFilterDataFlow(),
    watchGetJobsVisits(),
    watchGetJobsCosts(),
    watchGetJobsTriages(),
    jobsGetNotesFlow(),
    jobsAddNoteFlow(),
    jobsEditNoteFlow(),
    jobsDeleteNoteFlow(),
    jobsSaveTriageFlow(),
    openJobsViewFlow(),
    submitJobEditFlow(),
    getEngineerFlow(),
    getVisitListingFlow(),
    assignJobVisitFlow(),
    getVisitDetailFlow(),
    // getVisitDetailFlows(),
  ]);
}
