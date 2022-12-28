/* eslint-disable camelcase */
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import api from "../../utils/api";
import {
  setTradersListing,
  getTradersListing as getTradersListingAction,
  setContractorsPostcodeListing,
  getContractorsPostcodeListing,
  traderSubmitSuccess,
  traderSubmitFailure,
  deleteTraderSuccess,
  deleteTraderFailure,
  closeDeleteModal,
  deletePostcodeSuccess,
  deletePostcodeFailure,
  setContractorDetail,
  setContractor,
  closeDocumentUploadModal,
  getContractorDocumentsListing,
  setContractorDocumentsListing,
  closeDocumentDeleteModal,
  closeDocumentEditModal,
  getSkillsContractor,
  getSkillsContractorSuccess,
  getSkillsContractorFailure,
  getTradersAdminListSuccess,
  getTradersAdminListFailure,
  getTradersAdminList,
  deleteTraderAdminSuccess,
  deleteTraderAdminFailure,
  addTraderAdminSuccess,
  addTraderAdminFailure,
  traderAdminFetchSuccess,
  traderAdminFetchFailure,
  editTraderAdminSuccess,
  editTraderAdminFailure,
  //
  setStaffListing,
  staffSubmitSuccess,
  staffSubmitFailure,
  getStaffListing as getStaffListingAction,
  setCategoryListing,
  closeCategoryDeleteModal,
  getCategoryListing as getCategoryListingAction,
  getCategoriesListingSuccess,
  getCategoriesListingFailure,
  //
  categoryEditSuccess,
  categoryEditFailure,
  //
  categorySubmitSuccess,
  categorySubmitFailure,
  //
  getIndividualStaffSuccess,
  getIndividualStaffFailure,
  closeViewAndFetchStaff,
} from "./actions";
import {
  TRADER_START_LISTING,
  CONTRACTORS_DOCUMENT_SET_FILTER,
  CONTRACTORS_DOCUMENT_CLEAR_FILTERS,
  TRADERS_ADD_SUBMIT,
  TRADERS_EDIT_SUBMIT,
  TRADERS_DELETE_SUBMIT,
  TRADERS_ADMIN_DELETE_SUBMIT,
  CONTRACTORS_ADD_POSTCODE,
  CONTRACTORS_POSTCODE_START_LISTING,
  CONTRACTORS_DELETE_POSTCODE,
  CONTRACTORS_POSTCODE_EDIT,
  TRADERS_VIEW_OPEN_AND_FETCH,
  TRADER_CATEGORY_EDIT_SUBMIT,
  TRADER_CATEGORY_ADD_SUBMIT,
  // contractors document upload
  CONTRACTORS_DOCUMENT_START_LISTING,
  CONTRACTORS_DOCUMENT_SUBMIT,
  CONTRACTORS_DOCUMENT_DELETE,
  CONTRACTORS_DOCUMENT_EDIT_SUBMIT,
  CONTRACTORS_FETCH_SKILLS,
  TRADERS_ADMIN_EDIT_OPEN_AND_FETCH,
  TRADERS_ADMIN_EDIT_REQUEST,
  TRADER_ADMIN_LIST_FETCH,
  ADD_TRADERS_ADMIN_REQUEST,
  TRADER_ADMIN_VIEW_MODAL_OPEN,
  // STAF
  TRADER_STAFF_START_LISTING,
  TRADERS_STAFF_ADD_SUBMIT,
  TRADER_CATEGORY_START_LISTING,
  TRADER_CATEGORY_DELETE,
  CATEGORY_START_LISTING,
  TRADERS_STAFF_VIEW_MODAL_OPEN,
} from "./constants";
import { errorAlert, successAlert } from "../Alerts/actions";
import QueryString from "query-string";
import React from "react";

export function* getTradersListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  let query = QueryString.stringify(options);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/traders?${query}`
    );
    if (data) {
      yield put(setTradersListing(data));
      yield put(setContractorsPostcodeListing({}));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert("Error while fetching Contractors!"));
  }
}

export function* getPostcodeListing({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const currentContractorId = yield select(
    (state) => state?.ContractorReducer?.currentContractor
  );
  const id = payload?.id || currentContractorId?.id;
  try {
    if (id) {
      const { data } = yield call(
        api(token).get,
        `/api/trader-postcode-cover/${payload.trader_id}`
      );
      if (data) {
        yield put(setContractorsPostcodeListing(data));
      }
    } else {
      yield put(setContractorsPostcodeListing({}));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching Postcodes!"));
  }
}

export function* traderAdminAdd({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const current_page = yield select(
    (state) => state.ContractorReducer.jobs?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).post,
      `/api/trader-admin/add`,
      payload.data
    );
    yield put(getTradersAdminList(payload.trader_id));
    yield put(addTraderAdminSuccess(data));
    yield put(successAlert("Trader admin added successfully!"));
    // history.push(`/d/traders`);
  } catch (e) {
    yield put(addTraderAdminFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding Trader!"));
  }
}

export function* editTraderAdmin({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const current_page = yield select(
    (state) => state.ContractorReducer.jobs?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).post,
      `/api/trader-admin/edit/${payload.id}`,
      payload.data
    );
    yield put(getTradersAdminList(payload.trader_id));
    yield put(editTraderAdminSuccess(data));
    yield put(successAlert("Trader admin updated successfully!"));
  } catch (e) {
    yield put(editTraderAdminFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while update Trader admin!"));
  }
}

export function* fetchTraderAdmin({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const current_page = yield select(
    (state) => state.ContractorReducer.jobs?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).get,
      `/api/trader-admin/${payload.id}`
    );
    yield put(traderAdminFetchSuccess(data));
    // yield put(successAlert('Trader added successfully!'));
  } catch (e) {
    yield put(traderAdminFetchFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding Trader!"));
  }
}

export function* submitContractorsAdd({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const current_page = yield select(
    (state) => state.ContractorReducer.jobs?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(api(token).post, `/api/traders/add`, payload);
    yield put(setContractorDetail(data));
    yield put(successAlert("Trader added successfully!"));
    history.push(`/d/traders`);
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding Trader!"));
  }
}

export function* submitPostcodeAdd({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const current_page = yield select(
    (state) => state.ContractorReducer.jobs?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const data = yield call(
      api(token).post,
      `/api/trader-postcode-cover/add`,
      payload.payload
    );
    if (data?.message?.length > 0) {
      yield put(errorAlert(data.message.map((msg) => <p>{msg}</p>)));
    } else {
      yield put(successAlert("Postcode added successfully!"));
    }
    yield put(getContractorsPostcodeListing({ trader_id: payload.trader_id }));
    yield put(traderSubmitSuccess());
  } catch (e) {
    yield put(traderSubmitFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding Postcode!"));
  }
}

export function* submitContractorsEdit({ payload }) {
  const token = yield select((state) => state.AuthReducer?.token);
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).post,
      `/api/traders/edit/${payload.id}`,
      payload.data
    );
    yield put(traderSubmitSuccess(data));
    yield put(successAlert("Contractor edited successfully!"));
  } catch (e) {
    yield put(traderSubmitFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while editing Contractor!"));
  }
}

export function* submitPostcodeEdit({ payload }) {
  const token = yield select((state) => state.AuthReducer?.token);
  const current_page = yield select(
    (state) => state.ContractorReducer.engineers?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).post,
      `/api/trader-postcode-cover/edit/${payload.id}`,
      payload.payload
    );
    yield put(successAlert("Postcode edited successfully!"));
    yield put(getContractorsPostcodeListing({ trader_id: payload.trader_id }));
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while editing Postcode!"));
  }
}

export function* deleteTraderAdmin() {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deletingContractorDetails = yield select(
    (state) => state.ContractorReducer.deletingContractorDetails
  );
  const current_page = yield select(
    (state) => state.ContractorReducer.engineers?.current_page
  );
  try {
    const { data } = yield call(
      api(token).delete,
      `/api/trader-admin/${deletingContractorDetails.id}`
    );
    yield put(successAlert("Trader deleted successfully!"));
    yield put(
      getTradersAdminList(`trader_id=${deletingContractorDetails.trader_id}`)
    );
    yield put(closeDeleteModal());
    yield put(deleteTraderAdminSuccess());
  } catch (e) {
    yield put(deleteTraderAdminFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting Trader!"));
  }
}

export function* deleteContractor() {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deletingContractorDetails = yield select(
    (state) => state.ContractorReducer.deletingContractorDetails
  );
  const current_page = yield select(
    (state) => state.ContractorReducer.engineers?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).delete,
      `/api/traders/${deletingContractorDetails.id}`
    );
    yield put(successAlert("Trader deleted successfully!"));
    yield put(getTradersListingAction({ page: current_page }));
    yield put(closeDeleteModal());
    yield put(deleteTraderSuccess());
  } catch (e) {
    yield put(deleteTraderFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting Trader!"));
  }
}

export function* deletePostcode() {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deletingContractorDetails = yield select(
    (state) => state.ContractorReducer.deletingContractorDetails
  );
  const current_page = yield select(
    (state) => state.ContractorReducer.engineers?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).delete,
      `/api/trader-postcode-cover/${deletingContractorDetails.id}`
    );
    yield put(successAlert("Postcode deleted successfully!"));
    // yield put(getContractorsPostcodeListingAction({ page: current_page }));
    yield put(
      getContractorsPostcodeListing({
        trader_id: deletingContractorDetails.trader_id,
      })
    );
    yield put(closeDeleteModal());
    yield put(deletePostcodeSuccess());
  } catch (e) {
    yield put(deletePostcodeFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting Postcode!"));
  }
}

export function* openContractorsView({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(api(token).get, `/api/traders/${payload.id}`);
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

export function* getContractorDocumentsListingSaga({ payload }) {
  const { ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  const contractorId = yield select(
    (state) => state?.ContractorReducer?.currentContractor.id
  );

  const query = QueryString.stringify(options);

  try {
    const { data } = yield call(
      api(token).get,
      `/api/contractors/${contractorId}/documents?${query}`
    );
    if (data) {
      yield put(setContractorDocumentsListing(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while Fetching Document!"));
  }
}

export function* submitContractorDocument({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const contractorId = yield select(
    (state) => state?.ContractorReducer?.currentContractor.id
  );

  try {
    const { data } = yield call(
      api(token).post,
      `/api/contractors/${contractorId}/documents/upload`,
      payload
    );
    yield put(closeDocumentUploadModal());
    yield put(getContractorDocumentsListing({ contractorId }));
    yield put(successAlert("Documents Uploaded successfully !"));
  } catch (e) {
    yield put(closeDocumentUploadModal());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while Uploading Document!"));
  }
}

export function* submitEditContractorDocument({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const documentId = yield select(
    (state) => state?.ContractorReducer?.editingDocument.id
  );
  const contractorId = yield select(
    (state) => state?.ContractorReducer?.currentContractor.id
  );
  try {
    const { data } = yield call(
      api(token).post,
      `/api/trader-staff/edit/${documentId}`,
      payload
    );
    yield put(closeDocumentEditModal());
    yield put(getStaffListingAction(`trader_id=${payload.trader_id}`));
    yield put(successAlert("Staff Details Upadated successfully !"));
    yield put(closeViewAndFetchStaff());
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while Updating Staff Details!"));
  }
}

export function* deleteContractorDocument({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const documentId = yield select(
    (state) => state?.ContractorReducer?.deletingDocument.id
  );
  const contractorId = yield select(
    (state) => state?.ContractorReducer?.currentContractor.id
  );
  try {
    const { data } = yield call(
      api(token).delete,
      `/api/trader-staff/${documentId}`
    );
    yield put(closeDocumentDeleteModal());
    yield put(getStaffListingAction());
    yield put(successAlert("Staff Deleted successfully !"));
    yield put(setStaffListing());
  } catch (e) {
    yield put(closeDocumentDeleteModal());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
  }
}

export function* getTraderAdminList({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/trader-admin?${payload}`
    );
    if (data) {
      yield put(getTradersAdminListSuccess(data));
    }
  } catch (e) {
    yield put(getTradersAdminListFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert("Error while fetching Trader admin list!"));
  }
}

export function* getSkills({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/skills?all=true`
    );
    if (data) {
      yield put(getSkillsContractorSuccess(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert("Error while fetching Skills!"));
  }
}

export function* getStaffListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  console.log("payload", payload);
  const token = yield select((state) => state?.AuthReducer?.token);
  let query = QueryString.stringify(options);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/trader-staff?${payload}`
    );
    if (data) {
      yield put(setStaffListing(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert("Error while fetching Staff!"));
  }
}

export function* submitStaffAdd({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const current_page = yield select(
    (state) => state.ContractorReducer.jobs?.current_page
  );
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).post,
      `/api/trader-staff/add`,
      payload
    );
    yield put(staffSubmitSuccess(data));
    yield put(successAlert("Staff added successfully!"));
    yield put(getStaffListingAction(`trader_id=${payload.trader_id}`));
    // history.push(`/d/traders`);
  } catch (e) {
    yield put(staffSubmitFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding Staff!"));
  }
}

export function* getCategoryListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  let query = QueryString.stringify(options);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/trader-category`
    );
    if (data) {
      yield put(setCategoryListing(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    // else if (e.message !== undefined)
    //   yield put(errorAlert('Error while fetching Category!'));
  }
}

export function* deleteCategory({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const categoryId = yield select(
    (state) => state?.ContractorReducer?.deletingCategory.id
  );
  try {
    const { data } = yield call(
      api(token).delete,
      `/api/trader-category/${categoryId}`
    );
    yield put(closeCategoryDeleteModal());
    yield put(getCategoryListingAction());
    yield put(successAlert("Category Deleted successfully !"));
  } catch (e) {
    yield put(closeCategoryDeleteModal());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
  }
}

export function* getCategoriesList({ payload = { cancelToken: null } }) {
  const { cancelToken } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(api(token).get, `api/categories?all=true`);
    yield put(getCategoriesListingSuccess(data));
  } catch (e) {
    yield put(getCategoriesListingFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert("Error while fetching Categories!"));
  }
}

export function* submitCategoryAdd({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    // eslint-disable-next-line no-unused-vars
    const data = yield call(
      api(token).post,
      `/api/trader-category/add`,
      payload
    );
    yield put(categorySubmitSuccess(data.data));
    yield put(successAlert("Category added successfully!"));
    yield put(getCategoryListingAction());
  } catch (e) {
    if (e?.response?.data?.code == 404 && e?.response?.data?.error) {
      let err = Object.values(e?.response?.data?.error);
      let error = err.toString();
      yield put(errorAlert(error));
    } else {
      if (typeof e === "string") yield put(errorAlert(e));
      else if (typeof e.error === "string") yield put(errorAlert(e.error));
      else yield put(errorAlert("Error while adding Category!"));
    }
  }
}

export function* submitCategoryEdit({ payload }) {
  console.log("editingpayloadd", payload);
  const token = yield select((state) => state?.AuthReducer?.token);
  const id = payload?.id;
  try {
    const { data } = yield call(
      api(token).post,
      `/api/trader/trader-category/self/edit/${id}`,
      payload.data
    );
    yield put(successAlert("Category Edited successfully !"));
    yield put(getCategoryListingAction());
    yield put(categoryEditSuccess());
  } catch (e) {
    yield put(categoryEditFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
  }
}

export function* getSingleStaff({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).get,
      `/api/trader-staff/${payload.id}`
    );
    yield put(getIndividualStaffSuccess(data));
  } catch (e) {
    yield put(getIndividualStaffFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching staff!"));
  }
}

export function* getTradersListingFlow() {
  yield takeEvery(TRADER_START_LISTING, getTradersListing);
}
export function* submitContractorsAddFlow() {
  yield takeEvery(TRADERS_ADD_SUBMIT, submitContractorsAdd);
}
export function* traderAdminAddFlow() {
  yield takeEvery(ADD_TRADERS_ADMIN_REQUEST, traderAdminAdd);
}
export function* submitContractorsEditFlow() {
  yield takeEvery(TRADERS_EDIT_SUBMIT, submitContractorsEdit);
}
export function* deleteContractorFlow() {
  yield takeEvery(TRADERS_DELETE_SUBMIT, deleteContractor);
}
export function* deleteTraderAdminFlow() {
  yield takeEvery(TRADERS_ADMIN_DELETE_SUBMIT, deleteTraderAdmin);
}
export function* submitPostcodeAddFlow() {
  yield takeEvery(CONTRACTORS_ADD_POSTCODE, submitPostcodeAdd);
}
export function* getPostcodeListingFlow() {
  yield takeEvery(CONTRACTORS_POSTCODE_START_LISTING, getPostcodeListing);
}
export function* deletePostcodeFlow() {
  yield takeEvery(CONTRACTORS_DELETE_POSTCODE, deletePostcode);
}
export function* submitPostcodeEditFlow() {
  yield takeEvery(CONTRACTORS_POSTCODE_EDIT, submitPostcodeEdit);
}
export function* openContractorsViewFlow() {
  yield takeEvery(TRADERS_VIEW_OPEN_AND_FETCH, openContractorsView);
}

export function* submitContractorDocumentFlow() {
  yield takeEvery(CONTRACTORS_DOCUMENT_SUBMIT, submitContractorDocument);
}

export function* getContractorDocumentListingFlow() {
  yield takeEvery(
    CONTRACTORS_DOCUMENT_START_LISTING,
    getContractorDocumentsListingSaga
  );
}

export function* getContractorDocumentClearFilterFlow() {
  yield takeEvery(
    CONTRACTORS_DOCUMENT_CLEAR_FILTERS,
    getContractorDocumentsListingSaga
  );
}

export function* getContractorDocumentSetFilterFlow() {
  yield takeEvery(
    CONTRACTORS_DOCUMENT_SET_FILTER,
    getContractorDocumentsListingSaga
  );
}

export function* submitEditContractorDocumentFlow() {
  yield takeEvery(
    CONTRACTORS_DOCUMENT_EDIT_SUBMIT,
    submitEditContractorDocument
  );
}

export function* deleteContractorDocumentFlow() {
  yield takeEvery(CONTRACTORS_DOCUMENT_DELETE, deleteContractorDocument);
}

export function* getSkillsContractorFlow() {
  yield takeEvery(CONTRACTORS_FETCH_SKILLS, getSkills);
}

export function* editAndFetchTraderAdminFlow() {
  yield takeEvery(TRADERS_ADMIN_EDIT_OPEN_AND_FETCH, fetchTraderAdmin);
}

export function* viewAndFetchTraderAdminFlow() {
  yield takeEvery(TRADER_ADMIN_VIEW_MODAL_OPEN, fetchTraderAdmin);
}

export function* editTraderAdminFlow() {
  yield takeEvery(TRADERS_ADMIN_EDIT_REQUEST, editTraderAdmin);
}

export function* getTraderAdminListFlow() {
  yield takeEvery(TRADER_ADMIN_LIST_FETCH, getTraderAdminList);
}

export function* getStaffListingFlow() {
  yield takeEvery(TRADER_STAFF_START_LISTING, getStaffListing);
}

export function* submitStaffAddFlow() {
  yield takeEvery(TRADERS_STAFF_ADD_SUBMIT, submitStaffAdd);
}

export function* getCategoryListingFlow() {
  yield takeEvery(TRADER_CATEGORY_START_LISTING, getCategoryListing);
}

export function* deleteCategoryFlow() {
  yield takeEvery(TRADER_CATEGORY_DELETE, deleteCategory);
}

export function* getCategoriesListFlow() {
  yield takeEvery(CATEGORY_START_LISTING, getCategoriesList);
}

export function* editCategoryFlow() {
  yield takeEvery(TRADER_CATEGORY_EDIT_SUBMIT, submitCategoryEdit);
}

export function* CategoryAddFlow() {
  yield takeEvery(TRADER_CATEGORY_ADD_SUBMIT, submitCategoryAdd);
}

export function* getSingleStaffFlow() {
  yield takeEvery(TRADERS_STAFF_VIEW_MODAL_OPEN, getSingleStaff);
}

export default function* contractorsSaga() {
  yield all([
    editAndFetchTraderAdminFlow(),
    editTraderAdminFlow(),
    getTradersListingFlow(),
    submitContractorsAddFlow(),
    submitContractorsEditFlow(),
    deleteContractorFlow(),
    submitPostcodeAddFlow(),
    getPostcodeListingFlow(),
    deletePostcodeFlow(),
    submitPostcodeEditFlow(),
    openContractorsViewFlow(),
    submitContractorDocumentFlow(),
    deleteContractorDocumentFlow(),
    getContractorDocumentListingFlow(),
    submitEditContractorDocumentFlow(),
    getContractorDocumentClearFilterFlow(),
    getContractorDocumentSetFilterFlow(),
    getSkillsContractorFlow(),
    getTraderAdminListFlow(),
    deleteTraderAdminFlow(),
    traderAdminAddFlow(),
    viewAndFetchTraderAdminFlow(),
    getStaffListingFlow(),
    submitStaffAddFlow(),
    getCategoryListingFlow(),
    deleteCategoryFlow(),
    getCategoriesListFlow(),
    CategoryAddFlow(),
    editCategoryFlow(),
    getSingleStaffFlow(),
  ]);
}
