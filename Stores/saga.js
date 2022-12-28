import {all} from 'redux-saga/effects'
import AuthSagas from './Auth/saga'
import AlertSaga from './Alerts/saga'
import jobsSaga from './Jobs/saga'
import VisitSaga from './Visits/saga'
import ContractorsSaga from './Contractors/saga'
import OrdersSaga from './Orders/saga'
import OrderVisits from './OrderVisits/saga'
import JobsCompletedSaga from './JobsCompleted/saga'
import UsersSaga from './Users/saga'
import ServicesSaga from './Services/saga'
import CustomerSaga from './Customers/saga'
import CategoryDetailsSaga from './CategoryDetails/saga'
import ProductDetailsSaga from './ProductDetails/saga'
import InstantQuoteSaga from './InstantQuote/saga'
import groupDetailsSaga from './GroupDetails/saga'
import CustomerFlowSaga from './CustomerFlow/saga'
import FinalOrderSaga from './FinalOrder/saga'
import VisitDetailsSaga from './VisitDetails/saga'
import QuoteDetailsSaga from './QuoteDetails/saga'
import FileSaga from './Files/saga'
import CardDetailsSaga from './CardDetails/saga'
import TraderSaga from './Traders/saga'
import BlogsSaga from './Blogs/saga'
import SubscribeSaga from './Subscribe/saga'
import PromotionalSaga from './Promotion/saga'

// import groupCateDetailsSaga from './GroupCategoriesDetails/saga';

export default function* rootSaga() {
  yield all([
    UsersSaga(),
    AuthSagas(),
    AlertSaga(),
    jobsSaga(),
    VisitSaga(),
    ContractorsSaga(),
    OrdersSaga(),
    OrderVisits(),
    JobsCompletedSaga(),
    ServicesSaga(),
    CustomerSaga(),
    CategoryDetailsSaga(),
    ProductDetailsSaga(),
    InstantQuoteSaga(),
    groupDetailsSaga(),
    CustomerFlowSaga(),
    FinalOrderSaga(),
    VisitDetailsSaga(),
    QuoteDetailsSaga(),
    FileSaga(),
    CardDetailsSaga(),
    TraderSaga(),
    BlogsSaga(),
    SubscribeSaga(),
    PromotionalSaga(),
  ])
}
