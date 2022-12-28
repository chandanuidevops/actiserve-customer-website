import * as types from "./constants";

export const getGroupDetailsRequest = (payload) => ({
  type: types.GET_GROUP_DETAILS_REQUEST,
  payload,
});

export const getGroupDetailsSuccess = (payload) => ({
  type: types.GET_GROUP_DETAILS_SUCCESS,
  payload,
});

export const getGroupDetailsFailure = (payload) => ({
  type: types.GET_GROUP_DETAILS_FAILURE,
  payload,
});

export const getGroupCategoriesRequest = (payload) => ({
  type: types.GET_GROUP_CATEGORIES_REQUEST,
  payload,
});

export const getGroupCategoriesSuccess = (payload) => ({
  type: types.GET_GROUP_CATEGORIES_SUCCESS,
  payload,
});

export const getGroupCategoriesFailure = (payload) => ({
  type: types.GET_GROUP_CATEGORIES_FAILURE,
  payload,
});

// GET ALL GROUPS FOR LISTING
export const getGroupRequest = (payload) => ({
  type: types.GET_GROUPS_REQUEST,
  payload,
});

export const getGroupSuccess = (payload) => ({
  type: types.GET_GROUPS_SUCCESS,
  payload,
});

export const getGroupFailure = (payload) => ({
  type: types.GET_GROUPS_FAILURE,
  payload,
});

// GET ALL GROUPS FOR LISTING
export const getCategoriesRequest = (payload) => ({
  type: types.GET_CATEGORIES_REQUEST,
  payload,
});

export const getCategoriesSuccess = (payload) => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload,
});

export const getCategoriesFailure = (payload) => ({
  type: types.GET_CATEGORIES_FAILURE,
  payload,
});

// GET ALL GROUPS FOR LISTING
export const getProductRequest = (payload) => ({
  type: types.GET_PRODUCT_REQUEST,
  payload,
});

export const getProductSuccess = (payload) => ({
  type: types.GET_PRODUCT_SUCCESS,
  payload,
});

export const getProductFailure = (payload) => ({
  type: types.GET_PRODUCT_FAILURE,
  payload,
});

// GET ALL GROUPS FOR LISTING
export const validateLocationRequest = (payload) => ({
  type: types.VALIDATE_LOCATION_REQUEST,
  payload,
});

export const validateLocationSuccess = (payload) => ({
  type: types.VALIDATE_LOCATION_SUCCESS,
  payload,
});

export const validateLocationFailure = (payload) => ({
  type: types.VALIDATE_LOCATION_FAILURE,
  payload,
});

export const resetValidateLocation = (payload) => ({
  type: types.RESET_VALIDATE_LOCATION,
  payload,
});

// GET ALL GROUPS FOR LISTING
export const validateDirectLocationRequest = (payload) => ({
  type: types.VALIDATE_DIRECT_LOCATION_REQUEST,
  payload,
});

export const validateDirectLocationSuccess = (payload) => ({
  type: types.VALIDATE_DIRECT_LOCATION_SUCCESS,
  payload,
});

export const validateDirectLocationFailure = (payload) => ({
  type: types.VALIDATE_DIRECT_LOCATION_FAILURE,
  payload,
});

// VALIDATE CATEGORY LOCATION
export const validateCategoryRequest = (payload) => ({
  type: types.VALIDATE_CATEGORY_REQUEST,
  payload,
});

export const validateCategorySuccess = (payload) => ({
  type: types.VALIDATE_CATEGORY_SUCCESS,
  payload,
});

export const validateCategoryFailure = (payload) => ({
  type: types.VALIDATE_CATEGORY_FAILURE,
  payload,
});

// VALIDATE CATEGORY LOCATION
export const validateCategoryLocationRequest = (payload) => ({
  type: types.VALIDATE_CATEGORY_LOCATION,
  payload,
});

export const validateCategoryLocationSuccess = (payload) => ({
  type: types.VALIDATE_CATEGORY_LOCATION_SUCCESS,
  payload,
});

export const validateCategoryLocationFailure = (payload) => ({
  type: types.VALIDATE_CATEGORY_LOCATION_FAILURE,
  payload,
});


// VALIDATE PRODUCT LOCATION
export const validateProductRequest = (payload) => ({
  type: types.VALIDATE_PRODUCT_REQUEST,
  payload,
});

export const validateProductSuccess = (payload) => ({
  type: types.VALIDATE_PRODUCT_SUCCESS,
  payload,
});

export const validateProductFailure = (payload) => ({
  type: types.VALIDATE_PRODUCT_FAILURE,
  payload,
});

export const resetValidateProduct = (payload) => ({
  type: types.RESET_VALIDATE_PRODUCT,
  payload,
});