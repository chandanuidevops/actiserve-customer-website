/*
 *
 * Contractors actions
 *
 */

import {
  //TRADER ADMIN MODAL
  TRADER_ADMIN_ADD_MODAL_OPEN,
  TRADER_ADMIN_ADD_MODAL_CLOSE,
  TRADER_ADMIN_EDIT_MODAL_OPEN,
  TRADER_ADMIN_EDIT_MODAL_CLOSE,
  TRADER_ADMIN_VIEW_MODAL_OPEN,
  TRADER_ADMIN_VIEW_MODAL_CLOSE,
  ADD_TRADERS_ADMIN_REQUEST,
  ADD_TRADERS_ADMIN_SUCCESS,
  ADD_TRADERS_ADMIN_FAILURE,

  //TRADER ADMIN LISTING
  TRADER_ADMIN_LIST_FETCH,
  TRADER_ADMIN_LIST_FETCH_SUCCESS,
  TRADER_ADMIN_LIST_FETCH_FAILURE,

  // TRADER LISTING
  TRADER_START_LISTING,
  TRADER_SET_LISTING,
  // DELETE
  TRADERS_OPEN_DELETE_MODAL,
  TRADERS_CLOSE_DELETE_MODAL,
  // ADD
  TRADERS_ADD_SUBMIT,
  TRADERS_SUBMIT_SUCCESS,
  TRADERS_SUBMIT_FAILURE,
  // EDIT FETCH
  TRADERS_VIEW_OPEN_AND_FETCH,
  TRADERS_EDIT_SUBMIT,
  // DELETE SUBMIT
  TRADERS_DELETE_SUBMIT,
  TRADERS_DELETE_SUBMIT_SUCCESS,
  TRADERS_DELETE_SUBMIT_FAILURE,
  CONTRACTORS_POSTCODE_START_LISTING,
  CONTRACTORS_POSTCODE_SET_LISTING,
  CONTRACTORS_GET_FILTER_DATA,
  CONTRACTORS_GET_FILTER_DATA_SUCCESS,
  CONTRACTORS_GET_FILTER_DATA_FAILURE,
  CONTRACTORS_ADD_POSTCODE,
  CONTRACTORS_POSTCODE_SUCCESS,
  CONTRACTORS_POSTCODE_FAILURE,
  CONTRACTORS_DELETE_POSTCODE,
  CONTRACTORS_DELETE_POSTCODE_SUCCESS,
  CONTRACTORS_DELETE_POSTCODE_FAILURE,
  CONTRACTORS_POSTCODE_EDIT,
  CONTRACTORS_SET_DATA,
  CONTRACTORS_SET_JOB,

  // constants for document upload
  CONTRACTORS_DOCUMENT_SUBMIT,
  CONTRACTORS_ADD_DOCUMENT_MODAL_OPEN,
  CONTRACTORS_ADD_DOCUMENT_MODAL_CLOSE,
  CONTRACTORS_DELETE_DOCUMENT_MODAL_OPEN,
  CONTRACTORS_DELETE_DOCUMENT_MODAL_CLOSE,
  CONTRACTORS_EDIT_DOCUMENT_MODAL_OPEN,
  CONTRACTORS_EDIT_DOCUMENT_MODAL_CLOSE,
  CONTRACTORS_DOCUMENT_DELETE,
  CONTRACTORS_DOCUMENT_SET_LISTING,
  CONTRACTORS_DOCUMENT_START_LISTING,
  CONTRACTORS_DOCUMENT_EDIT_SUBMIT,
  CONTRACTORS_DOCUMENT_SET_FILTER,
  CONTRACTORS_DOCUMENT_CLEAR_FILTERS,
  // skills api
  CONTRACTORS_FETCH_SKILLS,
  CONTRACTORS_FETCH_SKILLS_SUCCESS,
  CONTRACTORS_FETCH_SKILLS_FAILURE,
  TRADERS_ADMIN_DELETE_SUBMIT,
  TRADERS_ADMIN_DELETE_SUBMIT_SUCCESS,
  TRADERS_ADMIN_DELETE_SUBMIT_FAILURE,
  TRADERS_ADMIN_EDIT_OPEN_AND_FETCH,
  TRADERS_ADMIN_FETCH_SUCCESS,
  TRADERS_ADMIN_FETCH_FAILURE,
  TRADERS_ADMIN_EDIT_REQUEST,
  TRADERS_ADMIN_EDIT_SUCCESS,
  TRADERS_ADMIN_EDIT_FAILURE,
  //
  TRADERS_STAFF_ADD_SUBMIT,
  TRADERS_STAFF_SUBMIT_SUCCESS,
  TRADERS_STAFF_SUBMIT_FAILURE,
  // GET STAFF
  TRADER_STAFF_START_LISTING,
  TRADER_STAFF_SET_LISTING,
  //
  TRADER_CATEGORY_ADD_SUBMIT,
  TRADER_CATEGORY_SUBMIT_SUCCESS,
  TRADER_CATEGORY_SUBMIT_FAILURE,
  //
  TRADER_ADD_CATEGORY_MODAL_OPEN,
  TRADER_ADD_CATEGORY_MODAL_CLOSE,
  //
  TRADER_DELETE_CATEGORY_MODAL_OPEN,
  TRADER_DELETE_CATEGORY_MODAL_CLOSE,
  //
  TRADER_EDIT_CATEGORY_MODAL_CLOSE,
  TRADER_EDIT_CATEGORY_MODAL_OPEN,
  //
  TRADER_CATEGORY_DELETE,
  //
  TRADER_CATEGORY_START_LISTING,
  TRADER_CATEGORY_SET_LISTING,
  //
  TRADER_POST_COVER_MODAL_OPEN,
  TRADER_POST_COVER_MODALL_CLOSE,
  //
  CATEGORY_START_LISTING,
  CATEGORY_SET_LISTING,
  CATEGORY_LISTING_ERROR,
  // CATEGORY EDIT
  TRADER_CATEGORY_EDIT_SUBMIT,
  TRADER_CATEGORY_EDIT_SUBMIT_SUCCESS,
  TRADER_CATEGORY_EDIT_SUBMIT_FAILURE,
  // GET SINGLE STAFF
  TRADERS_STAFF_VIEW_MODAL_OPEN,
  TRADERS_STAFF_VIEW_MODAL_CLOSE,
  TRADERS_STAFF_FETCH_SUCCESS,
  TRADERS_STAFF_FETCH_FAILURE,
} from "./constants";

//TRADER ADMIN VIEW
export const openViewAndFetchTraderAdmin = (payload) => ({
  type: TRADER_ADMIN_VIEW_MODAL_OPEN,
  payload,
});

//TRADER ADMIN EDIT
export const openEditAndFetchTraderAdmin = (payload) => ({
  type: TRADERS_ADMIN_EDIT_OPEN_AND_FETCH,
  payload,
});
export const traderAdminFetchSuccess = (payload) => ({
  type: TRADERS_ADMIN_FETCH_SUCCESS,
  payload,
});
export const traderAdminFetchFailure = (payload) => ({
  type: TRADERS_ADMIN_FETCH_FAILURE,
  payload,
});
export const editTraderAdminRequest = (payload) => ({
  type: TRADERS_ADMIN_EDIT_REQUEST,
  payload,
});
export const editTraderAdminSuccess = (payload) => ({
  type: TRADERS_ADMIN_EDIT_SUCCESS,
  payload,
});
export const editTraderAdminFailure = (payload) => ({
  type: TRADERS_ADMIN_EDIT_FAILURE,
  payload,
});

//TRADER ADMIN ADD
export const addTraderAdminRequest = (payload) => ({
  type: ADD_TRADERS_ADMIN_REQUEST,
  payload,
});
export const addTraderAdminSuccess = (payload) => ({
  type: ADD_TRADERS_ADMIN_SUCCESS,
  payload,
});
export const addTraderAdminFailure = (payload) => ({
  type: ADD_TRADERS_ADMIN_FAILURE,
  payload,
});

//TRADER ADMIN ADD MODAL
export const openTraderAdminAddModal = (payload) => ({
  type: TRADER_ADMIN_ADD_MODAL_OPEN,
  payload,
});
export const closeTraderAdminAddModal = (payload) => ({
  type: TRADER_ADMIN_ADD_MODAL_CLOSE,
  payload,
});

// LISTING TRADER ADMIN
export const getTradersAdminList = (payload) => ({
  type: TRADER_ADMIN_LIST_FETCH,
  payload,
});
export const getTradersAdminListSuccess = (payload) => ({
  type: TRADER_ADMIN_LIST_FETCH_SUCCESS,
  payload,
});
export const getTradersAdminListFailure = (payload) => ({
  type: TRADER_ADMIN_LIST_FETCH_FAILURE,
  payload,
});

// LISTING TRADER
export const getTradersListing = (payload) => ({
  type: TRADER_START_LISTING,
  payload,
});
export const setTradersListing = (payload) => ({
  type: TRADER_SET_LISTING,
  payload,
});
// DELETE MODAL TRADER
export const openDeleteModal = (payload) => ({
  type: TRADERS_OPEN_DELETE_MODAL,
  payload,
});
export const closeDeleteModal = (payload) => ({
  type: TRADERS_CLOSE_DELETE_MODAL,
  payload,
});
// ADD
export const submitTraderAdd = (payload, history) => ({
  type: TRADERS_ADD_SUBMIT,
  payload,
  history,
});
export const traderSubmitSuccess = (payload) => ({
  type: TRADERS_SUBMIT_SUCCESS,
  payload,
});
export const traderSubmitFailure = (payload) => ({
  type: TRADERS_SUBMIT_FAILURE,
  payload,
});
// EDIT FETCHIN
export const traderViewStartFetching = (payload) => ({
  type: TRADERS_VIEW_OPEN_AND_FETCH,
  payload,
});
export const submitTraderEdit = (payload, id) => ({
  type: TRADERS_EDIT_SUBMIT,
  payload,
});
// DELETE TRADER ADMIN
export const deleteTraderAdmin = (payload) => ({
  type: TRADERS_ADMIN_DELETE_SUBMIT,
  payload,
});
export const deleteTraderAdminSuccess = (payload) => ({
  type: TRADERS_ADMIN_DELETE_SUBMIT_SUCCESS,
  payload,
});
export const deleteTraderAdminFailure = (payload) => ({
  type: TRADERS_ADMIN_DELETE_SUBMIT_FAILURE,
  payload,
});
// DELETE
export const deleteTrader = (payload) => ({
  type: TRADERS_DELETE_SUBMIT,
  payload,
});
export const deleteTraderSuccess = (payload) => ({
  type: TRADERS_DELETE_SUBMIT_SUCCESS,
  payload,
});
export const deleteTraderFailure = (payload) => ({
  type: TRADERS_DELETE_SUBMIT_FAILURE,
  payload,
});

export const getFilterData = (payload) => ({
  type: CONTRACTORS_GET_FILTER_DATA,
  payload,
});
export const getFilterDataSuccess = (payload) => ({
  type: CONTRACTORS_GET_FILTER_DATA_SUCCESS,
  payload,
});
export const getFilterDataFailure = (payload) => ({
  type: CONTRACTORS_GET_FILTER_DATA_FAILURE,
  payload,
});

export const submitPostcodeEdit = (payload, id) => ({
  type: CONTRACTORS_POSTCODE_EDIT,
  payload,
});

export const submitPostcodeAdd = (payload) => ({
  type: CONTRACTORS_ADD_POSTCODE,
  payload,
});
export const getContractorsPostcodeListing = (payload) => ({
  type: CONTRACTORS_POSTCODE_START_LISTING,
  payload,
});
export const setContractorsPostcodeListing = (payload) => ({
  type: CONTRACTORS_POSTCODE_SET_LISTING,
  payload,
});
export const deletePostcode = (payload) => ({
  type: CONTRACTORS_DELETE_POSTCODE,
  payload,
});
export const deletePostcodeSuccess = (payload) => ({
  type: CONTRACTORS_DELETE_POSTCODE_SUCCESS,
  payload,
});
export const deletePostcodeFailure = (payload) => ({
  type: CONTRACTORS_DELETE_POSTCODE_FAILURE,
  payload,
});
export const setContractorDetail = (payload) => ({
  type: CONTRACTORS_SET_DATA,
  payload,
});

export const setContractor = (payload) => ({
  type: CONTRACTORS_SET_JOB,
  payload,
});

export const setDocumentFilter = (payload) => ({
  type: CONTRACTORS_DOCUMENT_SET_FILTER,
  payload,
});

export const clearDocumentFilter = (payload) => ({
  type: CONTRACTORS_DOCUMENT_CLEAR_FILTERS,
});

export const openDocumentUploadModal = (payload) => ({
  type: CONTRACTORS_ADD_DOCUMENT_MODAL_OPEN,
});

export const closeDocumentUploadModal = (payload) => ({
  type: CONTRACTORS_ADD_DOCUMENT_MODAL_CLOSE,
});

export const submitContractorDocument = (payload) => ({
  type: CONTRACTORS_DOCUMENT_SUBMIT,
  payload,
});

export const getContractorDocumentsListing = (payload) => ({
  type: CONTRACTORS_DOCUMENT_START_LISTING,
  payload,
});

export const setContractorDocumentsListing = (payload) => ({
  type: CONTRACTORS_DOCUMENT_SET_LISTING,
  payload,
});

export const deleteContractorDocument = (payload) => ({
  type: CONTRACTORS_DOCUMENT_DELETE,
  payload,
});

export const openDocumentDeleteModal = (payload) => ({
  type: CONTRACTORS_DELETE_DOCUMENT_MODAL_OPEN,
  payload,
});

export const closeDocumentDeleteModal = (payload) => ({
  type: CONTRACTORS_DELETE_DOCUMENT_MODAL_CLOSE,
});

export const openDocumentEditModal = (payload) => ({
  type: CONTRACTORS_EDIT_DOCUMENT_MODAL_OPEN,
  payload,
});

export const closeDocumentEditModal = (payload) => ({
  type: CONTRACTORS_EDIT_DOCUMENT_MODAL_CLOSE,
});

export const submitEditContractorDocument = (payload) => ({
  type: CONTRACTORS_DOCUMENT_EDIT_SUBMIT,
  payload,
});

export const getSkillsContractor = (payload) => ({
  type: CONTRACTORS_FETCH_SKILLS,
  payload,
});

export const getSkillsContractorSuccess = (payload) => ({
  type: CONTRACTORS_FETCH_SKILLS_SUCCESS,
  payload,
});

export const getSkillsContractorFailure = (payload) => ({
  type: CONTRACTORS_FETCH_SKILLS_FAILURE,
  payload,
});

// STAFF
export const addStaffSubmit = (payload, history) => ({
  type: TRADERS_STAFF_ADD_SUBMIT,
  payload,
  history,
});
export const staffSubmitSuccess = (payload) => ({
  type: TRADERS_STAFF_SUBMIT_SUCCESS,
  payload,
});
export const staffSubmitFailure = (payload) => ({
  type: TRADERS_STAFF_SUBMIT_FAILURE,
  payload,
});
// GET STAFF
export const getStaffListing = (payload) => ({
  type: TRADER_STAFF_START_LISTING,
  payload,
});
export const setStaffListing = (payload) => ({
  type: TRADER_STAFF_SET_LISTING,
  payload,
});
// ADD CATEGORY
export const categoryAdd = (payload, history) => ({
  type: TRADER_CATEGORY_ADD_SUBMIT,
  payload,
  history,
});
export const categorySubmitSuccess = (payload) => ({
  type: TRADER_CATEGORY_SUBMIT_SUCCESS,
  payload,
});
export const categorySubmitFailure = (payload) => ({
  type: TRADER_CATEGORY_SUBMIT_FAILURE,
  payload,
});
// ADD MODAL
export const closeCategoryAddModal = (payload) => ({
  type: TRADER_ADD_CATEGORY_MODAL_CLOSE,
});
export const openCategoryAddModal = (payload) => ({
  type: TRADER_ADD_CATEGORY_MODAL_OPEN,
});

// EDIT MODAL CATEGORY
export const closeCategoryEditModal = (payload) => ({
  type: TRADER_EDIT_CATEGORY_MODAL_CLOSE,
});
export const openCategoryEditModal = (payload) => ({
  type: TRADER_EDIT_CATEGORY_MODAL_OPEN,
  payload,
});
// DELETE MODAL
export const openCategoryDeleteModal = (payload) => ({
  type: TRADER_DELETE_CATEGORY_MODAL_OPEN,
  payload,
});
export const closeCategoryDeleteModal = (payload) => ({
  type: TRADER_DELETE_CATEGORY_MODAL_CLOSE,
});
// DELETE SUBMIT
export const deleteCategorySubmit = (payload) => ({
  type: TRADER_CATEGORY_DELETE,
  payload,
});
// GET CATEGORY
export const getCategoryListing = (payload) => ({
  type: TRADER_CATEGORY_START_LISTING,
  payload,
});
export const setCategoryListing = (payload) => ({
  type: TRADER_CATEGORY_SET_LISTING,
  payload,
});
//TRADER POST COVER MODAL
export const openTraderPostCoverModal = (payload) => ({
  type: TRADER_POST_COVER_MODAL_OPEN,
  payload,
});
export const closeTraderPostCoverModal = (payload) => ({
  type: TRADER_POST_COVER_MODALL_CLOSE,
  payload,
});
// GET CATEGORIES DATA
export const getCategoriesListing = (payload) => ({
  type: CATEGORY_START_LISTING,
  payload,
});
export const getCategoriesListingSuccess = (payload) => ({
  type: CATEGORY_SET_LISTING,
  payload,
});
export const getCategoriesListingFailure = (payload) => ({
  type: CATEGORY_LISTING_ERROR,
  payload,
});
export const categoryEdit = (payload, history) => ({
  type: TRADER_CATEGORY_EDIT_SUBMIT,
  payload,
  history,
});
export const categoryEditSuccess = (payload) => ({
  type: TRADER_CATEGORY_EDIT_SUBMIT_SUCCESS,
  payload,
});
export const categoryEditFailure = (payload) => ({
  type: TRADER_CATEGORY_EDIT_SUBMIT_FAILURE,
  payload,
});
// GET SINGLE STAFF
export const openViewAndFetchStaff = (payload) => ({
  type: TRADERS_STAFF_VIEW_MODAL_OPEN,
  payload,
});
export const closeViewAndFetchStaff = (payload) => ({
  type: TRADERS_STAFF_VIEW_MODAL_CLOSE,
  payload,
});
export const getIndividualStaffSuccess = (payload) => ({
  type: TRADERS_STAFF_FETCH_SUCCESS,
  payload,
});
export const getIndividualStaffFailure = (payload) => ({
  type: TRADERS_STAFF_FETCH_FAILURE,
  payload,
});
