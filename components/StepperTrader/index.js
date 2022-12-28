import React from 'react'

/* Images */
import siteImages from '../../Assets/Icons/index'

import {useRouter} from 'next/router'
import {useMediaQuery} from 'react-responsive'

export default function StepperTrader(props) {
  // register , info , postcode, docs
  const {stepNum, activeStep, completeStep} = props
  const router = useRouter()

  const classGenerator = (currentStepItem) => {
    let classString = 'stepper__item steps__disabled'

    if (activeStep?.includes(currentStepItem)) {
      classString = 'stepper__item steps__active'
    }

    if (completeStep?.includes(currentStepItem)) {
      classString = 'stepper__item steps__completed'
    }

    return classString
  }

  const stepTitleGenerator = (stepNum) => {
    let title = ''
    if (stepNum === 1) {
      title = 'Registration'
    } else if (stepNum === 2) {
      title = 'Personal Information'
    } else if (stepNum === 3) {
      title = 'Postcodes'
    } else {
      title = 'Business Information'
    }

    return title
  }

  return (
    <section>
      <div className="us__stepper">
        <div className="us__stepper__container">
          <div className="stepper__mb">
            <p>Step {stepNum} of 4</p>
            <h5>{stepTitleGenerator(stepNum)}</h5>
          </div>
          <div className={classGenerator('register')}>
            {completeStep?.includes('register') ? (
              <img
                src={siteImages.checkIconDark.src}
                alt="Urbanserve Image"
                width="100%"
              />
            ) : (
              <span className="steps__data__num">1.</span>
            )}
            <span>Registration</span>
          </div>
          {/* Step 2 */}
          <div className={classGenerator('info')}>
            {completeStep?.includes('info') ? (
              <img
                src={siteImages.checkIconDark.src}
                alt="Urbanserve Image"
                width="100%"
              />
            ) : (
              <span className="steps__data__num">2.</span>
            )}
            <span>Personal Information</span>
          </div>
          {/* Step 3 */}
          <div className={classGenerator('postcodes')}>
            {completeStep?.includes('postcodes') ? (
              <img
                src={siteImages.checkIconDark.src}
                alt="Urbanserve Image"
                width="100%"
              />
            ) : (
              <span className="steps__data__num">3.</span>
            )}
            <span>Postcodes</span>
          </div>
          {/* Step 4 */}
          <div className={classGenerator('docs')}>
            {completeStep?.includes('docs') ? (
              <img
                src={siteImages.checkIconDark.src}
                alt="Urbanserve Image"
                width="100%"
              />
            ) : (
              <span className="steps__data__num">4.</span>
            )}
            <span>Business Information</span>
          </div>
        </div>
      </div>
    </section>
  )
}
