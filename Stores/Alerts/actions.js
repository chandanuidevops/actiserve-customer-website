/*
 *
 * Alerts actions
 *
 */

import {
  SUCCESS_SNACKBAR,
  ERROR_SNACKBAR,
  WARNING_SNACKBAR,
  CLEAR_SNACKBAR,
} from './constants';

export function successAlert(payload) {
  return {
    type: SUCCESS_SNACKBAR,
    payload,
  };
}
export function errorAlert(payload) {
  return {
    type: ERROR_SNACKBAR,
    payload,
  };
}
export function warningAlert(payload) {
  return {
    type: WARNING_SNACKBAR,
    payload,
  };
}
export function removeAlert(payload) {
  return {
    type: CLEAR_SNACKBAR,
    payload,
  };
}
