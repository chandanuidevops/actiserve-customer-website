import React from 'react'
/* Material UI */
import {Button} from '@material-ui/core'
import Link from 'next/link'
import HelmetComponent from '../Helmet'
export default function SiteTradesMan() {
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
      {/* Site TradesMan Starts */}
      <section className="site__tradesman__wrapper">
        <div className="site__tradesman__container site_lg_container">
          <h2 className="tradesman__header">
            Are you a Tradesman? Interested in providing your service?
          </h2>
          <p className="tradesman__info">
            UrbanServe can revamp your customer reach to attain the full
            potential of your business. Entering the new turf for scaling your
            business is expensive, but with UrbanServe, you can take a leap of
            expansion with just a click and find new customers never sought
            before.
          </p>
        </div>
      </section>
      {/* Site TradesMan Ends */}

      {/* Site Join Starts */}
      <section className="site__join__wrapper">
        <div className="site__join__container site_lg_container">
          <div className="site__join__main">
            <div className="site__join__content">
              <div className="site__join__img__mb">
                <img src="/site__main__images/join__mb__img.png" width="100%" />
              </div>
              <img
                className="site__join__img__lg"
                src="/site__main__images/site__join.png"
                width="100%"
              />
              {/* <div className="site__join__img">
            <img src="/site__main__images/site__join.png" alt="Urbanserve Image" width="100%" />
        </div> */}
              <div className="site__join__info">
                <h3>Want to serve with UrbanServe?</h3>

                <a
                  target="_blank"
                  href="/tradespeople"
                  rel="noopener noreferrer"
                >
                  <Button className="site__join__btn">Find out more</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Site Join Ends */}
    </>
  )
}
