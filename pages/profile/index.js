import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  FormHelperText,
  FormControl,
  CircularProgress,
  TextField,
  InputAdornment,
  Box,
} from '@material-ui/core'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Input, Select, Icon} from 'semantic-ui-react'
import {Card} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {useDispatch, useSelector} from 'react-redux'
import actions from '../../Stores/Auth/actions'
import useValidator, {createFakeEvent} from '../../utils/useValidator'
import * as Yup from 'yup'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {errorAlert} from '../../Stores/Alerts/actions'
import CardSection from '../../components/CardSection'
import {Autocomplete} from '@material-ui/lab'
import api from '../../utils/api'
import WithAuth from '../../utils/withAuth'
import Dashboard from '../../components/DashBoard'
import Addresses from '../../components/CustomerContacts/CustomerAddress'
import AdditionalContacts from '../../components/CustomerContacts/AdditionalContacts'
import {
  Grid as SemanticGrid,
  Card as SemanticCard,
  Loader,
} from 'semantic-ui-react'
import {Tab} from 'semantic-ui-react'
import Router from 'next/router'
import {
  getCustomerCards,
  addCustomerCards,
  deleteCustomerCards,
} from '../../Stores/CardDetails/actions'
import ConfirmModal from '../../components/ConfirmAleartModal'
import HelmetComponent from '../../components/Helmet'
import {
  DialogActions,
  Grid,
  DialogContent,
  Dialog,
  Link as MuiLink,
  IconButton,
} from '@material-ui/core'
import {Close, FormatColorResetSharp} from '@material-ui/icons'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

import {loadStripe} from '@stripe/stripe-js'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: '100%',
    '&:not(:first-child)': {
      marginTop: '1rem',
    },
  },
  textFieldName: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '23px',
    color: '#666666',
  },
  SaveButton: {
    minWidth: '128px',
    color: '#fff',
    background: '#101928',
    border: '1px solid #eef0f2',
    textTransform: 'none',
    boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
    fontWeight: '700',
    lineHeight: '18px',
    padding: '8px 16px',
    minHeight: '44px',
    marginTop: '1rem',
  },
  profileHeading: {
    fontFamily: 'Monteserrat, sans-serif',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '23px',
    color: '#666666',
    marginTop: '0.5rem',
  },
  FilterTitle: {
    margin: '0 auto',
    padding: '1rem 0rem',
    color: 'black',
    fontSize: '16px',
    borderBottom: '1px solid lightgray',
    width: '100%',
    textAlign: 'center',
  },
  CloseIcon: {
    position: 'absolute',
    right: '-10px',
  },
  CloseIconSize: {
    fontSize: '35px',
    fill: '#000000',
  },
}))

// const updateProfileAction = actions.updateUserProfile;
const updateProfileAction = actions.updateUserProfile

function UserProfile({
  CustomerUpdate,
  fetchCustomerCards,
  addCard,
  deleteCard,
  customerCardDetails,
  isAddingCard,
  isDeletingCard,
  isFetchingCustomerCard,
}) {
  const classes = useStyles()
  const token = useSelector((state) => state?.AuthReducer?.token)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [show, setShow] = useState(false)
  const [showCurrent, setCurrentShow] = useState(false)
  const isUpdatingProfileLoading = useSelector(
    (state) => state?.AuthReducer?.isUpdatingProfileLoading,
  )
  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  const [
    isNewPaymentMethodModelOpen,
    setIsNewPaymentMethodModelOpen,
  ] = useState(false)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_APP_STRIPE_KEY)

  useEffect(() => {
    if (userInfo === null && user === null) {
      Router.push('/login')
    }
  }, [userInfo, user])

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
        }
        await addCard({data: payload, customer_id: user?.id})
        await setIsNewPaymentMethodModelOpen(!isNewPaymentMethodModelOpen)
      }
    }

    return (
      // <form onSubmit={handleSubmit1}>

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
              className={classes.SaveButton}
              disabled={!stripe}
              onClick={addPaymentMethod}
            >
              {'Add New Card'}
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }

  const [customerTypes, setCustomerTypes] = useState([
    'landlord',
    'tenant',
    'homeowner',
  ])

  const removePaymentMethod = (payment_method_id) => {
    let payload = {
      payment_method: payment_method_id,
    }
    deleteCard({customer_id: user?.id, data: payload})
  }

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
      name: '',
      email: '',
      password: '',
      customer_type: '',
      mobile_no: '',
      current_password: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is Required!'),
      email: Yup.string()
        .email('Invalid Email!')
        .required('Email is required!'),
      customer_type: Yup.string().required('Customer Type is required'),
      current_password: Yup.string().required('Current Password is required'),
      mobile_no: Yup.string()
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
        .required('Mobile Number is Required'),
      password: Yup.string().test(
        'Password Validation',
        'Password should be 6 characters and should contain at least have a capital, a small alphabet, a number and a special character (any of !$#%@)',
        (value) => {
          if (value.length > 0)
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(
              value,
            )
          else return true
        },
      ),
    }),
  })

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        name: user?.name,
        email: user?.email,
        mobile_no: user?.mobile_no,
        customer_type: user?.customer_type,
        telephone_no: user?.telephone_no ?? '',
        current_password: '',
      })
    }
  }, [isLoading, user])

  function onSubmit(values) {
    let newProfileData
    if (values.password != '') {
      newProfileData = {
        name: values?.name,
        email: values?.email,
        customer_type: values?.customer_type,
        mobile_no: values?.mobile_no,
        telephone_no: values?.telephone_no,
        password: values?.password,
        current_password: values?.current_password,
        role_id: user?.role_id?.id,
      }
    } else {
      newProfileData = {
        name: values?.name,
        email: values?.email,
        customer_type: values?.customer_type,
        mobile_no: values?.mobile_no,
        telephone_no: values?.telephone_no,
        role_id: user?.role_id?.id,
        current_password: values?.current_password,
      }
    }
    CustomerUpdate(newProfileData)
    setValues({
      ...values,
      name: user?.name,
      email: user?.email,
      mobile_no: user?.mobile_no,
      customer_type: user?.customer_type,
      telephone_no: user?.telephone_no ?? '',
      current_password: '',
    })
    // dispatch(updateProfileAction(newProfileData));
  }

  console.log('data:', values, errors)

  const panes = [
    {
      menuItem: 'Personal Details',
      render: () => (
        <Tab.Pane attached={false}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              {isUpdatingProfileLoading || isLoading ? (
                <CircularProgress />
              ) : (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardSection
                  // CardSectionHeader={
                  //   isEditing ? (
                  //     <Typography className={classes.capitalize}>
                  //       {`${currentCustomer.name}`} Details
                  //     </Typography>
                  //   ) : (
                  //     'Add Customer'
                  //   )
                  // }
                  >
                    <Box>
                      <span className={classes.textFieldName}>Name</span>
                      <TextField
                        variant="outlined"
                        size="small"
                        style={{width: '100%'}}
                        value={values.name}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            name: e.target.value,
                          })
                        }}
                        inputProps={{...getFieldProps('name')}}
                        helperText={touched.name && errors.name}
                        error={!!(touched.name && errors.name)}
                      ></TextField>
                    </Box>

                    <Box>
                      <span className={classes.textFieldName}>Email</span>
                      <Input
                        style={{width: '100%'}}
                        value={values.email}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            email: e.target.value,
                          })
                        }}
                        inputProps={{...getFieldProps('email')}}
                        helperText={touched.email && errors.email}
                        error={!!(touched.email && errors.email)}
                      ></Input>
                    </Box>

                    <Box>
                      <span className={classes.textFieldName}>
                        Telephone Number
                      </span>
                      <Input
                        style={{width: '100%'}}
                        error={!!(touched.telephone_no && errors.telephone_no)}
                        value={values.telephone_no}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            telephone_no: e.target.value,
                          })
                        }}
                        inputProps={{...getFieldProps('telephone_no')}}
                      ></Input>
                    </Box>

                    <Box>
                      <span className={classes.textFieldName}>
                        Mobile Number*
                      </span>
                      <TextField
                        variant="outlined"
                        size="small"
                        style={{width: '100%'}}
                        helperText={
                          touched.mobile_no && [
                            errors.mobile_no,
                            ' Eg: +44 9876543210, 9876543210',
                          ]
                        }
                        value={values.mobile_no}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            mobile_no: e.target.value,
                          })
                        }}
                        error={!!(touched.mobile_no && errors.mobile_no)}
                        inputProps={{...getFieldProps('mobile_no')}}
                      ></TextField>
                    </Box>

                    <Box>
                      <span className={classes.textFieldName}>
                        {'New Password'}
                      </span>
                      <TextField
                        variant="outlined"
                        size="small"
                        style={{width: '100%'}}
                        helperText={touched.password && errors.password}
                        error={!!(touched.password && errors.password)}
                        type={show ? 'text' : 'password'}
                        icon={show ? 'eye' : 'eye slash'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              {show ? (
                                <VisibilityIcon
                                  onClick={() => setShow(false)}
                                />
                              ) : (
                                <VisibilityOffIcon
                                  onClick={() => setShow(true)}
                                />
                              )}
                            </InputAdornment>
                          ),
                          ...getFieldProps('password'),
                        }}
                      />
                    </Box>

                    <Box>
                      <span className={classes.textFieldName}>
                        Current Password*
                      </span>
                      <TextField
                        variant="outlined"
                        size="small"
                        style={{width: '100%'}}
                        value={values.current_password}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            current_password: e.target.value,
                          })
                        }}
                        type={showCurrent ? 'text' : 'password'}
                        icon={showCurrent ? 'eye' : 'eye slash'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              {showCurrent ? (
                                <VisibilityIcon
                                  onClick={() => setCurrentShow(false)}
                                />
                              ) : (
                                <VisibilityOffIcon
                                  onClick={() => setCurrentShow(true)}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        helperText={
                          touched.current_password && errors.current_password
                        }
                        error={
                          !!(
                            touched.current_password && errors.current_password
                          )
                        }
                        inputProps={{...getFieldProps('current_password')}}
                      ></TextField>
                    </Box>

                    <Box>
                      <span className={classes.textFieldName}>
                        Customer Type*
                      </span>

                      <Autocomplete
                        id="combo-box-demo"
                        options={customerTypes}
                        getOptionLabel={(option) => option}
                        value={values.customer_type}
                        onChange={(event, newValue) => {
                          handleChange('customer_type')(
                            createFakeEvent(newValue ?? ''),
                          )
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            error={
                              !!(touched.customer_type && errors.customer_type)
                            }
                            helperText={
                              touched.customer_type && errors.customer_type
                            }
                          />
                        )}
                      />
                    </Box>
                  </CardSection>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.SaveButton}
                  >
                    Update Profile
                  </Button>
                </form>
              )}
            </div>
          </Container>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Payment Options',
      render: () => (
        <Tab.Pane attached={false}>
          {isAddingCard || isFetchingCustomerCard || isDeletingCard ? (
            <CircularProgress />
          ) : customerCardDetails?.length > 0 ? (
            <>
              {customerCardDetails?.map((ele, i) => (
                <Card style={{padding: '1rem'}}>
                  <Typography color="textSecondary" gutterBottom>
                    {ele?.brand.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" component="h4">
                    xxxx xxxx xxxx {ele?.last4}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {ele.exp_month} / {ele.exp_year}
                  </Typography>
                  <ConfirmModal
                    onConfirm={() => removePaymentMethod(ele.id)}
                    btnTitle={'Remove Card'}
                    btnColor="secondary"
                    // btnVarient="secondary"
                    styleClass={{}}
                    title={'Are you sure you want to remove Card?'}
                  />
                </Card>
              ))}
            </>
          ) : (
            <span style={{paddingRight: '1rem'}}>No Cards Found!</span>
          )}

          <Button
            type="button"
            style={{
              marginTop: customerCardDetails?.length > 0 ? '1rem' : '0rem',
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              setIsNewPaymentMethodModelOpen(true)
            }}
          >
            Add new Payment Method
          </Button>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Address',
      render: () => (
        <Tab.Pane attached={false}>
          {' '}
          <Addresses />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Contacts',
      render: () => (
        <Tab.Pane attached={false}>
          {' '}
          <AdditionalContacts />{' '}
        </Tab.Pane>
      ),
    },
  ]

  const supportPanes = [
    {
      menuItem: 'Customer Support',
      render: () => (
        <Tab.Pane attached={false}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography
                className={classes.profileHeading}
                component="h1"
                variant="h5"
              >
                Customer Support
              </Typography>
              <form className={classes.form} onSubmit={supportHandleSubmit}>
                <CardSection>
                  <Box>
                    <span className={classes.textFieldName}>Name*</span>
                    <Input
                      disabled
                      style={{width: '100%'}}
                      error={!!(touched.name && errors.name)}
                      value={values.name}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          name: e.target.value,
                        })
                      }}
                      inputProps={{...getFieldProps('name')}}
                    ></Input>
                  </Box>

                  <Box>
                    <span className={classes.textFieldName}>Email*</span>
                    <Input
                      disabled
                      style={{width: '100%'}}
                      error={!!(touched.email && errors.email)}
                      value={values.email}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          email: e.target.value,
                        })
                      }}
                      inputProps={{...getFieldProps('email')}}
                    ></Input>
                  </Box>

                  <Box>
                    <span className={classes.textFieldName}>Message*</span>
                    <TextField
                      variant="outlined"
                      size="small"
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      style={{width: '100%'}}
                      variant="outlined"
                      error={
                        !!(supportTouched.message && supportErrors.message)
                      }
                      helperText={
                        supportTouched.message && supportErrors.message
                      }
                      onChange={(e) => {
                        supportSetValues({
                          ...supportValues,
                          message: e.target.value,
                        })
                      }}
                      inputProps={{...supportGetFieldProps('message')}}
                    />
                  </Box>
                </CardSection>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.SaveButton}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Container>
        </Tab.Pane>
      ),
    },
  ]

  useEffect(() => {
    getUserData(token)
  }, [])

  function getUserData(token) {
    setIsLoading(true)
    api(token)
      .post(`/api/auth/customer/me`)
      .then((data) => {
        if (data.data) {
          setUser(data.data)
        }
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        if (e && typeof e === 'string') errorAlert(e)
        else errorAlert('Error while fetching Trader Details!')
      })
  }

  const {
    getFieldProps: supportGetFieldProps,
    errors: supportErrors,
    setValues: supportSetValues,
    handleSubmit: supportHandleSubmit,
    handleBlur: supportHandleBlur,
    handleChange: supportHandleChange,
    touched: supportTouched,
    values: supportValues,
  } = useValidator({
    initialValues: {
      name: values?.name,
      email: values?.email,
      message: '',
    },
    onSubmit: handleSupport,
    validationSchema: Yup.object({
      message: Yup.string().required('Message is Required!'),
    }),
  })

  function handleSupport() {}

  // Fetch Customer Cards
  useEffect(() => {
    if (user !== null && user?.id !== undefined) {
      fetchCustomerCards(user?.id)
    }
  }, [user])

  console.log('user>>', user, userInfo)

  return (
    <>
      <div className="container">
        <SemanticGrid columns="equal">
          <SemanticGrid.Column mobile={16} tablet={8} computer={3}>
            <SemanticCard>
              <SemanticCard.Content>
                <SemanticCard.Header>{user?.name}</SemanticCard.Header>
                <SemanticCard.Meta>
                  <span className="date">{user?.email}</span>
                </SemanticCard.Meta>
                <SemanticCard.Description>
                  {user?.customer_type}
                </SemanticCard.Description>
              </SemanticCard.Content>
            </SemanticCard>
          </SemanticGrid.Column>
          <SemanticGrid.Column mobile={16} tablet={8} computer={13}>
            <Tab menu={{attached: false, tabular: false}} panes={panes} />
          </SemanticGrid.Column>
        </SemanticGrid>

        <div style={{width: '100%'}}></div>
      </div>

      <div className="container">
        <SemanticGrid columns="equal">
          <SemanticGrid.Column mobile={16} tablet={8} computer={3}>
            <SemanticCard>
              <SemanticCard.Content>
                <SemanticCard.Header> Need Help?</SemanticCard.Header>
                <SemanticCard.Description>
                  You can contact Urbanserve's Support Team anytime if you have
                  question. Drop your query here!
                </SemanticCard.Description>
              </SemanticCard.Content>
            </SemanticCard>
          </SemanticGrid.Column>
          <SemanticGrid.Column mobile={16} tablet={8} computer={13}>
            <Tab
              menu={{attached: false, tabular: false}}
              panes={supportPanes}
            />
          </SemanticGrid.Column>
        </SemanticGrid>

        <div style={{width: '100%'}}></div>
      </div>

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

      <Dialog
        // fullScreen
        maxWidth="xl"
        open={isNewPaymentMethodModelOpen}
        onClose={() =>
          setIsNewPaymentMethodModelOpen(!isNewPaymentMethodModelOpen)
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h5 className={classes.FilterTitle}>Add Payment Method</h5>
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
        <DialogContent>
          <Card
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              width: '800px',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Elements stripe={stripePromise}>
                  <AddNewCard />
                </Elements>
              </Grid>
            </Grid>
          </Card>
        </DialogContent>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '1rem',
            borderTop: '1px solid lightgray',
          }}
        >
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={() => {
              setIsNewPaymentMethodModelOpen(!isNewPaymentMethodModelOpen)
            }}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

const mapStateToProps = ({CardDetailsReducer}) => ({
  customerCardDetails: CardDetailsReducer?.customerCardDetails,
  isFetchingCustomerCard: CardDetailsReducer?.isFetchingCustomerCard,
  isDeletingCard: CardDetailsReducer?.isDeletingCard,
  isAddingCard: CardDetailsReducer?.isAddingCard,
})
function mapDispatchToProps(dispatch) {
  return {
    CustomerUpdate: (...args) => dispatch(updateProfileAction(...args)),
    fetchCustomerCards: (...args) => dispatch(getCustomerCards(...args)),
    addCard: (...args) => dispatch(addCustomerCards(...args)),
    deleteCard: (...args) => dispatch(deleteCustomerCards(...args)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(UserProfile)
