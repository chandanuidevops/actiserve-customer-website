import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import logo from "../../Assets/Images/logo.png";
import {InputAdornment, Paper} from '@material-ui/core'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'
import useValidator from '../../utils/useValidator'
import actions from '../../Stores/Auth/actions'
import Router, {useRouter} from 'next/router'
import {FormControl, FormHelperText} from '@material-ui/core'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import HelmetComponent from '../../components/Helmet'
const ChangePassword = actions.changePassword

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  logoAvatar: {
    marginBottom: '2rem',
  },
  formControl: {
    width: '100%',
    marginBottom: '1rem',
  },
}))

function SignUp({updatePassword}) {
  const history = useRouter()

  const [passwordShow, setPasswordShow] = useState(0)
  const [newPasswordShow, setNewPasswordShow] = useState(0)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(0)

  const {
    getFieldProps,
    errors,
    values,
    setValues,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
  } = useValidator({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      current_password: Yup.string().required('Current password is required!'),
      new_password: Yup.string()
        .required('New password is required.')
        .test(
          'New Password Validation',
          'Password should be 6 characters and should contain at least have a capital, a small alphabet, a number and a special character (any of !$#%@)',
          (value) => {
            if (value.length > 0)
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(
                value,
              )
            else return true
          },
        ),
      confirm_password: Yup.string()
        .oneOf(
          [Yup.ref('new_password'), null],
          'Confirm password does not match with new password.',
        )
        .required('Confirm password is required.'),
    }),
  })

  const classes = useStyles()

  function onSubmit(values) {
    updatePassword(values)
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.logoAvatar}></div>
          <img
            src="/images/logo.png"
            width="50%"
            alt=""
            style={{paddingBottom: '2rem'}}
          />
          <form onSubmit={handleSubmit}>
            <FormControl
              className={classes.formControl}
              error={!!(touched.current_password && errors.current_password)}
            >
              <TextField
                type={passwordShow ? 'text' : 'password'}
                variant="outlined"
                size="small"
                error={!!(touched.current_password && errors.current_password)}
                label="Current Password"
                inputProps={{
                  ...getFieldProps('current_password'),
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
                helperText={touched.current_password && errors.current_password}
                aria-describedby="current_password-text"
                fullWidth
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={!!(touched.new_password && errors.new_password)}
            >
              <TextField
                type={newPasswordShow ? 'text' : 'password'}
                variant="outlined"
                size="small"
                error={!!(touched.new_password && errors.new_password)}
                label="New Password"
                inputProps={{
                  ...getFieldProps('new_password'),
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {newPasswordShow ? (
                        <VisibilityIcon
                          onClick={() => setNewPasswordShow(false)}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={() => setNewPasswordShow(true)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                helperText={touched.new_password && errors.new_password}
                aria-describedby="new_password-text"
                fullWidth
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={!!(touched.confirm_password && errors.confirm_password)}
            >
              <TextField
                type={confirmPasswordShow ? 'text' : 'password'}
                variant="outlined"
                size="small"
                error={!!(touched.confirm_password && errors.confirm_password)}
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
                helperText={touched.confirm_password && errors.confirm_password}
                aria-describedby="confirm_password-text"
                fullWidth
              />
            </FormControl>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Password
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool,
}

const mapStateToProps = ({AuthReducer, CustomerFlowReducer}) => ({
  isAuthenticated: AuthReducer.isAuthenticated,
  isLoggingIn: AuthReducer.isLoggingIn,
  error: AuthReducer.error,
  validateCustomerTest: CustomerFlowReducer?.validateCustomer,
  isValidatingCustomer: CustomerFlowReducer?.isValidatingCustomer,
})
function mapDispatchToProps(dispatch) {
  return {
    updatePassword: (data) => dispatch(ChangePassword(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(SignUp)
