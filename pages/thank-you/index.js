import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import {InputAdornment, Paper} from '@material-ui/core'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'

import {useHistory, useParams} from 'react-router-dom'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Router, {useRouter} from 'next/router'
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar/SiteMainNavbarV3'
import HelmetComponent from '../../components/Helmet'
import SiteFooter from '../../components/SiteFooter'
import {resetSignup} from '../../Stores/Traders/actions'
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
  headerNormal: {
    fontSize: '14px',
    fontWeight: 'normal',
  },
  headerCaption: {
    color: '#878c93',
    fontFamily: 'Mulish, sans-serif',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '21px',
    marginBottom: '1rem',
  },
  contents: {
    textAlign: 'center',
    marginTop: '15vh',
  },
  logoContainer: {
    margin: 'auto',
    maxWidth: '350px',
    display: 'flex',
    marginTop: '2rem',
  },
  logoLink: {
    justifyContent: 'center',
    margin: '0 10px',
  },
}))

function Slug({resetSignup, allDocuments}) {
  const history = useRouter()
  const [show, setShow] = useState(0)
  // const { token, email } = useParams();
  const isBrowser = () => typeof window !== 'undefined'

  const token =
    history.query?.slug && history.query?.slug.length > 0
      ? history.query?.slug[0]
      : null
  const email =
    history.query?.slug && history.query?.slug.length > 0
      ? history.query?.slug[1]
      : null

  const classes = useStyles()

  useEffect(() => {
    resetSignup()
  }, [])

  let link = isBrowser() ? `${window.location.hostname}/thank-you` : ''

  return (
    <>
      <HelmetComponent
        title="UrbanServe | Thank You"
        ogTitle="UrbanServe | Thank You"
        description="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogDescription="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogUrl={link}
        createJsonLD={false}
        showNoFollow={true}
      />
      <SiteMainNavbar />
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <div className={classes.contents}>
            <Typography
              className={classes.header}
              component="h3"
              variant="h3"
              style={{marginBottom: '2rem'}}
            >
              Thanks for registering with UrbanServe.
            </Typography>
            <Typography
              className={classes.headerCaption}
              component="h5"
              variant="h5"
              style={{marginBottom: '2rem'}}
            >
              Our team will verify your details and connect with you soon to
              list you as our active Service Provider.
            </Typography>

            <Typography
              className={classes.headerCaption}
              component="h5"
              variant="h5"
            >
              To contact us, please email{' '}
              <a
                href="mailto:support@urbanserve.co.uk"
                style={{color: '#0587ff'}}
              >
                support@urbanserve.co.uk
              </a>
            </Typography>

            <Typography
              className={classes.headerCaption}
              component="h5"
              variant="h5"
            >
              <strong>
                Kindly download the app from below link to start using
                UrbanServe.{' '}
              </strong>
            </Typography>
          </div>

          <div className={classes.logoContainer}>
            <a
              href={process.env.NEXT_PUBLIC_APP_TRADER_GOOGLE}
              target="_blank"
              className={classes.logoLink}
            >
              <img
                src="/site__main__images/android.png"
                width="100%"
                alt="android"
              />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_APP_TRADER_APPLE}
              target="_blank"
              className={classes.logoLink}
            >
              <img src="/site__main__images/apple.png" width="100%" alt="ios" />
            </a>
          </div>
        </div>
      </Container>
      <div className="site__footer">
        <SiteFooter />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  allDocuments: state.TraderReducer?.allDocuments,
})
function mapDispatchToProps(dispatch) {
  return {
    resetSignup: () => dispatch(resetSignup()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Slug)
