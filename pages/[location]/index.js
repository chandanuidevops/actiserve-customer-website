import React, {useState, useEffect} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'

import actions from '../../Stores/Auth/actions'
import {
  getGroupCategoriesRequest,
  getCategoriesRequest,
  getProductRequest,
  validateLocationRequest,
  getGroupRequest,
  validateDirectLocationRequest,
  resetValidateLocation,
} from '../../Stores/GroupDetails/actions'
const LogoutAction = actions.logout
import {searchRequest} from '../../Stores/CategoryDetails/actions'
/* Next JS */
import Link from 'next/link'
import Router, {useRouter} from 'next/router'
/* Next Js Image */
import Image from 'next/image'

/* Components */
import GeoLocation from '../../components/GeoLocation'
import siteImages from '../../Assets/Icons/index'
import useNavigator from '../../utils/useNavigator'

/* Utilities */
import {getPostCodeFromLatLong} from '../../utils/latLongSearch'

/* Helper Packages */
import {useMediaQuery} from 'react-responsive'
/* Semantic UI */
import {
  Grid,
  Breadcrumb,
  Modal,
  Card,
  Segment,
  Icon,
  Loader,
  Divider,
  List as SemanticList,
  Label,
  Dimmer,
  Button as SemanticBtn,
} from 'semantic-ui-react'

/* Material UI */
import {
  Drawer,
  DialogContent,
  IconButton,
  makeStyles,
  Card as MaterialCard,
  TextField,
  Paper,
  Typography,
  ClickAwayListener,
  Button,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import Popper from '@material-ui/core/Popper'
import Badge from '@material-ui/core/Badge'
import {withStyles} from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import CircularProgress from '@material-ui/core/CircularProgress'

import useValidator, {createFakeEvent} from '../../utils/useValidator'
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar'
import HelmetComponent from '../../components/Helmet'
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete'
import {getAddressObject} from '../../utils/helper'
import SiteFooter from '../../components/SiteFooter'
import Images from '../../Assets/Icons'
import Head from 'next/head'

const styles = (theme) => ({
  rootSecondary: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0px',
      fontFamily: 'Urbanist !important',
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
      fontFamily: 'Urbanist !important',
      padding: '0px 20px !important',
      minHeight: '48px',
      maxHeight: '48px',
      color: '#2A2A2A !important',
    },
    '&.MuiInputBase-input': {
      color: '#2A2A2A !important',
      fontFamily: 'Urbanist !important',
    },
    '&.MuiOutlinedInput-input': {
      color: 'red !important',
      fontFamily: 'Urbanist !important',
    },
    '&.MuiOutlinedInput-input::placeholder': {
      color: '#2A2A2A !important',
      fontSize: '16px',
      fontFamily: 'Urbanist !important',
    },
  },
  customTextField: {
    '& input::placeholder': {
      fontSize: '1.143rem',
      color: '#2A2A2A !important',
    },
  },
  drawerPaper: {
    maxWidth: '420px',
    width: '100%',
    height: '100vh',
  },
  drawerBackIcon: {
    cursor: 'pointer',
  },
  drawerHeader: {
    fontFamily: 'Urbanist, sans-serif',
    fontStyle: 'Normal',
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.05em',
    color: '#21262B',
    textTransform: 'capitalize',
    paddingLeft: '0.714rem',
  },
  drawerText: {
    fontFamily: 'Urbanist, sans-serif',
    fontStyle: 'Normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#21262B',
  },
  locationBtn: {
    minHeight: '48px',
    maxHeight: '48px',
    background: '#FFFFFF',
    border: '2px solid #353535',
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '10px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontFamily: 'Urbanist, sans-serif !important',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#2A2A2A',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
  btnLocationLabel: {
    maxWidth: '90%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontFamily: 'Urbanist, sans-serif !important',
  },
  locationDrawerPaper: {
    width: '100%',
    height: '65vh',
    zIndex: '100',
  },
  searchDrawerPaper: {
    width: '100%',
    height: '100vh',
  },
  listPadding: {
    padding: '1rem 0.4rem',
  },
  resize: {
    fontFamily: 'Urbanist, sans-serif !important',
    fontSize: '1.2rem',
  },
  FilterTitle: {
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '1.1rem',
    color: '#21262b',
    lineHeight: '1.857rem',
    letterSpacing: '0.05em',
    fontWeight: '600',
  },
})

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

function Slug(props) {
  // Check if tablet or mobile screen is active
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})

  /* Selector */
  const {
    isFetchingGroupDetails,
    groupListingDetails,
    isFetchingGroupListingDetails,
    isUrlLocationValid,
    isValidatingUrlLocation,
  } = useSelector((state) => state?.groupDetailsReducer)

  /* Destructure props */
  const {
    isSearchingService,
    searchRequest,
    classes,
    fetchCategories,
    fetchProduct,
    validateLocation,
    product,
    isFetchingProductDetails,
    isFetchingCategories,
    fetchGroupListingDetails,
    searchResult,
    validateDirectLocationRequest,
    location,
  } = props

  const router = useRouter()
  const isBrowser = () => typeof window !== 'undefined'

  /* Navigator Hook */
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

  const {categories, isLocationValid, isValidatingLocation} = useSelector(
    (state) => state?.groupDetailsReducer,
  )

  /* Direct Route Access Tracker State */
  const [isAccessFromUrl, setIsAccessFromUrl] = useState(false)
  const [urlAccessLocation, setUrlAccessLocation] = useState(null)
  const [currentProduct, setCurrentProduct] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  // Modal State
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState('')
  const [groupErrorModal, setGroupErrorModal] = useState(false)

  // Location related state
  const [groupName, setGroupName] = useState(null)

  const [mbCityDrawerOpen, setMbCityDrawerOpen] = useState(false)

  /* Location popper state */
  const [locationDialog, setLocationDialog] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [placement, setPlacement] = React.useState()

  /* Mobile Search */
  const [isMBSearchOpen, setIsMBSearchOpen] = React.useState(false)

  // Search Result State
  const [searchResultData, setSearchResultData] = useState([])

  // Google Input Value
  const [googleInputValue, setGoogleInputValue] = useState('')
  const [userAddress, setUserAddress] = useState(null)
  const [update, setUpdate] = useState(false)

  // BreadCrumb Data
  const [breadCrumb, setBreadCrumb] = useState('')

  /* API CALLS */
  useEffect(() => {
    /* Fetch groups data */
    fetchGroupListingDetails()
    // Set group to default
    setGroupName()
    // Set Name
  }, [])
  /* Set isAccessFromUrl to true */
  useEffect(() => {
    if (router && router?.components?.['/'] === undefined) {
      setIsAccessFromUrl(true)
    } else {
      setIsAccessFromUrl(false)
    }

    if (isAccessFromUrl) {
      setUrlAccessLocation(router?.query?.location)
    }

    setName(router?.query?.location)
  }, [router, isAccessFromUrl])

  useEffect(() => {
    setUpdate(!update)
    if (isAccessFromUrl && urlAccessLocation) {
      validateLocation(urlAccessLocation)
    }
  }, [isAccessFromUrl, urlAccessLocation])

  function setName(name) {
    setGroupName(name)
  }

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setLocationDialog((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  // Validate location from slug
  useEffect(() => {
    if (groupName && !isAccessFromUrl) {
      validateLocation(groupName)
    }
  }, [groupName, isAccessFromUrl])

  // Fetch categories if location is valid
  useEffect(() => {
    if (isLocationValid !== 404 && isLocationValid !== []) {
      let id = isLocationValid?.[0]?.uuid
      if (id) {
        fetchCategories(id)
      }
    }

    let address = localStorage.getItem('urbanserve_user_address')
    if (address) {
      setUserAddress(address)
    }

    let lastLocation = localStorage.getItem('urbanserve_user_last_location')

    if (lastLocation) {
      if (groupName !== lastLocation) {
        setUserAddress(null)
      }
    }
  }, [isLocationValid])

  useEffect(() => {
    if (drawerOpen === true) {
      fetchProduct(currentProduct?.id)
    }
  }, [drawerOpen])

  useEffect(() => {
    if (isLocationValid !== 404 && isLocationValid !== []) {
      if (isBrowser()) {
        let id = isLocationValid?.[0]?.uuid
        if (id) {
          localStorage.setItem('group_id', id)
        }
        if (groupName && isLocationValid !== 404) {
          localStorage.setItem('urbanserve_user_location', groupName)
        }
      }
    }
  }, [isLocationValid])

  const searchTermHandler = async () => {
    let groupdID = await localStorage.getItem('group_id')
    if (groupdID) {
      searchRequest({
        search: searchTerm,
        group_id: groupdID,
      })
    }
  }

  /* Search service only the input is text, if id is present dont search */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm && searchTerm?.id === undefined) {
        searchTermHandler()
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  useEffect(() => {
    if (searchTerm === '' || searchTerm === undefined || searchTerm === null) {
      setSearchResultData([])
    }
    if (typeof searchTerm === 'object' && searchTerm?.type !== undefined) {
      if (searchTerm?.type === 'product') {
        if (searchTerm?.product_offering || searchTerm?.build_package) {
          router.push(
            `/${groupName}/${searchTerm?.title
              .toLowerCase()
              .replace(/\s/gm, '-')}`,
          )
        } else {
          router.push(
            `/${groupName}/product/${searchTerm?.title
              .toLowerCase()
              .replace(/\s/gm, '-')}`,
          )
        }
      } else {
        router.push(
          `/category/${searchTerm?.title.toLowerCase().replace(/\s/gm, '-')}`,
        )
      }
    }
  }, [searchTerm])

  useEffect(() => {
    let data = []
    if (isSearchingService) {
      setSearchResultData(['Loading...'])
    }
    if (searchResult?.length < 0) {
      setSearchResultData([])
    } else {
      searchResult.map((ele) => {
        ele?.type !== 'category' && data?.push(ele)
      })
      setSearchResultData(data)
    }
  }, [searchResult])

  const handleCardClick = (clickedItem) => {
    let itemPresent = null
    if (categories?.length > 0) {
      itemPresent = categories?.filter(
        (category) => category?.category_name === clickedItem,
      )
    }
    if (itemPresent?.length > 0) {
      let item = itemPresent?.[0]
      setCurrentProduct(item)
      setDrawerOpen(true)
      setDrawerType(item?.category_name.toLowerCase())
    }
  }

  // Google Input
  const {
    ready,
    suggestions: {status, data},
    setValue,
    value,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {country: ['uk', 'UK']},
      debounce: 300,
    },
  })
  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const validateUserSelectedAddress = (address, description) => {
    // Validator key
    let isValid = false

    // User selected city
    let city = address?.postal_town.toLowerCase()

    // map through groups to check if city is servicible
    if (groupListingDetails?.length > 0) {
      groupListingDetails?.map((group) => {
        if (group?.title?.toLowerCase() === city && !isValid) {
          isValid = true
        }
      })
    }

    if (isValid) {
      localStorage.setItem('urbanserve_user_address', description)
      localStorage.setItem('urbanserve_user_location', city)
      localStorage.setItem('urbanserve_user_last_location', city)
      setUserAddress(description)
      setLocationDialog(!locationDialog)
      setValue('')
      Router.push(`${city}`)
    } else {
      setValue('')
      setGroupErrorModal(true)
    }
  }

  const handleSelect = ({description}) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()
    setLocationDialog(!locationDialog)
    // Get latitude and longitude via utility functions
    getGeocode({address: description})
      .then((results) => {
        validateUserSelectedAddress(
          getAddressObject(results?.[0]?.address_components),
          description,
        )
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: {main_text, secondary_text},
      } = suggestion

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="us__google__item"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })
  // Google Input

  const getCategoryLink = (ele) => {
    let href = ''

    setCurrentProduct(ele)
    localStorage.setItem('categoryDetail', JSON.stringify(ele))

    if (ele?.is_cat_landing_page) {
      href = `/${groupName}/${ele?.category_name
        .toLowerCase()
        .replace(/\s/gm, '-')}`
    } else {
      setDrawerOpen(true)
      setDrawerType(ele?.category_name.toLowerCase())
    }

    return href
  }

  let link = isBrowser() ? `${window.location.hostname}/${groupName}` : ''

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    if (groupName) {
      let data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'UrbanServe',
            item: 'https://www.urbanserve.co.uk',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `https://www.urbanserve.co.uk/${groupName}`,
          },
        ],
      }
      setBreadCrumb(data)
    }
  }, [groupName])

  return (
    <>
      {isAccessFromUrl && urlAccessLocation !== null && isValidatingLocation ? (
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            alignContent: 'center',
          }}
        >
          <Loader active inline="centered">
            Loading
          </Loader>
        </div>
      ) : isAccessFromUrl &&
        urlAccessLocation !== null &&
        !isValidatingLocation &&
        isLocationValid === 404 ? (
        <div
          align="center"
          style={{
            height: '100vh ',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p>St. 404, Ghost Town.</p>
          <p>
            Looks like the page you're looking for has been moved or does'nt
            exists
          </p>
          <Link href="/">
            <a>Go to Homepage.</a>
          </Link>
        </div>
      ) : (
        <>
          <HelmetComponent
            title={`Book Carpet Cleaning, Gutter Cleaning and more in - ${
              groupName && capitalizeFirstLetter(groupName)
            } | UrbanServe`}
            ogTitle={`Book Carpet Cleaning, Gutter Cleaning and more in - ${
              groupName && capitalizeFirstLetter(groupName)
            } | UrbanServe`}
            description={`UrbanServe is the leading on demand cleaning and repair service in ${
              groupName && capitalizeFirstLetter(groupName)
            }. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!`}
            ogDescription={`UrbanServe is the leading on demand cleaning and repair service in ${
              groupName && capitalizeFirstLetter(groupName)
            }. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!`}
            ogUrl={link}
            ogImage={Images.imgLocationBanner.src}
            createJsonLD={true}
            jsonLDData={breadCrumb}
          />

          <SiteMainNavbar />

          {/* Banner */}
          <section className="site__category__wrapper">
            <div className="site__category__image__wrapper"></div>

            <div className="site__mobile__search">
              <div
                className="site__mobile__search__content"
                onClick={() => {
                  setMbCityDrawerOpen(true)
                  resetValidateLocation()
                }}
              >
                <img
                  src="/site__main__images/site__location__dark.png"
                  alt="Urbanserve Icon"
                  width="100%"
                />
                <h4>{userAddress ? userAddress : groupName}</h4>
              </div>

              <div className="site__mobile__search__input">
                <Button
                  fluid
                  className="site__card__btn"
                  onClick={() => {
                    setIsMBSearchOpen(true)
                  }}
                >
                  <img
                    src="/site__main__images/site__search.png"
                    alt="Search Icon"
                    width="10%"
                    style={{marginRight: '1.571rem'}}
                  />
                  {`Search for a service`}
                </Button>
              </div>
            </div>

            <div className="site__category__container site_lg_container">
              <Card
                className="site__category__card"
                style={{
                  maxWidth: '1640px',
                  borderRadius: '0px',
                  backgroundColor: 'transparent',
                  //  boxShadow: '0px !important'
                }}
              >
                <h1 className="site__category__title">
                  On Demand Cleaning Services
                </h1>

                <div className="site__category__card__header">
                  <div className="site__card__header__bread">
                    <Breadcrumb>
                      <Breadcrumb.Section
                        style={{
                          fontFamily: 'Urbanist, sans-serif',
                          fontSize: '1.143rem',
                          lineHeight: '1.357rem',
                        }}
                      >
                        Home
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider
                        style={{
                          color: '#353535',
                          opacity: '1',
                          padding: '0rem 0.5rem',
                        }}
                      />
                      <Breadcrumb.Section
                        style={{
                          fontFamily: 'Urbanist, sans-serif',
                          fontSize: '1.143rem',
                          lineHeight: '1.357rem',
                          textTransform: 'capitalize',
                        }}
                      >
                        {groupName}
                      </Breadcrumb.Section>
                    </Breadcrumb>
                  </div>
                </div>

                <div
                  className="site__category__grid__section"
                  style={{backgroundColor: '#fff'}}
                >
                  <div className="site__category__search__box">
                    <Grid style={{margin: '0', padding: '0'}}>
                      <Grid.Column tablet={4} computer={4}>
                        {/* <ClickAwayListener onClickAway={() => setLocationDialog(false)}> */}
                        <Button
                          disableFocusRipple
                          disableRipple
                          className={classes.locationBtn}
                          onClick={handleClick('bottom-start')}
                        >
                          <img
                            src="/site__main__images/site__location__light.png"
                            alt="Urbanserve Icon"
                            width="22px"
                            height="22px"
                            style={{marginRight: '1rem'}}
                          />
                          <span className={classes.btnLocationLabel}>
                            {userAddress ? userAddress : groupName}
                          </span>
                        </Button>
                        {/* </ClickAwayListener> */}
                      </Grid.Column>
                      <Grid.Column tablet={12} computer={12}>
                        <Autocomplete
                          freeSolo
                          options={searchResultData}
                          renderOption={(option) => (
                            <div display="flex" flexDirection="column">
                              <span>{option.id && `${option.title}`}</span>
                            </div>
                          )}
                          getOptionLabel={(option) =>
                            option?.id ? `${option.title}` : searchTerm
                          }
                          loading={isSearchingService}
                          getOptionSelected={(option, value) =>
                            value?.id === option?.id
                          }
                          value={searchTerm}
                          onChange={(event, newValue) => {
                            setSearchTerm(newValue)
                            // handleChange('search_value')(
                            //   createFakeEvent(newValue?.id ?? ''),
                            // )
                          }}
                          onInputChange={(e, newValue) => {
                            setSearchTerm(newValue)
                          }}
                          classes={{
                            root: classes.rootSecondary,
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              classes={{root: classes.customTextField}}
                              variant="outlined"
                              placeholder="Search for a service"
                              InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                startAdornment: (
                                  <img
                                    src="/site__main__images/site__search.png"
                                    alt="Urbanserve Icon"
                                    width="22px"
                                    height="22px"
                                    style={{marginRight: '1.571rem'}}
                                  />
                                ),
                                endAdornment: (
                                  <React.Fragment>
                                    {isSearchingService ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                            />
                          )}
                        />
                      </Grid.Column>
                      <Grid.Column tablet={4} computer={4}></Grid.Column>
                      <Grid.Column
                        tablet={12}
                        computer={12}
                        className="site__category__search__content"
                      >
                        <h2 className="site__category__search__text">
                          Book Carpet Cleaning, Gutter Cleaning and more.
                        </h2>
                      </Grid.Column>
                    </Grid>
                  </div>
                  <div className="site__category__search__divider"></div>
                  {isFetchingCategories ? (
                    <div
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        alignContent: 'center',
                        zIndex: '1',
                      }}
                    >
                      <Loader active inline="centered" />
                    </div>
                  ) : (
                    <Grid
                      stackable={false}
                      columns={isTabletOrMobile === true ? 3 : 5}
                      className="site__category__card__row"
                    >
                      {categories?.length > 0 ? (
                        categories?.map((ele, i) => (
                          <Grid.Column
                            className="site__category__card__content"
                            onClick={() => {
                              setCurrentProduct(ele)
                              localStorage.setItem(
                                'categoryDetail',
                                JSON.stringify(ele),
                              )
                              if (ele?.is_cat_landing_page) {
                                router.push(
                                  `/${groupName}/${ele?.category_name
                                    .toLowerCase()
                                    .replace(/\s/gm, '-')}`,
                                )
                              } else {
                                setDrawerOpen(true)
                                setDrawerType(ele?.category_name.toLowerCase())
                              }
                            }}
                            style={{
                              marginBottom:
                                categories?.length > 5 &&
                                i <= 5 &&
                                !isTabletOrMobile
                                  ? '2rem'
                                  : '0rem',
                            }}
                          >
                            <a
                              href={
                                ele?.is_cat_landing_page
                                  ? `/${groupName}/${ele?.category_name
                                      .toLowerCase()
                                      .replace(/\s/gm, '-')}`
                                  : null
                              }
                            >
                              <div className="category__card__segment">
                                <div className="category__card__image">
                                  <Image
                                    src={`${ele?.image?.file_path}`}
                                    alt="Urbanserve Icon"
                                    quality={100}
                                    layout="fill"
                                  />
                                </div>
                                <div className="category__card__text">
                                  <h3>{ele?.category_name}</h3>
                                </div>
                              </div>
                            </a>
                          </Grid.Column>
                        ))
                      ) : (
                        <h3
                          className="drawer__error__text"
                          style={{textAlign: 'center', padding: '1rem 0rem'}}
                        >
                          We are adding services in your region soon. Please
                          check with us in near future.
                        </h3>
                      )}
                    </Grid>
                  )}
                </div>
              </Card>
            </div>
          </section>

          {/* Site How Section Starts */}
          <section
            className="site__quality__wrapper__light site__category__quality__wrapper"
            style={{
              marginTop: categories?.length > 5 && !isTabletOrMobile && `26rem`,
            }}
          >
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
                      className="quality__img"
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
                            Our traders are business and public liability
                            insured to give you the peace-of -mind that you
                            deserve!
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

          {/* Home Services Starts */}
          <section className="site__hservices__wrapper">
            <div className="site__hservices__container site_lg_container">
              <div className="site__hservices__header">
                <h2>Home Services</h2>
              </div>
              <Grid
                className="site__hservices__grid"
                stackable
                columns={3}
                style={{margin: '0', padding: '0'}}
              >
                <Grid.Column
                  style={{
                    margin: '0px !important',
                    padding: '0rem 1rem !important',
                  }}
                >
                  <Link
                    href={`/${groupName}/${`carpet-and-upholstery-cleaning`}`}
                  >
                    <a
                      href={`/${groupName}/${`carpet-and-upholstery-cleaning`}`}
                    >
                      <div className="site__hservices__card">
                        <div className="site__hservices__card__img">
                          <img
                            src="/images/home/img-carpet.webp"
                            alt="UrbanServe - Carpet & upholstery cleaning"
                            width="100%"
                          />
                        </div>

                        <div className="site__hservices__card__body">
                          <h3>Carpet and upholstery cleaning</h3>
                          <p>
                            Carpet and upholstery cleaning is the product
                            designed for the purpose of eliminating dirt and
                            stains on rugs, carpeting, on household furniture or
                            objects upholstered or covered with fabrics such as
                            wool, cotton, nylon, or other synthetic fabrics
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Grid.Column>
                <Grid.Column
                  style={{
                    margin: '0px !important',
                    padding: '0rem 1rem !important',
                  }}
                >
                  <Link
                    href={`/${groupName}/${`end-of-tenancy-or-deep-cleaning`}`}
                  >
                    <a
                      href={`/${groupName}/${`end-of-tenancy-or-deep-cleaning`}`}
                    >
                      <div className="site__hservices__card site__hservices__card__mb">
                        <div className="site__hservices__card__img">
                          <img
                            src="/images/home/img-tenancy.webp"
                            alt="UrbanServe - End of Tenancy Cleaning"
                            width="100%"
                          />
                        </div>
                        <div className="site__hservices__card__body">
                          <h3>End of Tenancy or Deep Cleaning</h3>
                          <p>
                            Landlords and tenants should always make sure they
                            clean up after themselves before leaving a property.
                            This is the best way to ensure that you will get
                            your deposit back, as well as creating an atmosphere
                            where new people can easily picture themselves
                            living in or renting out this space!
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Grid.Column>
                <Grid.Column
                  style={{
                    margin: '0px !important',
                    padding: '0rem 1rem !important',
                  }}
                >
                  <Link href={`/${groupName}/${`gutter-cleaning`}`}>
                    <a href={`/${groupName}/${`gutter-cleaning`}`}>
                      <div className="site__hservices__card site__hservices__card__mb">
                        <div className="site__hservices__card__img">
                          <img
                            src="/images/home/img-gutter.webp"
                            alt="UrbanServe - Gutter Cleaning"
                            width="100%"
                          />
                        </div>
                        <div className="site__hservices__card__body">
                          <h3>Gutter Cleaning</h3>
                          <p>
                            Gutters are an essential part of the house and need
                            to be kept clean and clear from any debris. This
                            prevents any flooding from taking place, minimise
                            soil erosion around the property and any water
                            related stains on patios etc.
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Grid.Column>
              </Grid>
            </div>
          </section>
          {/* Home Services Ends */}

          {/* Home Services Starts */}
          <section className="site__hservices__wrapper site__hservices__light__bg">
            <div className="site__hservices__container site_lg_container">
              <div className="site__hservices__header">
                <h2>Installation & Maintainance</h2>
              </div>
              <Grid
                className="site__hservices__grid"
                stackable
                columns={2}
                style={{margin: '0', padding: '0'}}
              >
                <Grid.Column
                  style={{
                    margin: '0px !important',
                    padding: '0rem 1rem !important',
                  }}
                >
                  <Link href={`/${groupName}/${`boiler-installation`}`}>
                    <a href={`/${groupName}/${`boiler-installation`}`}>
                      <div className="site__hservices__card site__hservices__card__mb">
                        <div className="site__hservices__card__img">
                          <img
                            src="/images/home/img-boiler-service.webp"
                            alt="UrbanServe - Boiler Installation, Repair & Maintenance"
                            width="100%"
                          />
                        </div>
                        <div className="site__hservices__card__body">
                          <h3 className="site__hservices__custom__header">
                            Boiler Service
                          </h3>
                          <p>
                            A boiler service is a set of checks and tests that a
                            Gas Safe engineer performs on the boiler. This
                            ensures your boiler is working efficiently and
                            effectively. A good boiler service means that a Gas
                            Safe engineer checks the correct gas pressure and
                            flow.
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Grid.Column>

                <Grid.Column
                  style={{
                    margin: '0px !important',
                    padding: '0rem 1rem !important',
                  }}
                >
                  <Link href={`/${groupName}/${`mobile-car-valeting`}`}>
                    <a href={`/${groupName}/${`mobile-car-valeting`}`}>
                      <div className="site__hservices__card">
                        <div className="site__hservices__card__img">
                          <img
                            src="/images/home/img-car-valeting.webp"
                            alt="UrbanServe - Mobile Car Valeting"
                            width="100%"
                          />
                        </div>
                        <div className="site__hservices__card__body">
                          <h3 className="site__hservices__custom__header">
                            Mobile Car Valeting
                          </h3>
                          <p>
                            Car valeting is a service provided to clean and
                            improve the overall appearance of a vehicle. There
                            are various levels of valeting services available,
                            and we offer a variety of packages to suit different
                            requirements and price points.
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Grid.Column>
              </Grid>
            </div>
          </section>
          {/* Home Services Ends */}

          {/* Site How Section Starts */}
          <section className="site__how__wrapper">
            <div className="site__how__container site_lg_container">
              <h2 className="site__how__header">How it works</h2>
              <p className="site__how__subheader">
                Finding a reliable service is easier said than done. You can go
                through Hassle of getting many quotes from various service
                prodiders or book swiftly at a fair upfront price using
                UrbanServe.
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
                        <h3 className="site__how__card__title">
                          Choose your Service
                        </h3>
                        <p className="site__how__card__info">
                          Various products are available to suit your needs,
                          pick one that fits
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
                        <h3 className="site__how__card__title">
                          Book at your convenience
                        </h3>
                        <p className="site__how__card__info how__card__info">
                          Take advantage of our convenient online booking system
                          or app
                        </p>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column className="site__how__col ">
                    <div className="site__how__card site__how__card__three">
                      {/* <div
                        style={{
                          position: 'relative',
                          width: '22%',
                        }}
                      >
                        <Image
                          alt="Urbanserve Icon"
                          layout="responsive"
                          width={100}
                          height={100}
                          objectFit="contain"
                          src={siteImages.howImageThree.src}
                          quality={100}
                        />
                      </div> */}
                      <img
                        src={siteImages.imgHowThree.src}
                        alt="Urbanserve Image"
                        width="100%"
                      />
                      <div className="site__how__card__body">
                        <h3 className="site__how__card__title">
                          Track and Relax
                        </h3>
                        <p className="site__how__card__info">
                          Track and manage your services after you have booked
                          them
                        </p>
                      </div>
                    </div>
                  </Grid.Column>
                </Grid>
              </div>
            </div>
          </section>
          {/* Site How Section Ends */}

          {/* Site Join Starts */}
          <section className="site__join__wrapper">
            <div className="site__join__container site_lg_container">
              <div className="site__join__main">
                <div className="site__join__content">
                  <div className="site__join__img__mb">
                    <img
                      src="/site__main__images/join__mb__img.png"
                      width="100%"
                      alt="Urbanserve Icon"
                    />
                  </div>
                  <img
                    alt="Urbanserve Icon"
                    className="site__join__img__lg"
                    src="/images/home/img-join.webp"
                    width="100%"
                  />
                  {/* <div className="site__join__img">
            <img src="/site__main__images/site__join.png" alt="Urbanserve Image" width="100%" />
        </div> */}
                  <div className="site__join__info">
                    <h3>Want to serve with UrbanServe?</h3>
                    <a
                      target="_blank"
                      href="/tradespeople"
                      rel="noopener noreferrer"
                    >
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
                        <p className="site__btn__apple__header">
                          Download on the
                        </p>
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
        </>
      )}

      <Drawer
        open={drawerOpen}
        anchor="right"
        onClose={() => {
          setDrawerOpen(false)
          setDrawerType('')
          setCurrentProduct({})
        }}
        classes={{paper: classes.drawerPaper}}
      >
        <div className="category__drawer__pd">
          <div className="drawer__header">
            <img
              className={classes.drawerBackIcon}
              onClick={() => {
                setDrawerOpen(false)
                setDrawerType('')
                setCurrentProduct({})
              }}
              alt="Urbanserve Icon"
              src="/site__main__images/site__chevron__right.png"
              width="22px"
              height="14px"
            ></img>
            <h3 className={classes.drawerHeader}>{drawerType}</h3>
          </div>
          <div className={classes.listPadding}>
            {isFetchingProductDetails ? (
              <div style={{padding: '2rem'}}>
                <Loader active inline="centered" />
              </div>
            ) : (
              <SemanticList selection verticalAlign="middle">
                {product?.length > 0 ? (
                  product?.map((ele) => (
                    <>
                      <div
                        className="drawer__item"
                        onClick={() => {
                          router.push(
                            `/${groupName}/product/${ele?.title
                              .toLowerCase()
                              .replace(/\s/gm, '-')}`,
                          )
                          setDrawerOpen(false)
                          setDrawerType('')
                          setCurrentProduct({})
                        }}
                      >
                        <div
                          style={{
                            overflow: 'hidden',
                            minWidth: '68px',
                            maxWidth: '68px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {ele?.product_image ? (
                            <img
                              src={
                                ele?.product_image?.type === 'public'
                                  ? `${ele?.product_image?.file_path}`
                                  : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${ele?.product_image?.id}/show-file`
                              }
                              alt="Urbanserve Service Icon"
                              width="100%"
                              className="drawer__item__img"
                            />
                          ) : (
                            <img
                              alt="Urbanserve Service Icon"
                              src="/site__main__images/site__chevron__left.png"
                              className="drawer__item__img"
                              width="100%"
                            />
                          )}
                        </div>
                        <h2 className="drawer__item__text">{ele.title}</h2>
                        <img
                          src="/site__main__images/site__chevron__left.png"
                          width="22px"
                          height="14px"
                          style={{marginLeft: 'auto'}}
                          alt="Urbanserve Service Icon"
                        />
                      </div>
                    </>
                  ))
                ) : (
                  <div className="drawer__error__content">
                    <h4 className="drawer__error__text">No services found!</h4>
                  </div>
                )}
              </SemanticList>
            )}
          </div>
        </div>
      </Drawer>

      {/* Location POPPER */}
      <Popper
        open={locationDialog}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({TransitionProps}) => (
          <Fade {...TransitionProps}>
            <ClickAwayListener
              onClickAway={() => setLocationDialog(!locationDialog)}
            >
              <Paper className="site__location__popper">
                <div
                  className="site__popper__header"
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{alignItems: 'center', display: 'flex'}}>
                    <img
                      src="/site__main__images/site__location__light.png"
                      alt="Urbanserve Icon"
                      width="22px"
                      height="22px"
                    />
                    <p
                      style={{
                        marginLeft: 10,
                        fontFamily: 'Urbanist',
                        fontWeight: 'bold',
                        maxWidth: userAddress !== null ? '60%' : '100%',
                        textTransform: 'capitalize',
                      }}
                    >
                      {userAddress ? userAddress : groupName}
                    </p>
                  </div>
                  <div
                    style={{
                      cursor: 'pointer',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <p
                      style={{
                        marginLeft: 10,
                        fontFamily: 'Urbanist',
                        fontWeight: 'bold',
                        color: '#3698FF',
                      }}
                    >
                      Current Location
                    </p>
                  </div>
                </div>

                <div className="site__popper__input">
                  <div>
                    <input
                      value={value}
                      onChange={handleInput}
                      disabled={!ready}
                      placeholder={`Search your location in ${groupName}`}
                      className="us__google__input"
                    />
                    {status === 'OK' && (
                      <div className="us__google__result">
                        <ul>{renderSuggestions()}</ul>
                      </div>
                    )}
                  </div>
                </div>
              </Paper>
            </ClickAwayListener>
          </Fade>
        )}
      </Popper>

      {/* Mobile Location Modal */}
      <Drawer
        open={mbCityDrawerOpen}
        anchor="bottom"
        closeOnEscape={false}
        closeOnDimmerClick={false}
        classes={{paper: classes.locationDrawerPaper}}
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
              borderBottom: '1px solid #DAECFF',
            }}
          >
            <h3 className={classes.FilterTitle}>Select your city</h3>
            <IconButton
              size="small"
              disableFocusRipple
              disableRipple
              onClick={() => {
                setMbCityDrawerOpen(false)
                setDrawerType('')
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
              onClick={() => setUpdate(!update)}
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
                        setMbCityDrawerOpen(false)
                        setDrawerType('')
                        Router.push(`/${ele?.title?.toLowerCase()}`)
                        setName(`${ele?.title?.toLowerCase()}`)
                        localStorage.setItem(
                          'urbanserve_user_last_location',
                          `${groupName}`,
                        )
                        setUpdate(!update)
                        setUserAddress(ele?.title)
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

      {/* Search Modal */}
      <Drawer
        open={isMBSearchOpen}
        anchor="bottom"
        onClose={() => {
          setIsMBSearchOpen(false)
          setSearchTerm('')
        }}
        classes={{paper: classes.searchDrawerPaper}}
      >
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            padding: '1rem 1rem',
            borderBottom: '1px solid #DAECFF',
          }}
        >
          <IconButton
            size="small"
            disableFocusRipple
            disableRipple
            onClick={() => {
              setIsMBSearchOpen(false)
              setSearchTerm('')
            }}
            style={{display: 'flex', justifyContent: 'flex-start'}}
          >
            <img
              src="/site__main__images/site__chevron__right.png"
              width="20px"
            ></img>
          </IconButton>
          <TextField
            style={{marginLeft: '1rem'}}
            id="outlined-basic"
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.resize,
              },
            }}
            placeholder="Search for a service"
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div>
          {isSearchingService ? (
            <div
              style={{padding: '1rem', display: 'flex', alignContent: 'center'}}
            >
              <Loader active inline="centered" />
            </div>
          ) : (
            <div className="mb__service">
              {searchResultData?.length > 0 &&
                searchResultData?.map(
                  (ele) =>
                    ele?.type !== 'category' && (
                      <div
                        className="mb__service__content"
                        onClick={() => {
                          // handleChange('search_value')(
                          //   createFakeEvent(ele?.id ?? ''),
                          // )
                          setSearchTerm(ele)
                        }}
                      >
                        <h3
                          onClick={() => {
                            // handleChange('search_value')(
                            //   createFakeEvent(ele?.id ?? ''),
                            // )
                            setSearchTerm(ele)
                          }}
                          className="mb__service__title"
                        >
                          {ele?.title}
                        </h3>
                      </div>
                    ),
                )}
            </div>
          )}
        </div>
      </Drawer>

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
          <SemanticBtn
            className="location__btn"
            style={{marginBottom: '0rem'}}
            onClick={() => {
              resetGeoState()
              setMbCityDrawerOpen(false)
              isUrlLocationValid?.length > 0 && setUserAddress(formattedAddress)
            }}
          >
            {isUrlLocationValid?.length > 0 ? `Explore Services` : `Okay`}
          </SemanticBtn>
        </Modal.Actions>
      </Modal>
      <Modal
        size="mini"
        open={groupErrorModal}
        onClose={() => setGroupErrorModal(false)}
      >
        <Modal.Content>
          <Modal.Description>
            <>
              <p>We don't serve in your area yet!</p>
            </>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <SemanticBtn
            style={{marginBottom: '0rem'}}
            className="location__btn"
            onClick={() => {
              setGroupErrorModal(false)
            }}
          >
            {`Okay`}
          </SemanticBtn>
        </Modal.Actions>
      </Modal>

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
    </>
  )
}

const mapStateToProps = (state) => ({
  product: state.groupDetailsReducer?.product,
  isFetchingProductDetails: state.groupDetailsReducer?.isFetchingProductDetails,
  isFetchingCategories: state.groupDetailsReducer?.isFetchingCategoriesDetails,
  searchResult: state?.CategoryDetailsReducer?.searchResult,
  isSearchingService: state?.CategoryDetailsReducer?.isSearchingService,
})

const mapDispatchToProps = (dispatch) => {
  return {
    //Fetch list
    fetchCategories: (data) => dispatch(getCategoriesRequest(data)),
    fetchProduct: (data) => dispatch(getProductRequest(data)),
    validateLocation: (data) => dispatch(validateLocationRequest(data)),
    Logout: (data) => dispatch(LogoutAction(data)),
    fetchGroupListingDetails: (data) => dispatch(getGroupRequest(data)),
    searchRequest: (data) => dispatch(searchRequest(data)),
    validateDirectLocationRequest: (data) =>
      dispatch(validateDirectLocationRequest(data)),
    resetValidateLocation: (data) => dispatch(resetValidateLocation(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

// export async function getStaticProps({params}) {

//   const { location } = params;
//   return {
//     props: { location }, // will be passed to the page component as props
//   }
// }
// export const getStaticPaths = async () => {

//   return {
//       paths: [], //indicates that no page needs be created at build time
//       fallback: 'blocking' //indicates the type of fallback
//   }
// }

export default withStyles(styles)(compose(withConnect)(Slug))
