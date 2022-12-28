import produce from "immer";
import {
  //FETCH LIST
  GET_GROUP_DETAILS_REQUEST,
  GET_GROUP_DETAILS_SUCCESS,
  GET_GROUP_DETAILS_FAILURE,
  //
  GET_GROUP_CATEGORIES_REQUEST,
  GET_GROUP_CATEGORIES_SUCCESS,
  GET_GROUP_CATEGORIES_FAILURE,
  //
  GET_GROUPS_REQUEST,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILURE,
  //
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  //
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  //
  VALIDATE_LOCATION_REQUEST,
  VALIDATE_LOCATION_SUCCESS,
  VALIDATE_LOCATION_FAILURE,
  RESET_VALIDATE_LOCATION,
  //
  VALIDATE_DIRECT_LOCATION_REQUEST,
  VALIDATE_DIRECT_LOCATION_SUCCESS,
  VALIDATE_DIRECT_LOCATION_FAILURE,
  //
  VALIDATE_CATEGORY_REQUEST,
  VALIDATE_CATEGORY_SUCCESS,
  VALIDATE_CATEGORY_FAILURE,
  //
  VALIDATE_CATEGORY_LOCATION,
  VALIDATE_CATEGORY_LOCATION_SUCCESS,
  VALIDATE_CATEGORY_LOCATION_FAILURE,
  //
  VALIDATE_PRODUCT_REQUEST,
  VALIDATE_PRODUCT_SUCCESS,
  VALIDATE_PRODUCT_FAILURE,
  RESET_VALIDATE_PRODUCT,
} from "./constants";

export const initialState = {
  //group
  isFetchingGroupDetails: false,
  groupDetails: [],
  //categories
  isFetchingGroupCateDetails: false,
  groupCategoriesDetails: [],
  // listing group details
  isFetchingGroupListingDetails: false,
  groupListingDetails: [],
  // listing categories details
  isFetchingCategoriesDetails: false,
  categories: [],
  // listing categories details
  isFetchingProductDetails: false,
  product: [],
  //
  isValidatingLocation: false,
  isLocationValid: false,
  //
  isValidatingUrlLocation: false,
  isUrlLocationValid: false,
  // Category Validation
  isValidatingCategory: false,
  isCategoryValid: false,
  //
  isValidatingCatLocation: false,
  isCatLocationValid: false,
  //
  isValidatingProduct: false,
  isProductValid: false,
};

const groupDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_GROUP_DETAILS_REQUEST:
        draft.isFetchingGroupDetails = true;
        break;
      case GET_GROUP_DETAILS_SUCCESS:
        draft.isFetchingGroupDetails = false;
        draft.groupDetails = action.payload;
        break;
      case GET_GROUP_DETAILS_FAILURE:
        draft.isFetchingGroupDetails = false;
        break;
      case GET_GROUP_CATEGORIES_REQUEST:
        draft.isFetchingGroupCateDetails = true;
        break;
      case GET_GROUP_CATEGORIES_SUCCESS:
        draft.isFetchingGroupCateDetails = false;
        draft.groupCategoriesDetails = action.payload;
        break;
      case GET_GROUP_CATEGORIES_FAILURE:
        draft.isFetchingGroupCateDetails = false;
        break;
      //
      case GET_GROUPS_REQUEST:
        draft.isFetchingGroupListingDetails = true;
        break;
      case GET_GROUPS_SUCCESS:
        draft.isFetchingGroupListingDetails = false;
        draft.groupListingDetails = action.payload;
        break;
      case GET_GROUPS_FAILURE:
        draft.isFetchingGroupListingDetails = false;
        break;
      //
      case GET_CATEGORIES_REQUEST:
        draft.isFetchingCategoriesDetails = true;
        break;
      case GET_CATEGORIES_SUCCESS:
        draft.isFetchingCategoriesDetails = false;
        draft.categories = action.payload;
        break;
      case GET_CATEGORIES_FAILURE:
        draft.isFetchingCategoriesDetails = false;
        break;
      //
      case GET_PRODUCT_REQUEST:
        draft.isFetchingProductDetails = true;
        break;
      case GET_PRODUCT_SUCCESS:
        draft.isFetchingProductDetails = false;
        draft.product = action.payload;
        break;
      case GET_PRODUCT_FAILURE:
        draft.isFetchingProductDetails = false;
        break;
      //
      case VALIDATE_LOCATION_REQUEST:
        draft.isValidatingLocation = true;
        draft.isLocationValid = false;
        break;
      case VALIDATE_LOCATION_SUCCESS:
        draft.isValidatingLocation = false;
        draft.isLocationValid = action.payload;
        break;
      case VALIDATE_LOCATION_FAILURE:
        draft.isValidatingLocation = false;
        draft.isLocationValid = action.payload;
        break;
      case RESET_VALIDATE_LOCATION:
        draft.isLocationValid = false;
        break;
      //
      case VALIDATE_DIRECT_LOCATION_REQUEST:
        draft.isValidatingUrlLocation = true;
        break;
      case VALIDATE_DIRECT_LOCATION_SUCCESS:
        draft.isValidatingUrlLocation = false;
        draft.isUrlLocationValid = action.payload;
        break;
      case VALIDATE_DIRECT_LOCATION_FAILURE:
        draft.isValidatingUrlLocation = false;
        draft.isUrlLocationValid = action.payload;
        break;
      //
      case VALIDATE_CATEGORY_REQUEST:
        draft.isValidatingCategory = true;
        break;
      case VALIDATE_CATEGORY_SUCCESS:
        draft.isValidatingCategory = false;
        draft.isCategoryValid = action.payload;
        break;
      case VALIDATE_CATEGORY_FAILURE:
        draft.isValidatingCategory = false;
        draft.isCategoryValid = action.payload;
        break;
      //
      case VALIDATE_PRODUCT_REQUEST:
        draft.isValidatingProduct = true;
        break;
      case VALIDATE_PRODUCT_SUCCESS:
        draft.isValidatingProduct = false;
        draft.isProductValid = action.payload;
        break;
      case VALIDATE_PRODUCT_FAILURE:
        draft.isValidatingProduct = false;
        draft.isProductValid = action.payload;
        break;
      case RESET_VALIDATE_PRODUCT:
        draft.isValidatingProduct = false;
        draft.isProductValid = false;
        break;

      case VALIDATE_CATEGORY_LOCATION:
        draft.isValidatingCatLocation = true;
        break;
      case VALIDATE_CATEGORY_LOCATION_SUCCESS:
        draft.isValidatingCatLocation = true;
        draft.isCategoryValid = action.payload;
        break;
      case VALIDATE_CATEGORY_LOCATION_FAILURE:
        draft.isValidatingCatLocation = false;
        draft.isCategoryValid = false;
        break;


      default:
        return state;
    }
  });

export default groupDetailsReducer;
