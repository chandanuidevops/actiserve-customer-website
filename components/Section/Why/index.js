import React from 'react';

export default function Why() {
    return (
        <>
            {/* Site Why Starts */}
            <section className="site__why__wrapper">
                <div className="site__why__container site_lg_container">
                    <h3 className="site__why__header">Why Choose Us</h3>
                    <div className="site__why__content">
                        <Grid
                            reversed="tablet computer"
                            className="site__why__grid site__why__grid__content"
                        >
                            <Grid.Column
                                computer={8}
                                tablet={8}
                                mobile={16}
                                className="site__why__img__col"
                            >
                                <div className="site__why__img">
                                    <img
                                        src={siteImages.Quantity.src}
                                        alt="Urbanserve Icon"
                                        width="100%"
                                    ></img>
                                </div>
                            </Grid.Column>
                            <Grid.Column
                                computer={8}
                                tablet={8}
                                mobile={16}
                                className="site__why__col"
                            >
                                <Grid>
                                    <Grid.Column
                                        computer={16}
                                        tablet={16}
                                        mobile={16}
                                        className="site__why__col"
                                    >
                                        <div className="site__why__card why__card__mb__sm">
                                            <img
                                                src={siteImages.whyImageOne.src}
                                                alt="Urbanserve Icon"
                                                width="100%"
                                            />
                                            <div className="site__why__card__body">
                                                <h3>Local services at your fingertips</h3>
                                                <p>
                                                    Simply click to complete mundane tasks from the comfort of your home.
                                                </p>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column
                                        computer={16}
                                        tablet={16}
                                        mobile={16}
                                        className="site__why__col"
                                    >
                                        <div className="site__why__card why__card__mb__sm">
                                            <img
                                                src={siteImages.whyImageTwo.src}
                                                alt="Urbanserve Icon"
                                                width="100%"
                                            />
                                            <div className="site__why__card__body">
                                                <h3>Fixed transparent pricing</h3>
                                                <p>
                                                    Our transparent system guarantees a fixed upfront price and a reliable quote
                                                </p>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column
                                        computer={16}
                                        tablet={16}
                                        mobile={16}
                                        className="site__why__col"
                                    >
                                        <div className="site__why__card why__card__mb__lg">
                                            <img
                                                src={siteImages.whyImageThree.src}
                                                alt="Urbanserve Icon"
                                                width="100%"
                                            />
                                            <div className="site__why__card__body">
                                                <h3>Book and Manage using our App</h3>
                                                <p>
                                                    Easily book a service, track it, and manage it using our App
                                                </p>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
            </section>
            {/* Site Why Ends */}
        </>
    );
}
