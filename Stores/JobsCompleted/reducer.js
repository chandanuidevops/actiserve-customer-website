import produce from "immer";
import {
  //FETCH LIST
  GET_JOB_COMPLETED_REQUEST,
  GET_JOB_COMPLETED_SUCCESS,
  GET_JOB_COMPLETED_FAILURE,
} from "./constants";

export const initialState = {
  //Listing
  isFetchingJobsCompleted: false,
  jobsCompleted: [],
};

const JobsCompletedReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case GET_JOB_COMPLETED_REQUEST:
        draft.isFetchingJobsCompleted = true;
        break;
      case GET_JOB_COMPLETED_SUCCESS:
        draft.isFetchingJobsCompleted = false;
        draft.jobsCompleted = action.payload;
        break;
      case GET_JOB_COMPLETED_FAILURE:
        draft.isFetchingJobsCompleted = false;
        break;

      default:
        return state;
    }
  });

export default JobsCompletedReducer;
