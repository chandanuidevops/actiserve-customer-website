import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
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
// import useValidator from "../../utils/useValidator";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import Autocomplete from '@material-ui/lab/Autocomplete'
import actions from '../../Stores/Auth/actions'
import {useHistory} from 'react-router-dom'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {useRouter} from 'next/router'
import {Dimmer, Loader, Image} from 'semantic-ui-react'
import Alerts from '../../components/Alerts'
import HelmetComponent from '../../components/Helmet'
import Link from 'next/link'

const LoginAction = actions.CustomerLogin

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
    color: '#fff',
  },
  logoAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7),
  },
  header: {
    fontFamily: 'Mulish, sans-serif',
    color: '#101928',
    fontSize: '28px',
    fontWeight: '800',
    lineHeight: '36px',
    marginBottom: '1rem',
  },
  headerCaption: {
    color: '#878c93',
    fontFamily: 'Mulish, sans-serif',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '21px',
    marginBottom: '1rem',
  },
  content: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

function Login({CustomerLogin}) {
  const history = useRouter()
  const classes = useStyles()
  const [show, setShow] = useState(0)
  const [loader, setLoader] = useState(true)
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const onChange = (e) =>
    setCredentials({...credentials, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault()
    CustomerLogin(credentials, history, 'login')
  }

  useEffect(() => {
    let timer1 = setTimeout(() => setLoader(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  const isBrowser = () => typeof window !== 'undefined'

  let link = isBrowser() ? `${window.location.hostname}/login` : ''

  return (
    <>
      <HelmetComponent
        title={`UrbanServe | Sign Up - Personal Informatino`}
        ogTitle={`UrbanServe - Hassle Free On Demand Services`}
        description={`Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs`}
        ogDescription={`Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs`}
        ogUrl={isBrowser() && `${window?.location?.hostname}/login`}
        createJsonLD={false}
      />
      {loader ? (
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
        <Container component="main" maxWidth="xs">
          <Paper>
            <Alerts />
            <CssBaseline />
            <div className={classes.paper}>
              <Link href="/">
                <img
                  src="/site__main__images/site__logo.png"
                  width="50%"
                  alt=""
                  style={{paddingBottom: '0.5rem', cursor: 'pointer'}}
                />
              </Link>
              <Typography
                className={classes.header}
                component="h5"
                variant="h5"
              >
                Log in for Customer
              </Typography>
              <Typography
                className={classes.headerCaption}
                component="body2"
                variant="body2"
              >
                Access your customer account
              </Typography>
              <form onSubmit={onSubmit}>
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  name="email"
                  label="Email"
                  margin="normal"
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
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={show ? 'text' : 'password'}
                  id="password"
                  onChange={onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        {show ? (
                          <VisibilityIcon onClick={() => setShow(false)} />
                        ) : (
                          <VisibilityOffIcon onClick={() => setShow(true)} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  style={{marginTop: '1rem'}}
                >
                  <Grid item>
                    <Link href="/forgot/password">
                      <p
                        style={{
                          fontFamily: 'Urbanist',
                          color: '#21262b',
                          cursor: 'pointer',
                          fontSize: 14,
                        }}
                      >
                        Forgot Password
                      </p>
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </form>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <hr
                  width="45%"
                  style={{borderTop: '1px solid #C0C0C0', maxHeight: '1px'}}
                />
                <span width="20%">OR</span>
                <hr
                  width="45%"
                  style={{borderTop: '1px solid #C0C0C0', maxHeight: '1px'}}
                />
              </Box>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Button onClick={() => history.push('/sign-up')}>
                    Create A New Account
                  </Button>
                </Grid>
              </Grid>
              {/* <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Link variant="body2">
                <Button onClick={() => history.push("/")}>Go to home</Button>
              </Link>
            </Grid>
          </Grid> */}
            </div>
          </Paper>
        </Container>
      )}
    </>
  )
}

Login.propTypes = {
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
    //   LoginNew: (...args) => dispatch(loginAction(...args)),
    CustomerLogin: (...args) => dispatch(LoginAction(...args)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Login)
