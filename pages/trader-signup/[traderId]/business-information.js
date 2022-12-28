import React, {useEffect} from 'react'
import {makeStyles, Container} from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {compose} from 'redux'
import Documents from '../../../components/TraderSignup/Documents'
import SiteMainNavbarV3 from '../../../components/SiteMain/SiteMainNavbar/SiteMainNavbarV3'
import Router, {useRouter} from 'next/router'
import StepperTrader from '../../../components/StepperTrader'
import HelmetComponent from '../../../components/Helmet'
const useStyles = makeStyles((theme) => ({
  root: {
    background: '#f7f9fb',
    [theme.breakpoints.up('1024')]: {
      padding: '0rem 0rem',
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return [
    'Register',
    'Pesonal Information',
    'Post Codes',
    'Business Information',
  ]
}

function Businessinformation({currentActiveStep}) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(3)
  const steps = getSteps()
  const router = useRouter()
  function getStepContent(stepIndex) {
    return <Documents stepValue={activeStep} setActiveStep={setActiveStep} />
  }

  const isBrowser = () => typeof window !== 'undefined'

  return (
    <>
      <HelmetComponent
        title={`UrbanServe | Sign Up - Businees Information`}
        ogTitle={`UrbanServe | Sign Up - Businees Information`}
        description={`Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs`}
        ogDescription={`Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs`}
        ogUrl={isBrowser() && `${window?.location?.hostname}/trader-signup`}
        createJsonLD={false}
      />
      <SiteMainNavbarV3 />
      <StepperTrader
        stepNum={4}
        activeStep={['docs']}
        completeStep={['register', 'info', 'postcodes']}
      />
      <div>
        {activeStep === steps.length ? (
          <div>
            <DownloadFileSuccess />
          </div>
        ) : (
          <div className={classes.root}>{getStepContent(activeStep)}</div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = ({AuthReducer}) => ({})

const withConnect = connect(mapStateToProps, null)

export default compose(withConnect)(Businessinformation)
