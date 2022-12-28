import produce from "immer";
import {
  //FETCH LIST
  GET_GROUP_REQUEST,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAILURE,
  // add
  ADD_GROUP_REQUEST,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE
} from "./constants";

export const initialState = {
  //Listing
  isFetchingGroup: false,
  groupDetails: [],
  //
  isSubmitting: false,
};

const InstantQuoteReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_GROUP_REQUEST:
        draft.isFetchingGroup = true;
        break;
      case GET_GROUP_SUCCESS:
        draft.isFetchingGroup = false;
        draft.groupDetails = action.payload;
        break;
      case GET_GROUP_FAILURE:
        draft.isFetchingGroup = false;
        break;

      case ADD_GROUP_REQUEST:
        draft.isSubmitting = true;
        break;
      case ADD_GROUP_SUCCESS:
        draft.isSubmitting = false;
        break;
      case ADD_GROUP_FAILURE:
        draft.isSubmitting = false;
        break;
      default:
        return state;
    }
  });

export default InstantQuoteReducer;
