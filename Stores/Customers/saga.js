import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import api from '../../utils/api';
import QueryString from 'query-string';
import {
  // getCustomerListing as getCustomerListingAction,
  // setCustomerListing,
  // customerModalSetCustomer,
  // customerSubmitFailure,
  // closeDeleteModal,
  // deleteCustomerSuccess,
  // deleteCustomerFailure,
  // customerSubmitSuccess,
  // setCompanies,
  setCustomerAddressListing,
  customerAddressListingSuccess,
  customerAddressListingFailure,
  submitCustomerAddressAddSuccess,
  submitCustomerAddressAddFailure,
  submitCustomerAddressEditSuccess,
  submitCustomerAddressEditFailure,
  getCustomerAddressListing,
  closeCustomerAddressDeleteModel,
  customerAddressDeleteSubmitSuccess,
  customerAddressDeleteSubmitFailure,
  // contacts actions
  additionalGetContacts as additionalGetContactsAction,
  additionalGetContactsSuccess,
  additionalGetContactsFailure,
  additionalAddContactSuccess,
  additionalAddContactFailure,
  additionalEditContactSuccess,
  additionalEditContactFailure,
  additionalDeleteContactSuccess,
  additionalDeleteContactFailure,
  additionalCloseEditContact,
  additionalCloseAddContact,
} from './actions';

import {
  // CUSTOMERS_START_LISTING,
  // CUSTOMERS_VIEW_MODAL_OPEN_AND_FETCH,
  // CUSTOMERS_EDIT_MODAL_OPEN_AND_FETCH,
  // CUSTOMERS_EDIT_MODAL_SUBMIT,
  // CUSTOMERS_DELETE_SUBMIT,
  // CUSTOMERS_CLEAR_FILTERS,
  // CUSTOMERS_GET_COMPANIES,

  //
  CUSTOMERS_START_ADDRESS_LIST,
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
  CUSTOMERS_ADD_MODAL_SUBMIT_SUCCESS,
  CUSTOMERS_ADD_MODAL_SUBMIT_FAILURE,
  //
  CUSTOMERS_ADDRESS_MODAL_ADD,
  ADDITIONAL_GET_CONTACTS,
  ADDITIONAL_ADD_CONTACT,
  ADDITIONAL_EDIT_CONTACT,
  ADDITIONAL_DELETE_CONTACT,
} from './constants';

import { errorAlert, successAlert } from '../Alerts/actions';

const formatDate = (date) => moment(date).format('DD-MM-YYYY');

// export function* getCustomersListing({ payload = { cancelToken: null } }) {
//   const { cancelToken, ...options } = payload;
//   const token = yield select((state) => state?.AuthReducer?.token);
//   const dateFilter = yield select(
//     (state) => state.CustomerReducer.filterDateRange,
//   );

//   let query = '';
//   if (dateFilter?.length > 0 && dateFilter !== null)
//     query = QueryString.stringify({
//       ...options,
//       fromDate: formatDate(dateFilter[0]),
//       toDate: formatDate(dateFilter[1]),
//     });
//   else query = QueryString.stringify(options);
//   try {
//     const { data } = yield call(
//       api(token, cancelToken).get,
//       `/api/customers?${query}`,
//     );
//     if (data) {
//       yield put(setCustomerListing(data));
//     }
//   } catch (e) {
//     if (typeof e === 'string') yield put(errorAlert(e));
//     else if (typeof e.error === 'string') yield put(errorAlert(e.error));
//     else if (e.message !== undefined)
//       yield put(errorAlert('Error while fetching Customers!'));
//   }
// }

// export function* openCustomerView({ payload }) {
//   const { currentCustomer, customerId } = payload;
//   try {
//     if (!currentCustomer) {
//       const token = yield select((state) => state?.AuthReducer?.token);
//       const { data } = yield call(
//         api(token).get,
//         `/api/customers/${customerId}`,
//       );
//       if (data && data.id) {
//         yield put(customerModalSetCustomer(data));
//       }
//     } else {
//       yield put(customerModalSetCustomer(currentCustomer));
//     }
//   } catch (e) {
//     if (typeof e === 'string') yield put(errorAlert(e));
//     else if (typeof e.error === 'string') yield put(errorAlert(e.error));
//     else yield put(errorAlert('Error while fetching Customer!'));
//   }
// }

// export function* openCustomerEdit({ payload }) {
//   const { currentCustomer, customerId } = payload;
//   try {
//     if (!currentCustomer) {
//       const token = yield select((state) => state?.AuthReducer?.token);
//       const { data } = yield call(
//         api(token).get,
//         `/api/customers/${customerId}`,
//       );
//       if (data && data.id) {
//         yield put(customerModalSetCustomer(data));
//       }
//     } else {
//       yield put(customerModalSetCustomer(currentCustomer));
//     }
//   } catch (e) {
//     if (typeof e === 'string') yield put(errorAlert(e));
//     else if (typeof e.error === 'string') yield put(errorAlert(e.error));
//     else yield put(errorAlert('Error while fetching Customer!'));
//   }
// }

// export function* deleteCustomer() {
//   const token = yield select((state) => state?.AuthReducer?.token);
//   const deleteCustomerDetails = yield select(
//     (state) => state.CustomerReducer.deletingCustomerDetails,
//   );
//   const current_page = yield select(
//     (state) => state.CustomerReducer.customers?.current_page,
//   );

//   try {
//     // eslint-disable-next-line no-unused-vars
//     const { data } = yield call(
//       api(token).delete,
//       `/api/customers/${deleteCustomerDetails.id}`,
//     );
//     yield put(successAlert('Customer deleted successfully!'));
//     yield put(getCustomerListingAction({ page: current_page }));
//     yield put(closeDeleteModal());
//     yield put(deleteCustomerSuccess());
//   } catch (e) {
//     yield put(deleteCustomerFailure());
//     if (typeof e === 'string') yield put(errorAlert(e));
//     else if (typeof e.error === 'string') yield put(errorAlert(e.error));
//     else yield put(errorAlert('Error while deleting Customer!'));
//   }
// }

// export function* submitCustomersEdit({ payload }) {
//   const token = yield select((state) => state.AuthReducer?.token);
//   const currentCustomer = yield select(
//     (state) => state.CustomerReducer?.currentCustomer,
//   );
//   const current_page = yield select(
//     (state) => state.CustomerReducer.customers?.current_page,
//   );
//   try {
//     // eslint-disable-next-line no-unused-vars
//     const { data } = yield call(
//       api(token).post,
//       `/api/customers/edit/${currentCustomer.id}`,
//       payload,
//     );
//     yield put(customerSubmitSuccess());
//     yield put(getCustomerListingAction({ page: current_page }));
//     yield put(successAlert('Customer edited successfully!'));
//   } catch (e) {
//     yield put(customerSubmitFailure());
//     if (typeof e === 'string') yield put(errorAlert(e));
//     else if (typeof e.error === 'string') yield put(errorAlert(e.error));
//     else yield put(errorAlert('Error while editing Customer!'));
//   }
// }

// export function* getCompanies() {
//   const token = yield select((state) => state.AuthReducer?.token);
//   try {
//     const { data } = yield call(api(token).get, `/api/company?all=${true}`);
//     yield put(setCompanies(data));
//   } catch (e) {
//     if (typeof e === 'string') yield put(errorAlert(e));
//     else if (typeof e.error === 'string') yield put(errorAlert(e.error));
//     else yield put(errorAlert('Error while getting Companies!'));
//   }
// }

// export function* submitCustomersAdd({ payload }) {
//   const token = yield select((state) => state.AuthReducer?.token);
//   const current_page = yield select(
//     (state) => state.CustomerReducer.customers?.current_page,
//   );
//   try {
//     // eslint-disable-next-line no-unused-vars
//     const { data } = yield call(api(token).post, `/api/customers/add`, payload);
//     yield put(submitCustomerAddSuccess());
//     yield put(getCustomerListingAction({ page: current_page }));
//     yield put(successAlert('Customer Added successfully!'));
//   } catch (e) {
//     yield put(submitCustomerAddFailure());
//     if (typeof e === 'string') yield put(errorAlert(e));
//     else if (typeof e.error === 'string') yield put(errorAlert(e.error));
//     else yield put(errorAlert('Error while adding Customer!'));
//   }
// }

export function* getCustomersAddressListing({
  payload = { cancelToken: null },
}) {
  const { cancelToken, customer_id } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/customers-addresses?customer_id=${customer_id}`,
    );
    if (data) {
      yield put(setCustomerAddressListing(data));
      yield put(customerAddressListingSuccess(data));
    }
  } catch (e) {
    yield put(customerAddressListingFailure(e));
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert('Error while fetching Customers address!'));
  }
}

export function* submitCustomersAddressAdd({
  payload = { cancelToken: null },
}) {
  const { cancelToken } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const { data } = yield call(
      api(token, cancelToken).post,
      `/api/customers-addresses/add`,
      payload,
    );
    if (data) {
      yield put(submitCustomerAddressAddSuccess(data));
      yield put(successAlert('Customer Added successfully!'));
      yield put(getCustomerAddressListing(data));
    }
  } catch (e) {
    yield put(submitCustomerAddressAddFailure(e));
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert('Error while Storing Customers address!'));
  }
}

export function* submitCustomersAddressEdit({
  payload = { cancelToken: null },
}) {
  const { cancelToken } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);

  try {
    const { data } = yield call(
      api(token, cancelToken).post,
      `/api/customers-addresses/edit/${payload.id}`,
      payload,
    );
    if (data) {
      yield put(submitCustomerAddressAddSuccess(data));
      yield put(successAlert('Customer Edited successfully!'));
      yield put(getCustomerAddressListing(data));
    }
  } catch (e) {
    yield put(submitCustomerAddressAddFailure(e));
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert('Error while Storing Customers address!'));
  }
}

export function* deleteCustomerAddress() {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deletingCustomerAddress = yield select(
    (state) => state.CustomerReducer.deletingCustomerAddress,
  );

  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = yield call(
      api(token).delete,
      `/api/customers-addresses/${deletingCustomerAddress.id}`,
    );
    yield put(successAlert('Customer address deleted successfully!'));
    yield put(closeCustomerAddressDeleteModel());
    yield put(customerAddressDeleteSubmitSuccess());
    yield put(
      getCustomerAddressListing({
        customer_id: deletingCustomerAddress?.customer_id,
      }),
    );
  } catch (e) {
    yield put(customerAddressDeleteSubmitFailure());
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else yield put(errorAlert('Error while deleting Customer!'));
  }
}

// contacts saga
export function* additionalGetContacts({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    if (!payload.customer_id) throw new Error();
    const { data } = yield call(
      api(token).get,
      `api/customers/${payload.customer_id}/contacts?all=true`,
    );
    yield put(additionalGetContactsSuccess(data));
  } catch (e) {
    yield put(additionalGetContactsFailure());
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else yield put(errorAlert('Error while fetching contacts!'));
  }
}
export function* additionalAddContact({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  console.log('payload', payload);
  try {
    if (!payload.customer_id) throw new Error();
    const { data } = yield call(
      api(token).post,
      `api/customers/${payload.customer_id}/contacts/add`,
      payload,
    );
    yield put(additionalAddContactSuccess(data));
    yield put(additionalCloseAddContact());
    yield put(
      additionalGetContactsAction({ customer_id: payload.customer_id }),
    );
  } catch (e) {
    yield put(additionalAddContactFailure());
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else yield put(errorAlert('Error while adding contact!'));
  }
}
export function* additionalEditContact({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      `api/customers/contacts/edit/${payload.id}`,
      payload,
    );
    yield put(additionalEditContactSuccess(data));
    yield put(additionalCloseEditContact());
    yield put(
      additionalGetContactsAction({ customer_id: payload.customer_id }),
    );
  } catch (e) {
    yield put(additionalEditContactFailure());
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else yield put(errorAlert('Error while editing contact!'));
  }
}
export function* additionalDeleteContact({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).delete,
      `api/customers/contacts/${payload.id}`,
    );
    yield put(additionalDeleteContactSuccess(data));
    yield put(successAlert('Contact deleted successfully!'));
    yield put(
      additionalGetContactsAction({ customer_id: payload.customer_id }),
    );
  } catch (e) {
    yield put(additionalDeleteContactFailure());
    if (typeof e === 'string') yield put(errorAlert(e));
    else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    else yield put(errorAlert('Error while deleting contact!'));
  }
}

export function* deleteCustomerAddressFlow() {
  yield takeEvery(CUSTOMERS_ADDRESS_DELETE_SUBMIT, deleteCustomerAddress);
}

export function* submitCustomersAddressEditFlow() {
  yield takeEvery(
    CUSTOMERS_ADDRESS_EDIT_MODAL_SUBMIT,
    submitCustomersAddressEdit,
  );
}

export function* submitCustomersAddressAddFlow() {
  yield takeEvery(CUSTOMERS_ADDRESS_MODAL_ADD, submitCustomersAddressAdd);
}

export function* getCustomerAddressListingFlow() {
  yield takeEvery(CUSTOMERS_START_ADDRESS_LIST, getCustomersAddressListing);
}

// export function* createCustomerFlow() {
//   yield takeEvery(CUSTOMERS_ADD_MODAL_SUBMIT, submitCustomersAdd);
// }

// export function* getCustomerListingFlow() {
//   yield takeEvery(CUSTOMERS_START_LISTING, getCustomersListing);
// }

// export function* openCustomersViewModalFlow() {
//   yield takeEvery(CUSTOMERS_VIEW_MODAL_OPEN_AND_FETCH, openCustomerView);
// }

// export function* clearFiltersFlow() {
//   yield takeEvery(CUSTOMERS_CLEAR_FILTERS, getCustomersListing);
// }

// export function* editCustomerDetailFlow() {
//   yield takeEvery(CUSTOMERS_EDIT_MODAL_OPEN_AND_FETCH, openCustomerEdit);
// }

// export function* submitCustomerEditFlow() {
//   yield takeEvery(CUSTOMERS_EDIT_MODAL_SUBMIT, submitCustomersEdit);
// }

// export function* deleteCustomerFlow() {
//   yield takeEvery(CUSTOMERS_DELETE_SUBMIT, deleteCustomer);
// }

// export function* getCompaniesFlow() {
//   yield takeEvery(CUSTOMERS_GET_COMPANIES, getCompanies);
// }
// Additional contacts
export function* additionalGetContactsFlow() {
  yield takeEvery(ADDITIONAL_GET_CONTACTS, additionalGetContacts);
}
export function* additionalAddContactFlow() {
  yield takeEvery(ADDITIONAL_ADD_CONTACT, additionalAddContact);
}
export function* additionalEditContactFlow() {
  yield takeEvery(ADDITIONAL_EDIT_CONTACT, additionalEditContact);
}
export function* additionalDeleteContactFlow() {
  yield takeEvery(ADDITIONAL_DELETE_CONTACT, additionalDeleteContact);
}

export default function* customersSaga() {
  yield all([
    // getCustomerListingFlow(),
    // clearFiltersFlow(),
    // openCustomersViewModalFlow(),
    // editCustomerDetailFlow(),
    // submitCustomerEditFlow(),
    // deleteCustomerFlow(),
    // getCompaniesFlow(),
    // createCustomerFlow(),
    getCustomerAddressListingFlow(),
    submitCustomersAddressEditFlow(),
    submitCustomersAddressAddFlow(),
    deleteCustomerAddressFlow(),
    //For additional contacts
    additionalGetContactsFlow(),
    additionalAddContactFlow(),
    additionalEditContactFlow(),
    additionalDeleteContactFlow(),
  ]);
}
