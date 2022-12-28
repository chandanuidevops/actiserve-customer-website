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

/* Next JS */
import Router, {useRouter} from 'next/router'

/* Media query detector */
import {useMediaQuery} from 'react-responsive'

import HelmetComponent from '../Helmet'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Images from '../../Assets/Icons'
import {useStyles} from './styles'
import Image from 'next/image'
import SectionQuality from '../Sections/SectionQuality'
const styles = (theme) => ({})

const AccordionData = [
  // About Carpet
  {
    question: 'Will the carpets/rugs shrink?',
    answer:
      'There is no risk of shrinkage because our equipment returns up to 90% of the water to the environment.',
  },
  {
    question: 'How Often Should I Have My Carpets Cleaned?',
    answer: `It is dependent on the household. If your house has children, pets, smokers, or if you're a big family in general, you will have to clean more frequently. It's typically every six to twelve months.`,
  },
  {
    question: 'How long does it take to professionally clean a sofa?',
    answer:
      'Depending on the amount of loose cushions and the degree of soil, a 3-piece sofa set will take between 2 and 3 hours to fully clean.',
  },
  {
    question: 'Can you remove wine, tea, coffee etc?',
    answer:
      'Time is of the essence. To begin with, do not be alarmed; nevertheless, it is critical that you address the problem as soon as possible. If tea leaves are left to sit for too long, they will sink into the carpet fibres, making removal much more difficult. Use chemicals or equipment such as vacuums instead.',
  },
  // About Upholstery Cleaning
  {
    question: 'How Is Upholstery Cleaning Different From Carpet Cleaning?',
    answer:
      'There is a wide difference in how carpet and furniture are cleaned. The best way to clean your upholstery fabric is by using an appropriate detergent, followed by rinsing thoroughly. If you have concerns about whether or not the excess water will damage it in any way then please consult a professional cleaner for advice on what type of products would work well with these types of fabrics before starting this process off!',
  },
  {
    question: 'Why Is It Important To Professionally Clean Furniture?',
    answer: `Upholstery fabric is a crucial component in your home's decor, but it can't stay beautiful for long if you don’t take care of it. Professional cleaners are more thorough than what people think about doing themselves and will extend the lifespan of upholstered furniture by removing dirt from within its fibers that could lead to allergies or respiratory illnesses down the road!`,
  },
  // About Rugs
  {
    question: 'How do I prepare my rug for the upcoming cleaning?',
    answer: `No need for any special preparation. You could remove heavy furniture standing on top of your rug to make cleaning easier, but otherwise the cleaner will cover legs or base if it's left there after being cleaned!`,
  },
  // About Traders
  {
    question: 'Are you insured?',
    answer:
      'Yes all our service providers are insured and have public liability cover as well.',
  },
  {
    question: 'How will your procedures guarantee your safety?',
    answer:
      'If you or any other member of your household has COVID-19 symptoms and has been advised to keep at bay, we will not come to your home. We will not go to homes until a minimum of 21 days have passed since the first indication of COVID-19 in any house. If you or anyone in your family has an underlying health.',
  },
  {
    question:
      'Do you offer Stain Protection Treatments for both Carpets and Upholstery?',
    answer:
      'Yes we offer it for both carpets and upholstery. Please check our offerings in Add-ons for the same.',
  },
]

function CarpetCleaning({}) {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})
  const isMDLaptop = useMediaQuery({query: '(max-width: 1200px)'})

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

  let link = isBrowser()
    ? `${window.location.hostname}/${location}/landing/${url}`
    : ''

  return (
    <>
      <HelmetComponent
        title={`Professional Carpet Cleaning ${
          location?.charAt(0)?.toUpperCase() + location.slice(1)
        } - Upfront Local Pricing`}
        ogTitle={`Professional Carpet Cleaning ${
          location?.charAt(0)?.toUpperCase() + location.slice(1)
        } - Upfront Local Pricing`}
        description="Our Vetted Professional in Leicester provides best carpet cleaning. Book online is less than 60 seconds with upfront local pricing."
        ogDescription="Our Vetted Professional in Leicester provides best carpet cleaning. Book online is less than 60 seconds with upfront local pricing."
        ogUrl={
          isBrowser() &&
          `${window.location.hostname}/${location}/landing/${url}`
        }
        ogImage={Images.imgProductCarpet.src}
      />
      <SiteMainNavbar theme="light" />
      <section className="site__landing__wrapper site__carpet__wrapper">
        <div className=" site__landing_banner__img">
          <div className="site__landing__container site_lg_container">
            <div className="site__landing__content">
              <div className="site__landing__banner">
                <div className="site__landing__banner__item">
                  <h1 class="banner__title">
                    Best Carpet and Upholstery Cleaning Services by trained &
                    vetted professionals
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
            At our carpet and upholstery cleaning services, we offer only the
            best for your home. Our trained & vetted technicians use the latest
            equipment to clean your carpets and upholstery, and our prices are
            unbeatable. We understand how important it is to have a clean home,
            and we're here to help. Schedule a convenient appointment today and
            see the difference our services can make.
          </h2>
        </div>
      </section>

      <section className="site__section__wrapper">
        <div className="site__section__container site_lg_container">
          <h2 className="section__header">Why Choose UrbanServe?</h2>
          <Grid columns={isTabletOrMobile ? 1 : 3}>
            <Grid.Column>
              <div className="site__how__card landing__img_box">
                <Image
                  className="landing__img"
                  src={Images.imgLandingBook.src}
                  width={58}
                  height={58}
                  alt="Book with confidence"
                  objectFit="contain"
                />
                <h3 className="landing__img__title">Book with confidence</h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="site__how__card landing__img_box">
                <Image
                  className="landing__img"
                  src={Images.imgLandingSafe.src}
                  width={58}
                  height={58}
                  alt="You're in safe hands"
                  objectFit="contain"
                />
                <h3 className="landing__img__title">You're in safe hands</h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="site__how__card landing__img_box">
                <Image
                  className="landing__img"
                  src={Images.imgLandingCustomer.src}
                  width={58}
                  height={58}
                  alt="Assured Customer Satisfaction"
                  objectFit="contain"
                />
                <h3 className="landing__img__title">
                  Assured Customer Satisfaction
                </h3>
              </div>
            </Grid.Column>
          </Grid>
          <Grid
            columns={isTabletOrMobile ? 1 : 3}
            style={{padding: '30px 0px 0px'}}
          >
            <Grid.Column>
              <div className="site__how__card landing__img_box">
                <Image
                  className="landing__img"
                  src={Images.imgLandingServices.src}
                  width={58}
                  height={58}
                  alt="Local services at your fingertips"
                  objectFit="contain"
                />
                <h3 className="landing__img__title">
                  Local services at your fingertips
                </h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="site__how__card landing__img_box">
                <Image
                  className="landing__img"
                  src={Images.imgLandingPrice.src}
                  width={58}
                  height={58}
                  alt="Fixed transparent pricing"
                  objectFit="contain"
                />
                <h3 className="landing__img__title">
                  Fixed transparent pricing
                </h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="site__how__card landing__img_box">
                <Image
                  className="landing__img"
                  src={Images.imgLandingApp.src}
                  width={58}
                  height={58}
                  alt="Book and Manage using our App"
                  objectFit="contain"
                />
                <h3 className="landing__img__title">
                  Book and Manage using our App
                </h3>
              </div>
            </Grid.Column>
          </Grid>
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

      {/* <section className="site__section__wrapper bg__dark">
        <div className="site__section__container site_lg_container">
          <div className="site__section__book">
            <h2>Ready To Book?</h2>
            <button
              className="site__section__book__btn"
              onClick={() => routCategory()}
            >
              Book Now
            </button>
          </div>
        </div>
      </section> */}

      <section className="site__section__wrapper bg__main">
        <div className="site__section__container site_lg_container">
          <h2 className="section__header">How it works?</h2>

          <div class="main__work__container">
            <div class="work__list_container">
              <div class="work__list__img_container">
                <img
                  src={Images.imgHowOne.src}
                  alt="Urbanserve Image"
                  width="100%"
                />
              </div>
              <div class="work__list__text_container">
                <h3>Choose Carpet and Upholstery Cleaning</h3>
                <p>
                  Various packages are available to suit your needs, pick one
                  that fits
                </p>
              </div>
            </div>
            <div class="work__list_container">
              <div class="work__list__img_container">
                <img
                  src={Images.imgHowTwo.src}
                  alt="Urbanserve Image"
                  width="100%"
                />
              </div>
              <div class="work__list__text_container">
                <h3>Book at your convenience</h3>
                <p>
                  Select three preferred date(s) and slot(s) as per your
                  convenience
                </p>
              </div>
            </div>
            <div class="work__list_container">
              <div class="work__list__img_container bg__linear_none">
                <img
                  src={Images.imgHowThree.src}
                  alt="Urbanserve Image"
                  width="100%"
                />
              </div>
              <div
                class="work__list__text_container"
                style={{paddingBottom: '0'}}
              >
                <h3>Track and Relax</h3>
                <p>Track and manage your service after you have booked them</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default withStyles(styles)(compose(withConnect)(CarpetCleaning))
