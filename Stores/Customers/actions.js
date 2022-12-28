import {
  CUSTOMERS_CLEANUP,
  CUSTOMERS_SET_DATEFILTER,
  CUSTOMERS_START_LISTING,
  CUSTOMERS_SET_LISTING,
  CUSTOMERS_VIEW_MODAL_OPEN_AND_FETCH,
  CUSTOMERS_CLOSE_VIEW_MODAL,
  CUSTOMERS_DELETE_SUBMIT,
  CUSTOMERS_DELETE_SUBMIT_SUCCESS,
  CUSTOMERS_DELETE_SUBMIT_FAILURE,
  CUSTOMERS_OPEN_DELETE_MODAL,
  CUSTOMERS_CLOSE_DELETE_MODAL,
  CUSTOMERS_EDIT_MODAL_OPEN_AND_FETCH,
  CUSTOMERS_EDIT_MODAL_SUBMIT,
  CUSTOMERS_CLOSE_EDIT_MODAL,
  CUSTOMERS_MODAL_SET_CUSTOMER,
  CUSTOMERS_MODAL_SUBMIT_SUCCESS,
  CUSTOMERS_MODAL_SUBMIT_FAILURE,
  CUSTOMERS_SET_FILTER_QUERY,
  CUSTOMERS_CLEAR_FILTERS,
  CUSTOMERS_GET_COMPANIES,
  CUSTOMERS_SET_COMPANIES,

  //
  CUSTOMERS_START_ADDRESS_LIST,
  CUSTOMERS_SET_ADDRESS_LIST,
  CUSTOMERS_ADDRESS_LIST_SUCCESS,
  CUSTOMERS_ADDRESS_LIST_FAILURE,
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
  CUSTOMERS_ADD_MODAL_SUBMIT,
  CUSTOMERS_ADD_MODAL_SUBMIT_SUCCESS,
  CUSTOMERS_ADD_MODAL_SUBMIT_FAILURE,
  //
  CUSTOMERS_ADDRESS_OPEN_ADD_MODAL,
  CUSTOMERS_ADDRESS_CLOSE_ADD_MODAL,
  CUSTOMERS_ADDRESS_MODAL_ADD,
  //
  CUSTOMERS_ADDRESS_MODAL_EDIT_SUBMIT_SUCCESS,
  CUSTOMERS_ADDRESS_MODAL_EDIT_SUBMIT_FAILURE,

  // additional contacts
  ADDITIONAL_GET_CONTACTS,
  ADDITIONAL_GET_CONTACTS_SUCCESS,
  ADDITIONAL_GET_CONTACTS_FAILURE,
  ADDITIONAL_ADD_CONTACT,
  ADDITIONAL_ADD_CONTACT_SUCCESS,
  ADDITIONAL_ADD_CONTACT_FAILURE,
  ADDITIONAL_OPEN_CONTACTS_ADD,
  ADDITIONAL_CLOSE_CONTACTS_ADD,
  ADDITIONAL_OPEN_CONTACTS_EDIT,
  ADDITIONAL_CLOSE_CONTACTS_EDIT,
  ADDITIONAL_DELETE_CONTACT,
  ADDITIONAL_DELETE_CONTACT_SUCCESS,
  ADDITIONAL_DELETE_CONTACT_FAILURE,
  ADDITIONAL_SET_EDIT_CONTACT,
  ADDITIONAL_EDIT_CONTACT,
  ADDITIONAL_EDIT_CONTACT_SUCCESS,
  ADDITIONAL_EDIT_CONTACT_FAILURE,
} from './constants';

// export const customerModalSetCustomer = (payload) => ({
//   type: CUSTOMERS_MODAL_SET_CUSTOMER,
//   payload,
// });

// export const getCustomerListing = (payload) => ({
//   type: CUSTOMERS_START_LISTING,
//   payload,
// });

// export const setCustomerListing = (payload) => ({
//   type: CUSTOMERS_SET_LISTING,
//   payload,
// });

// export const setFilterDateRange = (payload) => ({
//   type: CUSTOMERS_SET_DATEFILTER,
//   payload,
// });

// export const setFilterQuery = (payload) => ({
//   type: CUSTOMERS_SET_FILTER_QUERY,
//   payload,
// });

// export const clearFilters = () => ({
//   type: CUSTOMERS_CLEAR_FILTERS,
// });

// export const customerCleanup = () => ({
//   type: CUSTOMERS_CLEANUP,
// });

// export const customerViewModalStartFetching = (payload) => ({
//   type: CUSTOMERS_VIEW_MODAL_OPEN_AND_FETCH,
//   payload,
// });

// export const customerSubmitSuccess = (payload) => ({
//   type: CUSTOMERS_MODAL_SUBMIT_SUCCESS,
//   payload,
// });

// export const customerSubmitFailure = (payload) => ({
//   type: CUSTOMERS_MODAL_SUBMIT_FAILURE,
//   payload,
// });

// export const closeCustomerViewModal = (payload) => ({
//   type: CUSTOMERS_CLOSE_VIEW_MODAL,
//   payload,
// });

// export const deleteCustomer = (payload) => ({
//   type: CUSTOMERS_DELETE_SUBMIT,
//   payload,
// });

// export const deleteCustomerSuccess = (payload) => ({
//   type: CUSTOMERS_DELETE_SUBMIT_SUCCESS,
//   payload,
// });

// export const deleteCustomerFailure = (payload) => ({
//   type: CUSTOMERS_DELETE_SUBMIT_FAILURE,
//   payload,
// });

// export const closeCustomerEditModal = (payload) => ({
//   type: CUSTOMERS_CLOSE_EDIT_MODAL,
//   payload,
// });

// export const submitCustomerEdit = (payload) => ({
//   type: CUSTOMERS_EDIT_MODAL_SUBMIT,
//   payload,
// });

// export const customerEditModalStartFetching = (payload) => ({
//   type: CUSTOMERS_EDIT_MODAL_OPEN_AND_FETCH,
//   payload,
// });

// export const getCompanies = () => ({
//   type: CUSTOMERS_GET_COMPANIES,
// });

// export const setCompanies = (payload) => ({
//   type: CUSTOMERS_SET_COMPANIES,
//   payload,
// });

// // Additional contacts
// // contacts actions
// //NEW

export const additionalGetContacts = (payload) => ({
  type: ADDITIONAL_GET_CONTACTS,
  payload,
});
export const additionalGetContactsSuccess = (payload) => ({
  type: ADDITIONAL_GET_CONTACTS_SUCCESS,
  payload,
});
export const additionalGetContactsFailure = (payload) => ({
  type: ADDITIONAL_GET_CONTACTS_FAILURE,
  payload,
});


// Additional contacts
// contacts actions
export const additionalOpenAddContact = (payload) => {
  console.log('here');
  return {
    type: ADDITIONAL_OPEN_CONTACTS_ADD,
    payload,
  };
};

export const additionalCloseAddContact = (payload) => ({
  type: ADDITIONAL_CLOSE_CONTACTS_ADD,
  payload,
});
export const additionalOpenEditContacts = (payload) => ({
  type: ADDITIONAL_OPEN_CONTACTS_EDIT,
  payload,
});
export const additionalCloseEditContact = (payload) => ({
  type: ADDITIONAL_CLOSE_CONTACTS_EDIT,
  payload,
});
export const additionalAddContact = (payload) => ({
  type: ADDITIONAL_ADD_CONTACT,
  payload,
});
export const additionalAddContactSuccess = (payload) => ({
  type: ADDITIONAL_ADD_CONTACT_SUCCESS,
  payload,
});
export const additionalAddContactFailure = (payload) => ({
  type: ADDITIONAL_ADD_CONTACT_FAILURE,
  payload,
});
export const additionalDeleteContact = (payload) => ({
  type: ADDITIONAL_DELETE_CONTACT,
  payload,
});
export const additionalDeleteContactSuccess = (payload) => ({
  type: ADDITIONAL_DELETE_CONTACT_SUCCESS,
  payload,
});
export const additionalDeleteContactFailure = (payload) => ({
  type: ADDITIONAL_DELETE_CONTACT_FAILURE,
  payload,
});
export const additionalSetEditContact = (payload) => ({
  type: ADDITIONAL_SET_EDIT_CONTACT,
  payload,
});
export const additionalEditContact = (payload) => ({
  type: ADDITIONAL_EDIT_CONTACT,
  payload,
});
export const additionalEditContactSuccess = (payload) => ({
  type: ADDITIONAL_EDIT_CONTACT_SUCCESS,
  payload,
});
export const additionalEditContactFailure = (payload) => ({
  type: ADDITIONAL_EDIT_CONTACT_FAILURE,
  payload,
});



// customer set address
export const getCustomerAddressListing = (payload) => ({
  type: CUSTOMERS_START_ADDRESS_LIST,
  payload,
});

export const setCustomerAddressListing = (payload) => ({
  type: CUSTOMERS_SET_ADDRESS_LIST,
  payload,
});

export const customerAddressListingSuccess = (payload) => ({
  type: CUSTOMERS_ADDRESS_LIST_SUCCESS,
  payload,
});

export const customerAddressListingFailure = (payload) => ({
  type: CUSTOMERS_ADDRESS_LIST_FAILURE,
  payload,
});

export const customerAddressSubmitSuccess = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_SUBMIT_SUCCESS,
  payload,
});

export const customerAddressSubmitFailure = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_SUBMIT_FAILURE,
  payload,
});

export const customerAddressEditModalStartFetching = (payload) => ({
  type: CUSTOMERS_ADDRESS_EDIT_MODAL_OPEN_AND_FETCH,
  payload,
});

export const setCustomerAddressEditModal = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_SET_CUSTOMER,
  payload,
});

export const closeCustomerAddressEditModel = (payload) => ({
  type: CUSTOMERS_ADDRESS_CLOSE_EDIT_MODAL,
  payload,
});

// delete customer address
export const customerAddressDeleteSubmit = (payload) => ({
  type: CUSTOMERS_ADDRESS_DELETE_SUBMIT,
  payload,
});

export const customerAddressDeleteSubmitSuccess = (payload) => ({
  type: CUSTOMERS_ADDRESS_DELETE_SUBMIT_SUCCESS,
  payload,
});

export const customerAddressDeleteSubmitFailure = (payload) => ({
  type: CUSTOMERS_ADDRESS_DELETE_SUBMIT_FAILURE,
  payload,
});

// open - close delete model
export const openCustomerAddressDeleteModel = (payload) => ({
  type: CUSTOMERS_ADDRESS_OPEN_DELETE_MODAL,
  payload,
});

export const closeCustomerAddressDeleteModel = (payload) => ({
  type: CUSTOMERS_ADDRESS_CLOSE_DELETE_MODAL,
  payload,
});

export const submitCustomerAdd = (payload) => ({
  type: CUSTOMERS_ADD_MODAL_SUBMIT,
  payload,
});

export const submitCustomerAddSuccess = (payload) => ({
  type: CUSTOMERS_ADD_MODAL_SUBMIT_SUCCESS,
  payload,
});

export const submitCustomerAddFailure = (payload) => ({
  type: CUSTOMERS_ADD_MODAL_SUBMIT_FAILURE,
  payload,
});

export const submitCustomerAddressEdit = (payload) => ({
  type: CUSTOMERS_ADDRESS_EDIT_MODAL_SUBMIT,
  payload,
});

// open - close add model
export const openCustomerAddressAddModel = (payload) => ({
  type: CUSTOMERS_ADDRESS_OPEN_ADD_MODAL,
  payload,
});

export const closeCustomerAddressAddModel = (payload) => ({
  type: CUSTOMERS_ADDRESS_CLOSE_ADD_MODAL,
  payload,
});

// add address
export const submitCustomerAddressAdd = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_ADD,
  payload,
});

export const submitCustomerAddressAddSuccess = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_SUBMIT_SUCCESS,
  payload,
});

export const submitCustomerAddressAddFailure = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_SUBMIT_FAILURE,
  payload,
});

export const submitCustomerAddressEditSuccess = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_EDIT_SUBMIT_SUCCESS,
  payload,
});

export const submitCustomerAddressEditFailure = (payload) => ({
  type: CUSTOMERS_ADDRESS_MODAL_EDIT_SUBMIT_FAILURE,
  payload,
});


export const openDeleteModal = (payload) => ({
  type: CUSTOMERS_OPEN_DELETE_MODAL,
  payload,
});

export const closeDeleteModal = (payload) => ({
  type: CUSTOMERS_CLOSE_DELETE_MODAL,
  payload,
});
