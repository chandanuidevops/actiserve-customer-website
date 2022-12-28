import produce from "immer";
import {
  //FETCH LIST
  GET_VISITS,
  GET_VISITS_SUCCESS,
  GET_VISITS_FAILURE,
} from "./constants";

export const initialState = {
  //Listing
  isFetchingVisits: false,
  visitDetails: [],
};

const VisitDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_VISITS:
        draft.isFetchingVisits = true;
        break;
      case GET_VISITS_SUCCESS:
        draft.isFetchingVisits = false;
        draft.visitDetails = action.payload;
        break;
      case GET_VISITS_FAILURE:
        draft.isFetchingVisits = false;
        break;
      default:
        return state;
    }
  });

export default VisitDetailsReducer;
