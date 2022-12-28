import React from 'react'
import {Header, Icon, Image, Statistic, Grid, Segment} from 'semantic-ui-react'
import SiteFooter from '../../components/SiteFooter'
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar'
import siteImages from '../../Assets/Icons'
import HelmetComponent from '../../components/Helmet'
import Head from 'next/head'
import Router, {useRouter} from 'next/router'

function About() {
  const isBrowser = () => typeof window !== 'undefined'
  const router = useRouter()

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
        name: `https://www.urbanserve.co.uk/about`,
      },
    ],
  }

  console.log('router::', router)

  return (
    <>
      <HelmetComponent
        title={`UrbanServe | About Us`}
        ogTitle={`UrbanServe | About Us`}
        description="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogDescription="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogUrl={isBrowser() && `${window?.location?.hostname}/about`}
        createJsonLD={true}
        jsonLDData={breadCrumb}
      />
      <SiteMainNavbar />
      <div className="site__about__header">
        <h1>About Us</h1>
      </div>
      <section className="site__about__wrapper">
        <div className="site__about__container">
          <div className="site__about__content">
            <div className="site__about__card">
              <h2>Who we are</h2>
              <p>
                We are a Tech Startup in Leicester that aims to provide Hassle
                Free on Demand Services. UrbanServe offers their clients and
                service providers an intuitive app that enables customers and
                service providers to book, execute, and monitor their services
                in real time, while keeping a record of all past and future
                services. UrbanServe makes it possible for service providers to
                reach jobs that are not accessible to them and to keep up with
                work schedules with Dairy Management. Using our app & web
                service you can join & register for free.
              </p>
            </div>
            <div className="site__about__card">
              <h2>How We Do It</h2>
              <p>
                UrbanServe offers a platform for users to find specific services
                by giving them an upfront price and removing the stress of
                having to call, authenticate, fix price, book, chase, and follow
                up. The service providers & individual professionals on the
                platform are thoroughly vetted by the company prior to listing
                their services. When the user visits the platform, the matching
                algorithm identifies professionals who match the user's
                requirements and are available at the requested time and date.
              </p>
            </div>
            <div className="site__about__card">
              <h2>Our Vision</h2>
              <p>
                In order to enrich the market of beauty, cleaning, and
                installation services across the UK, our vision is to bring
                standardisation to on demand service offerings with upfront and
                fair prices. To ensure our customers have access to the best
                quality services, we plan to enhance ease of access for our
                vetted trading partners and to facilitate operations management
                for them.
              </p>
            </div>
            <div className="site__about__card">
              <h2>Our Leadership Team</h2>
            </div>
            <div className="site__about__leader">
              <div className="leader__card">
                {/* <div   className="leader__card__img" >
                  <img src= "/site__main__images/vedant.jpg"        />
                </div> */}

                <h2>Vedant Mistry (MD & CEO)</h2>

                {/* <div className={classes.leader__card__img}>
                  <Image
                    src={item?.icon}
                    alt="Urbanserve Icon"
                    layout="fill"
                    objectFit="contain"
                    quality={100}
                  />
                </div> */}
                <p>
                  Vedant is the Tech Enthusiast and is responsible to lead
                  Technical Advancement of the Product with the keen interest in
                  managing the Marketing & Finance at UrbanServe. With a decade
                  of experience in IT Developments, he pros in identifying the
                  roadmap for Tech Advancement in UrbanServe. When not busy
                  Vedant enjoys immersing himself in interesting experiences
                  outdoors be it social or sports events and loves cooking at
                  his leisure time.
                </p>
              </div>
              <div className="leader__card">
                <div className="leader__card__img">
                  <img src="/site__main__images/prashant.jpg" />
                </div>
                <h2>Prashant Singh (COO & CHRO)</h2>
                <p>
                  Prashant loves partnering with leadership to establish and
                  continuously improve an awesome culture & employee experience
                  at UrbanServe. While overlooking day to day operations he is
                  also focused in improvising & optimization of industry
                  practices for imparting amazing client experience. In his free
                  time, Prashant finds himself exploring nature and driving his
                  passion for adventure by riding & trekking tough terrains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}

export default About
