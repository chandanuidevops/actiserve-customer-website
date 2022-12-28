/*
 *
 * Contractors reducer
 *
 */
import produce from "immer";

import {
  TRADER_ADMIN_ADD_MODAL_OPEN,
  TRADER_ADMIN_ADD_MODAL_CLOSE,
  TRADERS_ADMIN_EDIT_SUCCESS,
  TRADERS_ADMIN_EDIT_FAILURE,
  TRADERS_ADMIN_EDIT_OPEN_AND_FETCH,
  ADD_TRADERS_ADMIN_REQUEST,
  ADD_TRADERS_ADMIN_SUCCESS,
  ADD_TRADERS_ADMIN_FAILURE,
  TRADERS_ADMIN_FETCH_SUCCESS,
  TRADERS_ADMIN_FETCH_FAILURE,

  //TRADER ADMIN LISTING
  TRADER_ADMIN_LIST_FETCH,
  TRADER_ADMIN_LIST_FETCH_SUCCESS,
  TRADER_ADMIN_LIST_FETCH_FAILURE,
  TRADERS_ADMIN_DELETE_SUBMIT,
  TRADERS_ADMIN_DELETE_SUBMIT_SUCCESS,
  TRADERS_ADMIN_DELETE_SUBMIT_FAILURE,

  // list and view
  TRADER_START_LISTING,
  TRADER_SET_LISTING,
  TRADER_ADMIN_VIEW_MODAL_OPEN,
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
  // DELETE
  TRADERS_DELETE_SUBMIT,
  TRADERS_DELETE_SUBMIT_SUCCESS,
  TRADERS_DELETE_SUBMIT_FAILURE,
  CONTRACTORS_GET_FILTER_DATA,
  CONTRACTORS_GET_FILTER_DATA_SUCCESS,
  CONTRACTORS_GET_FILTER_DATA_FAILURE,
  CONTRACTORS_ADD_SUBMIT,
  CONTRACTORS_SUBMIT_SUCCESS,
  CONTRACTORS_SUBMIT_FAILURE,
  CONTRACTORS_DELETE_POSTCODE,
  CONTRACTORS_DELETE_POSTCODE_SUCCESS,
  CONTRACTORS_DELETE_POSTCODE_FAILURE,
  CONTRACTORS_POSTCODE_START_LISTING,
  CONTRACTORS_POSTCODE_SET_LISTING,
  CONTRACTORS_SET_DATA,
  CONTRACTORS_SET_JOB,

  // constants for document upload
  CONTRACTORS_DOCUMENT_DELETE,
  CONTRACTORS_DOCUMENT_SET_LISTING,
  CONTRACTORS_DOCUMENT_START_LISTING,
  CONTRACTORS_DOCUMENT_SET_FILTER,
  CONTRACTORS_DOCUMENT_SUBMIT,
  CONTRACTORS_ADD_DOCUMENT_MODAL_OPEN,
  CONTRACTORS_ADD_DOCUMENT_MODAL_CLOSE,
  CONTRACTORS_DELETE_DOCUMENT_MODAL_OPEN,
  CONTRACTORS_DELETE_DOCUMENT_MODAL_CLOSE,
  CONTRACTORS_DOCUMENT_CLEAR_FILTERS,
  CONTRACTORS_EDIT_DOCUMENT_MODAL_OPEN,
  CONTRACTORS_EDIT_DOCUMENT_MODAL_CLOSE,
  CONTRACTORS_DOCUMENT_EDIT_SUBMIT,
  //
  CONTRACTORS_FETCH_SKILLS,
  CONTRACTORS_FETCH_SKILLS_SUCCESS,
  CONTRACTORS_FETCH_SKILLS_FAILURE,
  //
  // GET STAFF
  TRADER_STAFF_START_LISTING,
  TRADER_STAFF_SET_LISTING,
  // ADD STAFF
  TRADERS_STAFF_ADD_SUBMIT,
  TRADERS_STAFF_SUBMIT_SUCCESS,
  TRADERS_STAFF_SUBMIT_FAILURE,
  // CATEGORIES LISTING
  TRADER_CATEGORY_START_LISTING,
  TRADER_CATEGORY_SET_LISTING,
  // CATEGORY ADD MODAL
  TRADER_ADD_CATEGORY_MODAL_OPEN,
  TRADER_ADD_CATEGORY_MODAL_CLOSE,
  //CATEGORY EDIT MODA
  TRADER_EDIT_CATEGORY_MODAL_OPEN,
  TRADER_EDIT_CATEGORY_MODAL_CLOSE,
  // CATEGORY DELETE MODAL
  TRADER_DELETE_CATEGORY_MODAL_OPEN,
  TRADER_DELETE_CATEGORY_MODAL_CLOSE,
  TRADER_CATEGORY_DELETE,
  //
  TRADER_POST_COVER_MODAL_OPEN,
  TRADER_POST_COVER_MODALL_CLOSE,
  // GET ALL OUTCOMES/LISTING
  CATEGORY_START_LISTING,
  CATEGORY_SET_LISTING,
  CATEGORY_LISTING_ERROR,
  // CATEGORY ADD
  TRADER_CATEGORY_ADD_SUBMIT,
  TRADER_CATEGORY_SUBMIT_SUCCESS,
  TRADER_CATEGORY_SUBMIT_FAILURE,
  // CATEGORY EDIT
  TRADER_CATEGORY_EDIT_SUBMIT,
  TRADER_CATEGORY_EDIT_SUBMIT_SUCCESS,
  TRADER_CATEGORY_EDIT_SUBMIT_FAILURE,
  //
  TRADERS_STAFF_VIEW_MODAL_OPEN,
  TRADERS_STAFF_VIEW_MODAL_CLOSE,
  TRADERS_STAFF_FETCH_SUCCESS,
  TRADERS_STAFF_FETCH_FAILURE,
} from "./constants";

export const initialState = {
  isFetching: false,
  contractors: { data: [] },
  postcodes: { data: [] },
  isFetchingContractors: false,
  isFetchingPostcodes: false,
  isFetchingFilters: false,
  isSubmiting: false,
  isDeleting: false,
  filters: {
    filterDateRange: null,
    customers: [],
    case_managers: [],
    contractors: [],
    status: "",
    customer_id: "",
    contractor_id: "",
    case_manager: "",
  },
  isDeleteModalOpen: false,
  deletingContractorDetails: {},
  contractorDetails: {},
  currentContractor: {},

  // contractor document
  document: null,
  documentListing: [],
  deletingDocument: null,
  documentFilter: "",
  editingDocument: null,
  isEditingDocument: false,
  isFetchingDocument: false,
  isSubmitingDocument: false,
  isDeletingDocument: false,
  isDocumentUploadModalOpen: false,
  isDocumentDeleteModalOpen: false,
  //
  isFetchingSkills: false,
  skillsData: [],
  //TRADER ADMIN
  isTraderAdminFetching: false,
  traderAdminList: [],
  currentTraderAdmin: {},

  traderAdminAddModalOpen: false,
  traderAdminEditModalOpen: false,
  traderAdminViewModalOpen: false,
  isEditing: false,
  // STAFF
  isFetchingStaff: false,
  staff: { data: [] },
  isSubmitingStaff: false,
  // CATEGOY LISTING DATA
  isFetchingCategory: false,
  category: { data: [] },
  // CATEGORY EDIT MODAL
  isEditingCategory: true,
  isCategoryEditModalOpen: false,
  editingCategory: null,
  // CATEGORY DEL MODAL
  isCategoryDeleteModalOpen: false,
  deletingCategory: null,
  isDeletingCategory: false,
  // POSTCODE COVER
  traderPostCoverModalOpen: false,
  traderPostCoverList: [],
  //
  isFetchingCategoriesList: false,
  categories: [],
  // CATEGORY ADD SUBMIT
  isSubmittingCategory: false,
  isCategoryAddModalOpen: false,
  categoryData: {},
  // staff single
  isTraderStaffViewModalOpen: false,
  isIndividualStaffFetching: false,
  individualTraderStaff: {},
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const contractorsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TRADER_ADMIN_VIEW_MODAL_OPEN:
        draft.traderAdminAddModalOpen = false;
        draft.traderAdminEditModalOpen = false;
        draft.isEditing = false;
        draft.isTraderAdminFetching = true;
        draft.traderAdminViewModalOpen = true;
        break;
      case TRADERS_ADMIN_EDIT_SUCCESS:
        draft.traderAdminAddModalOpen = false;
        draft.traderAdminEditModalOpen = false;
        draft.isEditing = false;
        draft.currentTraderAdmin = {};
        break;
      case TRADERS_ADMIN_EDIT_OPEN_AND_FETCH:
        draft.traderAdminViewModalOpen = false;
        draft.isTraderAdminFetching = true;
        draft.traderAdminEditModalOpen = true;
        draft.isEditing = true;
        break;
      case TRADERS_ADMIN_FETCH_SUCCESS:
        draft.isTraderAdminFetching = false;
        draft.currentTraderAdmin = action.payload;
        break;
      case TRADERS_ADMIN_FETCH_FAILURE:
        draft.isTraderAdminFetching = false;
        draft.currentTraderAdmin = {};
        break;
      case ADD_TRADERS_ADMIN_REQUEST:
        break;
      case ADD_TRADERS_ADMIN_SUCCESS:
        draft.traderAdminAddModalOpen = false;
        break;
      case ADD_TRADERS_ADMIN_FAILURE:
        break;
      case TRADER_ADMIN_ADD_MODAL_OPEN:
        draft.traderAdminAddModalOpen = true;
        break;
      case TRADER_ADMIN_ADD_MODAL_CLOSE:
        draft.traderAdminAddModalOpen = false;
        draft.traderAdminEditModalOpen = false;
        draft.traderAdminViewModalOpen = false;
        draft.isEditing = false;
        draft.currentTraderAdmin = {};
        break;
      // TRADER ADMIN LISTING
      case TRADER_ADMIN_LIST_FETCH:
        draft.isTraderAdminFetching = true;
        break;
      case TRADER_ADMIN_LIST_FETCH_SUCCESS:
        draft.isTraderAdminFetching = false;
        draft.traderAdminList = action.payload;
        break;
      case TRADER_ADMIN_LIST_FETCH_FAILURE:
        draft.isTraderAdminFetching = false;
        break;
      // TRADER LISTING
      case TRADER_START_LISTING:
        draft.isFetchingContractors = true;
        break;
      case TRADER_SET_LISTING:
        draft.isFetchingContractors = false;
        draft.contractors = action.payload;
        break;
      // DELETE MODAL
      case TRADERS_OPEN_DELETE_MODAL:
        draft.isDeleteModalOpen = true;
        draft.deletingContractorDetails = action.payload;
        break;
      case TRADERS_CLOSE_DELETE_MODAL:
        draft.isDeleteModalOpen = false;
        draft.deletingContractorDetails = {};
        break;
      // ADD SUBMIT
      case TRADERS_ADD_SUBMIT:
        draft.isSubmiting = true;
        break;
      case TRADERS_SUBMIT_SUCCESS:
        draft.isSubmiting = false;
        break;
      case TRADERS_SUBMIT_FAILURE:
        draft.isSubmiting = false;
        break;
      // EDIT FETCH AND SUBMIT
      case TRADERS_VIEW_OPEN_AND_FETCH:
        draft.isFetching = true;
        break;
      case TRADERS_EDIT_SUBMIT:
        draft.isSubmiting = true;
        break;
      // DELETE SUBMIT
      case TRADERS_DELETE_SUBMIT:
        draft.isDeleting = true;
        break;
      case TRADERS_DELETE_SUBMIT_SUCCESS:
        draft.isDeleting = false;
        break;
      case TRADERS_DELETE_SUBMIT_FAILURE:
        draft.isDeleting = false;
        break;
      case TRADERS_ADMIN_DELETE_SUBMIT:
        draft.isDeleting = true;
        break;
      case TRADERS_ADMIN_DELETE_SUBMIT_SUCCESS:
        draft.isDeleting = false;
        break;
      case TRADERS_ADMIN_DELETE_SUBMIT_FAILURE:
        draft.isDeleting = false;
        break;

      case CONTRACTORS_GET_FILTER_DATA:
        draft.isFetchingFilters = true;
        break;
      case CONTRACTORS_GET_FILTER_DATA_SUCCESS:
        draft.isFetchingFilters = false;
        draft.filters = { ...draft.filters, ...action.payload };
        break;
      case CONTRACTORS_GET_FILTER_DATA_FAILURE:
        draft.isFetchingFilters = false;
        break;

      case CONTRACTORS_POSTCODE_START_LISTING:
        draft.isFetchingPostcodes = true;
        break;
      case CONTRACTORS_POSTCODE_SET_LISTING:
        draft.isFetchingPostcodes = false;
        draft.postcodes = action.payload;
        break;
      case CONTRACTORS_DELETE_POSTCODE:
        draft.isDeleting = true;
        break;
      case CONTRACTORS_DELETE_POSTCODE_SUCCESS:
        draft.isDeleting = false;
        break;
      case CONTRACTORS_DELETE_POSTCODE_FAILURE:
        draft.isDeleting = false;
        break;
      case CONTRACTORS_SET_DATA:
        draft.contractorDetails = action.payload;
        break;

      case CONTRACTORS_SET_JOB:
        draft.isFetching = false;
        draft.currentContractor = action.payload;
        break;
      case CONTRACTORS_ADD_DOCUMENT_MODAL_OPEN:
        draft.isDocumentUploadModalOpen = true;
        break;
      case CONTRACTORS_ADD_DOCUMENT_MODAL_CLOSE:
        draft.isDocumentUploadModalOpen = false;
        draft.isSubmitingDocument = false;
        break;
      case CONTRACTORS_DOCUMENT_SUBMIT:
        draft.isSubmitingDocument = true;
        draft.document = action.payload;
        break;
      case CONTRACTORS_DOCUMENT_START_LISTING:
        draft.isFetchingDocument = true;
        break;
      case CONTRACTORS_DOCUMENT_SET_LISTING:
        draft.isFetchingDocument = false;
        draft.documentListing = action.payload;
        break;
      case CONTRACTORS_DOCUMENT_SET_FILTER:
        draft.documentFilter = action.payload;
        break;
      case CONTRACTORS_DOCUMENT_CLEAR_FILTERS:
        draft.documentFilter = null;
        break;
      case CONTRACTORS_DELETE_DOCUMENT_MODAL_OPEN:
        draft.isDocumentDeleteModalOpen = true;
        draft.deletingDocument = action.payload;
        break;
      case CONTRACTORS_DELETE_DOCUMENT_MODAL_CLOSE:
        draft.isDocumentDeleteModalOpen = false;
        draft.isDeletingDocument = false;
        draft.deletingDocument = null;
        break;
      case CONTRACTORS_DOCUMENT_DELETE:
        draft.isDeletingDocument = true;
        break;
      case CONTRACTORS_EDIT_DOCUMENT_MODAL_OPEN:
        draft.isEditingDocument = true;
        draft.isDocumentUploadModalOpen = true;
        draft.editingDocument = action.payload;
        break;
      case CONTRACTORS_EDIT_DOCUMENT_MODAL_CLOSE:
        draft.isEditingDocument = false;
        draft.isDocumentUploadModalOpen = false;
        draft.editingDocument = null;
        draft.isSubmitingDocument = false;
        draft.document = null;
        break;
      case CONTRACTORS_DOCUMENT_EDIT_SUBMIT:
        draft.isSubmitingDocument = true;
        draft.document = action.payload;
        break;
      case CONTRACTORS_FETCH_SKILLS:
        draft.isFetchingSkills = true;
        break;
      case CONTRACTORS_FETCH_SKILLS_SUCCESS:
        draft.isFetchingSkills = false;
        draft.skillsData = action.payload;
        break;

      case CONTRACTORS_FETCH_SKILLS_FAILURE:
        draft.isFetchingSkills = false;
        break;
      // STAFF
      // GET STAFF
      case TRADER_STAFF_START_LISTING:
        draft.isFetchingStaff = true;
        break;
      case TRADER_STAFF_SET_LISTING:
        draft.isFetchingStaff = false;
        draft.staff = action.payload;
        break;
      // ADD STAFF
      case TRADERS_STAFF_ADD_SUBMIT:
        draft.isSubmitingStaff = true;
        break;
      case TRADERS_STAFF_SUBMIT_SUCCESS:
        draft.isSubmitingStaff = false;
        draft.isDocumentUploadModalOpen = false;
        break;
      case TRADERS_STAFF_SUBMIT_FAILURE:
        draft.isSubmitingStaff = false;
        break;
      // GET CATEGORY
      case TRADER_CATEGORY_START_LISTING:
        draft.isFetchingCategory = true;
        break;
      case TRADER_CATEGORY_SET_LISTING:
        draft.isFetchingCategory = false;
        draft.category = action.payload;
        break;
      // CATEGORY ADD MODAL
      case TRADER_ADD_CATEGORY_MODAL_OPEN:
        draft.isCategoryAddModalOpen = true;
        break;
      case TRADER_ADD_CATEGORY_MODAL_CLOSE:
        draft.isCategoryAddModalOpen = false;
        draft.isSubmitingCategory = false;
        break;
      // CATEGORY EDIT MODAL
      case TRADER_EDIT_CATEGORY_MODAL_OPEN:
        draft.isEditingCategory = true;
        draft.isCategoryEditModalOpen = true;
        draft.editingCategory = action.payload;
        break;
      case TRADER_EDIT_CATEGORY_MODAL_CLOSE:
        draft.isEditingCategory = false;
        draft.isCategoryEditModalOpen = false;
        draft.editingCategory = null;
        break;
      // DELETE MODAL CATEGORY
      case TRADER_DELETE_CATEGORY_MODAL_OPEN:
        draft.isCategoryDeleteModalOpen = true;
        draft.deletingCategory = action.payload;
        break;
      case TRADER_DELETE_CATEGORY_MODAL_CLOSE:
        draft.isCategoryDeleteModalOpen = false;
        draft.isDeletingDocument = false;
        draft.deletingCategory = null;
        break;
      case TRADER_CATEGORY_DELETE:
        draft.isDeletingCategory = true;
        break;
      case TRADER_POST_COVER_MODAL_OPEN:
        draft.traderPostCoverModalOpen = true;
        break;
      case TRADER_POST_COVER_MODALL_CLOSE:
        draft.traderPostCoverModalOpen = false;
        break;
      case CATEGORY_START_LISTING:
        draft.isFetchingCategoriesList = true;
        break;
      case CATEGORY_SET_LISTING:
        draft.isFetchingCategoriesList = false;
        draft.categories = action.payload;
        break;
      case CATEGORY_LISTING_ERROR:
        draft.isFetchingCategoriesList = false;
        break;
      case TRADER_CATEGORY_EDIT_SUBMIT:
        draft.isEditingCategory = true;
        break;
      case TRADER_CATEGORY_EDIT_SUBMIT_SUCCESS:
        draft.isEditingCategory = false;
        draft.isCategoryEditModalOpen = false;
        break;
      case TRADER_CATEGORY_EDIT_SUBMIT_FAILURE:
        draft.isEditingCategory = false;
        break;
      case TRADER_CATEGORY_ADD_SUBMIT:
        draft.isSubmittingCategory = true;
        break;
      case TRADER_CATEGORY_SUBMIT_SUCCESS:
        draft.isSubmittingCategory = false;
        draft.isCategoryAddModalOpen = false;
        draft.categoryData = action.payload;
        break;
      case TRADER_CATEGORY_SUBMIT_FAILURE:
        draft.isSubmittingCategory = false;
        break;
      // get single staff
      case TRADERS_STAFF_VIEW_MODAL_OPEN:
        draft.isTraderStaffViewModalOpen = true;
        break;
      case TRADERS_STAFF_VIEW_MODAL_CLOSE:
        draft.isTraderStaffViewModalOpen = false;
        break;
      case TRADERS_STAFF_FETCH_SUCCESS:
        draft.isIndividualStaffFetching = false;
        draft.individualTraderStaff = action.payload;
        break;
      case TRADERS_STAFF_FETCH_FAILURE:
        draft.isIndividualStaffFetching = false;
        draft.individualTraderStaff = {};
        break;
      default:
        return state;
    }
  });
export default contractorsReducer;
