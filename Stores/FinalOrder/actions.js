import * as types from './constants'

export const addOrder = (payload) => ({
  type: types.ADD_ORDER,
  payload,
})

export const addOrderSuccess = (payload) => ({
  type: types.ADD_ORDER_SUCCESS,
  payload,
})

export const addOrderFailure = (payload) => ({
  type: types.ADD_ORDER_FAILURE,
  payload,
})

export const resetOrder = (payload) => ({
  type: types.RESET_ORDER,
  payload,
})

export const createPayment = (payload) => ({
  type: types.CREATE_PAYMENT,
  payload,
})

export const createPaymentSuccess = (payload) => ({
  type: types.CREATE_PAYMENT_SUCCESS,
  payload,
})

export const createPaymentFailure = (payload) => ({
  type: types.CREATE_PAYMENT_FAILURE,
  payload,
})

export const editVisit = (payload) => ({
  type: types.EDIT_VISIT,
  payload,
})

export const editVisitSuccess = (payload) => ({
  type: types.EDIT_VISIT_SUCCESS,
  payload,
})

export const editVisitFailure = (payload) => ({
  type: types.EDIT_VISIT_FAILURE,
  payload,
})

export const getOrderFlow = (payload) => ({
  type: types.GET_ORDER_FLOW,
  payload,
})

export const getOrderFlowSuccess = (payload) => ({
  type: types.GET_ORDER_FLOW_SUCCESS,
  payload,
})

export const getOrderFlowFailure = (payload) => ({
  type: types.GET_ORDER_FLOW_FAILURE,
  payload,
})

export const getAddons = (payload) => ({
  type: types.GET_ADDONS,
  payload,
})

export const getAddonsSuccess = (payload) => ({
  type: types.GET_ADDONS_SUCCESS,
  payload,
})

export const getAddonsFailure = (payload) => ({
  type: types.GET_ADDONS_FAILURE,
  payload,
})

//  OPEN MODAL
export const openEditModal = (payload) => ({
  type: types.OPEN_ORDER_EDIT_MODAL,
  payload,
})

export const closeEditModal = (payload) => ({
  type: types.CLOSE_ORDER_EDIT_MODAL,
  payload,
})

//  VISIT OPEN MODAL
export const openVisitEditModal = (payload) => ({
  type: types.OPEN_VISIT_EDIT_MODAL,
  payload,
})

export const closeVisitEditModal = (payload) => ({
  type: types.CLOSE_VISIT_EDIT_MODAL,
  payload,
})

//  VISIT OPEN MODAL
export const openQuotationEditModal = (payload) => ({
  type: types.OPEN_QUOTATION_EDIT_MODAL,
  payload,
})

export const closeQuotationEditModal = (payload) => ({
  type: types.CLOSE_QUOTATION_EDIT_MODAL,
  payload,
})

// DELETE
export const deleteImages = (payload) => ({
  type: types.DELETE_IMAGE,
  payload,
})

export const deleteImagesSuccess = (payload) => ({
  type: types.DELETE_IMAGE_SUCCESS,
  payload,
})

export const deleteImagesFailure = (payload) => ({
  type: types.DELETE_IMAGE_FAILURE,
  payload,
})

//  OPEN MODAL
export const openPayModal = (payload) => ({
  type: types.OPEN_ORDER_PAY_MODAL,
  payload,
})

export const closePayModal = (payload) => ({
  type: types.CLOSE_ORDER_PAY_MODAL,
  payload,
})

export const getOrderDetails = (payload) => ({
  type: types.GET_ORDER_DETAILS,
  payload,
})

export const getOrderDetailsSuccess = (payload) => ({
  type: types.GET_ORDER_DETAILS_SUCCESS,
  payload,
})

export const getOrderDetailsFailure = (payload) => ({
  type: types.GET_ORDER_DETAILS_FAILURE,
  payload,
})

export const editAddon = (payload) => ({
  type: types.EDIT_ADDON,
  payload,
})

export const editAddonSuccess = (payload) => ({
  type: types.EDIT_ADDON_SUCCESS,
  payload,
})

export const editAddonFailure = (payload) => ({
  type: types.EDIT_ADDON_FAILURE,
  payload,
})

//  OPEN MODAL
export const openAddonEditModal = (payload) => ({
  type: types.OPEN_ADDON_EDIT_MODAL,
  payload,
})

export const closeAddonEditModal = (payload) => ({
  type: types.CLOSE_ADDON_EDIT_MODAL,
  payload,
})

export const checkMaxJob = (payload) => ({
  type: types.CHECK_MAX_JOB,
  payload,
})

export const checkMaxJobSuccess = (payload) => ({
  type: types.CHECK_MAX_JOB_SUCCESS,
  payload,
})

export const checkMaxJobFailure = (payload) => ({
  type: types.CHECK_MAX_JOB_FAILURE,
  payload,
})

export const getQuoteAdjustData = (payload) => ({
  type: types.GET_QUOTEADJUST_DATA,
  payload,
})

export const getQuoteAdjustDataSuccess = (payload) => ({
  type: types.GET_QUOTEADJUST_DATA_SUCCESS,
  payload,
})

export const getQuoteAdjustDataFailure = (payload) => ({
  type: types.GET_QUOTEADJUST_DATA_FAILURE,
  payload,
})
export const acceptQuoteAdjust = (payload) => ({
  type: types.ACCEPT_QUOTEADJUST_DATA,
  payload,
})

export const acceptQuoteAdjustSuccess = (payload) => ({
  type: types.ACCEPT_QUOTEADJUST_DATA_SUCCESS,
  payload,
})

export const acceptQuoteAdjustFailure = (payload) => ({
  type: types.ACCEPT_QUOTEADJUST_DATA_FAILURE,
  payload,
})

export const rejectQuoteAdjust = (payload) => ({
  type: types.REJECT_QUOTEADJUST_DATA,
  payload,
})

export const rejectQuoteAdjustSuccess = (payload) => ({
  type: types.REJECT_QUOTEADJUST_DATA_SUCCESS,
  payload,
})

export const rejectQuoteAdjustFailure = (payload) => ({
  type: types.REJECT_QUOTEADJUST_DATA_FAILURE,
  payload,
})
export const payQuoteAdjust = (payload) => ({
  type: types.PAY_QUOTEADJUST,
  payload,
})

export const payQuoteAdjustSuccess = (payload) => ({
  type: types.PAY_QUOTEADJUST_SUCCESS,
  payload,
})

export const payQuoteAdjustFailure = (payload) => ({
  type: types.PAY_QUOTEADJUST_FAILURE,
  payload,
})
