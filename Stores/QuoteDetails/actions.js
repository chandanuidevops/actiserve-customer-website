import * as types from "./constants";

export const getQuotes = (payload) => ({
  type: types.GET_QUOTES,
  payload,
});

export const getQuotesSuccess = (payload) => ({
  type: types.GET_QUOTES_SUCCESS,
  payload,
});

export const getQuotesFailure = (payload) => ({
  type: types.GET_QUOTES_FAILURE,
  payload,
});

export const getSingleQuote = (payload) => ({
  type: types.GET_SINGLE_QUOTES,
  payload,
});

export const getSingleQuoteSuccess = (payload) => ({
  type: types.GET_SINGLE_QUOTES_SUCCESS,
  payload,
});

export const getSingleQuoteFailure = (payload) => ({
  type: types.GET_SINGLE_QUOTES_FAILURE,
  payload,
});

//
export const saveQuote = (payload) => ({
  type: types.SAVE_QUOTE,
  payload,
});

export const saveQuoteSuccess = (payload) => ({
  type: types.SAVE_QUOTE_SUCCESS,
  payload,
});

export const saveQuoteFailure = (payload) => ({
  type: types.SAVE_QUOTE_FAILURE,
  payload,
});


export const getVisitQuotes = (payload) => ({
  type: types.GET_VISIT_QUOTE,
  payload,
});

export const getVisitQuotesSuccess = (payload) => ({
  type: types.GET_VISIT_QUOTE_SUCCESS,
  payload,
});

export const getVisitQuotesFailure = (payload) => ({
  type: types.GET_VISIT_QUOTE_FAILURE,
  payload,
});
