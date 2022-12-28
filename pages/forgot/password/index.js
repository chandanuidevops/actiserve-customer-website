import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import logo from "../../Assets/Images/logo.png";
import {InputAdornment, Paper} from '@material-ui/core'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import Autocomplete from '@material-ui/lab/Autocomplete'
import actions from '../../../Stores/Auth/actions'
import {useHistory} from 'react-router-dom'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import HelmetComponent from '../../../components/Helmet'
const ForgotPasswordAction = actions.CustomerForgotPassword

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
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
    fontWeight: '600',
    color: '#fff',
    fontSize: '16px',
    lineHeight: '19px',
    textTransform: 'capitalize',
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
    lineHeight: '28px',
    fontWeight: '600',
    lineHeight: '28px',
    paddingBottom: '1.5rem',
  },
  headerCaption: {
    color: '#878c93',
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '21px',
    marginBottom: '1rem',
  },
}))

function ForgotPassword({CustomerSignUp}) {
  const history = useHistory()
  const [show, setShow] = useState(0)
  const [credentials, setCredentials] = useState({
    email: '',
  })
  const onChange = (e) =>
    setCredentials({...credentials, [e.target.name]: e.target.value})

  const classes = useStyles()

  const onSubmit = (e) => {
    e.preventDefault()
    CustomerSignUp(credentials, history)
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
        {/* <div className={classes.logoAvatar}>
          <img alt="Logo" src={logo} />
        </div> */}
        <Paper>
          <CssBaseline />
          <div className={classes.paper}>
            <img
              src="/site__main__images/site__logo.png"
              width="50%"
              alt=""
              style={{paddingBottom: '0.5rem'}}
            />
            <Typography className={classes.header} component="h4" variant="h4">
              Reset Password
            </Typography>
            <Typography
              className={classes.headerCaption}
              component="body2"
              variant="body2"
            >
              Enter your registered login email address to receive a secure link
              to set a new password
            </Typography>
            <form onSubmit={onSubmit}>
              <TextField
                size="small"
                name="email"
                label="Email"
                margin="normal"
                required
                type="email"
                fullWidth
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
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
        </Paper>
      </Container>
    </>
  )
}

ForgotPassword.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
}

const mapStateToProps = ({AuthReducer}) => ({
  isAuthenticated: AuthReducer.isAuthenticated,
  isLoggingIn: AuthReducer.isLoggingIn,
  error: AuthReducer.error,
})
function mapDispatchToProps(dispatch) {
  return {
    //   LoginNew: (...args) => dispatch(ForgotPasswordAction(...args)),
    CustomerSignUp: (...args) => dispatch(ForgotPasswordAction(...args)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(ForgotPassword)
