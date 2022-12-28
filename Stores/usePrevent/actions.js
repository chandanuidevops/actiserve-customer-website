/*
 *
 * Alerts actions
 *
 */

import {
  SET_SUBMIT,
  SET_SUBMIT_SUCCESS,
  SET_SUBMIT_FAILURE,
} from './constants';

export function setSubmit(payload) {
  return {
    type: SET_SUBMIT,
    payload,
  };
}
export function setSubmitSuccess(payload) {
  return {
    type: SET_SUBMIT_SUCCESS,
    payload,
  };
}
export function setSubmitFailure(payload) {
  return {
    type: SET_SUBMIT_FAILURE,
    payload,
  };
}
