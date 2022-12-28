import produce from 'immer'
import {
  //FETCH LIST
  VALIDATE_TRADER_CUSTOMER,
  VALIDATE_TRADER_CUSTOMER_SUCCESS,
  VALIDATE_TRADER_CUSTOMER_FAILURE,
  VALIDATE_TRADER_CUSTOMER_RESET,
  REGISTER_TRADER,
  REGISTER_TRADER_SUCCESS,
  REGISTER_TRADER_FAILURE,
  PERSONAL_DETAIL,
  PERSONAL_DETAIL_SUCCESS,
  PERSONAL_DETAIL_FAILURE,
  GET_POSTCODE,
  GET_POSTCODE_SUCCESS,
  GET_POSTCODE_FAILURE,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  ADD_AREACODE,
  ADD_AREACODE_SUCCESS,
  ADD_AREACODE_FAILURE,
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  GET_DOCUMENTLISTING,
  GET_DOCUMENTLISTING_SUCCESS,
  GET_DOCUMENTLISTING_FAILURE,
  GET_PERSONAL_INFORMATION,
  GET_PERSONAL_INFORMATION_SUCCESS,
  GET_PERSONAL_INFORMATION_FAILURE,
  FETCH_POSTCODE,
  FETCH_POSTCODE_SUCCESS,
  FETCH_POSTCODE_FAILURE,
  UPDATE_AREACODE,
  UPDATE_AREACODE_SUCCESS,
  UPDATE_AREACODE_FAILURE,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILURE,
  DISABLE_ADDING,
  ADD_SPECIFIC_DOCUMENT,
  ADD_SPECIFIC_DOCUMENT_SUCCESS,
  ADD_SPECIFIC_DOCUMENT_FAILURE,
  GET_ALL_DOCUMENT,
  GET_ALL_DOCUMENT_SUCCESS,
  GET_ALL_DOCUMENT_FAILURE,
  FINISH_SIGNUP,
  FINISH_SIGNUP_SUCCESS,
  FINISH_SIGNUP_FAILURE,

  //
  GET_TRADER_EMAIL,
  GET_TRADER_EMAIL_SUCCESS,
  GET_TRADER_EMAIL_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILURE,
  RESET_SIGNUP,
} from './constants'

export const initialState = {
  //Listing
  isValidatingCustomer: false,
  validateCustomer: [],

  isAddingRegister: false,
  registerData: {},
  signupData: {},
  isAddingDetail: false,
  isAddingSuccess: false,
  isAddingPostcodeSuccess: false,
  detailsData: {},
  isFetchingPostcode: false,
  postcode: [],

  isFetchingCategories: false,
  categories: [],

  isAddingAreacode: false,
  isUpdatingAreacode: false,
  areacodes: {},
  isAddingDocument: false,
  documents: {},

  isAddingSpecific: false,
  specificDocuments: {},

  isFetchingDocumentList: false,
  documentList: {},
  isFetchingInformation: false,
  info: {},
  isFetchingPostcodeData: false,
  postcodeData: [],
  isFetchingRegister: false,
  isAllDocuments: false,
  allDocuments: {},

  isFinishSignup: false,
  finishSignup: [],
  isRegisterSuccess: false,

  isFetchingTraderEmail: false,
  traderEmail: '',
  isResettingPassword: false,
  traderData: {},
  isResetPasswordSuccess: false,
}

const TraderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Listing
      case DISABLE_ADDING:
        draft.isAddingSuccess = false
        draft.isAddingPostcodeSuccess = false
        break

      case VALIDATE_TRADER_CUSTOMER:
        draft.isValidatingCustomer = true
        break
      case VALIDATE_TRADER_CUSTOMER_SUCCESS:
        draft.isValidatingCustomer = false
        draft.validateCustomer = action.payload
        break
      case VALIDATE_TRADER_CUSTOMER_FAILURE:
        draft.isValidatingCustomer = false
        draft.validateCustomer = action.payload
        break
      case VALIDATE_TRADER_CUSTOMER_RESET:
        draft.isValidatingCustomer = false
        draft.validateCustomer = []
        break

      case REGISTER_TRADER:
        draft.isAddingRegister = true
        draft.isRegisterSuccess = true
        break
      case REGISTER_TRADER_SUCCESS:
        draft.isAddingRegister = false
        draft.signupData = action.payload
        draft.isRegisterSuccess = true
        break
      case REGISTER_TRADER_FAILURE:
        draft.isAddingRegister = false
        draft.isRegisterSuccess = false
        break

      case PERSONAL_DETAIL:
        draft.isAddingDetail = true
        draft.isAddingSuccess = false
        break
      case PERSONAL_DETAIL_SUCCESS:
        draft.isAddingDetail = false
        draft.isAddingSuccess = true
        draft.isAddingPostcodeSuccess = false
        draft.detailsData = action.payload
        break
      case PERSONAL_DETAIL_FAILURE:
        draft.isAddingDetail = false
        draft.isAddingSuccess = false
        break

      case GET_POSTCODE:
        draft.isFetchingPostcode = true
        break
      case GET_POSTCODE_SUCCESS:
        draft.isFetchingPostcode = false
        draft.postcode = action.payload
        break
      case GET_POSTCODE_FAILURE:
        draft.isFetchingPostcode = false
        break

      case GET_CATEGORIES:
        draft.isFetchingCategories = true
        break
      case GET_CATEGORIES_SUCCESS:
        draft.isFetchingCategories = false
        draft.categories = action.payload
        break
      case GET_CATEGORIES_FAILURE:
        draft.isFetchingCategories = false
        break

      case ADD_AREACODE:
        draft.isAddingAreacode = true
        draft.isAddingSuccess = false
        draft.isAddingPostcodeSuccess = false
        break
      case ADD_AREACODE_SUCCESS:
        draft.isAddingAreacode = false
        draft.isAddingSuccess = false
        draft.isAddingPostcodeSuccess = true
        draft.areacodes = action.payload
        break
      case ADD_AREACODE_FAILURE:
        draft.isAddingAreacode = false
        draft.isAddingSuccess = false
        break

      case ADD_DOCUMENT:
        draft.isAddingDocument = true
        break
      case ADD_DOCUMENT_SUCCESS:
        draft.isAddingDocument = false
        draft.documents = action.payload
        break
      case ADD_DOCUMENT_FAILURE:
        draft.isAddingDocument = false
        break

      case ADD_SPECIFIC_DOCUMENT:
        draft.isAddingSpecific = true
        break
      case ADD_SPECIFIC_DOCUMENT_SUCCESS:
        draft.isAddingSpecific = false
        draft.specificDocuments = action.payload
        break
      case ADD_SPECIFIC_DOCUMENT_FAILURE:
        draft.isAddingSpecific = false
        break

      case GET_DOCUMENTLISTING:
        draft.isFetchingDocumentList = true
        break
      case GET_DOCUMENTLISTING_SUCCESS:
        draft.isFetchingDocumentList = false
        draft.documentList = action.payload
        break
      case GET_DOCUMENTLISTING_FAILURE:
        draft.isFetchingDocumentList = false
        break

      case GET_PERSONAL_INFORMATION:
        draft.isFetchingInformation = true
        break
      case GET_PERSONAL_INFORMATION_SUCCESS:
        draft.isAddingDetail = false
        draft.isFetchingInformation = false
        draft.info = action.payload
        break
      case GET_PERSONAL_INFORMATION_FAILURE:
        draft.isFetchingInformation = false
        break

      case FETCH_POSTCODE:
        draft.isFetchingPostcodeData = true
        break
      case FETCH_POSTCODE_SUCCESS:
        draft.isFetchingPostcodeData = false
        draft.postcodeData = action.payload
        break
      case FETCH_POSTCODE_FAILURE:
        draft.isFetchingPostcodeData = false
        break

      case UPDATE_AREACODE:
        draft.isAddingAreacode = true
        draft.isAddingSuccess = false
        break
      case UPDATE_AREACODE_SUCCESS:
        draft.isAddingAreacode = false
        draft.isAddingSuccess = false
        draft.isAddingPostcodeSuccess = true
        draft.areacodes = action.payload

        break
      case UPDATE_AREACODE_FAILURE:
        draft.isAddingAreacode = false
        draft.isAddingSuccess = false
        break

      case CHECK_LOGIN:
        draft.isFetchingRegister = true
        draft.isRegisterSuccess = true
        break
      case CHECK_LOGIN_SUCCESS:
        draft.isFetchingRegister = false
        draft.registerData = action.payload
        draft.isRegisterSuccess = true

        break
      case CHECK_LOGIN_FAILURE:
        draft.isFetchingRegister = false
        draft.isRegisterSuccess = false
        break

      case GET_ALL_DOCUMENT:
        draft.isAllDocuments = true
        break
      case GET_ALL_DOCUMENT_SUCCESS:
        draft.isAllDocuments = false
        draft.allDocuments = action.payload

        break
      case GET_ALL_DOCUMENT_FAILURE:
        draft.isAllDocuments = false
        break

      case FINISH_SIGNUP:
        draft.isFinishSignup = true
        break
      case FINISH_SIGNUP_SUCCESS:
        draft.isFinishSignup = false
        draft.finishSignup = action.payload

        break
      case FINISH_SIGNUP_FAILURE:
        draft.isFinishSignup = false
        break

      case GET_TRADER_EMAIL:
        draft.isFetchingTraderEmail = true
        break
      case GET_TRADER_EMAIL_SUCCESS:
        draft.isFetchingTraderEmail = false
        draft.traderEmail = action.payload
        break
      case GET_TRADER_EMAIL_FAILURE:
        draft.isFetchingTraderEmail = false
        break

      case RESET_PASSWORD:
        draft.isResettingPassword = true
        break
      case RESET_PASSWORD_SUCCESS:
        draft.isResettingPassword = false
        draft.traderData = action.payload
        break
      case RESET_PASSWORD_FAILURE:
        draft.isResettingPassword = false
        break

      case SET_PASSWORD:
        draft.isSubmitPassword = true
        draft.isResetPasswordSuccess = false
        break
      case SET_PASSWORD_SUCCESS:
        draft.isSubmitPassword = false
        draft.isResetPasswordSuccess = true
        draft.traderData = action.payload

        break
      case SET_PASSWORD_FAILURE:
        draft.isSubmitPassword = false
        draft.isResetPasswordSuccess = false
        break
      case RESET_SIGNUP:
        draft.validateCustomer = []
        draft.signupData={}
        draft.detailsData ={}
        draft.postcode=[]
        draft.postcodeData=[]
        draft.categories=[]
        draft.areacodes={}
        draft.registerData={}
        draft.allDocuments={}
        draft.finishSignup=[]
        draft.traderData={}
        
        
        break
      default:
        return state
    }
  })

export default TraderReducer
