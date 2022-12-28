import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import Geolocation from 'react-geolocation'
import {Button, Header, Image, Modal} from 'semantic-ui-react'
import {
  validateLocationRequest,
  resetValidateLocation,
} from '../../Stores/GroupDetails/actions'
import {getPostCodeFromLatLong} from '../../utils/latLongSearch'
import Geocode from 'react-geocode'

import Dialog from '@material-ui/core/Dialog'
import {DialogContent, DialogActions} from '@material-ui/core'
import Router from 'next/router'
Geocode.setApiKey('AIzaSyCKuzNoW9BtUlVXhzy56YreXRT71ov4RL8')

// set response language. Defaults to english.
Geocode.setLanguage('en')

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('uk')
function userGeoLocation({validateLocation, resetValidateLocation}) {
  const [open, setOpen] = React.useState(false)
  const [getGPS, setGetGPS] = React.useState(false)
  const [getGPSPermission, setGetGPSPermissions] = React.useState(false)
  const [positionData, setPositionData] = React.useState(false)
  const [postcodeResult, setPostcodeResult] = React.useState([])
  const [fullAddress, setFullAddress] = React.useState('')
  const [formattedAddress, setFormattedAddress] = React.useState(null)
  const [loader, setLoader] = useState(true)
  const [browserInvalid, setBrowserInvalid] = React.useState(false)
  /* Invalid lcoation modal state */
  const [locationErrModal, setLocationErrModal] = React.useState(false)

  const {categories, isLocationValid, isValidatingLocation} = useSelector(
    (state) => state?.groupDetailsReducer,
  )

  const [userAddressFromGps, setUserAddressFromGps] = useState(null)

  useEffect(() => {
    if (getGPS === true) {
      navigator.geolocation.getCurrentPosition(
        (i) => {
          setGetGPSPermissions('granted')
          setBrowserInvalid(false)
          setGetGPS(false)
        },
        (i) => {
          setGetGPSPermissions('denied')
          handleTimeout()
          setGetGPS(false)
          if (i?.code === 2) {
            setBrowserInvalid(true)
          } else {
            setBrowserInvalid(false)
          }
        },
      )
    }
  }, [getGPS])

  const getPostcode = async () => {
    let res = await getPostCodeFromLatLong(positionData)
    if (res) {
      let city = ''
      console.log('res?.[0]', res?.[0])
      setFormattedAddress(res?.[0])
      res.map(async (ele) => {
        if (ele?.types.indexOf('locality') > -1) {
          if (ele?.formatted_address !== '') {
            setFullAddress(ele?.formatted_address)
            if (ele?.address_components.length > 0) {
              ele?.address_components.map(async (item) => {
                if (item?.types.indexOf('locality') > -1) {
                  city = await item?.long_name
                  if (city) {
                    handleCity(city)
                    // validateLocation(city?.toLowerCase())
                  }
                  // if (city && isLocationValid !== 404 && isLocationValid !== false) {
                  //   localStorage.setItem("actiserve_user_city", city?.toLowerCase())
                  // }
                }
              })
            }
          }
        }
      })
      setPostcodeResult(res)
    } else {
      setPostcodeResult([])
    }
  }

  const [currentCity, setCurrentCity] = useState(null)

  function handleCity(city) {
    if (city) {
      setCurrentCity(city?.toLowerCase())
      validateLocation(city?.toLowerCase())
    }
  }

  useEffect(() => {
    resetValidateLocation()
  }, [])

  useEffect(() => {
    setAddress()
  }, [isValidatingLocation])

  function setAddress() {
    if (
      formattedAddress?.formatted_address &&
      isLocationValid !== 404 &&
      isLocationValid !== [] &&
      isLocationValid !== false
    ) {
      localStorage.setItem(
        'actiserve_formatted_address',
        formattedAddress?.formatted_address,
      )
      localStorage.setItem('urbanserve__location__validated', 1)
    }
  }

  useEffect(() => {
    if (
      positionData?.latitude &&
      positionData?.longitude &&
      getGPS === true &&
      getGPSPermission === 'granted'
    ) {
      getPostcode()
    }
  }, [positionData, getGPS, getGPSPermission])

  useEffect(() => {
    if (getGPSPermission === 'denied' && getGPS === true) {
      setOpen(true)
    } else if (getGPSPermission === 'denied' && getGPS === true) {
      setOpen(true)
    } else if (
      getGPSPermission === 'granted' &&
      getGPS === true &&
      formattedAddress !== null
    ) {
      setOpen(true)
    }
  }, [getGPSPermission, getGPS])

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: [
        'street_number',
        'establishment',
        'point_of_interest',
        'transit_station',
      ],
      postal_code: ['postal_code'],
      postal_town: ['postal_town'],
      street: ['street_address', 'route'],
      county: ['administrative_area_level_2'],
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

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
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
    return address
  }

  useEffect(() => {
    if (formattedAddress?.address_components) {
      let data = getAddressObject(formattedAddress?.address_components)
      setUserAddressFromGps(JSON.stringify(data))
    }
  }, [formattedAddress])

  console.log('formattedAddress::', formattedAddress)

  useEffect(() => {
    if (getGPS === true) {
      Geocode.fromLatLng(positionData?.latitude, positionData?.longitude).then(
        (response) => {
          const address = response.results?.[0]
          if (address !== null) {
            let data = {
              value: address,
              label: address?.formatted_address,
            }

            if (data !== null) {
              let formattedLocation = JSON.stringify(data)
              if (data) {
                // localStorage.setItem(
                //   'actiserve_user_detect_location',
                //   formattedLocation,
                // )
              }
            }
          }
        },
        (error) => {
          console.error(error)
        },
      )
    }
  }, [getGPS])

  function handleTimeout() {
    setTimeout(() => setLoader(false), 1000)
    // return () => {
    //   clearTimeout(timer1)
    // }
  }

  useEffect(() => {
    if (isLocationValid === 404 || isLocationValid === true) {
      setLocationErrModal(true)
    }
  }, [isLocationValid])

  console.log(
    'isLocationValid::locationErrModal',
    locationErrModal,
    isLocationValid,
  )
  useEffect(() => {
    if (
      currentCity &&
      isLocationValid !== 404 &&
      isLocationValid !== false &&
      !isValidatingLocation
    ) {
      localStorage.setItem('actiserve_user_city', currentCity?.toLowerCase())
      Router.push(`/${currentCity}`)
      localStorage.setItem(
        'actiserve_formatted_address',
        formattedAddress?.formatted_address,
      )
      localStorage.setItem('actiserve_address_user_obj', userAddressFromGps)
    } else {
      // localStorage.setItem('actiserve_formatted_address', null)
    }
  }, [isLocationValid, currentCity])

  return (
    <div>
      <Geolocation
        render={({getCurrentPosition, fetchingPosition, position}) => {
          // if (position) {
          //   setPositionData({
          //     latitude: position?.coords?.latitude,
          //     longitude: position?.coords?.longitude,
          //   })
          // }
          return (
            <div
              style={{cursor: 'pointer'}}
              disabled={position == undefined}
              onClick={() => {
                setTimeout(() => {
                  setGetGPS(true)
                }, 250)
                setOpen(true)
                resetValidateLocation()
              }}
            >
              <p
                onClick={() => {
                  getCurrentPosition()
                  setLoader(true)
                }}
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'Urbanist,sans-serif',
                  fontSize: '16px',
                  lineHeight: '21px',
                  color: '#21262b',
                  marginLeft: '10px',
                }}
              >
                Detect Using GPS
              </p>
            </div>
          )
        }}
        onSuccess={(e) => {
          // setPositionData({
          //   latitude: e?.coords?.latitude,
          //   longitude: e?.coords?.longitude,
          // })
          setPositionData({
            latitude: 52.636878,
            longitude: -1.139759,
          })
          handleTimeout()
        }}
        onerror={(e) => {
          handleTimeout()
        }}
      />
      <Dialog
        maxWidth="sm"
        fullWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        // disableEscapeKeyDown={true}
        style={{zIndex: '1000'}}
      >
        <DialogContent>
          <p className="location__success">
            {getGPSPermission === 'granted' && !loader
              ? `Location shared successfully`
              : getGPSPermission === 'denied' && !loader
              ? `Location permission is denied. Please enable location to continue.`
              : browserInvalid && !loader && getGPSPermission === 'denied'
              ? `Your browser does not support GPS!`
              : ''}
          </p>
          {loader && (
            <div style={{margin: '4rem 0rem'}}>
              <div class="ui active inverted dimmer">
                <div class="ui text loader">Fetching location!</div>
              </div>
            </div>
          )}
          {!loader && formattedAddress !== null && (
            <p className="location__holder">
              Your Location is:{' '}
              <span className="location__text">
                {formattedAddress?.formatted_address}
              </span>
            </p>
          )}
        </DialogContent>
        {!loader ? (
          <DialogActions>
            <Button
              className="location__btn"
              onClick={() => {
                setOpen(false)
              }}
            >
              Okay
            </Button>
          </DialogActions>
        ) : (
          ''
        )}
      </Dialog>

      <Modal
        size="mini"
        onOpen={() => setLocationErrModal(true)}
        open={locationErrModal}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        style={{zIndex: '20000'}}
      >
        <Modal.Content>
          <Modal.Description>
            <p className="location__success">
              We are not covering this area but we do aim to cover it soon
            </p>
            <p
              className="location__holder"
              style={{fontFamily: 'Urbanist, sans-serif', fontSize: '1rem'}}
            >
              Please check with us in near future.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="location__btn"
            onClick={() => {
              setLocationErrModal(false)
              resetValidateLocation()
            }}
          >
            Okay
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
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
    resetValidateLocation: (data) => dispatch(resetValidateLocation(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(userGeoLocation)
