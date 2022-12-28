import React, {useEffect, useState} from 'react'
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Paper,
  InputLabel,
  FormHelperText,
  Typography,
} from '@material-ui/core'
import GoogleInput from '../GoogleInput'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Button} from 'semantic-ui-react'
import Router, {useRouter} from 'next/router'
import {Dimmer, Loader, Image} from 'semantic-ui-react'
// import Alerts from '../../Components/Alerts'
import {useStyles} from './styles'
import useValidator from '../../utils/useValidator'
import {addDetails, getInformation} from '../../Stores/Traders/actions'
import SiteFooter from '../../components/SiteFooter'
import * as Yup from 'yup'
import {Autocomplete, Skeleton} from '@material-ui/lab'
function PersonalInformation({
  addDetails,
  isAddingDetail,
  detailsData,
  isFetchingInformation,
  info,
  fetchInformation,
  isAddingSuccess,
}) {
  const router = useRouter()
  const classes = useStyles()
  const [show, setShow] = useState(0)
  const [loader, setLoader] = useState(true)
  const [update, setUpdate] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const [changingRoute, setChangingRoute] = useState(false)

  const [selectedVatRegistered, setSelectedVatRegistered] = useState(false)
  const [companyType, setCompanyType] = useState([
    'solo',
    'multiple staff',
    'national covarage',
  ])
  const [enabled, setEnabled] = useState(true)
  const vatTypes = ['Yes', 'No']

  const id = router?.query?.traderId
  const {
    getFieldProps,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    clearFormState,
  } = useValidator({
    initialValues: {
      trader_id: id,
      company_name: '',
      company_type: '',
      postcode: '',
      company_reg_number: '',
      vat_registered: false,
      registered_office_address: '',
      address: '',

      reg_office_postcode: '',
      proprietor: '',
      director: '',
      contact_name: '',
      services_title: '',
      admin_title: '',
      charge_rate: 0,
      labour_rate: 0,
      out_of_hours: 0,
      complaints_title: '',
      company_reg_date: '',
      city: '',
      telephone: '',
      mobileno: '',
      fax: '',
      contact_name: '',
      emergency_contact_number: '',
      vat_number: '',
      vat_rate: 0,
      website: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      company_type: Yup.string()
        .typeError('Company type is required')
        .required('Company type is required'),
      vat_registered: Yup.boolean().required('Vat registered is required'),
      address: Yup.string().required('Address is required'),

      city: Yup.string().required('City is required'),
      mobileno: Yup.string()
        .test(
          `Mobile Number format`,
          `Invalid Mobile Number format!`,
          function (value) {
            if (value !== '') {
              const mobileRegex = /^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)?\d{4}(\s)?\d{6}$/
              return (
                typeof value === 'string' &&
                mobileRegex.test(value.replace(/\s/g, ''))
              )
            } else {
              return true
            }
          },
        )
        .required('Mobile number is required'),
      emergency_contact_number: Yup.string()
        .test(
          `Mobile Number format`,
          `Invalid Mobile Number format!`,
          function (value) {
            if (value !== '') {
              const mobileRegex = /^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)?\d{4}(\s)?\d{6}$/
              return (
                typeof value === 'string' &&
                mobileRegex.test(value.replace(/\s/g, ''))
              )
            } else {
              return true
            }
          },
        )
        .nullable(),
      telephone: Yup.string()
        .matches(/^[0-9]*$/, 'It should be numeric only')
        .nullable(),
      fax: Yup.string()
        .matches(/^[0-9]*$/, 'It should be numeric only')
        .nullable(),
      postcode: Yup.string()
        .matches(
          /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
          `Invalid postcode format`,
        )
        .required('Postcode is Required!'),
      company_name: Yup.string().required('Company name is required'),

      // company_reg_number:
      //   selectedType !== 'solo'
      //     ? Yup.string()
      //         .matches(
      //           /^[a-zA-Z]{2}\d{6}$|(^[0-9]{7})$|(^[0-9]{8})$/,
      //           `Company registration number should contain 7-8 digits or 2 letters followed by 6 digits`,
      //         )
      //         .required('Company registration number is required')
      //     : Yup.string()
      //         .matches(
      //           /^[a-zA-Z]{2}\d{6}$|(^[0-9]{7})$|(^[0-9]{8})$|^(?:)$/,
      //           `Company registration number should contain 7-8 digits or 2 letters followed by 6 digits`,
      //         )
      //         .nullable(),
      company_reg_number: Yup.string().nullable(),
      vat_number:
        selectedVatRegistered == true
          ? Yup.string()
              .matches(
                /^(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})/,
                `Invalid Vat number format`,
              )
              .required('Vat number is required')
          : Yup.string().nullable(),

      website: Yup.string().url().nullable(true),
    }),
  })

  useEffect(() => {
    let timer1 = setTimeout(() => setLoader(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  function onSubmit(val) {
    addDetails(values)
    setEnabled(false)
    setChangingRoute(true)
  }
  useEffect(() => {
    if (enabled) {
      window.addEventListener('beforeunload', (ev) => {
        ev.preventDefault()
        return (ev.returnValue = 'Are you sure you want to close?')
      })
    } else {
      window.removeEventListener('beforeunload', onSubmit, true)
    }
  }, [enabled])

  useEffect(() => {
    if (isAddingSuccess) {
      Router.push(`/trader-signup/${values?.trader_id}/postcode`)
    }
  }, [isAddingSuccess])

  useEffect(() => {
    //fetch personal information
    if (values.trader_id) {
      fetchInformation(values.trader_id)
    }
  }, [])
  useEffect(() => {
    if (info?.is_active == true) {
      Router.push(`/login`)
    }

    if (info?.id) {
      setSelectedType(info?.company_type !== null ? info?.company_type : '')
      setValues({
        ...values,
        id: info?.id,
        company_name: info?.company_name !== null ? info?.company_name : '',
        company_type: info.company_type !== null ? info?.company_type : '',
        postcode: info.postcode !== null ? info?.postcode : '',
        company_reg_number:
          info.company_reg_number !== null ? info?.company_reg_number : '',
        vat_registered:
          info.vat_registered !== null ? info?.vat_registered : '',
        registered_office_address:
          info.registered_office_address !== null
            ? info?.registered_office_address
            : '',
        address: info?.address !== null ? info?.address : '',
        reg_office_postcode:
          info.reg_office_postcode !== null ? info.reg_office_postcode : '',
        contact_name: info.contact_name !== null ? info?.contact_name : '',
        city: info.city !== null ? info?.city : '',
        telephone: info.telephone !== null ? info.telephone : '',
        mobileno: info.mobileno !== null ? info.mobileno : '',
        fax: info.fax !== null ? info.fax : '',
        contact_name: info.contact_name !== null ? info.contact_name : '',
        emergency_contact_number:
          info.emergency_contact_number !== null
            ? info.emergency_contact_number
            : '',
        vat_number: info.vat_number !== null ? info.vat_number : '',

        website: info.website,
      })
    }
    if (info?.profile_step == 4) {
      Router.push(`/trader-signup/${info?.id}/business-information`)
    }
    setChangingRoute(false)
  }, [info])

  useEffect(() => {
    if (!isAddingSuccess && !isAddingDetail) {
      setChangingRoute(false)
    }
  }, [isAddingSuccess, isAddingDetail])

  return (
    <>
      {loader || isAddingDetail || isFetchingInformation || changingRoute ? (
        <div className={classes.content}>
          <Loader
            active
            inline="centered"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      ) : (
        <>
          <section className={classes.container}>
            <div className={classes.postcodeContainer}>
              <form onSubmit={handleSubmit}>
                <div className={classes.cardWrap}>
                  <div className={`${classes.cardItem} `}>
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={3} md={3}></Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <div className={classes.cardContainer}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <h4 className={'page_heading'}>
                                Company Details
                              </h4>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="standard"
                                name="company_name"
                                label="Company / Business Name*"
                                type="text"
                                className={classes.postcodeInput}
                                fullWidth
                                inputProps={{
                                  ...getFieldProps('company_name'),
                                }}
                                helperText={
                                  touched.company_name && errors.company_name
                                }
                                error={
                                  !!(
                                    touched.company_name && errors.company_name
                                  )
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Autocomplete
                                options={companyType}
                                getOptionLabel={(option) => option}
                                size="small"
                                name="company_type"
                                variant="standard"
                                labelId="company_type"
                                id="company_type"
                                value={values.company_type}
                                onBlur={handleBlur('company_type')}
                                onChange={(event, newValue) => {
                                  setValues({
                                    ...values,
                                    company_type: newValue,
                                  })
                                  setSelectedType(newValue)
                                }}
                                error={
                                  touched.company_type && errors.company_type
                                }
                                helperText={
                                  touched.company_type && errors.company_type
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    size="small"
                                    label="Company Type"
                                    variant="standard"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                )}
                              />
                              <FormHelperText
                                error={
                                  !!(
                                    touched.company_type && errors.company_type
                                  )
                                }
                              >
                                {touched.company_type && errors.company_type}
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="standard"
                                className={classes.postcodeInput}
                                fullWidth
                                name="company_reg_number"
                                label="Comany Registration Number*"
                                type="text"
                                id="company_reg_number"
                                inputProps={{
                                  ...getFieldProps('company_reg_number'),
                                }}
                                helperText={
                                  touched.company_reg_number &&
                                  errors.company_reg_number
                                }
                                error={
                                  !!(
                                    touched.company_reg_number &&
                                    errors.company_reg_number
                                  )
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <GoogleInput
                                componentValue={values?.address}
                                setParentValues={setValues}
                                parentValues={values}
                                classes={{root: classes.root}}
                                size="small"
                                error={!!(touched.address && errors.address)}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                variant="standard"
                                size="small"
                                fullWidth
                                name="postcode"
                                className={classes.postcodeInput}
                                label="Postcode*"
                                type="text"
                                id="postcode"
                                inputProps={{
                                  ...getFieldProps('postcode'),
                                }}
                                helperText={touched.postcode && errors.postcode}
                                error={!!(touched.postcode && errors.postcode)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                variant="standard"
                                fullWidth
                                name="city"
                                label="City*"
                                type="text"
                                className={classes.postcodeInput}
                                id="city"
                                inputProps={{
                                  ...getFieldProps('city'),
                                }}
                                helperText={touched.city && errors.city}
                                error={!!(touched.city && errors.city)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl style={{width: '100%'}}>
                                <InputLabel id="vat_registered">
                                  Vat Registered
                                </InputLabel>
                                <Select
                                  name="vat_registered"
                                  variant="standard"
                                  labelId="vat_registered"
                                  size="small"
                                  id="vat_registered"
                                  fullWidth
                                  label="Vat Registered"
                                  value={
                                    values.vat_registered == true ? 'Yes' : 'No'
                                  }
                                  onChange={(e) => {
                                    setValues({
                                      ...values,
                                      vat_registered:
                                        e.target.value == 'Yes' ? true : false,
                                    })
                                    setSelectedVatRegistered(
                                      e.target.value == 'Yes' ? true : false,
                                    )
                                  }}
                                  error={
                                    touched.vat_registered &&
                                    errors.vat_registered
                                  }
                                  helperText={
                                    touched.vat_registered &&
                                    errors.vat_registered
                                  }
                                >
                                  {vatTypes.map((ele, i) => (
                                    <MenuItem key={i} value={ele}>
                                      {ele}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <FormHelperText
                                  error={
                                    !!(
                                      touched.vat_registered &&
                                      errors.vat_registered
                                    )
                                  }
                                >
                                  {touched.vat_registered &&
                                    errors.vat_registered}
                                </FormHelperText>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="standard"
                                className={classes.postcodeInput}
                                fullWidth
                                name="vat_number"
                                label="Vat Number"
                                type="text"
                                id="vat_number"
                                inputProps={{
                                  ...getFieldProps('vat_number'),
                                }}
                                helperText={
                                  touched.vat_number && errors.vat_number
                                }
                                error={
                                  !!(touched.vat_number && errors.vat_number)
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="standard"
                                className={classes.postcodeInput}
                                fullWidth
                                name="website"
                                label="Website"
                                type="text"
                                id="website"
                                inputProps={{
                                  ...getFieldProps('website'),
                                }}
                                helperText={touched.website && errors.website}
                                error={!!(touched.website && errors.website)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                          </Grid>
                        </div>

                        <div
                          className={`${classes.cardContainer} ${classes.cardMargin}`}
                        >
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <h4 className={'page_heading'}>
                                {' '}
                                Contact Information{' '}
                              </h4>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                className={classes.postcodeInput}
                                fullWidth
                                name="mobileno"
                                label="Mobile number*"
                                type="text"
                                id="mobileno"
                                inputProps={{
                                  ...getFieldProps('mobileno'),
                                }}
                                helperText={touched.mobileno && errors.mobileno}
                                error={!!(touched.mobileno && errors.mobileno)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                fullWidth
                                name="telephone"
                                label="Telephone"
                                type="text"
                                className={classes.postcodeInput}
                                id="telephone"
                                inputProps={{
                                  ...getFieldProps('telephone'),
                                }}
                                helperText={
                                  touched.telephone && errors.telephone
                                }
                                error={
                                  !!(touched.telephone && errors.telephone)
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                className={classes.postcodeInput}
                                fullWidth
                                name="emergency_contact_number"
                                label="Emergency Contact no."
                                type="text"
                                id="emergency_contact_number"
                                inputProps={{
                                  ...getFieldProps('emergency_contact_number'),
                                }}
                                helperText={
                                  touched.emergency_contact_number &&
                                  errors.emergency_contact_number
                                }
                                error={
                                  !!(
                                    touched.emergency_contact_number &&
                                    errors.emergency_contact_number
                                  )
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                fullWidth
                                name="fax"
                                label="Fax"
                                type="text"
                                className={classes.postcodeInput}
                                id="fax"
                                inputProps={{
                                  ...getFieldProps('fax'),
                                }}
                                helperText={touched.fax && errors.fax}
                                error={!!(touched.fax && errors.fax)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <div className={classes.bntFullContainer}>
                              <Button
                                fluid
                                className={
                                  Object.keys(errors).length > 0
                                    ? `us_btn_disabled`
                                    : `us_btn`
                                }
                                type="submit"
                                // disabled={Object.keys(errors).length > 0}
                              >
                                Next
                                <img
                                  src={
                                    Object.keys(errors).length > 0
                                      ? '/site__main__images/site__chevron__right__grey.png'
                                      : '/site__main__images/site__chevron__right__light.png'
                                  }
                                />
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <div className="site__footer">
            <SiteFooter />
          </div>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  isAddingDetail: state.TraderReducer?.isAddingDetail,
  isAddingSuccess: state.TraderReducer?.isAddingSuccess,
  detailsData: state.TraderReducer?.detailsData,
  isFetchingInformation: state.TraderReducer?.isFetchingInformation,
  info: state.TraderReducer?.info,
})
function mapDispatchToProps(dispatch) {
  return {
    addDetails: (data) => dispatch(addDetails(data)),
    fetchInformation: (data) => dispatch(getInformation(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(PersonalInformation)
