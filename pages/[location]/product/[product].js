import React, {useEffect, useState} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'

/* Components */
import SiteMainNavbar from '../../../components/SiteMain/SiteMainNavbar'

/* Material ui */
import {withStyles} from '@material-ui/core/styles'
import {Box, FormControl, makeStyles, MenuItem, Select} from '@material-ui/core'

/* Semantic UI */
import {Grid, Segment, Loader} from 'semantic-ui-react'

/* Next JS */
import Router, {useRouter} from 'next/router'
import Link from 'next/link'
import SiteFooter from '../../../components/SiteFooter'

/* Next Js Image */
import Image from 'next/image'

/* Actions */
import {
  getProductDetailsRequest,
  getProductQARequest,
} from '../../../Stores/ProductDetails/actions'
import {
  validateProductRequest,
  validateLocationRequest,
  resetValidateProduct,
  resetValidateLocation,
} from '../../../Stores/GroupDetails/actions'
import {addCart} from '../../../Stores/Cart/actions'

/* Helper Packages */
import {useMediaQuery} from 'react-responsive'

const styles = (theme) => ({})
const useStyles = makeStyles((theme) => ({
  prevBox: {
    position: 'absolute',
    left: '-15%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  largePrevBtn: {
    position: 'absolute',
    left: '0%',
    top: '40%',
    transform: 'translate(-50%, -40%)',
  },
  prevButton: {
    minHeight: '94px',
    width: '58px',
    background: 'white',
    border: '2px solid #C1C1C1',
    color: '#FCBF49',
    paddingLeft: '1.2rem',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
}))

function ProductComponent({
  fetchProductDetails,
  productDetails,
  fetchProductQADetails,
  productQADetails,
  addProductToCart,
  validateProductRequest,
  validateLocationRequest,
  isValidatingLocation,
  isLocationValid,
  isValidatingProduct,
  isProductValid,
  resetValidateProduct,
  resetValidateLocation,
}) {
  // Check if tablet or mobile screen is active
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})

  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  const router = useRouter()
  const classes = useStyles()

  /* Set product name from router */
  const [productName, setProductName] = useState(null)

  /* Set product name from router */
  const [groupName, setGroupName] = useState(null)

  /* Generic update statement */
  const [update, setUpdate] = useState(false)

  const [arrowEnter, setArrowEnter] = useState(false)

  /* Direct Route Access Tracker State */
  const [isAccessFromUrl, setIsAccessFromUrl] = useState(false)
  const [urlAccessLocation, setUrlAccessLocation] = useState(null)

  /* Direct Route Access Loader State */
  const [isCheckingLocation, setIsCheckingLocation] = useState(false)
  const [urlAccessLocationValid, setUrlAccessLocationValid] = useState(null)

  /* Validate Product if location is valid */
  const [isCheckingProduct, setIsCheckingProduct] = useState(false)
  const [urlAccessProductValid, setUrlAccessProductValid] = useState(false)

  /* Set isAccessFromUrl to true */
  useEffect(() => {
    if (router && router?.components?.['/[location]'] === undefined) {
      setIsAccessFromUrl(true)
    } else {
      setIsAccessFromUrl(false)
    }

    if (isAccessFromUrl) {
      setUrlAccessLocation(router?.query?.location)
    }

    if (isAccessFromUrl && urlAccessLocation) {
      validateLocationRequest(urlAccessLocation)
    }
  }, [router, isAccessFromUrl, urlAccessLocation])

  /* Initialize direct route access loader state */

  useEffect(() => {
    if (urlAccessLocation && urlAccessLocation) {
      if (isValidatingLocation) {
        setIsCheckingLocation(true)
      } else {
        setIsCheckingLocation(false)
      }
      if (typeof isLocationValid === 'object') {
        setUrlAccessLocationValid(true)
      } else {
        setUrlAccessLocationValid(false)
      }
    }

    /* If location is valid, validate category */
    if (
      urlAccessLocation &&
      urlAccessLocationValid &&
      isLocationValid?.length >= 1 &&
      productName
    ) {
      validateProductRequest({
        group_id: isLocationValid?.[0]?.uuid,
        search: productName.replaceAll('-', ' '),
        type: 'product',
      })
    }
  }, [
    isAccessFromUrl,
    urlAccessLocation,
    isValidatingLocation,
    isLocationValid,
    urlAccessLocationValid,
  ])

  useEffect(() => {
    if (isValidatingProduct) {
      setIsCheckingProduct(true)
    } else {
      setIsCheckingProduct(false)
    }
    if (typeof isProductValid === 'object' && isProductValid?.length > 0) {
      setUrlAccessProductValid(true)
    } else {
      setUrlAccessProductValid(false)
    }
  }, [isValidatingProduct, isProductValid])

  useEffect(() => {
    return () => {
      resetValidateProduct()
      resetValidateLocation()
    }
  }, [])

  // Product QA State
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [ProductQAsValues, setProductQAsValues] = useState([])
  const [allQAs, setAllQAs] = useState([])

  /* Selected QA For highlight */
  const [selectedQA, setSelectedQA] = useState([])

  const [selectedManufacture, setSelectedManufacture] = useState(
    'Select Manufacture',
  )
  const [selectedModel, setSelectedModel] = useState('Select Model')

  const [dropDownNextQuestion, setDropDownNextQuestion] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [dropDownQuestions, setDropDownQuestion] = useState([])

  useEffect(() => {
    if (router && router?.query?.location) {
      setGroupName(router?.query?.location)
    }
    if (router && router?.query?.product) {
      setProductName(router?.query?.product)
    }
  }, [router])

  function selectHandler(data) {
    let tempData = JSON.parse(JSON.stringify(selectedQA))
    let incoming_qa = JSON.parse(JSON.stringify(data))
    var indexOfQa = tempData.findIndex(
      (i) => i.question_id === data?.question_id,
    )

    if (indexOfQa > -1) {
      let data = {
        ...incoming_qa,
      }
      tempData.splice(indexOfQa, 1, data)
    } else {
      tempData?.push(incoming_qa)
    }
    setSelectedQA(tempData)
  }

  /* Product Qa Complete tracker */
  const [isFinish, setIsFinish] = useState(false)

  /* Product QA Progress tracker */
  const [progressCount, setProgressCount] = useState(0)

  /* Product qa total price */
  const [price, setPrice] = useState(0)

  /* Fetch product details based on product name */
  useEffect(() => {
    if (
      productName !== null &&
      productName !== '' &&
      productName !== undefined &&
      isLocationValid?.length > 0
    ) {
      fetchProductDetails({
        productSlug: productName,
        group_id: isLocationValid?.[0]?.uuid,
      })
    }
  }, [productName, isLocationValid])

  // Fetch Product QA
  useEffect(() => {
    if (productDetails && productDetails?.id) {
      fetchProductQADetails({product_id: productDetails?.id})
    }
  }, [productDetails])

  /* Set Product QA Data  */
  useEffect(() => {
    if (productQADetails && productQADetails?.length > 0) {
      setCurrentQuestion(productQADetails?.[0])
      setAllQAs(productQADetails)
      setProductQAsValues([])
      setProgressCount(0)

      let dropDownQuestions = productQADetails.filter(
        (val) => val?.is_answer_dropdown == true,
      )

      if (dropDownQuestions.length > 0) {
        setDropDown(true)
        setDropDownQuestion(dropDownQuestions)
      } else {
        setDropDown(false)
      }
    }
  }, [productQADetails])

  /* Product QA Answer Select Handler */
  const onSelectAnswer = (value, question) => {
    let tempData = JSON.parse(JSON.stringify(ProductQAsValues))

    let qCount = questionCount
    let queExists = tempData.filter((ele) => ele.question == question.id)

    let data = {
      question_title: currentQuestion?.question_title,
      question: currentQuestion.id,
      answer_title: value?.answer_title,
      answer: value.id,
      value: value?.value,
      image: value?.answer_image,
    }
    if (queExists.length == 0) {
      qCount = qCount + 1
      let data = {
        question_title: question?.question_title,
        question: question.id,
        answer_title: value?.answer_title,
        answer: value?.id,
        value: value?.value,
        image: value?.answer_image,
      }
      tempData.push(data)
    } else {
      let index = tempData.findIndex((v) => v.question == question.id)
      tempData[index].answer_title = value?.answer_title
      tempData[index].answer = value?.id
      tempData[index].value = value?.value
      tempData[index].image = value?.answer_image
    }
    if (value?.value != '' || value?.value != 0) {
      let priceVal = parseInt(price) + parseInt(value?.value)
      setPrice(priceVal)
    }
    // }
    setProductQAsValues(tempData)

    setQuestionCount(qCount)
    if (qCount >= 2) {
      setDropDown(false)
    }

    if (value?.is_finished || value?.next_question == null) {
      onFinish(tempData)
      setIsFinish(true)
    } else {
      allQAs.length > 0 &&
        allQAs.map((ele) => {
          if (value.next_question == ele.id) {
            if (qCount >= 2) {
              setCurrentQuestion(ele)
            } else {
              if (question?.is_answer_dropdown) {
                setDropDownNextQuestion(ele)
              } else {
                setCurrentQuestion(ele)
              }
            }
          }
        })
    }
    let QaCount = allQAs.length
    let tempCount = tempData.length * 100
    setProgressCount(tempCount / QaCount)

    setUpdate(!update)
  }

  /* Previous Question Handler */
  const onPrev = () => {
    let tempData = JSON.parse(JSON.stringify(ProductQAsValues))
    if (tempData.length > 0) {
      let prevId = tempData[tempData.length - 1].question
      allQAs.length > 0 &&
        allQAs.map((ele) => {
          if (prevId == ele.id) {
            if (ele?.is_answer_dropdown) {
              setDropDown(true)
              setQuestionCount(questionCount - 1)
            }
            setCurrentQuestion(ele)
            tempData.pop()
          }
        })
      setProductQAsValues(tempData)
      let QaCount = allQAs.length
      let tempCount = tempData.length * 100
      setProgressCount(tempCount / QaCount)
      setQuestionCount(questionCount - 1)
    }
  }

  const onFinish = (data) => {
    // props.onProductQaSubmit(data);
  }

  /* Product QA total price */
  useEffect(() => {
    var total = 0
    ProductQAsValues.forEach((item) => {
      if (item?.value !== null && item?.value !== '') {
        total += parseInt(item?.value)
      } else if (
        item?.value === null ||
        item?.value === '' ||
        item?.value === 'NA'
      ) {
        setIsValueNull(true)
      }
    })
    setPrice(total)
  }, [ProductQAsValues])

  useEffect(() => {
    if (isFinish) {
      let product = {
        product_qa: ProductQAsValues,
        // quote_qa: quoteQuestions,
        quote_qa_grant_total: price,
        product: productDetails,
      }
      if (product) {
        addProductToCart(product)
        localStorage.setItem('cartItems', JSON.stringify(product))
        localStorage.setItem(
          'actiserve_cart_productqa_values',
          JSON.stringify(ProductQAsValues),
        )
        localStorage.setItem(
          'actiserve_cart_productqa_details',
          JSON.stringify(productQADetails),
        )
        localStorage.setItem(
          'actiserve_cart_product',
          JSON.stringify(productDetails),
        )
      }
      if (productDetails?.product_include_items?.length > 0) {
        localStorage.setItem(
          'urbanserve_includes_items',
          JSON.stringify(productDetails?.product_include_items),
        )
      } else {
        localStorage.setItem('urbanserve_includes_items', JSON.stringify([]))
      }
      localStorage.setItem(
        'urbanserve_current_product',
        JSON.stringify(productDetails?.id),
      )
      Router.push('/site-summary')
    }
  }, [ProductQAsValues, productQADetails, isFinish])

  const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

  const toBase64 = (str) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return (
    <>
      {isAccessFromUrl ? (
        isCheckingLocation || isCheckingProduct ? (
          <Loader active inline="centered" style={{}} />
        ) : urlAccessLocationValid && urlAccessProductValid ? (
          <>
            <SiteMainNavbar />

            {productQADetails?.length > 0 && isFinish === false && (
              <>
                <section className="ldp__quote__wrapper">
                  <div className="ldp__quote__container">
                    {productQADetails?.length > 0 && (
                      <div className="ldp__quote__bar__section">
                        <Grid
                          className="ldp__quote__bar__grid"
                          columns={'equal'}
                        >
                          {productQADetails?.map((ele, i) => (
                            <Grid.Column
                              style={{
                                paddingLeft: '0rem',
                                paddingRight: '0rem',
                              }}
                            >
                              <div
                                className="ldp__quote__bar"
                                style={{
                                  background:
                                    ProductQAsValues?.length >= i
                                      ? '#0587ff'
                                      : '#E9E9E9',
                                }}
                              ></div>
                            </Grid.Column>
                          ))}
                        </Grid>
                      </div>
                    )}
                  </div>
                </section>
                <section className="ldp__quote__wrapper">
                  <div className="ldp__quote__container container">
                    <div className="ldp__quote__que__counter">
                      <div className="ldp__quote__header">
                        {/* <h2 className="ldp-quote-que-count">question {ProductQAsValues?.length === 0 ? 1 : ProductQAsValues?.length + 1} of {productQADetails?.length}</h2> */}
                        <h1 className="ldp__quote__product_title">
                          {productDetails?.title}
                        </h1>
                        <h1 className="ldp__quote__que__title">
                          {currentQuestion?.question_title}
                        </h1>
                      </div>
                    </div>
                    <Grid textAlign="center" stackable columns={5}>
                      <Grid.Row
                        textAlign="center"
                        className="ldp__quote__row"
                        style={{padding: '0rem 0rem !important'}}
                      >
                        {dropDown ? (
                          <>
                            <Box>
                              <FormControl variant="outlined" size="small">
                                <span> Select Manufacuture </span>
                                <Select
                                  size="small"
                                  variant="outlined"
                                  style={{width: '250px'}}
                                  value={selectedManufacture}
                                  className={classes.textCapitalize}
                                  // onChange={(e) => {
                                  //   onSelectAnswer(ele);
                                  // }}
                                >
                                  {dropDownQuestions[0] !== '' &&
                                    dropDownQuestions[0]?.answers.length > 0 &&
                                    dropDownQuestions[0].answers.map(
                                      (ele, i) => (
                                        <MenuItem
                                          key={i}
                                          value={ele?.answer_title}
                                          className={classes.textCapitalize}
                                          onClick={() => {
                                            onSelectAnswer(
                                              ele,
                                              dropDownQuestions[0],
                                            )
                                            setSelectedManufacture(
                                              ele?.answer_title,
                                            )
                                          }}
                                        >
                                          {ele?.answer_title}
                                        </MenuItem>
                                      ),
                                    )}
                                </Select>
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl variant="outlined" size="small">
                                <span> Select Model </span>
                                <Select
                                  size="small"
                                  variant="outlined"
                                  style={{width: '250px'}}
                                  value={selectedModel}
                                  className={classes.textCapitalize}
                                  // onChange={(e) => {
                                  //   onSelectAnswer(ele);
                                  // }}
                                >
                                  {dropDownNextQuestion !== '' &&
                                    dropDownNextQuestion?.answers.length > 0 &&
                                    dropDownNextQuestion.answers.map(
                                      (ele, i) => (
                                        <MenuItem
                                          key={i}
                                          value={ele?.answer_title}
                                          className={classes.textCapitalize}
                                          onClick={() => {
                                            onSelectAnswer(
                                              ele,
                                              dropDownNextQuestion,
                                            )
                                            setSelectedModel(ele?.answer_title)
                                          }}
                                        >
                                          {ele?.answer_title}
                                        </MenuItem>
                                      ),
                                    )}
                                </Select>
                              </FormControl>
                            </Box>
                          </>
                        ) : (
                          currentQuestion !== '' &&
                          currentQuestion?.answers &&
                          currentQuestion?.answers.length > 0 &&
                          currentQuestion?.answers.map((ele, i) => {
                            return (
                              <Grid.Column
                                className="ldp__quote__column"
                                onClick={() => {
                                  onSelectAnswer(ele, currentQuestion)
                                  // selectHandler(ele)
                                }}
                                style={{padding: '0rem 0rem !important'}}
                              >
                                <Segment
                                  className={
                                    selectedQA?.filter(
                                      (data) => ele?.id === data?.id,
                                    )?.length > 0
                                      ? `ldp__quote__segment ldp__quote__column__selected`
                                      : `ldp__quote__segment `
                                  }
                                >
                                  <div className="ldp__quote__image">
                                    {ele?.answer_image ? (
                                      <img
                                        src={
                                          ele?.answer_image?.type === 'public'
                                            ? `${ele?.answer_image?.file_path}`
                                            : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${ele?.answer_image?.id}/show-file`
                                        }
                                        alt="Urbanserve Service Icon"
                                        width="100%"
                                      />
                                    ) : (
                                      <img
                                        src="/site__main__images/product__image.png"
                                        width="100%"
                                      />
                                    )}
                                    {/* <Image
                                    src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.answer_image}&width=60&height=48`}
                                    alt="Urbanserve Product Icon"
                                    quality={100}
                                    width={isTabletOrMobile ? 60 : '100%'}
                                    height={isTabletOrMobile ? 48 : '100%'}
                                    className="drawer__item__img"
                                    // blurDataURL={rgbDataURL(5, 135, 255)}
                                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(100, 200))}`}
                                    placeholder="blur"
                                  /> */}
                                  </div>
                                  <p style={{margin: '0'}}>
                                    {ele?.answer_title}
                                  </p>
                                  {selectedQA?.filter(
                                    (data) => ele?.id === data?.id,
                                  )?.length > 0 ? (
                                    <div className="ldp__quote__checked">
                                      <img
                                        src="/site__main__images/site__check__blue.png"
                                        style={{
                                          width: '100%',
                                          height: 'auto',
                                          objectFit: 'cover',
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </Segment>
                              </Grid.Column>
                            )
                          })
                        )}
                        <Box className={`${classes.prevBox} ldp__prevBox`}>
                          {!dropDown && ProductQAsValues.length > 0 && (
                            <Box
                              variant="contained"
                              color="primary"
                              className={classes.prevButton}
                              onClick={() => {
                                onPrev()
                                setArrowEnter(false)
                              }}
                              // onMouseOver={() => setArrowEnter(true)}
                              // onMouseOut={() => setArrowEnter(false)}
                            >
                              <img
                                src="/site__main__images/site__arrow__left.png"
                                width="22px"
                                height="40px"
                                style={{marginRight: '10x'}}
                              />
                            </Box>
                          )}
                        </Box>
                      </Grid.Row>
                    </Grid>
                  </div>
                </section>

                {ProductQAsValues.length > 0 && (
                  <div className="ldp__quote__handler">
                    <div
                      className="ldp__quote__handler__img"
                      onClick={() => {
                        onPrev()
                        setArrowEnter(false)
                      }}
                    >
                      <img
                        src="/site__main__images/site__arrow__left.png"
                        width="100%"
                      />
                    </div>
                  </div>
                )}

                {/* Site Footer Start */}
                <SiteFooter />
                {/* Site Footer End */}
              </>
            )}
          </>
        ) : (
          <div
            align="center"
            style={{
              height: '100vh ',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p>St. 404, Ghost Town.</p>
            <p>
              Looks like the page you're looking for has been moved or does'nt
              exists
            </p>
            <Link href="/">
              <a>Go to Homepage.</a>
            </Link>
          </div>
        )
      ) : (
        <>
          <SiteMainNavbar />

          {productQADetails?.length > 0 && isFinish === false && (
            <>
              <section className="ldp__quote__wrapper">
                <div className="ldp__quote__container">
                  {productQADetails?.length > 0 && (
                    <div className="ldp__quote__bar__section">
                      <Grid className="ldp__quote__bar__grid" columns={'equal'}>
                        {productQADetails?.map((ele, i) => (
                          <Grid.Column
                            style={{paddingLeft: '0rem', paddingRight: '0rem'}}
                          >
                            <div
                              className="ldp__quote__bar"
                              style={{
                                background:
                                  ProductQAsValues?.length >= i
                                    ? '#0587ff'
                                    : '#E9E9E9',
                              }}
                            ></div>
                          </Grid.Column>
                        ))}
                      </Grid>
                    </div>
                  )}
                </div>
              </section>
              <section className="ldp__quote__wrapper">
                <div className="ldp__quote__container container">
                  <div className="ldp__quote__que__counter">
                    <div className="ldp__quote__header">
                      {/* <h2 className="ldp-quote-que-count">question {ProductQAsValues?.length === 0 ? 1 : ProductQAsValues?.length + 1} of {productQADetails?.length}</h2> */}
                      <h1 className="ldp__quote__product_title">
                        {productDetails?.title}
                      </h1>
                      <h1 className="ldp__quote__que__title">
                        {currentQuestion?.question_title}
                      </h1>
                    </div>
                  </div>
                  <Grid textAlign="center" stackable columns={5}>
                    <Grid.Row
                      textAlign="center"
                      className="ldp__quote__row"
                      style={{padding: '0rem 0rem !important'}}
                    >
                      {dropDown ? (
                        <>
                          <Box>
                            <FormControl variant="outlined" size="small">
                              <span> Select Manufacuture </span>
                              <Select
                                size="small"
                                variant="outlined"
                                style={{width: '250px'}}
                                value={selectedManufacture}
                                className={classes.textCapitalize}
                                // onChange={(e) => {
                                //   onSelectAnswer(ele);
                                // }}
                              >
                                {dropDownQuestions[0] !== '' &&
                                  dropDownQuestions[0]?.answers.length > 0 &&
                                  dropDownQuestions[0].answers.map((ele, i) => (
                                    <MenuItem
                                      key={i}
                                      value={ele?.answer_title}
                                      className={classes.textCapitalize}
                                      onClick={() => {
                                        onSelectAnswer(
                                          ele,
                                          dropDownQuestions[0],
                                        )
                                        setSelectedManufacture(
                                          ele?.answer_title,
                                        )
                                      }}
                                    >
                                      {ele?.answer_title}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl variant="outlined" size="small">
                              <span> Select Model </span>
                              <Select
                                size="small"
                                variant="outlined"
                                style={{width: '250px'}}
                                value={selectedModel}
                                className={classes.textCapitalize}
                                // onChange={(e) => {
                                //   onSelectAnswer(ele);
                                // }}
                              >
                                {dropDownNextQuestion !== '' &&
                                  dropDownNextQuestion?.answers.length > 0 &&
                                  dropDownNextQuestion.answers.map((ele, i) => (
                                    <MenuItem
                                      key={i}
                                      value={ele?.answer_title}
                                      className={classes.textCapitalize}
                                      onClick={() => {
                                        onSelectAnswer(
                                          ele,
                                          dropDownNextQuestion,
                                        )
                                        setSelectedModel(ele?.answer_title)
                                      }}
                                    >
                                      {ele?.answer_title}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </>
                      ) : (
                        currentQuestion !== '' &&
                        currentQuestion?.answers &&
                        currentQuestion?.answers.length > 0 &&
                        currentQuestion?.answers.map((ele, i) => {
                          return (
                            <Grid.Column
                              className="ldp__quote__column"
                              onClick={() => {
                                onSelectAnswer(ele, currentQuestion)
                                // selectHandler(ele)
                              }}
                              style={{padding: '0rem 0rem !important'}}
                            >
                              <Segment
                                className={
                                  selectedQA?.filter(
                                    (data) => ele?.id === data?.id,
                                  )?.length > 0
                                    ? `ldp__quote__segment ldp__quote__column__selected`
                                    : `ldp__quote__segment `
                                }
                              >
                                <div className="ldp__quote__image">
                                  {ele?.answer_image ? (
                                    <img
                                      src={
                                        ele?.answer_image?.type === 'public'
                                          ? `${ele?.answer_image?.file_path}`
                                          : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${ele?.answer_image?.id}/show-file`
                                      }
                                      alt="Urbanserve Service Icon"
                                      width="100%"
                                    />
                                  ) : (
                                    <img
                                      src="/site__main__images/site__chevron__left.png"
                                      className="drawer__item__img"
                                      width="100%"
                                    />
                                  )}
                                </div>
                                <p style={{margin: '0'}}>{ele?.answer_title}</p>
                                {selectedQA?.filter(
                                  (data) => ele?.id === data?.id,
                                )?.length > 0 ? (
                                  <div className="ldp__quote__checked">
                                    <img
                                      src="/site__main__images/site__check__blue.png"
                                      style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  </div>
                                ) : (
                                  ''
                                )}
                              </Segment>
                            </Grid.Column>
                          )
                        })
                      )}
                      <Box className={`${classes.prevBox} ldp__prevBox`}>
                        {!dropDown && ProductQAsValues.length > 0 && (
                          <Box
                            variant="contained"
                            color="primary"
                            className={classes.prevButton}
                            onClick={() => {
                              onPrev()
                              setArrowEnter(false)
                            }}
                            // onMouseOver={() => setArrowEnter(true)}
                            // onMouseOut={() => setArrowEnter(false)}
                          >
                            <img
                              src="/site__main__images/site__arrow__left.png"
                              width="22px"
                              height="40px"
                              style={{marginRight: '10x'}}
                            />
                          </Box>
                        )}
                      </Box>
                    </Grid.Row>
                  </Grid>
                </div>
              </section>

              {ProductQAsValues.length > 0 && (
                <div className="ldp__quote__handler">
                  <div
                    className="ldp__quote__handler__img"
                    onClick={() => {
                      onPrev()
                      setArrowEnter(false)
                    }}
                  >
                    <img
                      src="/site__main__images/site__arrow__left.png"
                      width="100%"
                    />
                  </div>
                </div>
              )}

              {/* Site Footer Start */}
              <section className="site__footer__wrapper site__qa__footer__pb">
                <div className="site__footer__container container">
                  <Grid stackable columns={3} className="site__footer__content">
                    <Grid.Column className="site__footer__col__one">
                      <ul>
                        <li>Urbanserve</li>
                        <li>Find Services</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Tradespeople</li>
                      </ul>
                    </Grid.Column>
                    <Grid.Column
                      className="site__footer__col__two vertical-space"
                      style={{display: 'flex'}}
                    >
                      <div>
                        <h3>Data Safe</h3>
                        <p>Your details are kept safe and never shared</p>
                      </div>
                      <div>
                        <h3>Gas Safe</h3>
                        <p>Our engineers are vetted and fully qualifed</p>
                      </div>
                    </Grid.Column>
                    <Grid.Column className="site__footer__col__three">
                      <div>
                        <h3>Download Now</h3>
                        <div className="site__footer__app__links">
                          <img
                            src="/images/footer-apple-app.png"
                            width="100%"
                          />
                          <img src="/images/footer-gapp.png" width="100%" />
                        </div>
                      </div>
                      <div className="site__footer__payment">
                        <img src="/images/footer-payment.png" width="100%" />
                      </div>
                    </Grid.Column>
                  </Grid>
                  <Grid
                    textAlign="center"
                    className="site__footer__logo"
                    style={{padding: '0rem'}}
                  >
                    <Grid.Column mobile={16}>
                      <img
                        src="/site__main__images/logo__light.png"
                        width="100%"
                        alt=""
                      />
                      <p className="site__footer__text">
                        Copyright © 2010 - 2021 UrbanServe Ltd. All rights
                        reserved.
                      </p>
                    </Grid.Column>
                  </Grid>
                </div>
              </section>
              {/* Site Footer End */}
            </>
          )}
        </>
      )}
    </>
  )
}
const mapStateToProps = (state) => ({
  productDetails: state.ProductDetailsReducer?.productDetails,

  /* Product QA Data */
  isFetchingProductQADetails:
    state.ProductDetailsReducer?.isFetchingProductQADetails,
  productQADetails: state.ProductDetailsReducer?.productQADetails,
  isValidatingLocation: state.groupDetailsReducer?.isValidatingLocation,
  isLocationValid: state.groupDetailsReducer?.isLocationValid,
  isValidatingProduct: state.groupDetailsReducer?.isValidatingProduct,
  isProductValid: state.groupDetailsReducer?.isProductValid,
})

const mapDispatchToProps = (dispatch) => {
  return {
    /* Product Details */
    fetchProductDetails: (data) => dispatch(getProductDetailsRequest(data)),
    /* Product QA Data */
    fetchProductQADetails: (data) => dispatch(getProductQARequest(data)),
    /* Add to cart */
    addProductToCart: (...args) => dispatch(addCart(...args)),
    /* Product Validation */
    validateProductRequest: (data) => dispatch(validateProductRequest(data)),
    /* Group Validation */
    validateLocationRequest: (data) => dispatch(validateLocationRequest(data)),
    resetValidateProduct: (data) => dispatch(resetValidateProduct(data)),
    resetValidateLocation: (data) => dispatch(resetValidateLocation(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(ProductComponent))
