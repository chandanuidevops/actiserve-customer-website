import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

/* Components */
import SiteMainNavbar from '../SiteMain/SiteMainNavbar'
import SiteFooter from '../SiteFooter'

/* Material ui */
import {withStyles} from '@material-ui/core/styles'
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'

/* Semantic UI */
import {Grid, Segment, Loader, Button, Card} from 'semantic-ui-react'

/* Next JS */
import {useRouter} from 'next/router'
import Images from '../../Assets/Icons'
import Image from 'next/image'

import HelmetComponent from '../Helmet'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import SectionLandingHow from '../Sections/SectionLandingHow'
import SectionLandingWhy from '../Sections/SectionLandingWhy'

import {useStyles} from './styles'
/* Media query detector */
import {useMediaQuery} from 'react-responsive'
const AccordionData = [
  {
    question: `Are you a completely mobile car valeting company?`,
    answer: `Yes, we are fully mobile and we're happy to visit you at your home or office. Either one is fine with us!`,
  },
  {
    question: `Do you need access to power and water to valet my car?`,
    answer: `No, we don't need access to electricity and water. However we would be grateful if you could provide us!`,
  },
  {
    question: `Do you need access to power and water to valet my car?`,
    answer: `No, we don't need access to electricity and water. However we would be grateful if you could provide us!`,
  },
  {
    question: `How long will it take to valet my vehicle?`,
    answer: `It depends on the package selected and the degree of soiling.`,
  },
  {
    question: `What is the benefit of car valeting?`,
    answer: `We can clean your vehicle at your workplace or house. You don't need to be present.`,
  },
  {
    question: `Will my seats be wet after cleaning?`,
    answer: `Maybe not wet but moist. It is not necessary to open the windows fully, but it's recommended that you turn on the heating in your car and slightly roll down one window.`,
  },
  {
    question: `Can you get a same day booking?`,
    answer: `It can depend on whether another client cancels their appointment. We would recommend at least 24-48 hours notice as the day of appointments may not always be available`,
  },
  {
    question: `Do you work on weekends?`,
    answer: `Yes, we work 7 days a week.`,
  },
  {
    question: `What happens if it rains or is windy that will affect the valet?`,
    answer: `Rain is no problem for us, but it's important to be aware of the wind. Applying protective coatings or machine polishing during rain may cause unwanted damage!`,
  },
]

function MobileCarValeting({}) {
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
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})
  const isMDLaptop = useMediaQuery({query: '(max-width: 1200px)'})

  const isBrowser = () => typeof window !== 'undefined'

  let link = isBrowser()
    ? `${window.location.hostname}/${location}/landing/${url}`
    : ''

  return (
    <>
      <HelmetComponent
        title={`Mobile Car Valeting - Professional | ${
          location?.charAt(0)?.toUpperCase() + location.slice(1)
        }`}
        ogTitle={`Mobile Car Valeting - Professional | ${
          location?.charAt(0)?.toUpperCase() + location.slice(1)
        }`}
        description="Professional mobile car valeting from UrbanServe. Choose from a range of services, including interior and exterior washing, detailing, and more. Upfront Prices, Book Now!"
        ogDescription="Professional mobile car valeting from UrbanServe. Choose from a range of services, including interior and exterior washing, detailing, and more. Upfront Prices, Book Now!"
        ogUrl={link}
        ogImage={Images.imgProductMCV.src}
      />

      <SiteMainNavbar />

      <section className="site__landing__wrapper site__mobile__wrapper">
        <div className=" site__landing_banner__img">
          <div className="site__landing__container site_lg_container">
            <div className="site__landing__content">
              <div className="site__landing__banner">
                <div className="site__landing__banner__item">
                  <h1 class="banner__title">
                    We'll come to you for a Mobile Car Wash that's convenient
                    and affordable.
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
          <h1 className="subheader__title">
            Looking for a mobile car wash that comes to you? Look no further
            than UrbanServe. Our wide range of mobile car wash services includes
            interior and exterior washing, mobile car valeting, and detailing.
            We'll come to your home or place of work, and we offer highly
            effective car cleaning methods tailored to your needs. We offer
            scratch-resistant ceramic coatings, high-gloss finishes, and
            detailing services. So if you're looking to make your car look brand
            new again, book with UrbanServe today. You'll be driving with pride
            in no time!
          </h1>
        </div>
      </section>

      <SectionLandingWhy />

      <SectionLandingHow title="Mobile Car Valeting" />

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

export default compose(withConnect)(MobileCarValeting)
