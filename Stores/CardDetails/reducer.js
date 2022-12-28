import produce from "immer";
import {
  //FETCH LIST
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAILURE,

  ATTACH_PAYMENT_METHOD,
  ATTACH_PAYMENT_METHOD_SUCCESS,
  ATTACH_PAYMENT_METHOD_FAILURE,

  EDIT_ORDER,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAILURE,

  GET_CUSTOMER_CARDS,
  GET_CUSTOMER_CARDS_SUCCESS,
  GET_CUSTOMER_CARDS_FAILURE,

  ADD_CUSTOMER_CARD,
  ADD_CUSTOMER_CARD_SUCCESS,
  ADD_CUSTOMER_CARD_FAILURE,

  DELETE_CUSTOMER_CARD,
  DELETE_CUSTOMER_CARD_FAILURE,
  DELETE_CUSTOMER_CARD_SUCCESS,
} from "./constants";

export const initialState = {
  //Listing
  isFetchingCardDetails: false,
  cardDetails: [],

  //
  isEditingOrder: false,
  isEditingOrderSuccess: false,

  //
  isAttachingPaymentMethod: false,

  isAddingCard: false,

  isDeletingCard: false,

  isFetchingCustomerCard: false,
  customerCardDetails: [],
};

const CardDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_CARDS_REQUEST:
        draft.isFetchingCardDetails = true;
        break;
      case GET_CARDS_SUCCESS:
        draft.isFetchingCardDetails = false;
        draft.cardDetails = action.payload;
        break;
      case GET_CARDS_FAILURE:
        draft.isFetchingCardDetails = false;
        break;

      case EDIT_ORDER:
        draft.isEditingOrder = true;
        draft.isEditingOrderSuccess = true;
        break;
      case EDIT_ORDER_SUCCESS:
        draft.isEditingOrder = false;
        draft.isEditingOrderSuccess = true;
        break;
      case EDIT_ORDER_FAILURE:
        draft.isEditingOrder = false;
        draft.isEditingOrderSuccess = false;
        break;

      case ATTACH_PAYMENT_METHOD:
        draft.isAttachingPaymentMethod = true;
        break;
      case ATTACH_PAYMENT_METHOD_SUCCESS:
        draft.isAttachingPaymentMethod = false;
        break;
      case ATTACH_PAYMENT_METHOD_FAILURE:
        draft.isAttachingPaymentMethod = false;
        break;

      case GET_CUSTOMER_CARDS:
        draft.isFetchingCustomerCard = true;
        break;
      case GET_CUSTOMER_CARDS_SUCCESS:
        draft.isFetchingCustomerCard = false;
        draft.customerCardDetails = action.payload;
        break;
      case GET_CUSTOMER_CARDS_FAILURE:
        draft.isFetchingCustomerCard = false;
        break;

      case ADD_CUSTOMER_CARD:
        draft.isAddingCard = true;
        break;
      case ADD_CUSTOMER_CARD_SUCCESS:
        draft.isAddingCard = false;
        break;
      case ADD_CUSTOMER_CARD_FAILURE:
        draft.isAddingCard = false;
        break;

      case DELETE_CUSTOMER_CARD:
        draft.isDeletingCard = true;
        break;
      case DELETE_CUSTOMER_CARD_SUCCESS:
        draft.isDeletingCard = false;
        break;
      case DELETE_CUSTOMER_CARD_FAILURE:
        draft.isDeletingCard = false;
        break;

      default:
        return state;
    }
  });

export default CardDetailsReducer;
