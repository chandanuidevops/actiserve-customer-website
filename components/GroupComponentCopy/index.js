import React, {useState, useEffect} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import Router, {useRouter} from 'next/router'

import actions from '../../Stores/Auth/actions'
import {
  getGroupCategoriesRequest,
  getCategoriesRequest,
  getProductRequest,
  validateLocationRequest,
  getGroupRequest,
} from '../../Stores/GroupDetails/actions'
const LogoutAction = actions.logout
import {searchRequest} from '../../Stores/CategoryDetails/actions'

/* Next JS */
import Link from 'next/link'

/* Components */
import SiteMainNavbar from '../SiteMain/SiteMainNavbar'
import GeoLocation from '../GeoLocation'
import CategoryComponent from '../CategoryComponent'

/* Utilities */
import {getPostCodeFromLatLong} from '../../utils/latLongSearch'

/* Helper Packages */
import {useMediaQuery} from 'react-responsive'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete'

/* Semantic UI */
import {
  Grid,
  Breadcrumb,
  Modal,
  Card,
  Segment,
  Icon,
  Image,
  Loader,
  Divider,
  List as SemanticList,
  Label,
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
import * as Yup from 'yup'

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
  },
  searchDrawerPaper: {
    width: '100%',
    height: '100vh',
  },
  listPadding: {
    // padding: '1rem 0.4rem',
  },
  resize: {
    fontFamily: 'Urbanist, sans-serif !important',
    fontSize: '1.2rem',
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
  } = useSelector((state) => state?.groupDetailsReducer)

  /* Destructure props */
  const {
    isSearchingService,
    searchRequest,
    classes,
    fetchCategories,
    fetchGroupCateDetails,
    fetchProduct,
    validateLocation,
    product,
    isFetchingProductDetails,
    groupName,
    isFetchingCategories,
    fetchGroupListingDetails,
    searchResult,
  } = props

  /* API CALLS */
  useEffect(() => {
    /* Fetch groups data */
    fetchGroupListingDetails()
  }, [])

  const {
    getFieldProps,
    errors,
    setValues,
    values,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    clearFormState,
  } = useValidator({
    initialValues: {
      search_value: '',
    },
    onSubmit,
    validationSchema: Yup.object({}),
  })
  function onSubmit() {}

  const [open, setOpen] = React.useState(false)
  const [getGPS, setGetGPS] = React.useState(false)
  const [getGPSPermission, setGetGPSPermissions] = React.useState(false)
  const [positionData, setPositionData] = React.useState(false)
  const [postcodeResult, setPostcodeResult] = React.useState([])
  const [address, setAddress] = useState('')
  const [addressObj, setAddressObj] = useState()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState('')

  /*  */
  const [mbCityDrawerOpen, setMbCityDrawerOpen] = useState(false)

  /* Location popper state */
  const [locationDialog, setLocationDialog] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [placement, setPlacement] = React.useState()

  /* Location Modal State */
  const [locationModalOpen, setLocationModalOpen] = React.useState(false)

  /* Mobile Search */
  const [isMBSearchOpen, setIsMBSearchOpen] = React.useState(false)

  /* Location details fetched from user */
  const [fullAddress, setFullAddress] = React.useState('')
  const [formattedAddress, setFormattedAddress] = React.useState('')

  /* Location detaisl frm local */
  const [detectedLocation, setDetectedLocation] = React.useState(null)
  const [detectedCurrentLocation, setDetectedCurrentLocation] = React.useState(
    null,
  )

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setLocationDialog((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

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
      setFullAddress(res?.[0])
      localStorage.setItem(
        'actiserve_formatted_address',
        res?.[0]?.formatted_address,
      )
      res.map(async (ele) => {
        if (ele?.types.indexOf('locality') > -1) {
          if (ele?.formatted_address !== '') {
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
                    // setCity(city)
                    localStorage.setItem('actiserve_user_city', city)
                  }
                }
              })
            }
          }
        }
      })
      if (city) {
        localStorage.setItem('actiserve_user_location', city)
      }
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
  const [searchTerm, setSearchTerm] = useState('')
  const [autoCompleteState, setAutoCompleteState] = useState({
    postcode: '',
  })
  const {categories, isLocationValid, isValidatingLocation} = useSelector(
    (state) => state?.groupDetailsReducer,
  )

  function handleLocation() {
    if (isBrowser()) {
      let dirtyLocation = localStorage.getItem('actiserve_formatted_address')
      if (dirtyLocation && dirtyLocation === 'null') {
        setDetectedLocation(null)
      } else if (dirtyLocation && dirtyLocation !== 'null') {
        // let parsedData = JSON.parse(dirtyLocation)
        setDetectedLocation(dirtyLocation)
      }
    }
  }

  useEffect(() => {
    if (isBrowser()) {
      let dirtyLocation = localStorage.getItem('actiserve_formatted_address')
      if (dirtyLocation && dirtyLocation === 'null') {
        setDetectedLocation(null)
      } else if (dirtyLocation && dirtyLocation !== 'null') {
        // let parsedData = JSON.parse(dirtyLocation)
        setDetectedLocation(dirtyLocation)
      }
    }
  }, [])

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
    } else if (
      fullAddress?.formattedAddress &&
      isLocationValid !== 404 &&
      isLocationValid !== false
    ) {
      setDetectedCurrentLocation(fullAddress?.formattedAddress)
      localStorage.setItem(
        'actiserve_formatted_address',
        fullAddress?.formattedAddress,
      )
      handleLocation()
    } else if (
      address?.label &&
      isLocationValid !== 404 &&
      isLocationValid !== false
    ) {
      localStorage.setItem('actiserve_formatted_address', address?.label)
      setDetectedCurrentLocation(address?.label)
      handleLocation()
    }
  }, [isLocationValid, isValidatingLocation, fullAddress, address])

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
        let group = localStorage.getItem('group_title')
        if (group === null && groupName) {
          localStorage.setItem('group_title', groupName)
        }
      }
    }
  }, [isLocationValid, groupName])

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

  const [searchResultData, setSearchResultData] = useState([])

  const searchTermHandler = async () => {
    let groupdID = await localStorage.getItem('group_id')
    if (groupdID) {
      searchRequest({
        search: searchTerm,
        group_id: '93e4187e-2d8a-4aa0-84a3-73prash',
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

  const [locations, setLocations] = useState([])

  useEffect(() => {
    if (searchTerm === '' || searchTerm === undefined || searchTerm === null) {
      setSearchResultData([])
    }
    if (typeof searchTerm === 'object' && searchTerm?.type !== undefined) {
      if (searchTerm?.type === 'product') {
        history.replace(
          `/${groupName}/product/${searchTerm?.title
            .toLowerCase()
            .replace(/\s/gm, '-')}`,
        )
      } else {
        history.replace(
          `/category/${searchTerm?.title.toLowerCase().replace(/\s/gm, '-')}`,
        )
      }
    }
  }, [searchTerm])

  useEffect(() => {
    if (isSearchingService) {
      setSearchResultData(['Loading...'])
    }
    if (searchResult?.length < 0) {
      setSearchResultData([])
    } else {
      setSearchResultData(searchResult)
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

  return (
    <>
      <SiteMainNavbar />

      {/* Banner */}
      <section className="site__category__wrapper">
        <div className="site__category__image__wrapper"></div>

        <div className="site__mobile__search">
          <div
            className="site__mobile__search__content"
            onClick={() => setMbCityDrawerOpen(true)}
          >
            <img
              src="/site__main__images/site__location__dark.png"
              alt="Urbanserve Icon"
              width="100%"
            />
            <h4>{detectedLocation !== null ? detectedLocation : groupName}</h4>
          </div>

          <div className="site__mobile__search__input">
            <Button
              fluid
              className="site__card__btn"
              onClick={() => setIsMBSearchOpen(true)}
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
              <div className="site__card__header__img">
                <img
                  width="100%"
                  src="/site__main__images/icon__trust.png"
                  alt="Urbanserve Icon"
                />
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
                        {/* {isLocationValid !== false && isLocationValid !== 404
                          ? fullAddress?.formattedAddress
                          : address?.label
                          ? address?.label
                          : groupName} */}
                        {detectedLocation !== null
                          ? detectedLocation
                          : detectedCurrentLocation !== null
                          ? detectedCurrentLocation
                          : groupName}
                      </span>
                    </Button>
                    {/* </ClickAwayListener> */}
                  </Grid.Column>
                  <Grid.Column tablet={12} computer={12}>
                    {/* <Autocomplete
                                            freeSolo
                                            variant="outlined"
                                            id="free-solo-2-demo"
                                            disableClearable
                                            // options={searchResult?.map((option) => option?.title)}
                                            options={searchResultData}
                                            loading={isSearchingService}
                                            renderOption={(option) => (
                                                <span style={{ fontFamily: 'Urbanist' }}>
                                                    {option.id && `${option.title}`}
                                                </span>
                                            )}
                                            getOptionLabel={(option) =>
                                                option?.id ? `${option.title}` : searchTerm
                                            }
                                            getOptionSelected={(option, value) => value?.id === option?.id}
                                            onInputChange={(e, newValue) => {
                                                setSearchTerm(newValue)
                                            }}
                                            classes={{
                                                root: classes.rootSecondary,
                                            }}

                                            onChange={(e, newValue) => setSearchTerm(newValue)}
                                            value={searchTerm}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    classes={{ root: classes.customTextField }}
                                                    variant="outlined"
                                                    placeholder="Search for a service"
                                                    InputProps={{
                                                        ...params.InputProps, type: 'search', startAdornment: (
                                                            <img src="/site__main__images/site__search.png" alt="Urbanserve Icon" width="22px" height="22px" style={{ marginRight: '1.571rem' }} />
                                                        ),
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {isSearchingService ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        /> */}
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
                        handleChange('search_value')(
                          createFakeEvent(newValue?.id ?? ''),
                        )
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
                                  <CircularProgress color="inherit" size={20} />
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
                    <p className="site__category__search__text">
                      Home Service, Window Cleaning, Boiler Service & Repair
                      etc.
                    </p>
                  </Grid.Column>
                </Grid>
              </div>
              {isFetchingCategories ? (
                <div
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    alignContent: 'center',
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
                            history.replace(
                              `/${groupName}/product/${ele?.category_name
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
                        <div className="category__card__segment">
                          <div className="category__card__image">
                            <img
                              src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.image?.id}`}
                              alt="Urbanserve Service Icon"
                              width="42px"
                              height="42px"
                            />
                          </div>
                          <div className="category__card__text">
                            <h4>{ele?.category_name}</h4>
                          </div>
                        </div>
                      </Grid.Column>
                    ))
                  ) : (
                    <h3
                      className="drawer__error__text"
                      style={{textAlign: 'center', padding: '1rem 0rem'}}
                    >
                      We are adding services in your region soon. Please check
                      with us in near future.
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
        className="site__quality__wrapper site__category__quality__wrapper"
        style={{
          marginTop:
            categories?.length > 5 && !isTabletOrMobile ? `22rem` : `0rem`,
        }}
      >
        <div className="site__quality__container site_lg_container">
          <Grid className="site__quality__grid">
            <Grid.Column
              className="site__quality_img__col"
              computer={5}
              tablet={5}
              mobile={16}
            >
              <div className="site__quality__img">
                <img
                  src="/site__main__images/site__quality__main.png"
                  alt="Urbanserve Icon"
                  width="100%"
                ></img>
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
                        We do personal & business credit checks, to CCJs, and
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
      {/* Site How Section Ends */}

      {/* Home Services Starts */}
      <section className="site__hservices__wrapper">
        <div className="site__hservices__container site_lg_container">
          <div className="site__hservices__header">
            <h3>Home Services</h3>
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
              <div className="site__hservices__card site__hservices__card__mb">
                <div className="site__hservices__card__img">
                  <img
                    src="/site__main__images/site__home__one.png"
                    alt="Urbanserve Home Service"
                    width="100%"
                  />
                </div>
                <div className="site__hservices__card__body">
                  <h3 onClick={() => handleCardClick('Window Cleaning')}>
                    Window Cleaning
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column
              style={{
                margin: '0px !important',
                padding: '0rem 1rem !important',
              }}
            >
              <div className="site__hservices__card site__hservices__card__mb">
                <div className="site__hservices__card__img">
                  <img
                    src="/site__main__images/site__home__two.png"
                    alt="Urbanserve Home Service"
                    width="100%"
                  />
                </div>
                <div className="site__hservices__card__body">
                  <h3 onClick={() => handleCardClick('Home Cleaning')}>
                    Home Cleaning
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column
              style={{
                margin: '0px !important',
                padding: '0rem 1rem !important',
              }}
            >
              <div className="site__hservices__card">
                <div className="site__hservices__card__img">
                  <img
                    src="/site__main__images/site__home__three.png"
                    alt="Urbanserve Home Service"
                    width="100%"
                  />
                </div>
                <div className="site__hservices__card__body">
                  <h3
                    onClick={() =>
                      handleCardClick('Carpet/upholstery cleaning')
                    }
                  >
                    Carpet/upholstery cleaning
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </section>
      {/* Home Services Ends */}

      {/* Home Services Starts */}
      <section className="site__hservices__wrapper site__hservices__light__bg">
        <div className="site__hservices__container site_lg_container">
          <div className="site__hservices__header">
            <h3 onClick={() => handleCardClick('Installation & Maintainance')}>
              Installation & Maintainance
            </h3>
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
              <div className="site__hservices__card site__hservices__card__mb">
                <div className="site__hservices__card__img">
                  <img
                    src="/site__main__images/site__install__one.png"
                    alt="Urbanserve Home Service"
                    width="100%"
                  />
                </div>
                <div className="site__hservices__card__body">
                  <h3
                    className="site__hservices__custom__header"
                    onClick={() =>
                      handleCardClick(
                        'Boiler Installation, Repair & Maintenance',
                      )
                    }
                  >
                    Boiler Installation, Repair & Maintenance
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column
              style={{
                margin: '0px !important',
                padding: '0rem 1rem !important',
              }}
            >
              <div className="site__hservices__card site__hservices__card__mb">
                <div className="site__hservices__card__img">
                  <img
                    src="/site__main__images/site__install__two.png"
                    alt="Urbanserve Home Service"
                    width="100%"
                  />
                </div>
                <div className="site__hservices__card__body">
                  <h3
                    className="site__hservices__custom__header"
                    onClick={() => handleCardClick('EV Charging')}
                  >
                    EV Charging
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column
              style={{
                margin: '0px !important',
                padding: '0rem 1rem !important',
              }}
            >
              <div className="site__hservices__card">
                <div className="site__hservices__card__img">
                  <img
                    src="/site__main__images/site__install__three.png"
                    alt="Urbanserve Home Service"
                    width="100%"
                  />
                </div>
                <div className="site__hservices__card__body">
                  <h3 className="site__hservices__custom__header">
                    Carpet/upholstery cleaning
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </section>
      {/* Home Services Ends */}

      {/* Works Section Starts */}
      <section className="site__works__wrapper">
        <div className="site__works__container site_lg_container">
          <div className="site__works__header">
            <h3>How it Works</h3>
          </div>

          <div className="site__works__content">
            <Grid
              className="site__works__grid"
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
                <div className="site__works__card site__works__card__mb">
                  <div className="site__works__card__img">
                    <img
                      src="/site__main__images/site__why__one.png"
                      alt="Urbanserve Icon"
                      width="100%"
                    />
                  </div>
                  <div className="site__works__card__body">
                    <h4>Local services at your fingertips</h4>
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column
                style={{
                  margin: '0px !important',
                  padding: '0rem 1rem !important',
                }}
              >
                <div className="site__works__card site__works__card__mb">
                  <div className="site__works__card__img">
                    <img
                      src="/site__main__images/site__why__two.png"
                      alt="Urbanserve Icon"
                      width="100%"
                    />
                  </div>
                  <div className="site__works__card__body">
                    <h4>Fixed transparent pricing</h4>
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column
                style={{
                  margin: '0px !important',
                  padding: '0rem 1rem !important',
                }}
              >
                <div className="site__works__card">
                  <div className="site__works__card__img">
                    <img
                      src="/site__main__images/site__why__three.png"
                      alt="Urbanserve Icon"
                      width="100%"
                    />
                  </div>
                  <div className="site__works__card__body">
                    <h4>Book and Manage using our App</h4>
                  </div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </section>
      {/* Works Section Ends */}

      {/* Site Join Starts */}
      <section className="site__join__wrapper">
        <div className="site__join__container site_lg_container">
          <div className="site__join__main">
            <div className="site__join__content">
              <div className="site__join__img__mb">
                <img src="/site__main__images/join__mb__img.png" width="100%" />
              </div>
              <img
                className="site__join__img__lg"
                src="/site__main__images/site__join.png"
                width="100%"
              />
              {/* <div className="site__join__img">
                <img src="/site__main__images/site__join.png" alt="Urbanserve Image" width="100%" />
            </div> */}
              <div className="site__join__info">
                <h3>Want to serve with UrbanServe?</h3>
                <Button className="site__join__btn">Find out more</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Site Join Ends */}

      {/* Site Button Starts */}
      <section className="site__btn__wrapper">
        <div className="site__btn__container site_lg_container">
          <div className="site__btn__content">
            <div className="site__btn__play">
              <img
                src="/site__main__images/icon__playstore.png"
                width="100%"
                alt="Urbanserve Playapp"
              />

              <div className="site__btn__play__content">
                <p className="site__btn__header">Download on the</p>
                <p className="site__btn__info">App Store</p>
              </div>
              <div className="site__btn__play__helper"></div>
            </div>
          </div>

          <div className="site__apple">
            <div className="site__btn__apple__content">
              <div className="site__btn__apple">
                <img
                  src="/site__main__images/icon__apple.png"
                  width="100%"
                  alt="Urbanserve Playapp"
                />
                <div className="site__btn__apple__content">
                  <p className="site__btn__apple__header">Get it on</p>
                  <p className="site__btn__apple__info">Google play</p>
                </div>
                <div className="site__btn__apple__helper"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Site Button Ends */}

      {/* Site Footer Start */}
      <section className="site__footer__wrapper">
        <div className="site__footer__container container">
          <Grid stackable columns={3} className="site__footer__content">
            <Grid.Column className="site__footer__col__one">
              <ul>
                <li>Urbanserve</li>
                <li>Find Services</li>
                <li>About</li>
                <li>Contact</li>
                <li>Tradespeople</li>
              </ul>
            </Grid.Column>
            <Grid.Column
              className="site__footer__col__two vertical-space"
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
            <Grid.Column className="site__footer__col__three">
              <div>
                <h3>Download Now</h3>
                <div className="site__footer__app__links">
                  <img src="/images/footer-apple-app.png" width="100%" />
                  <img src="/images/footer-gapp.png" width="100%" />
                </div>
              </div>
              <div className="site__footer__payment">
                <img src="/images/footer-payment.png" width="100%" />
              </div>
            </Grid.Column>
          </Grid>
          <Grid
            textAlign="center"
            className="site__footer__logo"
            style={{padding: '0rem'}}
          >
            <Grid.Column mobile={16}>
              <img
                src="/site__main__images/logo__light.png"
                width="100%"
                alt=""
              />
              <p className="site__footer__text">
                Copyright © 2010 - 2021 UrbanServe Ltd. All rights reserved.
              </p>
            </Grid.Column>
          </Grid>
        </div>
      </section>
      {/* Site Footer End */}

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
                              src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.product_image}`}
                              alt="Urbanserve Service Icon"
                              width="100%"
                              className="drawer__item__img"
                            />
                          ) : (
                            <img
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
          <Fade {...TransitionProps} timeout={350}>
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
                        maxWidth: detectedLocation !== null ? '60%' : '100%',
                      }}
                    >
                      {detectedLocation !== null
                        ? detectedLocation
                        : `Current Location`}
                    </p>
                  </div>
                  <div
                    style={{
                      cursor: 'pointer',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    {/* <p style={{ marginLeft: 10, fontFamily: 'Urbanist', fontWeight: 'bold', color: '#3698FF' }}>{`Detect using GPS!`}</p> */}
                    <GeoLocation onClick={() => handleLocation()} />
                  </div>
                </div>

                <div className="site__popper__input">
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
                        // setPlaceHolder('')
                      },
                      styles: {
                        option: (provided) => ({
                          color: '#2F4858',
                          fontFamily: 'Urbanist, sans-serif',
                          padding: '0.5rem',
                          cursor: 'pointer',
                        }),
                      },
                    }}
                    autocompletionRequest={{
                      componentRestrictions: {
                        country: ['uk'],
                      },
                    }}
                  />
                </div>
              </Paper>
            </ClickAwayListener>
          </Fade>
        )}
      </Popper>

      {/* Invalid Location Modal */}
      <Modal
        size="tiny"
        onOpen={() => setLocationModalOpen(true)}
        open={!mbCityDrawerOpen && locationModalOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Content image>
          <Modal.Description>
            <p style={{fontFamily: 'Urbanist, sans-serif', fontSize: '1rem'}}>
              We are not covering this area but we do aim to cover it soon
            </p>
            <p style={{fontFamily: 'Urbanist, sans-serif', fontSize: '1rem'}}>
              Please check with us in near future.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            color="black"
            onClick={() => setLocationModalOpen(false)}
          >
            Ok
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Mobile Location Modal */}
      <Drawer
        open={mbCityDrawerOpen}
        anchor="bottom"
        // onClose={() => {
        //   setMbCityDrawerOpen(false)
        //   setDrawerType('')
        // }}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        classes={{paper: classes.locationDrawerPaper}}
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
              <img src="/site__main__images/icon__close.png" width="20%"></img>
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
            >
              <LocationSearchingIcon style={{color: '#3698ff'}} />
              <GeoLocation
                onClick={() => {
                  handleLocation()
                  setMbCityDrawerOpen(false)
                }}
              />
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

      {/* Mobile Location Modal */}
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
                searchResultData?.map((ele) => (
                  <div
                    className="mb__service__content"
                    onClick={() => {
                      handleChange('search_value')(
                        createFakeEvent(ele?.id ?? ''),
                      )
                      setSearchTerm(ele)
                    }}
                  >
                    <h3
                      onClick={() => {
                        handleChange('search_value')(
                          createFakeEvent(ele?.id ?? ''),
                        )
                        setSearchTerm(ele)
                      }}
                      className="mb__service__title"
                    >
                      {ele?.title}
                    </h3>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Drawer>
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
    fetchGroupCateDetails: (data) => dispatch(getGroupCategoriesRequest(data)),
    fetchCategories: (data) => dispatch(getCategoriesRequest(data)),
    fetchProduct: (data) => dispatch(getProductRequest(data)),
    validateLocation: (data) => dispatch(validateLocationRequest(data)),
    Logout: (data) => dispatch(LogoutAction(data)),
    fetchGroupListingDetails: (data) => dispatch(getGroupRequest(data)),
    searchRequest: (data) => dispatch(searchRequest(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(Slug))
