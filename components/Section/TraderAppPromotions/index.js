import React from 'react'

import Images from '../../../Assets/Icons'
import Image from 'next/image'

export default function TraderAppPromotions() {
  return (
    <>
      <section className="ust__promo__wrapper">
        <div className="ust__promo__container us__container">
          <h2 className="ust__promo__header">Urbanserve trader benefits</h2>
          <div className="ust__promo__flex">
            <div className="ust__promo__flexitem">
              <div className="ust__promo__card">
                <h3 className="card__title">
                  New Job in your area - know it as and when
                </h3>
                <p className="card__info">
                  Receive a real time notification soon as the job is placed
                </p>
              </div>
            </div>
            <div className="ust__promo__flexitem">
              <div className="ust__promo__card">
                <h3 className="card__title">Book Instantly</h3>
                <p className="card__info">
                  Pre Agreed Service Price, no hesitation to book a job.
                </p>
              </div>
            </div>
            <div className="ust__promo__flexitem">
              <div className="ust__promo__card">
                <h3 className="card__title">Schedule Appointment</h3>
                <p className="card__info">
                  Choose your date & time to work your job
                </p>
              </div>
            </div>
            <div className="ust__promo__flexitem">
              <div className="ust__promo__card">
                <h3 className="card__title">Manage your Bookings</h3>
                <p className="card__info">
                  Appoint a Staff, Review the progress and plan your dairy
                </p>
              </div>
            </div>
            <div className="ust__promo__flexitem">
              <div className="ust__promo__card">
                <h3 className="card__title">Manage your invoice</h3>
                <p className="card__info">
                  Auto Generate invoices upon completion of job.
                </p>
              </div>
            </div>
            <div className="ust__promo__flexitem">
              <div className="ust__promo__card">
                <h3 className="card__title">Reviews and Rating</h3>
                <p className="card__info">
                  Get rated for your services and keep on yourself on top of
                  listing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
