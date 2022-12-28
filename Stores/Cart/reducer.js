import produce from "immer";
import {
  ADD_CART,
  REMOVE_CART
} from "./constants";

export const initialState = {
  //Listing
  currentCart: [],
};

const CartReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case ADD_CART:
        draft.currentCart = action.payload;
        break;
      case REMOVE_CART:
        draft.currentCart = action.payload;
        break;
      default:
        return state;
    }
  });

export default CartReducer;
