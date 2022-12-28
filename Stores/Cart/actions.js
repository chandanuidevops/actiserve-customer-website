import * as types from "./constants";

export const addCart = (payload) => ({
  type: types.ADD_CART,
  payload,
});

export const removeCart = (payload) => ({
  type: types.REMOVE_CART,
  payload,
});
