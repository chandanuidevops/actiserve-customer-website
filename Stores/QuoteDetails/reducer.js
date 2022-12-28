import produce from "immer";
import {
  //FETCH LIST
  GET_QUOTES,
  GET_QUOTES_SUCCESS,
  GET_QUOTES_FAILURE,
  //
  GET_SINGLE_QUOTES,
  GET_SINGLE_QUOTES_SUCCESS,
  GET_SINGLE_QUOTES_FAILURE,
  //
  SAVE_QUOTE,
  SAVE_QUOTE_SUCCESS,
  SAVE_QUOTE_FAILURE,
  //
  GET_VISIT_QUOTE,
  GET_VISIT_QUOTE_SUCCESS,
  GET_VISIT_QUOTE_FAILURE,
} from "./constants";

export const initialState = {
  //Listing
  isFetchingQuotes: false,
  Quotes: [],
  //Listing
  isFetchingSingleQuotes: false,
  SingleQuote: {},
  //
  isFetchingVisitQuotes: false,
  visitQuotes: [],
};

const QuoteDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_QUOTES:
        draft.isFetchingQuotes = true;
        break;
      case GET_QUOTES_SUCCESS:
        draft.isFetchingQuotes = false;
        draft.Quotes = action.payload;
        break;
      case GET_QUOTES_FAILURE:
        draft.isFetchingQuotes = false;
        break;
      case GET_SINGLE_QUOTES:
        draft.isFetchingSingleQuotes = true;
        break;
      case GET_SINGLE_QUOTES_SUCCESS:
        draft.isFetchingSingleQuotes = false;
        draft.SingleQuote = action.payload;
        break;
      case GET_SINGLE_QUOTES_FAILURE:
        draft.isFetchingSingleQuotes = false;
        break;
      case SAVE_QUOTE:
        draft.isSavingQuote = true;
        break;
      case SAVE_QUOTE_SUCCESS:
        draft.isSavingQuote = false;
        break;
      case SAVE_QUOTE_FAILURE:
        draft.isSavingQuote = false;
        break;
      case GET_VISIT_QUOTE:
        draft.isFetchingVisitQuotes = true;
        break;
      case GET_VISIT_QUOTE_SUCCESS:
        draft.isFetchingVisitQuotes = false;
        draft.visitQuotes = action.payload;
        break;
      case GET_VISIT_QUOTE_FAILURE:
        draft.isFetchingVisitQuotes = false;
        break;
      default:
        return state;
    }
  });

export default QuoteDetailsReducer;
