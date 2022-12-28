import React, {useEffect, useState} from 'react'

/* Components */
import SiteMainNavbar from '../components/SiteMain/SiteMainNavbar'

/* Semantic UI */
import {
  Grid,
  Button,
  List as SemanticList,
  Loader,
  Modal,
  Dimmer,
} from 'semantic-ui-react'

/* Helper Packages */
import {useMediaQuery} from 'react-responsive'
import SiteFooter from '../components/SiteFooter'
import siteImages from '../Assets/Icons/index'
import HelmetComponent from '../components/Helmet'
/* Materail ui */
import {
  TextField,
  IconButton,
  withStyles,
  Drawer,
  makeStyles,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

/* Redux */
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'

/* Next Js */
import {useRouter} from 'next/router'
import Router from 'next/router'
import Images from '../Assets/Icons'
/* Actions */
import {
  getGroupDetailsRequest,
  getGroupRequest,
  validateLocationRequest,
  resetValidateLocation,
  validateDirectLocationRequest,
} from '../Stores/GroupDetails/actions'

/* Utility / Hooks */
import {getPostCodeFromLatLong} from '../utils/latLongSearch'
import useNavigator from '../utils/useNavigator'
import Image from 'next/image'
import productOne from '../public/images/products/product-boiler.webp'
import productTwo from '../public/images/products/product-gutter.webp'
import productThree from '../public/images/products/product-car.webp'
import productFour from '../public/images/products/product-tenancy.webp'
import productFive from '../public/images/products/product-carpet.webp'
import Head from 'next/head'

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  customBadge: {
    backgroundColor: '#0D6773',
    color: 'white',
  },
  drawerPaper: {
    width: '100%',
    height: '65vh',
  },
  listPadding: {
    padding: '1rem 0.4rem',
  },
  FilterTitle: {
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '1.1rem',
    color: '#21262b',
    lineHeight: '1.857rem',
    letterSpacing: '0.05em',
    fontWeight: '600',
  },
  rootSecondary: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0px',

      '& .MuiFormControl-root': {
        color: '#2A2A2A',
      },
      '& fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&:hover fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&.Mui-focused fieldset': {
        // borderColor: '#2A2A2A',
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '& .MuiFormControl-root': {
        background: 'red',
      },
    },
    '& .MuiAutocomplete-inputRoot': {
      fontFamily: 'Urbanist',
      padding: '0px 20px !important',
      minHeight: '68px',
      maxHeight: '68px',
      color: '#2A2A2A !important',
    },
    '&.MuiInputBase-input': {
      color: '#2A2A2A !important',
    },
    '&.MuiOutlinedInput-input': {
      color: 'red !important',
    },
    '&.MuiOutlinedInput-input::placeholder': {
      color: '#2A2A2A !important',
      fontSize: '16px',
    },
  },
  bookBtn: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0px',
      maxHeight: '48px',

      '& .MuiFormControl-root': {
        color: '#2A2A2A',
      },
      '& fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&:hover fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&.Mui-focused fieldset': {
        // borderColor: '#2A2A2A',
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '& .MuiFormControl-root': {
        background: 'red',
      },
    },
    '& .MuiAutocomplete-inputRoot': {
      backgroundColor: 'white',
      fontFamily: 'Urbanist',
      color: '#2A2A2A',
      padding: '0px 20px !important',
      minHeight: '48px',
      maxHeight: '48px',
      color: '#2A2A2A !important',
    },
    '&.MuiInputBase-input': {
      color: '#2A2A2A !important',
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: 'rgba(95, 164, 227, 0.1)',
    },
    '&.MuiOutlinedInput-input': {
      color: 'red !important',
    },
  },
  customTextField: {
    '& input::placeholder': {
      fontSize: '1.143rem',
      color: '#2A2A2A !important',
    },
  },
})

function SiteMain(props) {
  /* Destructure props */
  const {
    classes,
    fetchGroupListingDetails,
    resetValidateLocation,
    validateDirectLocationRequest,
  } = props

  const {
    isLocationValid,
    isValidatingLocation,
    isUrlLocationValid,
    isValidatingUrlLocation,
  } = useSelector((state) => state?.groupDetailsReducer)

  const [
    icon,
    errorModalOpen,
    closeErrorModal,
    resetGeoState,
    successModalOpen,
    closeSuccessModal,
    address,
    city,
    formattedAddress,
    detectUsingGPS,
  ] = useNavigator()

  const router = useRouter()

  /* API CALLS */
  useEffect(() => {
    /* Fetch groups data */
    fetchGroupListingDetails()
    navigator.geolocation.getCurrentPosition((data) => console.log('data'))
  }, [])

  const isBrowser = () => typeof window !== 'undefined'

  const {groupListingDetails, isFetchingGroupListingDetails} = useSelector(
    (state) => state?.groupDetailsReducer,
  )

  // Check if tablet or mobile screen is active
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})

  const isScreenMd = useMediaQuery({query: '(max-width: 1200px)'})

  const [userCity, setUserCity] = useState('')

  /* Mobile Drawer For Group */
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    resetValidateLocation()

    let lastDetectedLocation = localStorage.getItem('urbanserve_user_location')
    if (lastDetectedLocation) {
      Router.push(`${lastDetectedLocation}`)
    }
  }, [])

  // If user selects location drop down redirect and save the location in local storate
  useEffect(() => {
    if (userCity && userCity?.title) {
      localStorage.setItem(
        'urbanserve_user_location',
        userCity?.title?.toLowerCase(),
      )
      localStorage.setItem(
        'urbanserve_user_last_location',
        userCity?.title?.toLowerCase(),
      )
      Router.push(`${userCity?.title?.toLowerCase()}`)
    }
  }, [userCity])

  useEffect(() => {
    if (address && city) {
      validateDirectLocationRequest(city?.toLowerCase())
    }
  }, [address, city])

  const products = [
    {title: 'End of Tenancy', img: productOne},
    {title: 'End of Tenancy', img: productTwo},
    {title: 'End of Tenancy', img: productThree},
    {title: 'End of Tenancy', img: productFour},
    {title: 'End of Tenancy', img: productFive},
  ]

  const customJsonLDData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'UrbanServe',
        item: 'https://www.urbanserve.co.uk',
      },
    ],
  }
  let link = isBrowser() ? `${window.location.hostname}` : ''

  return (
    <>
      <HelmetComponent
        title={`UrbanServe - Easily Book Local Experts With Fair, Transparent and
        Upfront Prices.`}
        ogTitle={`UrbanServe - Easily Book Local Experts With Fair, Transparent and
        Upfront Prices.`}
        description="UrbanServe provides professional carpet cleaning, gutter cleaning and a range of other services. Book online in less than 30 seconds!"
        ogDescription="UrbanServe provides professional carpet cleaning, gutter cleaning and a range of other services. Book online in less than 30 seconds!"
        ogUrl={link}
        ogImage={Images.imgHomeBanner.src}
        createJsonLD={true}
        jsonLDData={customJsonLDData}
      />
      <SiteMainNavbar />
      <section className="site__home__wrapper">
        <div className="site__home__container site_lg_container">
          <div className="site__home__content">
            {/* <div className="site__main__icon__top">
              <img width="100%" src="/site__main__images/icon__trust.png" />
            </div> */}

            <Grid className="site__home__grid">
              <Grid.Column
                mobile={16}
                tablet={7}
                computer={7}
                className="site__home__grid__col"
              >
                <div className="site__home__card" style={{width: '100%'}}>
                  <div className="site__card__text">
                    <h1 className="site__card__header">
                      Hassle Free On Demand Services
                    </h1>
                    <h2 className="site__card__info">
                      Easily Hire Experts With Fair & Transparent Pricing
                    </h2>
                    <div className="site__card__img">
                      {products.map((data, i) => (
                        <div className="site__card__img_item">
                          <Image
                            src={data?.img}
                            width={isTabletOrMobile ? 25 : 35}
                            height={isTabletOrMobile ? 25 : 35}
                            objectFit="contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="site__card__cta">
                    {isTabletOrMobile && (
                      <Button
                        fluid
                        className="site__card__btn"
                        onClick={() => setDrawerOpen(true)}
                      >
                        {userCity ? userCity?.title : `Search your city`}
                        <div
                          style={{
                            position: 'relative',
                            width: '24px',
                            height: '24px',
                          }}
                        >
                          <Image
                            src={Images.iconSearch.src}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </Button>
                    )}

                    {!isTabletOrMobile && (
                      <Autocomplete
                        id="combo-box-demo"
                        variant="outlined"
                        placeholder="Select your city"
                        options={groupListingDetails}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue) => {
                          newValue && setUserCity(newValue)
                        }}
                        classes={{
                          root: classes.rootSecondary,
                        }}
                        className="site__header__btn"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            classes={{root: classes.customTextField}}
                            placeholder="Select your city"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <IconButton size="small">{icon}</IconButton>
                              ),
                            }}
                          />
                        )}
                      />
                    )}
                  </div>
                </div>
              </Grid.Column>
            </Grid>

            {/* <div className="site__main__icon">
              <img width="100%" src="/site__main__images/icon__trust.png" />
            </div> */}
          </div>
        </div>
      </section>

      {/* Site How Section Starts */}
      <section className="site__how__wrapper">
        <div className="site__how__container site_lg_container">
          <h2 className="site__how__header">How it works</h2>
          <p className="site__how__subheader">
            Finding a reliable service is easier said than done. You can go
            through Hassle of getting many quotes from various service prodiders
            or book swiftly at a fair upfront price using UrbanServe.
          </p>
          <div className="site__how__content">
            <Grid stackable columns={3}>
              <Grid.Column className="site__how__col">
                <div className="site__how__card site__how__card__one">
                  <img
                    src={siteImages.imgHowOne.src}
                    alt="Urbanserve Image"
                    width="100%"
                  />
                  <div className="site__how__helper"></div>
                  <div className="site__how__card__body">
                    <h2 className="site__how__card__title">
                      Choose your Service
                    </h2>
                    <p className="site__how__card__info">
                      Various products are available to suit your needs, pick
                      one that fits
                    </p>
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column className="site__how__col">
                <div className="site__how__card site__how__card__two">
                  <img
                    src={siteImages.imgHowTwo.src}
                    alt="Urbanserve Image"
                    width="100%"
                  />
                  <div className="site__how__helper"></div>
                  <div className="site__how__card__body">
                    <h2 className="site__how__card__title">
                      Book at your convenience
                    </h2>
                    <p className="site__how__card__info how__card__info">
                      Take advantage of our convenient online booking system or
                      app
                    </p>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column className="site__how__col ">
                <div className="site__how__card site__how__card__three">
                  <img
                    src={siteImages.imgHowThree.src}
                    alt="Urbanserve Image"
                    width="100%"
                  />
                  <div className="site__how__card__body">
                    <h2 className="site__how__card__title">Track and Relax</h2>
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

      {/* Site How Section Starts */}
      <section className="site__quality__wrapper__light">
        <div className="site__quality__container__light site_lg_container">
          <Grid className="site__quality__grid__light">
            <Grid.Column
              className="site__quality_img__col__light"
              computer={5}
              tablet={5}
              mobile={16}
            >
              <div className="site__quality__img__light">
                <Image
                  alt="Urbanserve Icon"
                  src={Images.imgQuantity.src}
                  layout="fill"
                  objectFit="contain"
                  className="quality__img__light"
                />
              </div>
            </Grid.Column>

            <Grid.Column computer={11} tablet={11} mobile={16}>
              <Grid className="site__quality__grid__light">
                <Grid.Column
                  className="site__quality__col__light"
                  computer={8}
                  tablet={8}
                  mobile={16}
                >
                  <div className="site__quality__card__light quality__card__mb__light">
                    <img src="/site__main__images/icon__check.png"></img>
                    <div className="site__quality__card__body__light">
                      <h3>Book with confidence</h3>
                      <p className="quality__card__para__min__light">
                        Get quality service from vetted providers.
                      </p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column
                  className="site__quality__col__light"
                  computer={8}
                  tablet={8}
                  mobile={16}
                >
                  <div className="site__quality__card__light quality__card__mb__light quality_card_fr__light">
                    <img src="/site__main__images/icon__check.png"></img>
                    <div className="site__quality__card__body__light">
                      <h3>You're in safe hands.</h3>
                      <p>
                        Our traders are business and public liability insured to
                        give you the peace-of -mind that you deserve!
                      </p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column
                  className="site__quality__col__light"
                  computer={8}
                  tablet={8}
                  mobile={16}
                >
                  <div className="site__quality__card__light quality__last__card__mb__light">
                    <img src="/site__main__images/icon__check.png"></img>
                    <div className="site__quality__card__body__light">
                      <h3>Assured Customer Satisfaction</h3>
                      <div className="site__quality__inner__light">
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
      {/* Site How Section Ends */}

      {/* <section className="site__review__wrapper">
                <div className="site__review__container site_lg_container">

                    <div className="site__review__content">
                        <div className="site__review__card">
                        </div>
                        <div className="site__review__card">
                        </div>
                        <div className="site__review__card">
                        </div>
                        <div className="site__review__card">
                        </div>
                    </div>
                </div>
            </section> */}

      {/* Site Why Starts */}
      <section className="site__why__wrapper">
        <div className="site__why__container site_lg_container">
          <h2 className="site__why__header">Why Choose Us</h2>
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
                  <Image
                    alt="Urbanserve Icon"
                    src={Images.imgMockup.src}
                    layout="fill"
                    objectFit="contain"
                    className="quality__img"
                  />
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
                      <div style={{marginRight: '1.214rem'}}>
                        <Image
                          alt="Urbanserve Icon"
                          layout="fixed"
                          src={Images.imgLocationFilled.src}
                          width={!isScreenMd ? '56px' : '100px'}
                          height={!isScreenMd ? '56px' : '100px'}
                        />
                      </div>

                      <div className="site__why__card__body">
                        <h3>Local services at your fingertips</h3>
                        <p>
                          Simply click to complete mundane tasks from the
                          comfort of your home.
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
                      <div style={{marginRight: '1.214rem'}}>
                        <Image
                          alt="Urbanserve Icon"
                          layout="fixed"
                          src={Images.imgMoneyFilled.src}
                          width={!isScreenMd ? '56px' : '100px'}
                          height={!isScreenMd ? '56px' : '100px'}
                        />
                      </div>
                      <div className="site__why__card__body">
                        <h3>Fixed transparent pricing</h3>
                        <p>
                          Our transparent system guarantees a fixed upfront
                          price and a reliable quote
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
                      <div style={{marginRight: '1.214rem'}}>
                        <Image
                          alt="Urbanserve Icon"
                          layout="fixed"
                          src={Images.imgBellFilled.src}
                          width={!isScreenMd ? '56px' : '100px'}
                          height={!isScreenMd ? '56px' : '100px'}
                        />
                      </div>
                      <div className="site__why__card__body">
                        <h3>Book and Manage using our App</h3>
                        <p>
                          Easily book a service, track it, and manage it using
                          our App
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

      {/* Site Book Starts */}
      <section className="site__book__wrapper">
        <div className="site__book__container site_lg_container">
          <div className="site__book__content">
            <div className="site__book__sm__img">
              <Image
                alt="Urbanserve Icon"
                src={Images.imgQuantity.src}
                width={500}
                height={500}
                objectFit="contain"
              />
            </div>

            <div className="site__book__text">
              <h3>Ready to book</h3>
            </div>
            <div className="site__book__input">
              {isTabletOrMobile && (
                <Button
                  fluid
                  className="site__book__btn"
                  onClick={() => setDrawerOpen(true)}
                >
                  {userCity ? userCity?.title : `Search your city`}
                  <div
                    style={{
                      position: 'relative',
                      width: '10px',
                      height: '10px',
                    }}
                  >
                    <Image
                      src={Images.iconSearch.src}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </Button>
              )}

              {!isTabletOrMobile && (
                <Autocomplete
                  id="combo-box-demo"
                  variant="outlined"
                  placeholder="Select your city"
                  options={groupListingDetails}
                  getOptionLabel={(option) => option.title}
                  style={{maxHeight: '40px', minWidth: '100%'}}
                  className="site__book__btn"
                  onChange={(event, newValue) => {
                    newValue && setUserCity(newValue)
                  }}
                  classes={{
                    root: classes.bookBtn,
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      classes={{root: classes.customTextField}}
                      placeholder="Select your city"
                      InputProps={{
                        ...params.InputProps,

                        endAdornment: <IconButton size="small"></IconButton>,
                      }}
                    />
                  )}
                />
              )}
            </div>

            <div className="site__book__lg__img">
              <Image
                alt="Urbanserve Icon"
                src={Images.imgQuantity.src}
                width={300}
                height={300}
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Site Book Ends */}

      {/* Site TradesMan Starts */}

      <section className="site__tradesman__wrapper">
        <div className="site__tradesman__container site_lg_container">
          <h2 className="tradesman__header">
            Are you a Tradesman? Interested in providing your service?
          </h2>
          <p className="tradesman__info">
            UrbanServe can revamp your customer reach to attain the full
            potential of your business. Entering the new turf for scaling your
            business is expensive, but with UrbanServe, you can take a leap of
            expansion with just a click and find new customers never sought
            before.
          </p>
        </div>
      </section>
      {/* Site TradesMan Ends */}

      {/* Site Join Starts */}
      <section className="site__join__wrapper">
        <div className="site__join__container site_lg_container">
          <div className="site__join__main">
            <div className="site__join__content">
              <div
                className="site__join__img__mb"
                style={{position: 'relative', width: '100%', height: '250px'}}
              >
                <Image
                  src={Images.joinImg.src}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <img
                className="site__join__img__lg"
                src="/images/home/img-join.webp"
                width="100%"
              />
              <div className="site__join__info">
                <h3>Want to serve with UrbanServe?</h3>
                <a href="/tradespeople" rel="noopener noreferrer">
                  <Button className="site__join__btn">Find out more</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Site Join Ends */}

      {/* Site Button Starts */}
      <section className="site__btn__wrapper">
        <div className="site__btn__container site_lg_container">
          <a href={process.env.NEXT_PUBLIC_APP_GOOGLE} target="_blank">
            <div className="site__btn__content">
              <div className="site__btn__play">
                <img
                  src="/site__main__images/icon__playstore.png"
                  width="100%"
                  alt="Urbanserve Google App"
                />
                <div className="site__btn__play__content">
                  <p className="site__btn__header">Get it on</p>
                  <p className="site__btn__info">Google Play</p>
                </div>
                <div className="site__btn__play__helper"></div>
              </div>
            </div>
          </a>
          <a href={process.env.NEXT_PUBLIC_APP_APPLE} target="_blank">
            <div className="site__apple">
              <div className="site__btn__apple__content">
                <div className="site__btn__apple">
                  <img
                    src="/site__main__images/icon__apple.png"
                    width="100%"
                    alt="Urbanserve Play Store app"
                  />
                  <div className="site__btn__apple__content">
                    <p className="site__btn__apple__header">Download on the</p>
                    <p className="site__btn__apple__info">App Store</p>
                  </div>
                  <div className="site__btn__apple__helper"></div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
      {/* Site Button Ends */}

      {/* Site Footer Start */}
      <SiteFooter />
      {/* Site Footer End */}

      {/* Mobile / Tablet Drawer */}
      <Drawer
        open={drawerOpen}
        anchor="bottom"
        classes={{paper: classes.drawerPaper}}
        style={{zIndex: '100'}}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              padding: '1rem 1rem',
              borderBottom: '1px solid #e9e9ea',
            }}
          >
            <h3 className={classes.FilterTitle}>Select your city</h3>
            <IconButton
              size="small"
              disableFocusRipple
              disableRipple
              onClick={() => {
                setDrawerOpen(false)
              }}
              style={{display: 'flex', justifyContent: 'flex-end'}}
            >
              <img src="/site__main__images/site__close.png" width="20%"></img>
            </IconButton>
          </div>
          <div className={classes.listPadding}>
            <div
              style={{
                cursor: 'pointer',
                alignItems: 'center',
                display: 'flex',
                padding: '0rem 0.2rem',
              }}
              onClick={() => {
                setDrawerOpen(true)
              }}
            >
              {detectUsingGPS}
            </div>
            {isFetchingGroupListingDetails ? (
              <Loader active inline="centered" />
            ) : (
              <SemanticList selection verticalAlign="middle">
                {groupListingDetails?.map((ele) => (
                  <>
                    <SemanticList.Item
                      onClick={() => {
                        setUserCity(ele)
                        setDrawerOpen(false)
                      }}
                    >
                      <SemanticList.Content>
                        <h2 className="modal__group__name">{ele?.title}</h2>
                      </SemanticList.Content>
                    </SemanticList.Item>
                  </>
                ))}
              </SemanticList>
            )}
          </div>
        </div>
      </Drawer>

      <Modal size="mini" open={errorModalOpen} onClose={resetGeoState}>
        <Modal.Content>
          <Modal.Description>
            <p>
              Location permission is denied or your browser doesnt support
              GeoLocation
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button className="location__btn" onClick={resetGeoState}>
            Okay
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Invalid Location Modal */}
      <Modal size="mini" open={successModalOpen} onClose={resetGeoState}>
        <Modal.Content>
          <Modal.Description>
            {isValidatingUrlLocation ? (
              <Dimmer active>
                <Loader size="small">Loading</Loader>
              </Dimmer>
            ) : isUrlLocationValid?.length > 0 && !isValidatingUrlLocation ? (
              <p>{formattedAddress ?? `~`}</p>
            ) : (
              <>
                <p>Your location is {formattedAddress}</p>
                <p>We don't serve in your area yet!</p>
              </>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="location__btn"
            onClick={resetGeoState}
            style={{marginBottom: '0rem'}}
          >
            {isUrlLocationValid?.length > 0 ? `Explore Services` : `Okay`}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    //Fetch list
    fetchProductList: (data) => dispatch(getProductList(data)),
    fetchPopularServiceList: (data) => dispatch(getPopularServices(data)),
    fetchServiceResultList: (data) => dispatch(getServiceResult(data)),
    fetchGroupDetails: (data) => dispatch(getGroupDetailsRequest(data)),
    fetchGroupListingDetails: (data) => dispatch(getGroupRequest(data)),
    Logout: (data) => dispatch(LogoutAction(data)),
    validateLocation: (data) => dispatch(validateLocationRequest(data)),
    resetValidateLocation: (data) => dispatch(resetValidateLocation(data)),
    validateDirectLocationRequest: (data) =>
      dispatch(validateDirectLocationRequest(data)),
  }
}

const withConnect = connect(null, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(SiteMain))
