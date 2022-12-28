import React, {useState, useEffect} from 'react'
import Images from '../../../Assets/Icons'
import Image from 'next/image'

import {useDispatch, useSelector} from 'react-redux'

// import Flip from 'react-reveal/Flip';

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import useValidator, {createFakeEvent} from '../../../utils/useValidator'
import * as Yup from 'yup'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import Router, {useRouter} from 'next/router'
import actions from '../../../Stores/Trader/actions'
import {Loader} from 'semantic-ui-react'

const submitFormAction = actions.submitTraderForm
const resetFormAction = actions.resetTraderForm

export default function Banner() {
  const dispatch = useDispatch()
  const router = useRouter()
  const {isSubmittingTraderForm, isTraderFormSubmitSuccess} = useSelector(
    (state) => state?.TraderReducer,
  )

  const {
    getFieldProps,
    errors,
    setValues,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    clearFormState,
    values,
  } = useValidator({
    initialValues: {
      name: '',
      business_name: '',
      position: '',
      email: '',
      contact_no: '',
      type_of_services: '',
      postcode: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required!'),
      // business_name: Yup.string().nullable(),
      // position: Yup.string().nullable(),
      email: Yup.string()
        .email('Please enter valid email!')
        .required('Email is required!'),
      // contact_no: Yup.string()
      //     .test(
      //         `Mobile Number format`,
      //         `Invalid contact number format!`,
      //         function (value) {
      //             const mobileRegex =
      //                 /^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)?\d{4}(\s)?\d{6}$/;
      //             return (
      //                 typeof value === 'string' &&
      //                 mobileRegex.test(value.replace(/\s/g, ''))
      //             );
      //         },
      //     )
      //     .required('Contact number is required!'),
      // postcode: Yup.string()
      //     .matches(
      //         /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
      //         `Invalid postcode format!`,
      //     )
      //     .required('Postcode is Required!'),
      // type_of_services: Yup.string().required('Choose atleast one service!'),
    }),
  })

  const [didStart, setDidStart] = useState(false)
  const [servicesAutoComplete, setServicesSetAutoComplete] = useState([])

  const services = [
    'Heating Services (Includes Boiler Service, Installation and Repair)',
    'Carpet Cleaning',
    'Upholstery Cleaning',
    'Deep/Oven/End of Tenancy Cleaning',
    'Beauty Treatments',
    'Mobile Car Valeting',
    'Gutter Cleaning',
    'Patio Cleaning',
    'EV Charger Installer',
  ]

  function onSubmit() {
    dispatch(submitFormAction(values))
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setDidStart(false)
      setServicesSetAutoComplete([])
    })
    router.events.off('routeChangeComplete', () => {
      setDidStart(false)
      setServicesSetAutoComplete([])
    })
  }, [router.events])

  const handleResetForm = () => {
    setDidStart(false)
    dispatch(resetFormAction())
    clearFormState()
    setServicesSetAutoComplete([])
  }

  useEffect(() => {
    console.log('values::', values)
  }, [values])

  const traderSignup = () => {
    Router.push(`/trader-signup`)
  }

  return (
    <>
      <section className="us__banner__wrapper" id="us__trader__banner">
        <div className="us__banner__container us__container">
          <div className="us__banner__flex">
            <div className="banner__flex__item banner__video">
              <div className="banner__video__holder">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/OuUWFmPTHVk?rel=0"
                  title="Urbanserve Promo"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="banner__flex__item banner__card">
              <div className="banner__card__body">
                {isSubmittingTraderForm ? (
                  <>
                    <Loader active inline="centered" />
                  </>
                ) : !isTraderFormSubmitSuccess && didStart ? (
                  <div className="banner__form">
                    <h4 className="form__header">Your Details</h4>
                    <TextField
                      {...getFieldProps('name')}
                      error={!!(touched.name && errors.name)}
                      className="form__input"
                      id="us-name"
                      label="Name*"
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      {...getFieldProps('business_name')}
                      error={!!(touched.business_name && errors.business_name)}
                      className="form__input"
                      id="us-name"
                      label="Business Name"
                      helperText={touched.business_name && errors.business_name}
                    />
                    <TextField
                      {...getFieldProps('position')}
                      error={!!(touched.position && errors.position)}
                      className="form__input"
                      id="us-name"
                      label="Position"
                      helperText={touched.position && errors.position}
                    />
                    <TextField
                      {...getFieldProps('email')}
                      error={!!(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      className="form__input"
                      id="us-name"
                      label="Email*"
                    />
                    <TextField
                      {...getFieldProps('contact_no')}
                      error={!!(touched.contact_no && errors.contact_no)}
                      helperText={touched.contact_no && errors.contact_no}
                      className="form__input"
                      id="us-name"
                      label="Contact Number"
                    />
                    <TextField
                      {...getFieldProps('postcode')}
                      error={!!(touched.postcode && errors.postcode)}
                      helperText={touched.postcode && errors.postcode}
                      className="form__input"
                      id="us-name"
                      label="Postcode"
                    />
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={services}
                      className="form__input"
                      value={servicesAutoComplete}
                      getOptionLabel={(option) => option}
                      onChange={(event, newValue) => {
                        handleChange('type_of_services')({
                          target: {
                            value:
                              newValue.length == 0
                                ? ''
                                : JSON.stringify(newValue?.map((x) => x)),
                          },
                          persist: () => {},
                        })
                        setServicesSetAutoComplete(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={
                            !!(
                              touched.type_of_services &&
                              errors.type_of_services
                            )
                          }
                          helperText={
                            touched.type_of_services && errors.type_of_services
                          }
                          variant="standard"
                          label="Services"
                        />
                      )}
                    />
                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        className="us__primary__btn form__btn"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                ) : !isTraderFormSubmitSuccess ? (
                  <>
                    <h1 className="banner__card__header">
                      Is your business looking to expand & maximise its
                      potential at no additional cost?
                    </h1>
                    <p className="banner__card__info">
                      UrbanServe can revamp your customer reach to attain the
                      full potential of your business. Entering the new turf for
                      scaling your business is expensive, but with UrbanServe,
                      you can take a leap of expansion with just a click and
                      find new customers never sought before.
                    </p>
                    {/* <button className='us__primary__btn' onClick={() => setDidStart(true)}>Start now</button> */}
                    <button
                      className="us__primary__btn"
                      onClick={() => traderSignup()}
                      style={{cursor: 'pointer'}}
                    >
                      Join Us
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="us__greet__text">Thank you!</h4>
                    <p onClick={handleResetForm} className="us__submit__text">
                      Submit another response.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
