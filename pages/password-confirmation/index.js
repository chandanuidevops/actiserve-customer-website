import React, {useEffect, useState} from 'react'
import {Header, Icon, Image, Statistic, Grid, Segment} from 'semantic-ui-react'
import SiteFooter from '../../components/SiteFooter'
import HelmetComponent from '../../components/Helmet'
import SiteNav from '../../components/SiteMain/SiteMainNavbar'
import Link from 'next/link'
import {useRouter} from 'next/router'
import InvalidAccess from '../../components/InvalidAccess'
import Router from 'next/router'

function PasswordConfirmation() {
  const router = useRouter()
  const isBrowser = () => typeof window !== 'undefined'

  const [currentLocation, setCurrentLocation] = useState(null)
  const [canAccessPage, setCanAccessPage] = useState(null)

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
    if (isBrowser() === true) {
      let location = localStorage.getItem('urbanserve_user_location')
      if (location) {
        setCurrentLocation(location)
      }
    }
  }, [])

  const validatePageAccess = () => {
    let access = localStorage.getItem('can_access_cppage')
    if (access === 'true') {
      setCanAccessPage(true)
    } else {
      setCanAccessPage(false)
    }
  }

  useEffect(() => {
    if (canAccessPage === null) {
      validatePageAccess()
    }
  }, [canAccessPage])

  return (
    <>
      <HelmetComponent
        title="UrbanServe | Password Confirmation"
        description="UrbanServe provides professional carpet cleaning, gutter cleaning and a range of other services. Book online in less than 30 seconds!"
        showDescription={true}
      />
      <SiteNav />
      {canAccessPage ? (
        <section className="site-confirm-wrapper">
          <div className="container site-confirm-container">
            <Header as="h2" icon textAlign="center">
              <Header.Content
                className="site-confirm-title"
                style={{paddingBottom: 5}}
              >
                Thanks for the verifcation & setting your password
                <br />
              </Header.Content>
            </Header>
            <Header as="h2" icon textAlign="center">
              <Header.Content
                className="site-confirm-title"
                style={{paddingBottom: 5}}
              >
                You can now Login In to UrbanServe App & manage your orders.
              </Header.Content>
            </Header>

            <div className="site-confirm-details">
              <p className="site-confirm-helper">
                Download the App from below links
              </p>
              <div className="site-confirm-apps">
                <a href={process.env.NEXT_PUBLIC_APP_GOOGLE} target="_blank">
                  <img src="/images/footer-gapp.png" />
                </a>

                <a href={process.env.NEXT_PUBLIC_APP_APPLE} target="_blank">
                  <img
                    className="app-google"
                    src="/images/footer-apple-app.png"
                  />
                </a>
              </div>
              <br />
              <p className="site-confirm-helper">Welcome to UrbanServe!</p>
              <Link style={{cursor: 'pointer'}} href={`/${currentLocation}`}>
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
      ) : (
        <InvalidAccess
          pageAccess="Password Confirmation"
          title="Invalid Access!"
        />
      )}

      <SiteFooter />
    </>
  )
}

export default PasswordConfirmation
