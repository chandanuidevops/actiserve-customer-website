/*
 *
 * Alerts reducer
 *
 */
import produce from 'immer';
import {
  SUCCESS_SNACKBAR,
  ERROR_SNACKBAR,
  WARNING_SNACKBAR,
  CLEAR_SNACKBAR,
} from './constants';

export const initialState = {
  successSnackBarOpen: false,
  errorSnackBarOpen: false,
  warningSnackBarOpen: false,
  successSnackBarMessage: '',
  errorSnackBarMessage: '',
  warningSnackBarMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const alertProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUCCESS_SNACKBAR:
        draft.successSnackBarOpen = true;
        draft.successSnackBarMessage = action.payload;
        break;
      case ERROR_SNACKBAR:
        draft.errorSnackBarOpen = true;
        draft.errorSnackBarMessage = action.payload;
        break;
      case WARNING_SNACKBAR:
        draft.warningSnackBarOpen = true;
        draft.warningSnackBarMessage = action.payload;
        break;
      case CLEAR_SNACKBAR:
        if (action.payload === 'success') {
          draft.successSnackBarOpen = false;
          draft.successSnackBarMessage = '';
        } else if (action.payload === 'warning') {
          draft.warningSnackBarOpen = false;
          draft.warningSnackBarMessage = '';
        } else if (action.payload === 'error') {
          draft.errorSnackBarOpen = false;
          draft.errorSnackBarMessage = '';
        }
        break;
      default:
        break;
    }
  });

export default alertProviderReducer;
