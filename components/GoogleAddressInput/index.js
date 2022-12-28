import React, {useEffect} from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

const SearchLocationInput = () => {
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
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

  const handleSelect = ({description}) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({address: description})
      .then((results) => console.log('results', results))
      // .then(({ lat, lng }) => {
      //   console.log("📍 Coordinates: ", { lat, lng });
      // })
      .catch((error) => {
        console.log('😱 Error: ', error)
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
          style={{color: 'green', display: 'block'}}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  //   useEffect(() => {
  //     setValue('Test')
  //   }, [])

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  )
}

export default SearchLocationInput
