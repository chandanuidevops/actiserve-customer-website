import React, {useEffect, useState} from 'react'
import {TextField, Box, makeStyles, FormHelperText} from '@material-ui/core'
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete'

const useStyles = makeStyles((theme) => ({
  checkIconText: {
    fontFamily: 'Ubuntu',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '16px',
    color: '#000000',
  },
  container: {
    position: 'relative',
    width: '100%',
  },
  results: {
    position: 'absolute',
    background: 'white',
    borderRadius: '3px',
    top: '40px',
    zIndex: '100',
    width: '100%',
    padding: '2px 10px',
    border: '1px solid grey',
  },
  title: {
    fontFamily: 'Ubuntu',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#000000',
    cursor: 'pointer',
  },
}))

const GoogleInput = ({
  componentValue,
  parentValues,
  setParentValues,
  error,
  ...rest
}) => {
  const classes = useStyles()
  const [showSuggestions, setShowSuggestions] = useState(false)

  /* Google Input */
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
    setShowSuggestions(true)
    setValue(e.target.value)
  }

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      postal_town: ['postal_town'],
      street: ['street_address', 'route', 'premise'],
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
    if (address.country === 'UK') {
      address.state = address.province
      delete address.province
    }
    return address
  }

  const setAddressData = (data) => {
    setParentValues({
      ...parentValues,
      address: (data.address + ',' + data.county + ', ' + data.country).trim(),

      postcode: data.postal_code,
      city: data.postal_town,
    })
  }
  /* Google Input */
  const handleSelect = ({description}) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()
    // Get latitude and longitude via utility functions
    getGeocode({address: description})
      .then((results) => {
        setAddressData(getAddressObject(results?.[0]?.address_components))
      })
      .catch((error) => {})
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: {main_text, secondary_text},
      } = suggestion

      return (
        <p
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={classes.title}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </p>
      )
    })

  useEffect(() => {
    if (componentValue) {
      setValue(componentValue)
      setShowSuggestions(false)
    }
  }, [componentValue])

  return (
    <Box className={classes.container}>
      <TextField
        variant="standard"
        size="small"
        fullWidth
        name="address"
        label="Address*"
        type="text"
        multiline={true}
        value={value}
        onChange={(e) => handleInput(e)}
        disabled={!ready}
        style={{width: '100%', marginBottom: '0.8rem'}}
        {...rest}
      />
      {error ? (
        <FormHelperText error={error} id="address_1-text">
          Address is required!
        </FormHelperText>
      ) : (
        ''
      )}
      {status === 'OK' && showSuggestions && (
        <Box className={classes.results}>{renderSuggestions()}</Box>
      )}
    </Box>
  )
}

export default GoogleInput
