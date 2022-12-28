import produce from "immer";
import {
  SUBMIT_PROMOTIONAL_FORM,
  SUBMIT_PROMOTIONAL_FORM_SUCCESS,
  SUBMIT_PROMOTIONAL_FORM_FAILURE,
  RESET_PROMOTIONAL_FORM,
} from "./constants";

export const initialState = {
  isSubmittingForm: false,
  isFormSubmitSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const PromotionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUBMIT_PROMOTIONAL_FORM:
        draft.isSubmittingForm = true;
        draft.isFormSubmitSuccess = false;
        break;
      case SUBMIT_PROMOTIONAL_FORM_SUCCESS:
        draft.isSubmittingForm = false;
        draft.isFormSubmitSuccess = true;
        break;
      case SUBMIT_PROMOTIONAL_FORM_FAILURE:
        draft.isSubmittingForm = false;
        draft.isFormSubmitSuccess = false;
        break;
      case RESET_PROMOTIONAL_FORM:
        draft.isSubmittingForm = false;
        draft.isFormSubmitSuccess = false;
        break;
      default:
        return state;
    }
  });

export default PromotionReducer;