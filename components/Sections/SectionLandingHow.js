import React from 'react'
/* Semantic UI */
import {Grid, List as SemanticList} from 'semantic-ui-react'
import Images from '../../Assets/Icons'
import Image from 'next/image'
import {useMediaQuery} from 'react-responsive'

function SectionLandingHow(props) {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})

  return (
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
              <h3>Choose {props.title}</h3>
              <p>
                Various packages are available to suit your needs, pick one that
                fits
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
  )
}

export default SectionLandingHow
