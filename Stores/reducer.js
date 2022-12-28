import AuthReducer from './Auth/reducer'
import AlertReducer from './Alerts/reducer'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import VisitReducer from './Visits/reducer'
import OrdersReducer from './Orders/reducer'
import JobReducer from './Jobs/reducer'
import ContractorReducer from './Contractors/reducer'
import VisitsReducer from './OrderVisits/reducer'
import JobsCompletedReducer from './JobsCompleted/reducer'
import UsersReducer from './Users/reducer'
import ServicesReducer from './Services/reducer'
import CustomerReducer from './Customers/reducer'
import CategoryDetailsReducer from './CategoryDetails/reducer'
import ProductDetailsReducer from './ProductDetails/reducer'
import InstantQuoteReducer from './InstantQuote/reducer'
import groupDetailsReducer from './GroupDetails/reducer'
import CustomerFlowReducer from './CustomerFlow/reducer'
import CartReducer from './Cart/reducer'
import FinalOrderReducer from './FinalOrder/reducer'
import VisitDetailsReducer from './VisitDetails/reducer'
import QuoteDetailsReducer from './QuoteDetails/reducer'
import FilesReducer from './Files/reducer'
import CardDetailsReducer from './CardDetails/reducer'
import usePreventReducer from './usePrevent/reducer'
import TraderReducer from './Traders/reducer'
import BlogsReducer from './Blogs/reducer'
import SubscribeReducer from './Subscribe/reducer'
import PromotionReducer from './Promotion/reducer'
// import groupCateDetailsReducer from './GroupCategoriesDetails/reducer'

const orderPersistConfig = {
  key: 'FinalOrderReducer',
  storage: storage,
  whitelist: ['addOrderSuccessData'],
}
const rootReducer = combineReducers({
  UsersReducer,
  AuthReducer,
  AlertReducer,
  JobReducer,
  VisitsReducer,
  ContractorReducer,
  OrdersReducer,
  JobsCompletedReducer,
  ServicesReducer,
  CustomerReducer,
  CategoryDetailsReducer,
  ProductDetailsReducer,
  InstantQuoteReducer,
  groupDetailsReducer,
  CustomerFlowReducer,
  CartReducer,
  FinalOrderReducer,
  VisitDetailsReducer,
  QuoteDetailsReducer,
  FilesReducer,
  CardDetailsReducer,
  usePreventReducer,
  TraderReducer,
  BlogsReducer,
  SubscribeReducer,
  PromotionReducer,
})

export default rootReducer
