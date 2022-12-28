import React from 'react'
import {Button} from 'semantic-ui-react'
import Link from 'next/link'
import Image from 'next/image'

export default function TradesMan(props) {
  return (
    <>
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
      <section className="site__join__wrapper home_bottom_layout ">
        <div className="site__join__container site_lg_container">
          <div className="site__join__main">
            <div className="site__join__content">
              <div className="site__join__img__mb">
                <img
                  src="/site__main__images/join__mb__img.webp"
                  width="100%"
                />
              </div>
              <img
                className="site__join__img__lg"
                src="/site__main__images/site__join.webp"
                width="100%"
              />
              <div className="site__join__info">
                <h3>Want to serve with UrbanServe?</h3>
                <Link href={`${props.redirectTo}`}>
                  <Button className="site__join__btn">
                    {props.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Site Join Ends */}
    </>
  )
}
