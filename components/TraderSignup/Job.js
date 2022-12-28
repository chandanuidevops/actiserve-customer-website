import React, {useEffect, useState} from 'react'
import {
  Box,
  CssBaseline,
  TextField,
  Grid,
  Container,
  InputAdornment,
  Paper,
} from '@material-ui/core'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import {useHistory,Prompt} from 'react-router-dom'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Router, {useRouter} from 'next/router'
import {Dimmer, Loader, Image} from 'semantic-ui-react'
import Alerts from '../../components/Alerts'
import {useStyles} from './styles'
import {Autocomplete, Skeleton} from '@material-ui/lab'
import useValidator from '../../utils/useValidator'
import SiteFooter from '../../components/SiteFooter'
import {
  validateCustomer,
  validateCustomerReset,
  registerTrader,
  getCategories,
  getLogin,
  getTraderEmail,
  resetPassword,
} from '../../Stores/Traders/actions'
import * as Yup from 'yup'
function Job({
  onNext,
  validateCustomer,
  validateCustomerReset,
  isValidatingCustomer,
  isCustomerValid,
  addRegisterTrader,
  registerData,
  signupData,
  isAddingRegister,
  getCategories,
  isFetchingCategories,
  categories,
  getLogin,
  validateCustomerdata,
  isRegisterSuccess,
  getEmail,
  isFetchingTraderEmail,
  traderEmail,
  resetPassword,
  traderData,
  isResettingPassword,
}) {
  const router = useRouter()
  const classes = useStyles()
  const [show, setShow] = useState(0)
  const [loader, setLoader] = useState(true)
  /* User logged In tracker */
  const [customerExists, setCustomerExists] = useState(false)
  const [signUpcomplete, setSignUpcomplete] = useState(false)

  const [changingRoute, setChangingRoute] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [jobsAutoComplete, setJobsAutoComplete] = useState([])
  const [jobOptions, setJobOption] = useState([])
  const [enabled, setEnabled] = useState(true)
  const {
    getFieldProps,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    clearFormState,
  } = useValidator({
    initialValues: {
      trader_id: '',
      types_of_categories: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      types_of_categories:
        customerExists === true
          ? Yup.string().nullable()
          : Yup.string().required('Area of Expertise is required!'),
      first_name:
        customerExists === true
          ? Yup.string().nullable()
          : Yup.string().required('First Name is required!'),
      last_name:
        customerExists === true
          ? Yup.string().nullable()
          : Yup.string().required('Last Name is required!'),
      email: Yup.string()
        .required('Email is required!')
        .email('Invalid email format'),
      password: Yup.string()
        .required('Password is required!')
        .test(
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

  // If trader is trying to continue signup process
  // This will set this email and remove unwanted fields
  useEffect(() => {
    if (router && router?.query) {
      let params = router.query

      let paramsUUID = params?.uuid
      if (paramsUUID) {
        getEmail({
          id: paramsUUID,
        })
      }
    }
  }, [router?.query])




  useEffect(() => {
    if (traderEmail) {
      setValues({
        ...values,
        email: traderEmail,
      })
    }
  }, [traderEmail])

  useEffect(() => {
    let timer1 = setTimeout(() => setLoader(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  function onSubmit(val) {
    if (customerExists) {
      getLogin(values)
    } else {
      addRegisterTrader(values)
    }
    setChangingRoute(true)
    setEnabled(false)
  
  }
  useEffect(() => {
    if(enabled){
      window.addEventListener("beforeunload", (ev) => 
      {  
          ev.preventDefault();
          return ev.returnValue = 'Are you sure you want to close?';
      });
    }else{
      window.removeEventListener("beforeunload", onSubmit,true);
    }


   
  }, [enabled])

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
    setSignUpcomplete(false)
    if (loggedIn === false) {
      if (isCustomerValid === 200) {
        setCustomerExists(false)
        validateCustomerReset()
      } else if (isCustomerValid === 404) {
        setCustomerExists(true)
      }
      if (validateCustomerdata) {
        if (validateCustomerdata?.data?.length > 0) {
          setCustomerExists(true)
          if (validateCustomerdata?.data[0]?.trader_detail?.is_active == true) {
            setSignUpcomplete(true)
          }
        } else {
          setCustomerExists(false)
        }
      }
    }
  }, [isCustomerValid, loggedIn, validateCustomerdata])

  useEffect(() => {
    validateCustomerReset()
    getCategories()
  }, [])

  useEffect(() => {
    if (registerData?.id && !registerData?.is_active) {
      setValues({
        ...values,
        trader_id: registerData?.trader_id,
      })
      if (registerData?.trader_detail?.profile_step == 1) {
        Router.push(
          `/trader-signup/${registerData?.trader_id}/personal-information`,
        )
      }
      if (registerData?.trader_detail?.profile_step == 2) {
        Router.push(`/trader-signup/${registerData?.trader_id}/postcode`)
      }
      if (
        registerData?.trader_detail?.profile_step == 3 ||
        registerData?.trader_detail?.profile_step == 4
      ) {
        Router.push(
          `/trader-signup/${registerData?.trader_id}/business-information`,
        )
      }
    }
    if (signupData?.id) {
      setValues({
        ...values,
        trader_id: signupData?.trader_id,
      })
    }
    //setChangingRoute(false)
  }, [registerData, signupData])

  useEffect(() => {
    if (values?.trader_id !== '' && Object.keys(signupData).length > 0) {
      Router.push(`/trader-signup/${values?.trader_id}/personal-information`)
    }
    if (categories?.length > 0) {
      setJobOption(categories)
    }
    // setChangingRoute(false)
  }, [values, categories])

  useEffect(() => {
    if (!isRegisterSuccess) {
      setChangingRoute(false)
    }
  }, [isRegisterSuccess])
  return (
    <>
      {loader || isAddingRegister || changingRoute || isResettingPassword ? (
        <div className={classes.content}>
          <Loader
            active
            inline="centered"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      ) : (
        <>
          <section className={      ` ${classes.container} ${classes.formMinHeight}`    }           >
            <div className={classes.postcodeContainer}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={3} md={3}></Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <form onSubmit={handleSubmit}>
                    <div className={classes.card}>
                      {!customerExists && !signUpcomplete && (
                        <>
                          <Autocomplete
                            multiple
                            id="tags-standard"
                            options={jobOptions}
                            name="types_of_categories"
                            disabled={isFetchingCategories}
                            getOptionLabel={(option) => option.name}
                            value={jobsAutoComplete}
                            onBlur={handleBlur("types_of_categories")}
                            onChange={(event, newValue) => {
                              handleChange('types_of_categories')({
                                target: {
                                  value:
                                    newValue.length == 0
                                      ? ''
                                      : newValue?.map((x) => x),
                                },
                                persist: () => {},
                              })
                              let v = newValue?.map((x) => x.id)

                              setValues({
                                ...values,
                                types_of_categories: v,
                              })

                              setJobsAutoComplete(newValue)
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                variant="standard"
                               
                                label="Area of Expertise*"
                                helperText={
                                  touched.types_of_categories &&
                                  errors.types_of_categories
                                }
                                error={
                                  !!(
                                    touched.types_of_categories &&
                                    errors.types_of_categories
                                  )
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            )}
                          />

                          <TextField
                            size="small"
                            name="first_name"
                            className={classes.input}
                            label="First Name*"
                            type="text"
                            fullWidth
                            inputProps={{
                              ...getFieldProps('first_name'),
                            }}
                            helperText={touched.first_name && errors.first_name}
                            error={!!(touched.first_name && errors.first_name)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <TextField
                            size="small"
                            name="last_name"
                            label="Last Name*"
                            type="text"
                            className={classes.input}
                            fullWidth
                            inputProps={{
                              ...getFieldProps('last_name'),
                            }}
                            helperText={touched.last_name && errors.last_name}
                            error={!!(touched.last_name && errors.last_name)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </>
                      )}

                      <TextField
                        id="email"
                        size="small"
                        name="email"
                        label="Email*"
                        type="email"
                        fullWidth
                        className={classes.input}
                        inputProps={{
                          ...getFieldProps('email'),
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <PersonOutlineOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        helperText={touched.email && errors.email}
                        error={!!(touched.email && errors.email)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {customerExists && !isValidatingCustomer && (
                        <div>
                          <p className={classes.existText}>
                            {signUpcomplete
                              ? `Email is already registered. Please use different email or contact us.`
                              : `Please login to continue your Sign-Up process`}
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
                      <TextField
                        size="small"
                        fullWidth
                        name="password"
                        label="Password*"
                        type={show ? 'text' : 'password'}
                        id="password"
                        className={classes.input}
                        inputProps={{
                          ...getFieldProps('password'),
                        }}
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
                        }}
                        helperText={touched.password && errors.password}
                        error={!!(touched.password && errors.password)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <div style={{marginTop: '13px'}}>
                        {customerExists && (
                          <a
                            href="javascript:void(0)"
                            onClick={() => {
                              resetPassword({email: values?.email})
                            }}
                            style={{
                              color: 'rgba(0, 0, 0, 0.54)',
                              fontWeight: '700',
                            }}
                          >
                            {' '}
                            Forgot Password?
                          </a>
                        )}
                      </div>
                    </div>
                    <div className={classes.bntFullContainer}>
                      {!customerExists ? (
                        <Button
                          fluid
                          className={
                            Object.keys(errors).length > 0
                              ? `us_btn_disabled`
                              : `us_btn`
                          }
                          type="submit"
                          // disabled={Object.keys(errors).length > 0}
                        >
                          Next
                          <img
                            src={
                              Object.keys(errors).length > 0
                                ? '/site__main__images/site__chevron__right__grey.png'
                                : '/site__main__images/site__chevron__right__light.png'
                            }
                          />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          className="us_btn us_sign_btn"
                        >
                          {'Continue Signup'}
                          <img
                            src={
                              '/site__main__images/site__chevron__right__light.png'
                            }
                          />
                        </Button>
                      )}
                    </div>
                  </form>
                </Grid>
              </Grid>
            </div>
          </section>

          <div className="site__footer"       >
            <SiteFooter />
          </div>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  isValidatingCustomer: state.TraderReducer?.isValidatingCustomer,
  validateCustomerdata: state.TraderReducer?.validateCustomer,
  isAddingRegister: state.TraderReducer?.isAddingRegister,
  registerData: state.TraderReducer?.registerData,
  signupData: state.TraderReducer?.signupData,
  isFetchingCategories: state.TraderReducer?.isFetchingCategories,
  categories: state.TraderReducer?.categories,
  isRegisterSuccess: state.TraderReducer?.isRegisterSuccess,
  isFetchingTraderEmail: state.TraderReducer?.isFetchingTraderEmail,
  traderEmail: state.TraderReducer?.traderEmail,
  traderData: state.TraderReducer?.traderData,
  isResettingPassword: state.TraderReducer?.isResettingPassword,
})
function mapDispatchToProps(dispatch) {
  return {
    validateCustomer: (data) => dispatch(validateCustomer(data)),
    validateCustomerReset: (data) => dispatch(validateCustomerReset(data)),
    addRegisterTrader: (data) => dispatch(registerTrader(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    getLogin: (data) => dispatch(getLogin(data)),
    getEmail: (data) => dispatch(getTraderEmail(data)),
    resetPassword: (data) => dispatch(resetPassword(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Job)
