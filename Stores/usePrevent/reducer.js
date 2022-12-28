/*
 *
 * Alerts reducer
 *
 */
import produce from 'immer';
import {
  SET_SUBMIT,
  SET_SUBMIT_SUCCESS,
  SET_SUBMIT_FAILURE,
} from './constants';

export const initialState = {
  didSubmit: false,
};

/* eslint-disable default-case, no-param-reassign */
const usePreventReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SUBMIT:
        draft.didSubmit = true;
        break;
      case SET_SUBMIT_SUCCESS:
        draft.didSubmit = true;
        break;
      case SET_SUBMIT_FAILURE:
        draft.didSubmit = false;
        break;
      default:
        break;
    }
  });

export default usePreventReducer;
