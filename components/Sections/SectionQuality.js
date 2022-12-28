import React from 'react'
/* Semantic UI */
import {Grid, List as SemanticList} from 'semantic-ui-react'
import Images from '../../Assets/Icons'
import Image from 'next/image'

function SectionQuality() {
  return (
    <section className="site__quality__wrapper">
      <div className="site__quality__container site_lg_container">
        <Grid className="site__quality__grid">
          <Grid.Column
            className="site__quality_img__col"
            computer={5}
            tablet={5}
            mobile={16}
          >
            <div className="site__quality__img">
              <Image
                alt="Urbanserve Icon"
                src={Images.imgQuantity.src}
                layout="fill"
                objectFit="contain"
                className="quality__img"
              />
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
                    <h3>Book with confidence</h3>
                    <p className="quality__card__para__min">
                      Get quality service from vetted providers.
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
                    <h3>You're in safe hands.</h3>
                    <p>
                      Our traders are business and public liability insured to
                      give you the peace-of -mind that you deserve!
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
                <div className="site__quality__card quality__last__card__mb">
                  <img src="/site__main__images/icon__check.png"></img>
                  <div className="site__quality__card__body">
                    <h3>Assured Customer Satisfaction</h3>
                    <div className="site__quality__inner">
                      <p>We're here to help you every step of the way.</p>
                    </div>
                  </div>
                </div>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    </section>
  )
}

export default SectionQuality
