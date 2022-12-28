import React from 'react'

import App from 'next/app'
// import wrapper from '../test/store/store-wrapper'
import wrapper from '../Stores/store'
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'next/router'
import 'semantic-ui-css/semantic.min.css'
import Routes from '../utils/routes'
import actions from '../Stores/Auth/actions'
import '../Assets/styles/style.scss'
import '../Assets/styles/home.css'
import 'react-modern-drawer/dist/index.css'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import 'react-pro-sidebar/dist/css/styles.css'
import Router from 'next/router'
import Nprogress from 'nprogress'
import NextNProgress from '../components/NProgress'
import RouteIndicator from '../utils/routeIndicator'
import Alerts from '../components/Alerts'
const {check} = actions
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider} from '@material-ui/core/styles'
// Utils
import theme from '../Theme/theme'
import CookieConsent, {Cookies} from 'react-cookie-consent'
import Link from 'next/link'

class ExampleApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ctx})
    }

    return {pageProps}
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    let history = this.props.router
    console.log(':', typeof window, history)

    if (history.asPath !== history.route && history.route == '/') {
      history.push(history.asPath)
    }
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token')

      if (token !== null) {
        let index = Routes.indexOf(history.route)
        this.props.checkAuth(token, history)
      } else {
        let index = Routes.indexOf(history.route)
        if (index == -1) {
          // history.replace('/login')
        }
      }
    }
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <NextNProgress />
          <RouteIndicator />
          <Alerts />
          <CookieConsent
            location="bottom"
            buttonText="I understand"
            cookieName="myAwesomeCookieName2"
            style={{background: '#21262b'}}
            buttonStyle={{
              color: '#fff',
              fontSize: '14px',
              fontFamily: 'Urbanist-SemiBold,sans-serif',
              background: '#0587ff',
              borderRadius: '5px',
              padding: '10px 15px',
            }}
            expires={150}
          >
            <p>
              We use cookies to improve user experience and analyze website
              traffic. By clicking “I understand“, you agree to our website's
              cookie use as described in our Privacy Policy.
            </p>
            <Link href="/privacy-and-cookie-policy">Privacy Policy</Link>
          </CookieConsent>
        </ThemeProvider>
      </>
    )
  }
}

const mapStateToProps = ({AuthReducer}) => ({
  isAuthenticating: AuthReducer.isAuthenticating,
  isAuthenticated: AuthReducer.isAuthenticated,
  isAuthSagaRegistered: AuthReducer.isSagaRegistered,
})
const mapDispatchToProps = (dispatch) => ({
  checkAuth: (...params) => dispatch(check(...params)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default wrapper.withRedux(compose(withConnect)(withRouter(ExampleApp)))

// export default connect(mapStateToProps, mapDispatchToProps)(ExampleApp);
// export default wrapper.withRedux(ExampleApp)
