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
      title = 'Quotation Sent'
    } else if (stepNum === 2) {
      title = 'Quotation Action Required'
    } else {
      title = 'Order Processed'
    }

    return title
  }

  return (
    <section>
      <div className="us__stepper">
        <div className="us__stepper__container">
          <div className="stepper__mb">
            <p>Step {stepNum} of 3</p>
            <h5>{stepTitleGenerator(stepNum)}</h5>
          </div>
          <div className={classGenerator('one')}>
            {completeStep?.includes('one') ? (
              <img
                src={siteImages.checkIconDark.src}
                alt="Urbanserve Image"
                width="100%"
              />
            ) : (
              <span className="steps__data__num">1.</span>
            )}
            <span>Quotation Sent</span>
          </div>
          {/* Step 2 */}
          <div className={classGenerator('two')}>
            {completeStep?.includes('two') ? (
              <img
                src={siteImages.checkIconDark.src}
                alt="Urbanserve Image"
                width="100%"
              />
            ) : (
              <span className="steps__data__num">2.</span>
            )}
            <span>Quotation Action Required</span>
          </div>
          {/* Step 3 */}
          <div className={classGenerator('three')}>
            {completeStep?.includes('three') ? (
              <img
                src={siteImages.checkIconDark.src}
                alt="Urbanserve Image"
                width="100%"
              />
            ) : (
              <span className="steps__data__num">3.</span>
            )}
            <span>Order Processed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
