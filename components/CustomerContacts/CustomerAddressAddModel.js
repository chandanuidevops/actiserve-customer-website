import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogContent,
  makeStyles,
  Button,
  DialogTitle,
  Dialog,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  FormHelperText,
  Drawer,
  TableCell,
  InputAdornment,
  TableRow,
  CircularProgress,
  Input,
  FormControlLabel,
  DialogActions,
  Card,
  IconButton,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect, useSelector } from 'react-redux';
import {
  submitCustomerAddressAdd,
  closeCustomerAddressAddModel,
  closeCustomerAddressEditModel,
  submitCustomerAddressEdit,
} from '../../Stores/Customers/actions';
import { errorAlert, successAlert } from '../../Stores/Alerts/actions';
import useValidator from '../../utils/useValidator';
import * as Yup from 'yup';
import CancelModal from '../CancelModal';
import { Autocomplete } from '@material-ui/lab';
// import { getLocation } from '../../geoLocation';
import { IOSSwitch } from '../Switch';
import { VisibilityOff, Visibility, Close } from '@material-ui/icons';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId
} from "react-google-places-autocomplete";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  cardContent: {
    width: '100%',
  },
  inputSpacing: {
    width: '100%',
    marginTop: '0.5rem',
    '&:first-child': { marginTop: '0px' },
  },
  ml: { marginLeft: '0.5rem' },

  textCapitalize: {
    textTransform: 'capitalize',
  },
  optionDetail: {
    fontSize: '0.75rem',
    color: 'gray',
    textOverflow: 'ellipsis',
  },
  loaderContainer: {
    width: '100%',
    margin: '20 0',
  },
  drawerPaper: {
    maxWidth: theme.breakpoints.values.sm * 0.75,
    width: '100%',
    height: '100vh',
  },
  drawerHeader: {
    ...theme.typography.heading,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  formControl: { width: '100%', marginBottom: '0.75rem' },
  content: { minWidth: '360px' },
  CloseIcon: {
    position: 'absolute',
    right: '-10px',
  },
  CloseIconSize: {
    fontSize: '35px',
    fill: '#000000',
  },
  FilterTitle: {
    margin: '0 auto',
    paddingTop: '1rem',
    paddingBottom: '10px',
    color: 'black',
    fontSize: '24px',
    borderBottom: '1px solid lightgray',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
  },
  FilterSectionTitle: {
    margin: '0 auto',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    color: 'white',
    fontSize: '24px',
    width: '100%',
    marginLeft: '2rem',
  },
  textFieldName: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '23px',
    color: '#666666',
  },
  ButtonSection: {
    // margin: '0 auto',
    padding: '1rem 0rem',
    color: 'black',
    fontSize: '18px',
    borderTop: '1px solid lightgray',
    width: '100%',
    textAlign: 'center',
  },
  SaveButton: {
    minWidth: '128px',
    color: '#fff',
    background: '#101928',
    border: '1px solid #eef0f2',
    textTransform: 'none',
    boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
    fontWeight: '700',
    lineHeight: '18px',
    padding: '8px 16px',
    minHeight: '44px',
  },
}));

const CustomerAddressAddModel = ({
  isAddModalOpen,
  isEditModalOpen,
  isEditing,
  successAlert,
  errorAlert,
  editCustomerAddress,
  addCustomerAddress,
  closeEditModal,
  closeAddModal,
  customerId,
  currentCustomerAddress,
  customerType,
}) => {
  const {
    isAddressModelOpen,
    isAddressEditModalOpen
  } = useSelector((state) => state?.CustomerReducer)
  const onClose = isEditing ? closeEditModal : closeAddModal;
  const open = isAddressModelOpen || isAddressEditModalOpen;

  const classes = useStyles();

  const [autoCompleteState, setAutoCompleteState] = useState({
    postcode: '',
  });
  const [locations, setLocations] = useState([]);
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();

  const {
    values,
    setValues,
    getFieldProps,
    touched,
    handleBlur,
    errors,
    handleSubmit,
  } = useValidator({
    initialValues: {
      customer_id: customerId,
      customer_type: customerType,
      postcode: '',
      address_1: '',
      address_2: '',
      address_3: '',
      address_4: '',
      address_5: '',
      city: '',
      is_default: false,
    },
    validationSchema: Yup.object({
      house_no: Yup.string().nullable(),
      postcode: Yup.string()
        .matches(
          /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
          `Invalid postcode format`,
        )
        .required('Postcode is Required!'),
      address_1: Yup.string().required(),
      address_2: Yup.string().nullable(),
      address_3: Yup.string().nullable(),
      address_4: Yup.string().nullable(),
      address_5: Yup.string().nullable(),
      city: Yup.string().required(),
      is_default: Yup.string().nullable(),
    }),
    onSubmit,
  });
  function onSubmit(values) {
    if (isEditing) {
      editCustomerAddress(values);
    } else {
      addCustomerAddress(values);
    }
  }

  useEffect(() => {
    if (addressObj !== null) {
      setValues({
        ...values,
        address_1: addressObj?.address,
        postcode: addressObj?.postal_code,
        city: addressObj?.postal_town,
        address_4: addressObj?.province
      })
    }
  }, [addressObj])

  useEffect(() => {
    if (isEditing) {
      setValues({
        // customerId: customerId,
        ...values,
        customer_id: customerId,
        customer_type: customerType,
        house_no: currentCustomerAddress?.house_no,
        postcode: currentCustomerAddress?.postcode,
        address_1: currentCustomerAddress?.address_1,
        address_2: currentCustomerAddress?.address_2,
        address_3: currentCustomerAddress?.address_3,
        address_4: currentCustomerAddress?.address_4,
        address_5: currentCustomerAddress?.address_5,
        city: currentCustomerAddress?.city,
        is_default: currentCustomerAddress?.is_default,
        id: currentCustomerAddress?.id,
      });
      setAutoCompleteState({
        postcode: currentCustomerAddress?.postcode,
      });
    }
  }, [isEditing, currentCustomerAddress]);

  const getAutoSuggest = async (data) => {
    // let data = `${autoCompleteState.postcode}`;
    if (data) {
      // const regEx = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
      // if (regEx.test(data)) {
      //   let res = await getLocation(data);
      //   await setLocations(res);
      // } else {
      //   setLocations([]);
      // }
    }
  };

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);
      setAddressObj(addressObject);
    };
    func();
  }, [address]);

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      postal_town: ["postal_town"],
      street: ["street_address", "route"],
      province: [
        "administrative_area_level_1",
        "administrative_area_level_2",
        "administrative_area_level_3",
        "administrative_area_level_4",
        "administrative_area_level_5"
      ],
      city: [
        "locality",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "sublocality_level_4"
      ],
      country: ["country"]
    };

    let address = {
      street_number: "",
      postal_code: "",
      postal_town: '',
      street: "",
      province: "",
      city: "",
      country: ""
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "locality") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="contact-add-modal"
      aria-describedby="Contact add modal"
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3 className={classes.FilterTitle}>
          {isEditing ? 'Edit' : 'Add'} Address
        </h3>
        <IconButton
          onClick={onClose}
          style={{ marginRight: '1rem' }}
          className={classes.CloseIcon}
        >
          <Close className={classes.CloseIconSize} />
        </IconButton>
      </Box>

      <DialogContent className={classes.cardContent}>
        <form onSubmit={handleSubmit}>
          <Box
            width="100%"
            style={{ padding: '1.5rem' }}
            display="flex"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Card style={{ width: '60%' }}>
              <Box
                style={{
                  display: 'flex',
                  padding: '2rem',
                  justifyContent: 'space-around',
                }}
              >
                <Box width="50%" style={{ marginRight: '1rem' }}>
                  {/* <span className={classes.textFieldName}>House Number*</span> */}
                  {/* <FormControl
                    className={classes.formControl}
                    error={!!(touched.house_no && errors.house_no)}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      onBlur={handleBlur}
                      {...getFieldProps('house_no')}
                      id="house_no"
                      error={!!(touched.house_no && errors.house_no)}
                      aria-describedby="user-name-text"
                    />
                    {touched.house_no && errors.house_no ? (
                      <FormHelperText
                        error={!!errors.house_no}
                        id="house_no-text"
                      >
                        House no is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl> */}
                  <span className={classes.textFieldName}>Default*</span>
                  <FormControlLabel
                    style={{ display: 'block', marginBottom: '0.6rem' }}
                    control={
                      <IOSSwitch
                        helperText={touched.is_default && errors.is_default}
                        error={!!(touched.is_default && errors.is_default)}
                        // label="Default"
                        checked={values.is_default}
                        inputProps={{ ...getFieldProps('is_default') }}
                      />
                    }
                  />


                  <span className={classes.textFieldName}>Address Line:2</span>
                  <FormControl
                    className={classes.formControl}
                    error={!!(touched.address_2 && errors.address_2)}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      onBlur={handleBlur}
                      {...getFieldProps('address_2')}
                      id="address_2"
                      error={!!(touched.address_2 && errors.address_2)}
                      aria-describedby="user-name-text"
                    />
                    {touched.address_2 && errors.address_2 ? (
                      <FormHelperText
                        error={!!errors.address_2}
                        id="address_2-text"
                      >
                        Address Line:3 is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl>

                  <span className={classes.textFieldName}>City/Town*</span>
                  <FormControl
                    className={classes.formControl}
                    error={!!(touched.city && errors.city)}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      onBlur={handleBlur}
                      {...getFieldProps('city')}
                      id="city"
                      name="city"
                      error={!!(touched.city && errors.city)}
                      aria-describedby="user-name-text"
                    />
                    {touched.city && errors.city ? (
                      <FormHelperText error={!!errors.city} id="city-text">
                        City is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl>

                  <span className={classes.textFieldName}>Postcode*</span>
                  <FormControl
                    className={classes.formControl}
                    error={!!(touched.postcode && errors.postcode)}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      onBlur={handleBlur}
                      {...getFieldProps('postcode')}
                      id="postcode"
                      name="postcode"
                      error={!!(touched.postcode && errors.postcode)}
                      aria-describedby="user-name-text"
                    />
                    {touched.postcode && errors.postcode ? (
                      <FormHelperText error={!!errors.postcode} id="postcode-text">
                        Postcode is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl>
                </Box>
                <Box width="50%">


                  <span className={classes.textFieldName}>Address Line:1*</span>

                  <FormControl
                    className={classes.formControl}
                  >
                    {/* <Autocomplete
    freeSolo
    value={autoCompleteState.postcode}
    options={locations}
    getOptionLabel={(options) =>
      isEditing
        ? options?.address_components &&
          options?.address_components[0]?.long_name
          ? options?.address_components[0]?.long_name?.toString()
          : options.toString()
        : options?.address_components &&
          options?.address_components[0]?.long_name
          ? options?.address_components[0]?.long_name?.toString()
          : options.toString()
    }
    renderOption={(option) => (
      <Box display="flex" flexDirection="column">
        <span className={classes.textCapitalize}>
          {option.formatted_address}
        </span>
      </Box>
    )}
    onInputChange={(event, newValue) => {
      setAutoCompleteState({
        ...values,
        ...autoCompleteState,
        postcode: event?.target?.value
          ? event?.target?.value
          : newValue,
      });
      let value = event?.target?.value
        ? event?.target?.value
        : newValue;
      getAutoSuggest(value);
    }}
    onChange={(event, newValue) => {
      let data = {
        ...values,
        postcode: values.postcode,
        city: values.city,
        address_1: values.address,
      };
      newValue?.address_components.length > 0 &&
        newValue.address_components.map((ele) => {
          if (ele?.types.indexOf('postal_code') > -1) {
            data.postcode = ele.long_name;
          } else if (ele?.types.indexOf('postal_town') > -1) {
            data.city = ele.long_name;
          } else if (ele?.types.indexOf('route') > -1) {
            data.address_1 = ele.long_name;
          }
        });
      if (newValue === null) {
        data.postcode = '';
      }
      setValues({
        ...data,
      });
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        size="small"
        helperText={touched.postcode && errors.postcode}
        error={!!(touched.postcode && errors.postcode)}
        // label="PostCode"
        onChange={(event, newValue) => {
          setAutoCompleteState({
            ...values,
            ...autoCompleteState,

            postcode: event.target.value,
          });
        }}
        InputProps={{
          ...getFieldProps('postcode'),
          ...params.InputProps,
        }}
      />
    )}
  /> */}
                    <GooglePlacesAutocomplete
                      apiKey={process.env.NEXT_PUBLIC_APP_MAPS_KEYS}
                      selectProps={{
                        isClearable: true,
                        value: address,
                        defaultInputValue: isEditing ? values?.address_1 : '',
                        onChange: (val) => {
                          setAddress(val);
                        },
                        placeholder: '',
                      }}
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ['uk'],
                        }
                      }}
                    />
                    {touched.address_1 && errors.address_1 ? (
                      <FormHelperText
                        error={!!errors.address_1}
                        id="house_no-text"
                      >
                        Address Line:1 is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl>

                  <span className={classes.textFieldName}>Address Line:3</span>
                  <FormControl
                    className={classes.formControl}
                    error={!!(touched.address_3 && errors.address_3)}
                  >
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      onBlur={handleBlur}
                      {...getFieldProps('address_3')}
                      id="address_3"
                      name="address 2"
                      error={!!(touched.address_3 && errors.address_3)}
                      aria-describedby="user-name-text"
                    />
                    {touched.address_3 && errors.address_3 ? (
                      <FormHelperText
                        error={!!errors.address_3}
                        id="address_3-text"
                      >
                        Address Line:3 is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl>

                  <span className={classes.textFieldName}>County</span>
                  <FormControl
                    className={classes.formControl}
                    error={!!(touched.address_4 && errors.address_4)}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      onBlur={handleBlur}
                      {...getFieldProps('address_4')}
                      id="address_4"
                      name="address_4"
                      error={!!(touched.address_4 && errors.address_4)}
                      aria-describedby="user-name-text"
                    />
                    {touched.address_4 && errors.address_4 ? (
                      <FormHelperText
                        error={!!errors.address_4}
                        id="address_4-text"
                      >
                        Address 4 is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl>

                  {/* <span className={classes.textFieldName}>Address 5*</span>
                  <FormControl
                    className={classes.formControl}
                    error={!!(touched.address_5 && errors.address_5)}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      onBlur={handleBlur}
                      {...getFieldProps('address_5')}
                      id="address_5"
                      error={!!(touched.address_5 && errors.address_5)}
                      aria-describedby="user-name-text"
                    />
                    {touched.address_5 && errors.address_5 ? (
                      <FormHelperText
                        error={!!errors.address_5}
                        id="address_5-text"
                      >
                        Address 5 is required!
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl> */}
                </Box>
              </Box>
            </Card>
          </Box>
        </form>
      </DialogContent>

      <Box
        className={classes.ButtonSection}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Box style={{ marginRight: '1rem' }}>
          <form onSubmit={handleSubmit}>
            <CancelModal onCloses={onClose} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={`${classes.ml} ${classes.SaveButton}`}
            >
              {isEditing ? 'Update ' : 'Save '}
            </Button>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
};
// AdditionalContactsAddModal.propTypes = {
//   jobId: PropTypes.string,
//   isAddModalOpen: PropTypes.bool,
//   isEditModalOpen: PropTypes.bool,
//   isEditing: PropTypes.bool,
//   successAlert: PropTypes.func,
//   errorAlert: PropTypes.func,
//   editContact: PropTypes.func,
//   addContact: PropTypes.func,
//   closeEditModal: PropTypes.func,
//   closeAddModal: PropTypes.func,
//   currentContact: PropTypes.object,
// };
const CustomerAddressAddModels = (props) =>
  (props.isAddModalOpen || props.isEditModalOpen) && (
    <CustomerAddressAddModel {...props} />
  );
//   CustomerAddressAddModel.propTypes = {
//   isAddModalOpen: PropTypes.bool,
//   isEditModalOpen: PropTypes.bool,
// };
const mapStateToProps = ({ CustomerReducer }) => ({
  isAddModalOpen: CustomerReducer.isAddressModelOpen,
  isEditModalOpen: CustomerReducer.isAddressEditModalOpen,
  isEditing: CustomerReducer.isAddressEditing,
  currentCustomerAddress: CustomerReducer.currentCustomerAddress,
});
const mapDispatchToProps = (dispatch) => ({
  addCustomerAddress: (data) => dispatch(submitCustomerAddressAdd(data)),
  editCustomerAddress: (...args) =>
    dispatch(submitCustomerAddressEdit(...args)),
  closeEditModal: (...args) => dispatch(closeCustomerAddressEditModel(...args)),
  closeAddModal: (...args) => dispatch(closeCustomerAddressAddModel(...args)),
  successAlert: (...args) => dispatch(successAlert(...args)),
  errorAlert: (...args) => dispatch(errorAlert(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerAddressAddModels);
