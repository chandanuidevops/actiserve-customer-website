import produce from "immer";
import {
  //FETCH LIST
  GET_CATEGORY_DETAILS_REQUEST,
  GET_CATEGORY_DETAILS_SUCCESS,
  GET_CATEGORY_DETAILS_FAILURE,

  SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_FAILURE,

  CUSTOMER_REQUEST,
  CUSTOMER_REQUEST_SUCCESS,
  CUSTOMER_REQUEST_FAILURE,
} from "./constants";

export const initialState = {
  //Listing
  isFetchingCategoryDetails: false,
  categoryDetails: [],

  // Search
  isSearchingService: false,
  searchResult: [],

  //
  isFetchingCustomer: false,
  customer: {},
};

const CategoryDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_CATEGORY_DETAILS_REQUEST:
        draft.isFetchingCategoryDetails = true;
        break;
      case GET_CATEGORY_DETAILS_SUCCESS:
        draft.isFetchingCategoryDetails = false;
        draft.categoryDetails = action.payload;
        break;
      case GET_CATEGORY_DETAILS_FAILURE:
        draft.isFetchingCategoryDetails = false;
        break;

      case SEARCH_REQUEST:
        draft.isSearchingService = true;
        break;
      case SEARCH_REQUEST_SUCCESS:
        draft.isSearchingService = false;
        draft.searchResult = action.payload;
        break;
      case SEARCH_REQUEST_FAILURE:
        draft.isSearchingService = false;
        break;

      case CUSTOMER_REQUEST:
        draft.isFetchingCustomer = true;
        break;
      case CUSTOMER_REQUEST_SUCCESS:
        draft.isFetchingCustomer = false;
        draft.customer = action.payload;
        break;
      case CUSTOMER_REQUEST_FAILURE:
        draft.isFetchingCustomer = false;
        break;
      default:
        return state;
    }
  });

export default CategoryDetailsReducer;
