import React from 'react'
import {Grid} from 'semantic-ui-react'

/* Media query detector */
import {useMediaQuery} from 'react-responsive'

export default function Quality() {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})

  return (
    <>
      {/* Quality Starts */}
      <section className="site__quality__wrapper">
        <div className="site__quality__container site_lg_container">
          <Grid className="site__quality__grid">
            <Grid.Column
              className="site__quality_img__col"
              computer={5}
              tablet={5}
              mobile={16}
            >
              <div
                style={{
                  margin: isTabletOrMobile ? '2rem auto' : '0 auto',
                  width: isTabletOrMobile ? '40%' : '50%',
                }}
              >
                <img
                  // src={siteImages.Quantity.src}
                  src="/site__main__images/site__quality__main.webp"
                  alt="Urbanserve Icon"
                  width="100%"
                ></img>
                {/* <Image
                                    className='quality__img'
                                    src={siteImages.Quantity.src}
                                    layout="fill"
                                    objectFit='contain'
                                    quality={100}
                                /> */}
              </div>
            </Grid.Column>

            <Grid.Column computer={11} tablet={11} mobile={16}>
              <Grid className="site__quality__grid">
                <Grid.Column
                  className="site__quality__col"
                  computer={8}
                  tablet={8}
                  mobile={16}
                >
                  <div className="site__quality__card quality__card__mb">
                    <img src="/site__main__images/icon__check.png"></img>
                    <div className="site__quality__card__body">
                      <h3>Verified Service Provider</h3>
                      <p className="quality__card__para__min">
                        We do personal & business credit checks to CCJs and
                        directors’ checks for LTD companies
                      </p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column
                  className="site__quality__col"
                  computer={8}
                  tablet={8}
                  mobile={16}
                >
                  <div className="site__quality__card quality__card__mb quality_card_fr">
                    <img src="/site__main__images/icon__check.png"></img>
                    <div className="site__quality__card__body">
                      <h3>Protection Against Damage</h3>
                      <p>Public Liability Covered</p>
                      <p>Business Insurance Covered</p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column
                  className="site__quality__col"
                  computer={8}
                  tablet={8}
                  mobile={16}
                >
                  <div className="site__quality__card quality__last__card__mb">
                    <img src="/site__main__images/icon__check.png"></img>
                    <div className="site__quality__card__body">
                      <h3>Assured Customer Satisfaction</h3>
                      <div className="site__quality__inner">
                        <p>Feedbacks</p>
                        <p>100% Neat Job Work</p>
                      </div>
                    </div>
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
      </section>
      {/* Quality Ends */}
    </>
  )
}
