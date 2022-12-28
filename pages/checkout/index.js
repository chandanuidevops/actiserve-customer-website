import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react'

/* Components */
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar'
import SiteMainNavbarV2 from '../../components/SiteMain/SiteMainNavbar/SiteMainNavbarV2'
import HelmetComponent from '../../components/Helmet'
/* Semantic UI */
import {
  Grid,
  Button,
  Loader,
  Card,
  Icon,
  Checkbox,
  Modal,
  Form,
} from 'semantic-ui-react'
import {InputAdornment, Paper} from '@material-ui/core'

/* Helper Packages */
import {useMediaQuery} from 'react-responsive'
import Geolocation from 'react-geolocation'
import * as Yup from 'yup'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

/* Materail ui */
import {
  TextField,
  IconButton,
  withStyles,
  Drawer,
  DialogContent,
  makeStyles,
  Box,
  FormControlLabel,
  Radio,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import {Close} from '@material-ui/icons'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

/* Redux */
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'

/* Next Js */
import {useRouter} from 'next/router'
import Router from 'next/router'

/* Actions */
import {getProductDetailsRequest} from '../../Stores/ProductDetails/actions'
import {errorAlert, successAlert} from '../../Stores/Alerts/actions'
import {
  validateCustomer,
  getCustomerAddress,
  validatePostcode,
  validateCustomerReset,
  resetCustomerVerified,
  resendVerifyEmail,
} from '../../Stores/CustomerFlow/actions'
import actions from '../../Stores/Auth/actions'
import {
  addOrder,
  createPayment,
  resetOrder,
  checkMaxJob,
} from '../../Stores/FinalOrder/actions'
/* Utility / Hooks */
import {getPostCodeFromLatLong} from '../../utils/latLongSearch'
import useValidator from '../../utils/useValidator'
import ConfirmModal from '../../components/ConfirmModal'
import usePreventRoute from '../../utils/usePreventRoute'
import InvalidAccess from '../../components/InvalidAccess'
import Stepper from '../../components/Stepper'
import AddressModal from '../../components/AddressModal'
import SiteFooter from '../../components/SiteFooter'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {
  getCardsRequest,
  attachPaymentMethod,
  editOrder,
} from '../../Stores/CardDetails/actions'

import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete'
import ClearIcon from '@material-ui/icons/Clear'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import siteImages from '../../Assets/Icons'
import Image from 'next/image'
const LoginAction = actions.CustomerLogin
const LogoutAction = actions.logout
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  swipeToSlide: true,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

function LeftArrow(props) {
  const {className, style, onClick} = props
  return (
    <img
      className={className}
      style={{
        ...style,
        display: 'block',
      }}
      onClick={onClick}
      src="/site__main__images/site__chevron__right.png"
    ></img>
  )
}
function RightArrow(props) {
  const {className, style, onClick} = props
  return (
    <img
      className={className}
      style={{
        ...style,
        display: 'block',
      }}
      onClick={onClick}
      src="/site__main__images/site__chevron__left.png"
    ></img>
  )
}
const styles = (theme) => ({
  customInput: {
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
    '& .MuiOutlinedInput-root': {
      fontFamily: 'Urbanist,sans-serif',
      minHeight: '48px',
      maxHeight: '48px',
      '& fieldset': {
        borderColor: '#C1C1C1',
        borderWidth: '1px',
        borderRadius: '0px',
      },
      '&:hover fieldset': {
        borderColor: '#353535',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#353535',
      },
    },
  },
  customPlaceHolder: {
    '& .MuiOutlinedInput-root': {
      fontFamily: 'Urbanist,sans-serif',
      '& fieldset': {
        borderColor: '#C1C1C1',
        borderWidth: '1px',
        borderRadius: '0px',
      },
    },
  },
  customRadio: {
    '& .MuiRadio-root': {
      borderColor: 'red',
    },
    '& .MuiSvgIcon-root': {
      // color: '#C1C1C1'
    },
    '& .Mui-checked': {
      color: '#0587FF',
    },
    '& .MuiTypography-body1': {
      fontFamily: 'Urbanist, sans-serif',
      marginLeft: '-5px',
      fontSize: '14px',
      lineHeight: '17px',
    },
  },
  drawerPD: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  drawer__img: {
    width: '70px',
    height: '70px',
    marginRight: '16px',
    objectFit: 'contain',
  },
  drawer__header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '14px',
    paddingBottom: '14px',
  },
  drawer__divider: {
    borderBottom: '1px solid #e9e9ea',
    marginLeft: '20px',
    marginRight: '20px',
  },
  drawer__close: {
    width: '18px',
    height: '18px',
    top: '0',
    right: '0',
    marginRight: '1rem',
    marginTop: '1rem',
    position: 'absolute',
  },
  drawer__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  drawer__info: {
    display: 'flex',
    alignItems: 'center',
  },
  drawer__product: {
    paddingTop: '26px',
    paddingBottom: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  product__info: {
    margin: '0',
    padding: '0',
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
    display: 'inline-block',
    textTransform: 'capitalize',
  },
  product__btn: {
    display: 'inline-block',
  },
  drawer__btn__section: {
    display: 'flex',
    alignItems: 'center',
  },
  product__text: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: '0.02em',
    color: 'rgba(33, 38, 43, 0.5)',
  },
  product__price: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  drawer__addon: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '14px',
    paddingBottom: '14px',
  },
  drawer__flex: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '14px',
    paddingBottom: '14px',
    justifyContent: 'space-between',
  },
  drawer__addon__title: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  quantity__img: {
    width: '11px',
    height: '11px',
    margin: '0rem 0.714rem',
  },
  drawer__addon__quantity: {
    display: 'flex',
    alignItems: 'center',
  },
  addon__quantity: {
    margin: '0px',
    padding: '0px',
  },
  addon__quantity: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.02em',
    color: '#000000',
    margin: '0px',
    padding: '0px',
  },
  addon__price: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#000000',
  },
  discount__price: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#0587FF',
  },
  discount__title: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  drawer__footer: {
    paddingTop: '14px',
    paddingBottom: '14px',
    backgroundColor: '#F7F9FB',
    borderTop: '1px solid #E9E9EA',
  },
  footer__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#21262b',
    textAlign: 'center',
  },
  footer__price: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#0587FF',
  },
  footer__check: {
    width: '16px',
    height: '15px',
    marginRight: '0.571rem',
  },
  footer__content: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  footer__text: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    color: 'rgba(33, 38, 43, 0.7)',
  },
  footer__mb: {
    paddingBottom: '12px',
    paddingTop: '1.143rem',
  },
  errorText: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    color: '#DB4A40',
  },
  loaderText: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    color: '#353535',
    marginLeft: '0.5rem',
  },
  existText: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    color: '#353535',
    marginTop: '0.3rem !important',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0rem',
  },
  cardToggle: {
    paddingRight: '0.6rem',
    display: 'flex',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#353535',
  },
  modalinfo: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.02em',
    color: '#353535',
  },
  summary__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#21262b',
    [theme.breakpoints.up('1280')]: {
      fontSize: '1.714rem',
      lineHeight: '2.071rem',
    },
  },
  summary__info: {
    margin: '0',
    padding: '0',
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
    display: 'inline-block',
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '18px',
    },
  },
  summary__price: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '18px',
    },
  },
  summary__discount__title: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  summary__discount__price: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#0587FF',
  },
  summary__footer__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#21262b',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '24px',
    },
  },
  summary__footer__price: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#0587FF',
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '22px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '24px',
    },
  },
  pkgItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0px',
    // margin: '0px 20px',
  },
  pkgItemParent: {
    borderBottom: '1px solid #E9E9EA',
    margin: '0px 20px',
  },
  pkgItemLeft: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pkgItemTitle: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
    // [theme.breakpoints.up('sm')]: {
    //   maxWidth: '70%',
    // },
  },
  pkgItemDesc: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    letterSpacing: '0.02em',
    color: 'rgba(33, 38, 43, 0.7)',
    paddingTop: 8,
    maxWidth: '95%',
  },
  pkgItemPrice: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  productItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '20px',
    marginRight: '20px',
    padding: '16px 0px',
    borderBottom: '1px solid #E9E9EA',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  productItemLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  drawerPaper: {
    width: '100%',
    height: '60vh',
  },
})

function SiteMain(props) {
  /* Destructure props */
  const {
    currentCart,
    classes,

    /* Customer validation */
    validateCustomer,
    isValidatingCustomer,
    isCustomerValid,
    isEmailVerified,
    resetVerified,
    sendVerifyLink,

    /* Customer login */
    CustomerLogin,
    fetchAddress,
    customerAddress,
    validatePostcodeData,
    isValidatingPostcode,
    isPostcodeValid,
    addOrderData,
    addOrderSuccessData,
    isAddOrderSuccess,
    createPayment,
    isCreatingPayment,
    validateCustomerReset,
    isBookingService,
    isAddingSuccess,
    isEditingSuccess,
    isFetchingCustomerAddress,
    isPaymentSuccess,
    fetchCardsData,
    cardDetails,
    isFetchingCardDetails,
    isEditingOrderSuccess,
    editOrder,
    attachPaymentMethod,
    errorAlert,
    resetOrder,
    successAlert,
    getMaxJobData,
    currentMaxJobData,
    Logout,
  } = props

  function getDates(startDate, endDate) {
    let formattedDate = ''
    if (productDetails?.title?.toLowerCase().includes('gutter')) {
      formattedDate = startDate
    } else {
      formattedDate = moment().add(3, 'days')
    }
    var now = formattedDate,
      dates = []

    while (now.isSameOrBefore(endDate)) {
      let data = {
        date: now.format('YYYY-MM-DD'),
        stringDate: now.format('MMMM ddd Do'),
      }
      dates.push(data)
      now.add(1, 'days')
    }
    return dates
  }
  const [calenderDates, setCalendarDates] = useState([])

  /* State Selector */
  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  // const Router = useRouter()

  const history = useRouter()

  /* Use prevent route */
  // const [Prompt, setFormFilled, setSubmit] = usePreventRoute();

  /* Detect window */
  const isBrowser = () => typeof window !== 'undefined'

  const [show, setShow] = useState(0)

  const [productExists, setProductExists] = useState(false)

  const [isLookUpVisible, setIsLookUpVisible] = useState(false)
  const [isLookEditOpen, setIsLookUpEditOpen] = useState(false)

  const [isPageLoading, setIsPageLoading] = useState(true)
  useEffect(() => {
    let timer1 = setTimeout(() => setIsPageLoading(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  /* Detect Route Change to clear data */
  const onRouteChangeStart = React.useCallback(() => {
    resetOrder()
  }, [])

  React.useEffect(() => {
    history.events.on('routeChangeStart', onRouteChangeStart)

    return () => {
      history.events.off('routeChangeStart', onRouteChangeStart)
    }
  }, [onRouteChangeStart, history.events])

  // Check if tablet or mobile screen is active
  const isTabletOrMobile = useMediaQuery({query: '(min-width: 767px)'})
  const isLargeScreen = useMediaQuery({query: '(max-width: 991px)'})

  const [showCard, setShowCard] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)

  /* Cart Data */
  const [cartData, setCartData] = useState([])
  const [sub_total_price, set_sub_total_price] = useState(0)
  const [total_price, set_total_price] = useState(0)
  const [discount_price, set_discount_price] = useState(0)
  const [qa_total, set_qa_total] = useState(0)
  const [addonSelected, setAddonSelected] = useState([])
  const [addonsTotal, setAddonsTotal] = useState(0)

  const [packagesSelected, setPackagesSelected] = useState([])

  const [productSelected, setProductSelected] = useState([])

  const [includedItems, setIncludedItems] = useState([])

  /* Submit type */
  //login = login action
  //order = order action
  const [submitType, setSubmitType] = useState('order')

  const [productDetails, setProductDetails] = useState(null)

  /* User logged In tracker */
  const [customerExists, setCustomerExists] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  /* Form State Track */
  const [stepActive, setStepActive] = useState(1)
  const [cardDisplayType, setCardDisplayType] = useState(1)

  /* Step complete tracker */
  const [stepOneComplete, setStepOneComplete] = useState(false)
  const [stepTwoComplete, setStepTwoComplete] = useState(false)
  const [stepThreeComplete, setStepThreeComplete] = useState(false)
  const [stepFourComplete, setStepFourComplete] = useState(false)

  /* Keyboard Date Handler */
  const [showDateError, setShowDateError] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [finalCustomerDate, setFinalCustomerDate] = useState([])

  /*  */
  const [selectedAddress, setSelectedAddress] = useState(false)

  // Customer Address Modal
  const [addressModalOpen, setAddresssModalOpen] = useState(false)
  const [addressAddModalOpen, setAddresssAddModalOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState([])
  const [addressModal, setAddressModal] = useState()
  const [defaultAddress, setDefaultAddress] = useState('')

  /* Address lookup State */
  const [address, setAddress] = useState()
  const [addressObj, setAddressObj] = useState()
  const [isPostcodeAvailable, setIsPostcodeAvaiable] = useState(false)

  // Quote cannot be calculated
  const [isQuoteNA, setIsQuoteNA] = useState(false)

  /* Group Data */
  const [groupID, setGroupID] = useState('')

  /* Product QA */
  const [finalProductQa, setFinalProductQa] = useState([])

  // New Keys
  const [recurringPeriod, setRecurringPeriod] = useState(0)
  const [isRecurring, setIsRecurring] = useState(false)

  const [isCustomerVerified, setIsCustomerVerified] = useState(true)
  useEffect(() => {
    resetVerified()
  }, [])

  // New Payment
  const childRef = useRef()

  // Add card
  const addCardRef = useRef()

  // Existing card
  const existingCardRef = useRef()

  /* SStripe Replated */
  const [paymentIntent, setPaymentIntent] = useState({})
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_APP_STRIPE_KEY)
  const [paymentRequest, setPaymentRequest] = useState(false)
  const [orderedData, setOrderedData] = useState({})

  /* Recurring Week Type */
  const [recurringType, setRecurringType] = React.useState('One Off')

  /* Summart Addon Mobile Drawer */
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false)

  /*  */
  const [removedQuestions, setRemovedQuestions] = useState([])

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const [currentWeek, setCurrentWeek] = useState([])
  const [selectedCustomerDates, setSelectedCustomerDates] = useState([])
  const [selectedCustomerDatesValid, setSelectedCustomerDatesValid] = useState(
    null,
  )

  /* Use prevent route */

  useEffect(() => {
    if ((stepOneComplete, stepTwoComplete, stepThreeComplete)) {
      // setFormFilled()
    }
  }, [stepOneComplete, stepTwoComplete, stepThreeComplete])

  useEffect(() => {
    if (recurringPeriod === 4) {
      setRecurringType('Every 4 Weeks')
    }
    if (recurringPeriod === 8) {
      setRecurringType('Every 8 Weeks')
    }
  }, [recurringPeriod])

  useEffect(() => {
    if (isBrowser() === true) {
      let formattedAddress = localStorage.getItem('urbanserve_user_address')

      let addressOBJ = localStorage.getItem('urbanserve_user_address_obj')

      let currentLocation = localStorage.getItem('urbanserve_user_location')
      let lastLocation = localStorage.getItem('urbanserve_user_last_location')

      if (addressOBJ !== null && addressOBJ !== undefined) {
        let cleanOBJ = JSON.parse(addressOBJ)
        if (
          JSON.stringify(currentLocation) === JSON.stringify(lastLocation) &&
          cleanOBJ
        ) {
          setValues({
            ...values,
            address_1: cleanOBJ?.address,
            city: cleanOBJ?.postal_town,
            // postcode: cleanOBJ?.postal_code,
            address_4: cleanOBJ?.province,
          })
          if (formattedAddress) {
            setValue(formattedAddress)
          }
        }
      }
    }
    setIsCustomerVerified(true)
  }, [])

  useEffect(() => {
    if (isLookUpVisible) {
      setIsLookUpEditOpen(true)
    } else {
      setIsLookUpEditOpen(false)
    }
  }, [isLookUpVisible])

  useEffect(() => {
    let tempData = JSON.parse(JSON.stringify(addOrderSuccessData))
    if (tempData?.id !== undefined) {
      let data = {
        id: tempData?.id,
        access_token:
          tempData?.access_token !== undefined ? tempData?.access_token : null,
        product_id: tempData?.product_id,
        category_id: tempData?.category_id,
        group_id: tempData?.group_id,
        quote_summary_id:
          tempData?.quote_summary_id == undefined
            ? ''
            : tempData?.quote_summary_id,
        product_price: tempData?.product_price,
        total_price: tempData?.total_price,
        status: tempData?.status,
        payment_method: tempData?.payment_method,
        stripe_client_secret: tempData?.stripe_client_secret,
        subscription: tempData?.subscription,
        stripe_customer: tempData?.stripe_customer,
        stripe_payment_method: tempData?.stripe_payment_method,
        stripe_subscription: tempData?.stripe_subscription,
      }
      setOrderedData(data)
    }
  }, [addOrderSuccessData])

  const CheckoutForm = forwardRef((props, ref) => {
    const stripe = useStripe()
    const elements = useElements()

    useImperativeHandle(ref, () => ({
      getAlert() {
        handleSubmit1()
      },
    }))

    const handleSubmit1 = async (event) => {
      event?.preventDefault()

      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: addOrderSuccessData?.customer_details?.customer?.name,
          email: addOrderSuccessData?.customer_details?.customer?.email,
          address: {
            line1:
              addOrderSuccessData?.customer_details?.customer_address
                ?.address_1,
            postal_code:
              addOrderSuccessData?.customer_details?.customer_address?.postcode,
            city: addOrderSuccessData?.customer_details?.customer_address?.city,
            country:
              paymentMethod?.card?.country == undefined
                ? null
                : paymentMethod?.card?.country,
          },
        },
      })

      if (error) {
        if (error?.message) {
          errorAlert(error?.message)
        }
      }

      if (addOrderSuccessData?.is_recurring === false) {
        if (addOrderSuccessData?.stripe_client_secret == null) {
          errorAlert(
            'Something went wrong with paymentMethod and payment intents, Please contact administrator',
          )
          return false
        }
        await stripe
          .confirmCardPayment(addOrderSuccessData?.stripe_client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: addOrderSuccessData?.customer_details?.customer?.name,
                email: addOrderSuccessData?.customer_details?.customer?.email,
              },
            },
          })
          .then(function (result) {
            // Handle result.error or result.paymentIntent
            if (result.paymentIntent) {
              successAlert('Payment succeeded.')
              setPaymentIntent(result.paymentIntent)
              setShowCard(false)
              setValues({
                ...values,
                status: 'confirmed',
                paymentMethod: paymentMethod.id,
              })

              let payload = orderedData
              payload.stripe_payment_method = paymentMethod?.id
              payload.payment_method = 'card'
              payload = {
                ...payload,
                status: 'Created',
              }
              createPayment({data: payload})
            }
            if (result.error) {
              errorAlert('error occured while payment', result.error)
              return false
            } else {
              setPaymentRequest(true)
              if (result?.id !== undefined) {
              }
              //
            }
          })
      } else {
        if (paymentMethod && paymentMethod.id) {
          //   setShowCard(false)
          setValues({
            ...values,
            status: 'confirmed',
            paymentMethod: paymentMethod.id,
          })
          setPaymentRequest(true)
          let payload = orderedData
          payload.stripe_payment_method = paymentMethod?.id
          payload.payment_method = 'card'
          payload = {
            ...payload,
            status: 'Created',
          }
          createPayment({data: payload})
        }
      }
      return true
    }

    return (
      // <form onSubmit={handleSubmit1}>
      <>
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
            // value: {
            //   postalCode: 'LE40GR',
            // },
          }}
          style={{marginTop: '1rem'}}
        />
        {/* <Button
          type="button"
          disabled={!stripe}
          onClick={handleSubmit1}
          style={{ marginTop: '1rem' }}
          className="pay__btn"
        >
          Pay
        </Button> */}
      </>
    )
  })

  useEffect(() => {
    if (cartData && cartData?.[0]?.product_qa?.length > 0) {
      let array = []
      cartData?.[0]?.product_qa?.length > 0 &&
        cartData?.[0]?.product_qa?.map((qa) => {
          let data = {
            answer: qa?.answer,
            question: qa?.question,
          }
          array.push(data)
          if (array) {
            setFinalProductQa(array)
          }
        })
    }
  }, [cartData])

  /* Get Group ID */
  useEffect(() => {
    if (isBrowser() === true) {
      let groupId = localStorage.getItem('group_id')
      if (groupId !== null) {
        setGroupID(groupId)
      }
    }
  }, [])

  // check and set values of is_recurring && recurringPeriod
  useEffect(() => {
    if (cartData?.[0]?.product_qa?.length > 0) {
      let data = cartData?.[0]?.product_qa
      if (data && data.length > 0) {
        data.map((ele) => {
          let check_ans = ele.answer_title.toLowerCase()
          if (check_ans.includes('week')) {
            setIsRecurring(true)
            if (check_ans.includes('4')) {
              setRecurringPeriod(4)
            }
            if (check_ans.includes('8')) {
              setRecurringPeriod(8)
            }
          }
        })
      }
    }
  }, [cartData?.[0]?.product_qa])

  useEffect(() => {
    if (
      // cartData?.[0]?.quote_qa_grant_total === 0 ||
      isNaN(cartData?.[0]?.quote_qa_grant_total)
    ) {
      setIsQuoteNA(true)
    } else {
      setIsQuoteNA(false)
    }
  }, [cartData, cartData?.length])

  /* Get Cart Details From Local storage / Reducer */
  useEffect(() => {
    if (isBrowser() === true) {
      let cartItems = localStorage.getItem('cartItems')
      if (cartItems !== null && cartItems !== '') {
        let cartArr = []
        let cartObj = JSON.parse(cartItems)
        if (cartObj) {
          cartArr.push(cartObj)
        }
        if (cartArr !== null) {
          setCartData(cartArr)
        }
      }

      /* Includes Items */
      let includedItemsRaw = localStorage.getItem('urbanserve_includes_items')
      if (includedItemsRaw) {
        let cleanIncludedItems = JSON.parse(includedItemsRaw)
        if (cleanIncludedItems) {
          setIncludedItems(cleanIncludedItems)
        }
      }
    }
  }, [])

  const [showSpecificContent, setShowSpecificContent] = useState(false)

  /* Fill Data If Cart Data Is Present */
  useEffect(() => {
    if (cartData) {
      let data = cartData[0]
      if (data?.discount_price) {
        set_discount_price(data?.discount_price)
      }
      if (data?.quote_qa_grant_total) {
        set_qa_total(data?.quote_qa_grant_total)
      }
      if (data?.total_price) {
        set_total_price(data?.total_price)
      }
      if (data?.sub_total_price) {
        set_sub_total_price(data?.sub_total_price)
      }
      if (data?.addons) {
        setAddonSelected(data?.addons)
      }
      if (data?.product) {
        setProductDetails(data?.product)
      }
      if (data?.packages_selected) {
        setPackagesSelected(JSON.parse(data?.packages_selected))
      }
      if (data?.product_selected) {
        setProductSelected(JSON.parse(data?.product_selected))
      }
      if (data?.is_package_applicable || data?.is_product_applicable) {
        setShowSpecificContent(false)
      } else {
        setShowSpecificContent(true)
      }
    }
    if (cartData?.length > 0) {
      setProductExists(true)
    } else {
      setProductExists(false)
    }
  }, [cartData])

  /* Calculate Addons Total */
  useEffect(() => {
    let addon_total = 0
    addonSelected.map((ele) => {
      addon_total += ele?.total
      setAddonsTotal(addon_total)
    })
  }, [addonSelected])

  // uncomment
  // Check if user is logged in
  useEffect(() => {
    if (userInfo !== null && userInfo !== undefined) {
      if (userInfo?.id !== null) {
        setLoggedIn(true)
        setCustomerExists(true)
      }
    } else {
      setLoggedIn(false)
      setCustomerExists(false)
      setStepOneComplete(false)
      setSelectedAddress(false)
      // setStepActive(1)
    }
  }, [userInfo])

  /* Use Validator */
  const {
    getFieldProps,
    errors,
    setValues,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    clearFormState,
    values,
  } = useValidator({
    initialValues: {
      userEmail: '',
      email: '',
      name: '',
      password: '',
      mobileno: '',
      telephoneno: '',
      postcode: '',
      address_1: '',
      address_2: '',
      address_3: '',
      address_4: '',
      city: '',
      term_accept: false,
      customer_type: 'Home Owner',
      payment_method: 'cash',
      term_accept: false,
      customer_job_scheduler: [
        {
          preffered_date: '',
          slot: '',
        },
      ],
    },
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required!'),
      // userEmail: Yup.string().required(),
      password:
        customerExists === true && loggedIn === false
          ? Yup.string().required()
          : Yup.string().nullable(),
      mobileno:
        !customerExists && loggedIn === false
          ? Yup.string()
              .test(
                `Mobile Number format`,
                `Invalid Mobile Number format!`,
                function (value) {
                  const mobileRegex = /^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)?\d{4}(\s)?\d{6}$/
                  return (
                    typeof value === 'string' &&
                    mobileRegex.test(value.replace(/\s/g, ''))
                  )
                },
              )
              .required('Mobile number is required!')
          : Yup.string().nullable(),
      // customer_job_scheduler:
      //   customerExists && !loggedIn
      //     ? Yup.string().nullable()
      //     : Yup.array().of(
      //         Yup.object().shape({
      //           preffered_date: Yup.date().typeError(
      //             'Preferred date is required!',
      //           ),
      //           slot: Yup.string('Slot is required').required(
      //             'Slot is required!',
      //           ),
      //         }),
      //       ),
      term_accept:
        customerExists && !loggedIn
          ? Yup.string().nullable()
          : Yup.bool().oneOf([true], 'Field must be checked'),
      address_1: !customerExists && !loggedIn && Yup.string().required(),
      name:
        !customerExists && !loggedIn
          ? Yup.string().required('Name is required!')
          : Yup.string().nullable(),
      customer_type:
        !customerExists && !loggedIn
          ? Yup.string().required('Type is required!')
          : Yup.string().nullable(),
      postcode:
        !customerExists && !loggedIn
          ? Yup.string().required('Postcode is required!')
          : Yup.string().nullable(),
      payment_method: Yup.string().required(),
      city:
        customerExists && !loggedIn
          ? Yup.string().nullable()
          : Yup.string().required('City is required!'),
    }),
  })

  // Reset state if loggedout
  useEffect(() => {
    if (!loggedIn && userInfo === null) {
      setStepActive(1)
      setStepOneComplete(false)
      setStepTwoComplete(false)
      setStepThreeComplete(false)
      clearFormState()
      setCustomerExists(false)
      setSelectedCustomerDates([])
      setSelectedCustomerDatesValid(null)
    }
  }, [loggedIn, userInfo])

  async function onSubmit() {
    await time()
    let product_settings = []
    if (submitType === 'login') {
      let credentails = {
        email: values?.email,
        password: values?.password,
      }
      CustomerLogin(credentails, history, 'order')
    }

    let customer_preferred_dates = []
    selectedCustomerDates?.length > 0 &&
      selectedCustomerDates?.map((data) => {
        let obj = {
          preffered_date: data?.date,
          slot: data?.slot,
        }
        customer_preferred_dates.push(obj)
      })

    if (
      submitType === 'order' &&
      selectedCustomerDatesValid !== null &&
      selectedCustomerDatesValid
    ) {
      if (true) {
        let Data = await {
          product_id: cartData?.[0]?.product?.id,
          category_id: cartData?.[0]?.product?.category_id,
          group_id: groupID,
          quote_summary_id: '',
          product_price: cartData?.[0]?.product?.price,
          total_price: isQuoteNA ? 0 : total_price,
          status: 'Draft',
          payment_method: 'cash',
          notes_from_customers: values?.notes_from_customers
            ? values?.notes_from_customers
            : '',
          customer_id: loggedIn ? userInfo?.id : '',
          customer_address_id: loggedIn ? selectedAddress?.id : '',
          customer: {
            name: values?.name,
            email: values?.email,
            customer_type:
              values?.customer_type === 'Home Owner'
                ? 'homeowner'
                : values?.customer_type === 'Tenant'
                ? 'tenant'
                : 'landlord',
            mobile_no: values?.mobileno,
            role_id: '',
          },
          customer_addresses: {
            city: values?.city,
            address_1: values?.address_1,
            address_2: values?.address_2,
            address_3: values?.address_3,
            address_4: values?.address_4 ? values?.address_4 : '',
            address_5: values?.address_5 ? values?.address_5 : '',
            is_default: values?.is_default ? values?.is_default : false,
            postcode: values?.postcode,
          },
          product_addon: addonSelected,
          product_qa: finalProductQa,
          orders_contact: [],
          customer_job_scheduler: customer_preferred_dates,
          is_recurring: isRecurring,
          recurring_period: recurringPeriod,
          price: total_price,
          vat_rate: cartData?.[0]?.product?.vat_rate,
          recurring_discount: cartData?.[0]?.product?.is_recurring_discount,
          discount: cartData?.[0]?.discount_price,
          add_on_details: JSON.stringify(addonSelected),
          product_settings: isQuoteNA ? JSON.stringify(product_settings) : '[]',
          quote_required: isQuoteNA ? true : false,
          addon_total: addonsTotal,

          is_product_applicable:
            cartData?.[0]?.product?.product_offering ?? false,
          product_selected: cartData?.[0]?.product_selected,
          is_package_applicable: productDetails?.build_package
            ? productDetails?.build_package
            : false,
          packages_selected: JSON.stringify(packagesSelected),
        }

        await addOrderData({data: Data, customerExists, history})
      }
    }
  }

  useEffect(() => {
    if (
      values?.email &&
      values?.name &&
      values?.mobileno &&
      values?.customer_type &&
      errors?.email === undefined &&
      errors?.name === undefined &&
      errors?.mobileno === undefined
    ) {
      setStepOneComplete(true)
    } else if (!loggedIn) {
      setStepOneComplete(false)
    }

    /* Set step two complete */
    if (
      values?.address_1 &&
      values?.postcode &&
      values?.city &&
      values?.address_4
    ) {
      setStepTwoComplete(true)
    } else if (!loggedIn) {
      setStepTwoComplete(false)
    }

    /* Set step three complete */
    if (values?.term_accept === true && selectedCustomerDatesValid === true) {
      setStepThreeComplete(true)
    } else {
      setStepThreeComplete(false)
    }
  }, [values, errors, selectedCustomerDatesValid])

  const [isPreferredDateSame, setIsPreferredDateSame] = useState(false)
  const [isThirdDateSame, setIsThirdDateSame] = useState(false)

  /* Date Handler */
  const changeQuestionHandle = (value, name, index) => {
    let data = values.customer_job_scheduler

    let isDateSame = false
    let isSlotSame = false
    if (name === 'Date') {
      data[index].preffered_date = value
      if (data?.length > 1 && data?.length <= 2) {
        /* Date validation */
        function isSameAnswer(el, index, arr) {
          if (index === 0) {
            return true
          } else {
            return el.preffered_date === arr[index - 1].preffered_date
          }
        }
        let result = data.every(isSameAnswer)
        if (result) {
          isDateSame = true
          setIsPreferredDateSame(true)
        } else {
          isDateSame = false
          setIsPreferredDateSame(false)
        }
      }
      if (data?.length >= 3) {
        function isSameAnswer(el, index, arr) {
          if (index === 0) {
            return true
          } else {
            if (
              arr[1].preffered_date === arr[2].preffered_date ||
              arr[2].preffered_date === arr[0].preffered_date
            ) {
              setIsThirdDateSame(true)
              return true
            } else {
              setIsThirdDateSame(false)
              return false
            }
          }
        }
        let result = data.every(isSameAnswer)
      }
    }
    if (name === 'Slot') {
      if (value == 'Full day') {
        data[index].slot = 'FULLDAY'
      } else {
        data[index].slot = value
      }
      if (data?.length > 1) {
        /* Slot validation */
        if (isDateSame === true) {
          function isSameSlot(el, index, arr) {
            if (index === 0) {
              return true
            } else {
              return el.slot === arr[index - 1].slot
            }
          }
          let slot = data.every(isSameSlot)
          if (slot) {
            isSlotSame = true
          } else {
            isSlotSame = false
          }
        }
      }
    }

    setValues({
      ...values,
      customer_job_scheduler: data,
    })

    // time()
  }

  /* Add Date Handler */
  const addPartHandle = () => {
    let options = {
      preffered_date: '',
      slot: '',
    }

    let data =
      values.customer_job_scheduler.length > 0
        ? values.customer_job_scheduler
        : []
    let error = false

    data?.map((ele, i) => {
      if (
        errors['customer_job_scheduler[' + i + '].preffered_date'] ===
          undefined ||
        errors['customer_job_scheduler[' + i + '].slot'] === undefined
      ) {
        error = false
      } else {
        error = true
      }
    })

    if (!error) {
      data.push(options)
      setValues({
        ...values,
        customer_job_scheduler: data,
      })
    }
  }

  /* Time Object Prep */
  function time() {
    let array = []
    values?.customer_job_scheduler?.length > 0 &&
      values?.customer_job_scheduler?.map((time) => {
        let arr = time?.preffered_date

        var res = arr?.split(/(\s+)/)
        if (res?.[0] !== undefined && res?.[1] !== undefined) {
          let data = {
            preffered_date: res?.[0],
            start_time: res?.[2],
          }
          array.push(data)
          if (array) {
            setFinalCustomerDate(array)
          }
        }
      })
  }

  /* Validate Customer */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (
        values?.email !== null &&
        values?.email !== '' &&
        errors.hasOwnProperty('email') === false
        // && loggedIn === false
      ) {
        validateCustomer({email: values?.email})
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [values?.email, errors?.email])

  /* Check if customer is valid */
  useEffect(() => {
    if (loggedIn === false) {
      if (isCustomerValid === 200) {
        setCustomerExists(true)
        validateCustomerReset()
      } else if (isCustomerValid === 404) {
        setCustomerExists(false)
      }
    }
  }, [isCustomerValid, loggedIn, userInfo])

  useEffect(() => {
    validateCustomerReset()
    setcheckPostCodeReq(null)
  }, [])

  const removeQuestionHandle = (index) => {
    let options = values?.customer_job_scheduler
    let removedQuestion = removedQuestions
    if (options?.length > 1) {
      let removedQuestion = removedQuestions

      if (options[index]?.question_id) {
        removedQuestion.push(options[index].question_id)
        setRemovedQuestions(removedQuestion)
      }

      options.splice(index, 1)
      setValues({...values, customer_job_scheduler: options})

      if (options?.length <= 1) {
        setIsPreferredDateSame(false)
      }
      // setSection(options);
    } else {
      errorAlert('Add atleast one preferred date')
    }
  }

  // Check if user is logged in
  useEffect(() => {
    if (customerExists && loggedIn) {
      if (userInfo) {
        setValues({
          ...values,
          email: userInfo?.email,
          name: userInfo?.name,
          mobileno: userInfo?.mobile_no,
          telephoneno: userInfo?.telephoneno ? userInfo?.telephoneno : '',
          customer_type: userInfo?.customer_type ? userInfo?.customer_type : '',
        })
      }
    }
  }, [customerExists, loggedIn])

  /* Fetch address if customer is logged in */
  useEffect(() => {
    if (userInfo !== null && loggedIn === true) {
      fetchAddress(userInfo?.id)
      setStepOneComplete(true)
      setStepActive(2)
    }
  }, [userInfo, loggedIn])

  /* If address is selected set values */
  useEffect(() => {
    if (selectedAddress !== false && selectedAddress !== undefined) {
      setValues({
        ...values,
        address_1: selectedAddress?.address_1,
        city: selectedAddress?.city,
        postcode: selectedAddress?.postcode,
        address_4: selectedAddress?.address_4,
      })
    }
  }, [selectedAddress])

  function handleOrder() {
    setSubmitType('order')
    // setStepActive(4);
  }

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      postal_town: ['postal_town'],
      street: ['street_address', 'route'],
      county: ['administrative_area_level_2'],
      province: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      country: ['country'],
    }

    let address = {
      street_number: '',
      postal_code: '',
      postal_town: '',
      street: '',
      province: '',
      city: '',
      country: '',
    }

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'locality') {
            address[shouldBe] = component.short_name
          } else {
            address[shouldBe] = component.long_name
          }
        }
      }
    })

    // Fix the shape to match our schema
    address.address = address.street_number + ' ' + address.street
    delete address.street_number
    delete address.street
    if (address.country === 'US') {
      address.state = address.province
      delete address.province
    }
    return address
  }
  useEffect(() => {
    let dateWeek = moment()
    let currentMonth = moment().month() + 1
    let nextMonth = moment().month() + 2
    var startDate = moment([2022, currentMonth])
    var endDate = moment(startDate).endOf('month')

    if (dateWeek && endDate) {
      let result = getDates(dateWeek, endDate)
      if (productDetails) {
        let payload = {
          product_id: productDetails?.id,
          start_date: moment().format('YYYY-MM-DD'),
          end_date: endDate.format('YYYY-MM-DD'),
        }
        getMaxJobData(payload)
      }

      setCalendarDates(result)
    }
  }, [productDetails])
  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id))
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components)
      setAddressObj(addressObject)
    }
    func()
  }, [address])

  // useEffect(() => {
  //   if (addressObj !== null) {
  //     setValues({
  //       ...values,
  //       address_1: addressObj?.address,
  //       postcode: addressObj?.postal_code,
  //       city: addressObj?.postal_town,
  //       address_4: addressObj?.county,
  //     })
  //   } else {
  //     setValues({
  //       ...values,
  //       address_1: '',
  //       postcode: '',
  //       city: '',
  //       address_4: '',
  //     })
  //   }
  // }, [addressObj])

  const [checkPostCodeReq, setcheckPostCodeReq] = useState(null)

  /* Validate Postcode Data */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (values?.postcode !== '' && values?.postcode !== undefined) {
        let data = {
          postcode: values?.postcode,
          product_id: cartData?.[0]?.product?.id,
        }
        validatePostcodeData(data)
        let checkData = {
          postcode: values?.postcode,
          product_id: cartData?.[0]?.product?.id,
          is_checked: false,
        }
        setcheckPostCodeReq(checkData)
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [values?.postcode])

  useEffect(() => {
    if (isValidatingPostcode) {
      if (values?.postcode == checkPostCodeReq?.postcode) {
        let data = {
          ...checkPostCodeReq,
          is_checked: true,
        }
        setcheckPostCodeReq(data)
      }
    }
  }, [isValidatingPostcode, values, checkPostCodeReq])

  useEffect(() => {
    if (addOrderSuccessData?.id && isAddOrderSuccess) {
      setStepActive(4)
      setStepThreeComplete(true)
      setShowCard(true)
    }
  }, [isAddOrderSuccess, addOrderSuccessData])

  /* If dates selected == 1 reset validation*/
  useEffect(() => {
    if (values?.customer_job_scheduler?.length <= 1) {
      setIsThirdDateSame(false)
      setIsPreferredDateSame(false)
    }
  }, [values?.customer_job_scheduler])

  // Clear state value bases on modal type
  const handleModalClose = () => {
    if (addressAddModalOpen === true) {
      setAddresssAddModalOpen(false)
      setCurrentAddress([])
      setDefaultAddress('')
    } else {
      setAddresssModalOpen(false)
      setCurrentAddress([])
    }
  }
  const [addressObjModal, setAddressObjModal] = useState()
  const getAddressObjectModal = (address_components) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      postal_town: ['postal_town'],
      county: ['administrative_area_level_2'],
      street: ['street_address', 'route'],
      province: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      country: ['country'],
    }

    let address = {
      street_number: '',
      postal_code: '',
      postal_town: '',
      street: '',
      province: '',
      city: '',
      country: '',
    }

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'locality') {
            address[shouldBe] = component.short_name
          } else {
            address[shouldBe] = component.long_name
          }
        }
      }
    })

    // Fix the shape to match our schema
    address.address = address.street_number + ' ' + address.street
    delete address.street_number
    delete address.street
    if (address.country === 'US') {
      address.state = address.province
      delete address.province
    }
    return address
  }
  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        addressModal &&
        addressModal.value &&
        (await geocodeByPlaceId(addressModal.value.place_id))
      const addressObject =
        geocodeObj && getAddressObjectModal(geocodeObj[0].address_components)
      setAddressObjModal(addressObject)
    }
    func()
  }, [addressModal])

  useEffect(() => {
    if (!isCreatingPayment && isPaymentSuccess && paymentRequest) {
      Router.push('/confirmation')
      setPaymentRequest(false)
    } else if (!isCreatingPayment && !isPaymentSuccess && paymentRequest) {
      setPaymentRequest(false)
    }
  }, [isCreatingPayment, isPaymentSuccess])

  useEffect(() => {
    if (addOrderSuccessData?.id !== undefined && loggedIn === true) {
      fetchCardsData({order_id: addOrderSuccessData?.id})
    }
  }, [addOrderSuccessData])

  function handlePayment(val, history, type) {
    if (val) {
      editOrder({id: addOrderSuccessData.id, data: val, history, type})
    }
  }

  const PayViaCard = forwardRef((props, ref) => {
    const stripe = useStripe()
    const elements = useElements()
    useImperativeHandle(ref, () => ({
      payCardHandle() {
        payCard()
      },
    }))
    const payCard = async () => {
      // event.preventDefault()
      if (addOrderSuccessData?.is_recurring !== true) {
        if (addOrderSuccessData.stripe_client_secret === null) {
          errorAlert(
            'Something went wrong with paymentMethod and payment intents, Please contact administrator',
          )
        }
        await stripe
          .confirmCardPayment(addOrderSuccessData.stripe_client_secret, {
            payment_method: selectedPaymentMethod?.id,
          })
          .then(async function (result) {
            // Handle result.error or result.paymentIntent
            if (result.paymentIntent) {
              // alert('Payment succeeded.');
              setPaymentIntent(result.paymentIntent)
              setShowCard(false)
              // setValues({
              //   ...values,
              //   status: 'Created',
              //   payment_method: 'card',
              //   paymentMethod: selectedPaymentMethod?.id,
              //   stripe_payment_method: selectedPaymentMethod?.id,
              // });

              let val = {
                status: 'Created',
                payment_method: 'card',
                paymentMethod: selectedPaymentMethod?.id,
                stripe_payment_method: selectedPaymentMethod?.id,
                customer_id: addOrderSuccessData?.customer_id,
                customer_details: addOrderSuccessData?.customer_details,
                customer_address_id: addOrderSuccessData?.customer_address_id,
              }
              await handlePayment(val, history, 'one-off')
              // successAlert('Payment succeeded.');
            }
            if (result.error) {
              errorAlert(result.error.message)
              // alert('error occured while payment', result.error);
              return false
            }
          })
      } else {
        if (selectedPaymentMethod && selectedPaymentMethod?.id) {
          let val = {
            status: 'Created',
            payment_method: 'card',
            paymentMethod: selectedPaymentMethod?.id,
            stripe_payment_method: selectedPaymentMethod?.id,
            customer_id: addOrderSuccessData?.customer_id,
            customer_details: addOrderSuccessData?.customer_details,
            customer_address_id: addOrderSuccessData?.customer_address_id,
          }
          handlePayment(val, history, 'recurring')
        }
      }
      return true
    }

    return (
      // <Button
      //   className="add__card__btn"
      //   type="button"
      //   variant="contained"
      //   color="primary"
      //   disabled={!stripe || selectedPaymentMethod === null}
      //   onClick={payCard}
      // >
      //   <img
      //     width="100%"
      //     src={'/site__icons/icon__pay.png'}
      //   />
      //   {addOrderSuccessData?.is_recurring ? 'Subscribe' : 'Pay'}
      // </Button>
      <></>
    )
  })

  const AddNewCard = forwardRef((props, ref) => {
    const stripe = useStripe()
    const elements = useElements()
    useImperativeHandle(ref, () => ({
      addCardHandle() {
        addPaymentMethod()
      },
    }))
    const addPaymentMethod = async () => {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })

      if (paymentMethod && paymentMethod.id) {
        let payload = {
          payment_method: paymentMethod.id,
          id: addOrderSuccessData?.id,
        }
        await attachPaymentMethod(payload)
      }
    }

    // useEffect(() => {
    //   if (isEditingOrderSuccess) {
    //     Router.push('/confirmation')
    //   }
    // }, [isEditingOrderSuccess])

    return (
      <>
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {/* <Button
          type="button"
          variant="contained"
          color="primary"
          // className={classes.SaveButton}
          disabled={!stripe}
          onClick={addPaymentMethod}
          style={{ marginTop: '0.5rem' }}
        >
          {'Add Card'}
        </Button> */}
      </>
    )
  })

  /* Google Input */
  const {
    ready,
    suggestions: {status, data},
    setValue,
    value,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {country: ['uk', 'UK']},
      debounce: 300,
    },
  })
  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: {main_text, secondary_text},
      } = suggestion

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="us__google__item"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  /* Set Address Value  */
  const setAddressData = (address, description) => {
    if (address) {
      setValues({
        ...values,
        address_1: address?.address,
        city: address?.postal_town,
        postcode: address?.postal_code,
        address_4: address?.province,
      })
    }
  }

  /* Clear Address Value  */
  const clearAddressInput = () => {
    setValue('')
    setValues({
      ...values,
      address_1: '',
      city: '',
      postcode: '',
      address_4: '',
    })
  }

  const handleSelect = ({description}) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()
    // Get latitude and longitude via utility functions
    getGeocode({address: description})
      .then((results) => {
        setAddressData(
          getAddressObject(results?.[0]?.address_components),
          description,
        )
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }
  /* Google Input */

  /* set email data */
  useEffect(() => {
    if (
      values?.email &&
      isEmailVerified !== {} &&
      isEmailVerified?.email_verify === 0
    ) {
      setIsCustomerVerified(false)
    } else if (isEmailVerified?.email_verify === 1) {
      setIsCustomerVerified(true)
    }
    if (isEmailVerified === {}) {
      setIsCustomerVerified(true)
    }
  }, [isEmailVerified])

  /* Resend email handler */
  const handleSendEmail = () => {
    if (values?.email) {
      let data = {
        email: values?.email,
        role: 'customer',
      }
      if (data) {
        sendVerifyLink({data})
      }
    }
  }

  useEffect(() => {
    let dateWeek = moment().format('MM-DD-YYYY')

    let tempData = [0, 1, 2, 3, 4, 5, 6, 7]
    let tempCurrentWeek = []

    tempData.map((ele) => {
      let date = moment(dateWeek).day(ele).format('ddd Do')
      if (date !== null) {
        if (tempCurrentWeek.indexOf(date) < 0) {
          let obj = {
            date: moment(dateWeek).day(ele).format('YYYY-MM-DD'),
            stringDate: date,
          }
          tempCurrentWeek.push(obj)
        }
      }
    })
    setCurrentWeek(tempCurrentWeek)
    setSelectedCustomerDatesValid(null)
  }, [])

  useEffect(() => {
    if (currentWeek?.length === 8 && productDetails) {
      let start_date = currentWeek[0].date
      let end_date = currentWeek[7].date

      let payload = {
        product_id: productDetails?.id,
        start_date,
        end_date,
      }
    }
  }, [currentWeek, productDetails])

  const getSlotData = (data) => {
    let slot = null
    currentMaxJobData?.dates?.length > 0 &&
      currentMaxJobData?.dates?.map((ele) => {
        if (ele?.date === data?.date) {
          slot = ele?.slot
        }
      })

    return slot
  }

  const handleDateSelect = async (date) => {
    let tempSelectedCustomerDates = JSON.parse(
      JSON.stringify(selectedCustomerDates),
    )
    let numOfSlots = await getSlotData(date)

    if (numOfSlots !== null && numOfSlots > 0) {
      if (tempSelectedCustomerDates?.length < 3) {
        let data = {
          date: date?.date,
          slot: '',
        }

        if (
          tempSelectedCustomerDates.some((data) => data.date === date?.date)
        ) {
        } else {
          tempSelectedCustomerDates.push(data)
        }
        setSelectedCustomerDates(tempSelectedCustomerDates)
      } else {
        errorAlert('You can select only 3 preferred dates!')
      }
    }
    if (numOfSlots === null && currentMaxJobData?.max_jod_per_day <= 0) {
      errorAlert('There is no slot available the selected date!')
    }
    if (numOfSlots === null && currentMaxJobData?.max_jod_per_day > 0) {
      if (tempSelectedCustomerDates?.length < 3) {
        let data = {
          date: date?.date,
          slot: '',
        }

        if (
          tempSelectedCustomerDates.some((data) => data.date === date?.date)
        ) {
        } else {
          tempSelectedCustomerDates.push(data)
        }
        setSelectedCustomerDates(tempSelectedCustomerDates)
      } else {
        errorAlert('You can select only 3 preferred dates!')
      }
    }
  }

  const handleDateRemove = (date, index) => {
    let tempSelectedCustomerDates = JSON.parse(
      JSON.stringify(selectedCustomerDates),
    )
    if (tempSelectedCustomerDates?.length === 1) {
      errorAlert('Atleast 1 preferred date is required!')
    } else {
      tempSelectedCustomerDates.splice(index, 1)
      setSelectedCustomerDates(tempSelectedCustomerDates)
    }
  }

  const handleSlotChange = (slotValue, index) => {
    let tempSelectedCustomerDates = JSON.parse(
      JSON.stringify(selectedCustomerDates),
    )
    // Select modified date
    let modifiedDateSlot = tempSelectedCustomerDates[index]

    // Modify slot value
    if (slotValue == 'Full Day') {
      slotValue = 'FULLDAY'
    }
    modifiedDateSlot = {
      ...modifiedDateSlot,
      slot: slotValue,
    }

    // Modify temp data with new object
    tempSelectedCustomerDates.splice(index, 1, modifiedDateSlot)

    // Modify global state
    setSelectedCustomerDates(tempSelectedCustomerDates)
  }

  useEffect(() => {
    let isValid = false
    let didCheck = false

    if (selectedCustomerDates?.length > 0) {
      selectedCustomerDates.map((data) => {
        if (data.slot === '' && !didCheck) {
          isValid = false
          didCheck = true
        } else if (data.slot !== '' && !didCheck) {
          isValid = true
        }
      })
      setSelectedCustomerDatesValid(isValid)
    }
  }, [selectedCustomerDates])

  const isDateCurrentDate = (data) => {
    let isDateCurrentDate = false
    let currentDate = moment().format('YYYY-MM-DD')
    if (moment(data).isSameOrBefore(currentDate)) {
      isDateCurrentDate = true
    }
    return isDateCurrentDate
  }

  const isDateBufferDate = (data) => {
    let isDateBufferDate = false

    if (!productDetails?.title?.toLowerCase()?.includes('gutter')) {
      let date1 = moment().add(1, 'd').format('YYYY-MM-DD')
      let date2 = moment().add(2, 'd').format('YYYY-MM-DD')

      if (date1 === data || date2 === data) {
        isDateBufferDate = true
      } else {
        isDateBufferDate = false
      }
    } else {
      isDateBufferDate = false
    }
    return isDateBufferDate
  }

  const renderDateStyle = (data) => {
    let style = 'custom_calender_item_content'
    let currentDate = moment().format('YYYY-MM-DD')

    if (!productDetails?.title?.toLowerCase()?.includes('gutter')) {
      let date1 = moment().add(1, 'd').format('YYYY-MM-DD')
      let date2 = moment().add(2, 'd').format('YYYY-MM-DD')

      if (date1 === data || date2 === data) {
        style = 'custom_calender_item_content_disabled'
      }
    }

    let isSelected = false
    let isChecked = false

    // Disabled current date
    if (moment(data).isSameOrBefore(currentDate)) {
      style = 'custom_calender_item_content_disabled'
    }

    if (data !== currentDate) {
      selectedCustomerDates?.map((ele) => {
        if (ele?.date === data && !isChecked) {
          isSelected = true
          isChecked = true
        }
      })
      if (isSelected) {
        style = 'custom_calender_item_content_selected'
      }
    }

    currentMaxJobData?.dates?.length > 0 &&
      currentMaxJobData?.dates?.map((ele) => {
        if (ele?.date === data) {
          if (ele?.slot <= 0) {
            style = 'custom_calender_item_content_disabled'
          }
        } else if (currentMaxJobData?.max_jod_per_day <= 0) {
          style = 'custom_calender_item_content_disabled'
        }
      })

    return style
  }

  const renderSlides = () =>
    calenderDates?.length > 0 &&
    calenderDates.map((num) => (
      <div>
        <p> {num}</p>
      </div>
    ))

  let link = isBrowser() ? `${window.location.hostname}/checkout` : ''

  const handleEnterPress = async (e) => {
    if (stepActive === 1) {
      if (customerExists && isCustomerVerified) {
        await setSubmitType('login')
        if (submitType === 'login') {
          if (values?.password === '') {
            errorAlert('Please enter password to continue', 'error')
          } else {
            await onSubmit()
          }
        }
      } else if (customerExists && !isCustomerVerified) {
        handleSendEmail()
      } else if (stepOneComplete) {
        // await setSubmitType('order')
        setStepActive(2)
      } else {
        errorAlert('Please fill your complete details to continue', 'error')
      }
    }
    if (stepActive === 2) {
      if (
        checkPostCodeReq?.postcode === values?.postcode &&
        checkPostCodeReq?.is_checked === true
      ) {
        if (isPostcodeValid === 404) {
          errorAlert(
            'Urbanserve is not available at the selected location!',
            'error',
          )
        } else if (stepTwoComplete && isPostcodeValid !== 404) {
          setStepActive(3)
        } else {
          errorAlert('Please select valid address to continue', 'error')
        }
      } else {
        errorAlert('Please select valid address to continue', 'error')
      }
    }
    if (stepActive === 3) {
      if (
        stepThreeComplete &&
        Object.keys(errors).length === 0 &&
        selectedCustomerDatesValid === true
      ) {
        onSubmit()
      } else {
        errorAlert('Please select all the required fields to continue', 'error')
      }
    }
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        handleEnterPress(event)
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [
    stepOneComplete,
    stepTwoComplete,
    stepThreeComplete,
    isPostcodeValid,
    checkPostCodeReq,
    customerExists,
    submitType,
    values,
    isCustomerVerified,
    stepActive,
  ])

  useEffect(() => {
    if (customerExists && !loggedIn) {
      setSubmitType('login')
    } else if (customerExists && loggedIn) {
      setSubmitType('order')
    } else {
      setSubmitType('order')
    }
  }, [customerExists, loggedIn])

  return (
    <>
      <HelmetComponent
        title="UrbanServe | Checkout"
        ogTitle="UrbanServe | Checkout"
        description="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogDescription="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogUrl={link}
        createJsonLD={false}
        showNoFollow={true}
      />
      {isPageLoading ? (
        <div style={{height: '50vh', display: 'flex', alignItems: 'center'}}>
          <Loader active inline="centered" />
        </div>
      ) : productExists ? (
        <>
          <SiteMainNavbarV2 />
          {isBookingService ? (
            <div
              style={{height: '50vh', display: 'flex', alignItems: 'center'}}
            >
              <Loader active inline="centered" />
            </div>
          ) : (
            <>
              {/* Stepper Starts */}
              {productDetails?.addon_next_step ? (
                <Stepper
                  activeStep={
                    addOrderSuccessData?.id === undefined ? ['book'] : ['pay']
                  }
                  completeStep={
                    addOrderSuccessData?.id === undefined
                      ? ['confirm', 'addon']
                      : ['confirm', 'addon', 'book']
                  }
                  showAddon={true}
                />
              ) : (
                <Stepper
                  activeStep={
                    addOrderSuccessData?.id === undefined ? ['book'] : ['pay']
                  }
                  completeStep={
                    addOrderSuccessData?.id === undefined
                      ? ['confirm']
                      : ['confirm', 'book']
                  }
                  showAddon={false}
                />
              )}
              {/* Stepper Ends */}

              <div
                className=" site__checkout"
                style={{backgroundColor: 'rgba(247, 249, 251, 1)'}}
              >
                {/* Section Details Start*/}
                <section className="cout__details__wrapper">
                  <div className="cout__details__container site_xl_container">
                    <Grid className="details__grid">
                      <Grid.Column
                        className="details__col__one"
                        mobile={16}
                        tablet={10}
                        computer={10}
                      >
                        {/* Step one form */}
                        {stepActive === 1 && (
                          <div className="details__content">
                            <h4>
                              1 <span>Your Details</span>
                            </h4>
                            <div className="details__card">
                              <Grid
                                doubling
                                columns={2}
                                className="details__card__grid"
                              >
                                <Grid.Column className="details__card__col">
                                  <TextField
                                    id="outlined-basic"
                                    size="small"
                                    label="Email*"
                                    disabled={loggedIn}
                                    value={values?.email}
                                    {...getFieldProps('email')}
                                    helperText={touched.email && errors.email}
                                    error={!!(touched.email && errors.email)}
                                  />
                                  {customerExists &&
                                    !loggedIn &&
                                    !isValidatingCustomer &&
                                    isCustomerVerified && (
                                      <div>
                                        <p className={classes.existText}>
                                          You already have an account with us.
                                          Please login to continue!
                                        </p>
                                      </div>
                                    )}
                                  {!isCustomerVerified && customerExists && (
                                    <div>
                                      <p className={classes.existText}>
                                        Your email is not verified. Please
                                        verify your email to continue!
                                      </p>
                                    </div>
                                  )}
                                  {isValidatingCustomer && (
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        margin: '0.5rem 0rem',
                                      }}
                                    >
                                      <Loader active inline />
                                      <span className={classes.loaderText}>
                                        Validating email, please wait!
                                      </span>
                                    </div>
                                  )}
                                </Grid.Column>
                                {customerExists &&
                                  !loggedIn &&
                                  isCustomerVerified && (
                                    <>
                                      <Grid.Column className="details__card__col col__mbl__mt">
                                        <TextField
                                          id="outlined-basic"
                                          label="Password*"
                                          size="small"
                                          type={show ? 'text' : 'password'}
                                          value={values?.password}
                                          {...getFieldProps('password')}
                                          helperText={
                                            touched.password && errors.password
                                          }
                                          error={
                                            !!(
                                              touched.password &&
                                              errors.password
                                            )
                                          }
                                          InputProps={{
                                            endAdornment: (
                                              <InputAdornment>
                                                {show ? (
                                                  <VisibilityIcon
                                                    onClick={() =>
                                                      setShow(false)
                                                    }
                                                  />
                                                ) : (
                                                  <VisibilityOffIcon
                                                    onClick={() =>
                                                      setShow(true)
                                                    }
                                                  />
                                                )}
                                              </InputAdornment>
                                            ),
                                          }}
                                        />
                                      </Grid.Column>
                                      <Grid.Column className="details__card__col col__mbl__mt">
                                        <form
                                          onSubmit={handleSubmit}
                                          style={{width: '100%'}}
                                        >
                                          <Button
                                            type="submit"
                                            className="checkout__lgo__btn"
                                            onClick={() =>
                                              setSubmitType('login')
                                            }
                                          >
                                            Login
                                          </Button>
                                        </form>
                                      </Grid.Column>
                                    </>
                                  )}
                                {!customerExists && !loggedIn && (
                                  <>
                                    <Grid.Column className="details__card__col col__mbl__mt">
                                      {/* <label className="card__lable">Name</label> */}
                                      <TextField
                                        id="outlined-basic"
                                        size="small"
                                        value={values?.name}
                                        label="Name*"
                                        {...getFieldProps('name')}
                                        helperText={touched.name && errors.name}
                                        error={!!(touched.name && errors.name)}
                                      />
                                    </Grid.Column>
                                    <Grid.Column className="details__card__col col__mbl__mt col__tbl__mt">
                                      {/* <label className="card__lable">
                                  Mobile Number
                                </label> */}
                                      <TextField
                                        id="outlined-basic"
                                        size="small"
                                        label="Mobile Number*"
                                        value={values?.mobileno}
                                        {...getFieldProps('mobileno')}
                                        helperText={
                                          touched.mobileno && errors.mobileno
                                        }
                                        error={
                                          !!(
                                            touched.mobileno && errors.mobileno
                                          )
                                        }
                                      />
                                    </Grid.Column>
                                    <Grid.Column className="details__card__col col__mbl__mt col__tbl__mt">
                                      {/* <label className="card__lable">
                                  Telephone Number
                                </label> */}
                                      <TextField
                                        id="outlined-basic"
                                        // variant="outlined"
                                        size="small"
                                        // classes={{
                                        //   root: classes.customInput,
                                        // }}
                                        label="Telephone Number"
                                        value={values?.telephoneno}
                                        onChange={(e) => {
                                          setValues({
                                            ...values,
                                            telephoneno: e?.target?.value,
                                          })
                                        }}
                                      />
                                    </Grid.Column>
                                    <div className="details__card__radio">
                                      <p className="form__radio__lable">
                                        Are you?
                                      </p>
                                      <div>
                                        <FormControlLabel
                                          value="Home Owner"
                                          control={<Radio />}
                                          label="Home Owner"
                                          labelPlacement="Home Owner"
                                          classes={{
                                            root: classes.customRadio,
                                          }}
                                          checked={
                                            values?.customer_type ===
                                            'Home Owner'
                                          }
                                          onChange={(e) => {
                                            if (e?.target?.checked) {
                                              setValues({
                                                ...values,
                                                customer_type: e?.target?.value,
                                              })
                                            }
                                          }}
                                        />
                                        <FormControlLabel
                                          value="Tenant"
                                          control={<Radio />}
                                          label="Tenant"
                                          labelPlacement="Tenant"
                                          classes={{
                                            root: classes.customRadio,
                                          }}
                                          checked={
                                            values?.customer_type === 'Tenant'
                                          }
                                          onChange={(e) => {
                                            if (e?.target?.checked) {
                                              setValues({
                                                ...values,
                                                customer_type: e?.target?.value,
                                              })
                                            }
                                          }}
                                        />
                                        <FormControlLabel
                                          value="Landlord"
                                          control={<Radio />}
                                          label="Landlord"
                                          labelPlacement="Landlord"
                                          classes={{
                                            root: classes.customRadio,
                                          }}
                                          checked={
                                            values?.customer_type === 'Landlord'
                                          }
                                          onChange={(e) => {
                                            if (e?.target?.checked) {
                                              setValues({
                                                ...values,
                                                customer_type: e?.target?.value,
                                              })
                                            }
                                          }}
                                        />
                                      </div>
                                      {touched.customer_type &&
                                      errors.customer_type ? (
                                        <FormHelperText
                                          error={!!errors.customer_type}
                                          className={classes.errorText}
                                        >
                                          Please select any one!
                                        </FormHelperText>
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                  </>
                                )}

                                {!isCustomerVerified && customerExists && (
                                  <>
                                    <Grid.Column className="details__card__col"></Grid.Column>
                                    <Grid.Column className="details__card__col col__mbl__mt">
                                      <Button
                                        className="checkout__lgo__btn"
                                        onClick={() => handleSendEmail()}
                                      >
                                        Resend Verify Link
                                      </Button>
                                    </Grid.Column>
                                  </>
                                )}
                              </Grid>
                            </div>
                          </div>
                        )}
                        {/* Step one btn handler */}
                        {stepActive === 1 && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Button
                              fluid
                              onClick={() =>
                                stepOneComplete && setStepActive(2)
                              }
                              className={
                                stepOneComplete
                                  ? 'form__next__btn form__next__dnone form__next__dnonemb'
                                  : 'form__next__btn__disabled form__next__dnone form__next__dnonemb'
                              }
                            >
                              Next
                              <img
                                width="100%"
                                src={
                                  stepOneComplete
                                    ? '/site__main__images/site__chevron__right__light.png'
                                    : ' /site__main__images/site__chevron__right__grey.png'
                                }
                              />
                            </Button>
                          </div>
                        )}
                        {/* Step one editor */}
                        {!isAddOrderSuccess &&
                          stepOneComplete &&
                          stepActive !== 1 && (
                            <>
                              <div className="details__edit">
                                <div className="details__edit__header">
                                  <img
                                    width="100%"
                                    src="/site__main__images/site__check__dark.png"
                                  />
                                  <h3>Your Details</h3>
                                </div>
                                <div className="details__edit__info">
                                  <p>
                                    {values?.name} - {values?.mobileno}
                                  </p>
                                </div>
                                <img
                                  className="details__edit__icon"
                                  width="100%"
                                  src="/site__main__images/site__edit.png"
                                  onClick={() => {
                                    setStepActive(1)
                                  }}
                                />
                              </div>
                              {loggedIn && (
                                <div className="details__logout">
                                  <Button
                                    fluid
                                    onClick={() => Logout()}
                                    className={'details__logout__btn'}
                                  >
                                    Logout
                                  </Button>
                                </div>
                              )}
                            </>
                          )}
                        {/* Step one indicator */}
                        {!stepTwoComplete &&
                          stepActive === 1 &&
                          !stepActive !== 2 && (
                            <div className="disabled__header">
                              <h3>
                                {' '}
                                <span>2</span>Booking Address
                              </h3>
                            </div>
                          )}
                        {/* Step two form */}
                        {stepActive === 2 && (
                          <div className="details__content">
                            <h4>
                              2 <span>Booking Address </span>
                              {loggedIn && (
                                <span style={{marginLeft: 'auto'}}>
                                  <Button
                                    className="address__tb__btn"
                                    onClick={() =>
                                      setAddresssAddModalOpen(
                                        !addressAddModalOpen,
                                      )
                                    }
                                  >
                                    + Add Address
                                  </Button>
                                </span>
                              )}
                            </h4>

                            {loggedIn ? (
                              <div className="details__address">
                                <Button
                                  className="details__address__btn"
                                  onClick={() =>
                                    setAddresssAddModalOpen(
                                      !addressAddModalOpen,
                                    )
                                  }
                                >
                                  Add Address
                                </Button>
                                {isFetchingCustomerAddress ? (
                                  <Loader active inline="centered" />
                                ) : (
                                  <div className="details__address__flex">
                                    {customerAddress?.length > 0
                                      ? customerAddress?.map((address) => (
                                          <>
                                            <div className="details__address__card">
                                              <div className="details__card__content">
                                                <div
                                                  className={classes.cardToggle}
                                                >
                                                  <Radio
                                                    // disabled={showPayment}
                                                    checked={
                                                      selectedAddress?.id ===
                                                      address?.id
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={() => {
                                                      setSelectedAddress(
                                                        address,
                                                      )
                                                    }}
                                                  />
                                                  <div>
                                                    <Card.Header>
                                                      {address?.city
                                                        ? address?.city
                                                        : '~'}
                                                    </Card.Header>
                                                    <Card.Meta>
                                                      {address?.postcode
                                                        ? address?.postcode
                                                        : '~'}
                                                    </Card.Meta>
                                                    <Card.Description>
                                                      {`
                                                         ${
                                                           address?.houseno !==
                                                             null &&
                                                           address?.houseno !==
                                                             undefined
                                                             ? address?.houseno
                                                             : ''
                                                         } 
                                                         ${
                                                           address?.address_1 !==
                                                             null &&
                                                           address?.address_1 !==
                                                             undefined
                                                             ? address?.address_1
                                                             : ''
                                                         }  
                                           `}
                                                    </Card.Description>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="details__card__footer">
                                                <div
                                                  className="details__btn"
                                                  onClick={() => {
                                                    setAddresssModalOpen(
                                                      !addressModalOpen,
                                                    )
                                                    setCurrentAddress(address)
                                                  }}
                                                >
                                                  Edit
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ))
                                      : 'No Address(s) Found'}
                                  </div>
                                )}
                                {isValidatingPostcode && (
                                  <div className="error__postcode error__loader">
                                    <Loader active inline />
                                    <span className={classes.loaderText}>
                                      Validating postcode, please wait!
                                    </span>
                                  </div>
                                )}
                                {values?.postcode &&
                                  !isValidatingPostcode &&
                                  isPostcodeValid === 404 && (
                                    <p
                                      className="error__text error__postcode"
                                      style={{paddingTop: '0.3rem'}}
                                    >
                                      The selected service is not available in
                                      this location!
                                    </p>
                                  )}
                              </div>
                            ) : (
                              <div className="details__card">
                                <Grid
                                  columns={1}
                                  className="details__card__full__grid details__card__full__grid__add"
                                >
                                  <Grid.Column
                                    className="details__card__full__col"
                                    style={{
                                      paddingBottom: '0rem !important',
                                      zIndex: 10,
                                    }}
                                  >
                                    <div>
                                      {/* <input
                                        value={value}
                                        onChange={handleInput}
                                        disabled={!ready}
                                        placeholder={`Address Line One`}
                                        className="standard__input"
                                      /> */}
                                      <TextField
                                        id="standard-basic"
                                        value={value}
                                        onChange={handleInput}
                                        disabled={!ready}
                                        label="Address Line One"
                                        style={{width: '100%'}}
                                        InputProps={{
                                          endAdornment: value && (
                                            <InputAdornment position="start">
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                  clearAddressInput()
                                                }
                                              >
                                                {<ClearIcon />}
                                              </IconButton>
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                      {status === 'OK' && (
                                        <div className="">
                                          <ul>{renderSuggestions()}</ul>
                                        </div>
                                      )}
                                    </div>
                                  </Grid.Column>
                                </Grid>
                                <Grid
                                  doubling
                                  columns={2}
                                  className="booking__card__grid"
                                >
                                  <Grid.Column className="booking__card__grid__col col__mbl__mt col__tbl__mt">
                                    {/* <label className="card__lable">
                              Address Line two
                            </label> */}
                                    <TextField
                                      id="outlined-basic"
                                      // variant="outlined"
                                      size="small"
                                      // classes={{
                                      //   root: classes.customInput,
                                      // }}
                                      label="Address line two"
                                      // key={values?.address_2}
                                      value={values?.address_2}
                                      {...getFieldProps('address_2')}
                                      helperText={
                                        touched.address_2 && errors.address_2
                                      }
                                      error={
                                        !!(
                                          touched.address_2 && errors.address_2
                                        )
                                      }
                                    />
                                  </Grid.Column>
                                  <Grid.Column className="booking__card__grid__col col__mbl__mt col__tbl__mt">
                                    {/* <label className="card__lable">
                              Address Line three
                            </label> */}
                                    <TextField
                                      id="outlined-basic"
                                      // variant="outlined"
                                      size="small"
                                      label="Address line three"
                                      // classes={{
                                      //   root: classes.customInput,
                                      // }}
                                      // key={values?.address_3}
                                      value={values?.address_3}
                                      {...getFieldProps('address_3')}
                                      helperText={
                                        touched.address_3 && errors.address_3
                                      }
                                      error={
                                        !!(
                                          touched.address_3 && errors.address_3
                                        )
                                      }
                                    />
                                  </Grid.Column>
                                  <Grid.Column className="booking__card__grid__col col__mbl__mt col__tbl__mt">
                                    {/* <label className="card__lable">City/Town</label> */}
                                    <TextField
                                      id="outlined-basic"
                                      // variant="outlined"
                                      size="small"
                                      // classes={{
                                      //   root: classes.customInput,
                                      // }}
                                      // key={values?.city}
                                      label="City/Town*"
                                      value={values?.city}
                                      {...getFieldProps('city')}
                                      helperText={touched.city && errors.city}
                                      error={!!(touched.city && errors.city)}
                                    />
                                  </Grid.Column>
                                  <Grid.Column className="booking__card__grid__col col__mbl__mt col__tbl__mt">
                                    {/* <label className="card__lable">County</label> */}
                                    <TextField
                                      id="outlined-basic"
                                      // variant="outlined"
                                      size="small"
                                      // classes={{
                                      //   root: classes.customInput,
                                      // }}
                                      // key={values?.address_4}
                                      label="County"
                                      value={values?.address_4}
                                      {...getFieldProps('address_4')}
                                      helperText={
                                        touched.address_4 && errors.address_4
                                      }
                                      error={
                                        !!(
                                          touched.address_4 && errors.address_4
                                        )
                                      }
                                    />
                                  </Grid.Column>
                                  <Grid.Column className="booking__card__grid__col col__mbl__mt col__tbl__mt">
                                    {/* <label className="card__lable">Postcode</label> */}
                                    <TextField
                                      id="outlined-basic"
                                      // variant="outlined"
                                      size="small"
                                      // classes={{
                                      //   root: classes.customInput,
                                      // }}
                                      label="Postcode*"
                                      value={values?.postcode}
                                      {...getFieldProps('postcode')}
                                      helperText={
                                        touched.postcode && errors.postcode
                                      }
                                      error={
                                        !!(touched.postcode && errors.postcode)
                                      }
                                    />
                                    {isValidatingPostcode && (
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          margin: '0.5rem 0rem',
                                        }}
                                      >
                                        <Loader active inline />
                                        <span className={classes.loaderText}>
                                          Validating postcode, please wait!
                                        </span>
                                      </div>
                                    )}
                                    {values?.postcode &&
                                      isPostcodeValid === 404 && (
                                        <p
                                          className={classes.errorText}
                                          style={{paddingTop: '0.3rem'}}
                                        >
                                          The selected service is not available
                                          in this location!
                                        </p>
                                      )}
                                  </Grid.Column>
                                </Grid>
                              </div>
                            )}
                          </div>
                        )}
                        {/* Step two btn handler */}
                        {stepActive === 2 && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Button
                              disabled={isPostcodeValid === 404 ? true : false}
                              fluid
                              onClick={() =>
                                stepTwoComplete && setStepActive(3)
                              }
                              className={
                                stepTwoComplete
                                  ? 'form__next__btn form__next__dnone'
                                  : 'form__next__btn__disabled form__next__dnone'
                              }
                            >
                              Next
                              <img
                                width="100%"
                                src={
                                  stepTwoComplete
                                    ? '/site__main__images/site__chevron__right__light.png'
                                    : ' /site__main__images/site__chevron__right__grey.png'
                                }
                              />
                            </Button>
                          </div>
                        )}
                        {/* Step two editor */}
                        {!isAddOrderSuccess &&
                          stepTwoComplete &&
                          stepActive !== 2 && (
                            <div className="details__edit">
                              <div className="details__edit__header">
                                <img
                                  width="100%"
                                  src="/site__main__images/site__check__dark.png"
                                />
                                <h3>Booking Address</h3>
                              </div>
                              <div className="details__edit__info">
                                <p>
                                  {values?.address_1} - {values?.postcode}
                                </p>
                              </div>
                              <img
                                className="details__edit__icon"
                                width="100%"
                                src="/site__main__images/site__edit.png"
                                onClick={() => {
                                  setStepActive(2)
                                }}
                              />
                            </div>
                          )}
                        {/* Step two indicator */}
                        {!stepThreeComplete &&
                          (stepActive === 1 || stepActive === 2) &&
                          stepActive !== 3 && (
                            <div className="disabled__header">
                              <h3>
                                {' '}
                                <span>3</span>Preferred Dates
                              </h3>
                            </div>
                          )}

                        {/* Step three form */}
                        {stepActive === 3 && (
                          <div className="details__content">
                            <h4>
                              3 <span>Preffered Dates</span>{' '}
                              <img
                                src="/site__main__images/info_icon.png"
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  border: '1px solid #d1d1d1',
                                  margin: '8px 10px 0',
                                }}
                              />
                              <span
                                style={{
                                  fontSize: '14px',
                                  margin: '10px 0px 0px',
                                }}
                              >
                                You can select upto 3 preferred dates &
                                timeslots.
                              </span>
                            </h4>
                            <div className="details__card date__card">
                              <div style={{padding: '0rem 2rem'}}>
                                <Slider {...settings}>
                                  {calenderDates?.length > 0 &&
                                    calenderDates.map((date) => (
                                      <div className="custom_calender_item">
                                        <div
                                          className={renderDateStyle(
                                            date?.date,
                                          )}
                                          onClick={() =>
                                            !isDateCurrentDate(date?.date) &&
                                            !isDateBufferDate(date?.date) &&
                                            handleDateSelect(date)
                                          }
                                        >
                                          <p className="calender_header">
                                            {date?.stringDate}
                                          </p>
                                          <p className="calender_subheader">
                                            {getSlotData(date) !== null
                                              ? getSlotData(date) +
                                                ' Slot(s) Available'
                                              : `${currentMaxJobData?.max_jod_per_day} Slot(s) Available`}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                </Slider>
                              </div>
                              <div className="calender_selection">
                                {selectedCustomerDates?.length > 0 &&
                                  selectedCustomerDates?.map((ele, i) => (
                                    <div className="calender_date_box">
                                      <p className="calender_date_title">
                                        {moment(ele?.date).format('MMMM Do')}
                                      </p>
                                      <div className="calender_date_slot">
                                        {['AM', 'PM', 'FULLDAY']?.map(
                                          (slot) => (
                                            <div
                                              className={
                                                ele?.slot === slot
                                                  ? 'calender_date_slot_box_selected'
                                                  : 'calender_date_slot_box'
                                              }
                                              onClick={() =>
                                                handleSlotChange(slot, i)
                                              }
                                            >
                                              <span>
                                                {slot == 'FULLDAY'
                                                  ? 'Full Day'
                                                  : slot}
                                              </span>
                                            </div>
                                          ),
                                        )}
                                      </div>

                                      <img
                                        style={{
                                          width: '14px',
                                          height: '14px',
                                          marginLeft: '10px',
                                          cursor: 'pointer',
                                        }}
                                        src="/site__main__images/site__close__red.png"
                                        alt="Urbanserve Icon"
                                        onClick={() => handleDateRemove(ele, i)}
                                      />
                                    </div>
                                  ))}
                              </div>
                              {selectedCustomerDatesValid !== null &&
                                !selectedCustomerDatesValid && (
                                  <p
                                    className="error__text"
                                    style={{paddingTop: '0.3rem'}}
                                  >
                                    Please select slots for selected preferred
                                    date(s)!
                                  </p>
                                )}

                              <Grid.Column className="booking__card__grid__col col__mbl__mt col__tbl__mt">
                                <div className="checkbox__content">
                                  <Checkbox
                                    checked={
                                      values?.term_accept === true
                                        ? true
                                        : false
                                    }
                                    onChange={() =>
                                      setValues({
                                        ...values,
                                        term_accept: !values?.term_accept,
                                      })
                                    }
                                    label="Terms and Conditions"
                                    error={
                                      !!(
                                        touched.term_accept &&
                                        errors.term_accept
                                      )
                                    }
                                    touched={
                                      !!(
                                        touched.term_accept &&
                                        errors.term_accept
                                      )
                                    }
                                    className="fieldMd"
                                  />
                                  <a
                                    style={{
                                      textDecoration: 'none',
                                      color: '#0587FF',
                                      fontFamily: 'Urbanist-Medium',
                                    }}
                                    target="_blank"
                                    href={`${cartData?.[0]?.product?.t_n_c_file_id?.file_path}`}
                                  >
                                    <i>Click here to download!</i>
                                  </a>
                                </div>
                                {touched.term_accept && errors.term_accept ? (
                                  <FormHelperText
                                    error={!!errors.term_accept}
                                    style={{
                                      textAlign: 'left',
                                      padding: '10px 0px',
                                      display: 'block',
                                    }}
                                  >
                                    Please accept terms to continue!
                                  </FormHelperText>
                                ) : (
                                  ''
                                )}
                              </Grid.Column>
                            </div>
                          </div>
                        )}
                        {/* Step three btn handler */}
                        {stepActive === 3 && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <form onSubmit={handleSubmit}>
                              <Button
                                fluid
                                type="submit"
                                onClick={() => {
                                  if (
                                    Object.keys(errors).length === 0 &&
                                    stepThreeComplete &&
                                    selectedCustomerDatesValid === true
                                  ) {
                                    setSubmitType('order')
                                  }
                                }}
                                className={
                                  Object.keys(errors).length === 0 &&
                                  stepThreeComplete &&
                                  selectedCustomerDatesValid === true
                                    ? 'form__next__btn form__next__dnone form__next__btn__wdth'
                                    : 'form__next__btn__disabled form__next__dnone form__next__btn__wdth'
                                }
                              >
                                {loggedIn ? 'Order & Pay' : 'Register & Pay'}
                                <img
                                  width="100%"
                                  src={
                                    Object.keys(errors).length === 0 &&
                                    stepThreeComplete &&
                                    selectedCustomerDatesValid === true
                                      ? '/site__main__images/site__chevron__right__light.png'
                                      : ' /site__main__images/site__chevron__right__grey.png'
                                  }
                                />
                              </Button>
                            </form>
                          </div>
                        )}
                        {/* Step three editor */}
                        {!isAddOrderSuccess &&
                          stepThreeComplete &&
                          stepActive !== 3 && (
                            <div className="details__edit">
                              <div className="details__edit__header">
                                <img
                                  width="100%"
                                  src="/site__main__images/site__check__dark.png"
                                />
                                <h3>Preferred Dates</h3>
                              </div>
                              <div className="details__edit__info">
                                {values?.customer_job_scheduler?.length > 0 && (
                                  <p>
                                    {
                                      values?.customer_job_scheduler?.[0]
                                        ?.preffered_date
                                    }
                                  </p>
                                )}
                              </div>
                              <img
                                className="details__edit__icon"
                                width="100%"
                                src="/site__main__images/site__edit.png"
                                onClick={() => {
                                  setStepActive(3)
                                }}
                              />
                            </div>
                          )}
                        {/* Step three indicator */}
                        {!stepFourComplete &&
                          (stepActive === 1 ||
                            stepActive === 2 ||
                            stepActive === 3) &&
                          stepActive !== 4 && (
                            <div className="disabled__header">
                              <h3>
                                {' '}
                                <span>4</span>Payment Details
                              </h3>
                            </div>
                          )}
                        {/* Step three form */}
                        {stepActive === 4 && (
                          <>
                            <div className="details__content">
                              <h4>
                                4 <span>Payment Details</span>
                              </h4>
                              {loggedIn ? (
                                <div className="details__address">
                                  {isFetchingCardDetails ? (
                                    <Loader active inline="centered" />
                                  ) : (
                                    <>
                                      {loggedIn && showCard && (
                                        <div className="details__card__add">
                                          <h5>Add new card</h5>
                                          <div className="details__card__add__card">
                                            <Elements stripe={stripePromise}>
                                              <AddNewCard ref={addCardRef} />
                                            </Elements>
                                          </div>
                                          <Button
                                            className={
                                              'add__card__btn form__next__dnone'
                                            }
                                            onClick={() =>
                                              addCardRef?.current?.addCardHandle()
                                            }
                                          >
                                            <img
                                              width="100%"
                                              src={'/site__icons/icon__pay.png'}
                                            />
                                            Add Card
                                          </Button>
                                        </div>
                                      )}
                                      {loggedIn &&
                                        showCard &&
                                        cardDetails?.length > 0 && (
                                          <h3 className="details__card__header">
                                            Select card to make payment!
                                          </h3>
                                        )}
                                      <div className="details__address__flex">
                                        {cardDetails?.length > 0 ? (
                                          cardDetails?.map((ele) => (
                                            <>
                                              <div className="details__address__card">
                                                <div className="details__card__content">
                                                  <div
                                                    className={
                                                      classes.cardToggle
                                                    }
                                                  >
                                                    <Checkbox
                                                      checked={
                                                        selectedPaymentMethod?.id ==
                                                        ele.id
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={(e) =>
                                                        setSelectedPaymentMethod(
                                                          ele,
                                                        )
                                                      }
                                                      style={{
                                                        marginRight: 12,
                                                      }}
                                                    />
                                                    <div>
                                                      <Card.Header>
                                                        {ele?.brand ?? `~`}
                                                      </Card.Header>
                                                      <Card.Meta>
                                                        xxxx xxxx xxxx{' '}
                                                        {ele.last4}
                                                      </Card.Meta>
                                                      <Card.Description>
                                                        {ele.exp_month} /{' '}
                                                        {ele.exp_year}
                                                      </Card.Description>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          ))
                                        ) : (
                                          <h3 className="details__card__empty">
                                            No existing card(s) found. Please
                                            add card details to make payment!
                                          </h3>
                                        )}
                                      </div>
                                      {loggedIn && (
                                        <Button
                                          className={
                                            'add__card__btn form__next__dnone btn__tab'
                                          }
                                          style={{
                                            backgroundColor: selectedPaymentMethod
                                              ? '#4a00e0'
                                              : 'rgba(233, 233, 234, 1)',
                                          }}
                                          onClick={() =>
                                            existingCardRef?.current?.payCardHandle()
                                          }
                                        >
                                          <img
                                            width="100%"
                                            src={'/site__icons/icon__pay.png'}
                                          />
                                          {addOrderSuccessData?.is_recurring
                                            ? 'Subscribe'
                                            : 'Pay'}
                                        </Button>
                                      )}
                                      {loggedIn &&
                                        showCard &&
                                        selectedPaymentMethod?.id !==
                                          undefined && (
                                          <Grid item xs={12}>
                                            <Elements stripe={stripePromise}>
                                              <PayViaCard
                                                ref={existingCardRef}
                                              />
                                            </Elements>
                                          </Grid>
                                        )}
                                    </>
                                  )}
                                </div>
                              ) : (
                                <div className="details__card">
                                  <Grid
                                    doubling
                                    columns={1}
                                    className="details__card__full__grid details__card__full__grid__pb"
                                  >
                                    <Grid.Column className="details__card__full__col">
                                      {isCreatingPayment ? (
                                        <div
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '0.5rem 0rem',
                                          }}
                                        >
                                          <Loader active inline />
                                          <span className={classes.loaderText}>
                                            Payment in progress, Please wait!
                                          </span>
                                        </div>
                                      ) : (
                                        <>
                                          {!loggedIn && (
                                            <>
                                              <label
                                                className="card__lable"
                                                style={{
                                                  marginBottom: '1.5rem',
                                                }}
                                              >
                                                Enter Card Details
                                              </label>
                                              <Elements stripe={stripePromise}>
                                                <CheckoutForm
                                                  ref={childRef}
                                                  style={{
                                                    paddingBottom: '0.798rem',
                                                  }}
                                                />
                                              </Elements>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </Grid.Column>
                                  </Grid>
                                </div>
                              )}
                            </div>
                            {!loggedIn && (
                              <Button
                                className={'pay__btn form__next__dnone'}
                                onClick={() => childRef?.current?.getAlert()}
                              >
                                <img
                                  width="100%"
                                  src={'/site__icons/icon__pay.png'}
                                />
                                Pay
                              </Button>
                            )}
                          </>
                        )}
                      </Grid.Column>
                      <Grid.Column
                        className="details__col__two"
                        mobile={16}
                        tablet={6}
                        computer={6}
                        style={{paddingBottom: '2rem'}}
                      >
                        <div className="details__col__two__header">
                          <h4>Booking Summary</h4>
                        </div>
                        {/* Header */}

                        <div
                          style={{
                            backgroundColor: '#fff',
                            border: '1px solid #E9E9E9',
                            boxShadow: '4px 4px 4px rgba(219, 229, 239, 0.25)',
                          }}
                        >
                          {!cartData?.[0]?.is_product_applicable && (
                            <>
                              <div
                                className={`${classes.drawer__header} ${classes.drawerPD}`}
                              >
                                <div className={classes.drawer__info}>
                                  {productDetails?.product_image ? (
                                    <img
                                      src={
                                        productDetails?.product_image?.type ===
                                        'public'
                                          ? `${productDetails?.product_image?.file_path}`
                                          : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${productDetails?.product_image?.id}/show-file`
                                      }
                                      className={classes.drawer__img}
                                      alt={productDetails?.title}
                                      style={{objectFit: 'cover'}}
                                    />
                                  ) : (
                                    <img
                                      alt="Urbanserve Icon"
                                      src="/site__main__images/product__image.png"
                                      className={classes.drawer__img}
                                    />
                                  )}
                                  <h1 className={classes.summary__title}>
                                    {productDetails?.title}
                                  </h1>
                                </div>
                              </div>
                              <div className={classes.drawer__divider}></div>
                            </>
                          )}

                          {/* Product offering title */}
                          {productSelected &&
                            cartData?.[0]?.is_product_applicable && (
                              <div className={classes.productItem}>
                                <div className={classes.productItemLeft}>
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${productSelected?.product_offering_image?.[0]?.file?.id}`}
                                    alt="Urbanserve"
                                    width="100%"
                                    className={classes.drawer__img}
                                  />
                                  <h2 className={classes.pkgItemTitle}>
                                    {productSelected?.title}
                                  </h2>
                                </div>
                                <h3 className={classes.pkgItemPrice}>
                                  £{productSelected?.price}
                                </h3>
                              </div>
                            )}

                          {/* Product infor */}
                          {showSpecificContent && (
                            <div
                              className={`${classes.drawer__product} ${classes.drawerPD}`}
                            >
                              <div>
                                <div className={classes.drawer__btn__section}>
                                  <p className={classes.summary__info}>
                                    {recurringType}
                                  </p>
                                  {recurringType !== 'One Off' && (
                                    <Button
                                      className={`${classes.drawer__product} drawer__btn`}
                                    >
                                      Subscription
                                    </Button>
                                  )}
                                </div>
                                {recurringType !== 'One Off' && (
                                  <p className={classes.product__text}>
                                    You can cancel subcription after{' '}
                                    {recurringPeriod} visits
                                  </p>
                                )}
                              </div>
                              <p className={classes.summary__price}>
                                £{cartData?.[0]?.quote_qa_grant_total}
                              </p>
                            </div>
                          )}
                          {/* Package Builder */}
                          {packagesSelected?.length > 0 &&
                            packagesSelected?.map((ele) => (
                              <div className={classes.pkgItemParent}>
                                <h2
                                  className={classes.pkgItemTitle}
                                  style={{padding: '10px 0px 0px 0px'}}
                                >
                                  {ele?.title}
                                </h2>
                                {ele?.packages?.length > 0 &&
                                  ele?.packages?.map((data) => (
                                    <div className={classes.pkgItem}>
                                      <div className={classes.pkgItemLeft}>
                                        <div>
                                          <h2 className={classes.pkgItemTitle}>
                                            {data?.quantity_applicate
                                              ? `${data?.quantity} x ${data?.title}`
                                              : `${data?.title}`}
                                          </h2>
                                          {data?.description && (
                                            <p
                                              className={'pkgItemDesc'}
                                              dangerouslySetInnerHTML={{
                                                __html: data?.description,
                                              }}
                                            ></p>
                                          )}
                                        </div>
                                        <h2 className={classes.pkgItemPrice}>
                                          £
                                          {data?.quantity_applicate
                                            ? `${data?.total_price?.toFixed(
                                                0,
                                              )} `
                                            : `${parseInt(data?.price)}`}
                                        </h2>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ))}

                          {/* Divider */}
                          {showSpecificContent && (
                            <div className={classes.drawer__divider}></div>
                          )}

                          {/* Product Addons */}
                          {addonSelected?.length > 0 &&
                            addonSelected?.map((addon) => (
                              <>
                                <div
                                  className={`${classes.drawer__addon} ${classes.drawerPD}`}
                                >
                                  {addon?.image !== null ? (
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${addon?.image?.id}`}
                                      alt="Urbanserve"
                                      width="100%"
                                      className={classes.drawer__img}
                                    />
                                  ) : (
                                    <img
                                      src="/site__main__images/site__addon.png"
                                      alt="Urbanserve"
                                      width="100%"
                                      className={classes.drawer__img}
                                    />
                                  )}
                                  <h4 className={classes.drawer__addon__title}>
                                    {addon?.quantity_applicable
                                      ? ` ${addon.quantity} x ${addon?.title}`
                                      : `${addon?.title}`}
                                  </h4>
                                  {showSpecificContent ? (
                                    <Button
                                      className={`${classes.drawer__product} drawer__btn`}
                                    >
                                      One off
                                    </Button>
                                  ) : (
                                    <h2
                                      className={classes.pkgItemPrice}
                                      style={{marginLeft: 'auto'}}
                                    >
                                      £
                                      {addon?.quantity_applicable
                                        ? addon?.quantity * addon?.price
                                        : `${addon?.price}`}
                                    </h2>
                                  )}
                                </div>
                                {showSpecificContent && (
                                  <div
                                    className={classes.drawer__divider}
                                  ></div>
                                )}
                                {showSpecificContent && (
                                  <div
                                    className={`${classes.drawer__flex} ${classes.drawerPD}`}
                                  >
                                    <div
                                      className={
                                        classes.drawer__addon__quantity
                                      }
                                    >
                                      <p className={classes.addon__quantity}>
                                        {addon?.quantity}
                                      </p>
                                      <img
                                        width="100%"
                                        src="/site__main__images/site__close.png"
                                        alt="Urbanserve"
                                        className={classes.quantity__img}
                                      />
                                      <p className={classes.addon__quantity}>
                                        £{addon?.price}
                                      </p>
                                    </div>
                                    <p className={classes.addon__price}>
                                      £{addon?.total}
                                    </p>
                                  </div>
                                )}
                                <div className={classes.drawer__divider}></div>
                              </>
                            ))}

                          {/* Included Items */}
                          {includedItems?.length > 0 &&
                            includedItems?.map(
                              (ele) =>
                                ele?.included && (
                                  <>
                                    <div
                                      className={`${classes.drawer__addon} ${classes.drawerPD}`}
                                    >
                                      <h4
                                        className={classes.drawer__addon__title}
                                      >
                                        {ele?.include_item_name ?? `~`}
                                      </h4>
                                      <h2
                                        className={classes.pkgItemPrice}
                                        style={{marginLeft: 'auto'}}
                                      >
                                        FREE
                                      </h2>
                                    </div>
                                    <div
                                      className={classes.drawer__divider}
                                    ></div>
                                  </>
                                ),
                            )}

                          {/* discount details */}
                          {discount_price > 0 && (
                            <div
                              className={`${classes.drawer__flex} ${classes.drawerPD}`}
                            >
                              <h3 className={classes.summary__discount__title}>
                                Discount
                              </h3>
                              <p className={classes.summary__discount__price}>
                                - £{discount_price}
                              </p>
                            </div>
                          )}

                          {/*  */}
                          {
                            <div
                              className={`${classes.drawer__footer} ${classes.drawerPD}`}
                            >
                              <h6 className={classes.summary__footer__title}>
                                Total:{' '}
                                <span
                                  className={classes.summary__footer__price}
                                >
                                  £
                                  {!showSpecificContent
                                    ? `${total_price}`
                                    : `${
                                        total_price !== NaN ? total_price : 'NA'
                                      }`}
                                </span>
                              </h6>
                              {showSpecificContent && (
                                <>
                                  <div
                                    className={`${classes.footer__content} ${classes.footer__mb}`}
                                  >
                                    <img
                                      width="100%"
                                      src="/site__main__images/icon__check.png"
                                      alt="Urbanserve"
                                      className={classes.footer__check}
                                    />
                                    <p className={classes.footer__text}>
                                      Pay in advance for first booking.
                                    </p>
                                  </div>
                                  <div className={classes.footer__content}>
                                    <img
                                      width="100%"
                                      src="/site__main__images/icon__check.png"
                                      alt="Urbanserve"
                                      className={classes.footer__check}
                                    />
                                    <p className={classes.footer__text}>
                                      {`£${
                                        total_price !== NaN
                                          ? total_price + addonsTotal
                                          : 'NA'
                                      } subscription will be colllected after consecutive booking completion`}
                                    </p>
                                  </div>
                                </>
                              )}
                              {/* <form onSubmit={handleSubmit} >
                                              <Button className="footer__btn" type="submit">
                                                  Book Now
                                              </Button>
                                          </form> */}
                            </div>
                          }
                        </div>
                      </Grid.Column>
                    </Grid>
                  </div>
                </section>
                {/* Section Details End*/}

                {/* <div className="site__next__btn__wrapper">
                      <Button className="site__next__btn">
                          Next
                          <img
                              width="100%"
                              src="/site__main__images/site__chevron__right__light.png"
                          />
                      </Button>
                  </div> */}
              </div>

              {/* Site Footer Start */}
              <div className="site_footer_pb">
                <SiteFooter />
              </div>
              {/* Site Footer End */}

              {/* Mobile Summary Drawer */}
              <Drawer
                open={isSummaryModalOpen}
                anchor="bottom"
                classes={{paper: classes.drawerPaper}}
                onClose={() => setSummaryModalOpen(false)}
              >
                {/* Product offering title */}
                {productSelected && cartData?.[0]?.is_product_applicable && (
                  <div className={classes.productItem}>
                    <div className={classes.productItemLeft}>
                      {productSelected?.product_offering_image?.[0]?.file ? (
                        <img
                          src={
                            productSelected?.product_offering_image?.[0]?.file
                              ?.type === 'public'
                              ? `${productSelected?.product_offering_image?.[0]?.file?.file_path}`
                              : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${productSelected?.product_offering_image?.[0]?.file?.id}/show-file`
                          }
                          alt="Urbanserve Icon"
                          width="100%"
                          className={classes.drawer__img}
                          style={{objectFit: 'cover'}}
                        />
                      ) : (
                        <img
                          src="/site__main__images/product__image.png"
                          alt="Urbanserve"
                          width="100%"
                          className={classes.drawer__img}
                        />
                      )}
                      <h2 className={classes.pkgItemTitle}>
                        {productSelected?.title}
                      </h2>
                    </div>
                    <h3 className={classes.pkgItemPrice}>
                      £{productSelected?.price}
                    </h3>
                    <img
                      width="100%"
                      src="/site__main__images/site__close.png"
                      alt="Urbanserve"
                      className={classes.drawer__close}
                      onClick={() => setSummaryModalOpen(false)}
                    />
                  </div>
                )}
                {!cartData?.[0]?.is_product_applicable && (
                  <>
                    <div
                      className={`${classes.drawer__header} ${classes.drawerPD}`}
                    >
                      <div className={classes.drawer__info}>
                        {productDetails?.product_image ? (
                          <img
                            src={
                              productDetails?.product_image?.type === 'public'
                                ? `${productDetails?.product_image?.file_path}`
                                : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${productDetails?.product_image?.id}/show-file`
                            }
                            className={classes.drawer__img}
                            alt="Urbanserve Icon"
                            style={{objectFit: 'cover'}}
                          />
                        ) : (
                          <img
                            alt="Urbanserve Icon"
                            src="/site__main__images/product__image.png"
                            className={classes.drawer__img}
                          />
                        )}
                        <h1 className={classes.drawer__title}>
                          {productDetails?.title}
                        </h1>
                      </div>
                      <img
                        width="100%"
                        src="/site__main__images/site__close.png"
                        alt="Urbanserve"
                        className={classes.drawer__close}
                        onClick={() => setSummaryModalOpen(false)}
                      />
                    </div>
                    <div className={classes.drawer__divider}></div>
                  </>
                )}
                {showSpecificContent && (
                  <>
                    <div
                      className={`${classes.drawer__product} ${classes.drawerPD}`}
                    >
                      <div>
                        <div className={classes.drawer__btn__section}>
                          <p className={classes.product__info}>
                            {recurringType}
                          </p>
                          {recurringType !== 'One Off' && (
                            <Button
                              className={`${classes.drawer__product} drawer__btn`}
                            >
                              Subscription
                            </Button>
                          )}
                        </div>
                        {recurringType !== 'One Off' && (
                          <p className={classes.product__text}>
                            You can cancel subcription after {recurringPeriod}{' '}
                            visits
                          </p>
                        )}
                      </div>
                      <p className={classes.product__price}>£{total_price}</p>
                    </div>
                    <div className={classes.drawer__divider}></div>
                  </>
                )}

                {packagesSelected?.length > 0 &&
                  packagesSelected?.map((ele) => (
                    <div className={classes.pkgItemParent}>
                      <h2
                        className={classes.pkgItemTitle}
                        style={{padding: '10px 0px 0px 0px'}}
                      >
                        {ele?.title}
                      </h2>
                      {ele?.packages?.length > 0 &&
                        ele?.packages?.map((data) => (
                          <div className={classes.pkgItem}>
                            <div className={classes.pkgItemLeft}>
                              <div>
                                <h2 className={classes.pkgItemTitle}>
                                  {data?.quantity_applicate
                                    ? `${data?.quantity} x ${data?.title}`
                                    : `${data?.title}`}
                                </h2>
                                {data?.description && (
                                  <p
                                    className={'pkgItemDesc'}
                                    dangerouslySetInnerHTML={{
                                      __html: data?.description,
                                    }}
                                  ></p>
                                )}
                              </div>
                              <h2 className={classes.pkgItemPrice}>
                                £
                                {data?.quantity_applicate
                                  ? `${data?.total_price?.toFixed(0)} `
                                  : `${parseInt(data?.price)}`}
                              </h2>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}

                {addonSelected?.length > 0 &&
                  addonSelected?.map((addon) => (
                    <>
                      <div
                        className={`${classes.drawer__addon} ${classes.drawerPD}`}
                      >
                        {addon?.image !== null ? (
                          <img
                            width="100%"
                            src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${addon?.image?.id}`}
                            alt="Urbanserve"
                            className={classes.drawer__img}
                          />
                        ) : (
                          <img
                            width="100%"
                            src="/site__main__images/product__image.png"
                            alt="Urbanserve"
                            className={classes.drawer__img}
                          />
                        )}
                        <h4 className={classes.drawer__addon__title}>
                          {addon?.quantity_applicable
                            ? ` ${addon.quantity} x ${addon?.title}`
                            : `${addon?.title}`}
                        </h4>
                        {cartData?.[0]?.is_package_applicable &&
                        cartData?.[0]?.is_product_applicable ? (
                          <Button
                            className={`${classes.drawer__product} drawer__btn`}
                          >
                            One off
                          </Button>
                        ) : (
                          <h2
                            className={classes.pkgItemPrice}
                            style={{marginLeft: 'auto'}}
                          >
                            £
                            {addon?.quantity_applicable
                              ? addon?.quantity * addon?.price
                              : `${addon?.price}`}
                          </h2>
                        )}
                        {/* <div className={classes.drawer__divider}></div> */}
                      </div>
                      <div className={classes.drawer__divider}></div>
                      {showSpecificContent && (
                        <div
                          className={`${classes.drawer__flex} ${classes.drawerPD}`}
                        >
                          <div className={classes.drawer__addon__quantity}>
                            <p className={classes.addon__quantity}>
                              {addon?.quantity}
                            </p>
                            <img
                              width="100%"
                              src="/site__main__images/site__close.png"
                              alt="Urbanserve"
                              className={classes.quantity__img}
                            />
                            <p className={classes.addon__quantity}>
                              £{addon?.price}
                            </p>
                          </div>
                          <p className={classes.addon__price}>
                            £{addon?.total}
                          </p>
                        </div>
                      )}
                      {/* <div className={classes.drawer__divider}></div> */}
                    </>
                  ))}

                {/* Included Items */}
                {includedItems?.length > 0 &&
                  includedItems?.map(
                    (ele) =>
                      ele?.included && (
                        <>
                          <div
                            className={`${classes.drawer__addon} ${classes.drawerPD}`}
                          >
                            <h4 className={classes.drawer__addon__title}>
                              {ele?.include_item_name ?? `~`}
                            </h4>
                            <h2
                              className={classes.pkgItemPrice}
                              style={{marginLeft: 'auto'}}
                            >
                              FREE
                            </h2>
                          </div>
                          <div className={classes.drawer__divider}></div>
                        </>
                      ),
                  )}

                {discount_price > 0 && (
                  <div
                    className={`${classes.drawer__flex} ${classes.drawerPD}`}
                  >
                    <h3 className={classes.discount__title}>Discount</h3>
                    <p className={classes.discount__price}>
                      - £{discount_price}
                    </p>
                  </div>
                )}

                <div
                  className={`${classes.drawer__footer} ${classes.drawerPD}`}
                >
                  <h6 className={classes.footer__title}>
                    Total:{' '}
                    <span className={classes.footer__price}>
                      £
                      {showSpecificContent
                        ? `${total_price}`
                        : `${total_price !== NaN ? total_price : 'NA'}`}
                    </span>
                  </h6>
                  {showSpecificContent && (
                    <>
                      <div
                        className={`${classes.footer__content} ${classes.footer__mb}`}
                      >
                        <img
                          width="100%"
                          src="/site__main__images/icon__check.png"
                          alt="Urbanserve"
                          className={classes.footer__check}
                        />
                        <p className={classes.footer__text}>
                          Pay in advance for first booking.
                        </p>
                      </div>
                      <div className={classes.footer__content}>
                        <img
                          width="100%"
                          src="/site__main__images/icon__check.png"
                          alt="Urbanserve"
                          className={classes.footer__check}
                        />
                        <p className={classes.footer__text}>
                          {`£${
                            total_price !== NaN
                              ? total_price + addonsTotal
                              : 'NA'
                          } subscription will be colllected after consecutive
                  booking completion`}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Drawer>
              {/* Mobile Summary Drawer */}

              <Dialog
                onClose={() => setIsConfirmModalOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={isConfirmModalOpen}
                fullWidth={'sm'}
                maxWidth={'sm'}
              >
                <DialogTitle>
                  <p className={classes.modalTitle}>{productDetails?.title}</p>
                </DialogTitle>
                <DialogContent>
                  <p className={classes.modalinfo}>
                    Are you sure you want to book service?
                  </p>
                </DialogContent>
                <DialogActions>
                  <form onSubmit={handleSubmit}>
                    <Button
                      className="bookBtn"
                      type="submit"
                      onClick={() => {
                        setSubmitType('order')
                        setIsConfirmModalOpen(false)
                      }}
                    >
                      Book Now
                    </Button>
                  </form>
                  <Button
                    className="cancelBtn"
                    onClick={() => setIsConfirmModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>

              <section className="site__package__summary__box site__package__summary__box__ckout">
                <div>
                  <p
                    onClick={() => setSummaryModalOpen(true)}
                    className="site__package__summary__view"
                  >
                    View Summary
                  </p>
                  {/* {isValidatingPostcode && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0.5rem 0rem',
                      }}
                    >
                      <Loader active inline />
                      <span className={classes.loaderText}>
                        Validating postcode, please wait!
                      </span>
                    </div>
                  )} */}
                  {values?.postcode && isPostcodeValid === 404 && (
                    <p className="error__text" style={{paddingTop: '0.3rem'}}>
                      The selected service is not available in this location!
                    </p>
                  )}
                  {stepActive === 1 && (
                    <div
                      className="site__package__summary"
                      onClick={() => stepOneComplete && setStepActive(2)}
                      style={{
                        backgroundColor: stepOneComplete
                          ? `#4a00e0`
                          : 'rgba(233, 233, 234, 1)',
                      }}
                    >
                      <div className="site__package__summary__qty">
                        <span
                          className="site__package__summary__num"
                          style={{
                            color: stepOneComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                            borderColor: stepOneComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                          }}
                        >
                          {addonSelected?.length > 0
                            ? addonSelected?.length + 1
                            : 1}
                        </span>
                        <p
                          style={{
                            color: stepOneComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                          }}
                        >
                          £{total_price}
                        </p>
                      </div>
                      <div className="site__package__summary__next">
                        <p
                          style={{
                            color: stepOneComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                          }}
                        >
                          Next
                        </p>
                        <img
                          width="18px"
                          height="12px"
                          src={
                            !stepOneComplete
                              ? '/site__icons/icon__chevron__disabled.png'
                              : '/site__main__images/site__chevron__right__light.png'
                          }
                        />
                      </div>
                    </div>
                  )}
                  {stepActive === 2 && (
                    <div
                      className="site__package__summary"
                      onClick={() =>
                        stepTwoComplete &&
                        isPostcodeValid !== 404 &&
                        setStepActive(3)
                      }
                      style={{
                        backgroundColor:
                          stepTwoComplete && isPostcodeValid !== 404
                            ? `#4a00e0`
                            : 'rgba(233, 233, 234, 1)',
                      }}
                    >
                      <div className="site__package__summary__qty">
                        <span
                          className="site__package__summary__num"
                          style={{
                            color: stepTwoComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                            borderColor: stepTwoComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                          }}
                        >
                          {addonSelected?.length > 0
                            ? addonSelected?.length + 1
                            : 1}
                        </span>
                        <p
                          style={{
                            color: stepTwoComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                          }}
                        >
                          £{total_price}
                        </p>
                      </div>
                      <div className="site__package__summary__next">
                        <p
                          style={{
                            color: stepTwoComplete
                              ? '#fff'
                              : 'rgba(33, 38, 43, 0.5)',
                          }}
                        >
                          Next
                        </p>
                        <img
                          width="18px"
                          height="12px"
                          src={
                            !stepTwoComplete
                              ? '/site__icons/icon__chevron__disabled.png'
                              : '/site__main__images/site__chevron__right__light.png'
                          }
                        />
                      </div>
                    </div>
                  )}
                  {stepActive === 3 && (
                    <form onSubmit={handleSubmit}>
                      <Button
                        className="site__package__summary"
                        type="submit"
                        onClick={() => {
                          if (
                            Object.keys(errors).length === 0 &&
                            stepThreeComplete &&
                            selectedCustomerDatesValid === true
                          ) {
                            setSubmitType('order')
                          }
                        }}
                        style={{
                          backgroundColor:
                            stepThreeComplete &&
                            selectedCustomerDatesValid === true
                              ? `#4a00e0`
                              : 'rgba(233, 233, 234, 1)',
                        }}
                      >
                        <div className="site__package__summary__qty">
                          <span
                            className="site__package__summary__num"
                            style={{
                              color:
                                stepThreeComplete &&
                                selectedCustomerDatesValid === true
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                              borderColor:
                                stepThreeComplete &&
                                selectedCustomerDatesValid === true
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                            }}
                          >
                            {addonSelected?.length > 0
                              ? addonSelected?.length + 1
                              : 1}
                          </span>
                          <p
                            style={{
                              color:
                                stepThreeComplete &&
                                selectedCustomerDatesValid === true
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                            }}
                          >
                            £{total_price}
                          </p>
                        </div>
                        <div className="site__package__summary__next">
                          <p
                            style={{
                              color:
                                stepThreeComplete &&
                                selectedCustomerDatesValid === true
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                              width: '112px',
                            }}
                          >
                            {loggedIn ? 'Order & Pay' : 'Register & Pay'}
                          </p>
                          <img
                            width="18px"
                            height="12px"
                            src={
                              !stepThreeComplete && !selectedCustomerDatesValid
                                ? '/site__icons/icon__chevron__disabled.png'
                                : '/site__main__images/site__chevron__right__light.png'
                            }
                          />
                        </div>
                      </Button>
                    </form>
                  )}
                  {stepActive === 4 && (
                    <>
                      {loggedIn ? (
                        <div
                          className="site__package__summary"
                          onClick={() =>
                            existingCardRef?.current?.payCardHandle()
                          }
                          style={{
                            backgroundColor: selectedPaymentMethod
                              ? `#4a00e0`
                              : 'rgba(233, 233, 234, 1)',
                          }}
                        >
                          <div className="site__package__summary__qty">
                            <span
                              className="site__package__summary__num"
                              style={{
                                color: selectedPaymentMethod
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                                borderColor: selectedPaymentMethod
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                              }}
                            >
                              {addonSelected?.length > 0
                                ? addonSelected?.length + 1
                                : 1}
                            </span>
                            <p
                              style={{
                                color: selectedPaymentMethod
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                              }}
                            >
                              £{total_price}
                            </p>
                          </div>
                          <div className="site__package__summary__next">
                            <img
                              width="22px"
                              height="20px"
                              marginRight="8px"
                              src={
                                !stepThreeComplete
                                  ? '/site__icons/icon__pay.png'
                                  : '/site__icons/icon__pay.png'
                              }
                            />
                            <p
                              style={{
                                color: selectedPaymentMethod
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                                marginLeft: '8px',
                              }}
                            >
                              {addOrderSuccessData?.is_recurring
                                ? 'Subscribe'
                                : 'Pay'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="site__package__summary"
                          onClick={() => childRef?.current?.getAlert()}
                          style={{
                            backgroundColor: stepThreeComplete
                              ? `#4a00e0`
                              : 'rgba(233, 233, 234, 1)',
                          }}
                        >
                          <div className="site__package__summary__qty">
                            <span
                              className="site__package__summary__num"
                              style={{
                                color: stepThreeComplete
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                                borderColor: stepThreeComplete
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                              }}
                            >
                              {addonSelected?.length > 0
                                ? addonSelected?.length + 1
                                : 1}
                            </span>
                            <p
                              style={{
                                color: stepThreeComplete
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                              }}
                            >
                              £{total_price}
                            </p>
                          </div>
                          <div className="site__package__summary__next">
                            <img
                              width="22px"
                              height="20px"
                              marginRight="8px"
                              src={
                                !stepThreeComplete
                                  ? '/site__icons/icon__pay.png'
                                  : '/site__icons/icon__pay.png'
                              }
                            />
                            <p
                              style={{
                                color: stepThreeComplete
                                  ? '#fff'
                                  : 'rgba(33, 38, 43, 0.5)',
                                marginLeft: '8px',
                              }}
                            >
                              Pay
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {/* {price < productDetails?.minimum_package_price && (
                <p className="site__package__summary__price__btm">
                  The minimum total should be £
                  {productDetails?.minimum_package_price}
                </p>
              )} */}
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <InvalidAccess
          pageAccess="Checkout"
          title="You have not selected any service. Expore services we offer and try again!"
        />
      )}
      <AddressModal
        userInfo={userInfo}
        handleModalClose={handleModalClose}
        addressModal={addressModal}
        setAddressModal={setAddressModal}
        isAddOpen={addressAddModalOpen}
        isEditOpen={addressModalOpen}
        defaultAddress={defaultAddress}
        currentAddress={currentAddress}
        setDefaultAddress={setDefaultAddress}
        setParentValue={setValues}
        addressObjModal={addressObjModal}
        closeEditModal={setAddresssModalOpen}
        closeAddModal={setAddresssAddModalOpen}
      />
    </>
  )
}
const mapStateToProps = (state) => ({
  currentCart: state.CartReducer?.currentCart,
  isValidatingCustomer: state.CustomerFlowReducer?.isValidatingCustomer,
  isCustomerValid: state.CustomerFlowReducer?.validateCustomer,
  customerAddress: state.CustomerFlowReducer?.customerAddress,
  isValidatingPostcode: state.CustomerFlowReducer?.isValidatingPostcode,
  isPostcodeValid: state?.CustomerFlowReducer?.isPostcodeValid,
  addOrderSuccessData: state.FinalOrderReducer?.addOrderSuccessData,
  isAddOrderSuccess: state.FinalOrderReducer?.isAddOrderSuccess,
  isCreatingPayment: state.FinalOrderReducer?.isCreatingPayment,
  isBookingService: state.FinalOrderReducer?.isAddingOrder,
  isFetchingCustomerAddress: state.FinalOrderReducer?.isFetchingCustomerAddress,
  isPaymentSuccess: state.FinalOrderReducer?.isPaymentSuccess,
  cardDetails: state?.CardDetailsReducer?.cardDetails,
  isFetchingCardDetails: state?.CardDetailsReducer?.isFetchingCardDetails,
  isEditingOrderSuccess: state?.CardDetailsReducer?.isEditingOrderSuccess,
  isEmailVerified: state.CustomerFlowReducer?.isEmailVerified,
  currentMaxJobData: state.FinalOrderReducer?.currentMaxJobData,
})
const mapDispatchToProps = (dispatch) => {
  return {
    /* Product Related */
    fetchProductDetails: (data) => dispatch(getProductDetailsRequest(data)),
    errorAlert: (message) => dispatch(errorAlert(message)),
    successAlert: (message) => dispatch(successAlert(message)),
    /* Customer Related */
    validateCustomer: (data) => dispatch(validateCustomer(data)),
    CustomerLogin: (...args) => dispatch(LoginAction(...args)),
    fetchAddress: (data) => dispatch(getCustomerAddress(data)),
    validatePostcodeData: (data) => dispatch(validatePostcode(data)),
    /* Order Related */
    addOrderData: (data) => dispatch(addOrder(data)),
    createPayment: (data) => dispatch(createPayment(data)),
    validateCustomerReset: (data) => dispatch(validateCustomerReset(data)),
    fetchCardsData: (data) => dispatch(getCardsRequest(data)),
    editOrder: (data) => dispatch(editOrder(data)),
    attachPaymentMethod: (payload) => dispatch(attachPaymentMethod(payload)),
    resetOrder: (payload) => dispatch(resetOrder(payload)),
    resetVerified: () => dispatch(resetCustomerVerified()),
    sendVerifyLink: (payload) => dispatch(resendVerifyEmail(payload)),
    getMaxJobData: (payload) => dispatch(checkMaxJob(payload)),
    Logout: (data) => dispatch(LogoutAction(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(SiteMain))
