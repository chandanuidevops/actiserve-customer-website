import React, {useState, useEffect} from 'react'
import Router, {useRouter} from 'next/router'
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Backdrop,
  CircularProgress,
  makeStyles,
  Icon,
  Typography,
} from '@material-ui/core'
import {connect, useSelector} from 'react-redux'
import useValidator from '../../../../../../../utils/useValidator'
import action from '../../../../../../../Stores/Auth/actions'
import {compose} from 'redux'
import * as Yup from 'yup'
import Images from '../../../../../../../Assets/Icons'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import api from '../../../../../../../utils/api'
import {Skeleton} from '@material-ui/lab'
import Image from 'next/image'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SiteFooter from '../../../../../../../components/SiteFooter'
import {Loader, Header} from 'semantic-ui-react'
import Link from 'next/link'
import SiteMainNavbar from '../../../../../../../components/SiteMain/SiteMainNavbar/SiteMainNavbarV3'
const updatePassword = action.updatePassword
const resetUpdatePassword = action.resetUpdatePassword
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: '2rem',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#0587ff',
    height: '38px',
    fontFamily: 'Urbanist, sans-serif',
    color: '#fff',
    fontSize: '16px',
    lineHeight: '19px',
  },
  logoAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7),
  },
  header: {
    fontFamily: 'Urbanist, sans-serif',
    color: '#21262b',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '28px',
  },
  headerCaption: {
    color: '#878c93',
    fontFamily: 'Mulish, sans-serif',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '21px',
    marginBottom: '1rem',
  },
  successText: {
    fontFamily: 'Urbanist, sans-serif',
    color: '#21262b',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '28px',
  },
  formMinHeight: {
    minHeight: '67vh',
    [theme.breakpoints.up('1200')]: {
      minHeight: '72vh',
    },
  },
}))

function Activation({
  error,
  updateUserPassword,
  resetUpdatePassword,
  isUpdatingPassword,
  canUpdatePassword,
}) {
  const router = useRouter()
  const {roleID, tokenID, emailID, uuid} = router?.query

  const classes = useStyles()
  const [passwordShow, setPasswordShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  //   const history = useHistory()
  const isUpdateSuccess = useSelector(
    (state) => state.AuthReducer?.isUpdateSuccess,
  )
  const updatingPasswordData = useSelector(
    (state) => state.AuthReducer.updatingPasswordData,
  )
  const [redirect, setRedirect] = useState(false)
  const [response, setResponse] = useState(null)
  const [linkValidate, setLinkValidate] = useState(false)
  const [update, setUpdate] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorIcon, setErrorIcon] = useState('')

  const [updateReq, setUpdateReq] = useState(false)
  const [verified, setVerified] = useState(false)
  const [alreadyverified, setAlreadyverified] = useState(false)

  const onSubmit = (values) => {
    updateUserPassword({data: values, history})
    setRedirect(true)
    setUpdateReq(true)
  }

  useEffect(() => {
    linkValidation()
  }, [])

  function linkValidation() {
    // setIsLoading(true)
    const validationValues = {
      email: emailID,
      uuid: uuid,
      verify_token: tokenID,
      role: roleID,
    }
    api((null, null))
      .post(`api/auth/one-time-sign-up/verify-link`, validationValues)
      .then((response) => {
        if (response?.code == 200) {
          setResponse(response?.data)
          setIsLoading(false)
          setLinkValidate(true)
          setMessage(response.message)
        }
      })
      .catch((response) => {
        if (response?.response?.data?.code == 404) {
          setVerified(true)
          setAlreadyverified(true)
          setLinkValidate(false)
          setIsLoading(false)
          setErrorMessage(response?.response?.data?.message)
          setErrorIcon(true)
        }
      })
  }

  const {getFieldProps, errors, handleSubmit, touched, values} = useValidator({
    initialValues: {
      email: emailID,
      uuid: uuid,
      verify_token: tokenID,
      role: roleID,
    },
    onSubmit,
    validationSchema: Yup.object({
      password: Yup.string()
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
        )
        .required('Password Field is required!'),
    }),
  })

  const handleUpdatePassword = () => {
    if (updateReq) {
      let data = {
        ...values,
        password: response?.password,
      }
      if (data) {
        updateUserPassword({data: data, history})
      }
    }
  }

  useEffect(() => {
    if (roleID !== 'customer') {
      if (response?.sign_up_type === 'dashboard') {
      } else {
        setUpdateReq(true)
        if (roleID == 'traders_admin' && response?.sign_up_type == 'self') {
          handleUpdatePassword()
        }
      }
    }
  }, [response])

  useEffect(() => {
    if (isUpdateSuccess) {
      setVerified(true)
    }
  }, [isUpdateSuccess])

  return (
    <>
      <SiteMainNavbar />
      <Container
        style={{padding: '1rem 0'}}
        maxWidth={
          (updateReq && !isUpdatingPassword && isUpdateSuccess) || verified
            ? 'md'
            : 'xs'
        }
        className={`  ${classes.formMinHeight}`}
      >
        <Paper>
          {isLoading ? (
            <div className={classes.paper}>
              <Loader active inline="centered" />
            </div>
          ) : (
            <>
              {verified ? (
                <>
                  <section className="site-confirm-wrapper">
                    <div className="container site-confirm-container">
                      <Header as="h2" icon textAlign="center">
                        <Header.Content
                          className="site-confirm-title"
                          style={{paddingBottom: 5}}
                        >
                          {response?.sign_up_type == 'self'
                            ? 'Thank you for verifying your email address'
                            : alreadyverified
                            ? 'User is already verified'
                            : ' Your password is upadated now.'}

                          <br />
                        </Header.Content>
                      </Header>
                      <Header as="h2" icon textAlign="center">
                        <Header.Content
                          className="site-confirm-title"
                          style={{paddingBottom: 5}}
                        >
                          You can now Login In to UrbanServe{' '}
                          {roleID !== 'customer' ? 'Traders' : ''} App & manage
                          your orders.
                        </Header.Content>
                      </Header>

                      <div className="site-confirm-details">
                        <p className="site-confirm-helper">
                          Download the App from below links
                        </p>
                        <div className="site-confirm-apps">
                          <a
                            href={ roleID == 'customer' ?    process.env.NEXT_PUBLIC_APP_GOOGLE: process.env.NEXT_PUBLIC_APP_TRADER_GOOGLE }
                            target="_blank"
                          >
                            <img src="/images/footer-gapp.png" />
                          </a>

                          <a
                            href={roleID == 'customer' ? process.env.NEXT_PUBLIC_APP_APPLE:process.env.NEXT_PUBLIC_APP_TRADER_APPLE}
                            target="_blank"
                          >
                            <img
                              className="app-google"
                              src="/images/footer-apple-app.png"
                            />
                          </a>
                        </div>
                        <br />
                        <p className="site-confirm-helper">
                          Welcome to UrbanServe!
                        </p>
                        <Link style={{cursor: 'pointer'}} href={`/`}>
                          <p
                            className="site-confirm-helper"
                            style={{
                              margin: '3rem 0rem',
                              cursor: 'pointer',
                              color: '#0587ff',
                            }}
                          >
                            Redirect to Homepage
                          </p>
                        </Link>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  {response?.sign_up_type !== 'self' && canUpdatePassword && (
                    <div className={classes.paper}>
                      <Typography
                        className={classes.header}
                        component="h3"
                        variant="h3"
                        style={{marginBottom: '2rem'}}
                      >
                        {roleID == 'traders_admin'
                          ? 'Set Password & Verify Your Mail'
                          : ' Set Password'}
                      </Typography>
                      <form onSubmit={handleSubmit}>
                        <TextField
                          type={passwordShow ? 'text' : 'password'}
                          className={classes.formControl}
                          error={!!(touched.password && errors.password)}
                          label="New Password"
                          inputProps={{
                            ...getFieldProps('password'),
                          }}
                          style={{marginTop: '0.75rem'}}
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                {passwordShow ? (
                                  <VisibilityIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => setPasswordShow(false)}
                                  />
                                ) : (
                                  <VisibilityOffIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => setPasswordShow(true)}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          helperText={touched.password && errors.password}
                          aria-describedby="password-text"
                          fullWidth
                        />
                        <Button
                          fullWidth
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          Activate
                        </Button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
      <div className="site__footer">
        <SiteFooter />
      </div>
    </>
  )
}

const mapStateToProps = ({AuthReducer}) => ({
  error: AuthReducer.error,
  isAuthenticated: AuthReducer?.isAuthenticated,
  isUpdatingPassword: AuthReducer?.isUpdatingPassword,
  isUpdateSuccess: AuthReducer?.isUpdateSuccess,
  canUpdatePassword: AuthReducer?.canUpdatePassword,
})
function mapDispatchToProps(dispatch) {
  return {
    errorAlert: (data) => dispatch(errorAlert(data)),
    successAlert: (data) => dispatch(successAlert(data)),
    updateUserPassword: (...args) => dispatch(updatePassword(...args)),
    resetUpdatePassword: () => dispatch(resetUpdatePassword()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Activation)
