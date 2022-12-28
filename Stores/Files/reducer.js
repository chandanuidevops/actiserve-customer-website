import produce from "immer";
import {
  UPLOAD_PRODUCT_FILE_REQUEST,
  UPLOAD_PRODUCT_FILE_SUCCESS,
  UPLOAD_PRODUCT_FILE_FAILURE
} from "./constants";

export const initialState = {
  isUploadingFile:false,
  uploadedFileId: null,
  uploadFileSuccess: false,
};

const FilesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {

      case UPLOAD_PRODUCT_FILE_REQUEST:
        draft.isUploadingFile = true;
        draft.uploadFileSuccess = false;
        break;

      case UPLOAD_PRODUCT_FILE_SUCCESS:
        draft.isUploadingFile = false;
        draft.uploadFileSuccess = true;
        draft.uploadedFileId = action.payload;
        break;

      case UPLOAD_PRODUCT_FILE_FAILURE:
        draft.isUploadingFile = false;
        draft.uploadFileSuccess = false;
        draft.uploadedFileId = null;
        break;

      default:
        return state;
    }
  });

export default FilesReducer;
