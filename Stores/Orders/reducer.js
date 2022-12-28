import produce from "immer";
import {
  // ADD MODAL
  ORDER_OPEN_ADD_MODAL,
  ORDER_CLOSE_ADD_MODAL,

  //VIEW MODAL
  ORDER_VIEW_OPEN_MODAL,
  ORDER_VIEW_CLOSE_MODAL,

  // DELETE MODAL
  ORDER_OPEN_DELETE_MODAL,
  ORDER_CLOSE_DELETE_MODAL,

  // PRODUCT QA MODAL
  OPEN_ORDER_PRODUCT_QA_MODAL,
  CLOSE_ORDER_PRODUCT_QA_MODAL,

  //FETCH LIST
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,

  //ADD
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,

  //EDIT
  EDIT_ORDER_REQUEST,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAILURE,

  //DELETE
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,

  //FETCH CURRENT
  GET_CURRENT_ORDER_REQUEST,
  GET_CURRENT_ORDER_SUCCESS,
  GET_CURRENT_ORDER_FAILURE,

  // CREATE CUSTOMER MODAL
  CUSTOMER_CREATE_OPEN_MODAL,
  CUSTOMER_CREATE_CLOSE_MODAL,

  // ADDTIONAL CONTACTS
  ORDERS_GET_CONTACTS,
  ORDERS_GET_CONTACTS_SUCCESS,
  ORDERS_GET_CONTACTS_FAILURE,
  ORDERS_ADD_CONTACT,
  ORDERS_ADD_CONTACT_SUCCESS,
  ORDERS_ADD_CONTACT_FAILURE,
  ORDERS_OPEN_CONTACTS_ADD,
  ORDERS_CLOSE_CONTACTS_ADD,
  ORDERS_OPEN_CONTACTS_EDIT,
  ORDERS_CLOSE_CONTACTS_EDIT,
  ORDERS_DELETE_CONTACT,
  ORDERS_DELETE_CONTACT_SUCCESS,
  ORDERS_DELETE_CONTACT_FAILURE,
  ORDERS_SET_EDIT_CONTACT,
  ORDERS_EDIT_CONTACT,
  ORDERS_EDIT_CONTACT_SUCCESS,
  ORDERS_EDIT_CONTACT_FAILURE,
  OPEN_ORDER_INVOICE_ADD_MODAL,
  OPEN_ORDER_INVOICE_EDIT_MODAL,
  CLOSE_ORDER_INVOICE_MODAL,
  ORDER_INVOICE_ADD_REQUEST,
  ORDER_INVOICE_ADD_SUCCESS,
  ORDER_INVOICE_ADD_FAILURE,
  ORDER_INVOICE_EDIT_REQUEST,
  ORDER_INVOICE_EDIT_SUCCESS,
  ORDER_INVOICE_EDIT_FAILURE,
  ORDER_INVOICE_DELETE_REQUEST,
  ORDER_INVOICE_DELETE_SUCCESS,
  ORDER_INVOICE_DELETE_FAILURE,
  ORDER_INVOICE_LIST_REQUEST,
  ORDER_INVOICE_LIST_SUCCESS,
  ORDER_INVOICE_LIST_FAILURE,
  ORDER_CURRENT_INVOICE_REQUEST,
  ORDER_CURRENT_INVOICE_SUCCESS,
  ORDER_CURRENT_INVOICE_FAILURE,

  //complaints
  OPEN_ORDER_COMPLAINT_ADD_MODAL,
  OPEN_ORDER_COMPLAINT_EDIT_MODAL,
  CLOSE_ORDER_COMPLAINT_MODAL,
  ORDER_COMPLAINT_ADD_REQUEST,
  ORDER_COMPLAINT_ADD_SUCCESS,
  ORDER_COMPLAINT_ADD_FAILURE,
  ORDER_COMPLAINT_EDIT_REQUEST,
  ORDER_COMPLAINT_EDIT_SUCCESS,
  ORDER_COMPLAINT_EDIT_FAILURE,
  ORDER_COMPLAINT_DELETE_REQUEST,
  ORDER_COMPLAINT_DELETE_SUCCESS,
  ORDER_COMPLAINT_DELETE_FAILURE,
  ORDER_COMPLAINT_LIST_REQUEST,
  ORDER_COMPLAINT_LIST_SUCCESS,
  ORDER_COMPLAINT_LIST_FAILURE,
  ORDER_CURRENT_COMPLAINT_REQUEST,
  ORDER_CURRENT_COMPLAINT_SUCCESS,
  ORDER_CURRENT_COMPLAINT_FAILURE,

  //FILTER

  //CUSTOMERS
  CUSTOMERS_START_LISTING,
  CUSTOMERS_SET_LISTING,

  //CATEGORIES
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,

  //
  GET_FILTER_DATA,
  GET_FILTER_DATA_SUCCESS,
  GET_FILTER_DATA_FAILURE,
  //
  OPEN_ORDERS_ADD_MODAL,
  CLOSE_ORDERS_ADD_MODAL,
  OPEN_ORDERS_EDIT_MODAL,
  CLOSE_ORDERS_EDIT_MODAL,
  ADD_RESCHEDULE_REQUEST,
  ADD_RESCHEDULE_SUCCESS,
  ADD_RESCHEDULE_FAILURE,
} from "./constants";

export const initialState = {
  isAddModalOpen: false,
  isEditModalOpen: false,

  isCustomerCreateModalOpen: false,

  isViewModalOpen: false,

  //Listing
  isFetchingOrderList: false,
  ordersList: [],

  // ADD
  isAddingOrder: false,

  // EDIT
  isEditingOrder: false,
  orderDetail: {},

  // DELETE
  isDeleteModalOpen: false,
  isDeleting: false,
  deletingData: {},

  //Current order
  isFetchingCurrentOrder: false,
  currentOrder: {},

  currentId: "",
  currentData: "",
  isFetchingCoupon: false,

  //INVOICE
  isInvoiceAddModalOpen: false,
  isInvoiceEditModalOpen: false,
  isInvoiceEditing: false,

  inVoiceList: {
    sales_orders: [],
    purchase_orders: [],
  },
  currentInVoice: {},
  inVoiceListFetching: false,
  currentInVoiceFetching: false,

  //COMPLAINT
  isComplaintAddModalOpen: false,
  isComplaintEditModalOpen: false,
  isComplaintEditing: false,

  complaintList: [],
  currentComplaint: {},
  complaintListFetching: false,
  currentComplaintFetching: false,

  //Additional Contacts
  contacts: {
    data: [],
    currentContact: null,
    isFetching: false,
    isEditing: false,
    isDeleting: false,
    isAddModalOpen: false,
    isEditModalOpen: false,
  },
  isProductQaModalOpen: false,

  //FILTERS
  isFetchingCustomers: false,
  customers: { data: [] },

  // CATEGORIES
  isCategoryFetching: false,
  categories: [],

  // FILTER DATA
  isFetchingFilters: false,
  filters: {
    status_codes: [],
    customers: [],
    category: [],
  },
  // Reschedule Modal
  currentBookedOrder: [],
};

const OrdersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //Complaint MODAL
      case OPEN_ORDER_COMPLAINT_ADD_MODAL:
        draft.isComplaintAddModalOpen = true;
        draft.isComplaintEditing = false;
        break;
      case OPEN_ORDER_COMPLAINT_EDIT_MODAL:
        draft.isComplaintEditModalOpen = true;
        draft.isComplaintEditing = true;
        draft.currentComplaintFetching = true;
        break;
      case CLOSE_ORDER_COMPLAINT_MODAL:
        draft.isComplaintAddModalOpen = false;
        draft.isComplaintEditModalOpen = false;
        draft.isComplaintEditing = false;
        break;

      case ORDER_COMPLAINT_DELETE_SUCCESS:
        draft.isDeleteModalOpen = false;
        draft.isDeleting = false;
        draft.deletingData = {};
        break;

      case ORDER_COMPLAINT_DELETE_FAILURE:
        draft.isDeleteModalOpen = false;
        draft.isDeleting = false;
        draft.deletingData = {};
        break;

      case ORDER_COMPLAINT_LIST_REQUEST:
        draft.complaintListFetching = true;
        break;
      case ORDER_COMPLAINT_LIST_SUCCESS:
        draft.complaintListFetching = false;
        draft.complaintList = action.payload;
        break;
      case ORDER_COMPLAINT_LIST_FAILURE:
        draft.complaintListFetching = false;
        break;

      case ORDER_CURRENT_COMPLAINT_REQUEST:
        draft.currentComplaintFetching = true;
        break;
      case ORDER_CURRENT_COMPLAINT_SUCCESS:
        draft.currentComplaintFetching = false;
        draft.currentComplaint = action.payload;
        break;
      case ORDER_CURRENT_COMPLAINT_FAILURE:
        draft.currentComplaintFetching = false;
        draft.currentComplaint = {};
        break;

      //INVOICE MODAL
      case OPEN_ORDER_INVOICE_ADD_MODAL:
        draft.isInvoiceAddModalOpen = true;
        draft.isInvoiceEditing = false;
        break;
      case OPEN_ORDER_INVOICE_EDIT_MODAL:
        draft.isInvoiceEditModalOpen = true;
        draft.isInvoiceEditing = true;
        draft.currentInVoiceFetching = true;
        break;
      case CLOSE_ORDER_INVOICE_MODAL:
        draft.isInvoiceAddModalOpen = false;
        draft.isInvoiceEditModalOpen = false;
        draft.isInvoiceEditing = false;
        break;

      case ORDER_INVOICE_DELETE_SUCCESS:
        draft.isDeleteModalOpen = false;
        draft.isDeleting = false;
        draft.deletingData = {};
        break;

      case ORDER_INVOICE_DELETE_FAILURE:
        draft.isDeleteModalOpen = false;
        draft.isDeleting = false;
        draft.deletingData = {};
        break;

      case ORDER_INVOICE_LIST_REQUEST:
        draft.inVoiceListFetching = true;
        break;
      case ORDER_INVOICE_LIST_SUCCESS:
        draft.inVoiceListFetching = false;
        draft.inVoiceList = action.payload;
        break;
      case ORDER_INVOICE_LIST_FAILURE:
        draft.inVoiceListFetching = false;
        break;

      case ORDER_CURRENT_INVOICE_REQUEST:
        draft.currentInVoiceFetching = true;
        break;
      case ORDER_CURRENT_INVOICE_SUCCESS:
        draft.currentInVoiceFetching = false;
        draft.currentInVoice = action.payload;
        break;
      case ORDER_CURRENT_INVOICE_FAILURE:
        draft.currentInVoiceFetching = false;
        draft.currentInVoice = {};
        break;

      //PRODUCT QA MODAL
      case OPEN_ORDER_PRODUCT_QA_MODAL:
        draft.isProductQaModalOpen = true;
        break;
      case CLOSE_ORDER_PRODUCT_QA_MODAL:
        draft.isProductQaModalOpen = false;
        break;
      // CUSTOMER MODAL
      case CUSTOMER_CREATE_OPEN_MODAL:
        draft.isCustomerCreateModalOpen = true;
        break;
      case CUSTOMER_CREATE_CLOSE_MODAL:
        draft.isCustomerCreateModalOpen = false;
        break;

      // OPEN ADD MODAL
      // case COUPON_OPEN_ADD_MODAL:
      //   draft.isAddModalOpen = true;
      //   break;
      // case COUPON_CLOSE_ADD_MODAL:
      //   draft.isAddModalOpen = false;
      //   break;
      // OPEN EDIT MODAL
      // case COUPON_EDIT_MODAL_OPEN_AND_FETCH:
      //   draft.isEditModalOpen = true;
      //   draft.isFetchingCoupon = true;
      //   draft.currentId = action.payload;
      //   break;
      // case GET_CURRENT_COUPON_SUCCESS:
      //   draft.isFetchingCoupon = false;
      //   draft.currentData = action.payload;
      //   break;
      // case GET_CURRENT_COUPON_FAILURE:
      //   draft.isFetchingCoupon = false;
      //   break;
      // case COUPON_CLOSE_EDIT_MODAL:
      //   draft.isEditModalOpen = false;
      //   break;

      // view MODAL
      case ORDER_VIEW_OPEN_MODAL:
        draft.isViewModalOpen = true;
        break;
      case ORDER_VIEW_CLOSE_MODAL:
        draft.isViewModalOpen = false;
        break;

      // DELETE MODAL
      case ORDER_OPEN_DELETE_MODAL:
        draft.isDeleteModalOpen = true;
        draft.deletingData = action.payload;
        break;
      case ORDER_CLOSE_DELETE_MODAL:
        draft.isDeleteModalOpen = false;
        draft.deletingData = {};
        break;

      // CURRENT ORDER
      case GET_CURRENT_ORDER_REQUEST:
        draft.isFetchingCurrentOrder = true;
        break;
      case GET_CURRENT_ORDER_SUCCESS:
        draft.isFetchingCurrentOrder = false;
        draft.currentOrder = action.payload;
        break;
      case GET_CURRENT_ORDER_FAILURE:
        draft.isFetchingCurrentOrder = false;
        break;

      // Listing
      case GET_ORDER_LIST_REQUEST:
        draft.isFetchingOrderList = true;
        break;
      case GET_ORDER_LIST_SUCCESS:
        draft.isFetchingOrderList = false;
        draft.ordersList = action.payload;
        break;
      case GET_ORDER_LIST_FAILURE:
        draft.isFetchingOrderList = false;
        break;

      //ADD
      case ADD_ORDER_REQUEST:
        draft.isAddingOrder = true;
        break;
      case ADD_ORDER_SUCCESS:
        draft.isAddingOrder = false;
        draft.orderDetail = action.payload;
        // draft.isAddModalOpen = false;
        break;
      case ADD_ORDER_FAILURE:
        draft.isAddingOrder = false;
        break;

      //EDIT
      case EDIT_ORDER_REQUEST:
        draft.isEditingOrder = true;
        break;
      case EDIT_ORDER_SUCCESS:
        draft.isEditingOrder = false;
        // draft.isEditModalOpen = false;
        break;
      case EDIT_ORDER_FAILURE:
        draft.isEditingOrder = false;
        break;

      //DELETE
      case DELETE_ORDER_REQUEST:
        draft.isDeleting = true;
        break;
      case DELETE_ORDER_SUCCESS:
        draft.isDeleting = false;
        draft.isDeleteModalOpen = false;
        break;
      case DELETE_ORDER_FAILURE:
        draft.isDeleting = false;
        draft.isDeleteModalOpen = false;
        break;

      case ORDERS_OPEN_CONTACTS_ADD:
        draft.contacts.isAddModalOpen = true;
        break;
      case ORDERS_CLOSE_CONTACTS_ADD:
        draft.contacts.isAddModalOpen = false;
        break;
      case ORDERS_OPEN_CONTACTS_EDIT:
        draft.contacts.isEditModalOpen = true;
        draft.contacts.isEditing = true;
        draft.contacts.currentContact = action.payload;
        break;
      case ORDERS_CLOSE_CONTACTS_EDIT:
        draft.contacts.isEditModalOpen = false;
        draft.contacts.isEditing = false;
        draft.contacts.currentContact = null;
        break;
      case ORDERS_ADD_CONTACT:
        draft.contacts.isAddLoading = true;
        break;
      case ORDERS_ADD_CONTACT_SUCCESS:
        draft.contacts.isAddLoading = false;
        break;
      case ORDERS_ADD_CONTACT_FAILURE:
        draft.contacts.isAddLoading = false;
        break;
      case ORDERS_GET_CONTACTS:
        draft.contacts.isFetching = true;
        break;
      case ORDERS_GET_CONTACTS_SUCCESS:
        draft.contacts.isFetching = false;
        draft.contacts.data = action.payload;
        break;
      case ORDERS_GET_CONTACTS_FAILURE:
        draft.contacts.isFetching = false;
        break;
      case ORDERS_DELETE_CONTACT:
        draft.contacts.isDeleting = true;
        break;
      case ORDERS_DELETE_CONTACT_SUCCESS:
        draft.contacts.isDeleting = false;
        break;
      case ORDERS_DELETE_CONTACT_FAILURE:
        draft.contacts.isDeleting = false;
        break;
      case ORDERS_SET_EDIT_CONTACT:
        draft.contacts.currentContact = action.payload;
        break;
      case ORDERS_EDIT_CONTACT:
        draft.contacts.isFetching = true;
        break;
      case ORDERS_EDIT_CONTACT_SUCCESS:
        draft.contacts.currentContact = null;
        draft.contacts.isFetching = false;
        break;
      case ORDERS_EDIT_CONTACT_FAILURE:
        draft.contacts.isFetching = false;
        break;

      // FILTER CUSTOMERS
      case CUSTOMERS_START_LISTING:
        draft.isFetchingCustomers = true;
        break;
      case CUSTOMERS_SET_LISTING:
        draft.isFetchingCustomers = false;
        draft.customers = action.payload;
        break;

      // FILTER CATEGORIES
      case GET_CATEGORIES:
        draft.isCategoryFetching = true;
        break;
      case GET_CATEGORIES_SUCCESS:
        draft.isCategoryFetching = false;
        draft.categories = action.payload;
        break;
      case GET_CATEGORIES_FAILURE:
        draft.isCategoryFetching = false;
        break;

      case GET_FILTER_DATA:
        draft.isFetchingFilters = true;
        break;
      case GET_FILTER_DATA_SUCCESS:
        draft.isFetchingFilters = false;
        draft.filters = { ...draft.filters, ...action.payload };
        break;
      case GET_FILTER_DATA_FAILURE:
        draft.isFetchingFilters = false;
        break;

      // ADD MODAL
      case OPEN_ORDERS_ADD_MODAL:
        draft.isAddModalOpen = true;
        draft.currentBookedOrder = action.payload?.currentBookedOrder;
        break;
      case CLOSE_ORDERS_ADD_MODAL:
        draft.isAddModalOpen = false;
        break;

      // EDIT MODAL
      case OPEN_ORDERS_EDIT_MODAL:
        draft.isEditModalOpen = true;
        draft.currentBookedOrder = action.payload?.currentBookedOrder;
        break;
      case CLOSE_ORDERS_EDIT_MODAL:
        draft.isEditModalOpen = false;
        break;

      // ADD RESCHEDULE
      case ADD_RESCHEDULE_REQUEST:
        draft.isAddingReschedule = true;
        break;
      case ADD_RESCHEDULE_SUCCESS:
        draft.isAddingReschedule = false;
        draft.isEditModalOpen = false;
        break;
      case ADD_RESCHEDULE_FAILURE:
        draft.isAddingReschedule = false;
        break;
      default:
        return state;
    }
  });

export default OrdersReducer;
