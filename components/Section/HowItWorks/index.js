import React from 'react';
import siteImages from '../../../Assets/Icons'
import { Grid } from 'semantic-ui-react';
export default function HowItWorks() {
    return (
        <>
            {/* Site How Section Starts */}
            <section className="site__how__wrapper">
                <div className="site__how__container site_lg_container">
                    <h3 className="site__how__header">How it works</h3>
                    <p className="site__how__subheader">
                        Finding a reliable service is easier said than done. You can go through Hassle of getting many quotes from various service prodiders or book swiftly at a fair upfront price using UrbanServe.
                    </p>
                    <div className="site__how__content">
                        <Grid stackable columns={3}>
                            <Grid.Column className="site__how__col">
                                <div className="site__how__card site__how__card__one">
                                    <img
                                        src={siteImages.howImageOne.src}
                                        alt="Urbanserve Image"
                                        width="100%"
                                        height="100%"
                                    />
                                    <div className="site__how__helper"></div>
                                    <div className="site__how__card__body">
                                        <h3 className="site__how__card__title">
                                            Choose your Service
                                        </h3>
                                        <p className="site__how__card__info">
                                            Various products are available to suit your needs, pick one that fits
                                        </p>
                                    </div>
                                </div>
                            </Grid.Column>

                            <Grid.Column className="site__how__col">
                                <div className="site__how__card site__how__card__two">
                                    <img
                                        src={siteImages.howImageTwo.src}
                                        alt="Urbanserve Image"
                                        width="100%"
                                        height="100%"
                                    />
                                    <div className="site__how__helper"></div>
                                    <div className="site__how__card__body">
                                        <h3 className="site__how__card__title">
                                            Book at your convenience
                                        </h3>
                                        <p className="site__how__card__info how__card__info">
                                            Take advantage of our convenient online booking system or app
                                        </p>
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column className="site__how__col ">
                                <div className="site__how__card site__how__card__three">
                                    <img
                                        src={siteImages.howImageThree.src}
                                        alt="Urbanserve Image"
                                        width="100%"
                                        height="100%"
                                    />
                                    <div className="site__how__card__body">
                                        <h3 className="site__how__card__title">Track and Relax</h3>
                                        <p className="site__how__card__info">
                                            Track and manage your services after you have booked them
                                        </p>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
            </section>
            {/* Site How Section Ends */}
        </>
    );
}
