import React, {lazy, Suspense, useEffect, useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'
import {useHistory, useRouteMatch} from 'react-router-dom'
import WithAuth from '../../utils/withAuth'
import * as Yup from 'yup'
import Dialog from '@material-ui/core/Dialog'
import HelmetComponent from '../../components/Helmet'
import {
  IconButton,
  Box,
  makeStyles,
  Typography,
  Card,
  Avatar,
  Grid,
  Checkbox,
  TextField,
  DialogContent,
  FormHelperText,
  DialogActions,
  Accordion as AccordionUI,
  AccordionSummary as AccordionSummaryUI,
  AccordionActions as AccordionActionsUI,
  AccordionDetails as AccordionDetailsUI,
  CardContent,
} from '@material-ui/core'
import moment from 'moment'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import {
  getOrdersListRequest,
  deleteOrdersRequest,
  ordersEditContactFailure,
} from '../../Stores/Orders/actions'
import {
  Accordion,
  Message,
  Segment,
  Header,
  Icon,
  Button,
  Table,
  Radio,
  Grid as SemanticGrid,
  Divider,
  Loader,
} from 'semantic-ui-react'
import {getCategory} from '../../Stores/Orders/actions'

import {getCustomerListing} from '../../Stores/Orders/actions'
import {
  getVisitsRequest,
  openVisitAddModal,
  openDeleteModal,
  closeDeleteModal,
  addVisit,
} from '../../Stores/OrderVisits/actions'
import {
  openEditModal,
  closeEditModal,
  getOrderFlow,
  openVisitEditModal,
  closeVisitEditModal,
  getAddons,
  editVisit,
  openQuotationEditModal,
  closeQuotationEditModal,
  openPayModal,
  closePayModal,
  getOrderDetails,
  openAddonEditModal,
  closeAddonEditModal,
  editAddon,
} from '../../Stores/FinalOrder/actions'
import {Close, ExpandMoreIcon, TramOutlined} from '@material-ui/icons'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import useValidator from '../../utils/useValidator'
import {
  getSingleQuote,
  saveQuote,
  getQuotes,
  getVisitQuotes,
} from '../../Stores/QuoteDetails/actions'
import Skeleton from '@material-ui/lab/Skeleton'
import Badge from '@material-ui/core/Badge'
import DescriptionIcon from '@material-ui/icons/Description'
import Chip from '@material-ui/core/Chip'
import {
  getCardsRequest,
  attachPaymentMethod,
  editOrder,
} from '../../Stores/CardDetails/actions'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {current} from 'immer'

const styles = {
  // table: {
  //     padding: '2rem'
  // },
  tableHead: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    backgroundColor: 'white',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  sliderLable: {
    marginRight: '0.6rem',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardToggle: {
    paddingRight: '0.6rem',
  },
  flexDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerContent: {
    width: '100%',
  },
  table: {
    padding: '2rem',
  },
  tableHead: {
    fontFamily: 'Ubuntu, sans-serif',
    fontWeight: '700',
    backgroundColor: 'white',
  },
  textCenter: {
    textAlign: 'center',
  },
  dialogTitle: {
    margin: '0 auto',
    paddingTop: '1rem',
    paddingBottom: '10px',
    color: 'black',
    fontSize: '24px',
    borderBottom: '1px solid lightgray',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Ubuntu, sans-serif',
  },
  closeIcon: {
    position: 'absolute',
    right: '-10px',
  },
  sectionHeader: {
    padding: '1rem 1rem',
  },
  section: {
    padding: '1rem 0rem',
  },
  sectionRight: {
    margin: '1rem 0rem 1rem 0rem',
  },
  sectionPb: {
    paddingBottom: '1rem',
  },
  skeleton: {
    padding: '1rem 0rem',
  },
  iconContentPD: {
    paddingTop: '1rem',
    display: 'flex',
  },
  iconContentDetails: {},
  paymentContent: {
    padding: '1rem',
  },
}
export function Visits({
  fetchVisitsList,
  openEditModal,
  isOrderEditModalOpen,
  closeEditModal,
  currentOrder,
  fetchOrderFlow,
  orderFlowData,
  isVisitEditModalOpen,
  currentVisit,
  openVisitEditModal,
  closeVisitEditModal,
  fetchAddons,
  addonData,
  editVisit,
  openQuotationEditModal,
  closeQuotationEditModal,
  isQuotationEditModalOpen,
  currentQuotation,
  fetchCurrentQuote,
  saveQuote,
  fetchQuotes,
  getVisitQuotes,
  visitQuotes,
  isFetchingVisitQuotes,
  isFetchingOrderFlow,
  isFetchingAddons,
  openPayModal,
  isOrderPayModalOpen,
  currentPaymentFor,
  closePayModal,
  getOrderDetails,
  currentOrderDetails,
  fetchCardsData,
  cardDetails,
  attachPaymentMethod,
  editOrder,
  openAddonEditModal,
  isAddonModalOpen,
  closeAddonEditModal,
  currentAddon,
  editAddon,
}) {
  const history = useHistory()

  const postStyles = makeStyles((theme) => ({
    cardHeader: {
      fontSize: '18px',
      fontWeight: '700',
      textTransform: 'uppercase',
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      lineHeight: '23px',
      color: '#000000',
    },
    cardSubHeader: {
      fontSize: '16px',
      fontWeight: '700',
      textTransform: 'capitalize',
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      lineHeight: '23px',
      color: '#000000',
    },
    cardText: {
      fontSize: '14px',
      fontWeight: '700',
      textTransform: 'capitalize',
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      lineHeight: '23px',
      color: '#666666',
    },
    FilterTitle: {
      margin: '0 auto',
      padding: '1rem 0rem',
      color: 'black',
      fontSize: '24px',
      borderBottom: '1px solid lightgray',
      width: '100%',
      textAlign: 'center',
    },
    flexBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dividerMt: {
      marginTop: '8px',
    },
    cursor: {
      cursor: 'pointer',
    },
    orderFlowHeader: {
      marginTop: '1rem',
      padding: '1rem',
    },
    textFieldName: {
      fontFamily: 'Mulish',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '23px',
      color: '#666666',
    },
    contentPadding: {
      padding: '0.8rem',
    },
    accordionMt: {
      marginTop: '1rem',
    },
    avatar: {
      backgroundColor: '#f6d365',
      color: 'white',
      marginRight: '0.5rem',
    },
    iconColor: {
      color: '#1A273A',
    },
  }))
  const classes = postStyles()

  const userInfo = useSelector((state) => state?.AuthReducer?.user)

  const {visitLists, isFetchingVisitLists} = useSelector(
    (state) => state?.VisitsReducer,
  )

  const [loggedIn, setLoggedIn] = React.useState(false)

  // Addons
  const [selectedAddons, setSelectedAddons] = useState([])
  const [selectedIDs, setSelectedIDs] = useState([])

  // Parts
  const [selectedParts, setSelectedParts] = useState([])
  const [partDetails, setPartDetails] = useState([])
  const [selectedPartsPrice, setSelectedPartsPrice] = useState(0)
  const [finalParts, setFinalParts] = useState([])

  // Slug from url
  const [quoteID, setQuoteID] = useState('')

  // Total Price
  const [totalPriceArray, setTotalPriceArray] = useState([])
  const [quoteTotal, setQuotetotal] = useState(0)
  const [recurringDetails, setRecurringDetails] = useState([])
  const [currentQuotationEdit, setCurrentQuotationEdit] = useState({})

  const [submitType, setSubmitType] = useState('')

  const [isAccepted, setIsAccepted] = useState(false)
  const [isRejected, setIsRejected] = useState(false)

  //
  const [selectedRecurring, setSelectedRecurring] = useState(null)

  const [selectedRecurringPrice, setSelectedRecurringPrice] = useState(0)
  const [quoteCount, setQuoteCount] = useState(0)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_APP_STRIPE_KEY)

  const [loader, setLoader] = useState(true)
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    isConfirmed: false,
  })

  useEffect(() => {
    let timer1 = setTimeout(() => setLoader(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  function handlePayment(val, history, type) {
    if (val) {
      editOrder({
        id: currentOrderDetails.id,
        data: val,
        history,
        type,
        from: 'single-order',
      })
      closePayModal()
    }
  }

  const AddNewCard = () => {
    const stripe = useStripe()
    const elements = useElements()

    const addPaymentMethod = async (event) => {
      event.preventDefault()

      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })

      if (paymentMethod && paymentMethod.id) {
        let payload = {
          payment_method: paymentMethod.id,
          id: currentOrderDetails?.id,
        }
        await attachPaymentMethod(payload)
      }
    }

    return (
      <>
        <HelmetComponent
          title="UrbanServe - About Us"
          description="Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs"
          ogTitle=""
          ogType="urbanserve company"
          ogUrl=""
          ogImage=""
          ogDescription=""
        />
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
        <Button
          type="button"
          variant="contained"
          color="primary"
          // className={classes.SaveButton}
          disabled={!stripe}
          onClick={addPaymentMethod}
          style={{marginTop: '0.5rem'}}
        >
          {'Add Card'}
        </Button>
      </>
    )
  }

  const PayViaCard = () => {
    const stripe = useStripe()
    const elements = useElements()

    const payCard = async (event) => {
      event.preventDefault()
      if (currentOrderDetails?.is_recurring !== true) {
        if (currentOrderDetails.stripe_client_secret === null) {
          alert(
            'Something went wrong with paymentMethod and payment intents, Please contact administrator',
          )
        }
        await stripe
          .confirmCardPayment(currentOrderDetails.stripe_client_secret, {
            payment_method: selectedPaymentMethod?.id,
          })
          .then(async function (result) {
            // Handle result.error or result.paymentIntent
            if (result.paymentIntent) {
              setPaymentIntent(result.paymentIntent)
              let val = {
                status: 'Created',
                payment_method: 'card',
                paymentMethod: selectedPaymentMethod?.id,
                stripe_payment_method: selectedPaymentMethod?.id,
                customer_id: currentOrderDetails?.customer_id,
                customer_details: currentOrderDetails?.customer_details,
                customer_address_id: currentOrderDetails?.customer_address_id,
              }
              await handlePayment(val, history, 'one-off')
            }
            if (result.error) {
              errorAlert(result.error.message)
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
            customer_id: currentOrderDetails?.customer_id,
            customer_details: currentOrderDetails?.customer_details,
            customer_address_id: currentOrderDetails?.customer_address_id,
          }
          handlePayment(val, history, 'recurring')
        }
      }
      return true
    }

    return (
      <Button
        type="button"
        variant="contained"
        color="primary"
        disabled={!stripe || selectedPaymentMethod === null}
        onClick={payCard}
      >
        {currentOrderDetails?.is_recurring ? 'Subscribe' : 'Pay'}
      </Button>
    )
  }

  useEffect(() => {
    if (userInfo && userInfo?.id !== null) {
      setLoggedIn(true)
    }
  }, [userInfo])

  useEffect(() => {
    if (loggedIn === true) {
      fetchVisitsList()
    }
  }, [loggedIn])

  // Fetch order flow view
  useEffect(() => {
    if (isOrderEditModalOpen && currentOrder !== null) {
      fetchOrderFlow(currentOrder?.id)
    }
  }, [isOrderEditModalOpen, currentOrder])

  const handleVisit = (visit) => {
    openVisitEditModal(visit)
  }

  useEffect(() => {
    if (isVisitEditModalOpen === true && currentVisit !== null) {
      fetchAddons(currentVisit?.id)
    }
  }, [currentVisit, isVisitEditModalOpen])

  const addonHandler = (checked, addOn, index) => {
    if (checked === true) {
      setSelectedAddons([...selectedAddons, addOn])
    } else if (checked === false) {
      let filteredAddons = selectedAddons?.filter((ele) => ele.id !== addOn?.id)
      if (filteredAddons) {
        setSelectedAddons(filteredAddons)
      }
    }
  }

  useEffect(() => {
    let addons = JSON.parse(JSON.stringify(selectedAddons))
    let data = []
    if (addons?.length >= 0) {
      addons.map((ele) => {
        data.push(ele?.id)
      })
      setSelectedIDs(data)
    }
  }, [selectedAddons])

  const {
    getFieldProps: VisitGetFieldProps,
    values: VisitValues,
    errors: VisitErrors,
    setValues: VisitSetValues,
    handleSubmit: VisitHandleSubmit,
    handleBlur: VisitHandleBlur,
    handleChange: VisitHandleChange,
    touched: VisitTouched,
  } = useValidator({
    initialValues: {
      customer_note: '',
      // addon_details: '',
    },
    onSubmit: VisitOnSubmit,
    validationSchema: Yup.object({}),
  })

  const handleQuotation = (quotation) => {
    openQuotationEditModal(quotation)
  }

  useEffect(() => {
    if (isQuotationEditModalOpen === true && currentQuotation !== null) {
      fetchCurrentQuote(currentQuotation?.id)
    }
  }, [currentQuotation, isQuotationEditModalOpen])

  useEffect(() => {
    if (selectedRecurring !== {}) {
      let price = parseInt(selectedRecurring?.recurring_price)
      if (price) {
        setSelectedRecurringPrice(price)
      }
    }
  }, [selectedRecurring])

  const [currentQuoteID, setCurrentQuoteID] = useState('')
  // Handle Parts Add
  const handlePartsAdd = (e, checked, part, id) => {
    let isSelected = checked
    let incomingPart = part
    if (isSelected === true) {
      setSelectedParts([...selectedParts, incomingPart])
    } else {
      let selectedPartsData = selectedParts
      let filterParts = selectedPartsData?.filter(
        (part) => part.id !== incomingPart?.id,
      )
      if (filterParts) {
        setSelectedParts(filterParts)
      }
    }
  }

  // Calculate selected parts total price
  useEffect(() => {
    var total = 0
    selectedParts.forEach((item) => {
      total += item?.parts_price
    })
    setSelectedPartsPrice(total)
  }, [selectedParts])

  // Slug from url
  useEffect(() => {
    if (history && history?.query?.slug !== '') {
      setQuoteID(history?.query?.slug)
    }
  }, [history])

  useEffect(() => {
    if ((quoteID !== null) & (quoteID !== undefined) && quoteID !== '') {
      fetchCurrentQuote(quoteID)
    }
  }, [quoteID])

  const {
    getFieldProps,
    errors,
    setValues,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    values,
  } = useValidator({
    initialValues: {
      recurring_selection: '',
      parts_selection: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      // recurring_selection: currentQuote?.is_recurring === true ? Yup.string().required() : Yup.string().nullable(),
      // parts_selection: currentQuote?.is_parts === true ? Yup.string().required() : Yup.string().nullable(),
    }),
  })

  const {
    getFieldProps: rejectgetFieldProps,
    errors: rejecterrors,
    setValues: rejectsetValues,
    handleSubmit: rejecthandleSubmit,
    handleBlur: rejecthandleBlur,
    handleChange: rejecthandleChange,
    touched: rejecttouched,
    values: rejectvalues,
  } = useValidator({
    initialValues: {},
    onSubmit: rejectOnSubmit,
    validationSchema: Yup.object({}),
  })

  useEffect(() => {
    let part_details = JSON.parse(JSON.stringify(partDetails))
    part_details?.map((part) => {
      selectedParts?.map((ele, k) => {
        if (ele.id === part.id) {
          part.is_accepted = true
        } else {
          part.is_accepted = false
        }
      })
    })
    if (part_details) {
      setFinalParts(part_details)
      setValues({
        ...values,
        parts_selection: part_details,
      })
    }
  }, [selectedParts])

  function onSubmit(values, type) {
    let data = {
      status: 'accepted',
      is_accepted_by_customer: '',
      recurring_details: '',
      recurring: currentQuoteEdit?.recurring_details,
      is_recurring: currentQuoteEdit?.is_recurring,
      is_parts: currentQuoteEdit?.is_parts,
      parts: currentQuoteEdit?.parts,
      total: currentQuoteEdit?.total,
    }
    let recurringData = {
      status: 'accepted',
      is_accepted_by_customer: '',
      recurring_details: '',
      recurring: currentQuoteEdit?.recurring_details,
      is_recurring: currentQuoteEdit?.is_recurring,
      is_parts: currentQuoteEdit?.is_parts,
      parts: currentQuoteEdit?.parts,
      total: currentQuoteEdit?.total,
    }
    if (recurringDetails !== []) {
      saveQuote({
        data: recurringData,
        id: currentQuoteEdit?.id,
        type: 'accept',
        order_id: currentOrder?.id,
      })
      setRecurringDetails({})
      setCurrentQuoteEdit({})
    } else if (recurringDetails === []) {
      saveQuote({
        data,
        id: currentQuoteEdit?.id,
        type: 'accept',
        order_id: currentOrder?.id,
      })
      setRecurringDetails({})
      setCurrentQuoteEdit({})
    }
  }

  function rejectOnSubmit() {
    let data = {
      status: 'rejected',
      is_accepted_by_customer: '',
      recurring_details: '',
      recurring: currentQuoteEdit?.recurring_details,
      is_recurring: currentQuoteEdit?.is_recurring,
      is_parts: currentQuoteEdit?.parts_required,
      parts: currentQuoteEdit?.parts,
      total: 0,
    }
    if (data) {
      saveQuote({
        data,
        id: currentQuoteEdit?.id,
        type: 'reject',
        order_id: currentOrder?.id,
      })
      setRecurringDetails({})
      setCurrentQuoteEdit({})
    }
  }

  useEffect(() => {
    setSubmitType('')
  }, [])

  useEffect(() => {
    if (isOrderEditModalOpen && currentOrder !== null) {
      getVisitQuotes(currentOrder?.id)
    }
  }, [isOrderEditModalOpen])

  // Clear
  useEffect(() => {
    if (!isOrderEditModalOpen) {
      setSelectedAddons([])
      setRecurringDetails({})
    }
  }, [isVisitEditModalOpen, isOrderEditModalOpen])

  const [currentVisitEdit, setCurrentVisitEdit] = useState({})

  function fetchAddonsHandler() {
    var filteredArray = orderFlowData?.data.find((data) =>
      data.hasOwnProperty('visit'),
    )
    if (filteredArray !== null && filteredArray?.visit !== null) {
      fetchAddons(filteredArray?.visit?.id)
    }
  }

  useEffect(() => {
    if (orderFlowData?.data?.length > 0) {
      fetchAddonsHandler()
    }
  }, [orderFlowData])

  const [currentFlowData, setCurrentFlowData] = useState([])

  useEffect(() => {
    if (orderFlowData?.data?.length > 0) {
      let flowData = JSON.parse(JSON.stringify(orderFlowData?.data))
      let visitExpand = false
      let quoteExpand = false
      flowData.map((ele, i) => {
        ele.expanded = false
        if (ele?.visit !== undefined) {
          if (!visitExpand) {
            ele.expanded = true
            visitExpand = true
          }
        }
        if (ele?.expanded === true) {
          let addOns = ele?.visit?.addon_details

          if (typeof addOns !== 'string') {
            if (addOns?.length > 0) {
              let tempSelectedIDs = []
              let tempSelectedData = []
              addOns?.map((ele) => {
                tempSelectedIDs.push(ele?.id)
                tempSelectedData.push(ele)
              })
              setSelectedIDs(tempSelectedIDs)
              setSelectedAddons(tempSelectedData)
            }
          }
        }
        if (ele?.quotation !== undefined) {
          if (!quoteExpand) {
            ele.expanded = true
            quoteExpand = true
          }
        }
      })
      if (flowData?.length > 0) {
        setCurrentFlowData(flowData)
      }
    }
  }, [orderFlowData])

  const [addonIndex, setCurrentAddonIndex] = useState(null)
  const [quotationIndex, setCurrentQuotationIndex] = useState(null)

  function handleAddonChange(event, index, type, checked) {
    if (type === 'customer_note') {
      let visit = currentFlowData[index]
      visit.visit.customer_note = event?.target.value
      let flowData = JSON.parse(JSON.stringify(currentFlowData))
      if (flowData) {
        setCurrentFlowData(flowData)
      }
    }
  }

  useEffect(() => {
    if (selectedRecurring !== {}) {
      let currentQuotation = JSON.parse(JSON.stringify(currentQuotationEdit))
      currentQuotation?.quotation?.recurring_details?.map((ele, k) => {
        if (selectedRecurring?.recurring_period === ele?.recurring_period) {
          ele.is_accepted = true
        } else {
          ele.is_accepted = false
        }
      })
      if (currentQuotation !== null && quotationIndex !== null) {
        if (currentQuotation) {
          currentFlowData.splice(quotationIndex, 1, currentQuotation)
        }
        handleQuoteChange(quotationIndex, 'quote_recurring')
      }
      setRecurringDetails(currentQuotation?.quotation?.recurring_details)
      // setValues({
      //     ...values,
      //     recurring_selection: currentQuotation?.quotation?.recurring_details
      // })
    }
  }, [selectedRecurring, currentQuotationEdit, quotationIndex])

  function handleQuoteChange(index, type) {
    if (type === 'quote_recurring') {
      let quote = currentFlowData[index]
      let selected_recurring = quote?.quotation?.recurring_details.filter(
        (recurring_data) => recurring_data?.is_accepted === true,
      )
      let sum = 0
      if (selected_recurring?.length >= 0) {
        selected_recurring.forEach((element) => {
          sum += parseFloat(element?.recurring_price)
        })
      } else {
        sum = 0
      }
      // If is_recurring === false add labour rate
      if (quote?.quotation?.is_recurring === false) {
        sum += quote?.quotation?.labour_rate
      }
      if (sum) {
        quote.quotation.total = sum
        setQuotetotal(sum)
        let flowData = JSON.parse(JSON.stringify(currentFlowData))
        if (flowData) {
          setCurrentFlowData(flowData)
        }
      }
    }
  }

  const [currentQuoteEdit, setCurrentQuoteEdit] = useState({})

  function handleQuoteParts(part, index, type, checked) {
    if (type === 'quote_part') {
      let quote = currentFlowData[index]
      if (quote) {
        setCurrentQuoteEdit(quote?.quotation)
        quote?.quotation?.parts?.length > 0 &&
          quote?.quotation?.parts?.map((ele) => {
            if (ele?.id === part?.id && checked === true) {
              ele.is_accepted = true
            } else if (ele?.id === part?.id && checked === false) {
              ele.is_accepted = false
            }
            let flowData = JSON.parse(JSON.stringify(currentFlowData))
            if (flowData) {
              setCurrentFlowData(flowData)
            }
          })
        let selected_parts = quote?.quotation?.parts?.filter(
          (part_data) => part_data?.is_accepted === true,
        )
        let sum = 0
        if (selected_parts?.length >= 0) {
          selected_parts.forEach((element) => {
            sum += element?.parts_price
          })
          quote.quotation.total = sum + quoteTotal
          let flowData = JSON.parse(JSON.stringify(currentFlowData))
          if (flowData) {
            setCurrentFlowData(flowData)
          }
        } else {
          quote.quotation.total = sum + quoteTotal
          let flowData = JSON.parse(JSON.stringify(currentFlowData))
          if (flowData) {
            setCurrentFlowData(flowData)
          }
        }
      }
    }
  }

  // Handle Addon Change in Order Flow View
  useEffect(() => {
    if (selectedAddons) {
      if (currentFlowData?.length > 0 && addonIndex !== null) {
        let visit = currentFlowData[addonIndex]
        if (visit?.visit?.addon_details) {
          visit.visit.addon_details = selectedAddons
        }
        let flowData = JSON.parse(JSON.stringify(currentFlowData))
        if (flowData) {
          setCurrentFlowData(flowData)
        }
      }
    }
  }, [selectedAddons, addonIndex])

  function VisitOnSubmit(values) {
    let data = {
      customer_note: currentVisitEdit?.customer_note,
      addon_details: selectedAddons,
    }
    editVisit({
      data: data,
      id: currentVisitEdit?.id,
      order_id: currentOrder?.id,
    })
  }

  useEffect(() => {
    if (isOrderPayModalOpen && currentPaymentFor?.id) {
      getOrderDetails(currentPaymentFor?.id)
      fetchCardsData({order_id: currentPaymentFor?.id})
    }
  }, [isOrderPayModalOpen, currentPaymentFor])

  useEffect(() => {
    if (!isOrderPayModalOpen) {
      setSelectedPaymentMethod(null)
    }
  }, [isOrderPayModalOpen])

  const handleAddonPayment = () => {
    if (currentAddon?.id) {
      let data = {
        addon_details: [currentAddon],
      }
      editAddon({
        addon_details: data,
        id: currentVisitEdit?.id,
        order_id: currentOrder?.id,
      })
    }
  }

  return (
    <>
      {loader ? (
        <div style={{margin: '2rem'}}>
          <Loader active inline="centered" style={{}} />
        </div>
      ) : (
        <div className="container">
          {!loggedIn && (
            <div className="container">
              <Card elevation={0} style={{textAlign: 'center'}}>
                <h3>Sorry!</h3>
                <p>Please login to manage your order!</p>
              </Card>
            </div>
          )}
          <div style={styles.table}>
            <Table className={!loggedIn && 'site-ele-blur'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={styles.tableHead}>
                    Order Reference
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Product Details
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Purchase Date
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Discount
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Recurring Details
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Address
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Visit Reference
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Staff Details
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.tableHead}>
                    Action
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {isFetchingVisitLists ? (
                  <Table.Row>
                    <Table.Cell colSpan="9">
                      <Skeleton />
                    </Table.Cell>
                  </Table.Row>
                ) : visitLists?.length > 0 ? (
                  visitLists?.map((row, index) => (
                    <Table.Row>
                      <Table.Cell>
                        {row?.display_id ? row?.display_id : '~'}
                      </Table.Cell>
                      <Table.Cell>
                        <div>{row?.product_name ? row?.product_name : '~'}</div>
                      </Table.Cell>
                      <Table.Cell>
                        {row?.date_of_purchase ? row?.date_of_purchase : '~'}
                      </Table.Cell>
                      <Table.Cell>
                        £ {row?.discount ? row?.discount : '~'}
                      </Table.Cell>
                      <Table.Cell>
                        {row?.is_recurring === 1 ? 'Enabled' : 'Disabled'}
                        <div>
                          <span>
                            Period :{' '}
                            <b>
                              {row?.recurring_period
                                ? row?.recurring_period
                                : '~'}
                            </b>
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {row?.address && row?.address?.house_no},{' '}
                        {row?.address ? row?.address?.address_1 : '~'}{' '}
                        {row?.address && row?.address?.address_2}{' '}
                        {row?.address && row?.address?.address_3}{' '}
                        {row?.address && row?.address?.address_4}{' '}
                        {row?.address && row?.address?.postcode}{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {row?.visit_details === null
                          ? '~'
                          : row?.visit_details?.display_id}
                      </Table.Cell>
                      <Table.Cell>
                        {row?.visit_details === null
                          ? '~'
                          : row?.visit_details?.traders_staff?.first_name}{' '}
                        {row?.visit_details !== null &&
                          row?.visit_details?.traders_staff?.last_name}
                        <div>
                          {row?.visit_details !== null &&
                            row?.visit_details?.traders_staff?.email}
                        </div>
                      </Table.Cell>
                      <Table.Cell style={{display: 'flex'}}>
                        <Button onClick={() => openEditModal(row)}>
                          Manage
                        </Button>
                        {row?.order_status === 'Draft' && (
                          <Button onClick={() => openPayModal(row)}>Pay</Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <>
                    <Table.Cell>No New Offers found!</Table.Cell>
                  </>
                )}
              </Table.Body>
            </Table>
          </div>

          <Dialog
            open={isOrderEditModalOpen}
            fullWidth
            fullScreen
            onClose={closeEditModal}
          >
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3 style={styles.dialogTitle}>Order Edit</h3>
                <IconButton
                  onClick={() => closeEditModal()}
                  style={{marginRight: '1rem'}}
                  className={styles.closeIcon}
                >
                  <Close />
                </IconButton>
              </div>
              <SemanticGrid container columns={1}>
                <SemanticGrid.Column>
                  <div style={styles.section}>
                    <Card
                      style={styles.sectionHeader}
                      className="site-order-sec-title"
                    >
                      Order Flow
                    </Card>
                    {isFetchingOrderFlow ? (
                      <div style={styles.skeleton}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" height={118} />
                      </div>
                    ) : (
                      <Box>
                        {currentFlowData &&
                          currentFlowData.length > 0 &&
                          currentFlowData?.map((data, index) => {
                            return (
                              <Box
                                style={{maginTop: '1.5rem', padding: '0.5rem'}}
                              >
                                <Box
                                  style={{
                                    display: 'flex',
                                    alignContent: 'flex-end',
                                    marginLeft: '1rem',
                                    marginBottom: '0.5rem',
                                  }}
                                >
                                  <Box
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <div
                                      style={{
                                        borderLeft: '2px solid #bbb',
                                        height: '1.5rem',
                                      }}
                                    ></div>
                                    <span
                                      style={{
                                        height: '15px',
                                        width: '15px',
                                        backgroundColor: '#bbb',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                      }}
                                    ></span>
                                  </Box>
                                  <Typography
                                    varient={'h6'}
                                    style={{
                                      marginTop: '1.35rem',
                                      marginLeft: '0.5rem',
                                      fontWeight: 600,
                                      fontSize: '13px',
                                      fontFamily: 'Ubuntu, sans-serif',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {data.hasOwnProperty('created_at') === true
                                      ? data?.created_at !== null
                                        ? moment(data?.created_at).format(
                                            'dddd, MMMM Do YYYY, h:mm:ss a',
                                          )
                                        : '~'
                                      : '~'}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Card style={{boxShadow: 'none'}}>
                                    <Box style={{padding: '0.5rem'}}>
                                      <Box
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Avatar
                                          sizes={5}
                                          className={classes.avatar}
                                        >
                                          <CheckCircleOutlineIcon
                                            className={classes.iconColor}
                                          />
                                        </Avatar>
                                        <Typography
                                          className={classes.cardHeader}
                                          className="site-order-flow-title"
                                        >
                                          {data.hasOwnProperty('product_qa') ===
                                          true
                                            ? 'Product QA'
                                            : data.hasOwnProperty('visit')
                                            ? 'Visit'
                                            : data.hasOwnProperty(
                                                'quote_qa',
                                              ) === true
                                            ? 'Quote Qa'
                                            : data.hasOwnProperty(
                                                'quotation',
                                              ) === true
                                            ? 'Quotation'
                                            : data.hasOwnProperty(
                                                'quote_adjustment',
                                              ) === true
                                            ? 'Quote Adjustment'
                                            : ''}
                                        </Typography>
                                      </Box>
                                      {data.hasOwnProperty('product_qa') ===
                                      true ? (
                                        data?.product_qa?.length > 0 ? (
                                          <AccordionUI
                                            elevation={0}
                                            style={{marginTop: '1rem'}}
                                          >
                                            <AccordionSummaryUI
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                            >
                                              <Typography>
                                                View Product QA Details
                                              </Typography>
                                            </AccordionSummaryUI>
                                            <AccordionDetailsUI
                                              style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                              }}
                                            >
                                              {data?.product_qa?.map(
                                                (ele, i) => (
                                                  <Box>
                                                    <Grid container spacing={3}>
                                                      <Grid item xs="12">
                                                        <Box>
                                                          <Box>
                                                            {i + 1}.{' '}
                                                            {ele?.question_title !==
                                                            null
                                                              ? ele?.question_title
                                                              : '~'}
                                                          </Box>
                                                          <Box>
                                                            Answer :{' '}
                                                            {
                                                              ele
                                                                ?.answer_details
                                                                .answer_title
                                                            }
                                                          </Box>
                                                        </Box>
                                                      </Grid>
                                                    </Grid>
                                                  </Box>
                                                ),
                                              )}
                                            </AccordionDetailsUI>
                                          </AccordionUI>
                                        ) : (
                                          <Typography
                                            style={{padding: '0.5rem 1rem'}}
                                          >
                                            No Product QA Found
                                          </Typography>
                                        )
                                      ) : data.hasOwnProperty('visit') ? (
                                        data?.visit !== {} ? (
                                          <AccordionUI
                                            defaultExpanded={
                                              data?.expanded === true
                                                ? true
                                                : false
                                            }
                                            elevation={0}
                                            style={{marginTop: '1rem'}}
                                          >
                                            <AccordionSummaryUI
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                            >
                                              <Typography>
                                                Visit Details
                                              </Typography>
                                            </AccordionSummaryUI>
                                            <AccordionDetailsUI
                                              style={{
                                                backgroundColor: '#f9fafb',
                                              }}
                                            >
                                              <Box
                                                style={{
                                                  padding: '0.5rem 1rem 0.8rem',
                                                  width: '100%',
                                                }}
                                              >
                                                <Card
                                                  className={
                                                    classes.contentPadding
                                                  }
                                                >
                                                  <SemanticGrid
                                                    stackable
                                                    columns={4}
                                                  >
                                                    <SemanticGrid.Column>
                                                      <Box>
                                                        <span
                                                          className={
                                                            classes.textFieldName
                                                          }
                                                        >
                                                          Visit ID
                                                        </span>
                                                        <Box>
                                                          {data?.visit
                                                            ?.display_id !==
                                                          null
                                                            ? data?.visit
                                                                ?.display_id
                                                            : '~'}
                                                        </Box>
                                                      </Box>
                                                    </SemanticGrid.Column>
                                                    <SemanticGrid.Column>
                                                      <Box>
                                                        <span
                                                          className={
                                                            classes.textFieldName
                                                          }
                                                        >
                                                          Status
                                                        </span>
                                                        <Box>
                                                          {data?.visit
                                                            ?.status !== null
                                                            ? data?.visit?.status.toUpperCase()
                                                            : '~'}
                                                        </Box>
                                                      </Box>
                                                    </SemanticGrid.Column>
                                                    <SemanticGrid.Column>
                                                      <Box>
                                                        <span
                                                          className={
                                                            classes.textFieldName
                                                          }
                                                        >
                                                          Visit Type
                                                        </span>
                                                        <Box>
                                                          {data?.visit
                                                            ?.visit_type !==
                                                          null
                                                            ? data?.visit?.visit_type.toUpperCase()
                                                            : '~'}
                                                        </Box>
                                                      </Box>
                                                    </SemanticGrid.Column>
                                                    <SemanticGrid.Column>
                                                      <span
                                                        className={
                                                          classes.textFieldName
                                                        }
                                                      >
                                                        Addons
                                                      </span>
                                                      <div>
                                                        {typeof data?.visit
                                                          ?.addon_details !==
                                                          'string' &&
                                                        data?.visit
                                                          ?.addon_details
                                                          ?.length > 0
                                                          ? data?.visit?.addon_details?.map(
                                                              (addon) => {
                                                                return (
                                                                  <li
                                                                    key={
                                                                      addon.id
                                                                    }
                                                                    style={{
                                                                      paddingBottom:
                                                                        '0.5rem',
                                                                    }}
                                                                  >
                                                                    <Chip
                                                                      label={
                                                                        addon.title
                                                                      }
                                                                    />
                                                                  </li>
                                                                )
                                                              },
                                                            )
                                                          : 'No Addons Selected!'}
                                                      </div>
                                                    </SemanticGrid.Column>

                                                    {data?.expanded ===
                                                      true && (
                                                      <SemanticGrid.Column>
                                                        <span
                                                          className={
                                                            classes.textFieldName
                                                          }
                                                        >
                                                          Addons!
                                                        </span>
                                                        <div>
                                                          {isFetchingAddons ? (
                                                            <Skeleton />
                                                          ) : (
                                                            <>
                                                              {addonData?.data
                                                                ?.length > 0 &&
                                                                addonData?.data?.map(
                                                                  (ele) => (
                                                                    <div
                                                                      onClick={() => {
                                                                        openAddonEditModal(
                                                                          ele,
                                                                        )
                                                                        setCurrentVisitEdit(
                                                                          data?.visit,
                                                                        )
                                                                      }}
                                                                    >
                                                                      <FormControlLabel
                                                                        style={{
                                                                          display:
                                                                            'block',
                                                                        }}
                                                                        disabled={
                                                                          currentOrder?.order_status ===
                                                                          'Draft'
                                                                            ? true
                                                                            : false
                                                                        }
                                                                        value={
                                                                          ele?.title
                                                                        }
                                                                        control={
                                                                          <Checkbox color="primary" />
                                                                        }
                                                                        label={
                                                                          ele?.title
                                                                        }
                                                                        labelPlacement="end"
                                                                        checked={
                                                                          selectedIDs?.indexOf(
                                                                            ele.id,
                                                                          ) > -1
                                                                            ? true
                                                                            : false
                                                                        }
                                                                        onClick={(
                                                                          event,
                                                                        ) => {
                                                                          // setSelectedAddons([])
                                                                          addonHandler(
                                                                            event
                                                                              .target
                                                                              .checked,
                                                                            ele,
                                                                            index,
                                                                          )
                                                                          setCurrentAddonIndex(
                                                                            index,
                                                                          )
                                                                        }}
                                                                      />
                                                                    </div>
                                                                  ),
                                                                )}
                                                            </>
                                                          )}
                                                        </div>
                                                      </SemanticGrid.Column>
                                                    )}
                                                    <SemanticGrid.Column
                                                      item
                                                      xs={3}
                                                    >
                                                      <span
                                                        className={
                                                          classes.textFieldName
                                                        }
                                                      >
                                                        Notes / Instruction
                                                      </span>
                                                      <div>
                                                        <TextField
                                                          id="outlined-multiline-static"
                                                          multiline
                                                          rows={4}
                                                          disabled={
                                                            data?.expanded ===
                                                            true
                                                              ? false
                                                              : true
                                                          }
                                                          style={{
                                                            width: '100%',
                                                          }}
                                                          variant="outlined"
                                                          style={{
                                                            display: 'block',
                                                          }}
                                                          value={
                                                            data?.visit
                                                              ?.customer_note
                                                          }
                                                          onChange={(e) =>
                                                            handleAddonChange(
                                                              e,
                                                              index,
                                                              'customer_note',
                                                            )
                                                          }
                                                        />
                                                      </div>
                                                    </SemanticGrid.Column>
                                                  </SemanticGrid>
                                                  {data?.expanded === true && (
                                                    <SemanticGrid
                                                      style={{
                                                        padding: '1rem 0rem',
                                                      }}
                                                    >
                                                      <SemanticGrid.Column>
                                                        <form
                                                          onSubmit={
                                                            VisitHandleSubmit
                                                          }
                                                        >
                                                          <Button
                                                            onClick={() =>
                                                              setCurrentVisitEdit(
                                                                data?.visit,
                                                              )
                                                            }
                                                            style={{
                                                              display: 'block',
                                                            }}
                                                          >
                                                            Update Note
                                                          </Button>
                                                        </form>
                                                      </SemanticGrid.Column>
                                                    </SemanticGrid>
                                                  )}
                                                </Card>
                                              </Box>
                                            </AccordionDetailsUI>
                                          </AccordionUI>
                                        ) : (
                                          <Typography
                                            style={{padding: '0.5rem 1rem'}}
                                          >
                                            No Visit Found
                                          </Typography>
                                        )
                                      ) : data.hasOwnProperty('quote_qa') ===
                                        true ? (
                                        data?.quote_qa?.length > 0 ? (
                                          <AccordionUI
                                            defaultExpanded={
                                              data?.expanded === true
                                                ? true
                                                : false
                                            }
                                            elevation={0}
                                            style={{marginTop: '1rem'}}
                                          >
                                            <AccordionSummaryUI
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                            >
                                              <Typography>
                                                Visit Quotation Details
                                              </Typography>
                                            </AccordionSummaryUI>
                                            <AccordionDetailsUI>
                                              <Grid container spacing={3}>
                                                {data?.quote_qa?.map(
                                                  (ele, i) => (
                                                    <Box
                                                      style={{
                                                        padding:
                                                          '0.5rem 1rem 0.8rem',
                                                      }}
                                                    >
                                                      <Card
                                                        className={
                                                          classes.contentPadding
                                                        }
                                                        style={{
                                                          marginTop:
                                                            i >= 1
                                                              ? '1rem'
                                                              : '0rem',
                                                        }}
                                                      >
                                                        <Grid
                                                          item
                                                          xs={12}
                                                          md={12}
                                                          lg={12}
                                                        >
                                                          <Box>
                                                            <span
                                                              className={
                                                                classes.textFieldName
                                                              }
                                                            >
                                                              QA Title
                                                            </span>
                                                            <Box>
                                                              {ele?.title !==
                                                              null
                                                                ? ele?.title
                                                                : '~'}
                                                            </Box>
                                                          </Box>
                                                          <Box>
                                                            <span
                                                              className={
                                                                classes.textFieldName
                                                              }
                                                            >
                                                              QA Value
                                                            </span>
                                                            <Box>
                                                              {ele?.text_value !==
                                                                null &&
                                                              ele?.text_value !==
                                                                'null'
                                                                ? ele?.text_value
                                                                : '~'}
                                                            </Box>
                                                          </Box>
                                                          {ele?.is_recurring !==
                                                            0 && (
                                                            <>
                                                              <Box>
                                                                <span
                                                                  className={
                                                                    classes.textFieldName
                                                                  }
                                                                >
                                                                  Recurring
                                                                </span>
                                                                <Box>
                                                                  Enabled
                                                                </Box>
                                                              </Box>
                                                              <Box>
                                                                <span
                                                                  className={
                                                                    classes.textFieldName
                                                                  }
                                                                >
                                                                  Recurring
                                                                  Period
                                                                </span>
                                                                <Box>
                                                                  {ele?.recurring_price
                                                                    ? ele?.recurring_price
                                                                    : '~'}
                                                                </Box>
                                                              </Box>
                                                              <Box>
                                                                <span
                                                                  className={
                                                                    classes.textFieldName
                                                                  }
                                                                >
                                                                  Minimum visit
                                                                </span>
                                                                <Box>
                                                                  {ele?.minimum_visit !==
                                                                    'null' &&
                                                                  ele?.minimum_visit !==
                                                                    null
                                                                    ? ele?.minimum_visit
                                                                    : '~'}
                                                                </Box>
                                                              </Box>
                                                            </>
                                                          )}
                                                        </Grid>
                                                      </Card>
                                                    </Box>
                                                  ),
                                                )}
                                              </Grid>
                                            </AccordionDetailsUI>
                                          </AccordionUI>
                                        ) : (
                                          <Typography
                                            style={{padding: '0.5rem 1rem'}}
                                          >
                                            No Quote QA Found
                                          </Typography>
                                        )
                                      ) : data.hasOwnProperty('quotation') ===
                                        true ? (
                                        data?.quotation !== {} ? (
                                          <AccordionUI
                                            defaultExpanded={
                                              data?.expanded === true
                                                ? true
                                                : false
                                            }
                                            elevation={0}
                                            style={{marginTop: '1rem'}}
                                          >
                                            <AccordionSummaryUI
                                              aria-controls="panel1a-content"
                                              id="panel1a-header"
                                            >
                                              <Typography>
                                                Visit Quotation Details
                                              </Typography>
                                            </AccordionSummaryUI>
                                            <AccordionDetailsUI>
                                              <Box
                                                style={{
                                                  padding: '0.5rem 1rem 0.8rem',
                                                  width: '100%',
                                                }}
                                              >
                                                <Card
                                                  className={
                                                    classes.contentPadding
                                                  }
                                                >
                                                  <SemanticGrid
                                                    stackable
                                                    columns="equal"
                                                  >
                                                    <SemanticGrid.Column>
                                                      <Box>
                                                        <span
                                                          className={
                                                            classes.textFieldName
                                                          }
                                                        >
                                                          Quote Title
                                                        </span>
                                                        <Box>
                                                          {data?.quotation
                                                            ?.quote_title !==
                                                          null
                                                            ? data?.quotation
                                                                ?.quote_title
                                                            : '~'}
                                                        </Box>
                                                      </Box>
                                                    </SemanticGrid.Column>
                                                    <SemanticGrid.Column>
                                                      <Box>
                                                        <span
                                                          className={
                                                            classes.textFieldName
                                                          }
                                                        >
                                                          Quote Description
                                                        </span>
                                                        <Box>
                                                          {data?.quotation
                                                            ?.quote_description !==
                                                          null
                                                            ? data?.quotation
                                                                ?.quote_description
                                                            : '~'}
                                                        </Box>
                                                      </Box>
                                                    </SemanticGrid.Column>
                                                    <SemanticGrid.Column>
                                                      <Box>
                                                        <span
                                                          className={
                                                            classes.textFieldName
                                                          }
                                                        >
                                                          Quote Status
                                                        </span>
                                                        <Box>
                                                          {data?.quotation
                                                            ?.status !== null
                                                            ? data?.quotation?.status.toUpperCase()
                                                            : '~'}
                                                        </Box>
                                                      </Box>
                                                    </SemanticGrid.Column>
                                                  </SemanticGrid>

                                                  <Box style={{width: '50%'}}>
                                                    <SemanticGrid
                                                      stackable
                                                      columns={'equal'}
                                                    >
                                                      {data?.quotation
                                                        ?.is_recurring ===
                                                        true &&
                                                        data?.quotation
                                                          .recurring_details
                                                          ?.length > 0 &&
                                                        data?.quotation.recurring_details?.map(
                                                          (ele, i) => (
                                                            <SemanticGrid.Column>
                                                              <Card
                                                                style={{
                                                                  padding:
                                                                    '1rem',
                                                                  marginBottom:
                                                                    i > 1
                                                                      ? '0.5rem'
                                                                      : '0.8rem',
                                                                }}
                                                              >
                                                                <div>
                                                                  <div
                                                                    style={
                                                                      styles.cardContent
                                                                    }
                                                                  >
                                                                    {isRejected ===
                                                                      false && (
                                                                      <div
                                                                        style={
                                                                          styles.cardToggle
                                                                        }
                                                                      >
                                                                        <Radio
                                                                          disabled={
                                                                            data
                                                                              ?.quotation
                                                                              ?.status ===
                                                                              'accepted' ||
                                                                            data
                                                                              ?.quotation
                                                                              ?.status ===
                                                                              'rejected'
                                                                              ? true
                                                                              : false
                                                                          }
                                                                          checked={
                                                                            ele?.is_accepted ===
                                                                            true
                                                                              ? true
                                                                              : false
                                                                          }
                                                                          onChange={() => {
                                                                            setCurrentQuotationIndex(
                                                                              index,
                                                                            )
                                                                            setSelectedRecurring(
                                                                              ele,
                                                                            )
                                                                            setCurrentQuotationEdit(
                                                                              data,
                                                                            )
                                                                          }}
                                                                        />
                                                                      </div>
                                                                    )}
                                                                    <div>
                                                                      <div>
                                                                        <div
                                                                          style={
                                                                            styles.flexDiv
                                                                          }
                                                                        >
                                                                          <h4>
                                                                            Recurring
                                                                            Period:{' '}
                                                                            {
                                                                              ele?.recurring_period
                                                                            }
                                                                          </h4>
                                                                        </div>
                                                                      </div>
                                                                      <div>
                                                                        <div
                                                                          style={
                                                                            styles.flexDiv
                                                                          }
                                                                        >
                                                                          <h4>
                                                                            Minimum
                                                                            Period:{' '}
                                                                            {
                                                                              ele?.recurring_min_period
                                                                            }
                                                                          </h4>
                                                                        </div>
                                                                        <div
                                                                          style={
                                                                            styles.flexDiv
                                                                          }
                                                                        >
                                                                          <h4>
                                                                            Recurring
                                                                            Price:{' '}
                                                                            {`£ ${ele?.recurring_price}`}
                                                                          </h4>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </Card>
                                                            </SemanticGrid.Column>
                                                          ),
                                                        )}
                                                    </SemanticGrid>
                                                    {data?.quotation
                                                      ?.is_recurring === true &&
                                                    touched.recurring_selection &&
                                                    errors.recurring_selection ? (
                                                      <FormHelperText
                                                        error={
                                                          !!errors.recurring_selection
                                                        }
                                                      >
                                                        Recurring is Required
                                                      </FormHelperText>
                                                    ) : (
                                                      ''
                                                    )}

                                                    {data?.quotation
                                                      ?.is_parts === true
                                                      ? data?.quotation?.parts
                                                          ?.length > 0
                                                        ? data?.quotation?.parts?.map(
                                                            (part, i) => {
                                                              return (
                                                                <Box
                                                                  style={{
                                                                    marginBottom:
                                                                      i > 1
                                                                        ? '0.5rem'
                                                                        : '0.8rem',
                                                                  }}
                                                                >
                                                                  <Card
                                                                    style={
                                                                      styles.cardContent
                                                                    }
                                                                  >
                                                                    <div
                                                                      style={
                                                                        styles.cardToggle
                                                                      }
                                                                    >
                                                                      <Checkbox
                                                                        disabled={
                                                                          data
                                                                            ?.quotation
                                                                            ?.status ===
                                                                            'accepted' ||
                                                                          data
                                                                            ?.quotation
                                                                            ?.status ===
                                                                            'rejected'
                                                                            ? true
                                                                            : false
                                                                        }
                                                                        checked={
                                                                          part?.is_accepted ===
                                                                          true
                                                                            ? true
                                                                            : false
                                                                        }
                                                                        onChange={(
                                                                          e,
                                                                          checked,
                                                                        ) => {
                                                                          handlePartsAdd(
                                                                            e,
                                                                            checked,
                                                                            part,
                                                                          )
                                                                          handleQuoteParts(
                                                                            part,
                                                                            index,
                                                                            'quote_part',
                                                                            checked,
                                                                          )
                                                                        }}
                                                                      />
                                                                    </div>
                                                                    <div
                                                                      style={{
                                                                        display:
                                                                          'flex',
                                                                      }}
                                                                    >
                                                                      <h4>
                                                                        {part?.parts_name.toUpperCase()}
                                                                      </h4>
                                                                      <h4
                                                                        style={{
                                                                          paddingLeft:
                                                                            '0.8rem',
                                                                        }}
                                                                      >{`£ ${part?.parts_price}`}</h4>
                                                                    </div>
                                                                  </Card>
                                                                </Box>
                                                              )
                                                            },
                                                          )
                                                        : 'No Parts Found'
                                                      : ''}
                                                    {data?.quotation
                                                      ?.is_parts === true &&
                                                    touched.parts_selection &&
                                                    errors.parts_selection ? (
                                                      <FormHelperText
                                                        error={
                                                          !!errors.parts_selection
                                                        }
                                                      >
                                                        Parts is Required
                                                      </FormHelperText>
                                                    ) : (
                                                      ''
                                                    )}

                                                    {/* Recurring & part not selected, display labour rate as Price */}
                                                    {data?.quotation
                                                      ?.is_parts === false &&
                                                      data?.quotation
                                                        ?.is_recurring ===
                                                        false && (
                                                        <Message
                                                          style={{width: '30%'}}
                                                        >
                                                          <Message.Header>
                                                            Labour Rate Details
                                                          </Message.Header>
                                                          <p>{`£ ${
                                                            data?.quotation
                                                              ?.labour_rate !==
                                                            null
                                                              ? data?.quotation
                                                                  ?.labour_rate
                                                              : 0
                                                          }`}</p>
                                                        </Message>
                                                      )}

                                                    <Segment clearing>
                                                      <span>Quote Total</span>
                                                      <p>
                                                        £{' '}
                                                        {data?.quotation?.total}
                                                      </p>
                                                    </Segment>
                                                    <form
                                                      onSubmit={
                                                        submitType == 'accept'
                                                          ? handleSubmit
                                                          : rejecthandleSubmit
                                                      }
                                                    >
                                                      {data?.quotation
                                                        ?.status ===
                                                      'approve' ? (
                                                        <>
                                                          {data?.quotation
                                                            ?.is_parts ===
                                                          false ? (
                                                            <Button
                                                              disabled={
                                                                selectedRecurring ===
                                                                null
                                                              }
                                                              onClick={() => {
                                                                setCurrentQuoteEdit(
                                                                  data?.quotation,
                                                                )
                                                                setSubmitType(
                                                                  'accept',
                                                                )
                                                              }}
                                                              positive
                                                            >
                                                              Accept
                                                            </Button>
                                                          ) : (
                                                            <Button
                                                              disabled={
                                                                selectedParts ===
                                                                []
                                                              }
                                                              onClick={() => {
                                                                setCurrentQuoteEdit(
                                                                  data?.quotation,
                                                                )
                                                                setSubmitType(
                                                                  'accept',
                                                                )
                                                              }}
                                                              positive
                                                            >
                                                              Accept
                                                            </Button>
                                                          )}
                                                          <Button
                                                            onClick={() => {
                                                              setCurrentQuoteEdit(
                                                                data?.quotation,
                                                              )
                                                              setSubmitType(
                                                                'reject',
                                                              )
                                                            }}
                                                            negative
                                                          >
                                                            Reject
                                                          </Button>
                                                        </>
                                                      ) : (
                                                        ''
                                                      )}
                                                    </form>
                                                  </Box>
                                                </Card>
                                              </Box>
                                            </AccordionDetailsUI>
                                          </AccordionUI>
                                        ) : (
                                          <Typography
                                            style={{padding: '0.5rem 1rem'}}
                                          >
                                            No Visit Found
                                          </Typography>
                                        )
                                      ) : (
                                        ''
                                      )}
                                    </Box>
                                  </Card>
                                </Box>
                              </Box>
                            )
                          })}
                      </Box>
                    )}
                  </div>
                </SemanticGrid.Column>
              </SemanticGrid>
            </div>
          </Dialog>

          {/* Payment Modal */}
          <Dialog
            open={isOrderPayModalOpen}
            fullWidth
            fullScreen
            onClose={closePayModal}
          >
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3 style={styles.dialogTitle}>Payment</h3>
                <IconButton
                  onClick={() => closePayModal()}
                  style={{marginRight: '1rem'}}
                  className={styles.closeIcon}
                >
                  <Close />
                </IconButton>
              </div>
              <SemanticGrid stackable columns={2}>
                <SemanticGrid.Row>
                  <SemanticGrid.Column>
                    <SemanticGrid stackable columns={2}>
                      <SemanticGrid.Row>
                        <SemanticGrid.Column>
                          <div style={styles.paymentContent}>
                            <Typography component="h1">
                              Product Details
                            </Typography>
                            <div style={styles.iconContentPD}>
                              <Icon name="info" />
                              <div style={styles.iconContentDetails}>
                                <Typography component="h1">Product</Typography>
                                <Typography component="h1">
                                  {currentOrderDetails?.product_details?.title}
                                </Typography>
                              </div>
                            </div>
                            <div style={styles.iconContentPD}>
                              <Icon name="time" />
                              <div style={styles.iconContentDetails}>
                                <Typography component="h1">
                                  Purchase Date
                                </Typography>
                                <Typography component="h1">
                                  {moment(
                                    currentOrderDetails?.date_of_purchase,
                                  ).format('LL')}
                                </Typography>
                              </div>
                            </div>
                            <div style={styles.iconContentPD}>
                              <Icon name="time" />
                              <div style={styles.iconContentDetails}>
                                <Typography component="h1">
                                  Recurring
                                </Typography>
                                <Typography component="h1">
                                  {currentOrderDetails?.is_recurring
                                    ? 'Enabled'
                                    : 'Disabled'}{' '}
                                  for every{' '}
                                  {currentOrderDetails?.recurring_period} weeks.
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </SemanticGrid.Column>
                        <SemanticGrid.Column>
                          <div style={styles.paymentContent}>
                            <Typography component="h1">
                              Pricing Details
                            </Typography>
                            <div style={styles.iconContentPD}>
                              <Icon name="add" />
                              <div style={styles.iconContentDetails}>
                                <Typography component="h1">Addons</Typography>
                                {currentOrderDetails?.product_addons?.length >
                                  0 &&
                                  currentOrderDetails?.product_addons?.map(
                                    (addon) => (
                                      <div>
                                        <h4>{addon?.title}</h4>
                                        <p>£ {addon?.price}</p>
                                      </div>
                                    ),
                                  )}
                              </div>
                            </div>

                            <div style={styles.iconContentPD}>
                              <Icon name="minus circle" />
                              <div style={styles.iconContentDetails}>
                                <Typography component="h1">Discount</Typography>
                                <Typography component="h1">
                                  £ {currentOrderDetails?.discount}
                                </Typography>
                              </div>
                            </div>

                            <div style={styles.iconContentPD}>
                              <Icon name="pound" />
                              <div style={styles.iconContentDetails}>
                                <Typography component="h1">Total</Typography>
                                <Typography component="h1">
                                  £ {currentOrderDetails?.total_price}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </SemanticGrid.Column>
                      </SemanticGrid.Row>
                    </SemanticGrid>
                  </SemanticGrid.Column>
                  <SemanticGrid.Column>
                    {cardDetails?.length > 0 && <h3>Cards</h3>}
                    {cardDetails?.length > 0 &&
                      cardDetails.map((ele, i) => {
                        return (
                          <>
                            <Card
                              variant="outlined"
                              style={{marginBottom: '1rem'}}
                            >
                              <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                  {ele.brand}
                                </Typography>
                                <Typography variant="body2" component="h4">
                                  xxxx xxxx xxxx {ele.last4}
                                </Typography>
                                <Typography variant="body2" component="p">
                                  {ele.exp_month} / {ele.exp_year}
                                </Typography>

                                <Checkbox
                                  checked={
                                    selectedPaymentMethod?.id == ele.id
                                      ? true
                                      : false
                                  }
                                  onChange={(e) =>
                                    setSelectedPaymentMethod(ele)
                                  }
                                />
                              </CardContent>
                            </Card>
                          </>
                        )
                      })}
                    <Divider horizontal>Or</Divider>

                    <h3>Add New Card</h3>
                    <Segment item xs={12} style={{marginBottom: '1rem'}}>
                      <Elements stripe={stripePromise}>
                        <AddNewCard />
                      </Elements>
                    </Segment>

                    {selectedPaymentMethod?.id !== undefined && (
                      <SemanticGrid item xs={12}>
                        <Elements stripe={stripePromise}>
                          <PayViaCard />
                        </Elements>
                      </SemanticGrid>
                    )}
                  </SemanticGrid.Column>
                </SemanticGrid.Row>
              </SemanticGrid>
            </div>
          </Dialog>

          <Dialog
            open={isAddonModalOpen}
            fullWidth={'sm'}
            maxWidth={'sm'}
            onClose={closeAddonEditModal}
          >
            <DialogContent>
              <div>
                <h4>{currentAddon?.title}</h4>
                <p>£ {currentAddon?.price}</p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  setConfirmationModal({isOpen: true, isConfirmed: false})
                }
              >
                Pay
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={confirmationModal?.isOpen}
            fullWidth={'sm'}
            maxWidth={'sm'}
            onClose={() =>
              setConfirmationModal({isOpen: false, isConfirmed: false})
            }
          >
            <DialogContent>
              Are you sure you want to add this addon?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  setConfirmationModal({isOpen: false, isConfirmed: false})
                }
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setConfirmationModal({isOpen: false, isConfirmed: true})
                  handleAddonPayment()
                  closeAddonEditModal()
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {/* Site Footer Start */}
      <section className="site-footer-wrapper">
        <div className="site-footer-container container">
          <SemanticGrid stackable columns={3} className="site-footer-content">
            <SemanticGrid.Column className="site-footer-col-one">
              <ul>
                <li>Urbanserve</li>
                <li>Find Services</li>
                <li>About</li>
                <li>Contact</li>
                <li>Tradespeople</li>
              </ul>
            </SemanticGrid.Column>
            <SemanticGrid.Column
              className="site-footer-col-two vertical-space"
              style={{display: 'flex'}}
            >
              <div>
                <h3>Data Safe</h3>
                <p>Your details are kept safe and never shared</p>
              </div>
              <div>
                <h3>Gas Safe</h3>
                <p>Our engineers are vetted and fully qualifed</p>
              </div>
            </SemanticGrid.Column>
            <SemanticGrid.Column className="site-footer-col-three">
              <div>
                <h3>Download Now</h3>
                <div className="site-footer-app-links">
                  <img src="/images/footer-apple-app.png" width="100%" />
                  <img src="/images/footer-gapp.png" width="100%" />
                </div>
              </div>
              <div className="site-footer-payment">
                <img src="/images/footer-payment.png" width="100%" />
              </div>
            </SemanticGrid.Column>
          </SemanticGrid>
          <SemanticGrid textAlign="center" className="site-footer-logo">
            <SemanticGrid.Column mobile={16}>
              <img src="/images/logo.png" width="100%" alt="" />
              <p className="site-footer-text">
                Copyright © 2010 - 2021 Urbanserve Ltd. All rights reserved.
              </p>
            </SemanticGrid.Column>
          </SemanticGrid>
        </div>
      </section>
      {/* Site Footer End */}
    </>
  )
}

Visits.propTypes = {}

const mapStateToProps = (state) => ({
  isDeleteModalOpen: state.VisitsReducer?.isDeleteModalOpen,
  rejectingVisitDetails: state.VisitsReducer?.rejectingVisitDetails,
  isOrderEditModalOpen: state.FinalOrderReducer?.isOrderEditModalOpen,
  currentOrder: state.FinalOrderReducer?.currentOrder,
  orderFlowData: state.FinalOrderReducer?.orderFlowData,
  isVisitEditModalOpen: state.FinalOrderReducer?.isVisitEditModalOpen,
  currentVisit: state.FinalOrderReducer?.currentVisit,
  addonData: state.FinalOrderReducer?.addonData,
  isQuotationEditModalOpen: state.FinalOrderReducer?.isQuotationEditModalOpen,
  currentQuotation: state.FinalOrderReducer?.currentQuotation,
  visitQuotes: state.QuoteDetailsReducer?.visitQuotes,
  isFetchingOrderFlow: state.FinalOrderReducer?.isFetchingOrderFlow,
  isFetchingVisitQuotes: state.QuoteDetailsReducer?.isFetchingVisitQuotes,
  isFetchingAddons: state.FinalOrderReducer?.isFetchingAddons,
  isOrderPayModalOpen: state.FinalOrderReducer?.isOrderPayModalOpen,
  currentPaymentFor: state.FinalOrderReducer?.currentPaymentFor,
  isFetchingOrderEditing: state.FinalOrderReducer?.isFetchingOrderEditing,
  currentOrderDetails: state.FinalOrderReducer?.currentOrderDetails,
  isFetchingCardDetails: state.CardDetailsReducer?.isFetchingCardDetails,
  cardDetails: state.CardDetailsReducer?.cardDetails,
  isAddonModalOpen: state?.FinalOrderReducer?.isAddonModalOpen,
  currentAddon: state?.FinalOrderReducer?.currentAddon,
})

function mapDispatchToProps(dispatch) {
  return {
    fetchVisitsList: (data) => dispatch(getVisitsRequest(data)),
    openAddModal: (data) => dispatch(openVisitAddModal(data)),
    addVisit: (...args) => dispatch(addVisit(...args)),
    openEditModal: (...args) => dispatch(openEditModal(...args)),
    closeEditModal: () => dispatch(closeEditModal()),
    fetchOrderFlow: (...args) => dispatch(getOrderFlow(...args)),
    openVisitEditModal: (...args) => dispatch(openVisitEditModal(...args)),
    closeVisitEditModal: () => dispatch(closeVisitEditModal()),
    fetchAddons: (...args) => dispatch(getAddons(...args)),
    editVisit: (...args) => dispatch(editVisit(...args)),
    openQuotationEditModal: (...args) =>
      dispatch(openQuotationEditModal(...args)),
    closeQuotationEditModal: (...args) =>
      dispatch(closeQuotationEditModal(...args)),
    fetchCurrentQuote: (...args) => dispatch(getSingleQuote(...args)),
    saveQuote: (...args) => dispatch(saveQuote(...args)),
    fetchQuotes: (...args) => dispatch(getQuotes(...args)),
    getVisitQuotes: (...args) => dispatch(getVisitQuotes(...args)),
    openPayModal: (...args) => dispatch(openPayModal(...args)),
    closePayModal: () => dispatch(closePayModal()),
    getOrderDetails: (...args) => dispatch(getOrderDetails(...args)),
    fetchCardsData: (...args) => dispatch(getCardsRequest(...args)),
    attachPaymentMethod: (payload) => dispatch(attachPaymentMethod(payload)),
    editOrder: (data) => dispatch(editOrder(data)),
    openAddonEditModal: (data) => dispatch(openAddonEditModal(data)),
    closeAddonEditModal: (data) => dispatch(closeAddonEditModal(data)),
    editAddon: (data) => dispatch(editAddon(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Visits)
