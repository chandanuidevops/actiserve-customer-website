import React from 'react'
/* Semantic UI */
import {Grid, List as SemanticList} from 'semantic-ui-react'
import Images from '../../Assets/Icons'
import Image from 'next/image'
import {useMediaQuery} from 'react-responsive'
/* Next JS */
import {useRouter} from 'next/router'

function SectionLandingWhy() {
  const router = useRouter()
  const location = router?.query?.location
  const url = router?.query?.category
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})

  const routCategory = () => {
    router.push(`/${location}/${url}`)
  }

  return (
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
              <h3 className="landing__img__title">Fixed transparent pricing</h3>
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
  )
}

export default SectionLandingWhy
