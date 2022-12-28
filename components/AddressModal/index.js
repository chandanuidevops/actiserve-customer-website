import React, {useEffect, useState} from 'react'
import useValidator from '../../utils/useValidator'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete'
import * as Yup from 'yup'
import {Button, Form, Input, Modal, Loader} from 'semantic-ui-react'
import {
  Box,
  FormControl as FormControlDefault,
  makeStyles,
  withStyles,
  TextField,
  FormHelperText,
  Chip,
  CardContent,
  Typography,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

/* Redux */
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'
import {
  addCustomerAddress,
  editCustomerAddress,
} from '../../Stores/CustomerFlow/actions'
import {getAddressObject, displayAddresses} from '../../utils/helper'
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete'
import {InputAdornment, Paper, IconButton} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

function AddressModal({
  userInfo,
  handleModalClose,
  open,
  addressModal,
  defaultAddress,
  setAddressModal,
  currentAddress,
  isAddOpen,
  isEditOpen,
  setDefaultAddress,
  addAddress,
  editAddress,
  setParentValue,
  addressObjModal,
  isAddingAddress,
  isEditingAddress,
  closeAddModal,
  closeEditModal,
  isAddingSuccess,
  isEditingSuccess,
  isSubmitting,
  isSubmittedSuccess,
}) {
  const [req, setreq] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

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

  function onSubmit() {
    setreq(true)
    // Edit Payload
    let data = {
      address_1: values?.address_1,
      address_2: values?.address_2,
      address_3: values?.address_3,
      address_4: values?.address_4,
      address_5: null,
      city: values?.city,
      postcode: values?.postcode,
      customer_id: userInfo?.id,
      is_default: currentAddress?.is_default,
      id: currentAddress?.id,
    }
    // Add Payload
    let addData = {
      address_1: values?.address_1,
      address_2: values?.address_2,
      address_3: values?.address_3,
      address_4: values?.address_4,
      address_5: null,
      city: values?.city,
      postcode: values?.postcode,
      customer_id: userInfo?.id,
      is_default: currentAddress?.is_default
        ? currentAddress?.is_default
        : false,
      id: currentAddress?.id,
    }
    if (isAddOpen === true) {
      addAddress({data: addData})
    } else {
      editAddress(data)
    }
  }

  // Customer Address Modal Validtor
  const {
    handleSubmit,
    values,
    setValues,
    errors,
    getFieldProps,
    handleBlur,
    touched,
    clearFormState,
  } = useValidator({
    initialValues: {
      houseno: '',
      address_1: '',
      address_2: '',
      address_3: '',
      address_4: '',
      address_5: '',
      city: '',
      postcode: '',
      customer_id: userInfo?.id,
      is_default: false,
    },
    onSubmit,
    validationSchema: Yup.object({
      address_1: Yup.string().required('House number is Required!'),
      city: Yup.string().required('House number is Required!'),
      postcode: Yup.string().required('House number is Required!'),
    }),
  })

  useEffect(() => {
    if (currentAddress !== [] && currentAddress !== {} && isEditOpen === true) {
      setValues({
        houseno: currentAddress?.houseno,
        address_1: currentAddress?.address_1,
        address_2: currentAddress?.address_2,
        address_3: currentAddress?.address_3,
        address_4: currentAddress?.address_4,
        city: currentAddress?.city,
        postcode: currentAddress?.postcode,
        customer_id: userInfo?.id,
        is_default: false,
      })
      setDefaultAddress(currentAddress?.address_1)
      let string = displayAddresses(currentAddress)
      if (string) {
        setValue(string)
      }
    } else {
      setValues({
        houseno: '',
        address_1: '',
        address_2: '',
        address_3: '',
        address_4: '',
        city: '',
        postcode: '',
        customer_id: userInfo?.id,
        is_default: false,
      })
    }
  }, [currentAddress, isEditOpen])

  useEffect(() => {
    if (!isAddOpen && !isEditOpen) {
      setAddressModal('')
      clearFormState()
      setDefaultAddress()
      setIsIconVisible(false)
      clearSuggestions()
      setValue('')
    }

    if (isAddOpen && addressModal) {
      setValues({
        ...values,
        // address_1: addressModal?.label
      })
    }
  }, [isEditOpen, isAddOpen])

  // useEffect(() => {
  //   if (isAddingSuccess || isEditingSuccess) {
  //     closeAddModal(false);
  //     closeEditModal(false);
  //   }
  // }, [isAddingSuccess, isEditingSuccess])

  const [isIconVisible, setIsIconVisible] = useState(false)

  useEffect(() => {
    if (!isSubmitting && isSubmittedSuccess && req) {
      setreq(false)
      closeEditModal(false)
      closeAddModal(false)
    }
    if (!isSubmitting && !isSubmittedSuccess && req) {
      setreq(false)
    }
  }, [isSubmitting, isSubmittedSuccess])

  /* Google Input */

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
    setValues({
      ...values,
      address_1: e.target.value,
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

  /* Set Address Value  */
  const setAddressData = (address, description) => {
    if (address) {
      setValues({
        ...values,
        address_1: address?.address,
        city: address?.postal_town,
        postcode: address?.postal_code,
        address_4: address?.province,
      })
    }
  }

  /* Clear Address Value  */
  const clearAddressInput = () => {
    setValue('')
    setValues({
      ...values,
      address_1: '',
      city: '',
      postcode: '',
      address_4: '',
    })
  }

  const handleSelect = ({description}) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()
    // Get latitude and longitude via utility functions
    getGeocode({address: description})
      .then((results) => {
        setAddressData(
          getAddressObject(results?.[0]?.address_components),
          description,
        )
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }
  /* Google Input */

  return (
    <>
      <Modal
        onClose={handleModalClose}
        open={isAddOpen || isEditOpen}
        size="tiny"
      >
        <Modal.Header>Customer Address</Modal.Header>
        <Modal.Content image>
          {isSubmitting ? (
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <CircularProgress style={{color: 'black'}} />
            </div>
          ) : (
            <>
              <Modal.Description>
                <>
                  <div className="fieldMb">
                    <TextField
                      id="standard-basic"
                      value={value}
                      onChange={handleInput}
                      disabled={!ready}
                      label="Address Line One"
                      style={{width: '100%'}}
                      InputProps={{
                        endAdornment: value && (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => clearAddressInput()}
                            >
                              {<ClearIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {status === 'OK' && (
                      <div className="">
                        <ul>{renderSuggestions()}</ul>
                      </div>
                    )}
                    {touched.address_1 && errors.address_1 ? (
                      <FormHelperText error={!!errors.address_1}>
                        Address Line: One is Required
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="fieldMb">
                    <TextField
                      id="standard-basic"
                      error={!!(touched.address_2 && errors.address_2)}
                      touched={!!(touched.address_2 && errors.address_2)}
                      {...getFieldProps('address_2')}
                      label="Address Line: Two"
                      style={{width: '100%'}}
                    />
                  </div>
                  <div className="fieldMb">
                    <TextField
                      id="standard-basic"
                      error={!!(touched.address_2 && errors.address_2)}
                      touched={!!(touched.address_2 && errors.address_2)}
                      {...getFieldProps('address_2')}
                      style={{width: '100%'}}
                      label="Address Line: Three"
                    />
                  </div>
                  <div className="fieldMb">
                    <TextField
                      id="standard-basic"
                      error={!!(touched.postcode && errors.postcode)}
                      touched={!!(touched.postcode && errors.postcode)}
                      style={{width: '100%'}}
                      {...getFieldProps('postcode')}
                      label="Postcode"
                    />
                    {touched.postcode && errors.postcode ? (
                      <FormHelperText error={!!errors.postcode}>
                        Postcode is Required
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="fieldMb">
                    <TextField
                      id="standard-basic"
                      error={!!(touched.city && errors.city)}
                      touched={!!(touched.city && errors.city)}
                      style={{width: '100%'}}
                      {...getFieldProps('city')}
                      label="City"
                    />
                    {touched.city && errors.city ? (
                      <FormHelperText error={!!errors.city}>
                        City is Required
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="fieldMb">
                    <TextField
                      id="standard-basic"
                      error={!!(touched.address_4 && errors.address_4)}
                      touched={!!(touched.address_4 && errors.address_4)}
                      style={{width: '100%'}}
                      {...getFieldProps('address_4')}
                      label="County"
                    />
                  </div>
                </>
              </Modal.Description>
            </>
          )}
        </Modal.Content>
        <Modal.Actions>
          <form onSubmit={handleSubmit}>
            <Button className="exit_cancel_btn" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="submit" className="exit_logout_btn">
              Submit
            </Button>
          </form>
        </Modal.Actions>
      </Modal>
    </>
  )
}
const mapStateToProps = (state) => ({
  isAddingAddress: state.CustomerFlowReducer?.isAddingAddress,
  isEditingAddress: state.CustomerFlowReducer?.isEditingAddress,
  isAddingSuccess: state.CustomerFlowReducer?.isAddingSuccess,
  isEditingSuccess: state.CustomerFlowReducer?.isEditingSuccess,
  isSubmitting: state.CustomerFlowReducer?.isSubmitting,
  isSubmittedSuccess: state.CustomerFlowReducer?.isSubmittedSuccess,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addAddress: (data) => dispatch(addCustomerAddress(data)),
    editAddress: (data) => dispatch(editCustomerAddress(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(AddressModal)
