import produce from 'immer';

import {
  CUSTOMERS_OPEN_DELETE_MODAL,
  CUSTOMERS_CLOSE_DELETE_MODAL,
  //
  CUSTOMERS_START_ADDRESS_LIST,
  CUSTOMERS_SET_ADDRESS_LIST,
  CUSTOMERS_GET_ADDRESS_LIST_SUCCESS,
  CUSTOMERS_GET_ADDRESS_LIST_FAILURE,
  //
  CUSTOMERS_ADDRESS_VIEW_MODAL_OPEN_AND_FETCH,
  CUSTOMERS_ADDRESS_CLOSE_VIEW_MODAL,
  //
  CUSTOMERS_ADDRESS_DELETE_SUBMIT,
  CUSTOMERS_ADDRESS_DELETE_SUBMIT_SUCCESS,
  CUSTOMERS_ADDRESS_DELETE_SUBMIT_FAILURE,
  //
  CUSTOMERS_ADDRESS_OPEN_DELETE_MODAL,
  CUSTOMERS_ADDRESS_CLOSE_DELETE_MODAL,
  //
  CUSTOMERS_ADDRESS_EDIT_MODAL_OPEN_AND_FETCH,
  CUSTOMERS_ADDRESS_EDIT_MODAL_SUBMIT,
  //
  CUSTOMERS_ADDRESS_CLOSE_EDIT_MODAL,
  CUSTOMERS_ADDRESS_MODAL_SET_CUSTOMER,
  CUSTOMERS_ADDRESS_MODAL_SUBMIT_SUCCESS,
  CUSTOMERS_ADDRESS_MODAL_SUBMIT_FAILURE,
  //
  CUSTOMERS_ADDRESS_LIST_FAILURE,
  CUSTOMERS_ADDRESS_LIST_SUCCESS,
  //
  CUSTOMERS_ADDRESS_OPEN_ADD_MODAL,
  CUSTOMERS_ADDRESS_CLOSE_ADD_MODAL,

  //
  CUSTOMERS_ADDRESS_MODAL_ADD,

  // additional contacts
  ADDITIONAL_GET_CONTACTS,
  ADDITIONAL_GET_CONTACTS_SUCCESS,
  ADDITIONAL_GET_CONTACTS_FAILURE,
  ADDITIONAL_ADD_CONTACT,
  ADDITIONAL_ADD_CONTACT_SUCCESS,
  ADDITIONAL_ADD_CONTACT_FAILURE,
  ADDITIONAL_DELETE_CONTACT,
  ADDITIONAL_DELETE_CONTACT_SUCCESS,
  ADDITIONAL_DELETE_CONTACT_FAILURE,
  ADDITIONAL_SET_EDIT_CONTACT,
  ADDITIONAL_EDIT_CONTACT,
  ADDITIONAL_EDIT_CONTACT_SUCCESS,
  ADDITIONAL_EDIT_CONTACT_FAILURE,
  ADDITIONAL_CLOSE_CONTACTS_ADD,
  ADDITIONAL_OPEN_CONTACTS_EDIT,
  ADDITIONAL_CLOSE_CONTACTS_EDIT,
  ADDITIONAL_OPEN_CONTACTS_ADD,
} from './constants';

export const initialState = {
  isAddModalOpen: false,
  isViewModalOpen: false,
  isEditModalOpen: false,
  isEditing: false,
  isFetching: false,
  isSubmiting: false,
  isFetchingCustomers: false,
  filterDateRange: null,
  filterQuery: '',
  canApplyFilter: false,
  customers: { data: [] },
  currentCustomer: {},
  isDeleteModalOpen: false,
  isDeleting: false,
  deletingCustomerDetails: {},
  companies: [],
  isFetchingCompanies: false,
  alert: {},

  isAddressModelOpen: false,
  isAddressEditModalOpen: false,
  isAddressEditing: false,
  isAddressFetching: false,
  isAddressSubmiting: false,
  isFetchingCustomersAddress: false,
  customers_address: { data: [] },
  currentCustomerAddress: {},
  isAddressDeleteModalOpen: false,
  isAddressDeleting: false,
  deletingCustomerAddress: {},
  contacts: {
    data: [],
    currentContact: null,
    isFetching: false,
    isEditing: false,
    isDeleting: false,
    isAddModalOpen: false,
    isEditModalOpen: false,
  },
};

const customerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {

      case CUSTOMERS_OPEN_DELETE_MODAL:
        draft.isDeleteModalOpen = true;
        draft.deletingCustomerDetails = action.payload;
        break;
      case CUSTOMERS_CLOSE_DELETE_MODAL:
        draft.isDeleteModalOpen = false;
        draft.deletingCustomerDetails = {};
        break;



      case CUSTOMERS_SET_ADDRESS_LIST:
        draft.isFetchingCustomersAddress = false;
        draft.customers_address = action.payload;
        break;

      case CUSTOMERS_ADDRESS_LIST_SUCCESS:
        draft.isFetchingCustomersAddress = false;
        break;

      case CUSTOMERS_START_ADDRESS_LIST:
        draft.isFetchingCustomersAddress = true;
        break;

      case CUSTOMERS_ADDRESS_LIST_FAILURE:
        draft.isFetchingCustomersAddress = false;
        break;

      case CUSTOMERS_ADDRESS_OPEN_ADD_MODAL:
        draft.isAddressModelOpen = true;
        // draft.currentCustomerAddress = action.payload;
        break;

      case CUSTOMERS_ADDRESS_CLOSE_ADD_MODAL:
        draft.isAddressModelOpen = false;
        draft.currentCustomerAddress = {};
        break;

      case CUSTOMERS_ADDRESS_MODAL_ADD:
        draft.isAddressSubmiting = true;
        break;

      case CUSTOMERS_ADDRESS_MODAL_SUBMIT_SUCCESS:
        draft.isAddressSubmiting = false;
        draft.isAddressModelOpen = false;
        draft.isAddressEditModalOpen = false;

        break;

      case CUSTOMERS_ADDRESS_MODAL_SUBMIT_FAILURE:
        draft.isAddressSubmiting = false;
        draft.isAddressModelOpen = false;
        draft.isAddressEditModalOpen = false;
        break;

      case CUSTOMERS_ADDRESS_EDIT_MODAL_OPEN_AND_FETCH:
        draft.isAddressEditModalOpen = true;
        draft.isAddressEditing = true;
        draft.currentCustomerAddress = action.payload;
        break;

      case CUSTOMERS_ADDRESS_CLOSE_EDIT_MODAL:
        draft.isAddressEditModalOpen = false;
        draft.isAddressEditing = false;
        draft.currentCustomerAddress = {};
        break;

      case CUSTOMERS_ADDRESS_DELETE_SUBMIT:
        draft.isAddressDeleting = true;
        break;
      case CUSTOMERS_ADDRESS_DELETE_SUBMIT_SUCCESS:
        draft.isAddressDeleting = false;
        break;
      case CUSTOMERS_ADDRESS_DELETE_SUBMIT_FAILURE:
        draft.isAddressDeleting = false;
        break;
      case CUSTOMERS_ADDRESS_OPEN_DELETE_MODAL:
        draft.isAddressDeleteModalOpen = true;
        draft.deletingCustomerAddress = action.payload;
        break;
      case CUSTOMERS_ADDRESS_CLOSE_DELETE_MODAL:
        draft.isAddressDeleteModalOpen = false;
        draft.deletingCustomerAddress = {};
        break;
      case ADDITIONAL_OPEN_CONTACTS_ADD:
        draft.contacts.isAddModalOpen = true;
        draft.contacts.isEditModalOpen = false;
        draft.contacts.isEditing = false;
        break;
      case ADDITIONAL_CLOSE_CONTACTS_ADD:
        draft.contacts.isAddModalOpen = false;
        draft.contacts.isEditModalOpen = false;
        draft.contacts.isEditing = false;
        break;
      case ADDITIONAL_OPEN_CONTACTS_EDIT:
        draft.contacts.isEditModalOpen = true;
        draft.contacts.isEditing = true;
        draft.contacts.currentContact = action.payload;
        break;
      case ADDITIONAL_CLOSE_CONTACTS_EDIT:
        draft.contacts.isEditModalOpen = false;
        draft.contacts.isEditing = false;
        draft.contacts.currentContact = null;
        break;
      case ADDITIONAL_ADD_CONTACT:
        draft.contacts.isAddLoading = true;
        break;
      case ADDITIONAL_ADD_CONTACT_SUCCESS:
        draft.contacts.isAddLoading = false;
        break;
      case ADDITIONAL_ADD_CONTACT_FAILURE:
        draft.contacts.isAddLoading = false;
        break;
      case ADDITIONAL_GET_CONTACTS:
        draft.contacts.isFetching = true;
        break;
      case ADDITIONAL_GET_CONTACTS_SUCCESS:
        draft.contacts.isFetching = false;
        draft.contacts.data = action.payload;
        break;
      case ADDITIONAL_GET_CONTACTS_FAILURE:
        draft.contacts.isFetching = false;
        break;
      case ADDITIONAL_DELETE_CONTACT:
        draft.contacts.isDeleting = true;
        break;
      case ADDITIONAL_DELETE_CONTACT_SUCCESS:
        draft.contacts.isDeleting = false;
        break;
      case ADDITIONAL_DELETE_CONTACT_FAILURE:
        draft.contacts.isDeleting = false;
        break;
      case ADDITIONAL_SET_EDIT_CONTACT:
        draft.contacts.currentContact = action.payload;
        break;
      case ADDITIONAL_EDIT_CONTACT:
        draft.contacts.isFetching = true;
        break;
      case ADDITIONAL_EDIT_CONTACT_SUCCESS:
        draft.contacts.currentContact = null;
        draft.contacts.isFetching = false;
        break;
      case ADDITIONAL_EDIT_CONTACT_FAILURE:
        draft.contacts.isFetching = false;
        break;
      default:
        return state;
    }
  });
export default customerReducer;
