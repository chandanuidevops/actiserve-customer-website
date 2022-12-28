import produce from "immer";
import {
  SUBMIT_TRADER_FORM,
  SUBMIT_TRADER_FORM_SUCCESS,
  SUBMIT_TRADER_FORM_FAILURE,
  RESET_TRADER_FORM,
} from "./constants";

export const initialState = {
  isSubmittingTraderForm: false,
  isTraderFormSubmitSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const TraderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUBMIT_TRADER_FORM:
        draft.isSubmittingTraderForm = true;
        draft.isTraderFormSubmitSuccess = false;
        break;
      case SUBMIT_TRADER_FORM_SUCCESS:
        draft.isSubmittingTraderForm = false;
        draft.isTraderFormSubmitSuccess = true;
        break;
      case SUBMIT_TRADER_FORM_FAILURE:
        draft.isSubmittingTraderForm = false;
        draft.isTraderFormSubmitSuccess = false;
        break;
      case RESET_TRADER_FORM:
        draft.isSubmittingTraderForm = false;
        draft.isTraderFormSubmitSuccess = false;
        break;

      default:
        return state;
    }
  });

export default TraderReducer;