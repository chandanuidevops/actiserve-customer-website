import React, {useEffect, useState, useRef} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'

/* Components */
import SiteMainNavbar from '../../../components/SiteMain/SiteMainNavbar'
import SiteFooter from '../../../components/SiteFooter'
import HelmetComponent from '../../../components/Helmet'
/* Material ui */
import {withStyles} from '@material-ui/core/styles'
import {
  Box,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Drawer,
  Typography,
} from '@material-ui/core'

/* Semantic UI */
import {Grid, Segment, Loader, Button, Card} from 'semantic-ui-react'

/* Next JS */
import Router, {useRouter} from 'next/router'
import Link from 'next/link'

/* Media query detector */
import {useMediaQuery} from 'react-responsive'

/* Actions */
import {
  getPackageBuilderRequest,
  getProductDetailsRequest,
  getProductQARequest,
  resetProductQA,
} from '../../../Stores/ProductDetails/actions'

import {
  validateProductRequest,
  validateLocationRequest,
  resetValidateProduct,
  resetValidateLocation,
  getGroupRequest,
} from '../../../Stores/GroupDetails/actions'
import {addCart} from '../../../Stores/Cart/actions'

import useScrollSpy from 'react-use-scrollspy'
import useWindowDimensions from '../../../utils/useDimenstion'

/* Next Js Image */
import Image from 'next/image'

import Head from 'next/head'

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
  qaDrawerClose: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  qaDrawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px 14px',
  },
  qaDrawerPaper: {
    width: '100%',
    height: '100vh',
    maxWidth: theme.breakpoints.values.sm * 0.75,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '16px',
  },
  dwr__pkg__desc__header: {
    fontFamily: 'Urbanist__semibold, sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#21262b',
    fontSize: '16px',
    lineHeight: '19px',
    paddingTop: '20px',
  },
  dwr__pkg__desc__info: {
    fontFamily: 'Urbanist, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'rgba(33, 38, 43, 0.7)',
    fontSize: '16px',
    lineHeight: '19px',
    paddingTop: '8px',
  },
  dwr__pkg__header: {
    fontFamily: 'Urbanist__semibold, sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#21262b',
    fontSize: '1.1rem',
    lineHeight: '1.4rem',
  },
  dwr__pkg__price: {
    fontFamily: 'Urbanist, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'rgba(33, 38, 43, 0.7)',
    fontSize: '1.714rem',
    lineHeight: '19px',
    fontSize: '16px',
    lineHeight: '19px',
    paddingTop: '10px',
  },
  drawerInner: {
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
  fetchPackageBuilder,
  isFetchingProductQADetails,
  resetProductQA,
  validateProductRequest,
  validateLocationRequest,
  isValidatingLocation,
  isLocationValid,
  isValidatingProduct,
  isProductValid,
  resetValidateProduct,
  resetValidateLocation,
}) {
  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  const router = useRouter()
  const classes = useStyles()
  const isLaptop = useMediaQuery({query: '(max-width: 1023px)'})
  const isTablet = useMediaQuery({query: '(min-width: 768px)'})
  const isLaptopAbove = useMediaQuery({query: '(min-width: 1024px)'})
  const [productQaData, setProductQaData] = useState([])
  const isBrowser = () => typeof window !== 'undefined'
  const {height, width} = useWindowDimensions()
  const desktopGridRef = useRef()
  const mobileHeaderRef = useRef()

  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  const btnRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  let activeSection = useScrollSpy({
    sectionElementRefs: sectionRefs,
  })

  /* Set product name from router */
  const [productName, setProductName] = useState(null)

  /* Direct Route Access Tracker State */
  const [isAccessFromUrl, setIsAccessFromUrl] = useState(false)
  const [urlAccessLocation, setUrlAccessLocation] = useState(null)

  /* Direct Route Access Loader State */
  const [isCheckingLocation, setIsCheckingLocation] = useState(false)
  const [urlAccessLocationValid, setUrlAccessLocationValid] = useState(null)

  /* Validate Product if location is valid */
  const [isCheckingProduct, setIsCheckingProduct] = useState(false)
  const [urlAccessProductValid, setUrlAccessProductValid] = useState(false)

  // BreadCrumb Data
  const [breadCrumb, setBreadCrumb] = useState('')

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

  /* Detect Route Change to clear data */
  const onRouteChangeStart = React.useCallback(() => {
    setProductQaData([])
    setCurrentQuestion('')
    // resetProductQA()
  }, [])

  React.useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
    }
  }, [onRouteChangeStart, router.events])

  /* Package builder */
  const {
    isFetchingProductDetails,
    isFetchingPackageBuilder,
    packageBuilder,
  } = useSelector((state) => state?.ProductDetailsReducer)

  const [selectedPackages, setSelectedPackages] = useState([])

  const [detailsVisible, setDetailsVisible] = useState(false)
  const [details, setDetails] = useState(null)
  const [detailsGroup, setDetailsGroup] = useState(null)

  // Modal
  const [viewModal, setViewModal] = useState(false)

  const [activePkg, setActivePkg] = useState(null)

  const [dynamicRefs, setdynamicRefs] = useState([])

  const [isUpdate, setIsUpdate] = useState(true)

  const [allIncludedItem, setAllIncludedItem] = useState([])

  /* Fetch product details based on product name */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let href = window?.location?.href
      let data = href?.split('/')
      if (data[5] !== undefined) {
        fetchProductDetails({
          productSlug: data[5],
          group_id: isLocationValid?.[0]?.uuid,
        })
      }

      let cartItems = localStorage.getItem('cartItems')
      if (cartItems) {
        let details = JSON.parse(cartItems)
        let package_detail = details?.packages_selected
        if (package_detail) {
          let price = 0
          let packageData = JSON.parse(package_detail)
          let selected_ackages = []
          let total = 0

          packageData.length > 0 &&
            packageData.map((ele) => {
              ele?.packages?.length > 0 &&
                ele?.packages?.map((data) => {
                  selected_ackages.push(data)
                  total += +data?.price * +data?.quantity
                })
            })
          setSelectedPackages(selected_ackages)
          setPrice(total)
        }
      }

      let cartProduct = localStorage.getItem('actiserve_cart_product')
      if (cartProduct) {
        let productIncluded = JSON.parse(cartProduct)
        if (
          productIncluded?.product_include_items &&
          productIncluded?.product_include_items.length > 0
        ) {
          let item = productIncluded?.product_include_items.filter(
            (val) => val.included,
          )
          setAllIncludedItem(item)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!productDetails?.build_package) {
      setSelectedPackages([])
    }
    if (isBrowser() === true) {
      let lastProductSelected = localStorage?.getItem(
        'urbanserve_current_product',
      )
      if (lastProductSelected) {
        if (lastProductSelected !== productDetails?.id) {
          setSelectedPackages([])
        }
      }
    }
  }, [productDetails])

  /* Cart calculation */
  /* Product qa total price */
  const [price, setPrice] = useState(0)
  const [sub_total_price, set_sub_total_price] = useState(0)
  const [total_price, set_total_price] = useState(0)
  const [discount_price, set_discount_price] = useState(0)
  const [finalAddonsPrice, setFinalAddonsPrice] = useState(0)

  function handleCalculation(productPrice, type) {
    let total_price = 0
    let sub_total = 0
    if (price) {
      if (productDetails?.product_discount !== null) {
        let discount =
          productDetails?.product_discount?.discount_type === 'amount'
            ? +productDetails?.product_discount?.amount
            : +(productDetails?.product_discount?.amount / 100) * price
        set_discount_price(+discount?.toFixed(3))
        if (discount >= 0) {
          set_discount_price(+discount?.toFixed(3))
          sub_total = price + finalAddonsPrice - discount
          set_sub_total_price(sub_total)
        } else {
          sub_total = price + finalAddonsPrice
          set_sub_total_price(sub_total)
        }
      }
      if (productDetails?.vat_rate !== null) {
        let total_value =
          productDetails?.product_discount !== null
            ? sub_total + productDetails?.vat_rate
            : price
        let vatRate = total_value * (productDetails?.vat_rate / 100)
        if (vatRate >= 0) {
          total_price =
            productDetails?.product_discount !== null
              ? sub_total + vatRate
              : price + vatRate
          set_total_price(total_price)
        }
      }
    }
  }

  useEffect(() => {
    handleCalculation()
  }, [price])

  // Fetch Product QA
  useEffect(() => {
    if (productDetails && productDetails?.id) {
      fetchPackageBuilder({product_id: productDetails?.id, all: true})
    }
  }, [productDetails])

  const handleCheckout = async () => {
    let parentArr = []
    let parentIDArr = []
    let finalArr = []
    // Get Parent ID from selected Packages
    if (selectedPackages?.length > 0) {
      selectedPackages.map((ele) => {
        let parentID = ele?.package_group_id
        if (parentIDArr.indexOf(parentID) <= -1) {
          parentIDArr.push(parentID)
        }
      })
    }

    // Fill parent array data that are selected
    if (parentIDArr?.length > 0) {
      parentIDArr.map((ele) => {
        packageBuilder.map((data) => {
          if (data?.id === ele && parentArr.indexOf(data?.id) <= -1) {
            parentArr.push(data)
          }
        })
      })
    }

    // Filter packages that are selected
    if (parentArr?.length > 0) {
      parentArr.map((ele) => {
        let customObj = {
          id: ele?.id,
          title: ele?.title,
          packages: [],
        }
        selectedPackages.map((data) => {
          ele?.package_item_details?.map((item) => {
            if (item?.id === data?.id) {
              customObj?.packages?.push(data)
            }
          })
        })
        if (customObj && finalArr?.indexOf(customObj?.id) <= -1) {
          finalArr.push(customObj)
        }
      })
    }
    let product = {
      addons: await [],
      product_qa: await [],
      quote_qa_grant_total: 0,
      product: await productDetails,
      sub_total_price,
      total_price,
      discount_price,

      is_product_applicable: productDetails?.product_offering ?? false,
      product_selected: '',
      is_package_applicable: productDetails?.build_package,
      packages_selected: JSON.stringify(finalArr),
      // qa_images: uploadedFileData?.length > 0 ? uploadedFileData : [],
    }
    if (product) {
      localStorage.setItem('cartItems', JSON.stringify(product))
      localStorage.setItem('actiserve_cart_addons', JSON.stringify([]))
      localStorage.setItem(
        'actiserve_cart_productqa_values',
        JSON.stringify(ProductQAsValues),
      )
      localStorage.setItem(
        'actiserve_cart_productqa_details',
        JSON.stringify(productQADetails),
      )
      // localStorage.setItem('actiserve_cart_images', "")
      addProductToCart(product)
    }
    if (productDetails?.product_include_items?.length > 0) {
      localStorage.setItem(
        'urbanserve_includes_items',
        JSON.stringify(productDetails?.product_include_items),
      )
    } else {
      localStorage.setItem('urbanserve_includes_items', JSON.stringify([]))
    }
    localStorage.setItem('urbanserve_current_product', productDetails?.id)
    localStorage.setItem('urbanserve_cart_package', JSON.stringify(finalArr))

    Router.push('/checkout')
  }
  /* Package builder ends */

  /* Set product name from router */
  const [groupName, setGroupName] = useState(null)

  /* Generic update statement */
  const [update, setUpdate] = useState(false)

  const [arrowEnter, setArrowEnter] = useState(false)

  // Product QA State
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [ProductQAsValues, setProductQAsValues] = useState([])
  const [allQAs, setAllQAs] = useState([])

  useEffect(() => {
    if (productQADetails) {
      setProductQaData(productQADetails)
    }
  }, [productQADetails])

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
    if (router && router?.query?.category) {
      setProductName(router?.query?.category)
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
      Router.push('/site-summary')
    }
  }, [ProductQAsValues, productQADetails, isFinish])

  const [navHeight, setNavHeight] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [topHeight, setTopHeight] = useState(0)
  const [windowScrolled, setWindowScrolled] = useState(0)

  useEffect(() => {
    if (navHeight && navHeight) {
      setTopHeight(headerHeight + navHeight)
    }
  }, [headerHeight, navHeight])

  useEffect(() => {
    /*  */

    const headerDOMele = document.getElementById(`site__header`)
    const headerPosition = headerDOMele?.getBoundingClientRect()
    const headerTopPosition = headerPosition?.height

    const col = document.getElementById(`site__center__main__col`)
    const colposi = col?.getBoundingClientRect()

    const navDOMele = document.getElementById(`site__location__nav`)
    const navPosition = navDOMele?.getBoundingClientRect()

    setHeaderHeight(headerTopPosition)
    setNavHeight(navPosition?.height)

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const finalPosi = scrollPosition - headerTopPosition
      let posti = finalPosi - scrollPosition

      if (scrollPosition) {
        setWindowScrolled(scrollPosition)
      }

      packageBuilder?.length > 0 &&
        packageBuilder?.map((ele, i) => {
          const box = document.getElementById(`${ele?.id}`)
          const rect = box?.getBoundingClientRect()
          let offset = isTablet ? 100 : 250
          if (posti + offset >= rect?.top && posti + offset < rect?.bottom) {
            setActivePkg(ele?.id)
          }
        })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('load', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('load', handleScroll)
      setCurrentQuestion('')
    }
  }, [packageBuilder, isTablet, isFetchingPackageBuilder])

  const [y, setY] = useState(0)
  const [mobileHeaderOffset, setMobileHeaderOffset] = useState(89)

  const handleNavigation = (e) => {
    const headerDOMele = document.getElementById(`site__header`)
    const headerPosition = headerDOMele?.getBoundingClientRect()
    setMobileHeaderOffset(headerPosition?.height)
  }
  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNavigation(e))

    return () => {
      window.removeEventListener('scroll', (e) => handleNavigation(e))
    }
  }, [y])
  function onScroll() {}

  useEffect(() => {
    if (packageBuilder?.length > 0) {
      setActivePkg(packageBuilder?.[0]?.id)
    }
  }, [packageBuilder])

  const removePackage = (id) => {
    let packages = selectedPackages.filter((ele) => ele?.id != id)

    setSelectedPackages(packages)
    setIsUpdate(!isUpdate)
  }

  const checkSingleSelection = (value, groupDetails) => {
    let packages = selectedPackages.filter((ele) => ele.id != value?.id)

    if (packages.length > 0) {
      packages = packages.filter(
        (v) => v.package_group_id == value?.package_group_id,
      )

      if (packages.length > 0) {
        removePackage(packages[0]?.id)
      }
    }
  }

  const checkIsSame = (checkVal) => {
    let data = selectedPackages.filter((ele) => ele.id == checkVal.id)
    if (data.length > 0) {
      return true
    }

    return false
  }

  const getValue = (val) => {
    let data = selectedPackages.filter((ele) => ele.id == val.id)

    // if (selectedPackages.length > 0) {
    //   let total = 0
    //   selectedPackages.map((ele) => {
    //     total += +ele?.total_price
    //   })
    //   setPrice(total)
    // } else {
    //   setPrice(0)
    // }
    if (data.length > 0) {
      return data[0]
    }

    return []
  }

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

  function handleScrollInto(ele, i) {
    if (sectionRefs[i].current) {
      window.scrollTo(0, sectionRefs[i].current.offsetTop)
    }
    if (btnRefs[i].current) {
      let element = document?.getElementById('site__mobile')
      const navPosition = element?.getBoundingClientRect()
      btnRefs[i].current?.scrollTo(btnRefs[i].current?.offsetLeft, 0)
      element.scrollLeft += btnRefs[i].current?.offsetLeft - 10
    }
  }

  useEffect(() => {
    let element = document?.getElementById('site__mobile')

    function handleScroll() {}

    element?.addEventListener('scroll', handleScroll)
    return () => {
      element?.removeEventListener('scroll', handleScroll)
    }
  })

  useEffect(() => {
    calculatePackageTotal()
  }, [selectedPackages])

  const calculatePackageTotal = () => {
    let total = 0
    selectedPackages?.map((ele) => {
      total += +ele?.total_price
      setPrice(total)
    })
  }

  let link = isBrowser()
    ? `${window.location.hostname}/${groupName}/${productName}`
    : ''

  useEffect(() => {
    if (groupName && productName) {
      let data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'UrbanServe',
            item: 'https://www.urbanserve.co.uk',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'UrbanServe',
            item: `https://www.urbanserve.co.uk/${groupName}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `https://www.urbanserve.co.uk/${groupName}/${productName}`,
          },
        ],
      }
      setBreadCrumb(data)
    }
  }, [groupName, productName])

  const addJsonLd = () => {
    return {
      __html: breadCrumb ? JSON.stringify(breadCrumb) : '',
    }
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <>
      <HelmetComponent
        title={
          productDetails?.title
            ? `${productDetails?.title} | UrbanServe`
            : 'UrbanServe'
        }
        ogTitle={
          productDetails?.title
            ? `${productDetails?.title} | UrbanServe`
            : 'UrbanServe'
        }
        description={`UrbanServe is the leading on demand cleaning and repair service in ${
          groupName && capitalizeFirstLetter(groupName)
        }. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!`}
        ogDescription={`UrbanServe is the leading on demand cleaning and repair service in ${
          groupName && capitalizeFirstLetter(groupName)
        }. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!`}
        ogUrl={link}
        createJsonLD={true}
        jsonLDData={breadCrumb}
      />

      {isAccessFromUrl ? (
        isCheckingLocation || isCheckingProduct ? (
          <Loader active inline="centered" style={{}} />
        ) : urlAccessLocationValid && urlAccessProductValid ? (
          <>
            <div
              // className={
              //   productDetails?.build_package ? 'site__location__nav' : ''
              // }
              id={productDetails?.build_package ? 'site__cate__nav' : ''}
            >
              <SiteMainNavbar />
            </div>

            {productDetails?.build_package ? (
              <>
                {isFetchingProductDetails || isFetchingPackageBuilder ? (
                  <div
                    style={{
                      height: '60vh',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Loader active inline="centered" style={{}} />
                  </div>
                ) : (
                  <section className="site__package__container">
                    <div>
                      <div className="site__package__header" id="site__header">
                        <h1>{productDetails?.title}</h1>
                      </div>

                      <div
                        ref={mobileHeaderRef}
                        className="site__package__mobile__header"
                        style={{top: `${mobileHeaderOffset}px`}}
                      >
                        <ul
                          className="site__package__mobile__container"
                          id="site__mobile"
                        >
                          {packageBuilder &&
                            packageBuilder.length > 0 &&
                            packageBuilder.map((ele, i) => {
                              return (
                                <li
                                  fluid
                                  ref={btnRefs[i]}
                                  id="site__package__scroll__btn"
                                  className="site__package__btn"
                                  style={{
                                    backgroundColor:
                                      activePkg === ele?.id
                                        ? 'black'
                                        : 'transparent',
                                    color:
                                      activePkg === ele?.id
                                        ? 'white'
                                        : '#21262b',
                                  }}
                                  onClick={() => {
                                    handleScrollInto(ele, i)
                                    setActivePkg(ele?.id)
                                  }}
                                  variant="contained"
                                >
                                  {ele?.title}
                                </li>
                              )
                            })}
                        </ul>
                      </div>
                      <Grid
                        className="site__package__grid"
                        style={{
                          paddingBottom: selectedPackages?.length > 0 && '4rem',
                        }}
                      >
                        <Grid.Column
                          only="tablet computer"
                          tablet={6}
                          // computer={detailsVisible ? 4 : 5}
                          computer={5}
                          className="site__package__left"
                        >
                          <div
                            style={{
                              position: 'sticky',
                              height: '100vh',
                              top: '15px',
                            }}
                            align="right"
                            className="site__package__left__pd"
                          >
                            {packageBuilder &&
                              packageBuilder.length > 0 &&
                              packageBuilder.map((ele, i) => {
                                return (
                                  <div className="site__package__dsk__section">
                                    <Button
                                      id={`site__builder__btn`}
                                      buttonId={ele?.id}
                                      className={
                                        activePkg === ele?.id
                                          ? 'site__package__dsk__btn site__package__dsk__mb'
                                          : 'site__package__dsk__btn__dark'
                                      }
                                      onClick={(e) => {
                                        if (typeof window !== undefined) {
                                          document
                                            .getElementById(ele?.id)
                                            .scrollIntoView({
                                              behavior: 'smooth',
                                            })
                                        }
                                      }}
                                      variant="contained"
                                    >
                                      {ele?.title}
                                    </Button>
                                  </div>
                                )
                              })}
                          </div>
                        </Grid.Column>
                        <Grid.Column
                          mobile={16}
                          tablet={10}
                          computer={6}
                          // onScroll={(e) => onScroll(e)}
                          id="site__center__main__col"
                          className={
                            detailsVisible
                              ? `site__package__right site__package__right__border`
                              : 'site__package__right'
                          }
                          // style={{ maxHeight: isLaptopAbove ? height - 152 : '100%', overflowY: 'scroll' }}
                        >
                          <Box id="site__center__col">
                            {packageBuilder &&
                              packageBuilder.length > 0 &&
                              packageBuilder.map((ele, i) => {
                                return (
                                  <div
                                    id={ele?.id}
                                    className="package__center__col"
                                    ref={sectionRefs[i]}
                                    style={{
                                      paddingBottom:
                                        ele?.package_item_details?.length <=
                                          3 && i === packageBuilder.length - 1
                                          ? '60vh'
                                          : '0rem',
                                    }}
                                  >
                                    <h1 className="site__package__title">
                                      {ele?.title}
                                    </h1>
                                    <p className="site__package__description">
                                      {ele?.description}
                                    </p>
                                    <div>
                                      {ele?.package_item_details.length > 0 &&
                                        ele.package_item_details.map((val) => {
                                          return (
                                            <div>
                                              <PackageItem
                                                id={ele?.id}
                                                value={val}
                                                isUpdate={isUpdate}
                                                setIsUpdate={setIsUpdate}
                                                selectedPackages={
                                                  selectedPackages
                                                }
                                                setSelectedPackages={
                                                  setSelectedPackages
                                                }
                                                setDetails={setDetails}
                                                setDetailsGroup={
                                                  setDetailsGroup
                                                }
                                                setViewModal={setViewModal}
                                                details={details}
                                                setPrice={setPrice}
                                                allIncludedItem={
                                                  allIncludedItem
                                                }
                                                setDetailsVisible={() =>
                                                  setDetailsVisible(true)
                                                }
                                                isLaptop={isLaptop}
                                                detailsVisible={detailsVisible}
                                                groupDetails={ele}
                                                desktopGridRef={desktopGridRef}
                                                location={urlAccessLocation}
                                              />
                                            </div>
                                          )
                                        })}
                                    </div>
                                  </div>
                                )
                              })}
                          </Box>
                        </Grid.Column>
                        <Grid.Column
                          ref={(ref) => desktopGridRef(ref)}
                          only="computer"
                          tablet={6}
                          id="site__package__info__section"
                          computer={5}
                          // computer={detailsVisible ? 6 : 5}
                          style={{
                            background: details !== null && '#ffffff',
                            borderLeft: detailsVisible
                              ? '1px solid #e9e9ea'
                              : 'none',
                            top: windowScrolled > 50 ? '0px' : '152px',
                            paddingBottom: '72px',
                          }}
                        >
                          {detailsVisible && details && (
                            <div
                              className="site__package__info"
                              id={details?.id}
                            >
                              <img
                                width="16px"
                                height="16px"
                                className="site__package__info__img"
                                src="/site__main__images/site__close.png"
                                alt="Urbanserve"
                                onClick={() => {
                                  setDetailsVisible(false)
                                  setDetails(null)
                                }}
                              />
                              <div className="site__package__info__header">
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  {details?.image ? (
                                    <img
                                      src={
                                        details?.image?.type === 'public'
                                          ? `${details?.image?.file_path}`
                                          : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${details?.image?.id}/show-file`
                                      }
                                      className={classes.imageSection}
                                      width="70px"
                                      height="70px"
                                      style={{
                                        marginRight: '1rem',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src="/site__main__images/product__image.png"
                                      className={classes.imageSection}
                                      width="70px"
                                      height="70px"
                                      style={{
                                        marginRight: '1rem',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  )}
                                  <div>
                                    <h1 className>{details.title}</h1>
                                    <p>£{details?.price}</p>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    {checkIsSame(details) ? (
                                      details?.quantity_applicate == false ? (
                                        <div
                                          className="site__package__remove__btn"
                                          onClick={async () => {
                                            let packages = selectedPackages.filter(
                                              (ele) => ele.id != details.id,
                                            )
                                            await setSelectedPackages(packages)
                                            await setIsUpdate(!isUpdate)
                                          }}
                                        >
                                          <p>Remove</p>
                                          <div className="site__package__btn__img">
                                            <img
                                              width="100%"
                                              src="/site__icons/icon__minus.png"
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        <div class="site__incrementor">
                                          <span
                                            onClick={async () => {
                                              let packages = selectedPackages

                                              let index = packages.findIndex(
                                                (v) => v.id == details.id,
                                              )

                                              if (
                                                packages[index].quantity == 1
                                              ) {
                                                let packages = selectedPackages.filter(
                                                  (ele) => ele.id != details.id,
                                                )
                                                await setSelectedPackages(
                                                  packages,
                                                )
                                                await setIsUpdate(!isUpdate)
                                                return 1
                                              }

                                              let quantity =
                                                packages[index].quantity - 1

                                              let data = {
                                                ...details,
                                                total_price: details.quantity_applicate
                                                  ? details.price * quantity
                                                  : details.price,
                                                quantity: details.quantity_applicate
                                                  ? quantity
                                                  : 1,
                                              }

                                              packages[
                                                index
                                              ].total_price = await parseInt(
                                                data?.total_price,
                                              )
                                              packages[
                                                index
                                              ].quantity = await parseInt(
                                                data?.quantity,
                                              )
                                              await setSelectedPackages(
                                                packages,
                                              )
                                              await setIsUpdate(!isUpdate)
                                            }}
                                            style={{
                                              cursor: 'pointer',
                                              // color: checkIsSame(value)
                                              //   ? getValue(value)?.quantity == 1
                                              //     ? 'darkgray'
                                              //     : ''
                                              //   : '',
                                            }}
                                            class="site__incrementor__minus"
                                          >
                                            -
                                          </span>
                                          <span
                                            type="site__incrementor__text"
                                            style={{
                                              textAlign: 'center',
                                              height: '28px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              width: '32px',
                                              background: '#fff',
                                              fontFamily: 'Urbanist__bold',
                                            }}
                                          >
                                            {checkIsSame(details) &&
                                              getValue(details)?.quantity}
                                          </span>
                                          <span
                                            onClick={async () => {
                                              let packages = selectedPackages

                                              let index = packages.findIndex(
                                                (v) => v.id == details.id,
                                              )

                                              let quantity =
                                                packages[index].quantity + 1

                                              let data = {
                                                ...details,
                                                total_price: details.quantity_applicate
                                                  ? details.price * quantity
                                                  : details.price,
                                                quantity: details.quantity_applicate
                                                  ? quantity
                                                  : 1,
                                              }

                                              packages[
                                                index
                                              ].total_price = await parseInt(
                                                data?.total_price,
                                              )
                                              packages[
                                                index
                                              ].quantity = await parseInt(
                                                data?.quantity,
                                              )

                                              await setSelectedPackages(
                                                packages,
                                              )

                                              await setIsUpdate(!isUpdate)
                                            }}
                                            style={{
                                              cursor: 'pointer',
                                            }}
                                            class="site__incrementor__plus"
                                          >
                                            +
                                          </span>
                                        </div>
                                      )
                                    ) : (
                                      <div
                                        className="site__package__select__btn"
                                        onClick={async () => {
                                          let packages = await selectedPackages
                                          let data = {
                                            ...details,
                                            total_price: details.quantity_applicate
                                              ? details.price * details.quantity
                                              : details.price,
                                            quantity: details.quantity_applicate
                                              ? details.quantity
                                              : 1,
                                          }

                                          if (
                                            packages.filter(
                                              (ele) => ele.id == details.id,
                                            ).length == 0
                                          ) {
                                            await packages.push(data)
                                          } else {
                                            let index = packages.findIndex(
                                              (v) => v.id == details.id,
                                            )
                                            packages[
                                              index
                                            ].total_price = await parseInt(
                                              data?.total_price,
                                            )
                                            packages[
                                              index
                                            ].quantity = await parseInt(
                                              data?.quantity,
                                            )
                                          }
                                          await setSelectedPackages(packages)
                                          await setIsUpdate(!isUpdate)
                                          if (
                                            detailsGroup?.is_single_selection
                                          ) {
                                            await checkSingleSelection(
                                              details,
                                              detailsGroup,
                                            )
                                          }
                                          // setSelectedPackage(data);
                                        }}
                                      >
                                        <p>Add</p>
                                        <div className="site__package__btn__img">
                                          <img
                                            width="100%"
                                            src="/site__icons/icon__plus__dark.png"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {details?.long_description && (
                                <div className="site__package__desc">
                                  {/* <h1>Standard services include</h1> */}
                                  <div
                                    className="site__package__desc__info"
                                    dangerouslySetInnerHTML={{
                                      __html: details.long_description,
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          )}
                        </Grid.Column>
                      </Grid>
                    </div>
                  </section>
                )}
              </>
            ) : (
              <>
                {isFetchingProductQADetails ? (
                  <div
                    style={{
                      height: '60vh',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Loader active inline="centered" style={{}} />
                  </div>
                ) : (
                  productQaData?.length > 0 &&
                  isFinish === false && (
                    <>
                      <section className="ldp__quote__wrapper">
                        <div className="ldp__quote__container">
                          {productQaData?.length > 0 && (
                            <div className="ldp__quote__bar__section">
                              <Grid
                                className="ldp__quote__bar__grid"
                                columns={'equal'}
                              >
                                {productQaData?.map((ele, i) => (
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
                                    <FormControl
                                      variant="outlined"
                                      size="small"
                                    >
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
                                          dropDownQuestions[0]?.answers.length >
                                            0 &&
                                          dropDownQuestions[0].answers.map(
                                            (ele, i) => (
                                              <MenuItem
                                                key={i}
                                                value={ele?.answer_title}
                                                className={
                                                  classes.textCapitalize
                                                }
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
                                    <FormControl
                                      variant="outlined"
                                      size="small"
                                    >
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
                                          dropDownNextQuestion?.answers.length >
                                            0 &&
                                          dropDownNextQuestion.answers.map(
                                            (ele, i) => (
                                              <MenuItem
                                                key={i}
                                                value={ele?.answer_title}
                                                className={
                                                  classes.textCapitalize
                                                }
                                                onClick={() => {
                                                  onSelectAnswer(
                                                    ele,
                                                    dropDownNextQuestion,
                                                  )
                                                  setSelectedModel(
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
                                                ele?.answer_image?.type ===
                                                'public'
                                                  ? `${ele?.answer_image?.file_path}`
                                                  : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${ele?.answer_image?.id}/show-file`
                                              }
                                              alt="Urbanserve Service Icon"
                                              width="100%"
                                            />
                                          ) : (
                                            <img
                                              src="/site__main__images/product__image.png"
                                              className="drawer__item__img"
                                              width="100%"
                                            />
                                          )}
                                          {/* <Image
                                            src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${ele?.image?.file_path}&width=630&height=630`}
                                            alt="Urbanserve Icon"
                                            width={'100%'}
                                            height={'100%'}
                                            objectFit="contain"
                                            quality={100}
                                          /> */}
                                          {/* <Image
                                            src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.answer_image}&width=144&height=180`}
                                            alt="Urbanserve Service Icon"
                                            quality={100}
                                            width="48"
                                            height="60"
                                            // blurDataURL={rgbDataURL(5, 135, 255)}
                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
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
                              <Box
                                className={`${classes.prevBox} ldp__prevBox`}
                              >
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
                      <div className="site__qa__footer__pb">
                        <SiteFooter />
                      </div>
                      {/* Site Footer End */}
                    </>
                  )
                )}
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
          <div
            // className={
            //   productDetails?.build_package ? 'site__location__nav' : ''
            // }
            id={productDetails?.build_package ? 'site__cate__nav' : ''}
          >
            <SiteMainNavbar />
          </div>

          {productDetails?.build_package ? (
            <>
              {isFetchingProductDetails || isFetchingPackageBuilder ? (
                <div
                  style={{
                    height: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Loader active inline="centered" style={{}} />
                </div>
              ) : (
                <section className="site__package__container">
                  <div>
                    <div className="site__package__header" id="site__header">
                      <h1>{productDetails?.title}</h1>
                    </div>

                    <div
                      onScroll={(e) => getoffSet(e)}
                      ref={mobileHeaderRef}
                      className="site__package__mobile__header"
                      style={{top: `${mobileHeaderOffset}px`}}
                    >
                      <ul
                        className="site__package__mobile__container"
                        id="site__mobile"
                      >
                        {packageBuilder &&
                          packageBuilder.length > 0 &&
                          packageBuilder.map((ele, i) => {
                            return (
                              <li
                                fluid
                                ref={btnRefs[i]}
                                className="site__package__btn"
                                style={{
                                  backgroundColor:
                                    activePkg === ele?.id
                                      ? 'black'
                                      : 'transparent',
                                  color:
                                    activePkg === ele?.id ? 'white' : '#21262b',
                                }}
                                onClick={() => {
                                  handleScrollInto(ele, i)
                                  setActivePkg(ele?.id)
                                }}
                                variant="contained"
                              >
                                {ele?.title}
                              </li>
                            )
                          })}
                      </ul>
                    </div>
                    <Grid
                      className="site__package__grid"
                      style={{
                        paddingBottom: selectedPackages?.length > 0 && '4rem',
                      }}
                    >
                      <Grid.Column
                        only="tablet computer"
                        tablet={6}
                        // computer={detailsVisible ? 4 : 5}
                        computer={5}
                        className="site__package__left"
                      >
                        <div
                          style={{
                            position: 'sticky',
                            height: '100vh',
                            top: '15px',
                          }}
                          align="right"
                          className="site__package__left__pd"
                        >
                          {packageBuilder &&
                            packageBuilder.length > 0 &&
                            packageBuilder.map((ele, i) => {
                              return (
                                <div className="site__package__dsk__section">
                                  <Button
                                    id={`site__builder__btn`}
                                    buttonId={ele?.id}
                                    className={
                                      activePkg === ele?.id
                                        ? 'site__package__dsk__btn site__package__dsk__mb'
                                        : 'site__package__dsk__btn__dark'
                                    }
                                    onClick={(e) => {
                                      if (typeof window !== undefined) {
                                        document
                                          .getElementById(ele?.id)
                                          .scrollIntoView({behavior: 'smooth'})
                                      }
                                    }}
                                    variant="contained"
                                  >
                                    {ele?.title}
                                  </Button>
                                </div>
                              )
                            })}
                        </div>
                      </Grid.Column>
                      <Grid.Column
                        mobile={16}
                        tablet={10}
                        computer={6}
                        onScroll={(e) => onScroll(e)}
                        id="site__center__main__col"
                        className={
                          detailsVisible
                            ? `site__package__right site__package__right__border`
                            : 'site__package__right'
                        }
                        // style={{ maxHeight: isLaptopAbove ? height - 152 : '100%', overflowY: 'scroll' }}
                      >
                        <Box id="site__center__col">
                          {packageBuilder &&
                            packageBuilder.length > 0 &&
                            packageBuilder.map((ele, i) => {
                              return (
                                <div
                                  id={ele?.id}
                                  className="package__center__col"
                                  ref={sectionRefs[i]}
                                  style={{
                                    paddingBottom:
                                      ele?.package_item_details?.length <= 3 &&
                                      i === packageBuilder.length - 1
                                        ? '60vh'
                                        : '0rem',
                                  }}
                                >
                                  <h2 className="site__package__title">
                                    {ele?.title}
                                  </h2>
                                  <p className="site__package__description">
                                    {ele?.description}
                                  </p>
                                  <div>
                                    {ele?.package_item_details.length > 0 &&
                                      ele.package_item_details.map((val) => {
                                        return (
                                          <div>
                                            <PackageItem
                                              value={val}
                                              isUpdate={isUpdate}
                                              setIsUpdate={setIsUpdate}
                                              selectedPackages={
                                                selectedPackages
                                              }
                                              setSelectedPackages={
                                                setSelectedPackages
                                              }
                                              setDetails={setDetails}
                                              setViewModal={setViewModal}
                                              setDetailsGroup={setDetailsGroup}
                                              details={details}
                                              setPrice={setPrice}
                                              allIncludedItem={allIncludedItem}
                                              setDetailsVisible={() =>
                                                setDetailsVisible(true)
                                              }
                                              isLaptop={isLaptop}
                                              detailsVisible={detailsVisible}
                                              groupDetails={ele}
                                              desktopGridRef={desktopGridRef}
                                              location={urlAccessLocation}
                                            />
                                          </div>
                                        )
                                      })}
                                  </div>
                                </div>
                              )
                            })}
                        </Box>
                      </Grid.Column>
                      <Grid.Column
                        only="computer"
                        tablet={6}
                        ref={desktopGridRef}
                        id="site__package__info__section"
                        computer={5}
                        // computer={detailsVisible ? 6 : 5}
                        style={{
                          background: details !== null && '#ffffff',
                          borderLeft: detailsVisible
                            ? '1px solid #e9e9ea'
                            : 'none',
                          top: windowScrolled > 50 ? '0px' : '152px',
                          paddingBottom: '72px',
                        }}
                      >
                        {detailsVisible && details && (
                          <div className="site__package__info" id={details?.id}>
                            <img
                              width="16px"
                              height="16px"
                              className="site__package__info__img"
                              src="/site__main__images/site__close.png"
                              alt="Urbanserve"
                              onClick={() => {
                                setDetailsVisible(false)
                                setDetails(null)
                              }}
                            />
                            <div className="site__package__info__header">
                              <div
                                style={{display: 'flex', alignItems: 'center'}}
                              >
                                {details?.image ? (
                                  <img
                                    src={
                                      details?.image?.type === 'public'
                                        ? `${details?.image?.file_path}`
                                        : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${details?.image?.id}/show-file`
                                    }
                                    className={classes.imageSection}
                                    width="70px"
                                    height="70px"
                                    style={{
                                      marginRight: '1rem',
                                      objectFit: 'cover',
                                    }}
                                  />
                                ) : (
                                  <img
                                    src="/site__main__images/product__image.png"
                                    className={classes.imageSection}
                                    width="70px"
                                    height="70px"
                                    style={{
                                      marginRight: '1rem',
                                      objectFit: 'cover',
                                    }}
                                  />
                                )}
                                <div>
                                  <h1 className>{details.title}</h1>
                                  <p>£{details?.price}</p>
                                </div>
                              </div>
                              <div>
                                {checkIsSame(details) ? (
                                  details?.quantity_applicate == false ? (
                                    <div
                                      className="site__package__remove__btn"
                                      onClick={async () => {
                                        let packages = selectedPackages.filter(
                                          (ele) => ele.id != details.id,
                                        )
                                        await setSelectedPackages(packages)
                                        await setIsUpdate(!isUpdate)
                                      }}
                                    >
                                      <p>Remove</p>
                                      <div className="site__package__btn__img">
                                        <img
                                          width="100%"
                                          src="/site__icons/icon__minus.png"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div class="site__incrementor">
                                      <span
                                        onClick={async () => {
                                          let packages = selectedPackages

                                          let index = packages.findIndex(
                                            (v) => v.id == details.id,
                                          )

                                          if (packages[index].quantity == 1) {
                                            let packages = selectedPackages.filter(
                                              (ele) => ele.id != details.id,
                                            )
                                            await setSelectedPackages(packages)
                                            await setIsUpdate(!isUpdate)
                                            return 1
                                          }

                                          let quantity =
                                            packages[index].quantity - 1

                                          let data = {
                                            ...details,
                                            total_price: details.quantity_applicate
                                              ? details.price * quantity
                                              : details.price,
                                            quantity: details.quantity_applicate
                                              ? quantity
                                              : 1,
                                          }

                                          packages[
                                            index
                                          ].total_price = await parseInt(
                                            data?.total_price,
                                          )
                                          packages[
                                            index
                                          ].quantity = await parseInt(
                                            data?.quantity,
                                          )
                                          await setSelectedPackages(packages)
                                          await setIsUpdate(!isUpdate)
                                        }}
                                        style={{
                                          cursor: 'pointer',
                                          // color: checkIsSame(value)
                                          //   ? getValue(value)?.quantity == 1
                                          //     ? 'darkgray'
                                          //     : ''
                                          //   : '',
                                        }}
                                        class="site__incrementor__minus"
                                      >
                                        -
                                      </span>
                                      <span
                                        type="site__incrementor__text"
                                        style={{
                                          textAlign: 'center',
                                          height: '28px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          width: '32px',
                                          background: '#fff',
                                          fontFamily: 'Urbanist__bold',
                                        }}
                                      >
                                        {checkIsSame(details) &&
                                          getValue(details)?.quantity}
                                      </span>
                                      <span
                                        onClick={async () => {
                                          let packages = selectedPackages

                                          let index = packages.findIndex(
                                            (v) => v.id == details.id,
                                          )

                                          let quantity =
                                            packages[index].quantity + 1

                                          let data = {
                                            ...details,
                                            total_price: details.quantity_applicate
                                              ? details.price * quantity
                                              : details.price,
                                            quantity: details.quantity_applicate
                                              ? quantity
                                              : 1,
                                          }

                                          packages[
                                            index
                                          ].total_price = await parseInt(
                                            data?.total_price,
                                          )
                                          packages[
                                            index
                                          ].quantity = await parseInt(
                                            data?.quantity,
                                          )

                                          await setSelectedPackages(packages)

                                          await setIsUpdate(!isUpdate)
                                        }}
                                        style={{
                                          cursor: 'pointer',
                                        }}
                                        class="site__incrementor__plus"
                                      >
                                        +
                                      </span>
                                    </div>
                                  )
                                ) : (
                                  <div
                                    className="site__package__select__btn"
                                    onClick={async () => {
                                      let packages = await selectedPackages
                                      let data = {
                                        ...details,
                                        total_price: details.quantity_applicate
                                          ? details.price * details.quantity
                                          : details.price,
                                        quantity: details.quantity_applicate
                                          ? details.quantity
                                          : 1,
                                      }

                                      if (
                                        packages.filter(
                                          (ele) => ele.id == details.id,
                                        ).length == 0
                                      ) {
                                        await packages.push(data)
                                      } else {
                                        let index = packages.findIndex(
                                          (v) => v.id == details.id,
                                        )
                                        packages[
                                          index
                                        ].total_price = await parseInt(
                                          data?.total_price,
                                        )
                                        packages[
                                          index
                                        ].quantity = await parseInt(
                                          data?.quantity,
                                        )
                                      }
                                      await setSelectedPackages(packages)
                                      await setIsUpdate(!isUpdate)
                                      if (detailsGroup?.is_single_selection) {
                                        await checkSingleSelection(
                                          details,
                                          detailsGroup,
                                        )
                                      }
                                      // setSelectedPackage(data);
                                    }}
                                  >
                                    <p>Add</p>
                                    <div className="site__package__btn__img">
                                      <img
                                        width="100%"
                                        src="/site__icons/icon__plus__dark.png"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {details?.long_description && (
                              <div className="site__package__desc">
                                {/* <h1>Standard services include</h1> */}
                                <div
                                  className="site__package__desc__info"
                                  dangerouslySetInnerHTML={{
                                    __html: details.long_description,
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                        )}
                      </Grid.Column>
                    </Grid>
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
              {isFetchingProductQADetails ? (
                <div
                  style={{
                    height: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Loader active inline="centered" style={{}} />
                </div>
              ) : (
                productQaData?.length > 0 &&
                isFinish === false && (
                  <>
                    <section className="ldp__quote__wrapper">
                      <div className="ldp__quote__container">
                        {productQaData?.length > 0 && (
                          <div className="ldp__quote__bar__section">
                            <Grid
                              className="ldp__quote__bar__grid"
                              columns={'equal'}
                            >
                              {productQaData?.map((ele, i) => (
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
                                        dropDownQuestions[0]?.answers.length >
                                          0 &&
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
                                        dropDownNextQuestion?.answers.length >
                                          0 &&
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
                                                setSelectedModel(
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
                                          : `ldp__quote__segment`
                                      }
                                    >
                                      <div className="ldp__quote__image">
                                        {ele?.answer_image ? (
                                          <img
                                            src={
                                              ele?.answer_image?.type ===
                                              'public'
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
                                        {/* <Image
                                          src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${ele?.image?.file_path}&width=630&height=630`}
                                          alt="Urbanserve Icon"
                                          width={'100%'}
                                          height={'100%'}
                                          objectFit="contain"
                                          quality={100}
                                        /> */}
                                        {/* <Image
                                        src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.answer_image}&width=144&height=180`}
                                        alt="Urbanserve Service Icon"
                                        quality={100}
                                        width="48"
                                        height="60"
                                        // blurDataURL={rgbDataURL(5, 135, 255)}
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
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
                    <div className=" site__qa__footer__pb">
                      <SiteFooter />
                    </div>
                    {/* Site Footer End */}
                  </>
                )
              )}
            </>
          )}
        </>
      )}

      {selectedPackages?.length > 0 && (
        <section className="site__package__summary__box">
          {price < productDetails?.minimum_package_price && (
            <p className="site__package__summary__price__btm">
              Minimum spend to book is £{productDetails?.minimum_package_price}
            </p>
          )}
          <div>
            <div
              className="site__package__summary"
              style={{
                backgroundColor:
                  price < productDetails?.minimum_package_price
                    ? `#E9E9EA`
                    : `#4a00e0`,
              }}
              onClick={() =>
                price >= productDetails?.minimum_package_price &&
                handleCheckout()
              }
            >
              <div className="site__package__summary__qty">
                <span
                  className="site__package__summary__num"
                  style={{
                    color:
                      price < productDetails?.minimum_package_price
                        ? `rgba(33, 38, 43, 0.5)`
                        : '#fff',
                    borderColor:
                      price < productDetails?.minimum_package_price
                        ? `rgba(33, 38, 43, 0.5)`
                        : '#fff',
                  }}
                >
                  {selectedPackages?.length}
                </span>
                <p
                  style={{
                    color:
                      price < productDetails?.minimum_package_price
                        ? `rgba(33, 38, 43, 0.5)`
                        : '#fff',
                  }}
                >
                  £{price}
                </p>
              </div>
              <div className="site__package__summary__next">
                <p
                  style={{
                    color:
                      price < productDetails?.minimum_package_price
                        ? `rgba(33, 38, 43, 0.5)`
                        : '#fff',
                  }}
                >
                  Next
                </p>
                <img
                  width="18px"
                  height="12px"
                  src={
                    price < productDetails?.minimum_package_price
                      ? '/site__icons/icon__chevron__disabled.png'
                      : '/site__main__images/site__chevron__right__light.png'
                  }
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <div style={{paddingBottom: price > 0 ? '4rem' : '0rem'}}>
        <SiteFooter />
      </div>
      <Drawer
        open={viewModal}
        onClose={() => setViewModal(false)}
        anchor="right"
        classes={{
          paper: classes.qaDrawerPaper,
        }}
      >
        <div className={classes.qaDrawerHeader}>
          <img
            width="100%"
            className={classes.qaDrawerClose}
            src="/site__main__images/site__close.png"
            alt="Urbanserve"
            onClick={() => setViewModal(false)}
          />
        </div>
        <div className={classes.qaDrawerContent} style={{padding: '0px 15px'}}>
          {details && details?.id && (
            <>
              <div className={classes.drawerHeader}>
                <div className={classes.drawerInner}>
                  {details?.image ? (
                    <img
                      src={
                        details?.image?.type === 'public'
                          ? `${details?.image?.file_path}`
                          : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${details?.image?.id}/show-file`
                      }
                      className={classes.imageSection}
                      width="70px"
                      height="70px"
                      alt="Urbanserve Icon"
                      style={{marginRight: '1rem', objectFit: 'cover'}}
                    />
                  ) : (
                    <img
                      src="/site__main__images/product__image.png"
                      className={classes.imageSection}
                      width="70px"
                      alt="Urbanserve Icon"
                      height="70px"
                      style={{marginRight: '1rem'}}
                    />
                  )}
                  <div>
                    <h1 className={classes.dwr__pkg__header}>
                      {' '}
                      {details?.title}
                    </h1>
                    <p className={classes.dwr__pkg__price}>
                      £ {details?.price}
                    </p>
                  </div>
                </div>

                <div>
                  {checkIsSame(details) ? (
                    details?.quantity_applicate == false ? (
                      <div
                        className="site__package__remove__btn"
                        onClick={async () => {
                          let packages = selectedPackages.filter(
                            (ele) => ele.id != details.id,
                          )
                          await setSelectedPackages(packages)
                          await setIsUpdate(!isUpdate)
                        }}
                      >
                        <p>Remove</p>
                        <div className="site__package__btn__img">
                          <img
                            width="100%"
                            src="/site__icons/icon__minus.png"
                          />
                        </div>
                      </div>
                    ) : (
                      <div class="site__incrementor">
                        <span
                          onClick={async () => {
                            let packages = selectedPackages

                            let index = packages.findIndex(
                              (v) => v.id == details.id,
                            )

                            if (packages[index].quantity == 1) {
                              let packages = selectedPackages.filter(
                                (ele) => ele.id != details.id,
                              )
                              await setSelectedPackages(packages)
                              await setIsUpdate(!isUpdate)
                              return 1
                            }

                            let quantity = packages[index].quantity - 1

                            let data = {
                              ...details,
                              total_price: details.quantity_applicate
                                ? details.price * quantity
                                : details.price,
                              quantity: details.quantity_applicate
                                ? quantity
                                : 1,
                            }

                            packages[index].total_price = await parseInt(
                              data?.total_price,
                            )
                            packages[index].quantity = await parseInt(
                              data?.quantity,
                            )
                            await setSelectedPackages(packages)
                            await setIsUpdate(!isUpdate)
                          }}
                          style={{
                            cursor: 'pointer',
                            // color: checkIsSame(value)
                            //   ? getValue(value)?.quantity == 1
                            //     ? 'darkgray'
                            //     : ''
                            //   : '',
                          }}
                          class="site__incrementor__minus"
                        >
                          -
                        </span>
                        <span
                          type="site__incrementor__text"
                          style={{
                            textAlign: 'center',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            background: '#fff',
                            fontFamily: 'Urbanist__bold',
                          }}
                        >
                          {checkIsSame(details) && getValue(details)?.quantity}
                        </span>
                        <span
                          onClick={async () => {
                            let packages = selectedPackages

                            let index = packages.findIndex(
                              (v) => v.id == details.id,
                            )

                            let quantity = packages[index].quantity + 1

                            let data = {
                              ...details,
                              total_price: details.quantity_applicate
                                ? details.price * quantity
                                : details.price,
                              quantity: details.quantity_applicate
                                ? quantity
                                : 1,
                            }

                            packages[index].total_price = await parseInt(
                              data?.total_price,
                            )
                            packages[index].quantity = await parseInt(
                              data?.quantity,
                            )

                            await setSelectedPackages(packages)

                            await setIsUpdate(!isUpdate)
                          }}
                          style={{
                            cursor: 'pointer',
                          }}
                          class="site__incrementor__plus"
                        >
                          +
                        </span>
                      </div>
                    )
                  ) : (
                    <div
                      className="site__package__select__btn"
                      onClick={async () => {
                        let packages = await selectedPackages
                        let data = {
                          ...details,
                          total_price: details.quantity_applicate
                            ? details.price * details.quantity
                            : details.price,
                          quantity: details.quantity_applicate
                            ? details.quantity
                            : 1,
                        }

                        if (
                          packages.filter((ele) => ele.id == details.id)
                            .length == 0
                        ) {
                          await packages.push(data)
                        } else {
                          let index = packages.findIndex(
                            (v) => v.id == details.id,
                          )
                          packages[index].total_price = await parseInt(
                            data?.total_price,
                          )
                          packages[index].quantity = await parseInt(
                            data?.quantity,
                          )
                        }
                        await setSelectedPackages(packages)
                        await setIsUpdate(!isUpdate)
                        if (detailsGroup?.is_single_selection) {
                          await checkSingleSelection(details, detailsGroup)
                        }
                        // setSelectedPackage(data);
                      }}
                    >
                      <p>Add</p>
                      <div className="site__package__btn__img">
                        <img
                          width="100%"
                          src="/site__icons/icon__plus__dark.png"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {details?.long_description && (
                <div className="site__package__desc">
                  {/* <h1 className={classes.dwr__pkg__desc__header}>
                    Standard services include
                  </h1> */}
                  <div
                    className="site__package__desc__info"
                    dangerouslySetInnerHTML={{
                      __html: details.long_description,
                    }}
                  ></div>
                </div>
              )}
            </>
          )}
        </div>
      </Drawer>
    </>
  )
}
const PackageItem = ({
  isUpdate,
  setIsUpdate,
  selectedPackages,
  setSelectedPackages,
  setDetails,
  setViewModal,
  details,
  value,
  setPrice,
  allIncludedItem,
  id,
  setDetailsVisible,
  isLaptop,
  detailsVisible,
  groupDetails,
  setDetailsGroup,
  desktopGridRef,
  location,
}) => {
  const classes = useStyles()

  const checkIsSame = (checkVal) => {
    let data = selectedPackages.filter((ele) => ele.id == checkVal.id)
    if (data.length > 0) {
      return true
    }

    return false
  }

  const getValue = (val) => {
    let data = selectedPackages.filter((ele) => ele.id == val.id)

    if (selectedPackages.length > 0) {
      let total = 0
      selectedPackages.map((ele) => {
        total += +ele?.total_price
      })
      setPrice(total)
    } else {
      setPrice(0)
    }
    if (data.length > 0) {
      return data[0]
    }

    return []
  }

  const removePackage = (id) => {
    let packages = selectedPackages.filter((ele) => ele?.id != id)

    setSelectedPackages(packages)
    setIsUpdate(!isUpdate)
  }

  const checkSingleSelection = (value, groupDetails) => {
    let packages = selectedPackages.filter((ele) => ele.id != value?.id)

    if (packages.length > 0) {
      packages = packages.filter(
        (v) => v.package_group_id == value?.package_group_id,
      )

      if (packages.length > 0) {
        removePackage(packages[0]?.id)
      }
    }
  }

  const handleScroll = async (id) => {
    if (typeof window !== undefined) {
      await document
        ?.getElementById('site__package__info__section')
        ?.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <Card className="site__package__card">
      <div className="site__package__card__content">
        {value?.image ? (
          <img
            src={
              value?.image?.type === 'public'
                ? `${value?.image?.file_path}`
                : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${value?.image?.id}/show-file`
            }
            alt={`${location} - ${value?.title}`}
            width="70px"
            height="70px"
            style={{marginRight: '1rem', objectFit: 'cover'}}
          />
        ) : (
          <img
            src="/site__main__images/product__image.png"
            width="70px"
            height="70px"
            style={{marginRight: '1rem'}}
          />
        )}
        {/* <Image
          className={classes.imageSection}
          src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${value?.image?.file_path}&width=168&height=168`}
          alt="Urbanserve Icon"
          width={56}
          height={56}
          style={{ marginRight: '1rem' }}
        /> */}

        <div className="site__package__card__inner">
          <div>
            <h3 className="site__package__card__title">{value?.title}</h3>
            <p className="site__package__card__price">
              {' '}
              £{value?.price ?? `~`}
              {/* {value.quantity_applicate &&
                checkIsSame(value) &&
                getValue(value)?.quantity && (
                  <span className="card__package__quantity">
                    x {getValue(value)?.quantity}
                  </span>
                )}
              {value.quantity_applicate && checkIsSame(value) && (
                <span className="card__package__price">
                  £{getValue(value)?.total_price}
                </span>
              )} */}
            </p>
          </div>

          <div>
            {checkIsSame(value) ? (
              value?.quantity_applicate == false ? (
                <div
                  className="site__package__remove__btn"
                  onClick={async () => {
                    let packages = selectedPackages.filter(
                      (ele) => ele.id != value.id,
                    )
                    await setSelectedPackages(packages)
                    await setIsUpdate(!isUpdate)
                  }}
                >
                  <p>Remove</p>
                  <div className="site__package__btn__img">
                    <img width="100%" src="/site__icons/icon__minus.png" />
                  </div>
                </div>
              ) : (
                <div class="site__incrementor">
                  <span
                    onClick={async () => {
                      let packages = selectedPackages

                      let index = packages.findIndex((v) => v.id == value.id)

                      if (packages[index].quantity == 1) {
                        let packages = selectedPackages.filter(
                          (ele) => ele.id != value.id,
                        )
                        await setSelectedPackages(packages)
                        await setIsUpdate(!isUpdate)
                        return 1
                      }

                      let quantity = packages[index].quantity - 1

                      let data = {
                        ...value,
                        total_price: value.quantity_applicate
                          ? value.price * quantity
                          : value.price,
                        quantity: value.quantity_applicate ? quantity : 1,
                      }

                      packages[index].total_price = await parseInt(
                        data?.total_price,
                      )
                      packages[index].quantity = await parseInt(data?.quantity)
                      await setSelectedPackages(packages)
                      await setIsUpdate(!isUpdate)
                    }}
                    style={{
                      cursor: 'pointer',
                      // color: checkIsSame(value)
                      //   ? getValue(value)?.quantity == 1
                      //     ? 'darkgray'
                      //     : ''
                      //   : '',
                    }}
                    class="site__incrementor__minus"
                  >
                    -
                  </span>
                  <span
                    type="site__incrementor__text"
                    style={{
                      textAlign: 'center',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      background: '#fff',
                      fontFamily: 'Urbanist__bold',
                    }}
                  >
                    {checkIsSame(value) && getValue(value)?.quantity}
                  </span>
                  <span
                    onClick={async () => {
                      let packages = selectedPackages

                      let index = packages.findIndex((v) => v.id == value.id)

                      let quantity = packages[index].quantity + 1

                      let data = {
                        ...value,
                        total_price: value.quantity_applicate
                          ? value.price * quantity
                          : value.price,
                        quantity: value.quantity_applicate ? quantity : 1,
                      }

                      packages[index].total_price = await parseInt(
                        data?.total_price,
                      )
                      packages[index].quantity = await parseInt(data?.quantity)

                      await setSelectedPackages(packages)

                      await setIsUpdate(!isUpdate)
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                    class="site__incrementor__plus"
                  >
                    +
                  </span>
                </div>
              )
            ) : (
              <div
                className="site__package__select__btn"
                onClick={async () => {
                  let packages = await selectedPackages
                  let data = {
                    ...value,
                    total_price: value.quantity_applicate
                      ? value.price * value.quantity
                      : value.price,
                    quantity: value.quantity_applicate ? value.quantity : 1,
                  }

                  if (
                    packages.filter((ele) => ele.id == value.id).length == 0
                  ) {
                    await packages.push(data)
                  } else {
                    let index = packages.findIndex((v) => v.id == value.id)
                    packages[index].total_price = await parseInt(
                      data?.total_price,
                    )
                    packages[index].quantity = await parseInt(data?.quantity)
                  }
                  await setSelectedPackages(packages)
                  await setIsUpdate(!isUpdate)
                  if (groupDetails?.is_single_selection) {
                    await checkSingleSelection(value, groupDetails)
                  }
                  // setSelectedPackage(data);
                }}
              >
                <p>Add</p>
                <div className="site__package__btn__img">
                  <img width="100%" src="/site__icons/icon__plus__dark.png" />
                </div>
              </div>
            )}
          </div>
          {checkIsSame(value) && (
            <Typography style={{display: 'none'}}>
              Total Price : £{getValue(value)?.total_price}
            </Typography>
          )}
        </div>
      </div>
      {value.quantity_applicate && checkIsSame(value) && (
        <div className="site__package__mb__qty">
          <span className="site__package__card__mb__quantity">
            £{value?.price ?? `~`} x {getValue(value)?.quantity}
          </span>

          <span className="site__package__card__mb__price">
            £{getValue(value)?.total_price}
          </span>
        </div>
      )}
      <div className="site__divider"></div>
      <div className="site__package__card__footer">
        {value?.description && (
          <div
            className="site__package__addon__title"
            dangerouslySetInnerHTML={{
              __html: value?.description,
            }}
          ></div>
        )}
        <p
          className="site__package__detail__header"
          style={{paddingTop: value?.description ? '15px' : '0rem'}}
          onClick={() => {
            let data = checkIsSame(value) ? getValue(value) : value
            setDetails(value)
            setDetailsGroup(groupDetails)
            isLaptop && setViewModal(true)
            setDetailsVisible()
            !isLaptop && handleScroll(value?.id)
            document
              ?.getElementById('site__package__info__section')
              ?.scrollTo(0, 0)
          }}
        >
          View Details
        </p>
      </div>
      {/* {allIncludedItem.length > 0 &&
        allIncludedItem.map((ele) => (
          <div className="site_accordion_title">{ele?.include_item_name}</div>
        ))} */}
    </Card>
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
    resetProductQA: () => dispatch(resetProductQA()),
    /* Add to cart */
    addProductToCart: (...args) => dispatch(addCart(...args)),
    /* Package Builder */
    fetchPackageBuilder: (data) => dispatch(getPackageBuilderRequest(data)),
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
