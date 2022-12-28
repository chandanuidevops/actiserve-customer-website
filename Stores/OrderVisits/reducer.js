import produce from "immer";
import {
  //FETCH LIST
  GET_VISIT_REQUEST,
  GET_VISIT_SUCCESS,
  GET_VISIT_FAILURE,
  // MODAL
  OPEN_VISIT_ADD_MODAL,
  CLOSE_VISIT_ADD_MODAL,
  OPEN_VISIT_EDIT_MODAL,
  CLOSE_VISIT_EDIT_MODAL,
  // STAFF
  VISITS_GET_TRADER_STAFF,
  VISITS_SET_TRADER_STAFF,
  // ADD VISIT
  ADD_VISIT_REQUEST,
  ADD_VISIT_SUCCESS,
  ADD_VISIT_FAILURE,
  // REJECT MODAL
  VISITS_OPEN_DELETE_MODAL,
  VISITS_CLOSE_DELETE_MODAL,
} from "./constants";

export const initialState = {
  //Listing
  isFetchingVisitLists: false,
  visitLists: [],
  // Modal
  isAddModalOpen: false,
  isEditModalOpen: false,
  currentVisit: [],
  // STAFF
  traders_staff: [],
  // ADD VISIT
  isAddingVisit: false,
  // REJECT
  isDeleteModalOpen: false,
  rejectingVisitDetails: {},
};

const VisitsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_VISIT_REQUEST:
        draft.isFetchingVisitLists = true;
        break;
      case GET_VISIT_SUCCESS:
        draft.isFetchingVisitLists = false;
        draft.visitLists = action.payload;
        break;
      case GET_VISIT_FAILURE:
        draft.isFetchingVisitLists = false;
        break;

      // ADD MODAL
      case OPEN_VISIT_ADD_MODAL:
        draft.isAddModalOpen = true;
        draft.currentVisit = action.payload?.visit;
        break;
      case CLOSE_VISIT_ADD_MODAL:
        draft.isAddModalOpen = false;
        break;

      // EDIT MODAL
      case OPEN_VISIT_ADD_MODAL:
        draft.isEditModalOpen = true;
        break;
      case CLOSE_VISIT_ADD_MODAL:
        draft.isEditModalOpen = false;
        break;

      case VISITS_SET_TRADER_STAFF:
        draft.traders_staff = action.payload;
        break;

      // ADD VISIT
      case ADD_VISIT_REQUEST:
        draft.isAddingVisit = true;
        break;
      case ADD_VISIT_SUCCESS:
        draft.isAddingVisit = false;
        draft.isDeleteModalOpen = false;
        draft.isAddModalOpen = false;
        break;
      case ADD_VISIT_FAILURE:
        draft.isAddingVisit = false;
        break;

      // REJECT MODAL
      case VISITS_OPEN_DELETE_MODAL:
        draft.isDeleteModalOpen = true;
        draft.rejectingVisitDetails = action.payload;
        break;
      case VISITS_CLOSE_DELETE_MODAL:
        draft.isDeleteModalOpen = false;
        draft.rejectingVisitDetails = {};
        break;
      default:
        return state;
    }
  });

export default VisitsReducer;
