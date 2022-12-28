import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { successAlert, errorAlert } from "../Alerts/actions";
import api from "../../utils/api";
import * as constant from "./constants";
import QueryString from "query-string";
import moment from "moment";

import {
  getOrdersListRequest,
  getOrdersListSuccess,
  getOrdersListFailure,
  addOrdersSuccess,
  addOrdersFailure,
  editOrdersSuccess,
  editOrdersFailure,
  deleteOrdersSuccess,
  deleteOrdersFailure,
  getCurrentOrdersSuccess,
  getCurrentOrdersFailure,
  ordersGetContactsSuccess,
  ordersGetContactsFailure,
  ordersAddContactSuccess,
  ordersAddContactFailure,
  ordersCloseAddContact,
  ordersEditContactSuccess,
  ordersDeleteContactSuccess,
  ordersDeleteContactFailure,
  ordersGetContacts as ordersGetContactsAction,
  ordersCloseEditContact,
  ordersEditContactFailure,
  orderInvoiceEditSuccess,
  orderInvoiceEditFailure,
  orderInvoiceAddSuccess,
  orderInvoiceAddFailure,
  getOrderInvoiceList,
  getOrderInvoiceListSuccess,
  getOrderInvoiceListFailure,
  getCurrentOrderInvoiceSuccess,
  getCurrentOrderInvoiceFailure,
  orderInvoiceDeleteSuccess,
  orderInvoiceDeleteFailure,
  orderComplaintsEditSuccess,
  orderComplaintsEditFailure,
  orderComplaintsAddSuccess,
  orderComplaintsAddFailure,
  getOrderComplaintsList,
  getOrderComplaintsListSuccess,
  getOrderComplaintsListFailure,
  getCurrentOrderComplaintsSuccess,
  getCurrentOrderComplaintsFailure,
  orderComplaintsDeleteSuccess,
  orderComplaintsDeleteFailure,
  setCustomerListing,
  getCategorySuccess,
  getCategoryFailure,
  getFilterDataSuccess,
  getFilterDataFailure,
  addRescheduleSuccess,
} from "./actions";
import { getComplaintsListing } from "../Jobs/actions";

export function* fetchCurrentOrder({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(
      api(token).get,
      `/api/trader/orders-listing/${payload.id}`
    );
    yield put(getCurrentOrdersSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching order!"
      )
    );
    yield put(getCurrentOrdersFailure(error));
  }
}

export function* fetchCurrentOrderInvoice({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(
      api(token).get,
      payload.type == "sales"
        ? `/api/orders/sales-orders/${payload.id}`
        : `/api/orders/purchase-orders/${payload.id}`
    );
    yield put(getCurrentOrderInvoiceSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching invoice!"
      )
    );
    yield put(getCurrentOrderInvoiceFailure(error));
  }
}

// Get All Outcome Function
export function* fetchOrderList({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const query = payload?.query ? payload?.query : "";
  try {
    const data = yield call(
      api(token).get,
      `/api/customer-booked-order?all=true${query}`
    );
    yield put(getOrdersListSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching orders list!"
      )
    );
    yield put(getOrdersListFailure(error));
  }
}

// Add Function
export function* addOrder({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(api(token).post, `/api/product-order/add`, payload);
    yield put(successAlert("Order added successfully."));
    yield put(getOrdersListRequest());
    yield put(addOrdersSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while add order!"
      )
    );
    yield put(addOrdersFailure(error));
  }
}

// Update
export function* editOrder({ payload }) {

  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(
      api(token).post,
      `/api/product-order/edit/${payload.id}${payload.type}`,
      payload.data
    );
    yield put(successAlert("Order updated successfully."));
    yield put(getOrdersListRequest());
    yield put(editOrdersSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while update order!"
      )
    );
    yield put(editOrdersFailure(error));
  }
}

// DELETE
export function* deleteOrder({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deletingData = yield select(
    (state) => state.OrdersReducer.deletingData
  );
  try {
    const data = yield call(
      api(token).delete,
      `/api/product-order/${deletingData.id}`
    );
    yield put(successAlert("Order deleted successfully."));
    yield put(getOrdersListRequest());
    yield put(deleteOrdersSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while delete order!"
      )
    );
    yield put(deleteOrdersFailure(error));
  }
}
// contacts saga
export function* ordersGetContacts({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    if (!payload.customerId) throw new Error();
    const { data } = yield call(
      api(token).get,
      `/api/customers/${payload.customerId}/contacts?all=true`
    );
    yield put(ordersGetContactsSuccess(data));
  } catch (e) {
    yield put(ordersGetContactsFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching contacts!"));
  }
}
export function* ordersAddContact({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    if (!payload.customerId) throw new Error();
    const { data } = yield call(
      api(token).post,
      `/api/customers/${payload.customerId}/contacts/add`,
      payload
    );
    yield put(ordersAddContactSuccess(data));
    yield put(ordersCloseAddContact());
    yield put(ordersGetContactsAction({ customerId: payload.customerId }));
  } catch (e) {
    yield put(ordersAddContactFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding contact!"));
  }
}
export function* ordersEditContact({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      `/api/customers/contacts/edit/${payload.id}`,
      payload
    );
    yield put(ordersEditContactSuccess(data));
    yield put(ordersCloseEditContact());
    yield put(ordersGetContactsAction({ customerId: payload.customerId }));
  } catch (e) {
    yield put(ordersEditContactFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while editing contact!"));
  }
}
export function* ordersDeleteContact({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).delete,
      `/api/customers/contacts/${payload.id}`
    );
    yield put(ordersDeleteContactSuccess(data));
    yield put(successAlert("Contact deleted successfully!"));
    yield put(ordersGetContactsAction({ customer_id: payload.customer_id }));
  } catch (e) {
    yield put(ordersDeleteContactFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting contact!"));
  }
}

export function* fetchOrderInvoiceList({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(
      api(token).get,
      `/api/orders/${payload.order_id}/orders-costs`
    );
    yield put(getOrderInvoiceListSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching list!"
      )
    );
    yield put(getOrderInvoiceListFailure(error));
  }
}

export function* ordersInvoiceAdd({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      payload.type == "sales"
        ? `/api/orders/${payload.order_id}/sales-orders`
        : `/api/orders/${payload.order_id}/purchase-orders`,
      payload.data
    );
    yield put(orderInvoiceAddSuccess(data));
    yield put(successAlert("Invoice added successfully!"));
    yield put(getOrderInvoiceList({ order_id: payload.order_id }));
  } catch (e) {
    yield put(orderInvoiceAddFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding invoice!"));
  }
}
export function* ordersInvoiceEdit({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      payload.type == "sales"
        ? `/api/orders/sales-orders/${payload.id}`
        : `/api/orders/purchase-orders/${payload.id}`,
      payload.data
    );
    yield put(orderInvoiceEditSuccess(data));
    yield put(successAlert("Invoice updated successfully!"));
    yield put(getOrderInvoiceList({ order_id: payload.order_id }));
  } catch (e) {
    yield put(orderInvoiceEditFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while update invoice!"));
  }
}
export function* ordersInvoiceDelete({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deletingData = yield select(
    (state) => state?.OrdersReducer?.deletingData
  );
  try {
    const { data } = yield call(
      api(token).delete,
      deletingData.type == "sales"
        ? `/api/orders/sales-orders/${deletingData.id}`
        : `/api/orders/purchase-orders/${deletingData.id}`
    );
    yield put(orderInvoiceDeleteSuccess(data));
    yield put(successAlert("Invoice deleted successfully!"));
    yield put(getOrderInvoiceList({ order_id: deletingData.order_id }));
  } catch (e) {
    yield put(orderInvoiceDeleteFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting invoice!"));
  }
}

export function* fetchComplaintList({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(
      api(token).get,
      `/api/orders/${payload.order_id}/complaints?all=true`
    );
    yield put(getOrderComplaintsListSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching list!"
      )
    );
    yield put(getOrderComplaintsListFailure(error));
  }
}

export function* fetchCurrentComplaint({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(api(token).get, `/api/complaints/${payload.id}`);
    yield put(getCurrentOrderComplaintsSuccess(data.data));
  } catch (error) {
    yield put(
      errorAlert(
        typeof error === "string"
          ? error
          : error?.error
            ? error?.error
            : "Error while fetching complaint!"
      )
    );
    yield put(getCurrentOrderComplaintsFailure(error));
  }
}

export function* complaintAdd({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      `/api/orders/${payload.order_id}/complaints/add`,
      payload.data
    );
    yield put(orderComplaintsAddSuccess(data));
    yield put(successAlert("Complaint added successfully!"));
    yield put(getOrderComplaintsList({ order_id: payload.order_id }));
  } catch (e) {
    yield put(orderComplaintsAddFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while adding complaint!"));
  }
}
export function* complaintEdit({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token).post,
      `/api/orders/complaints/edit/${payload.id}`,
      payload.data
    );
    yield put(orderComplaintsEditSuccess(data));
    yield put(successAlert("Complaint updated successfully!"));
    yield put(getOrderComplaintsList({ order_id: payload.order_id }));
  } catch (e) {
    yield put(orderComplaintsEditFailure(e));
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while update invoice!"));
  }
}
export function* complaintDelete({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const deletingData = yield select(
    (state) => state?.OrdersReducer?.deletingData
  );
  try {
    const { data } = yield call(
      api(token).delete,
      `/api/orders/complaints/${deletingData.id}`
    );
    yield put(orderComplaintsDeleteSuccess(data));
    yield put(successAlert("Complaint deleted successfully!"));
    yield put(getOrderComplaintsList({ order_id: deletingData.order_id }));
  } catch (e) {
    yield put(orderComplaintsDeleteFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while deleting complaint!"));
  }
}
const formatDate = (date) => moment(date).format("DD-MM-YYYY");

export function* getCustomersListing({ payload = { cancelToken: null } }) {
  const { cancelToken, ...options } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token, cancelToken).get,
      `/api/customers?all=true`
    );
    if (data) {
      yield put(setCustomerListing(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else if (e.message !== undefined)
      yield put(errorAlert("Error while fetching Customers!"));
  }
}

export function* getCategoryList({ payload }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const data = yield call(
      api(token).get,
      `/api/categories?all=true`,
      payload
    );
    yield put(getCategorySuccess(data.data));
  } catch (error) {
    yield put(getCategoryFailure(error));
  }
}

export function* getFilterData() {
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(api(token).get, `/api/order/filter-data`);
    yield put(getFilterDataSuccess(data));
  } catch (e) {
    yield put(getFilterDataFailure());
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Error while fetching filter data!"));
  }
}

export function* addRescheduleData({ payload = { cancelToken: null } }) {
  const currentBookedOrder = yield select(
    (state) => state?.OrdersReducer?.currentBookedOrder
  );
  const { cancelToken } = payload;
  const token = yield select((state) => state?.AuthReducer?.token);
  try {
    const { data } = yield call(
      api(token, cancelToken).post,
      `api/trader/assign-visit/${currentBookedOrder?.id}/details/edit`,
      payload
    );
    if (data) {
      yield put(addRescheduleSuccess(data));
    }
  } catch (e) {
    if (typeof e === "string") yield put(errorAlert(e));
    else if (typeof e.error === "string") yield put(errorAlert(e.error));
    else yield put(errorAlert("Unable to Reschedule Order"));
  }
}

export function* getOrdersListFlow() {
  yield takeEvery(constant.GET_ORDER_LIST_REQUEST, fetchOrderList);
}

export function* addOrdersFlow() {
  yield takeEvery(constant.ADD_ORDER_REQUEST, addOrder);
}

export function* editOrdersFlow() {
  yield takeEvery(constant.EDIT_ORDER_REQUEST, editOrder);
}

export function* deleteOrdersFlow() {
  yield takeEvery(constant.DELETE_ORDER_REQUEST, deleteOrder);
}

export function* getCurrentOrdersFlow() {
  yield takeEvery(constant.GET_CURRENT_ORDER_REQUEST, fetchCurrentOrder);
}

export function* ordersGetContactsFlow() {
  yield takeEvery(constant.ORDERS_GET_CONTACTS, ordersGetContacts);
}
export function* ordersAddContactFlow() {
  yield takeEvery(constant.ORDERS_ADD_CONTACT, ordersAddContact);
}
export function* ordersEditContactFlow() {
  yield takeEvery(constant.ORDERS_EDIT_CONTACT, ordersEditContact);
}
export function* ordersDeleteContactFlow() {
  yield takeEvery(constant.ORDERS_DELETE_CONTACT, ordersDeleteContact);
}

export function* getCurrentOrderInvoiceFlow() {
  yield takeEvery(
    constant.OPEN_ORDER_INVOICE_EDIT_MODAL,
    fetchCurrentOrderInvoice
  );
}

export function* getOrderInvoiceListFlow() {
  yield takeEvery(constant.ORDER_INVOICE_LIST_REQUEST, fetchOrderInvoiceList);
}
export function* ordersInvoiceAddFlow() {
  yield takeEvery(constant.ORDER_INVOICE_ADD_REQUEST, ordersInvoiceAdd);
}
export function* ordersInvoiceEditFlow() {
  yield takeEvery(constant.ORDER_INVOICE_EDIT_REQUEST, ordersInvoiceEdit);
}
export function* ordersInvoiceDeleteFlow() {
  yield takeEvery(constant.ORDER_INVOICE_DELETE_REQUEST, ordersInvoiceDelete);
}
//complaint

export function* getCurrentComplaintFlow() {
  yield takeEvery(
    constant.OPEN_ORDER_COMPLAINT_EDIT_MODAL,
    fetchCurrentComplaint
  );
}
export function* getOrderComplaintListFlow() {
  yield takeEvery(constant.ORDER_COMPLAINT_LIST_REQUEST, fetchComplaintList);
}
export function* ordersComplaintAddFlow() {
  yield takeEvery(constant.ORDER_COMPLAINT_ADD_REQUEST, complaintAdd);
}
export function* ordersComplaintEditFlow() {
  yield takeEvery(constant.ORDER_COMPLAINT_EDIT_REQUEST, complaintEdit);
}
export function* ordersComplaintDeleteFlow() {
  yield takeEvery(constant.ORDER_COMPLAINT_DELETE_REQUEST, complaintDelete);
}
export function* getCustomerListingFlow() {
  yield takeEvery(constant.CUSTOMERS_START_LISTING, getCustomersListing);
}
export function* getCategoryFlow() {
  yield takeEvery(constant.GET_CATEGORIES, getCategoryList);
}
export function* getFilterDataFlow() {
  yield takeEvery(constant.GET_FILTER_DATA, getFilterData);
}
export function* addRescheduleFlow() {
  yield takeEvery(constant.ADD_RESCHEDULE_REQUEST, addRescheduleData);
}

export default function* OrdersSaga() {
  yield all([
    getOrdersListFlow(),
    addOrdersFlow(),
    editOrdersFlow(),
    deleteOrdersFlow(),
    getCurrentOrdersFlow(),
    ordersGetContactsFlow(),
    ordersAddContactFlow(),
    ordersEditContactFlow(),
    ordersDeleteContactFlow(),
    getCurrentOrderInvoiceFlow(),
    getOrderInvoiceListFlow(),
    ordersInvoiceAddFlow(),
    ordersInvoiceEditFlow(),
    ordersInvoiceDeleteFlow(),
    getCurrentComplaintFlow(),
    getOrderComplaintListFlow(),
    ordersComplaintAddFlow(),
    ordersComplaintEditFlow(),
    ordersComplaintDeleteFlow(),
    getCustomerListingFlow(),
    getCategoryFlow(),
    getFilterDataFlow(),
    addRescheduleFlow(),
  ]);
}
