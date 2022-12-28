import * as types from "./constants";

export const openCreateCustomerModal = (payload) => ({
  type: types.CUSTOMER_CREATE_OPEN_MODAL,
  payload,
});

export const closeCreateCustomerModal = (payload) => ({
  type: types.CUSTOMER_CREATE_CLOSE_MODAL,
  payload,
});

export const openViewModal = (payload) => ({
  type: types.ORDER_VIEW_OPEN_MODAL,
  payload,
});

export const closeViewModal = (payload) => ({
  type: types.ORDER_VIEW_CLOSE_MODAL,
  payload,
});

export const getOrdersListRequest = (payload) => ({
  type: types.GET_ORDER_LIST_REQUEST,
  payload,
});

export const getOrdersListSuccess = (payload) => ({
  type: types.GET_ORDER_LIST_SUCCESS,
  payload,
});

export const getOrdersListFailure = (payload) => ({
  type: types.GET_ORDER_LIST_FAILURE,
  payload,
});

export const getCurrentOrdersRequest = (payload) => ({
  type: types.GET_CURRENT_ORDER_REQUEST,
  payload,
});

export const getCurrentOrdersSuccess = (payload) => ({
  type: types.GET_CURRENT_ORDER_SUCCESS,
  payload,
});

export const getCurrentOrdersFailure = (payload) => ({
  type: types.GET_CURRENT_ORDER_FAILURE,
  payload,
});

// ADD
export const addOrdersRequest = (payload) => ({
  type: types.ADD_ORDER_REQUEST,
  payload,
});

export const addOrdersSuccess = (payload) => ({
  type: types.ADD_ORDER_SUCCESS,
  payload,
});

export const addOrdersFailure = (payload) => ({
  type: types.ADD_ORDER_FAILURE,
  payload,
});

// EDIT
export const editOrdersRequest = (payload) => ({
  type: types.EDIT_ORDER_REQUEST,
  payload,
});

export const editOrdersSuccess = (payload) => ({
  type: types.EDIT_ORDER_SUCCESS,
  payload,
});

export const editOrdersFailure = (payload) => ({
  type: types.EDIT_ORDER_FAILURE,
  payload,
});

// DELETE
export const deleteOrdersRequest = (payload) => ({
  type: types.DELETE_ORDER_REQUEST,
  payload,
});

export const deleteOrdersSuccess = (payload) => ({
  type: types.DELETE_ORDER_SUCCESS,
  payload,
});

export const deleteOrdersFailure = (payload) => ({
  type: types.DELETE_ORDER_FAILURE,
  payload,
});

// // OPEN ADD MODAL
// export const openCouponAddModal = (payload) => ({
//   type: types.COUPON_OPEN_ADD_MODAL,
//   payload,
// });
// export const closeCouponAddModal = (payload) => ({
//   type: types.COUPON_CLOSE_ADD_MODAL,
//   payload,
// });

// // OPEN EDIT MODAL
// export const openCouponEditModal = (payload) => ({
//   type: types.COUPON_EDIT_MODAL_OPEN_AND_FETCH,
//   payload,
// });

// export const closeCouponEditModal = (payload) => ({
//   type: types.COUPON_CLOSE_EDIT_MODAL,
//   payload,
// });

// OPEN DELETE MODAL
export const openDeleteModal = (payload) => ({
  type: types.ORDER_OPEN_DELETE_MODAL,
  payload,
});

export const closeDeleteModal = (payload) => ({
  type: types.ORDER_CLOSE_DELETE_MODAL,
  payload,
});

// OPEN PRODUCT QA MODAL
export const openProductQaModal = (payload) => ({
  type: types.OPEN_ORDER_PRODUCT_QA_MODAL,
  payload,
});

export const closeProductQaModal = (payload) => ({
  type: types.CLOSE_ORDER_PRODUCT_QA_MODAL,
  payload,
});

// // Get all
// export const getCouponListRequest = (payload) => ({
//   type: types.GET_COUPON_LIST_REQUEST,
//   payload,
// });

// export const getCouponListSuccess = (payload) => ({
//   type: types.GET_COUPON_LIST_SUCCESS,
//   payload,
// });

// export const getCouponListFailure = (payload) => ({
//   type: types.GET_COUPON_LIST_FAILURE,
//   payload,
// });

// contacts actions
export const ordersOpenAddContact = (payload) => ({
  type: types.ORDERS_OPEN_CONTACTS_ADD,
  payload,
});
export const ordersCloseAddContact = (payload) => ({
  type: types.ORDERS_CLOSE_CONTACTS_ADD,
  payload,
});
export const ordersOpenEditContacts = (payload) => ({
  type: types.ORDERS_OPEN_CONTACTS_EDIT,
  payload,
});
export const ordersCloseEditContact = (payload) => ({
  type: types.ORDERS_CLOSE_CONTACTS_EDIT,
  payload,
});
export const ordersAddContact = (payload) => ({
  type: types.ORDERS_ADD_CONTACT,
  payload,
});
export const ordersAddContactSuccess = (payload) => ({
  type: types.ORDERS_ADD_CONTACT_SUCCESS,
  payload,
});
export const ordersAddContactFailure = (payload) => ({
  type: types.ORDERS_ADD_CONTACT_FAILURE,
  payload,
});
export const ordersGetContacts = (payload) => ({
  type: types.ORDERS_GET_CONTACTS,
  payload,
});
export const ordersGetContactsSuccess = (payload) => ({
  type: types.ORDERS_GET_CONTACTS_SUCCESS,
  payload,
});
export const ordersGetContactsFailure = (payload) => ({
  type: types.ORDERS_GET_CONTACTS_FAILURE,
  payload,
});
export const ordersDeleteContact = (payload) => ({
  type: types.ORDERS_DELETE_CONTACT,
  payload,
});
export const ordersDeleteContactSuccess = (payload) => ({
  type: types.ORDERS_DELETE_CONTACT_SUCCESS,
  payload,
});
export const ordersDeleteContactFailure = (payload) => ({
  type: types.ORDERS_DELETE_CONTACT_FAILURE,
  payload,
});
export const ordersSetEditContact = (payload) => ({
  type: types.ORDERS_SET_EDIT_CONTACT,
  payload,
});
export const ordersEditContact = (payload) => ({
  type: types.ORDERS_EDIT_CONTACT,
  payload,
});
export const ordersEditContactSuccess = (payload) => ({
  type: types.ORDERS_EDIT_CONTACT_SUCCESS,
  payload,
});
export const ordersEditContactFailure = (payload) => ({
  type: types.ORDERS_EDIT_CONTACT_FAILURE,
  payload,
});

export const openOrderInvoiceAddModal = (payload) => ({
  type: types.OPEN_ORDER_INVOICE_ADD_MODAL,
  payload,
});
export const openOrderInvoiceEditModal = (payload) => ({
  type: types.OPEN_ORDER_INVOICE_EDIT_MODAL,
  payload,
});
export const closeOrderInvoiceModal = (payload) => ({
  type: types.CLOSE_ORDER_INVOICE_MODAL,
  payload,
});

export const orderInvoiceAdd = (payload) => ({
  type: types.ORDER_INVOICE_ADD_REQUEST,
  payload,
});
export const orderInvoiceAddSuccess = (payload) => ({
  type: types.ORDER_INVOICE_ADD_SUCCESS,
  payload,
});
export const orderInvoiceAddFailure = (payload) => ({
  type: types.ORDER_INVOICE_ADD_FAILURE,
  payload,
});

export const orderInvoiceEdit = (payload) => ({
  type: types.ORDER_INVOICE_EDIT_REQUEST,
  payload,
});
export const orderInvoiceEditSuccess = (payload) => ({
  type: types.ORDER_INVOICE_EDIT_SUCCESS,
  payload,
});
export const orderInvoiceEditFailure = (payload) => ({
  type: types.ORDER_INVOICE_EDIT_FAILURE,
  payload,
});

export const orderInvoiceDelete = (payload) => ({
  type: types.ORDER_INVOICE_DELETE_REQUEST,
  payload,
});
export const orderInvoiceDeleteSuccess = (payload) => ({
  type: types.ORDER_INVOICE_DELETE_SUCCESS,
  payload,
});
export const orderInvoiceDeleteFailure = (payload) => ({
  type: types.ORDER_INVOICE_DELETE_FAILURE,
  payload,
});

export const getOrderInvoiceList = (payload) => ({
  type: types.ORDER_INVOICE_LIST_REQUEST,
  payload,
});
export const getOrderInvoiceListSuccess = (payload) => ({
  type: types.ORDER_INVOICE_LIST_SUCCESS,
  payload,
});
export const getOrderInvoiceListFailure = (payload) => ({
  type: types.ORDER_INVOICE_LIST_FAILURE,
  payload,
});

export const getCurrentOrderInvoice = (payload) => ({
  type: types.ORDER_CURRENT_INVOICE_REQUEST,
  payload,
});
export const getCurrentOrderInvoiceSuccess = (payload) => ({
  type: types.ORDER_CURRENT_INVOICE_SUCCESS,
  payload,
});
export const getCurrentOrderInvoiceFailure = (payload) => ({
  type: types.ORDER_CURRENT_INVOICE_FAILURE,
  payload,
});

// Complaints
export const openOrderComplaintsAddModal = (payload) => ({
  type: types.OPEN_ORDER_COMPLAINT_ADD_MODAL,
  payload,
});
export const openOrderComplaintsEditModal = (payload) => ({
  type: types.OPEN_ORDER_COMPLAINT_EDIT_MODAL,
  payload,
});
export const closeOrderComplaintsModal = (payload) => ({
  type: types.CLOSE_ORDER_COMPLAINT_MODAL,
  payload,
});

export const orderComplaintsAdd = (payload) => ({
  type: types.ORDER_COMPLAINT_ADD_REQUEST,
  payload,
});
export const orderComplaintsAddSuccess = (payload) => ({
  type: types.ORDER_COMPLAINT_ADD_SUCCESS,
  payload,
});
export const orderComplaintsAddFailure = (payload) => ({
  type: types.ORDER_COMPLAINT_ADD_FAILURE,
  payload,
});

export const orderComplaintsEdit = (payload) => ({
  type: types.ORDER_COMPLAINT_EDIT_REQUEST,
  payload,
});
export const orderComplaintsEditSuccess = (payload) => ({
  type: types.ORDER_COMPLAINT_EDIT_SUCCESS,
  payload,
});
export const orderComplaintsEditFailure = (payload) => ({
  type: types.ORDER_COMPLAINT_EDIT_FAILURE,
  payload,
});

export const orderComplaintsDelete = (payload) => ({
  type: types.ORDER_COMPLAINT_DELETE_REQUEST,
  payload,
});
export const orderComplaintsDeleteSuccess = (payload) => ({
  type: types.ORDER_COMPLAINT_DELETE_SUCCESS,
  payload,
});
export const orderComplaintsDeleteFailure = (payload) => ({
  type: types.ORDER_COMPLAINT_DELETE_FAILURE,
  payload,
});

export const getOrderComplaintsList = (payload) => ({
  type: types.ORDER_COMPLAINT_LIST_REQUEST,
  payload,
});
export const getOrderComplaintsListSuccess = (payload) => ({
  type: types.ORDER_COMPLAINT_LIST_SUCCESS,
  payload,
});
export const getOrderComplaintsListFailure = (payload) => ({
  type: types.ORDER_COMPLAINT_LIST_FAILURE,
  payload,
});

export const getCurrentOrderComplaints = (payload) => ({
  type: types.ORDER_CURRENT_COMPLAINT_REQUEST,
  payload,
});
export const getCurrentOrderComplaintsSuccess = (payload) => ({
  type: types.ORDER_CURRENT_COMPLAINT_SUCCESS,
  payload,
});
export const getCurrentOrderComplaintsFailure = (payload) => ({
  type: types.ORDER_CURRENT_COMPLAINT_FAILURE,
  payload,
});

// FILTER CUSTOMER
export const getCustomerListing = (payload) => ({
  type: types.CUSTOMERS_START_LISTING,
  payload,
});

export const setCustomerListing = (payload) => ({
  type: types.CUSTOMERS_SET_LISTING,
  payload,
});

// FILTER CATEGORIES
export const getCategory = () => ({
  type: types.GET_CATEGORIES,
});

export const getCategorySuccess = (payload) => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload,
});

export const getCategoryFailure = (payload) => ({
  type: types.GET_CATEGORIES_FAILURE,
  payload,
});

export const getFilterData = (payload) => ({
  type: types.GET_FILTER_DATA,
  payload,
});
export const getFilterDataSuccess = (payload) => ({
  type: types.GET_FILTER_DATA_SUCCESS,
  payload,
});
export const getFilterDataFailure = (payload) => ({
  type: types.GET_FILTER_DATA_FAILURE,
  payload,
});

//ADD MODAL
export const openBookedAddModal = (payload) => ({
  type: types.OPEN_ORDERS_ADD_MODAL,
  payload,
});
export const closeBookedAddModal = (payload) => ({
  type: types.CLOSE_ORDERS_ADD_MODAL,
  payload,
});
// EDIT MODAL
export const openBookedEditModal = (payload) => ({
  type: types.OPEN_ORDERS_EDIT_MODAL,
  payload,
});
export const closeBookedEditModal = (payload) => ({
  type: types.CLOSE_ORDERS_EDIT_MODAL,
  payload,
});

// ADD RESCHEDULE
export const addReschedule = (payload) => ({
  type: types.ADD_RESCHEDULE_REQUEST,
  payload,
});

export const addRescheduleSuccess = (payload) => ({
  type: types.ADD_RESCHEDULE_SUCCESS,
  payload,
});

export const addRescheduleFailure = (payload) => ({
  type: types.ADD_RESCHEDULE_FAILURE,
  payload,
});
