import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import logo from "../../Assets/Images/logo.png";
import {InputAdornment, Paper} from '@material-ui/core'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'
import useValidator from '../../../utils/useValidator'
import actions from '../../../Stores/Auth/actions'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import router, {useRouter} from 'next/router'
import SiteMainNavbar from '../../../components/SiteMain/SiteMainNavbar/SiteMainNavbarV3'
import SiteFooter from '../../../components/SiteFooter'
import HelmetComponent from '../../../components/Helmet'
import {Loader, Header} from 'semantic-ui-react'
import Link from 'next/link'
import Router from 'next/router'
const ResetPasswordAction = actions.CustomerResetPassword

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
}))

function Slug({ResetPassword, isResettingPassword, isResetPasswordSuccess}) {
  const history = useRouter()
  const [req, setReq] = useState(false)
  const isBrowser = () => typeof window !== 'undefined'

  const [currentLocation, setCurrentLocation] = useState(null)
  useEffect(() => {
    const handler = () => {
      localStorage.setItem('can_access_cppage', false)
    }

    Router.events.on('routeChangeStart', handler)

    return () => {
      Router.events.off('routeChangeStart', handler)
    }
  }, [])
  useEffect(() => {
    setReq(false)
  }, [])
  const token =
    history.query?.slug && history.query?.slug.length > 0
      ? history.query?.slug[0]
      : null
  const email =
    history.query?.slug && history.query?.slug.length > 0
      ? history.query?.slug[1]
      : null
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(0)

  const classes = useStyles()
  const onSubmit = (values) => {
    ResetPassword(values)
    setReq(true)
  }

  useEffect(() => {
    if (token === undefined || email === undefined) {
      history.push('/d')
    }
  }, [])

  const {
    getFieldProps,
    errors,
    setValues,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
  } = useValidator({
    initialValues: {
      email: decodeURIComponent(email),
      token: decodeURIComponent(token),
      password: '',
      confirm_password: '',
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
        .required('Password is required!'),
      confirm_password: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'Confirm password does not match with new password.',
        )
        .required('Confirm password is required.'),
    }),
  })

  console.log('isResettingPassword::', isResettingPassword)

  return (
    <>
      <HelmetComponent
        title="UrbanServe - Reset Password"
        description="Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs"
        ogTitle=""
        ogType="urbanserve company"
        ogUrl=""
        ogImage=""
        ogDescription=""
      />

      <SiteMainNavbar />
      <Container
        component="main"
        maxWidth={
          req && !isResettingPassword && isResetPasswordSuccess ? 'md' : 'xs'
        }
      >
        <Paper>
          {isResettingPassword ? (
            <div className={classes.paper}>
              <Loader active inline="centered" />
            </div>
          ) : (
            <>
              {req && !isResettingPassword && isResetPasswordSuccess ? (
                <>
                  <section className="site-confirm-wrapper">
                    <div className="container site-confirm-container">
                      <Header as="h2" icon textAlign="center">
                        <Header.Content
                          className="site-confirm-title"
                          style={{paddingBottom: 5}}
                        >
                          Your password is upadated now.
                          <br />
                        </Header.Content>
                      </Header>
                      <Header as="h2" icon textAlign="center">
                        <Header.Content
                          className="site-confirm-title"
                          style={{paddingBottom: 5}}
                        >
                          You can now Login In to UrbanServe App & manage your
                          orders.
                        </Header.Content>
                      </Header>

                      <div className="site-confirm-details">
                        <p className="site-confirm-helper">
                          Download the App from below links
                        </p>
                        <div className="site-confirm-apps">
                          <a
                            href={process.env.NEXT_PUBLIC_APP_GOOGLE}
                            target="_blank"
                          >
                            <img src="/images/footer-gapp.png" />
                          </a>

                          <a
                            href={process.env.NEXT_PUBLIC_APP_APPLE}
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
                            Return to Home Page
                          </p>
                        </Link>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <div className={classes.paper}>
                  <Typography
                    className={classes.header}
                    component="h3"
                    variant="h3"
                    style={{marginBottom: '2rem'}}
                  >
                    Reset Password
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      type={passwordShow ? 'text' : 'password'}
                      size="small"
                      className={classes.formControl}
                      error={!!(touched.password && errors.password)}
                      label="Set New Password"
                      inputProps={{
                        ...getFieldProps('password'),
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            {passwordShow ? (
                              <VisibilityIcon
                                onClick={() => setPasswordShow(false)}
                              />
                            ) : (
                              <VisibilityOffIcon
                                onClick={() => setPasswordShow(true)}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                      style={{marginBottom: '1rem'}}
                      helperText={touched.password && errors.password}
                      aria-describedby="password-text"
                      fullWidth
                    />
                    <TextField
                      type={confirmPasswordShow ? 'text' : 'password'}
                      size="small"
                      error={
                        !!(touched.confirm_password && errors.confirm_password)
                      }
                      label="Confirm Password"
                      inputProps={{
                        ...getFieldProps('confirm_password'),
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            {confirmPasswordShow ? (
                              <VisibilityIcon
                                onClick={() => setConfirmPasswordShow(false)}
                              />
                            ) : (
                              <VisibilityOffIcon
                                onClick={() => setConfirmPasswordShow(true)}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        touched.confirm_password && errors.confirm_password
                      }
                      aria-describedby="confirm_password-text"
                      fullWidth
                    />
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}
        </Paper>
      </Container>
      <SiteFooter />
    </>
  )
}

Slug.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
}

const mapStateToProps = ({AuthReducer}) => ({
  isAuthenticated: AuthReducer.isAuthenticated,
  isLoggingIn: AuthReducer.isLoggingIn,
  error: AuthReducer.error,
  isResettingPassword: AuthReducer.isResettingPassword,
  isResetPasswordSuccess: AuthReducer.isResetPasswordSuccess,
})
function mapDispatchToProps(dispatch) {
  return {
    ResetPassword: (...args) => dispatch(ResetPasswordAction(...args)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Slug)
