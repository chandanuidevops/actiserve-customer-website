import {
  SUBMIT_TRADER_FORM,
  SUBMIT_TRADER_FORM_SUCCESS,
  SUBMIT_TRADER_FORM_FAILURE,
  RESET_TRADER_FORM,
} from "./constants";
const actions = {
  submitTraderForm: (payload) => {
    console.log('data::', payload)
    return {
      type: SUBMIT_TRADER_FORM,
      payload,
    };
  },
  submitTraderFormSuccess: (payload) => {
    return {
      type: SUBMIT_TRADER_FORM_SUCCESS,
      payload,
    };
  },
  submitTraderFormFailure: (error) => {
    return {
      type: SUBMIT_TRADER_FORM_FAILURE,
      error,
    };
  },
  resetTraderForm: () => {
    return {
      type: RESET_TRADER_FORM,
    };
  },
};
export default actions;
