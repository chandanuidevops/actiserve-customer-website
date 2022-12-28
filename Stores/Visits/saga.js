import { all, call, put, select, takeEvery } from "redux-saga/effects";

import {
  VISITS_ADD,
  VISITS_EDIT,
  VISITS_GET_JOB,
  VISITS_GET_SKILL,
  VISITS_DELETE_SUBMIT,
  VISITS_GET_ENGINEERS,
  VISITS_START_LISTING,
  VISITS_CLEAR_FILTERS,
  VISITS_GET_ASSIGN_VISIT,
  VISITS_CONTRACTORS_VIEW_OPEN_AND_FETCH,
} from "./constants";

import {
  getVisitListing as getVisitListingAction,
  setSkills,
  setEngineers,
  setVisitListing,
  setJobForVisit,
  setCurrentVisit,
  getVisitFailure,
  visitSubmitSuccess,
  visitSubmitFailure,
  getVisitListingFailure,
  getJobForVisitFailure,
  visitDeleteModalClose,
  visitDeleteSubmitSuccess,
  visitDeleteSubmitFailure,
  setContractor,
} from "./actions";

import api from "../../utils/api";
import moment from "moment";
import QueryString from "query-string";
import { errorAlert, successAlert } from "../Alerts/actions";

const formatDate = (date) => moment(date).format("DD-MM-YYYY");

export function* getSkills({ payload = { cancelToken: null } }) {
  const { cancelToken, jobId, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/skills?all=true`
    );
    if (data) {
      yield put(setSkills(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Unable to get Skills"));
  }
}

export function* getEngineersFromContractor({
  payload = { cancelToken: null },
}) {
  const { cancelToken, contractorId, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/engineers?all=true&contractorId=${contractorId}`
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

export function* getJobForVisit({ payload = { cancelToken: null } }) {
  const { cancelToken, jobId, ...options } = payload;

  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/jobs/${jobId}/`
    );
    if (data) {
      yield put(setJobForVisit(data));
    }
  } catch (e) {
    yield put(getJobForVisitFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Invalid Job specified"));
  }
}

export function* getCurrentVisit({ payload }) {
  const { visitId } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const { data } = yield call(
      api(token).get,
      `/api/jobs/visit-assign/${visitId}`
    );
    if (data) {
      yield put(setCurrentVisit(data));
    }
  } catch (e) {
    yield put(getVisitFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Invalid Visit specified"));
  }
}

export function* getVisitListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const job = yield select((state) => state?.JobReducer?.currentJob);
  const token = yield select((state) => state?.AuthReducer?.token);
  const dateFilter = yield select(
    (state) => state.VisitReducer.filterDateRange
  );
  const id = payload.id || job?.id;

  let query = "";

  if (dateFilter?.length > 0 && dateFilter !== null)
    query = QueryString.stringify({
      ...options,
      fromDate: formatDate(dateFilter[0]),
      toDate: formatDate(dateFilter[1]),
    });
  else query = QueryString.stringify(options);

  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/jobs/${id}/visits?${query}`
    );
    if (data) {
      yield put(setVisitListing(data));
      yield put(setJobForVisit(job));
    }
  } catch (e) {
    yield put(getVisitListingFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching Visits!"));
  }
}

export function* submitVisitAdd({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const job = yield select((state) => state?.VisitReducer?.job);
  const { visitAssign, history } = payload;
  try {
    const { data } = yield call(
      api(token).post,
      `/api/jobs/${job.id}/visit-assign`,
      visitAssign
    );
    yield put(successAlert("Visit added successfully!"));
    yield put(visitSubmitSuccess(data));
    history.push(`/d/jobs/${job.id}/visits`);
  } catch (e) {
    yield put(visitSubmitFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding Visit!"));
  }
}

export function* submitEditVisit({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const visitId = yield select(
    (state) => state?.VisitReducer?.currentVisit?.id
  );

  try {
    const { data } = yield call(
      api(token).post,
      `/api/jobs/visit-assign/edit/${visitId}`,
      payload
    );
    yield put(successAlert("Visit edited successfully!"));
    if (data) {
      yield put(visitSubmitSuccess(data));
    }
  } catch (e) {
    yield put(visitSubmitFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Invalid Visit specified"));
  }
}

export function* deleteVisit() {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deleteVisitDetils = yield select(
    (state) => state.VisitReducer?.deletingVisitDetails
  );
  const current_page = yield select(
    (state) => state.VisitReducer.visits?.current_page
  );

  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).delete,
      `/api/jobs/visit-assign/${deleteVisitDetils.id}`
    );
    yield put(successAlert("Visits deleted successfully!"));
    yield put(visitDeleteModalClose());
    yield put(visitDeleteSubmitSuccess());
    yield put(getVisitListingAction({ page: current_page }));
  } catch (e) {
    yield put(visitDeleteSubmitFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting Visit!"));
  }
}

export function* openContractorsView({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).get,
      `/api/contractors/${payload.id}`
    );
    if (data && data.id) {
      yield put(setContractor(data));
    }
  } catch (e) {
    yield put(setContractor(null));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching Job!"));
  }
}

export function* submitVisitFlow() {
  yield takeEvery(VISITS_ADD, submitVisitAdd);
}

export function* submitEditVisitFlow() {
  yield takeEvery(VISITS_EDIT, submitEditVisit);
}

export function* getJobForVisitFlow() {
  yield takeEvery(VISITS_GET_JOB, getJobForVisit);
}

export function* getSkillsFlow() {
  yield takeEvery(VISITS_GET_SKILL, getSkills);
}

export function* getVisitListingFlow() {
  yield takeEvery(VISITS_START_LISTING, getVisitListing);
}

export function* clearFiltersFlow() {
  yield takeEvery(VISITS_CLEAR_FILTERS, getVisitListing);
}

export function* getEngineerFlow() {
  yield takeEvery(VISITS_GET_ENGINEERS, getEngineersFromContractor);
}

export function* getCurrentVisitFlow() {
  yield takeEvery(VISITS_GET_ASSIGN_VISIT, getCurrentVisit);
}

export function* deleteVisitAssignFlow() {
  yield takeEvery(VISITS_DELETE_SUBMIT, deleteVisit);
}

export function* openContractorsViewFlow() {
  yield takeEvery(VISITS_CONTRACTORS_VIEW_OPEN_AND_FETCH, openContractorsView);
}

export default function* visitSaga() {
  yield all([
    clearFiltersFlow(),
    getSkillsFlow(),
    getEngineerFlow(),
    getJobForVisitFlow(),
    getVisitListingFlow(),
    getCurrentVisitFlow(),
    submitVisitFlow(),
    submitEditVisitFlow(),
    deleteVisitAssignFlow(),
    openContractorsViewFlow(),
  ]);
}
