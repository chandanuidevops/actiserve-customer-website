import produce from 'immer'
import {
  //FETCH LIST
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  //
  GET_PRODUCT_QA_REQUEST,
  GET_PRODUCT_QA_SUCCESS,
  GET_PRODUCT_QA_FAILURE,
  RESET_PRODUCT_QA,
  //
  GET_PRODUCT_OFFERING_REQUEST,
  GET_PRODUCT_OFFERING_SUCCESS,
  GET_PRODUCT_OFFERING_FAILURE,
  //
  GET_PACKAGE_BUILDER_REQUEST,
  GET_PACKAGE_BUILDER_SUCCESS,
  GET_PACKAGE_BUILDER_FAILURE,
  //
  GET_PRODUCT_OFFER_DETAIL_REQUEST,
  GET_PRODUCT_OFFER_DETAIL_SUCCESS,
  GET_PRODUCT_OFFER_DETAIL_FAILURE,
} from './constants'

export const initialState = {
  //Listing
  isFetchingProductDetails: false,
  productDetails: [],
  //QA Listing
  isFetchingProductQADetails: false,
  productQADetails: [],
  //PRODUCT OFFERING
  isFetchingProductOffering: false,
  productOfferingDetails: [],
  //PACKAGE BUILDER
  isFetchingPackageBuilder: false,
  packageBuilder: [],
  //PRODUCT OFFER DETAIL
  isFetchingProductOfferDetail: false,
  productOfferDetail: {},
}

const ProductDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //PACKAGE BUILDER
      case GET_PACKAGE_BUILDER_REQUEST:
        draft.isFetchingPackageBuilder = true
        break
      case GET_PACKAGE_BUILDER_SUCCESS:
        draft.isFetchingPackageBuilder = false
        draft.packageBuilder = action.payload
        break
      case GET_PACKAGE_BUILDER_FAILURE:
        draft.isFetchingPackageBuilder = false
        draft.packageBuilder = []
        break
      // Product Offering
      case GET_PRODUCT_OFFERING_REQUEST:
        draft.isFetchingProductOffering = true
        break
      case GET_PRODUCT_OFFERING_SUCCESS:
        draft.isFetchingProductOffering = false
        draft.productOfferingDetails = action.payload
        break
      case GET_PRODUCT_OFFERING_FAILURE:
        draft.isFetchingProductOffering = false
        draft.productOfferingDetails = []
        break
      // Listing
      case GET_PRODUCT_DETAILS_REQUEST:
        draft.isFetchingProductDetails = true
        break
      case GET_PRODUCT_DETAILS_SUCCESS:
        draft.isFetchingProductDetails = false
        draft.productDetails = action.payload
        break
      case GET_PRODUCT_DETAILS_FAILURE:
        draft.isFetchingProductDetails = false
        break
      // Listing
      case GET_PRODUCT_QA_REQUEST:
        draft.isFetchingProductQADetails = true
        break
      case GET_PRODUCT_QA_SUCCESS:
        draft.isFetchingProductQADetails = false
        draft.productQADetails = action.payload
        break
      case GET_PRODUCT_QA_FAILURE:
        draft.isFetchingProductQADetails = false
        break
      case RESET_PRODUCT_QA:
        draft.isFetchingProductQADetails = false
        draft.productQADetails = []
        break
      // Product Offer Detail
      case GET_PRODUCT_OFFER_DETAIL_REQUEST:
        draft.isFetchingProductOfferDetail = true
        break
      case GET_PRODUCT_OFFER_DETAIL_SUCCESS:
        draft.isFetchingProductOfferDetail = false
        draft.productOfferDetail = action.payload
        break
      case GET_PRODUCT_OFFER_DETAIL_FAILURE:
        draft.isFetchingProductOfferDetail = false
        draft.productOfferDetail = {}
        break
      default:
        return state
    }
  })

export default ProductDetailsReducer
