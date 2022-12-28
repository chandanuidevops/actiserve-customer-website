import React from 'react'

import Images from '../../../Assets/Icons'
import Image from 'next/image'

export default function TraderHowItWorks() {
  return (
    <>
      <section className="ust__how__wrapper">
        <div className="ust__how__container us__container">
          <h2 className="ust__how__header">How to use the Traders app</h2>
          {/* Flex box one */}
          <div className="ust__how__flex">
            <div className="ust__how__flexitem how__sm__flexitem ust__timeline__square ust__dsk__square ust__how__flexitemsm">
              <div className="ust__card__imgholder">
                <Image
                  className="m_width"
                  src={Images.iconLocation}
                  alt="Urbanserve Image"
                  layout="responsive"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="ust__how__flexitem how__lg__flexitem ust__timeline__line ust__dsk__line ">
              <h3 className="ust__card__header">Find On Demand Jobs Nearby</h3>
              <p className="ust__card__info">
                Install App & Use Web Portal to find jobs around you
              </p>
            </div>
          </div>
          {/* Flex box two */}
          <div className="ust__how__flex">
            <div className="ust__how__flexitem how__sm__flexitem ust__timeline__square ust__how__flexitemsm">
              <div className="ust__card__imgholder">
                <Image
                  className="m_width"
                  src={Images.iconBooking}
                  alt="Urbanserve Image"
                  layout="responsive"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="ust__how__flexitem how__lg__flexitem ust__timeline__line ">
              <h3 className="ust__card__header"> Book a Job </h3>
              <p className="ust__card__info">
                Review Job, Time & Location and book according to your
                convenience
              </p>
            </div>
          </div>
          {/* Flex box three */}
          <div className="ust__how__flex">
            <div className="ust__how__flexitem how__sm__flexitem ust__timeline__square ust__how__flexitemsm">
              <div className="ust__card__imgholder">
                <Image
                  className="m_width"
                  src={Images.iconNotepad}
                  alt="Urbanserve Image"
                  layout="responsive"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="ust__how__flexitem how__lg__flexitem ust__timeline__line ">
              <h3 className="ust__card__header">Schedule your visit</h3>
              <p className="ust__card__info">
                Set your preferred date & time to execute job
              </p>
            </div>
          </div>
          {/* Flex box four */}
          <div className="ust__how__flex">
            <div className="ust__how__flexitem how__sm__flexitem ust__timeline__square ust__how__flexitemsm">
              <div className="ust__card__imgholder">
                <Image
                  className="m_width"
                  src={Images.iconChecklist}
                  alt="Urbanserve Image"
                  layout="responsive"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="ust__how__flexitem how__lg__flexitem ust__timeline__line ">
              <h3 className="ust__card__header">Manage your Job</h3>
              <p className="ust__card__info">
                Set your Dairy, Manage your Staff & Invoices
              </p>
            </div>
          </div>
          {/* Flex box five */}
          <div className="ust__how__flex">
            <div className="ust__how__flexitem how__sm__flexitem ust__how__flexitemsm">
              <div className="ust__card__imgholder">
                <Image
                  className="m_width"
                  src={Images.iconUpdate}
                  alt="Urbanserve Image"
                  layout="responsive"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="ust__how__flexitem how__lg__flexitem ust__timeline__line">
              <h3 className="ust__card__header">Stay on Top</h3>
              <p className="ust__card__info">
                Receive real-time alerts - App Notifications & mails
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
