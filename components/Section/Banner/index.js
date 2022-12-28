import React, {useState, useEffect} from 'react'
import Images from '../../../Assets/Icons'
import Image from 'next/image'

import {useDispatch, useSelector} from 'react-redux'

import {Checkbox} from 'semantic-ui-react'
// import Flip from 'react-reveal/Flip'
import * as Yup from 'yup'

import TextField from '@material-ui/core/TextField'
import useValidator from '../../../utils/useValidator'

import {useRouter} from 'next/router'
import {Loader} from 'semantic-ui-react'
import actions from '../../../Stores/Promotion/actions'
const submitFormAction = actions.submitDetailsForm
const resetFormAction = actions.resetSubmitDetailsForm

const defaultQuestions = [
  {
    id: 1,
    question:
      'Have you had one or more of the following difficulties while booking trademan?',
    answers: [
      {
        id: 11,
        title: 'Calling several professional to get quote for one job',
        checked: false,
      },
      {
        id: 12,
        title:
          'Posting job online and not getting responses or not efficient enough to get job done on time',
        checked: false,
      },
      {
        id: 13,
        title: 'Not able to clearly explain your task over the phone',
        checked: false,
      },
      {
        id: 14,
        title: 'Explaining same thing to multiple professional',
        checked: false,
      },
      {
        id: 15,
        title: `Promised a callback and you might not receive one or you would get a callback but it's not the right time for you.`,
        checked: false,
      },
      {
        id: 16,
        title:
          'You gave up booking service as it was time consuming and not simple to find right professional',
        checked: false,
      },
    ],
  },
  {
    id: 2,
    question: 'How like are you to use UrbanServe when available to book?',
    answers: [
      {
        id: 20,
        title: 'I would use UrbanServe',
        checked: false,
      },
      {
        id: 21,
        title: 'I would still carry on conventionally',
        checked: false,
      },
      {
        id: 22,
        title: 'I would at least consider UrbanServe as option',
        checked: false,
      },
    ],
  },
  {
    id: 3,
    question: `Which service you or member of your household are more likely to book using UrbanServe?`,
    answers: [
      {
        id: 30,
        title: 'Carpet &. Upholstery Cleaning',
        checked: false,
      },
      {
        id: 31,
        title:
          'Mobile Beauty Treatments e.g Face Treatments, Waxing, Body Treatments',
        checked: false,
      },
      {
        id: 32,
        title: 'Mobile Car Valeting',
        checked: false,
      },
      {
        id: 33,
        title: 'Deep Home Cleaning/End of Tenancy Cleaning',
        checked: false,
      },
      {
        id: 34,
        title: 'Boiler Service',
        checked: false,
      },
    ],
  },
]

export default function Banner() {
  const dispatch = useDispatch()
  const router = useRouter()
  const {isSubmittingForm, isFormSubmitSuccess} = useSelector(
    (state) => state?.PromotionReducer,
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
      email: '',
      contact_no: '',
      postcode: '',
      responses: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required!'),
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
    }),
  })

  const [stepQuestions, setStepQuestions] = useState([
    {
      id: 1,
      question:
        'Have you had one or more of  thefollowing difficulties while booking any professional services like Carpet Cleaning, Beauty Treatments, Mobile Car Valeting, End of Tenancy/Deep Cleaning, Boiler Service, Boiler Installation?',
      answers: [
        {
          id: 11,
          title: 'Calling several professional to get quote for one job',
          checked: false,
        },
        {
          id: 12,
          title:
            'Posting job online and not getting responses or not efficient enough to get job done on time',
          checked: false,
        },
        {
          id: 13,
          title: 'Not able to clearly explain your task over the phone',
          checked: false,
        },
        {
          id: 14,
          title: 'Explaining same thing to multiple professional',
          checked: false,
        },
        {
          id: 15,
          title: `Promised a callback and you might not receive one or you would get a callback but it's not the right time for you.`,
          checked: false,
        },
        {
          id: 16,
          title:
            'You gave up booking service as it was time consuming and not simple to find right professional',
          checked: false,
        },
      ],
    },
    {
      id: 2,
      question:
        'Do you think existing solution or online job quoting is not 100% efficient or you would prefer app/website like UrbanServe when available to book?',
      answers: [
        {
          id: 20,
          title: 'I would use UrbanServe',
          checked: false,
        },
        {
          id: 21,
          title: 'I would still carry on conventionally',
          checked: false,
        },
        {
          id: 22,
          title: 'I would at least consider UrbanServe as option',
          checked: false,
        },
      ],
    },
    {
      id: 3,
      question: `Which service you or member of your household are more likely to book if you get local upfront pricing and schedule it based on your availability using app and website; and also guarantees professional are vetted and insured?`,
      answers: [
        {
          id: 30,
          title: 'Carpet &. Upholstery Cleaning',
          checked: false,
        },
        {
          id: 31,
          title:
            'Mobile Beauty Treatments e.g Face Treatments, Waxing, Body Treatments',
          checked: false,
        },
        {
          id: 32,
          title: 'Mobile Car Valeting',
          checked: false,
        },
        {
          id: 33,
          title: 'Deep Home Cleaning/End of Tenancy Cleaning',
          checked: false,
        },
        {
          id: 34,
          title: 'Boiler Service',
          checked: false,
        },
      ],
    },
  ])
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [isStepQuestionCompleted, setIsStepQuestionCompleted] = useState(false)

  const [isValidated, setIsValidated] = useState(false)

  const [response, setResponse] = useState([])

  const [didStart, setDidStart] = useState(false)
  const [update, setUpdate] = useState(false)

  /* Set current question */
  useEffect(() => {
    if (stepQuestions?.length > 0) {
      let que = stepQuestions?.find((ele) => ele.id === 1)
      if (que) {
        setCurrentQuestion(que)
      }
    }
  }, [stepQuestions])

  /* Handler */
  const handleChecked = (e, checked, ele) => {
    const isChecked = checked?.checked

    let tempCurrentQuestion = JSON.parse(JSON.stringify(currentQuestion))

    let data = {
      checked: isChecked,
      id: ele?.id,
      title: ele?.title,
    }

    let tempAnsModifiedIndex = tempCurrentQuestion?.answers?.findIndex(
      (data) => data.id === ele?.id,
    )

    tempCurrentQuestion?.answers?.splice(tempAnsModifiedIndex, 1, data)
    setCurrentQuestion(tempCurrentQuestion)
  }

  const handleChangeQuestion = () => {
    if (isValidated) {
      let prevQueIndex = stepQuestions?.findIndex(
        (ele) => ele.id === currentQuestion.id,
      )
      prevQueIndex = prevQueIndex + 1
      let newQue = stepQuestions?.find((ele, i) => i === prevQueIndex)
      if (newQue) {
        setCurrentQuestion(newQue)
      }
    }
    if (currentQuestion && isValidated === true) {
      let tempResponse = JSON.parse(JSON.stringify(response))
      tempResponse.push(currentQuestion)
      setResponse(tempResponse)
    }
  }

  useEffect(() => {
    if (currentQuestion?.answers?.length > 0) {
      if (currentQuestion?.answers?.some((ele) => ele.checked === true)) {
        setIsValidated(true)
      } else {
        setIsValidated(false)
      }
    }
  }, [currentQuestion?.answers])

  useEffect(() => {
    if (response?.length === 3) {
      setIsStepQuestionCompleted(true)
    } else {
      setIsStepQuestionCompleted(false)
    }
  }, [response])

  function onSubmit() {
    let data = {
      name: values?.name,
      email: values?.email,
      postcode: values?.postcode,
      contact_no: values?.contact_no,
      responses: JSON.stringify(response),
    }
    dispatch(submitFormAction(data))
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setResponse([])
      setDidStart(false)
      setStepQuestions(defaultQuestions)
      dispatch(resetFormAction())
      clearFormState()
      setUpdate(!update)
      setIsStepQuestionCompleted(false)
    })
    router.events.off('routeChangeComplete', () => {
      setResponse([])
      setDidStart(false)
      setStepQuestions(defaultQuestions)
      dispatch(resetFormAction())
      clearFormState()
      setUpdate(!update)
      setIsStepQuestionCompleted(false)
    })
  }, [router.events])

  const handleResetForm = () => {
    setResponse([])
    setDidStart(false)
    setStepQuestions(defaultQuestions)
    dispatch(resetFormAction())
    clearFormState()
    setUpdate(!update)
    setIsStepQuestionCompleted(false)
    if (stepQuestions?.length > 0) {
      let que = stepQuestions?.find((ele) => ele.id === 1)
      if (que) {
        setCurrentQuestion(que)
      }
    }
  }

  return (
    <>
      <section className="us__banner__wrapper">
        <div className="us__banner__container us__container">
          <div className="us__banner__flex">
            <div className="banner__flex__item banner__video">
              <div className="banner__video__holder">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/OuUWFmPTHVk?rel=0"
                  title="Urbanserve Promo"
                  frameBorber="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="banner__flex__item banner__card">
              <div className="banner__card__body">
                {isSubmittingForm ? (
                  <>
                    <Loader active inline="centered" />
                  </>
                ) : !isFormSubmitSuccess && didStart ? (
                  isStepQuestionCompleted ? (
                    <>
                      <div className="banner__form ">
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
                          label="Contact number"
                        />
                        <TextField
                          {...getFieldProps('postcode')}
                          error={!!(touched.postcode && errors.postcode)}
                          helperText={touched.postcode && errors.postcode}
                          className="form__input"
                          id="us-name"
                          label="Postcode"
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
                    </>
                  ) : (
                    currentQuestion && (
                      <>
                        {/* <Flip left cascade> */}
                        <h3 className="que__counter">
                          Question {response?.length + 1} of 3
                        </h3>
                        <h5 className="que__header">
                          {currentQuestion?.question}
                        </h5>
                        {currentQuestion?.answers?.map((ele, k) => (
                          <div className="ans__box">
                            <Checkbox
                              className="ans__check__title"
                              checked={ele.checked}
                              onChange={(e, checked) =>
                                handleChecked(e, checked, ele)
                              }
                            />
                            <p className="ans__title">{ele?.title}</p>
                          </div>
                        ))}
                        <button
                          className={
                            isValidated
                              ? `us__primary__btn ans__btn`
                              : `disabled__btn ans__btn`
                          }
                          onClick={() => handleChangeQuestion()}
                        >
                          Next
                          <div
                            style={{
                              position: 'relative',
                              width: '20px',
                              height: '10px',
                              marginLeft: '5px',
                            }}
                          >
                            <Image
                              src={
                                isValidated
                                  ? Images.arrowRight
                                  : Images.arrowRightGrey
                              }
                              alt="Urbanserve"
                              layout="fill"
                              objectFit="contain"
                              quality={100}
                            />
                          </div>
                        </button>
                        {/* </Flip>  */}
                      </>
                    )
                  )
                ) : !isFormSubmitSuccess ? (
                  <>
                    <h1 className="banner__card__header text-center">
                      Hassle Free On Demand Services coming soon to Leicester
                    </h1>
                    <div className="banner__video__holder">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/OuUWFmPTHVk?rel=0"
                        frameborder="0"
                        title="Urbanserve Promo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    {/* <p className="banner__card__info text-center">
                      Watch our short video and answer 3 simple questions to
                      enter a chance to win £250 amazon gift card and receive up
                      to 15% percent discount by filling our short 1 min survey
                      for services like Carpet Cleaning, Beauty Treatments,
                      Mobile Car Valeting, End of Tenancy/Deep Cleaning, Boiler
                      Service, Boiler Installation on launch of UrbanServe
                    </p>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <button
                        className="us__primary__btn"
                        onClick={() => setDidStart(true)}
                      >
                        Start now
                      </button>
                    </div> */}
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
