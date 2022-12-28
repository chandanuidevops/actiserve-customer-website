import React, {useState, useEffect} from 'react'
import {getPostCodeFromLatLong} from './latLongSearch'
import {useSelector, useDispatch} from 'react-redux'
import Router from 'next/router'
import {resetValidateLocation} from '../Stores/GroupDetails/actions'
function useNavigator() {
  const dispatch = useDispatch({resetValidateLocation})

  const {
    isLocationValid,
    isValidatingLocation,
    isUrlLocationValid,
    isValidatingUrlLocation,
  } = useSelector((state) => state?.groupDetailsReducer)

  const [getGeoLocation, setGeoLocation] = useState(false)

  const [isNavigatorSupported, setIsNavigatorSupported] = useState(false)

  const [isGeoAllowed, setIsGeoAllowed] = useState({permission: null, type: ''})

  // Modal
  const [isErrModal, setIsErrModal] = useState(null)
  const [isSuccessModal, setSuccessModal] = useState(null)

  const [formattedAddress, setFormattedAddress] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)

  /* Step 1 */
  useEffect(() => {
    // dispatch(resetValidateLocation())
    resetGeoState()
  }, [])

  /* Step 1 */
  useEffect(() => {
    if (getGeoLocation) {
      checkNavigator()
    }
  }, [getGeoLocation])

  // Step 1:1
  // Check if browser supports navigator
  const checkNavigator = () => {
    console.log(
      'nav::',
      navigator,
      navigator?.getGeoLocation,
      navigator?.permissions,
    )
    if (
      navigator &&
      navigator.geolocation !== undefined &&
      navigator.permissions !== undefined
    ) {
      setIsNavigatorSupported(true)
    } else {
      setIsNavigatorSupported(false)
      setIsErrModal(true)
    }
  }

  console.log('supported::', isErrModal)

  // Step 2:Checking permission
  useEffect(() => {
    if (isNavigatorSupported) {
      checkPermission()
    }
  }, [isNavigatorSupported])

  // Step 2:1 Checking permission
  const checkPermission = () => {
    navigator.permissions.query({name: 'geolocation'}).then((data) => {
      let status = data?.state
      if (status === 'granted') {
        setIsGeoAllowed({permission: true, type: 'granted'})
        getUserLatLong()
      } else if (status === 'denied') {
        setIsGeoAllowed({permission: false, type: 'denied'})
      } else {
        setIsGeoAllowed({permission: false, type: 'notsupported'})
      }
    })
  }

  // Step 3: Error Modal
  useEffect(() => {
    if (isGeoAllowed?.permission === false) {
      setIsErrModal(true)
    }
  }, [isGeoAllowed])

  // Step 4
  const getUserLatLong = () => {
    navigator.geolocation.getCurrentPosition((response) => {
      if (
        response &&
        response?.coords?.latitude &&
        response?.coords?.longitude
      ) {
        // setSuccessModal(true)
        let positionObj = {
          latitude: response?.coords?.latitude,
          longitude: response?.coords?.longitude,
        }
        getAddress(positionObj)
      }
    })
  }

  const getAddress = async (data) => {
    let res = await getPostCodeFromLatLong(data)
    let address = res[0]
    let result = getAddressObject(address?.address_components)
    if (result) {
      setAddress(result)
      setSuccessModal(true)
    }

    // Set Formatted Address
    if (address?.formatted_address) {
      setFormattedAddress(address?.formatted_address)
    }
    // Get City
    res.map(async (ele) => {
      if (ele?.types.indexOf('locality') > -1) {
        if (ele?.formatted_address !== '') {
          if (ele?.address_components.length > 0) {
            ele?.address_components.map(async (item) => {
              if (item?.types.indexOf('locality') > -1) {
                let city = await item?.long_name
                if (city) {
                  setCity(city)
                }
              }
            })
          }
        }
      }
    })
  }

  const resetGeoState = () => {
    // dispatch(resetValidateLocation())
    setIsGeoAllowed({permission: null, type: ''})
    setGeoLocation(false)
    setIsNavigatorSupported(false)
    setIsErrModal(false)
    setSuccessModal(null)
    setAddress('')
    setCity('')

    // Detected location is validated
    // If location is present, redirect is triggered
    if (isUrlLocationValid?.length > 0 && formattedAddress && city) {
      localStorage.setItem('urbanserve_user_address', formattedAddress)
      localStorage.setItem(
        'urbanserve_user_address_obj',
        JSON.stringify(address),
      )
      localStorage.setItem('urbanserve_user_location', city?.toLowerCase())
      localStorage.setItem('urbanserve_user_last_location', city?.toLowerCase())
      Router.push(`${city?.toLowerCase()}`)
    }
  }

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
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

    address_components?.forEach((component) => {
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
    if (address.country === 'US') {
      address.state = address.province
      delete address.province
    }
    return address
  }

  const icon = (
    <img
      src="/site__main__images/icon__search.png"
      alt="Search Icon"
      width="24px"
      height="24px"
      onClick={() => setGeoLocation(true)}
    />
  )

  const detectUsingGPS = (
    <div
      style={{display: 'flex', alignItems: 'center'}}
      onClick={() => {
        setGeoLocation(true)
        // dispatch(resetValidateLocation())
      }}
    >
      <img
        src="/site__main__images/icon__search.png"
        alt="Search Icon"
        width="24px"
        height="24px"
      />
      <p>Detect Using GPS</p>
    </div>
  )
  return [
    icon,
    isErrModal,
    () => setIsErrModal(false),
    () => resetGeoState(),
    isSuccessModal,
    () => setSuccessModal(false),
    address,
    city,
    formattedAddress,
    detectUsingGPS,
  ]
}

export default useNavigator
