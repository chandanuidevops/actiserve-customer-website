import {
  SUBMIT_PROMOTIONAL_FORM,
  SUBMIT_PROMOTIONAL_FORM_SUCCESS,
  SUBMIT_PROMOTIONAL_FORM_FAILURE,
  RESET_PROMOTIONAL_FORM
} from "./constants";
const actions = {
  submitDetailsForm: (payload) => {
    return {
      type: SUBMIT_PROMOTIONAL_FORM,
      payload,
    };
  },
  submitDetailsFormSuccess: (payload) => {
    return {
      type: SUBMIT_PROMOTIONAL_FORM_SUCCESS,
      payload,
    };
  },
  submitDetailsFormFailure: (error) => {
    return {
      type: SUBMIT_PROMOTIONAL_FORM_FAILURE,
      error,
    };
  },
  resetSubmitDetailsForm: () => {
    return {
      type: RESET_PROMOTIONAL_FORM,
    };
  },
};
export default actions;
