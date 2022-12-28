import produce from 'immer'
import {
  //FETCH LIST
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  RESET_ORDER,
  CREATE_PAYMENT,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  EDIT_VISIT,
  EDIT_VISIT_SUCCESS,
  EDIT_VISIT_FAILURE,
  GET_ORDER_FLOW,
  GET_ORDER_FLOW_SUCCESS,
  GET_ORDER_FLOW_FAILURE,
  GET_ADDONS,
  GET_ADDONS_SUCCESS,
  GET_ADDONS_FAILURE,
  OPEN_ORDER_EDIT_MODAL,
  CLOSE_ORDER_EDIT_MODAL,
  OPEN_VISIT_EDIT_MODAL,
  CLOSE_VISIT_EDIT_MODAL,
  OPEN_QUOTATION_EDIT_MODAL,
  CLOSE_QUOTATION_EDIT_MODAL,
  DELETE_IMAGE,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILURE,
  OPEN_ORDER_PAY_MODAL,
  CLOSE_ORDER_PAY_MODAL,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  OPEN_ADDON_EDIT_MODAL,
  CLOSE_ADDON_EDIT_MODAL,
  EDIT_ADDON,
  EDIT_ADDON_SUCCESS,
  EDIT_ADDON_FAILURE,
  CHECK_MAX_JOB,
  CHECK_MAX_JOB_SUCCESS,
  CHECK_MAX_JOB_FAILURE,
  //
  GET_QUOTEADJUST_DATA,
  GET_QUOTEADJUST_DATA_SUCCESS,
  GET_QUOTEADJUST_DATA_FAILURE,
  //
  PAY_QUOTEADJUST,
  PAY_QUOTEADJUST_SUCCESS,
  PAY_QUOTEADJUST_FAILURE,
  //
  //
  ACCEPT_QUOTEADJUST_DATA,
  ACCEPT_QUOTEADJUST_DATA_SUCCESS,
  ACCEPT_QUOTEADJUST_DATA_FAILURE,

  //
  REJECT_QUOTEADJUST_DATA,
  REJECT_QUOTEADJUST_DATA_SUCCESS,
  REJECT_QUOTEADJUST_DATA_FAILURE,
} from './constants'

export const initialState = {
  //Listing
  isAddingOrder: false,
  isAddOrderSuccess: false,
  addOrderSuccessData: {},
  //Payment
  isCreatingPayment: false,
  isPaymentSuccess: false,
  paymentSuccessData: {},
  //
  isEditingVisit: false,
  //
  isFetchingOrderFlow: false,
  orderFlowData: [],
  //
  isFetchingAddons: false,
  addonData: [],

  isOrderEditModalOpen: false,
  currentOrder: '',

  isVisitEditModalOpen: false,
  currentVisit: '',

  isQuotationEditModalOpen: false,
  currentQuotation: '',

  isDeletingImages: false,
  deleteImageSuccess: false,

  isOrderPayModalOpen: false,
  currentPaymentFor: {},

  isFetchingOrderEditing: false,
  currentOrderDetails: {},

  isAddonModalOpen: false,
  currentAddon: {},

  isEditingAddon: {},

  isFetchingMaxJob: false,
  currentMaxJobData: {},

  isFetchingQuoteAdjust: false,
  isAcceptingQuoteAdjust: false,
  isRejectingQuoteAdjust: false,
  isSavingQuoteAdjust: false,
  isPayingQuoteAdjust: false,
  quoteAdjustData: {},
}

const FinalOrderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Payment
      case CREATE_PAYMENT:
        draft.isCreatingPayment = true
        draft.isPaymentSuccess = false
        draft.paymentSuccessData = {}
        break
      case CREATE_PAYMENT_SUCCESS:
        draft.isCreatingPayment = false
        draft.isPaymentSuccess = true
        draft.paymentSuccessData = action.payload
        break
      case CREATE_PAYMENT_FAILURE:
        draft.isCreatingPayment = false
        draft.isPaymentSuccess = false
        break
      // Listing
      case ADD_ORDER:
        draft.isAddingOrder = true
        draft.isAddOrderSuccess = false
        draft.addOrderSuccessData = {}
        break
      case ADD_ORDER_SUCCESS:
        draft.isAddingOrder = false
        draft.isAddOrderSuccess = true
        draft.addOrderSuccessData = action.payload
        break
      case ADD_ORDER_FAILURE:
        draft.isAddingOrder = false
        draft.isAddOrderSuccess = false
        break
      case RESET_ORDER:
        draft.addOrderSuccessData = {}
        draft.isAddOrderSuccess = false
        break
      case EDIT_VISIT:
        draft.isEditingVisit = true
        break
      case EDIT_VISIT_SUCCESS:
        draft.isEditingVisit = false
        break
      case EDIT_VISIT_FAILURE:
        draft.isEditingVisit = false
        break
      case GET_ORDER_FLOW:
        draft.isFetchingOrderFlow = true
        break
      case GET_ORDER_FLOW_SUCCESS:
        draft.isFetchingOrderFlow = false
        draft.orderFlowData = action.payload
        break
      case GET_ORDER_FLOW_FAILURE:
        draft.isFetchingOrderFlow = false
        break
      case GET_ADDONS:
        draft.isFetchingAddons = true
        break
      case GET_ADDONS_SUCCESS:
        draft.isFetchingAddons = false
        draft.addonData = action.payload
        break
      case GET_ADDONS_FAILURE:
        draft.isFetchingAddons = false
        break
      case OPEN_ORDER_EDIT_MODAL:
        draft.isOrderEditModalOpen = true
        draft.currentOrder = action.payload
        break
      case CLOSE_ORDER_EDIT_MODAL:
        draft.isOrderEditModalOpen = false
        draft.currentOrder = null
        break

      case OPEN_VISIT_EDIT_MODAL:
        draft.isVisitEditModalOpen = true
        draft.currentVisit = action.payload
        break
      case CLOSE_VISIT_EDIT_MODAL:
        draft.isVisitEditModalOpen = false
        draft.currentVisit = null
        break

      case OPEN_QUOTATION_EDIT_MODAL:
        draft.isQuotationEditModalOpen = true
        draft.currentQuotation = action.payload
        break
      case CLOSE_QUOTATION_EDIT_MODAL:
        draft.isQuotationEditModalOpen = false
        draft.currentQuotation = null
        break

      case DELETE_IMAGE:
        draft.isDeletingImages = true
        draft.deleteImageSuccess = false
        break
      case DELETE_IMAGE_SUCCESS:
        draft.isDeletingImages = false
        draft.deleteImageSuccess = true
        break
      case DELETE_IMAGE_FAILURE:
        draft.isDeletingImages = false
        draft.deleteImageSuccess = false
        break

      case OPEN_ORDER_PAY_MODAL:
        draft.isOrderPayModalOpen = true
        draft.currentPaymentFor = action.payload
        break
      case CLOSE_ORDER_PAY_MODAL:
        draft.isOrderPayModalOpen = false
        draft.currentPaymentFor = null
        break

      case GET_ORDER_DETAILS:
        draft.isFetchingOrderEditing = true
        draft.currentOrderDetails = {}
        break
      case GET_ORDER_DETAILS_SUCCESS:
        draft.isFetchingOrderEditing = false
        draft.currentOrderDetails = action.payload
        break
      case GET_ORDER_DETAILS_FAILURE:
        draft.isFetchingOrderEditing = false
        draft.currentOrderDetails = {}
        break

      case OPEN_ADDON_EDIT_MODAL:
        draft.isAddonModalOpen = true
        draft.currentAddon = action.payload
        break
      case CLOSE_ADDON_EDIT_MODAL:
        draft.isAddonModalOpen = false
        draft.currentAddon = {}
        break

      case EDIT_ADDON:
        draft.isEditingAddon = true
        break
      case EDIT_ADDON_SUCCESS:
        draft.isEditingAddon = false
        break
      case EDIT_ADDON_FAILURE:
        draft.isEditingAddon = false
        break

      case CHECK_MAX_JOB:
        draft.isFetchingMaxJob = true
        break
      case CHECK_MAX_JOB_SUCCESS:
        draft.isFetchingMaxJob = false
        draft.currentMaxJobData = action.payload
        break
      case CHECK_MAX_JOB_FAILURE:
        draft.isFetchingMaxJob = false
        draft.currentMaxJobData = {}
        break

      case GET_QUOTEADJUST_DATA:
        draft.isFetchingQuoteAdjust = true
        break
      case GET_QUOTEADJUST_DATA_SUCCESS:
        draft.isFetchingQuoteAdjust = false
        draft.quoteAdjustData = action.payload
        break
      case GET_QUOTEADJUST_DATA_FAILURE:
        draft.isFetchingQuoteAdjust = false
        break
      case ACCEPT_QUOTEADJUST_DATA:
        draft.isAcceptingQuoteAdjust = true
        break
      case ACCEPT_QUOTEADJUST_DATA_SUCCESS:
        draft.isAcceptingQuoteAdjust = false
        draft.isQuoteAdjustmentModalOpen = false
        break
      case ACCEPT_QUOTEADJUST_DATA_FAILURE:
        draft.isAcceptingQuoteAdjust = false
        break

      case REJECT_QUOTEADJUST_DATA:
        draft.isRejectingQuoteAdjust = true
        break
      case REJECT_QUOTEADJUST_DATA_SUCCESS:
        draft.isRejectingQuoteAdjust = false
        draft.isQuoteAdjustmentModalOpen = false
        break
      case REJECT_QUOTEADJUST_DATA_FAILURE:
        draft.isRejectingQuoteAdjust = false
        break
      case PAY_QUOTEADJUST:
        draft.isPayingQuoteAdjust = true
        break
      case PAY_QUOTEADJUST_SUCCESS:
        draft.isPayingQuoteAdjust = false
        break
      case PAY_QUOTEADJUST_FAILURE:
        draft.isPayingQuoteAdjust = false
        break

      default:
        return state
    }
  })

export default FinalOrderReducer
