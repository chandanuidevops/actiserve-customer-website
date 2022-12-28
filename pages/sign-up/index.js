import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import logo from "../../Assets/Images/logo.png";
import { InputAdornment, Paper } from "@material-ui/core";
import * as Yup from "yup";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import useValidator from "../../utils/useValidator";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Autocomplete from "@material-ui/lab/Autocomplete";
import actions from "../../Stores/Auth/actions";
import { useHistory } from "react-router-dom";
import Router, { useRouter } from 'next/router'
import { FormControl, FormHelperText } from '@material-ui/core';
import {
  Form, Loader, Grid as CustomGrid
} from 'semantic-ui-react'
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { validateCustomer } from "../../Stores/CustomerFlow/actions";
import HelmetComponent from '../../components/Helmet'
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
const SignUpAction = actions.CustomerSignUp;
const LoginAction = actions.CustomerLogin;


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
  },
  logoAvatar: {
    marginBottom: "2rem",
  },
}));

function SignUp({ CustomerSignUp, validateEmail, validateCustomerTest, CustomerLogin, isValidatingCustomer }) {
  const history = useRouter();

  const customerTypes = ["tenant", "landlord", "homeowner"];

  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();

  const [customerExists, setCustomerExists] = useState(false)

  const [show, setShow] = useState(0);


  useEffect(() => {
    // if (loggedIn === false) {
    if (validateCustomerTest === 200) {
      setCustomerExists(true)
    } else if (validateCustomerTest === 404) {
      setCustomerExists(false)
      // }
    }
  }, [validateCustomerTest])


  const {
    getFieldProps,
    values,
    errors,
    setValues,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
  } = useValidator({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile_no: "",
      customer_type: "",
      customer_address: "",
      is_default: false,
      postcode: "",
      address_1: "",
      city: "",
      house_no: "",
    },
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      address_1: customerExists === false ? Yup.string().typeError().required('Address is required') : Yup.string().nullable(),
      customer_type: customerExists === false ? Yup.string().required('Customer Type is required') : Yup.string().nullable(),
      postcode: customerExists === false ? Yup.string()
        .matches(
          /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
          `Invalid postcode format`
        )
        .required("Postcode is Required!") : Yup.string().nullable(),
      name: customerExists === false ? Yup.string().required('Name is required') : Yup.string().nullable(),
      city: customerExists === false ? Yup.string().required('City is required') : Yup.string().nullable(),
      password: Yup.string().required("Password is Required").test(
        "Password Validation",
        "Password must contains at least one lowercase, uppercase alphabetical character, digit, special character and 6 character long.",
        (value) => {
          if (value.length > 0)
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(
              value
            );
          else return true;
        }
      ),
      mobile_no: customerExists === false ? Yup.string()
        .test(
          `Mobile Number format`,
          `Invalid Mobile Number format!`,
          function (value) {
            const mobileRegex = /^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)?\d{4}(\s)?\d{6}$/;
            return (
              typeof value === "string" &&
              mobileRegex.test(value.replace(/\s/g, ""))
            );
          }
        )
        .required("Mobile number is a required field") : Yup.string().nullable(),
      telephone: Yup.string()
        .matches(/^[0-9]*$/, "It should be numeric only")
        .nullable(),
    }),
  });

  const classes = useStyles();
  const handleCheck = (e) => {
    setValues({
      ...values,
      is_default: e?.target?.checked,
    });
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

  useEffect(() => {
    if (addressObj !== null) {
      setValues({
        ...values,
        address_1: addressObj?.address,
        postcode: addressObj?.postal_code,
        city: addressObj?.postal_town,
        address_4: addressObj?.province,
      })
    } else {
      setValues({
        ...values,
        address_1: '',
        postcode: '',
        city: '',
        address_4: '',
      })
    }
  }, [addressObj])

  function onSubmit(values) {
    if (customerExists === false) {
      let credentials = {
        customer_type: values?.customer_type,
        name: values?.name,
        email: values?.email,
        password: values?.password,
        mobile_no: values?.mobile_no,
        customer_addresses: {
          is_default: values?.is_default,
          postcode: values?.postcode,
          address_1: values?.address_1,
          city: values?.city,
          address_4: values?.address_4,
        },
      };
      CustomerSignUp(credentials, history);
    } else if (customerExists === true) {
      let credentials = {
        email: values?.email,
        password: values?.password,
      }
      CustomerLogin(credentials, history);
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (
        values?.email !== null &&
        values?.email !== '' &&
        errors.hasOwnProperty('email') === false
      ) {
        validateEmail({ email: values?.email })
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [values?.email, errors?.email])


  return (
<>
    <HelmetComponent
    title="UrbanServe - About Us"
    description="Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs"
    ogTitle=""
    ogType="urbanserve company"
    ogUrl=""
    ogImage=""
    ogDescription=""
  />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logoAvatar}>
        </div>
        <img src="/site__main__images/site__logo.png" width="50%" alt="" style={{ paddingBottom: '0.5rem' }} />
        <form onSubmit={handleSubmit}>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant="outlined"
              size="small"
              name="email"
              placeholder="Email"
              margin="normal"
              type="email"
              fullWidth
              error={!!(touched.email && errors.email)}
              inputProps={{ ...getFieldProps("email") }}
              helperText={touched.email && errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            {isValidatingCustomer && (
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginLeft: '0.3rem',
                }}
              >
                <Loader active inline size="small"></Loader>
              </Box>
            )}
          </Box>
          {customerExists === false && (
            <>
              <TextField
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                name="name"
                placeholder="Name"
                type="name"
                id="name"
                error={!!(touched.name && errors.name)}
                inputProps={{ ...getFieldProps("name") }}
                helperText={touched.name && errors.name}
              />
              <Autocomplete
                id="combo-box-demo"
                options={customerTypes}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  setValues({
                    ...values,
                    customer_type: newValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    placeholder="Customer Type"
                    name="Customer Type"
                    autoFocus
                    label="Customer Type"
                    error={!!(touched.customer_type && errors.customer_type)}
                    helperText={touched.customer_type && errors.customer_type}
                  />
                )}
              />
            </>
          )}

          <TextField
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            name="password"
            placeholder="Password"
            type={show ? "text" : "password"}
            id="password"
            error={!!(touched.password && errors.password)}
            inputProps={{ ...getFieldProps("password") }}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  {show ? (
                    <VisibilityIcon onClick={() => setShow(false)} />
                  ) : (
                    <VisibilityOffIcon onClick={() => setShow(true)} />
                  )}
                </InputAdornment>
              ),
            }}
          />
          {customerExists === false && (
            <>
              <TextField
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                name="mobile_no"
                placeholder="Mobile Number"
                type="mobile_no"
                id="mobile_no"
                error={!!(touched.mobile_no && errors.mobile_no)}
                inputProps={{ ...getFieldProps("mobile_no") }}
                helperText={touched.mobile_no && errors.mobile_no}
              />
              <Form.Field>
                <GooglePlacesAutocomplete
                  apiKey={process.env.NEXT_PUBLIC_APP_MAPS_KEYS}
                  selectProps={{
                    isClearable: true,
                    value: address,
                    onChange: (val) => {
                      setAddress(val);
                    },
                    placeholder: 'Address Line:1',
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
              </Form.Field>
              <Box>
                <FormControl
                  className={classes.formControl}
                  style={{ width: '100%' }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    margin="normal"
                    fullWidth
                    placeholder="Address Line:2"
                    inputProps={{ ...getFieldProps("address_2") }}
                  />
                </FormControl>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  placeholder="Address Line:3"
                  inputProps={{ ...getFieldProps("address_3") }}
                />
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  placeholder="City"
                  error={!!(touched.city && errors.city)}
                  inputProps={{ ...getFieldProps("city") }}
                  helperText={touched.city && errors.city}
                />
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  label="County"
                  inputProps={{ ...getFieldProps("address_4") }}
                />
              </Box>
              <FormControl
                className={classes.formControl}
                style={{ width: '100%' }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  margin="normal"
                  style={{ width: '100%' }}
                  fullWidth
                  name="postcode"
                  label="Postcode"
                  type="postcode"
                  id="postcode"
                  error={!!(touched.postcode && errors.postcode)}
                  inputProps={{ ...getFieldProps("postcode") }}
                  helperText={touched.postcode && errors.postcode}
                />
              </FormControl>
              <FormControlLabel
                inputProps={{ ...getFieldProps("is_default") }}
                control={<Checkbox onChange={handleCheck} color="primary" />}
                label="Is this your default address?"
                labelPlacement="end"
              />
            </>
          )}
          {customerExists === true ? `You already have an account with us! Please login to continue.` : ``}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {customerExists === false ? `Sign Up` : `Sign In`}
          </Button>
        </form>
        <Grid container style={{ margin: "1rem 0rem 2rem 0rem" }}>
          <Grid item xs>
            <Link onClick={() => Router.push("/forgot/password")} variant="body2">
              <p style={{ fontFamily: 'Urbanist__semibold', cursor: 'pointer' }}>
                Forgot password?
              </p>
            </Link>
          </Grid>
          {customerExists === false && <Grid item>
            <Link onClick={() => Router.push("/login")} variant="body2">
              <p style={{ fontFamily: 'Urbanist__semibold', cursor: 'pointer' }}>
                Already have an account? Sign In
              </p>
            </Link>
          </Grid>}
        </Grid>
      </div>
    </Container>

    </>
  );
}

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool,
};

const mapStateToProps = ({ AuthReducer, CustomerFlowReducer }) => ({
  isAuthenticated: AuthReducer.isAuthenticated,
  isLoggingIn: AuthReducer.isLoggingIn,
  error: AuthReducer.error,
  validateCustomerTest: CustomerFlowReducer?.validateCustomer,
  isValidatingCustomer: CustomerFlowReducer?.isValidatingCustomer,
});
function mapDispatchToProps(dispatch) {
  return {
    CustomerLogin: (...args) => dispatch(LoginAction(...args)),
    CustomerSignUp: (...args) => dispatch(SignUpAction(...args)),
    validateEmail: (data) => dispatch(validateCustomer(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignUp);
