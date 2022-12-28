import React from 'react'

/* Components */
import Navbar from '../../components/Section/Navbar'
import TraderHowItWorks from '../../components/Section/TraderHowItWorks'
import TraderAppPromotions from '../../components/Section/TraderAppPromotions'
import SiteFooter from '../../components/SiteFooter'
import TraderBanner from '../../components/Section/TraderBanner'
import TradesMan from '../../components/Section/TradesMan'
import HelmetComponent from '../../components/Helmet'
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar'

export default function Tradesman() {
  const isBrowser = () => typeof window !== 'undefined'
  let link = isBrowser() ? `${window.location.hostname}/tradespeople` : ''

  return (
    <>
      <HelmetComponent
        title={`UrbanServe - Hassle Free On Demand Services`}
        ogTitle={`UrbanServe - Hassle Free On Demand Services`}
        description={`Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs`}
        ogDescription={`Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs`}
        ogUrl={link}
        createJsonLD={false}
      />
      <SiteMainNavbar />
      <TraderBanner />
      <TraderHowItWorks />
      <TradesMan redirectTo="trader-signup" buttonText="Join Us" />
      <TraderAppPromotions />
      <SiteFooter />
    </>
  )
}
