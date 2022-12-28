import React from 'react'
import SiteFooter from '../../components/SiteFooter'
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar'
import HelmetComponent from '../../components/Helmet'
import Link from 'next/link'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import Image from 'next/image'
import Head from 'next/head'

function Contact() {
  let breadCrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'UrbanServe',
        item: 'https://www.urbanserve.co.uk',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `https://www.urbanserve.co.uk/contact`,
      },
    ],
  }
  const isBrowser = () => typeof window !== 'undefined'

  let link = isBrowser() ? `${window.location.hostname}/contact` : ''

  return (
    <>
      <HelmetComponent
        title={`UrbanServe | Contact`}
        ogTitle={`UrbanServe | Contact`}
        description="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogDescription="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogUrl={isBrowser() && `${window?.location?.hostname}/contact`}
        createJsonLD={true}
        jsonLDData={breadCrumb}
      />

      <SiteMainNavbar />
      <div className="site__about__header">
        <h1>Contact Us</h1>

        <p className="pt">
          For any queries, contact us:{' '}
          <a href="mailto:support@urbanserve.co.uk">
            <span>support@urbanserve.co.uk</span>
          </a>
        </p>
        <p className="pt">
          Please call us on{' '}
          <a href="tel:0116 462 0012">
            <span>0116 462 0012</span>
          </a>{' '}
          to speak with one of our team members.
        </p>
        <p className="pt">Reach us on:</p>
        <p>Monday to Saturday: 09:00 - 18:00</p>
        <p>Sunday: 09:00 - 14:00</p>
      </div>
      <section className="site__contact__wrapper">
        <div className="site__contact__container container">
          <div className="site__contact__map">
            <Image
              src={'/site__main__images/site__map.png'}
              alt="Urbanserve Icon"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
          <div className="site__contact__address">
            <div className="address__card">
              <h2>Leicester</h2>
              <p>Address</p>
              <p>
                12 Saint Helens Close, <br />
                Leicester, United Kingdom <br />
                LE4 0GR
              </p>
            </div>
            {/* <div className="address__card">
              <h2>Ahmedabad</h2>
              <p>Address</p>
              <p>
                Office No.1001, Shitiratna Complex, <br /> Panchvati Cross Road,
                CG Road Panchavati,
                <br />
                Ahmedabad, Gujarat 380006
              </p>
            </div> */}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}

export default Contact
