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

import {useStyles} from './styles'
import SectionQuality from '../Sections/SectionQuality'
const styles = (theme) => ({})
function BoilerService({}) {
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
  return (
    <>
      <HelmetComponent
        title="UrbanServe - Hassle Free On Demand Services - Confirmation"
        description="Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs"
        ogTitle="Hassle Free On Demand Services"
        ogType="urbanserve company"
        ogUrl="https://www.urbanserve.co.uk/_next/static/media/us__bg.d0fa5dd44f8b1f3cf42a539fbc809585.webp"
        ogImage="https://www.urbanserve.co.uk/_next/static/media/us__bg.d0fa5dd44f8b1f3cf42a539fbc809585.webp"
        ogDescription="Hassle Free On Demand Services"
      />
      <SiteMainNavbar />
      <section className="site__landing__wrapper site__landing_banner__img">
        <div className="site__landing__container site_lg_container">
          <div className="site__landing__content">
            <h1 class="banner__title">
              <span>Best AC Service &amp; Repair with Experts</span>
            </h1>
            <Button
              className="site__join__btn site__link__btn"
              onClick={() => routCategory()}
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>

      <section className="site__section__wrapper bg__gray">
        <div className="site__section__container site_lg_container">
          <h1 className="section__header">
            Why Video Consult with Urban Company?
          </h1>

          <Grid>
            <Grid.Column tablet={8} computer={8}>
              <div className="site__how__card landing__img_box">
                <img
                  className="landing__img"
                  src="/sit__landing__images/insurance.png"
                  alt="Accurate Diagnosis"
                  width="100%"
                />
                <h3 className="landing__img__title">Accurate Diagnosis</h3>
              </div>
            </Grid.Column>
            <Grid.Column tablet={8} computer={8}>
              <div className="site__how__card landing__img_box">
                <img
                  className="landing__img"
                  src="/sit__landing__images/insurance.png"
                  alt="Accurate Diagnosis"
                  width="100%"
                />
                <h3 className="landing__img__title">15+ Years of Experience</h3>
              </div>
            </Grid.Column>
            <Grid.Column tablet={8} computer={8}>
              <div className="site__how__card landing__img_box">
                <img
                  className="landing__img"
                  src="/sit__landing__images/insurance.png"
                  alt="Accurate Diagnosis"
                  width="100%"
                />
                <h3 className="landing__img__title">Correct Cost Estimates</h3>
              </div>
            </Grid.Column>
            <Grid.Column tablet={8} computer={8}>
              <div className="site__how__card landing__img_box">
                <img
                  className="landing__img"
                  src="/sit__landing__images/insurance.png"
                  alt="Accurate Diagnosis"
                  width="100%"
                />
                <h3 className="landing__img__title">
                  Quick Resolution in 5 Minutes
                </h3>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </section>

      <section className="site__section__wrapper ">
        <div className="site__section__container site_lg_container">
          <h1 className="section__header" align="left">
            How our video consult works?
          </h1>

          <div class="main__work__container">
            <div class="work__list_container">
              <div class="work__list__img_container">
                <img src="/sit__landing__images/icon.png" />
              </div>
              <div class="work__list__text_container">
                <h3>Instant Free Video Call with Expert</h3>
                <p>
                  Our expert technicians having 15+ years experience will
                  connect with you via WhatsApp video call
                </p>
              </div>
            </div>
            <div class="work__list_container">
              <div class="work__list__img_container">
                <img src="/sit__landing__images/icon.png" />
              </div>
              <div class="work__list__text_container">
                <h3>Accurate Diagnosis &amp; Resolution</h3>
                <p>
                  For minor issues, our expert will help you accurately diagnose
                  and resolve the issue with your AC
                </p>
              </div>
            </div>
            <div class="work__list_container">
              <div class="work__list__img_container">
                <img src="/sit__landing__images/icon.png" />
              </div>
              <div class="work__list__text_container">
                <h3>Cost Estimates</h3>
                <p>
                  Incase there is a major issue, our expert will share the
                  correct estimates with you beforehand
                </p>
              </div>
            </div>
            <div class="work__list_container">
              <div class="work__list__img_container bg__linear_none">
                <img src="/sit__landing__images/icon.png" />
              </div>
              <div
                class="work__list__text_container"
                style={{paddingBottom: '0'}}
              >
                <h3>Schedule an In-Person Visit</h3>
                <p>
                  If required, our expert will help you schedule a booking for
                  In-Person Repair with UC
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site__section__quality">
        <SectionQuality />
      </section>

      <section className="site__section__wrapper bg__gray">
        <div className="site__section__container site_lg_container">
          <h1 className="section__header" align="center">
            Frequently Asked Questions
          </h1>

          <div class="faq__container">
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
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
                <h3 className="accordian__title">
                  What if I cannot pick up the Video Call?
                </h3>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.MuiAccordionroot,
                }}
              >
                <p className="accordian__details">
                  We will try to call you 3 times. In case you are unable to
                  connect with us, you can book the free video consultation
                  service again.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
              classes={{
                root: classes.MuiAccordionroot,
              }}
            >
              <AccordionSummary
                classes={{
                  content: classes.MuiAccordionSummary,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <h3 className="accordian__title">
                  How long will it take to repair my appliance?
                </h3>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.MuiAccordionroot,
                }}
              >
                <p className="accordian__details">
                  We understand that appliances are essential for daily use and
                  our professionals will try to repair it in the shortest time
                  possible. Repair time depends on factors such as issue &
                  availability of spare parts.
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
              classes={{
                root: classes.MuiAccordionroot,
              }}
            >
              <AccordionSummary
                classes={{
                  content: classes.MuiAccordionSummary,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <h3 className="accordian__title">
                  {' '}
                  What if the same issue occurs again?
                </h3>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.MuiAccordionroot,
                }}
              >
                <p className="accordian__details">
                  Our professionals are highly skilled and will repair your
                  appliance with utmost efficiency. But if you feel the same
                  issue is occurring again, we’ll be happy to revisit! Check our
                  UC Warranty section on UC App for more details.
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
              classes={{
                root: classes.MuiAccordionroot,
              }}
            >
              <AccordionSummary
                classes={{
                  content: classes.MuiAccordionSummary,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <h3 className="accordian__title">
                  {' '}
                  How can I be sure that genuine products are being used?
                </h3>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.MuiAccordionroot,
                }}
              >
                <p className="accordian__details">
                  We value your trust in Urban Company and we believe in
                  providing high quality service. We ensure all spare parts used
                  meet our high quality standards. Please check the rate card on
                  UC App for more details.
                </p>
              </AccordionDetails>
            </Accordion>
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

export default withStyles(styles)(compose(withConnect)(BoilerService))
