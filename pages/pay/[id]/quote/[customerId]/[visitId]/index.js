import React, {useEffect, useState} from 'react'
import SiteFooter from '../../../../../../components/SiteFooter'
import SiteMainNavbar from '../../../../../../components/SiteMain/SiteMainNavbar'
import Router, {useRouter} from 'next/router'
import {
  getQuoteAdjustData,
  acceptQuoteAdjust,
  rejectQuoteAdjust,
  payQuoteAdjust,
} from '../../../../../../Stores/FinalOrder/actions'
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@material-ui/core'
import {Loader, Checkbox} from 'semantic-ui-react'
import {
  getCardsRequest,
  attachPaymentMethod,
} from '../../../../../../Stores/CardDetails/actions'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {errorAlert, successAlert} from '../../../../../../Stores/Alerts/actions'
import {Close} from '@material-ui/icons'
import InvalidAccess from '../../../../../../components/InvalidAccess'
import StepperQuote from '../../../../../../components/StepperQuote'
const useStyles = makeStyles((theme) => ({
  bgapp: {
    backgroundColor: 'white',
    borderBottom: '2px solid #dee3e7',
    position: 'fixed',
    padding: '0.8rem 0rem',
  },
  logo: {
    width: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  imageBox: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  productImage: {
    minHeight: '40px',
    width: '40px',
    height: '100%',
    objectFit: 'cover',
    marginRight: '10px',
  },
  productName: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#21262b',
    paddingBottom: '1rem',
  },
  productTemplateTitle: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#21262b',
  },
  productTemplate: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: 'rgba(33, 38, 43, 0.7)',
  },
  MainContainer: {
    paddingTop: '3rem',
    marginBottom: '75px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3rem',
    },
  },
  paymentBox: {
    width: '100%',
  },
  paymentContainer: {
    backgroundColor: 'white',
    position: 'fixed',
    bottom: '0',
    width: '100vw',
    borderTop: '1px solid #e9e9ea',
    borderBottom: '1px solid #e9e9ea',
    zIndex: 10,
  },
  paymentBox: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1280px',
    padding: '30px 24px',
    borderTop: '1px solid #e9e9ea',
  },
  payBtn: {
    padding: '10px 45px',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '17px',
      padding: '4px 24px',
    },
  },
  paymentColumn: {
    [theme.breakpoints.down('sm')]: {
      padding: '14px 7px 0px !important',
      textAlign: 'center',
    },
  },
  paymentTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  cardTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  progress: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
  info: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '18px',
    color: '#21262b',
    marginBottom: '1rem',
  },
  cardHeader: {
    fontFamily: 'Urbanist__bold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '18px',
    color: '#21262b',
    marginBottom: '1rem',
  },
  addressTitle: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '14px',
    color: 'rgba(33, 38, 43, 0.7)',
    letterSpacing: '0.02em',
  },
  label: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: 'rgba(33, 38, 43, 0.7)',
  },
  subLabel: {
    fontFamily: 'Urbanist__bold',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#21262b',
  },
  paymentContent: {
    [theme.breakpoints.up('768')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  disableBtn: {
    fontFamily: 'Urbanist',
    fontWeight: 'normal',
    backgroundColor: '#e9e9ea',
    fontSize: '14px',
    lineHeight: '16px',
    color: 'rgba(33,38,43,.5)',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    [theme.breakpoints.up('768')]: {
      width: '175px',
    },
  },
  btn: {
    fontFamily: 'Urbanist',
    fontWeight: 'normal',
    backgroundColor: '#0587ff',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#fff',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    [theme.breakpoints.up('768')]: {
      width: '175px',
    },
    '&:hover': {
      background: '#0587ff',
      color: '#fff',
    },
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  paymentSummary: {
    marginBottom: '10px',
    textAlign: 'center',
    [theme.breakpoints.up('768')]: {
      marginBottom: '0px',
    },
  },
  infoBG: {
    backgroundColor: '#5bc489',
    padding: '0.8rem 0.6rem',
    marginBottom: '1rem',
    borderRadius: '3px',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  itemPB: {
    marginBottom: '0.6rem',
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
  summary__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#21262b',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '20px',
    },
  },
  section_header: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.05em',
    paddingBottom: '0.857rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.286rem',
      lineHeight: '2.071rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.714rem;',
      lineHeight: '3.071rem',
    },
  },
}))

function Pay() {
  const router = useRouter()
  const classes = useStyles()
  const {id, customerId, visitId} = router?.query
  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  const [loader, setLoader] = useState(true)

  const dispatch = useDispatch()
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_APP_STRIPE_KEY)

  const {
    isFetchingQuoteAdjust,
    quoteAdjustData,
    isAcceptingQuoteAdjust,
    isRejectingQuoteAdjust,
    isPayingQuoteAdjust,
  } = useSelector((state) => state?.FinalOrderReducer)

  const {
    cardDetails,
    isFetchingCardDetails,
    isAttachingPaymentMethod,
  } = useSelector((state) => state?.CardDetailsReducer)

  const isLoading =
    isFetchingQuoteAdjust ||
    isAcceptingQuoteAdjust ||
    isRejectingQuoteAdjust ||
    isPayingQuoteAdjust ||
    isFetchingCardDetails ||
    isAttachingPaymentMethod
  const canPerformAction = () => {
    let action = false
    if (quoteAdjustData?.quote_adjustment_status === 'pending') {
      action = true
    }
    if (quoteAdjustData?.quote_adjustment_status === 'reject') {
      action = false
    }
    if (quoteAdjustData?.quote_adjustment_status === 'accept') {
      action = false
    }

    return action
  }
  const canMakePayment = () => {
    let action = false
    if (quoteAdjustData?.quote_adjustment_status === 'pending') {
      action = false
    }
    if (quoteAdjustData?.quote_adjustment_status === 'reject') {
      action = false
    }
    if (quoteAdjustData?.quote_adjustment_status === 'accept') {
      if (quoteAdjustData?.is_paid_quote_adjustment === true) {
        action = false
      }
      if (quoteAdjustData?.is_paid_quote_adjustment === false) {
        action = true
      }
    }

    return action
  }

  const [loggedIn, setLoggedIn] = React.useState(false)

  // Check if user is logged in
  useEffect(() => {
    if (userInfo && userInfo?.id !== null) {
      setLoggedIn(true)
    }
  }, [userInfo])
  useEffect(() => {
    loggedIn &&
      dispatch(
        getQuoteAdjustData({
          customer_id: customerId,
          order_id: id,
        }),
      )
    setCurrentActionType('')
  }, [id, customerId, loggedIn])

  useEffect(() => {
    if (quoteAdjustData?.is_quote_adjustment && canMakePayment()) {
      dispatch(getCardsRequest({order_id: id}))
    }
  }, [quoteAdjustData])

  const displayAddresses = (customer) => {
    return [
      customer?.address_1,
      customer?.address_2,
      customer?.address_3,
      customer?.address_4,
      customer?.city,
      customer?.postcode,
      customer?.county,
      customer?.country,
    ]
      .filter((x) => !!x)
      .join('\n')
  }

  const renderStatus = () => {
    let status = ''
    if (quoteAdjustData?.quote_adjustment_status === 'pending') {
      status = 'No action has been taken yet!'
    }
    if (quoteAdjustData?.quote_adjustment_status === 'accept') {
      if (quoteAdjustData?.is_paid_quote_adjustment === true) {
        status = 'Quote has been accepted and payment has been made!'
      }
      if (quoteAdjustData?.is_paid_quote_adjustment === false) {
        status = 'Quote has been accepted and payment is pending!'
      }
    }
    if (quoteAdjustData?.quote_adjustment_status === 'reject') {
      if (quoteAdjustData?.continue_existing_order === 0) {
        status = 'Quote has been rejected and existing order is cancelled!'
      }
      if (quoteAdjustData?.continue_existing_order === 1) {
        status =
          'Quote has been rejected and existing order will be processed !'
      }
    }
    return status
  }
  const [
    isNewPaymentMethodModelOpen,
    setIsNewPaymentMethodModelOpen,
  ] = useState(false)
  const [continue_existing_order, set_continue_existing_order] = useState(true)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [isOrderAssigned, setIsOrderAssigned] = useState(null)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [isQuoteSent, setIsQuoteSent] = useState(false)
  const [currentActionType, setCurrentActionType] = useState('')
  const [isQuoteActionTaken, setIsQuoteActionTaken] = useState({
    actionTaken: false,
    actionType: '',
  })

  useEffect(() => {
    if (quoteAdjustData?.quote_adjustment_status === 'accept') {
      setIsQuoteActionTaken({
        actionTaken: true,
        actionType: 'accept',
      })
    } else if (quoteAdjustData?.quote_adjustment_status === 'reject') {
      setIsQuoteActionTaken({
        actionTaken: true,
        actionType: 'reject',
      })
    } else {
      setIsQuoteActionTaken({
        actionTaken: false,
        actionType: '',
      })
    }
  }, [quoteAdjustData])
  /* Action Type Handler */
  const onQuoteAction = (action) => {
    setCurrentActionType(action)
  }
  const onQuoteConfirmation = () => {
    setIsConfirmationModalOpen(true)
  }
  /* Action submit handler */
  const handleQuoteActionSubmit = () => {
    setIsConfirmationModalOpen(false)
    if (currentActionType === 'Accept') {
      let data = {
        data: {
          visit_id: visitId,
        },
        orderData: {
          customer_id: customerId,
          order_id: id,
        },
      }
      dispatch(acceptQuoteAdjust(data))
    }
    if (currentActionType === 'Reject') {
      let data = {
        data: {
          visit_id: visitId,
          continue_existing_order: continue_existing_order ? 1 : 0,
        },
        orderData: {
          customer_id: customerId,
          order_id: id,
        },
      }
      dispatch(rejectQuoteAdjust(data))
    }
  }
  /* Confirmation modal title generator */
  const renderActionTitle = () => {
    let title = ''
    if (currentActionType === 'Accept') {
      title = 'Are you sure you want to accept quote?'
    }
    if (currentActionType === 'Reject' && continue_existing_order === false) {
      title = 'Are you sure you want to reject quote and cancel existing order?'
    }
    if (currentActionType === 'Reject' && continue_existing_order === true) {
      title =
        'Are you sure you want to reject quote and continue existing order?'
    }
    return title
  }

  /* Stripe handlers */
  const PayViaCard = () => {
    const stripe = useStripe()
    const elements = useElements()

    const payCard = async (event) => {
      event.preventDefault()
      if (quoteAdjustData?.payment_history?.stripe_client_secret === null) {
        alert(
          'Something went wrong with paymentMethod and payment intents, Please contact administrator',
        )
        return false
      }
      await stripe
        .confirmCardPayment(
          quoteAdjustData?.payment_history?.stripe_client_secret,
          {
            payment_method: selectedPaymentMethod,
          },
        )
        .then(async function (result) {
          // Handle result.error or result.paymentIntent
          if (result.paymentIntent) {
            await dispatch(
              successAlert('Quote difference amount paid successfully!'),
            )
            let data = {
              data: {
                order_id: id,
              },
              orderData: {
                customer_id: customerId,
                order_id: id,
              },
            }
            await dispatch(payQuoteAdjust(data))
          }
          if (result.error) {
            await dispatch(
              errorAlert(
                result.error.message
                  ? result?.error?.message
                  : result?.error?.code,
              ),
            )
            return false
          }
        })
    }

    return (
      <Button
        className={`${classes.btn}`}
        type="button"
        variant="contained"
        color="primary"
        disabled={!stripe || selectedPaymentMethod === null}
        onClick={payCard}
        style={{marginRight: '1rem'}}
      >
        {'Pay'}
      </Button>
    )
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
          id: id,
        }
        await dispatch(attachPaymentMethod(payload))
        await setIsNewPaymentMethodModelOpen(!isNewPaymentMethodModelOpen)
      }
    }

    return (
      // <form onSubmit={handleSubmit1}>
      <Grid container spacing={3}>
        <Grid item sm={12} xs={12}>
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
        </Grid>
        <Grid item sm={12} xs={12}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.btn}
            disabled={!stripe}
            onClick={addPaymentMethod}
          >
            {'Add Card'}
          </Button>
        </Grid>
      </Grid>
    )
  }

  const renderTotalPrice = () => {
    let total = quoteAdjustData?.total_price

    if (quoteAdjustData?.is_quote_adjustment === true) {
      if (quoteAdjustData?.quote_adjustment_status === 'accept') {
        if (quoteAdjustData?.is_paid_quote_adjustment === true) {
          total = JSON.parse(quoteAdjustData?.quote_adjustment)?.adjust_price
        } else if (quoteAdjustData?.is_paid_quote_adjustment === false) {
          total = quoteAdjustData?.total_price
        }
      }
    } else {
      total = quoteAdjustData?.total_price
    }
    return total
  }

  const renderStepData = (type) => {
    let stepNum = ''
    let steps = []
    let active = []
    if (quoteAdjustData?.quote_adjustment_status === 'pending') {
      stepNum = 2
      steps = ['one']
      active = ['two']
    }
    if (quoteAdjustData?.quote_adjustment_status === 'accept') {
      if (quoteAdjustData?.is_paid_quote_adjustment === true) {
        stepNum = 3
        steps = ['one', 'two', 'three']
        active = ['one', 'two', 'three']
      }
      if (quoteAdjustData?.is_paid_quote_adjustment === false) {
        stepNum = 2
        steps = ['one']
        active = ['two']
      }
    }
    if (quoteAdjustData?.quote_adjustment_status === 'reject') {
      if (quoteAdjustData?.continue_existing_order === 0) {
        steps = ['one', 'two', 'three']
        active = ['one', 'two', 'three']
      }
      if (quoteAdjustData?.continue_existing_order === 1) {
        steps = ['one', 'two', 'three']
        active = ['one', 'two', 'three']
      }
    }
    if (type === 'stepNum') {
      return stepNum
    }
    if (type === 'completeStep') {
      return steps
    }
    if (type === 'activeStep') {
      return active
    }
  }

  useEffect(() => {
    let timer1 = setTimeout(() => setLoader(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  return (
    <>
      <SiteMainNavbar />
      {loader ? (
        <div
          style={{
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Loader active inline="centered" />
        </div>
      ) : (
        <>
          {loggedIn ? (
            <>
              {quoteAdjustData?.is_quote_adjustment ? (
                <>
                  <StepperQuote
                    stepNum={renderStepData('stepNum')}
                    activeStep={renderStepData('activeStep')}
                    completeStep={renderStepData('completeStep')}
                  />
                  {isLoading ? (
                    <div
                      style={{
                        height: '50vh',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Loader active inline="centered" />
                    </div>
                  ) : (
                    <Container maxWidth="lg" className={classes.MainContainer}>
                      <Grid container spacing={2}>
                        <Grid item sm={12} md={7}>
                          {/* {!showTimer && countdown === null ? (
              <Skeleton />
            ) : ( */}
                          <Box className={classes.infoBG}>
                            <Typography
                              className={classes.cardHeader}
                              style={{margin: 0, color: '#fff'}}
                            >
                              {renderStatus()}
                            </Typography>
                          </Box>
                          {/* // )} */}

                          <Typography className={classes.section_header}>
                            Quote Adjustment Details
                          </Typography>
                          <Card
                            style={{
                              backgroundColor: '#fff',
                              border: '1px solid #E9E9E9',
                              boxShadow:
                                '4px 4px 4px rgba(219, 229, 239, 0.25)',
                            }}
                          >
                            <CardContent>
                              <Box>
                                <Box
                                  className={`${classes.flexBox} ${classes.itemPB}`}
                                >
                                  <Typography
                                    className={classes.productTemplateTitle}
                                    style={{minWidth: '180px'}}
                                  >
                                    Adjustment Comment
                                  </Typography>
                                  <Typography
                                    className={classes.productTemplate}
                                  >
                                    {quoteAdjustData?.quote_adjustment_comment ??
                                      `~`}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                <Box
                                  className={`${classes.flexBox} ${classes.itemPB}`}
                                >
                                  <Typography
                                    className={classes.productTemplateTitle}
                                    style={{minWidth: '180px'}}
                                  >
                                    Adjustment Status
                                  </Typography>
                                  <Typography
                                    className={classes.productTemplate}
                                  >
                                    {quoteAdjustData?.quote_adjustment_status ===
                                    'pending'
                                      ? `Pending`
                                      : quoteAdjustData?.quote_adjustment_status ===
                                        'accept'
                                      ? 'Accepted'
                                      : 'Rejected'}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box>
                                <Box
                                  className={`${classes.flexBox} ${classes.itemPB}`}
                                >
                                  <Typography
                                    className={classes.productTemplateTitle}
                                    style={{minWidth: '180px'}}
                                  >
                                    Old Price
                                  </Typography>
                                  <Typography
                                    className={classes.productTemplate}
                                  >
                                    £{' '}
                                    {quoteAdjustData?.quote_adjustment
                                      ? JSON?.parse(
                                          quoteAdjustData?.quote_adjustment,
                                        ).old_price
                                      : '~'}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                <Box
                                  className={`${classes.flexBox} ${classes.itemPB}`}
                                >
                                  <Typography
                                    className={classes.productTemplateTitle}
                                    style={{minWidth: '180px'}}
                                  >
                                    Additional Price
                                  </Typography>
                                  <Typography
                                    className={classes.productTemplate}
                                  >
                                    £{' '}
                                    {JSON.parse(
                                      quoteAdjustData?.quote_adjustment,
                                    )?.adjust_price -
                                      JSON.parse(
                                        quoteAdjustData?.quote_adjustment,
                                      )?.old_price}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                <Box
                                  className={`${classes.flexBox} ${classes.itemPB}`}
                                >
                                  <Typography
                                    className={classes.productTemplateTitle}
                                    style={{minWidth: '180px'}}
                                  >
                                    Adjustment Price
                                  </Typography>
                                  <Typography
                                    className={classes.productTemplate}
                                  >
                                    £{' '}
                                    {quoteAdjustData?.quote_adjustment
                                      ? JSON.parse(
                                          quoteAdjustData?.quote_adjustment,
                                        )?.adjust_price
                                      : '~'}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                          {canPerformAction() && (
                            <>
                              <Typography
                                className={classes.section_header}
                                style={{marginTop: '1rem'}}
                              >
                                Quote Adjustment Actions
                              </Typography>
                              <Card
                                style={{
                                  backgroundColor: '#fff',
                                  border: '1px solid #E9E9E9',
                                  boxShadow:
                                    '4px 4px 4px rgba(219, 229, 239, 0.25)',
                                }}
                              >
                                <CardContent>
                                  <Box>
                                    {
                                      // !isQuoteActionTaken?.actionTaken &&
                                      ['Accept', 'Reject'].map((action) => (
                                        <span
                                          label={action}
                                          onClick={(event) =>
                                            onQuoteAction(action)
                                          }
                                          style={{
                                            border: '1px solid #6B7DA5',
                                            borderRadius: '40px',
                                            fontSize: '14px',
                                            fontFamily: 'Urbanist',
                                            padding: '6px 20px',
                                            color:
                                              currentActionType !== '' &&
                                              currentActionType === action
                                                ? '#fff'
                                                : 'black',
                                            cursor: 'pointer',
                                            backgroundColor:
                                              currentActionType !== '' &&
                                              currentActionType === action
                                                ? '#0587ff'
                                                : '#fff',
                                            marginRight: '0.5rem',
                                          }}
                                        >
                                          {action}
                                        </span>
                                      ))
                                    }
                                  </Box>
                                  {currentActionType === 'Reject' && (
                                    <Box style={{margin: '1rem 0rem'}}>
                                      <Checkbox
                                        checked={
                                          continue_existing_order === true
                                            ? true
                                            : false
                                        }
                                        onChange={() =>
                                          set_continue_existing_order(
                                            !continue_existing_order,
                                          )
                                        }
                                        label="Would you like to process your existing order?"
                                        className="fieldMd"
                                      />
                                    </Box>
                                  )}
                                </CardContent>
                              </Card>
                            </>
                          )}
                          {canMakePayment() && (
                            <>
                              <Typography
                                className={classes.section_header}
                                style={{marginTop: '1rem'}}
                              >
                                Payment
                              </Typography>
                              <Card
                                style={{
                                  backgroundColor: '#fff',
                                  border: '1px solid #E9E9E9',
                                  boxShadow:
                                    '4px 4px 4px rgba(219, 229, 239, 0.25)',
                                  marginBottom: '1rem',
                                }}
                              >
                                <CardContent>
                                  <Box>
                                    <Grid container spacing={2}>
                                      {cardDetails?.length > 0 ? (
                                        cardDetails?.map((ele, i) => (
                                          <Grid item sm={12} md={6}>
                                            <Card
                                              elevation={0}
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px',
                                                marginTop:
                                                  i > 1 ? '10px' : '0px',
                                                backgroundColor: '#fff',
                                                border: '1px solid #E9E9E9',
                                              }}
                                            >
                                              <Checkbox
                                                checked={
                                                  selectedPaymentMethod ==
                                                  ele.id
                                                    ? true
                                                    : false
                                                }
                                                onChange={(e) =>
                                                  setSelectedPaymentMethod(
                                                    ele.id,
                                                  )
                                                }
                                                style={{marginRight: 12}}
                                              />
                                              <div>
                                                <p>{ele?.brand ?? `~`}</p>
                                                <p>
                                                  xxxx xxxx xxxx {ele.last4}
                                                </p>
                                                <p>
                                                  {ele.exp_month} /{' '}
                                                  {ele.exp_year}
                                                </p>
                                              </div>
                                            </Card>
                                          </Grid>
                                        ))
                                      ) : (
                                        <Typography
                                          className={classes.addressTitle}
                                          style={{
                                            padding:
                                              '0.6rem 0rem 0.6rem 0.5rem',
                                          }}
                                        >
                                          No existing card(s) found. Please add
                                          card details to make payment!
                                        </Typography>
                                      )}
                                    </Grid>

                                    {/* {isQuoteActionTaken?.actionTaken &&
isQuoteActionTaken?.actionType === 'accept' &&
!quoteAdjustData?.is_paid_quote_adjustment && ( */}
                                  </Box>
                                </CardContent>
                              </Card>
                              <Box
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <Elements stripe={stripePromise}>
                                  <PayViaCard />
                                </Elements>
                                {/* )} */}
                                <Button
                                  className={classes.btn}
                                  type="button"
                                  style={{
                                    marginLeft:
                                      isQuoteActionTaken?.actionTaken &&
                                      isQuoteActionTaken?.actionType ===
                                        'accept' &&
                                      !quoteAdjustData?.is_paid_quote_adjustment
                                        ? '0.5rem'
                                        : '0rem',
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    setIsNewPaymentMethodModelOpen(true)
                                  }}
                                >
                                  Add Card
                                </Button>
                              </Box>
                            </>
                          )}
                        </Grid>
                        <Grid item sm={12} md={5}>
                          <Typography className={classes.section_header}>
                            Order Details
                          </Typography>
                          <Card
                            style={{
                              backgroundColor: '#fff',
                              border: '1px solid #E9E9E9',
                              boxShadow:
                                '4px 4px 4px rgba(219, 229, 239, 0.25)',
                            }}
                          >
                            <CardContent>
                              <Box
                                style={{display: 'flex', alignItems: 'center'}}
                              >
                                {quoteAdjustData?.product_image ? (
                                  <img
                                    src={
                                      quoteAdjustData?.product_image?.type ===
                                      'public'
                                        ? `${quoteAdjustData?.product_image?.file_path}`
                                        : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${quoteAdjustData?.product_image?.id}/show-file`
                                    }
                                    className={classes.productImage}
                                    alt="Urbanserve Icon"
                                    style={{objectFit: 'cover'}}
                                  />
                                ) : (
                                  <img
                                    alt="Urbanserve Icon"
                                    src="/site__main__images/product__image.png"
                                    className={classes.productImage}
                                  />
                                )}
                                <Typography className={classes.summary__title}>
                                  {quoteAdjustData?.product_details?.title ??
                                    `~`}
                                </Typography>
                              </Box>
                              <Divider style={{margin: '1rem 0rem'}} />
                              <Box>
                                <Typography
                                  className={`${classes.addressTitle} ${classes.itemPB}`}
                                >
                                  {quoteAdjustData?.customer_details?.customer
                                    ?.name ?? `~`}
                                </Typography>
                                <Typography
                                  className={`${classes.addressTitle} ${classes.itemPB}`}
                                >
                                  {quoteAdjustData?.customer_details?.customer
                                    ?.email ?? `~`}
                                </Typography>
                                <Typography
                                  className={`${classes.addressTitle} ${classes.itemPB}`}
                                >
                                  {quoteAdjustData?.customer_details?.customer
                                    ?.mobile_no ?? `~`}
                                </Typography>
                              </Box>
                              <Box style={{paddingTop: '0.6rem'}}>
                                <Typography className={classes.addressTitle}>
                                  {displayAddresses(
                                    quoteAdjustData?.customer_details
                                      ?.customer_address,
                                  )}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Container>
                  )}
                </>
              ) : (
                <InvalidAccess
                  pageAccess="Quotation"
                  title="There is no quote for this order!"
                />
              )}
            </>
          ) : (
            <InvalidAccess
              pageAccess="Quotation"
              title="You are not logged in.Please login to access this page!"
            />
          )}

          {quoteAdjustData?.is_quote_adjustment && (
            <Box className={classes.paymentContainer}>
              <Box className={classes.paymentBox}>
                <Box className={classes.paymentContent}>
                  <Box className={classes.paymentSummary}>
                    <Typography className={classes.label}>
                      Grand Total :{' '}
                      <span className={classes.subLabel}>
                        £{renderTotalPrice()}
                      </span>
                    </Typography>
                  </Box>
                  {canPerformAction() && currentActionType !== '' && (
                    <Box className={classes.btnContainer}>
                      <Button
                        variant="contained"
                        className={classes.btn}
                        onClick={() => onQuoteConfirmation()}
                      >
                        {currentActionType}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
      <div
        style={{
          paddingBottom: quoteAdjustData?.is_quote_adjustment
            ? '5.5rem'
            : '0rem',
        }}
      >
        <SiteFooter />
      </div>

      {/* Confirmation Modal */}
      <Dialog
        onClose={() => setIsConfirmationModalOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={isConfirmationModalOpen}
      >
        <Typography
          className={classes.textStyle}
          gutterBottom
          style={{padding: '20px'}}
        >
          {renderActionTitle()}
        </Typography>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleQuoteActionSubmit()}
            color="primary"
            className={classes.SaveButton}
          >
            {currentActionType ?? `~`}
          </Button>
          <Button
            autoFocus
            onClick={() => setIsConfirmationModalOpen(false)}
            color="primary"
            className={classes.cancelButton}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      {/** Add new Payment Method Model */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isNewPaymentMethodModelOpen}
        onClose={() =>
          setIsNewPaymentMethodModelOpen(!isNewPaymentMethodModelOpen)
        }
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            onClick={() =>
              setIsNewPaymentMethodModelOpen(!isNewPaymentMethodModelOpen)
            }
            style={{marginRight: '1rem'}}
            className={classes.CloseIcon}
          >
            <Close className={classes.CloseIconSize} />
          </IconButton>
        </Box>
        <DialogContent style={{minHeight: '130px'}}>
          <Elements stripe={stripePromise}>
            <AddNewCard />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Pay
