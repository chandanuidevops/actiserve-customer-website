import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

/* Components */
import SiteMainNavbar from '../SiteMain/SiteMainNavbar'
import SiteFooter from '../SiteFooter'

/* Material ui */
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'

/* Semantic UI */
import {Button} from 'semantic-ui-react'

/* Next JS */
import {useRouter} from 'next/router'
import Images from '../../Assets/Icons'
import Image from 'next/image'

import HelmetComponent from '../Helmet'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {useStyles} from './styles'
import SectionLandingHow from '../Sections/SectionLandingHow'
import SectionLandingWhy from '../Sections/SectionLandingWhy'
/* Media query detector */
import {useMediaQuery} from 'react-responsive'
const AccordionData = [
  {
    question: `What is the end of tenancy clean?`,
    answer: `In the UK, most tenants are required to clean up after themselves when they move out. This is known as an "end of tenancy cleaning." The process can be done either by sending someone in who does it for you or doing it yourself with help from professionals if needed!`,
  },
  {
    question: `Are your cleaners insured?`,
    answer: `We place a high value on safety and security, so all of our cleaners are insured. They also have to be bonded or background checked before they can work for us!`,
  },
  {
    question: `Do you provide the cleaning materials and equipment?`,
    answer: `We work with a team of professionals who will bring their own equipment composed entirely out eco-friendly and safe cleaning products. However, if you would like us to use your favourite brand instead just let the customer service agent know beforehand so they can accommodate accordingly!`,
  },
  {
    question: `How long typically oven cleaning is required?`,
    answer: `Average oven cleaning time is around 1.5 - 2 Hours.`,
  },
  {
    question: `How often should I clean my oven?`,
    answer: `You should wipe down your oven at least once a month to avoid the buildup of dirt and food particles, which can lead not only to an unpleasant odour but also harmful chemicals. If you’ve cooked something that has splattered everywhere (such as roast or casserole), then do yourself another favour by giving it a quick clean when cooled after use - just be sure not touch any exposed parts with wet hands until afterward!`,
  },
]

function EndOfTenacy({}) {
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
        title={`End of Tenancy Cleaning | Book Now | UrbanServe`}
        ogTitle={`End of Tenancy Cleaning | Book Now | UrbanServe`}
        description="Our cleaners are fully insured and vetted, you know that your premises will be taken care of by qualified professionals. Book an appointment at a time convenient to you."
        ogDescription="Our cleaners are fully insured and vetted, you know that your premises will be taken care of by qualified professionals. Book an appointment at a time convenient to you."
        ogUrl={link}
        ogImage={Images.imgProductEOT.src}
      />

      <SiteMainNavbar />

      <section className="site__landing__wrapper site__eot__wrapper">
        <div className=" site__landing_banner__img">
          <div className="site__landing__container site_lg_container">
            <div className="site__landing__content">
              <div className="site__landing__banner">
                <div className="site__landing__banner__item">
                  <h1 class="banner__title">
                    Looking for a top-rated Cleaning Service to help you move
                    out? Our Move Out Cleaning Services will take care of
                    everything, from the floors to the ceilings!
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
            UrbanServe provides a professional, budget-friendly End of Tenancy
            cleaning service near you. We offer top-notch end-of-tenancy
            cleaning services at affordable prices, and our deep cleaning
            services are tailored to meet your budget. Our cleaners are highly
            trained and background-checked, and their services are flexible and
            tailored to meet your needs. Our aim is to provide you with the best
            possible cleaning experience, and we pride ourselves on the high
            standards of customer service. Book an appointment today!
          </h2>
        </div>
      </section>

      <SectionLandingWhy />

      <SectionLandingHow title="End of Tenancy or Deep Cleaning" />

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

export default compose(withConnect)(EndOfTenacy)
