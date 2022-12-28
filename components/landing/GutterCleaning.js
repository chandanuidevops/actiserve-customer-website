import React, {useEffect, useState, useRef} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'

/* Components */
import SiteMainNavbar from '../SiteMain/SiteMainNavbar'
import SiteFooter from '../SiteFooter'

/* Material ui */
import {withStyles} from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core'

/* Semantic UI */
import {Grid, Segment, Loader, Button, Card} from 'semantic-ui-react'
import Image from 'next/image'
import Images from '../../Assets/Icons'

/* Next JS */
import {useRouter} from 'next/router'

import HelmetComponent from '../Helmet'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {useStyles} from './styles'
import SectionLandingWhy from '../Sections/SectionLandingWhy'
import SectionLandingHow from '../Sections/SectionLandingHow'
/* Media query detector */
import {useMediaQuery} from 'react-responsive'

const AccordionData = [
  // About Carpet
  {
    question: 'What are the benefits of having clean gutters?',
    answer: `The importance of having your gutters cleaned can't be overstated. All that buildup from leaves and other debris in the Fall is sure to cause problems, which could lead not only costly repair work but also more serious issues like foundation cracks or roof leaks!`,
  },
  {
    question: 'Can you clean all types of gutters?',
    answer: `We can clean any type of guttering system, but we cannot clear gutters with guardrail features or downpipes that go below ground level.`,
  },
  {
    question: `Do I have to do something before the gutter cleaners arrive?`,
    answer: `Yes, you will need to provide ground access for the gutters and source of electricity so that a professional can come out.`,
  },
  {
    question: `Do you offer vegetation removal from gutters?`,
    answer: `Yes, we can remove vegetation growing in your gutters for an additional fee. The best way to ensure that all of the leaves are cleared from your guttering is by having us do it!`,
  },
  {
    question: `How important is it to have a free parking space outside the property?`,
    answer: `The gutter cleaning machine is very heavy, so it's preferable to have the parking outside the property.`,
  },
  {
    question: `Can you clean the downpipes as well?`,
    answer: `Yes, we provide downpipe cleaning, but only for downpipes that are above ground level.`,
  },
  {
    question: `Are the gutter cleaners experts?`,
    answer: `Absolutely! All gutter cleaners in London we work with are professionally trained and experienced. Also, they are fully insured.`,
  },
]

function GutterCleaning({}) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const router = useRouter()
  const location = router?.query?.location
  const url = router?.query?.category
  const routCategory = () => {
    router.push(`/${location}/${url}`)
  }
  const isBrowser = () => typeof window !== 'undefined'

  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})
  const isMDLaptop = useMediaQuery({query: '(max-width: 1200px)'})

  let link = isBrowser()
    ? `${window.location.hostname}/${location}/landing/${url}`
    : ''

  console.log('link:::', link)

  return (
    <>
      <HelmetComponent
        title={`Gutter Cleaning ${
          location?.charAt(0)?.toUpperCase() + location.slice(1)
        }  | UrbanServe`}
        description="Schedule a professional gutter cleaning with UrbanServe and enjoy a clean home without all the hassle. Book now and see the difference we can make."
        ogTitle={`Gutter Cleaning ${
          location?.charAt(0)?.toUpperCase() + location.slice(1)
        }  | UrbanServe`}
        ogDescription="Schedule a professional gutter cleaning with UrbanServe and enjoy a clean home without all the hassle. Book now and see the difference we can make."
        ogUrl={link}
        ogImage={Images.imgProductGutter.src}
      />

      <SiteMainNavbar />

      <section className="site__landing__wrapper site__gutter__wrapper">
        <div className=" site__landing_banner__img">
          <div className="site__landing__container site_lg_container">
            <div className="site__landing__content">
              <div className="site__landing__banner">
                <div className="site__landing__banner__item">
                  <h1 class="banner__title">
                    Professional Gutter Cleaning Services
                  </h1>
                  <ul className="banner_list">
                    <li className="banner_list_item">
                      <Image
                        className="banner_list_item_img"
                        src={Images.imgLandingArrow.src}
                        width={28}
                        height={28}
                        alt="Book with confidence"
                        objectFit="contain"
                      />
                      <span>No calling for quotes</span>
                    </li>
                    <li className="banner_list_item">
                      <Image
                        className="banner_list_item_img"
                        src={Images.imgLandingArrow.src}
                        width={28}
                        height={28}
                        alt="Book with confidence"
                        objectFit="contain"
                      />
                      <span>Fixed upfront prices</span>
                    </li>
                    <li className="banner_list_item">
                      <Image
                        className="banner_list_item_img"
                        src={Images.imgLandingArrow.src}
                        width={28}
                        height={28}
                        alt="Book with confidence"
                        objectFit="contain"
                      />
                      <span>Book online in less than 60 seconds</span>
                    </li>
                  </ul>
                  <Button
                    className="site__link__btn "
                    onClick={() => routCategory()}
                  >
                    Book Now
                  </Button>
                </div>
                {/* <div className="site__landing__banner__item banner__item__center">
                  <div
                    style={{
                      position: 'relative',
                      width: isTabletOrMobile
                        ? '250px'
                        : isMDLaptop
                        ? '300px'
                        : '400px',
                      height: isTabletOrMobile
                        ? '250px'
                        : isMDLaptop
                        ? '300px'
                        : '300px',
                      margin: isTabletOrMobile
                        ? '30px auto 0px auto'
                        : isMDLaptop
                        ? '0px auto 0px auto'
                        : '-60px auto 0px auto',
                    }}
                  >
                    <Image
                      className="banner_list_item_img"
                      src={Images.imgProductCarpet.src}
                      alt="Book with confidence"
                      width="100%"
                      height="100%"
                      layout="responsive"
                    />
                  </div>
                  <div className="align_center">
                    <Button
                      className="site__link__btn site__landing__banner__btn__tablet"
                      onClick={() => routCategory()}
                    >
                      Book Now
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site__subheader__wrapper">
        <div className="site_lg_container site__subheader__container">
          <h2 className="subheader__title">
            Looking for a reliable, local gutter cleaning service? Look no
            further than UrbanServe! Our team of expert cleaners will quickly
            and efficiently clean your gutters, removing all leaves, debris and
            dirt. We also offer gutter repairs and maintenance services, so you
            can rest assured your gutters are in good hands. We're also experts
            in conservatory and solar panel cleaning - perfect for keeping your
            home looking its best. Try our cleaning services Today!
          </h2>
        </div>
      </section>

      <SectionLandingWhy />

      <SectionLandingHow title="Gutter Cleaning" />

      <section className="site__section__wrapper">
        <div className="site__section__container site_lg_container">
          <h2 className="section__header" align="center">
            Frequently Asked Questions
          </h2>

          <div class="faq__container">
            {AccordionData?.length > 0 &&
              AccordionData?.map((data, index) => (
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  classes={{
                    root: classes.MuiAccordionroot,
                  }}
                >
                  <AccordionSummary
                    classes={{
                      content: classes.MuiAccordionSummary,
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <h3 className="accordian__title">{data?.question}</h3>
                  </AccordionSummary>
                  <AccordionDetails
                    classes={{
                      root: classes.MuiAccordionroot,
                    }}
                  >
                    <p className="accordian__details">{data?.answer}</p>
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>

          <div className="site__landing__cta">
            <h2>Book online in less than 60 seconds</h2>
            <button
              className="site__section__book__btn"
              onClick={() => routCategory()}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const withConnect = connect(null, mapDispatchToProps)

export default compose(withConnect)(GutterCleaning)
