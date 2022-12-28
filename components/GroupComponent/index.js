import React, {useState, useEffect} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import {
  Grid,
  Breadcrumb,
  Modal,
  Button,
  Card,
  Segment,
  Icon,
  Image,
  Loader,
  Divider,
  List as SemanticList,
  Label,
} from 'semantic-ui-react'
import {
  Drawer,
  DialogContent,
  IconButton,
  makeStyles,
  Card as MaterialCard,
} from '@material-ui/core'
import {
  getGroupCategoriesRequest,
  getCategoriesRequest,
  getProductRequest,
  validateLocationRequest,
} from '../../Stores/GroupDetails/actions'
import Router, {useRouter} from 'next/router'
import CategoryComponent from './../../components/CategoryComponent'

import {getPostCodeFromLatLong} from '../../utils/latLongSearch'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete'
import Badge from '@material-ui/core/Badge'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import {withStyles} from '@material-ui/core/styles'
import Link from 'next/link'

import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import actions from '../../Stores/Auth/actions'
import GeoLocation from '../GeoLocation'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import InfoIcon from '@material-ui/icons/Info'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ShareIcon from '@material-ui/icons/Share'
import SiteNavComp from '../SiteNavComp'

const LogoutAction = actions.logout
const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  customBadge: {
    backgroundColor: '#0D6773',
    color: 'white',
  },
  drawerPaper: {
    maxWidth: theme.breakpoints.values.sm * 0.65,
    width: '100%',
    height: '100vh',
  },
  FilterTitle: {
    margin: '0 auto',
    color: 'black',
    fontSize: '1.2rem',
    width: '100%',
    lineHeight: '1.8rem',
    letterSpacing: '0.1em',
    fontFamily: 'Ubuntu,sans-serif',
    textTransform: 'uppercase',
  },
  CloseIcon: {
    position: 'absolute',
    right: '-10px',
  },
  CloseIconSize: {
    fontSize: '35px',
    fill: '#000000',
  },
  listPadding: {
    padding: '1rem 0.4rem',
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    minwidth: '260px',
    maxWidth: '260px',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

function Slug(props) {
  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  const {
    classes,
    fetchCategories,
    fetchGroupCateDetails,
    fetchProduct,
    validateLocation,
    product,
    isFetchingProductDetails,
    groupName,
    Logout,
  } = props
  const classStyles = useStyles()
  const [open, setOpen] = React.useState(false)
  const [getGPS, setGetGPS] = React.useState(false)
  const [getGPSPermission, setGetGPSPermissions] = React.useState(false)
  const [positionData, setPositionData] = React.useState(false)
  const [postcodeResult, setPostcodeResult] = React.useState([])
  const [address, setAddress] = useState('')
  const [addressObj, setAddressObj] = useState()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState('')

  const [listOneOpen, setListOpenOne] = React.useState(false)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const handleListOneClick = () => {
    setListOpenOne(!listOneOpen)
  }
  useEffect(() => {
    // navigator.permissions.query({ name: 'geolocation' })
    //     .then(console.log)
    // console.log("here in will moubt", slug);
    // if (slug) {
    //     validateLocation(slug);
    // }
  }, [])

  useEffect(() => {
    if (getGPS === true) {
      navigator.permissions
        .query({name: 'geolocation'})
        .then((data) => setGetGPSPermissions(data?.state))
    }
  }, [getGPS])

  const getPostcode = async () => {
    let res = await getPostCodeFromLatLong(positionData)
    if (res) {
      let city = ''
      res.map(async (ele) => {
        if (ele?.types.indexOf('locality') > -1) {
          if (ele?.formatted_address !== '') {
            setFullAddress(ele?.formatted_address)
            localStorage.setItem(
              'actiserve_user_location',
              ele?.formatted_address,
            )
            if (ele?.address_components.length > 0) {
              ele?.address_components.map(async (item) => {
                if (item?.types.indexOf('locality') > -1) {
                  city = await item?.long_name
                  if (city == '') {
                  } else {
                    setCity(city)
                    // localStorage.setItem("actiserve_user_city", city)
                  }
                }
              })
            }
          }
        }
      })
      // if (city) {
      //     localStorage.setItem("actiserve_user_location", city)
      // }
      setPostcodeResult(res)
    } else {
      setPostcodeResult([])
    }
  }

  useEffect(() => {
    if (positionData && getGPS === true && getGPSPermission === 'granted') {
      getPostcode()
    }
  }, [positionData, getGPS, getGPSPermission])

  useEffect(() => {
    if (getGPSPermission === 'denied' && getGPS === true) {
      setOpen(true)
    } else if (getGPSPermission === 'denied' && getGPS === true) {
      setOpen(true)
    } else if (getGPSPermission === 'granted' && getGPS === true) {
      setOpen(true)
    }
  }, [getGPSPermission, getGPS])

  // Save location in local storage
  useEffect(() => {
    if (postcodeResult !== null || postcodeResult !== []) {
      if (
        typeof window !== 'undefined' &&
        postcodeResult?.[0]?.title?.admin_district !== undefined
      ) {
        localStorage.setItem(
          'user_location',
          postcodeResult?.[0]?.title?.admin_district,
        )
      }
    }
  }, [postcodeResult])
  const history = useRouter()
  const [currentProduct, setCurrentProduct] = useState({})
  const [optionSelected, setOptionSelected] = useState(false)
  const [autoCompleteState, setAutoCompleteState] = useState({
    postcode: '',
  })
  const [loggedIn, setLoggedIn] = React.useState(false)
  const {categories, isLocationValid, isValidatingLocation} = useSelector(
    (state) => state?.groupDetailsReducer,
  )

  const [dropdownOpen, setDropDownOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [locationModalOpen, setLocationModalOpen] = React.useState(false)
  const [lable, setLable] = React.useState('')

  useEffect(() => {
    if (optionSelected === true) {
      fetchGroupCateDetails(autoCompleteState?.postcode)
      setOptionSelected(false)
    }
  }, [optionSelected])

  const isBrowser = () => typeof window !== 'undefined'
  useEffect(() => {
    if (!history.isReady) {
      return
    }
  }, [history.isReady])

  // Validate location from slug
  useEffect(() => {
    if (groupName) {
      validateLocation(groupName)
    }
  }, [groupName])

  // Fetch categories if location is valid
  useEffect(() => {
    if (isLocationValid !== 404 && isLocationValid !== []) {
      let id = isLocationValid?.[0]?.uuid
      if (id) {
        fetchCategories(id)
      }
    }
  }, [isLocationValid])

  useEffect(() => {
    if (
      isValidatingLocation === false &&
      (isLocationValid === 404 || isLocationValid === [])
    ) {
      setLocationModalOpen(true)
    }
  }, [isLocationValid, isValidatingLocation])

  useEffect(() => {
    if (isLocationValid !== 404 && isLocationValid !== []) {
      let user_city = isLocationValid?.[0]?.title?.toLowerCase()
      if (user_city) {
        Router.push(`/${user_city}`)
      }
    }
  }, [isLocationValid])

  useEffect(() => {
    if (currentProduct !== null && currentProduct !== {}) {
      // Set Current Category In Local Storage
      if (isBrowser()) {
        let id = currentProduct?.id
        if (id) {
          localStorage.setItem('actiserve_current_category', id)
        }
      }
    }
  }, [currentProduct])

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
      }
    }
  }, [isLocationValid])

  // Check if user is logged in
  useEffect(() => {
    if (userInfo && userInfo?.id !== null) {
      setLoggedIn(true)
    }
  }, [userInfo])

  const handleDropdownToggle = () => {
    setDropDownOpen((prevOpen) => !prevOpen)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setDropDownOpen(false)
    }
  }

  const handleDropDownClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setDropDownOpen(false)
  }

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id))
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components)
      setAddressObj(addressObject)
    }
    func()
    if (address !== '') {
      let data = JSON.stringify(address)
      if (isLocationValid !== 404 && isLocationValid !== false) {
        localStorage.setItem('actiserve_address_obj', data)
      }
    }
  }, [address])

  useEffect(() => {
    if (addressObj) {
      let formattedOBJ = {
        address: addressObj?.address,
        city: addressObj?.city,
        country: addressObj?.country,
        postal_code: addressObj?.postal_code,
        postal_town: addressObj?.postal_town,
        province: addressObj?.province,
        lable: address?.value?.structured_formatting?.main_text,
      }
      let data = JSON.stringify(formattedOBJ)
      if (isLocationValid !== 404 && isLocationValid !== false) {
        localStorage.setItem('actiserve_address_user_obj', data)
      }
    }
  }, [addressObj, isLocationValid])

  const [placeholder, setPlaceHolder] = useState('')

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      postal_town: ['postal_town'],
      street: ['street_address', 'route'],
      province: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      country: ['country'],
    }

    let address = {
      street_number: '',
      postal_code: '',
      postal_town: '',
      street: '',
      province: '',
      city: '',
      country: '',
    }

    address_components?.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe]?.indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'locality') {
            address[shouldBe] = component.short_name
          } else {
            address[shouldBe] = component.long_name
          }
        }
      }
    })

    // Fix the shape to match our schema
    address.address = address.street_number + ' ' + address.street
    delete address.street_number
    delete address.street
    if (address.country === 'US') {
      address.state = address.province
      delete address.province
    }
    return address
  }

  useEffect(() => {
    if (addressObj?.postal_town !== '') {
      let city = addressObj?.postal_town?.toLowerCase()
      if (city) {
        validateLocation(city)
      }
    }
  }, [addressObj])

  useEffect(() => {
    if (isLocationValid !== 404 && isLocationValid !== false) {
      if (addressObj?.postal_town !== '') {
        let city = addressObj?.postal_town?.toLowerCase()
        if (city) {
          localStorage.setItem('actiserve_user_city', city)
        }
      }
    }
  }, [isLocationValid])

  useEffect(() => {
    if (isBrowser()) {
      let user_address_obj = localStorage.getItem('actiserve_address_obj')
      if (
        user_address_obj !== null &&
        user_address_obj !== undefined &&
        user_address_obj !== ''
      ) {
        let data_obj = JSON.parse(user_address_obj)
        if (data_obj) {
          setLable(data_obj?.label)
        }
      }
    }
  }, [])

  // useEffect(() => {
  //     function checkUserData() {
  //         const item = localStorage.getItem("actiserve_user_detect_location");
  //         console.log("item>>>", item)
  //         if (item !== null) {
  //             setLable('')
  //             let cleanAddress = JSON.parse(item);
  //             console.log("cleanAddress>>>", cleanAddress)
  //             if (cleanAddress) {
  //                 setPlaceHolder(cleanAddress)
  //             }
  //         }
  //     }

  //     checkUserData();

  //     window.addEventListener("storage", checkUserData);

  //     return () => {
  //         window.removeEventListener("storage", checkUserData);
  //     };
  // }, []);

  const [scrollValue, setScrollValue] = useState(0)
  const [shouldDisplay, setShouldDisplay] = useState(false)

  useEffect(() => {
    if (scrollValue <= 0) {
      if (typeof window !== 'undefined') {
        window.onscroll = () => {
          let currentScrollPos = window.pageYOffset
          let maxScroll = document.body.scrollHeight - window.innerHeight
          setScrollValue(currentScrollPos)
        }
      }
    }
  }, [scrollValue])

  useEffect(() => {
    if (scrollValue >= 450) {
      setShouldDisplay(true)
    } else {
      setShouldDisplay(false)
    }
  }, [scrollValue])

  return (
    <>
      {groupName && groupName !== '' && (
        <>
          <div>
            {shouldDisplay && (
              <section
                className="site-category-fixed-wrapper"
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  position: 'fixed',
                  top: '0',
                  zIndex: '400',
                }}
              >
                <div className="site-category-fixed-container container">
                  <div className="site-category-fixed-content">
                    <Grid stackable columns={6}>
                      {categories?.length > 0
                        ? categories?.map((ele, i) => (
                            <>
                              {i <= 6 ? (
                                <Grid.Column
                                  className="site-category-fixed-grid"
                                  onClick={() => {
                                    setCurrentProduct(ele)
                                    setDrawerOpen(true)
                                    setDrawerType(
                                      ele?.category_name.toLowerCase(),
                                    )
                                  }}
                                >
                                  <Segment className="site-category-fixed-seg">
                                    <div className="site-category-fixed-img">
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.image?.id}`}
                                        alt="Urbanserve Service Icon"
                                        width="22px"
                                        height="22px"
                                      />
                                    </div>
                                    <div className="site-category-fixed-text">
                                      <h4>{ele?.category_name}</h4>
                                    </div>
                                  </Segment>
                                </Grid.Column>
                              ) : (
                                <Label
                                  as="a"
                                  onClick={() => window.scrollTo(0, 0)}
                                >
                                  More
                                </Label>
                              )}
                            </>
                          ))
                        : 'No Categories'}
                    </Grid>
                  </div>
                </div>
              </section>
            )}

            <section className="site-category-wrapper">
              <div className="site-category-container container">
                <SiteNavComp />

                <div className="site-category-search">
                  <h1 className="site-category-title">
                    cleaning & repair services,{' '}
                    <span className="title-highlight">on demand</span>
                  </h1>

                  <div className="site-category-address">
                    <GooglePlacesAutocomplete
                      apiKey={process.env.NEXT_PUBLIC_APP_MAPS_KEYS}
                      selectProps={{
                        isClearable: true,
                        value: address,
                        placeholder: `Search your address in ${history?.pathname.replace(
                          /\\|\//g,
                          '',
                        )}`,
                        onChange: (val) => {
                          setAddress(val)
                          setPlaceHolder('')
                        },
                        styles: {
                          option: (provided) => ({
                            color: '#2F4858',
                          }),
                        },
                      }}
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ['uk'],
                        },
                      }}
                    />
                    <GeoLocation />
                  </div>
                </div>
              </div>

              <div className="site-category-left-circle">
                <img
                  src="/images/banner-half-circle.png"
                  alt=""
                  width="100%"
                ></img>
              </div>
              <Card
                className="site-category-card"
                style={{maxWidth: '1640px', borderRadius: '0px'}}
              >
                <Grid className="site-category-grid-section">
                  {categories?.length > 0
                    ? categories?.map((ele) => (
                        <Grid.Column
                          mobile={4}
                          tablet={4}
                          computer={4}
                          className="site-category-card-content"
                          onClick={() => {
                            setCurrentProduct(ele)
                            setDrawerOpen(true)
                            setDrawerType(ele?.category_name.toLowerCase())
                          }}
                          style={{marginBottom: '1rem'}}
                        >
                          <div className="category-card-segment">
                            <div className="category-card-image">
                              <img
                                src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.image?.id}`}
                                alt="Urbanserve Service Icon"
                                width="42px"
                                height="42px"
                              />
                            </div>
                            <div className="category-card-text">
                              <h4>{ele?.category_name}</h4>
                            </div>
                          </div>
                        </Grid.Column>
                      ))
                    : 'No Categories'}
                </Grid>
              </Card>
            </section>

            <section className="site-feature-wrapper category-feature-padding">
              <div className="site-feature-container container" style={{}}>
                <Grid stackable columns={3} className="site-feature-grid">
                  <Grid.Column className="site-feature-col">
                    <div className="site-feature-col-header">
                      <span className="site-feature-circle">
                        <img
                          src="/images/icon-how-dollar-sign.png"
                          width="100%"
                        />
                      </span>
                      <h3>Fixed Transparent Pricing</h3>
                    </div>
                    <span className="site-feature-line"></span>
                    <p>
                      We offer fair and flexible pricing based on your location
                    </p>
                  </Grid.Column>
                  <Grid.Column className="site-feature-col">
                    <div className="site-feature-col-header">
                      <span className="site-feature-circle">
                        <img src="/images/icon-how-circle.png" width="100%" />
                      </span>
                      <h3>Manage Booking using App</h3>
                    </div>
                    <span className="site-feature-line"></span>
                    <p>Lorem ipsum dolor sit amet, conse adipiscing elit</p>
                  </Grid.Column>
                  <Grid.Column className="site-feature-col site-col-right">
                    <div className="site-feature-col-header">
                      <span className="site-feature-circle">
                        <img src="/images/icon-how-calendar.png" width="100%" />
                      </span>
                      <h3>Local Services at your Fingertips</h3>
                    </div>
                    <span className="site-feature-line"></span>
                    <p>
                      We’ll always work around your flexibility and availability
                    </p>
                  </Grid.Column>
                  <Grid.Column className="site-feature-col">
                    <div className="site-feature-col-header">
                      <span className="site-feature-circle">
                        <img src="/images/icon-how-calendar.png" width="100%" />
                      </span>
                      <h3>Qualified Insured Experts</h3>
                    </div>
                    <span className="site-feature-line"></span>
                    <p>
                      Our local experts are fully qualified with a vast
                      experience
                    </p>
                  </Grid.Column>
                  <Grid.Column className="site-feature-col">
                    <div className="site-feature-col-header">
                      <span className="site-feature-circle">
                        <img
                          src="/images/icon-how-headphones.png"
                          width="100%"
                        />
                      </span>
                      <h3>Call and Chat Support</h3>
                    </div>
                    <span className="site-feature-line"></span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc.
                    </p>
                  </Grid.Column>
                  <Grid.Column
                    className="site-feature-col site-col-right"
                    style={{paddingBottom: '3rem'}}
                  >
                    <div className="site-feature-col-header">
                      <span className="site-feature-circle">
                        <img src="/images/icon-how-shield.png" width="100%" />
                      </span>
                      <h3>Safety is a priority</h3>
                    </div>
                    <span className="site-feature-line"></span>
                    <p>
                      Our service providers are fully vetted and DBS checked
                    </p>
                  </Grid.Column>
                </Grid>
              </div>
            </section>

            <section className="site-category-how-wrapper">
              <div className="site-category-how-container container">
                <Grid textAlign="center" className="how-grid">
                  <Grid.Row className="row-top">
                    <Grid.Column mobile={16} tablet="8" computer={8}>
                      <div className="card-content">
                        <div className="card-img">
                          <img src="/images/process-1.png" width="100%" />
                        </div>
                        <h3>You Choose</h3>
                      </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet="8" computer={8}>
                      <div className="card-content">
                        <div className="card-img">
                          <img src="/images/process-2.png" width="100%" />
                        </div>
                        <h3>You Book</h3>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="row-bottom">
                    <Grid.Column mobile={16} tablet="8" computer={8}>
                      <div className="card-content">
                        <div className="card-img">
                          <img src="/images/process-3.png" width="100%" />
                        </div>
                        <h3>You Track</h3>
                      </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet="8" computer={8}>
                      <div className="card-content">
                        <div className="card-img">
                          <img src="/images/process-4.png" width="100%" />
                        </div>
                        <h3>We Deliver</h3>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div className="site-how-circle">
                  <div class="outer">
                    <div class="inner"></div>
                  </div>
                </div>
                <Grid textAlign="center" className="site-how-title-transparent">
                  <Grid.Column mobile={16}>
                    <h1>how it works</h1>
                  </Grid.Column>
                </Grid>
                <Grid textAlign="center" className="site-how-title-text">
                  <Grid.Column textAlign="center" mobile={16}>
                    <h3>
                      {' '}
                      <span> // </span> How it works <span> // </span>
                    </h3>
                  </Grid.Column>
                </Grid>
              </div>
            </section>

            {/* Site About Start */}
            <section className="site-about-wrapper">
              <div className="site-about-container container">
                <Grid textAlign="center" className="site-about-transparent">
                  <Grid.Column mobile={16}>
                    <h1>about actiserve</h1>
                  </Grid.Column>
                </Grid>

                <Grid textAlign="center" className="site-about-header">
                  <Grid.Column textAlign="center" mobile={16}>
                    <h3>
                      {' '}
                      <span> // </span> About Urbanserve <span> // </span>
                    </h3>
                    <div className="site-about-text">
                      <p>
                        Read about our story and why we're trying to make it
                        easier for you to connect to the people you need
                      </p>
                    </div>
                  </Grid.Column>
                </Grid>

                <div className="site-about-review">
                  <Grid textAlign="center" stackable columns={3} className="">
                    <Grid.Column className="site-review-col">
                      <Segment className="site-review-seg">
                        <h4>Review</h4>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column className="site-review-col">
                      <Segment className="site-review-seg">
                        <h4>Review</h4>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column className="site-review-col">
                      <Segment className="site-review-seg">
                        <h4>Review</h4>
                      </Segment>
                    </Grid.Column>
                  </Grid>
                </div>
              </div>
            </section>
            {/* Site About End */}

            {/* Site Footer Start */}
            <section className="site-footer-wrapper">
              <div className="site-footer-container container">
                <Grid stackable columns={3} className="site-footer-content">
                  <Grid.Column className="site-footer-col-one">
                    <ul>
                      <li>Urbanserve</li>
                      <li>Find Services</li>
                      <li>About</li>
                      <li>Contact</li>
                      <li>Tradespeople</li>
                    </ul>
                  </Grid.Column>
                  <Grid.Column
                    className="site-footer-col-two vertical-space"
                    style={{display: 'flex'}}
                  >
                    <div>
                      <h3>Data Safe</h3>
                      <p>Your details are kept safe and never shared</p>
                    </div>
                    <div>
                      <h3>Gas Safe</h3>
                      <p>Our engineers are vetted and fully qualifed</p>
                    </div>
                  </Grid.Column>
                  <Grid.Column className="site-footer-col-three">
                    <div>
                      <h3>Download Now</h3>
                      <div className="site-footer-app-links">
                        <img src="/images/footer-apple-app.png" width="100%" />
                        <img src="/images/footer-gapp.png" width="100%" />
                      </div>
                    </div>
                    <div className="site-footer-payment">
                      <img src="/images/footer-payment.png" width="100%" />
                    </div>
                  </Grid.Column>
                </Grid>
                <Grid textAlign="center" className="site-footer-logo">
                  <Grid.Column mobile={16}>
                    <img src="/images/logo.png" width="100%" alt="" />
                    <p className="site-footer-text">
                      Copyright © 2010 - 2021 Urbanserve Ltd. All rights
                      reserved.
                    </p>
                  </Grid.Column>
                </Grid>
              </div>
            </section>
            {/* Site Footer End */}
          </div>
        </>
      )}

      <div>
        <Popper
          open={dropdownOpen}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal={false}
          role={undefined}
          transition
          style={{zIndex: '2'}}
        >
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper style={{width: '260px'}}>
                <ClickAwayListener onClickAway={handleDropDownClose}>
                  <MaterialCard
                    autoFocusItem={dropdownOpen}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    style={{marginTop: '0.8rem'}}
                  >
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      className={classStyles.root}
                    >
                      <ListItem
                        button
                        onClick={() => {
                          Router.push('/profile')
                          handleDropdownToggle()
                        }}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                      <ListItem button onClick={handleListOneClick}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                        {listOneOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={listOneOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classStyles.nested}
                            onClick={() => {
                              Router.push('/about')
                              handleDropdownToggle()
                            }}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="About Urbanserve" />
                          </ListItem>
                        </List>
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classStyles.nested}
                            onClick={() => {
                              Router.push('/terms')
                              handleDropdownToggle()
                            }}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Terms and Conditions" />
                          </ListItem>
                        </List>
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classStyles.nested}
                            onClick={() => {
                              Router.push('/privacy-and-cookie-policy')
                              handleDropdownToggle()
                            }}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Privacy Policy" />
                          </ListItem>
                        </List>
                      </Collapse>
                      <ListItem button>
                        <ListItemIcon>
                          <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register as partner" />
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <ShareIcon />
                        </ListItemIcon>
                        <ListItemText primary="Share" />
                      </ListItem>
                      <Divider />
                      <ListItem
                        button
                        onClick={() => {
                          Logout()
                          handleDropdownToggle()
                        }}
                      >
                        <ListItemIcon>
                          <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </MaterialCard>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

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
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              padding: '1rem 1rem',
            }}
          >
            <h3 className={classes.FilterTitle}>{drawerType}</h3>
            <IconButton
              size="small"
              disableFocusRipple
              disableRipple
              onClick={() => {
                setDrawerOpen(false)
                setDrawerType('')
                setCurrentProduct({})
              }}
              style={{marginRight: '1rem'}}
              className={classes.CloseIcon}
            >
              <img src="/images/icon-close.png" width="200%"></img>
            </IconButton>
          </div>
          <div className={classes.listPadding}>
            {isFetchingProductDetails ? (
              <Loader active inline="centered" />
            ) : (
              <SemanticList selection verticalAlign="middle">
                {product?.map((ele) => (
                  <>
                    <SemanticList.Item
                      onClick={() => {
                        history.replace(
                          `/${groupName}/product/${ele?.title
                            .toLowerCase()
                            .replace(/\s/gm, '-')}`,
                        )
                        setDrawerOpen(false)
                        setDrawerType('')
                        setCurrentProduct({})
                      }}
                    >
                      <Image
                        size="mini"
                        avatar
                        src="/images/sidebar-icon.png"
                        width="10%"
                      />
                      <SemanticList.Content>
                        <h2 className="modal-category-name">{ele.title}</h2>
                      </SemanticList.Content>
                    </SemanticList.Item>
                  </>
                ))}
              </SemanticList>
            )}
          </div>
        </div>
      </Drawer>

      {/* Mobile Nav */}
      <Drawer
        open={mobileNavOpen}
        anchor="right"
        onClose={() => {
          handleMobileNav()
        }}
        classes={{paper: classes.drawerPaper}}
      >
        "test"
      </Drawer>

      <Modal
        size="tiny"
        onClose={() => setLocationModalOpen(false)}
        onOpen={() => setLocationModalOpen(true)}
        open={locationModalOpen}
      >
        <Modal.Header>Sorry! We don't serve in your area yet.</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <p>We are expanding our presence soon.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setLocationModalOpen(false)}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => ({
  product: state.groupDetailsReducer?.product,
  isFetchingProductDetails: state.groupDetailsReducer?.isFetchingProductDetails,
})

const mapDispatchToProps = (dispatch) => {
  return {
    //Fetch list
    fetchGroupCateDetails: (data) => dispatch(getGroupCategoriesRequest(data)),
    fetchCategories: (data) => dispatch(getCategoriesRequest(data)),
    fetchProduct: (data) => dispatch(getProductRequest(data)),
    validateLocation: (data) => dispatch(validateLocationRequest(data)),
    Logout: (data) => dispatch(LogoutAction(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(Slug))
