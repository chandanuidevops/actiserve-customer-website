import React, {useEffect, useState} from 'react'

/* Components */
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar'

/* Semantic UI */
import {
  Grid,
  Button,
  List,
  Icon,
  Image as SementicIMG,
  Segment,
  Card,
  CardContent,
  Loader,
} from 'semantic-ui-react'

import Image from 'next/image'

/* Helper Packages */
import {useMediaQuery} from 'react-responsive'
import Geolocation from 'react-geolocation'

/* Materail ui */
import {
  TextField,
  IconButton,
  withStyles,
  Drawer,
  DialogContent,
  makeStyles,
  Box,
  Typography,
  Chip,
  CardActions,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import {Brightness1, Close} from '@material-ui/icons'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {
  Accordion as AccordionUI,
  AccordionSummary as AccordionSummaryUI,
  AccordionActions as AccordionActionsUI,
  AccordionDetails as AccordionDetailsUI,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HelmetComponent from '../../components/Helmet'
/* Redux */
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'

/* Next Js */
import {useRouter} from 'next/router'

/* Actions */
import {
  getProductDetailsRequest,
  getProductOfferingRequest,
  getProductOfferDetailRequest,
} from '../../Stores/ProductDetails/actions'
import {addCart} from '../../Stores/Cart/actions'
import styled from 'styled-components'

/* Components */
import InvalidAccess from '../../components/InvalidAccess'
import Stepper from '../../components/Stepper'
import SiteFooter from '../../components/SiteFooter'
const quatity = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
]
const styles = (theme) => ({
  rootSecondary: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0px',

      '& .MuiFormControl-root': {
        color: '#2A2A2A',
      },
      '& fieldset': {
        border: '1px solid #C1C1C1',
        color: '#2A2A2A',
      },
      '&:hover fieldset': {
        border: '1px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&.Mui-focused fieldset': {
        // borderColor: '#2A2A2A',
        border: '1px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '& .MuiFormControl-root': {
        background: 'red',
      },
    },
    '& .MuiAutocomplete-inputRoot': {
      fontFamily: 'Urbanist',
      padding: '0px 20px !important',
      minHeight: '35px',
      maxHeight: '35px',
      minWidth: '70px',
      maxWidth: '70px',
      color: '#2A2A2A !important',
    },
    '&.MuiInputBase-input': {
      color: '#2A2A2A !important',
    },
    '&.MuiOutlinedInput-input': {
      color: 'red !important',
    },
    '&.MuiOutlinedInput-input::placeholder': {
      color: '#2A2A2A !important',
      fontSize: '16px',
    },
  },
  drawerPaper: {
    width: '100%',
    height: '65vh',
  },
  drawerPD: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  drawer__img: {
    width: '52px',
    height: '50px',
    marginRight: '16px',
  },
  drawer__header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '14px',
    paddingBottom: '14px',
  },
  drawer__divider: {
    borderBottom: '1px solid #DBE5EF',
  },
  drawer__close: {
    width: '18px',
    height: '18px',
    top: '0',
    right: '0',
    marginRight: '1rem',
    marginTop: '1rem',
    position: 'absolute',
  },
  drawer__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#000000',
  },
  drawer__info: {
    display: 'flex',
    alignItems: 'center',
  },
  drawer__product: {
    paddingTop: '26px',
    paddingBottom: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  product__info: {
    margin: '0',
    padding: '0',
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#000000',
    display: 'inline-block',
    textTransform: 'capitalize',
  },
  product__btn: {
    display: 'inline-block',
  },
  drawer__btn__section: {
    display: 'flex',
    alignItems: 'center',
  },
  product__text: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: '0.02em',
    color: '#000000',
  },
  product__price: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#2A2A2A',
  },
  drawer__addon: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '14px',
    paddingBottom: '14px',
  },
  drawer__flex: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '14px',
    paddingBottom: '14px',
    justifyContent: 'space-between',
  },
  drawer__addon__title: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#353535',
  },
  quantity__img: {
    width: '11px',
    height: '11px',
    margin: '0rem 0.714rem',
  },
  drawer__addon__quantity: {
    display: 'flex',
    alignItems: 'center',
  },
  addon__quantity: {
    margin: '0px',
    padding: '0px',
  },
  addon__quantity: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.02em',
    color: '#000000',
    margin: '0px',
    padding: '0px',
  },
  addon__price: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#000000',
  },
  discount__price: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#00A56F',
  },
  discount__title: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#353535',
  },
  drawer__footer: {
    paddingTop: '14px',
    paddingBottom: '14px',
    backgroundColor: '#E5F2FF',
  },
  footer__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#353535',
    textAlign: 'center',
    paddingBottom: '1.143rem',
  },
  footer__price: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#DB4A40',
  },
  footer__check: {
    width: '16px',
    height: '15px',
    marginRight: '0.571rem',
  },
  footer__content: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  footer__text: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    color: '#353535',
  },
  footer__mb: {
    paddingBottom: '12px',
  },
  qaDrawerPaper: {
    width: '100%',
    height: '100vh',
    maxWidth: theme.breakpoints.values.sm * 0.75,
  },
  qaDrawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px',
    borderBottom: '1px solid #DBE5EF',
  },
  qaDrawerTitle: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '38px',
    letterSpacing: '0.02em',
    color: '#21262b',
    paddingBottom: '20px',
  },
  qaDrawerTitleEdit: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20x',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  qaDrawerClose: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  qaDrawerContent: {
    // padding: '14px',
    backgroundColor: ' #f7f9fb',
    minHeight: '93vh',
  },
  qaDrawerInfo: {
    fontFamily: 'Urbanist__bold, sans-serif',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.07em',
    color: '#000000',
    fontSize: '22px',
    lineHeight: '26px',
    paddingBottom: '14px',
    textAlign: 'center',
  },
  prevBox: {
    position: 'absolute',
    left: '-15%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  prevButton: {
    minHeight: '58px',
    width: '38px',
    background: 'white',
    border: '2px solid #C1C1C1',
    color: '#FCBF49',
    padding: '1rem 0.4rem',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  addon__remove__icon: {
    width: '12px',
    height: '12px',
  },
  qaDrawerProduct: {
    fontFamily: 'Urbanist__bold, sans-serif',
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: '0.07em',
    color: '#DB4A40',
    fontSize: '16px',
    lineHeight: '19px',
    padding: '12px 0px',
    textAlign: 'center',
  },
  includedDrawerPadding: {
    padding: '1rem',
  },
  includedDrawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px',
    marginTop: '54px',
    marginBottom: '22px',
  },
  editQAHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '14px',
    paddingRight: '14px',
    alignItems: 'center',
    marginTop: '54px',
    marginBottom: '22px',
  },
  editQATitle: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '38px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  editQASubHeader: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.02em',
    color: 'rgba(33, 38, 43, 0.7)',
    margin: '0',
    padding: '1rem 0rem',
  },
  editQAContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.6rem 0rem',
    borderBottom: '1px solid rgba(33, 38, 43, 0.1)',
  },
  editQaPadding: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  editQAanwser: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.02em',
    color: '#rgba(33, 38, 43, 0.7)',
  },
  editQAButtonContainer: {
    width: '30%',
    float: 'right',
  },
  detailModal: {
    width: '100%',
    height: '100vh',
  },
})

const useStyles = makeStyles((theme) => ({
  MuiAccordionroot: {
    '&.MuiAccordion-root:before': {
      backgroundColor: 'white',
    },
    '&.MuiAccordion-root': {
      borderBottom: '1px solid rgba(33, 38, 43, 0.1)',
      borderRadius: '0px',
      marginBottom: '26px',
    },
    '&.MuiAccordionDetails-root': {
      padding: '0px',
    },
  },
}))

const AccordIcon = styled((props) => (
  <div {...props}>
    <div className="n">
      <img
        src="/site__icons/icon__accord__minus.png"
        width="20px"
        height="auto"
      />
    </div>
    <div className="y">
      <img
        src="/site__icons/icon__accord__plus.png"
        width="20px"
        height="20px"
      />
    </div>
  </div>
))`
  & > .y {
    display: block;
  }
  & > .n {
    display: none;
  }
  .Mui-expanded & > .n {
    display: flex;
  }
  .Mui-expanded & > .y {
    display: none;
  }
`

function SiteMain(props) {
  /* Destructure props */
  const {
    fetchProductDetails,
    classes,
    addProductToCart,
    fetchProductOffer,
    getProductOfferDetail,
  } = props

  const Router = useRouter()
  const muiClasses = useStyles()
  const {
    productOfferingDetails,
    isFetchingProductOffering,
    isFetchingProductOfferDetail,
    productOfferDetail,
  } = useSelector((state) => state?.ProductDetailsReducer)

  /* Detect window */
  const isBrowser = () => typeof window !== 'undefined'

  /* Routing Handler */
  /* to prevent unwanted route access */
  const [productExists, setProductExists] = useState(false)

  const [isPageLoading, setIsPageLoading] = useState(true)
  useEffect(() => {
    let timer1 = setTimeout(() => setIsPageLoading(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  /* State to maintain product from local storage */
  const [productDetails, setProductDetails] = useState(null)

  const [productQADetails, setProductQADetails] = useState([])
  const [ProductQAsValues, setProductQAsValues] = useState([])
  const [handleProductQasValues, setHandleProductQasValues] = useState(false)

  const [categoryDetails, setCategoryDetails] = useState()

  /* use location */
  const [location, setLocation] = useState(null)

  /* QA Edit State */
  const [isQaEditOpen, setQaEditOpen] = React.useState(false)
  const [currentQaEdit, setCurrentQaEdit] = React.useState({})
  const [selectedQA, setSelectedQA] = React.useState([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [allQAs, setAllQAs] = useState([])

  /* Recurring Week Type */
  const [recurringType, setRecurringType] = React.useState('One Off')

  /* Pricing Details */
  // Product Final Price
  const [price, setPrice] = useState(0)

  const [update, setUpdate] = useState(false)

  /* Selected Addon Array */
  const [selectedAddonIDs, setSelectedAddonIDs] = useState([])
  const [addonsTotal, setAddonsTotal] = useState(0)

  /* Summart Addon Mobile Drawer */
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false)

  /* Addon State */
  const [addonData, setAddonData] = useState([])

  /* Product QA */
  const [isFinish, setIsFinish] = useState(true)

  /* Group Name */
  const [groupName, setGroupName] = useState(null)

  /* Cart calculation */
  const [sub_total_price, set_sub_total_price] = useState(0)
  const [total_price, set_total_price] = useState(0)
  const [discount_price, set_discount_price] = useState(0)
  const [finalAddonsPrice, setFinalAddonsPrice] = useState(0)

  /* Product Offers */
  const [selectedProductOffer, setSelectedProductOffer] = useState('')
  const [selectedProductData, setSelectedProductData] = useState('')
  const [isproductOfferingModalOpen, setIsProductOfferingModalOpen] = useState(
    false,
  )
  const [productOfferingData, setProductOfferingData] = useState({
    bedrooms: 0,
    baths: 0,
    showers: 0,
  })
  const [productOfferinModalgData, setProductOfferingModalData] = useState({
    bedrooms: 0,
    baths: 0,
    showers: 0,
  })
  const [productOfferingRequest, setProdutOfferingRequest] = useState(false)

  const [
    isproductOfferDetailModalOpen,
    setIsProductOfferDetailModalOpen,
  ] = useState(false)

  /* Included Item */
  const [allIncludedItem, setAllIncludedItem] = useState([])
  const [isIncludeModalOpen, setIsIncludeModalOpen] = useState(false)
  const [includeModalData, setIncludeModalData] = useState()

  /* Get Cart Details From Local storage / Reducer */
  useEffect(() => {
    if (isBrowser() === true) {
      let cartItems = localStorage.getItem('cartItems')
      let categoryData = localStorage.getItem('categoryDetail')
      if (cartItems !== null && cartItems !== '') {
        let parsedCartData = JSON.parse(cartItems)
        if (parsedCartData?.addons?.length > 0) {
          setSelectedAddonIDs(parsedCartData?.addons)
          // setAddonData(parsedCartData?.addons)
          setUpdate(!update)
        }
      }
      if (categoryData) {
        setCategoryDetails(JSON.parse(categoryData))
      }
    }
  }, [])

  useEffect(() => {
    if (productQADetails?.length <= 0) {
      if (isBrowser() === true) {
        let qaDetails = localStorage.getItem('actiserve_cart_productqa_details')
        if (qaDetails !== null && qaDetails !== '') {
          let qaObj = JSON.parse(qaDetails)
          if (qaObj) {
            setProductQADetails(qaObj)
          }
        }
      }
    }

    if (productDetails === null) {
      if (isBrowser() === true) {
        let product_details = localStorage.getItem('actiserve_cart_product')
        if (product_details !== null && product_details !== '') {
          let productObj = JSON.parse(product_details)
          if (productObj) {
            setProductDetails(productObj)
          }
        }
      }
    }
    if (handleProductQasValues === false && ProductQAsValues?.length <= 0) {
      if (isBrowser() === true) {
        let qaValues = localStorage.getItem('actiserve_cart_productqa_values')
        if (qaValues !== null && qaValues !== '') {
          let qaValuesObj = JSON.parse(qaValues)
          if (qaValuesObj) {
            setProductQAsValues(qaValuesObj)
          }
        }
      }
    }
    if (groupName === null) {
      if (isBrowser() === true) {
        let dirty_title = localStorage.getItem('actiserve_user_city')
        if (dirty_title) {
          let clean__title = dirty_title.toLowerCase()
          setGroupName(clean__title)
        }
      }
    }
  }, [productQADetails, productDetails, ProductQAsValues, groupName])

  /* Addon State */
  useEffect(() => {
    if (productDetails?.product_addons?.length > 0) {
      let parsedAddons = JSON.parse(
        JSON.stringify(productDetails?.product_addons),
      )
      if (parsedAddons) {
        parsedAddons?.map((ele) => {
          ele.quantity = '1'
          ele.total = 1 * ele?.price
          ele.is_disabled = false
        })
        setAddonData(parsedAddons)
        if (isBrowser() === true) {
          let cartItems = localStorage.getItem('cartItems')
          if (cartItems !== null) {
            let parsedCartData = JSON.parse(cartItems)
            if (parsedCartData?.addons?.length > 0) {
              parsedAddons?.map((ele) => {
                parsedCartData?.addons?.map((selected) => {
                  if (selected?.id === ele?.id) {
                    ele.quantity = selected?.quantity
                    ele.total = selected?.total
                  }
                  setAddonData(parsedAddons)
                })
              })
            }
          }
        }
      }
    }

    if (productDetails) {
      setProductExists(true)
    } else {
      setProductExists(false)
    }
  }, [productDetails])

  /* Calculate Addons Total */
  useEffect(() => {
    let addon_total = 0
    if (selectedAddonIDs?.length > 0) {
      selectedAddonIDs.map((ele) => {
        addon_total += ele?.total
        setAddonsTotal(addon_total)
      })
    } else {
      setAddonsTotal(0)
    }
  }, [selectedAddonIDs])

  /* Get QA Total */
  useEffect(() => {
    var total = 0
    let noOfBaths = 0,
      noOfBedRooms = 0,
      noOfShowers = 0
    let points = 0
    ProductQAsValues.forEach((item) => {
      if (item?.value !== null && item?.value !== '') {
        total += parseInt(item?.value)
      } else if (
        item?.value === null ||
        item?.value === '' ||
        item?.value === 'NA'
      ) {
        total = 0
        setIsValueNull(true)
      }

      if (item.question_title.includes('bedrooms')) {
        noOfBedRooms = item.answer_title
      }

      if (item.question_title.includes('bathtubs')) {
        noOfBaths = item.answer_title
      }

      if (item.question_title.includes('showers')) {
        noOfShowers = item.answer_title
      }
    })
    if (
      // categoryDetails?.category_name?.toLowerCase() == 'boiler installation' &&
      // categoryDetails?.type_of_category?.name == 'is_installation' &&
      productDetails?.product_offering &&
      isFinish &&
      productDetails?.id
    ) {
      setProductOfferingData({
        baths: noOfBaths,
        bedrooms: noOfBedRooms,
        showers: noOfShowers,
      })

      points =
        parseInt(noOfBedRooms) + parseInt(noOfBaths) + parseInt(noOfShowers)
      setProdutOfferingRequest(true)
      fetchProductOffer({
        product_type: 'boiler',
        product_id: productDetails?.id,
        price: 'asc',
        points: points,
      })
    }
    setPrice(total)
  }, [ProductQAsValues])

  /* Get user details from location */
  useEffect(() => {
    if (productQADetails?.length <= 0) {
      if (isBrowser() === true) {
        let location = localStorage.getItem('actiserve_formatted_address')
        if (location !== null && location !== '') {
          setLocation(location)
        } else {
          let location = localStorage.getItem('actiserve_user_city')
          if (location !== null && location !== '') {
            setLocation(location)
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
    }
  }, [])

  /* Addon select handler */
  // AddOn Add Handler
  const addonHandler = (data, quantity) => {
    let tempData = selectedAddonIDs
    let addon_total = 0
    let addonExists = tempData?.filter((ele) => ele?.id === data?.id)
    let incoming__addon = JSON.parse(JSON.stringify(data))
    incoming__addon.quantity = quantity
    var indexOfStevie = tempData.findIndex((i) => i.id === data?.id)

    if (indexOfStevie > -1) {
      let data = {
        ...incoming__addon,
        quantity,
      }
      tempData.splice(indexOfStevie, 1, data)
    } else {
      incoming__addon.quantity = quantity
      tempData.push(incoming__addon)
    }
    setSelectedAddonIDs(tempData)
    setUpdate(!update)

    selectedAddonIDs.map((ele) => {
      addon_total += ele?.total
      setAddonsTotal(addon_total)
      setUpdate(!update)
    })
  }

  /*  */
  useEffect(() => {
    if (currentQaEdit !== {} && productQADetails?.length > 0) {
      let filteredQA = productQADetails.filter(
        (ele) => ele.id === currentQaEdit?.question,
      )
      if (filteredQA !== []) {
        let selected_qa = filteredQA?.[0]
        setSelectedQA(selected_qa)
      } else {
        selectedQA([])
      }
    }
  }, [currentQaEdit])

  function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i
      }
    }
    return -1
  }

  function handleQAChange(answer) {
    let alteredQAValues = JSON.parse(JSON.stringify(ProductQAsValues))
    let selectedIndex = findWithAttr(
      alteredQAValues,
      'question',
      answer?.question_id,
    )
    // index = alteredQAValues.findIndex(x => x.prop2 ==="yutu");
    let revisedQa = {
      answer: answer?.id,
      answer_title: answer?.answer_title,
      question: answer?.question_id,
      question_title: selectedQA?.question_title,
      value: answer?.value,
      image: answer?.answer_image,
    }
    if (alteredQAValues) {
      setProductQAsValues(alteredQAValues)
    }
    alteredQAValues.splice(selectedIndex, 1, revisedQa)
    setCurrentQaEdit(revisedQa)
  }

  /* Addon Quantity Handler */
  const handleAddonQuantityChange = async (addon, quantity) => {
    let tempData = JSON.parse(JSON.stringify(addonData))
    await tempData?.map((ele) => {
      if (ele?.id === addon?.id) {
        ele.quantity = quantity
        ele.total = ele.price * parseInt(ele.quantity)
      }
    })
    if (tempData) {
      setAddonData(tempData)
      setUpdate(!update)
    }
    setUpdate(!update)
  }

  const addonTextGenerator = (ele) => {
    let filteredData = []
    let lable = ''
    filteredData = selectedAddonIDs?.filter((data) => data?.id === ele?.id)
    if (filteredData?.length > 0) {
      lable = 'Save'
    } else {
      lable = 'Add'
    }
    return lable
  }

  useEffect(() => {
    if (ProductQAsValues) {
      ProductQAsValues?.map((data) => {
        let check_ans = data.answer_title.toLowerCase()
        if (check_ans.includes('4')) {
          setRecurringType('Every 4 Weeks')
        }
        if (check_ans.includes('8')) {
          setRecurringType('Every 8 Weeks')
        }
        if (check_ans.includes('one')) {
          setRecurringType('One Off')
        }
      })
    }
  }, [ProductQAsValues])

  // Reset Product QA Answers
  const handleResetProductQA = () => {
    setIsFinish(false)
    setProductQAsValues([])
    setHandleProductQasValues(true)
    if (productQADetails && productQADetails.length > 0) {
      setCurrentQuestion(productQADetails[0])
      setAllQAs(productQADetails)
      setProductQAsValues([])
    }
  }

  /* Product QA Answer Select Handler */
  const onSelectAnswer = (value) => {
    let tempData = JSON.parse(JSON.stringify(ProductQAsValues))
    let data = {
      question_title: currentQuestion?.question_title,
      question: currentQuestion.id,
      answer_title: value?.answer_title,
      answer: value.id,
      value: value?.value,
      image: value?.answer_image,
    }
    tempData.push(data)
    setProductQAsValues(tempData)
    if (value?.is_finished || value?.next_question == null) {
      // onFinish(tempData)
      setIsFinish(true)
    } else {
      allQAs.length > 0 &&
        allQAs.map((ele) => {
          if (value.next_question == ele.id) {
            setCurrentQuestion(ele)
          }
        })
    }
    let QaCount = allQAs.length
    let tempCount = tempData.length * 100
    // setProgressCount(tempCount / QaCount)

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
            setCurrentQuestion(ele)
            tempData.pop()
          }
        })
      setProductQAsValues(tempData)
      let QaCount = allQAs.length
      let tempCount = tempData.length * 100
    }
  }

  /* Addon Remove Handler */
  const addonRemoveHandler = (addon) => {
    if (addon) {
      let filteredIds = selectedAddonIDs.filter((i) => i.id !== addon?.id)
      setSelectedAddonIDs(filteredIds)
    }

    let tempData = JSON.parse(JSON.stringify(addonData))
    tempData?.map((ele) => {
      if (ele?.id === addon?.id) {
        ele.quantity = '1'
        ele.total = ele.price * 1
      }
    })

    setAddonData(tempData)
  }

  useEffect(() => {
    let tempAddonsTotal = 0
    let tempDiscount = 0
    let tempVatRate = 0
    let tempSubTotal = 0
    let tempTotal = 0
    setUpdate(!update)

    // Calculate addon
    if (selectedAddonIDs?.length > 0) {
      selectedAddonIDs.forEach((item) => {
        tempAddonsTotal += item?.total
      })
    } else {
      tempAddonsTotal = 0
    }

    // Calculate Discount
    tempDiscount =
      productDetails?.product_discount?.discount_type === 'amount'
        ? +productDetails?.product_discount?.amount
        : +(productDetails?.product_discount?.amount / 100) * price

    if (!isNaN(tempDiscount) && tempDiscount > 0) {
      tempSubTotal = price - tempDiscount
    } else {
      tempSubTotal = price
    }

    // Calculate VAT Rate
    if (productDetails?.vat_rate) {
      tempVatRate = (productDetails?.vat_rate / 100) * tempSubTotal
    }
    if (!isNaN(tempVatRate) && tempVatRate >= 0) {
      tempTotal = tempSubTotal + tempAddonsTotal + tempVatRate
    } else {
      tempTotal = tempSubTotal + tempAddonsTotal
    }

    set_sub_total_price(tempSubTotal)
    set_discount_price(tempDiscount?.toFixed(2))
    set_total_price(tempTotal)
    setUpdate(!update)
  }, [price, finalAddonsPrice, selectedAddonIDs, addonsTotal])

  // Calc addon price based on selection
  useEffect(() => {
    if (selectedAddonIDs?.length > 0) {
      var total = 0
      selectedAddonIDs.forEach((item) => {
        total += item?.price
      })
      setFinalAddonsPrice(total)
    } else if (selectedAddonIDs?.length === 0) {
      setFinalAddonsPrice(0)
    }
  }, [selectedAddonIDs])

  const handleCheckout = async () => {
    let product = {
      addons: await selectedAddonIDs,
      product_qa: await ProductQAsValues,
      quote_qa_grant_total: (await isNaN(price)) === true ? 0 : price,
      product: await productDetails,
      sub_total_price,
      total_price,
      discount_price,

      is_product_applicable: productDetails?.product_offering ?? false,
      product_selected:
        selectedProductData == '' ? '' : JSON.stringify(selectedProductData),
      is_package_applicable: false,
      packages_selected: null,
      // qa_images: uploadedFileData?.length > 0 ? uploadedFileData : [],
    }
    if (product) {
      localStorage.setItem('cartItems', JSON.stringify(product))
      localStorage.setItem(
        'actiserve_cart_addons',
        JSON.stringify(selectedAddonIDs),
      )
      localStorage.setItem(
        'actiserve_cart_productqa_values',
        JSON.stringify(ProductQAsValues),
      )
      // localStorage.setItem('actiserve_cart_images', "")
      addProductToCart(product)
    }
    if (productDetails?.addon_next_step && productDetails?.is_addon) {
      Router.push('/site-summary/addon')
    } else {
      Router.push('/checkout')
    }
  }

  const onProductOfferApply = () => {
    let data = productOfferinModalgData
    setProductOfferingData(data)
    let points =
      parseInt(data?.bedrooms) + parseInt(data.baths) + parseInt(data.showers)

    setProdutOfferingRequest(true)
    fetchProductOffer({
      product_type: 'boiler',
      product_id: productDetails?.id,
      price: 'asc',
      points: points,
    })
    setIsProductOfferingModalOpen(false)
  }

  function hexToRgbA(hex) {
    var c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('')
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      }
      c = '0x' + c.join('')
      return (
        'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
      )
    }
  }

  function hexToRgbAOpacity(hex) {
    var c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('')
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      }
      c = '0x' + c.join('')
      return (
        'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.1)'
      )
    }
  }

  return (
    <>
      {isPageLoading ? (
        <div style={{height: '50vh', display: 'flex', alignItems: 'center'}}>
          <Loader active inline="centered" />
        </div>
      ) : productExists ? (
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
          <SiteMainNavbar />

          <div className="site__bg__light">
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
                                      ? '#3698FF'
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
                        {currentQuestion !== '' &&
                          currentQuestion?.answers &&
                          currentQuestion?.answers.length > 0 &&
                          currentQuestion?.answers.map((ele, i) => {
                            return (
                              <Grid.Column
                                className="ldp__quote__column"
                                onClick={() => onSelectAnswer(ele)}
                                style={{padding: '0rem 0rem !important'}}
                              >
                                <Segment className="ldp__quote__segment">
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
                            src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.answer_image}&width=180&height=144`}
                            alt="Urbanserve Product Icon"
                            quality={100}
                            width={isTabletOrMobile ? 60 : '100%'}
                            height={isTabletOrMobile ? 48 : '100%'}
                            className="drawer__item__img"
                            // blurDataURL={rgbDataURL(5, 135, 255)}
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                            placeholder="blur"
                          /> */}
                                  </div>
                                  <p style={{margin: '0'}}>
                                    {ele?.answer_title}
                                  </p>
                                </Segment>
                              </Grid.Column>
                            )
                          })}
                        <Box className={`${classes.prevBox} ldp__prevBox`}>
                          {ProductQAsValues.length > 0 && (
                            <Box
                              variant="contained"
                              color="primary"
                              className={classes.prevButton}
                              onClick={() => {
                                onPrev()
                                // setArrowEnter(false)
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
                        // setArrowEnter(false)
                      }}
                    >
                      <img
                        src="/site__main__images/site__arrow__left.png"
                        width="100%"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {isFinish === true && (
              <>
                <Stepper
                  activeStep={['confirm']}
                  completeStep={[]}
                  showAddon={false}
                />

                {/* Product Header Start */}
                <section className="site__summary__header__wrapper">
                  <div className="site__summary__header__container site_xl_container">
                    <div className="site__summary__header__content">
                      <div className="site__summary__header__text">
                        <h3>
                          {productDetails?.title
                            ?.toLowerCase()
                            ?.includes('boiler')
                            ? `Choose your boiler`
                            : productDetails?.title}
                        </h3>
                        {productDetails?.title
                          ?.toLowerCase()
                          ?.includes('boiler') && (
                          <p>
                            Insallation by Gas Safe Registered Engineer, Free
                            System Clean and More
                          </p>
                        )}
                      </div>
                      <img
                        src="/site__main__images/site__quality__main.png"
                        alt="Urbanserve"
                        width="100%"
                      />
                    </div>
                  </div>
                </section>
                {/* Product Header End */}

                {/* Mobile Button Section Start */}
                {productDetails?.title?.toLowerCase()?.includes('boiler') ==
                  false && (
                  <section className="site__summary__mb__btn site__bg__white">
                    <div className="site__summary__mb__btn__content">
                      <div className="site__btn__divider site__btn__divider__mb"></div>
                      <div className="site__mb__btn">
                        <Button className="summary__mb__btn mb__btn_mr">
                          Your Selections
                        </Button>
                        <Button className="summary__mb__btn">Add On’s</Button>
                      </div>
                      <div className="site__btn__divider site__btn__divider__mt"></div>
                    </div>
                  </section>
                )}
                {/* Mobile Button Section End */}

                {/* Mobile location section */}
                {/* <section className="site__summary__mb__loc site__bg__white">
        <div className="site_summary__mb__loc__content">
          <img
            width="100%"
            src="/site__main__images/site__location__dark.png"
          />
          <span>{location}</span>
        </div>
      </section> */}
                {/* Mobile location section */}

                {productDetails?.title?.toLowerCase()?.includes('boiler') && (
                  <h3 className="site__summary__blr__header">
                    Your Fixed Priced Installation includes VAT and comes with
                    bells and whistles to make your installation atmost
                    convinient.
                  </h3>
                )}

                {productDetails?.product_offering && (
                  <div className="site__summary__filter">
                    <div className="filter__content">
                      <div className="filter__content__mb__card">
                        <ul className="filter__content__mb__card__list">
                          <li onClick={() => handleResetProductQA()}>
                            Start Over{' '}
                            <img
                              width="16px"
                              height="16px"
                              src="/site__main__images/site__reset__primary.png"
                            />
                          </li>
                          <li
                            onClick={() => {
                              setIsProductOfferingModalOpen(true)
                              setProductOfferingModalData(productOfferingData)
                            }}
                          >
                            Edit Answers
                            <img
                              width="36px"
                              height="18px"
                              src="/site__main__images/icon__filter.png"
                              style={{objectFit: 'contain'}}
                            />
                          </li>
                        </ul>
                      </div>
                      <ul className="filter__content_list">
                        <li
                          onClick={() => handleResetProductQA()}
                          style={{cursor: 'pointer'}}
                        >
                          Start Over{' '}
                          <img
                            width="16px"
                            height="16px"
                            src="/site__main__images/site__reset__primary.png"
                          />
                        </li>
                        <li>
                          {productOfferingData.bedrooms} Bed{' '}
                          <img
                            width="16px"
                            height="16px"
                            src="/site__main__images/site__reset__primary.png"
                          />{' '}
                        </li>
                        <li>
                          {productOfferingData?.baths} Baths{' '}
                          <img
                            width="16px"
                            height="16px"
                            src="/site__main__images/site__reset__primary.png"
                          />
                        </li>
                        <li>
                          {productOfferingData?.showers} Showers{' '}
                          <img
                            width="16px"
                            height="16px"
                            src="/site__main__images/site__reset__primary.png"
                          />
                        </li>
                        <li
                          onClick={() => {
                            setIsProductOfferingModalOpen(true)
                            setProductOfferingModalData(productOfferingData)
                          }}
                          style={{cursor: 'pointer'}}
                        >
                          Edit Answers
                          <img
                            width="36px"
                            height="18px"
                            src="/site__main__images/icon__filter.png"
                            style={{objectFit: 'contain'}}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Main content */}
                <section
                  className="site__summary__main__wrapper"
                  className={
                    productDetails?.title?.toLowerCase()?.includes('boiler')
                      ? 'site__summary__main__wrapper'
                      : 'site__summary__main__wrapper site_xl_container'
                  }
                  style={{
                    backgroundColor: productDetails?.title
                      ?.toLowerCase()
                      ?.includes('boiler')
                      ? 'white'
                      : 'transparent',
                  }}
                >
                  <div
                    className="site__summary__main__container"
                    style={{
                      marginTop: productDetails?.title
                        ?.toLowerCase()
                        ?.includes('boiler')
                        ? '16px'
                        : '',
                    }}
                  >
                    {productDetails?.product_offering ? (
                      isFetchingProductOffering ? (
                        <>
                          <div
                            style={{
                              height: '50vh',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Loader active inline="centered" style={{}} />
                          </div>
                        </>
                      ) : (
                        <div>
                          {productOfferingDetails &&
                          productOfferingDetails.length > 0 ? (
                            productOfferingDetails.map((val, i) => (
                              <Box
                                style={{
                                  borderTop: '2px solid #e9e9ea',
                                  borderBottom: '2px solid #e9e9ea',
                                  marginBottom: '40px',
                                }}
                              >
                                <div
                                  className="site_xxl_container"
                                  style={
                                    {
                                      // borderTop: '1px solid #e9e9ea',
                                      // borderBottom: '1px solid #e9e9ea',
                                    }
                                  }
                                >
                                  <Grid className="site__summary__offer__grid">
                                    <Grid.Column
                                      only="mobile"
                                      mobile={16}
                                      className="site__summary__offer__col"
                                    >
                                      <div className="site__offer__mb__card">
                                        <div className="site__offer__mb__img">
                                          <img
                                            // component="img"
                                            height="280"
                                            width="240"
                                            src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${val?.product_offering_image[0]?.file?.id}/show-file`}
                                            alt="green iguana"
                                          />
                                          <div className="site__offer__mb__card__content">
                                            <h3>{val.title}</h3>
                                            {/* <p>{val.description}</p> */}
                                            {/* Chips */}
                                            <div className="site__offer__mb__chips">
                                              {val.product_use &&
                                                val.product_use.length > 0 &&
                                                val.product_use.map((val) => (
                                                  <Chip
                                                    label={
                                                      val?.marketing_badge_text
                                                    }
                                                    className="ProductOfferingBadge"
                                                    style={{
                                                      background: hexToRgbAOpacity(
                                                        val?.marketing_badge_color,
                                                      ),
                                                      borderRadius: '6px',
                                                      color: hexToRgbA(
                                                        val?.marketing_badge_color,
                                                      ),
                                                      // filter: `opacity(10)`,
                                                    }}
                                                  />
                                                ))}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="site__offer__mb__info">
                                          {val.warranty?.length > 0 &&
                                            val?.warranty?.map((ele) => (
                                              <div className="site__offer__warrant">
                                                <img
                                                  height="20"
                                                  width="20"
                                                  src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file`}
                                                  alt="Warrenty icon"
                                                />
                                                {/* <Image
                                        src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file&width=60&height=60`}
                                        alt="Urbanserve Product Icon"
                                        quality={100}
                                        height="20"
                                        width="20"
                                        // blurDataURL={rgbDataURL(5, 135, 255)}
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                        placeholder="blur"
                                      /> */}
                                                <p>
                                                  {ele.years} Years Warranty
                                                </p>
                                              </div>
                                            ))}

                                          {val?.max_radiators && (
                                            <div className="site__offer__warrant site__offer__warrant__pt">
                                              <img
                                                src="/site__icons/icon__radiator.png"
                                                alt="Urbanserve"
                                              />
                                              <p>
                                                Powers upto {val?.max_radiators}{' '}
                                                radiators
                                              </p>
                                            </div>
                                          )}

                                          {val?.thermostat?.length > 0 &&
                                            val?.thermostat?.map((ele) => (
                                              <div className="site__offer__warrant site__offer__warrant__pt">
                                                <img
                                                  src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file`}
                                                  alt="Urbanserve"
                                                />
                                                {/* <Image
                                      src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file&width=60&height=60`}
                                      alt="Urbanserve Product Icon"
                                      quality={100}
                                      height="20"
                                      width="20"
                                      // blurDataURL={rgbDataURL(5, 135, 255)}
                                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                      placeholder="blur"
                                    /> */}
                                                <p>{ele?.title}</p>
                                              </div>
                                            ))}
                                          <div className="site__offer__details">
                                            <h5
                                              className="site__offer__details__view"
                                              onClick={() => {
                                                setIsProductOfferDetailModalOpen(
                                                  true,
                                                )
                                                getProductOfferDetail({
                                                  id: val?.id,
                                                })
                                              }}
                                            >
                                              View Details
                                            </h5>
                                            <h5
                                              onClick={() => {
                                                setIsIncludeModalOpen(true)
                                                setIncludeModalData(
                                                  val?.include,
                                                )
                                              }}
                                              className="site__offer__details__see"
                                            >
                                              See What's Included
                                            </h5>
                                          </div>

                                          <div className="site__offer__btn__section">
                                            <h4 className="ProductOfferingPriceTitle">
                                              Your Fixed Price (inc.
                                              Installation)
                                            </h4>
                                            <h2 className="ProductOfferingPrice">
                                              £{val.price}
                                            </h2>
                                            <p className="ProductOfferingVatInc">
                                              VAT included
                                            </p>

                                            <div
                                              style={{
                                                textAlign: 'center',
                                                paddingTop: '8px',
                                              }}
                                            >
                                              <p className="ProductOfferingFromPrice">
                                                or from{' '}
                                                <span
                                                  style={{
                                                    textDecoration: 'underline',
                                                    color: '#21262B',
                                                    textUnderlineOffset: '5px',
                                                  }}
                                                >
                                                  {' '}
                                                  £10 a month{' '}
                                                </span>{' '}
                                                at 10.9% APR
                                              </p>
                                            </div>

                                            <Button
                                              fluid
                                              className="btn__quote__outline site__offer__btn__outlined"
                                            >
                                              Save Quote
                                            </Button>

                                            <Button
                                              fluid
                                              className="btn__quote__field site__offer__btn__filled"
                                              onClick={() => {
                                                setSelectedProductOffer(val?.id)
                                                setSelectedProductData(val)
                                                setPrice(+val?.price)
                                              }}
                                            >
                                              {val?.id === selectedProductOffer
                                                ? 'Selected'
                                                : 'Choose'}
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </Grid.Column>
                                    {/* tablet */}
                                    <Grid.Column
                                      only="tablet"
                                      tablet={8}
                                      className="site__summary__offer__col"
                                    >
                                      <div className="site__offer__mb__img">
                                        <div style={{textAlign: 'center'}}>
                                          <img
                                            // component="img"
                                            height="280"
                                            width="240"
                                            src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${val?.product_offering_image[0]?.file?.id}/show-file`}
                                            alt="green iguana"
                                          />
                                          {/* <Image
                                  src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${val?.product_offering_image[0]?.file?.id}/show-file&width=280&height=240`}
                                  alt="Urbanserve Product Icon"
                                  quality={100}
                                  height="280"
                                  width="240"
                                  // blurDataURL={rgbDataURL(5, 135, 255)}
                                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                  placeholder="blur"
                                /> */}
                                        </div>
                                        <div className="site__offer__mb__card__content">
                                          <h3>{val.title}</h3>
                                          <p>{val.description}</p>
                                          {/* Chips */}
                                          <div className="site__offer__mb__chips">
                                            {val.product_use &&
                                              val.product_use.length > 0 &&
                                              val.product_use.map((val) => (
                                                <Chip
                                                  label={
                                                    val?.marketing_badge_text
                                                  }
                                                  className="ProductOfferingBadge"
                                                  style={{
                                                    background: hexToRgbAOpacity(
                                                      val?.marketing_badge_color,
                                                    ),
                                                    borderRadius: '6px',
                                                    color: hexToRgbA(
                                                      val?.marketing_badge_color,
                                                    ),
                                                  }}
                                                />
                                              ))}
                                          </div>
                                          <div className="site__offer__mb__info"></div>
                                        </div>
                                      </div>
                                    </Grid.Column>
                                    <Grid.Column
                                      only="tablet"
                                      tablet={8}
                                      className="site__summary__offer__col "
                                    >
                                      <div className="site__offer__mb__info">
                                        {val.warranty?.length > 0 &&
                                          val?.warranty?.map((ele) => (
                                            <div className="site__offer__warrant">
                                              <img
                                                height="20"
                                                width="20"
                                                src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file`}
                                                alt="Warrenty icon"
                                              />
                                              {/* <Image
                                      src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file&width=60&height=60`}
                                      alt="Urbanserve Product Icon"
                                      quality={100}
                                      height="20"
                                      width="20"
                                      // blurDataURL={rgbDataURL(5, 135, 255)}
                                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                      placeholder="blur"
                                    /> */}
                                              <p>{ele.years} Years Warranty</p>
                                            </div>
                                          ))}

                                        {val?.max_radiators && (
                                          <div className="site__offer__warrant site__offer__warrant__pt">
                                            <img
                                              src="/site__icons/icon__radiator.png"
                                              alt="Urbanserve"
                                            />
                                            <p>
                                              Powers upto {val?.max_radiators}{' '}
                                              radiators
                                            </p>
                                          </div>
                                        )}

                                        {val?.thermostat?.length > 0 &&
                                          val?.thermostat?.map((ele) => (
                                            <div className="site__offer__warrant site__offer__warrant__pt">
                                              <img
                                                src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file`}
                                                alt="Urbanserve"
                                              />
                                              {/* <Image
                                      src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file&width=60&height=60`}
                                      alt="Urbanserve Product Icon"
                                      quality={100}
                                      height="20"
                                      width="20"
                                      // blurDataURL={rgbDataURL(5, 135, 255)}
                                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                      placeholder="blur"
                                    /> */}
                                              <p>{ele?.title}</p>
                                            </div>
                                          ))}

                                        <div className="site__offer__details">
                                          <h5
                                            className="site__offer__details__view"
                                            onClick={() => {
                                              setIsProductOfferDetailModalOpen(
                                                true,
                                              )
                                              getProductOfferDetail({
                                                id: val?.id,
                                              })
                                            }}
                                          >
                                            View Details
                                          </h5>
                                          <h5
                                            onClick={() => {
                                              setIsIncludeModalOpen(true)
                                              setIncludeModalData(val?.include)
                                            }}
                                            className="site__offer__details__see"
                                          >
                                            See What's Included
                                          </h5>
                                        </div>
                                        <div className="site__offer__btn__section">
                                          <h4 className="ProductOfferingPriceTitle">
                                            Your Fixed Price (inc. Installation)
                                          </h4>
                                          <h2 className="ProductOfferingPrice">
                                            £{val.price}
                                          </h2>
                                          <p className="ProductOfferingVatInc">
                                            VAT included
                                          </p>

                                          <div
                                            style={{
                                              textAlign: 'center',
                                              paddingTop: '8px',
                                            }}
                                          >
                                            <p className="ProductOfferingFromPrice">
                                              or from{' '}
                                              <span
                                                style={{
                                                  textDecoration: 'underline',
                                                  color: '#21262B',
                                                  textUnderlineOffset: '5px',
                                                }}
                                              >
                                                {' '}
                                                £10 a month{' '}
                                              </span>{' '}
                                              at 10.9% APR
                                            </p>
                                          </div>

                                          <Button
                                            fluid
                                            className="btn__quote__outline site__offer__btn__outlined"
                                          >
                                            Save Quote
                                          </Button>

                                          <Button
                                            fluid
                                            className="btn__quote__field site__offer__btn__filled"
                                            onClick={() => {
                                              setSelectedProductOffer(val?.id)
                                              setSelectedProductData(val)
                                              setPrice(+val?.price)
                                            }}
                                          >
                                            {val?.id === selectedProductOffer
                                              ? 'Selected'
                                              : 'Choose'}
                                          </Button>
                                        </div>
                                      </div>
                                    </Grid.Column>
                                    {/* Desktop */}
                                    <Grid.Column
                                      only="computer"
                                      computer={4}
                                      className="site__summary__offer__col col__img__center site__summary__offer__col__bg"
                                    >
                                      <div className="site__offer__mb__img">
                                        <img
                                          // component="img"
                                          height="280"
                                          width="240"
                                          src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${val?.product_offering_image[0]?.file?.id}/show-file`}
                                          alt="green iguana"
                                        />
                                        {/* <Image
                                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${val?.product_offering_image[0]?.file?.id}/show-file&width=280&height=240`}
                                alt="Urbanserve Product Icon"
                                quality={100}
                                height="280"
                                width="240"
                                // blurDataURL={rgbDataURL(5, 135, 255)}
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                placeholder="blur"
                              /> */}
                                      </div>
                                    </Grid.Column>
                                    <Grid.Column
                                      only="computer"
                                      computer={7}
                                      stretched={true}
                                      className="site__summary__offer__col site__summary__offer__col__border site__summary__offer__col__expd"
                                    >
                                      <div className="site__offer__mb__card__content">
                                        <h3>{val.title}</h3>
                                        <p>{val.description}</p>
                                        {/* Chips */}
                                        <div className="site__offer__mb__chips">
                                          {val.product_use &&
                                            val.product_use.length > 0 &&
                                            val.product_use.map((val) => (
                                              <Chip
                                                label={
                                                  val?.marketing_badge_text
                                                }
                                                className="ProductOfferingBadge"
                                                style={{
                                                  background: hexToRgbAOpacity(
                                                    val?.marketing_badge_color,
                                                  ),
                                                  borderRadius: '6px',
                                                  color: hexToRgbA(
                                                    val?.marketing_badge_color,
                                                  ),
                                                }}
                                              />
                                            ))}
                                        </div>
                                        <div className="site__offer__mb__info">
                                          {val.warranty?.length > 0 &&
                                            val?.warranty?.map((ele) => (
                                              <div className="site__offer__warrant">
                                                <img
                                                  height="20"
                                                  width="20"
                                                  src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file`}
                                                  alt="Warrenty icon"
                                                />
                                                {/* <Image
                                        src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file&width=60&height=60`}
                                        alt="Urbanserve Product Icon"
                                        quality={100}
                                        height="20"
                                        width="20"
                                        // blurDataURL={rgbDataURL(5, 135, 255)}
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                        placeholder="blur"
                                      /> */}
                                                <p>
                                                  {ele.years} Years Warranty
                                                </p>
                                              </div>
                                            ))}

                                          {val?.max_radiators && (
                                            <div className="site__offer__warrant site__offer__warrant__pt">
                                              <img
                                                src="/site__icons/icon__radiator.png"
                                                alt="Urbanserve"
                                              />
                                              <p>
                                                Powers upto {val?.max_radiators}{' '}
                                                radiators
                                              </p>
                                            </div>
                                          )}
                                          {val?.thermostat?.length > 0 &&
                                            val?.thermostat?.map((ele) => (
                                              <div className="site__offer__warrant site__offer__warrant__pt">
                                                <img
                                                  src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file`}
                                                  alt="Urbanserve"
                                                />
                                                {/* <Image
                                      src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/files/${ele?.icon_id?.id}/show-file&width=60&height=60`}
                                      alt="Urbanserve Product Icon"
                                      quality={100}
                                      height="20"
                                      width="20"
                                      // blurDataURL={rgbDataURL(5, 135, 255)}
                                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                      placeholder="blur"
                                    /> */}
                                                <p>{ele?.title}</p>
                                              </div>
                                            ))}

                                          <div className="site__offer__details">
                                            <h5
                                              className="site__offer__details__view"
                                              onClick={() => {
                                                setIsProductOfferDetailModalOpen(
                                                  true,
                                                )
                                                getProductOfferDetail({
                                                  id: val?.id,
                                                })
                                              }}
                                            >
                                              View Details
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </Grid.Column>
                                    <Grid.Column
                                      only="computer"
                                      computer={5}
                                      className="site__summary__offer__col site__summary__offer__col__bg"
                                      stretched={true}
                                    >
                                      <div className="site__offer__mb__info">
                                        <div className="site__offer__btn__section">
                                          <div>
                                            <h4 className="ProductOfferingPriceTitle">
                                              Your Fixed Price (inc.
                                              Installation)
                                            </h4>
                                            <h2 className="ProductOfferingPrice">
                                              £{val.price}
                                            </h2>
                                            <p className="ProductOfferingVatInc">
                                              VAT included
                                            </p>

                                            <div
                                              style={{
                                                textAlign: 'center',
                                                paddingTop: '8px',
                                              }}
                                            >
                                              <p className="ProductOfferingFromPrice">
                                                or from{' '}
                                                <span
                                                  style={{
                                                    textDecoration: 'underline',
                                                    color: '#21262B',
                                                    textUnderlineOffset: '5px',
                                                  }}
                                                >
                                                  {' '}
                                                  £10 a month{' '}
                                                </span>{' '}
                                                at 10.9% APR
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <p
                                              className="site__dsk__see__text"
                                              onClick={() => {
                                                setIsIncludeModalOpen(true)
                                                setIncludeModalData(
                                                  val?.include,
                                                )
                                              }}
                                            >
                                              See What's included
                                            </p>
                                            <Button
                                              fluid
                                              className="btn__quote__outline site__offer__btn__outlined"
                                            >
                                              Save Quote
                                            </Button>

                                            <Button
                                              fluid
                                              className="btn__quote__field site__offer__btn__filled"
                                              onClick={() => {
                                                setSelectedProductOffer(val?.id)
                                                setSelectedProductData(val)
                                                setPrice(+val?.price)
                                              }}
                                            >
                                              {val?.id === selectedProductOffer
                                                ? 'Selected'
                                                : 'Choose'}
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </Grid.Column>
                                  </Grid>
                                </div>
                              </Box>
                            ))
                          ) : (
                            <h3
                              className="drawer__error__text"
                              style={{
                                textAlign: 'center',
                                padding: '1.8rem 0rem',
                              }}
                            >
                              No product found according to your preferences.
                              Please edit your answers and try again.
                            </h3>
                          )}
                        </div>
                      )
                    ) : (
                      <Grid className="site__summary__grid">
                        <Grid.Column
                          className="site__summary__col__one"
                          mobile={16}
                          tablet={10}
                          computer={10}
                        >
                          {!productDetails?.product_offering && (
                            <>
                              <div className="site__col__one__header">
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <img
                                    src="/site__main__images/site__check__dark.png"
                                    alt="Urbanserve"
                                    width="100%"
                                  />
                                  <p>Your Selections</p>
                                </div>

                                <p
                                  onClick={() => handleResetProductQA()}
                                  className="site__col__one__start"
                                >
                                  Start Over
                                  <img
                                    src="/site__main__images/site__reset__primary.png"
                                    alt="Urbanserve"
                                    width="100%"
                                  />
                                </p>
                              </div>
                              <div className="site__col__one__content site__bg__white">
                                {ProductQAsValues?.map((product_QA, i) => (
                                  <div className="qa__section">
                                    <h4 className="qa__title">
                                      {product_QA?.question_title}
                                    </h4>
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <div className="qa__image__section">
                                        {/* <img
                                          src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${product_QA?.image}`}
                                          alt="Urbanserve"
                                          className="qa__image"
                                        /> */}
                                        {product_QA?.image ? (
                                          <img
                                            src={
                                              product_QA?.image?.type ===
                                              'public'
                                                ? `${product_QA?.image?.file_path}`
                                                : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${product_QA?.image?.id}/show-file`
                                            }
                                            alt="Urbanserve Service Icon"
                                            width="100%"
                                            className="qa__image"
                                          />
                                        ) : (
                                          <img
                                            src="/site__main__images/product__image.png"
                                            width="100%"
                                            className="qa__image"
                                          />
                                        )}
                                        {/* <Image
                                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${product_QA?.image}&width=114&height=102`}
                                alt="Urbanserve Product Icon"
                                quality={100}
                                height="34"
                                width="38"
                                // blurDataURL={rgbDataURL(5, 135, 255)}
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                placeholder="blur"
                              /> */}
                                      </div>
                                      <h4 className="qa__info">
                                        {product_QA?.answer_title}
                                      </h4>
                                      <img
                                        src="/site__main__images/site__edit.png"
                                        alt="Urbanserve"
                                        width="100%"
                                        className="qa__edit__icon"
                                        onClick={() => {
                                          setQaEditOpen(true)
                                          setCurrentQaEdit(product_QA)
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {/* <Button
                      className="qa__reset__btn"
                      onClick={() => handleResetProductQA()}
                    >
                      Start Over
                      <img
                        src="/site__main__images/site__reset.png"
                        alt="Urbanserve"
                        width="100%"
                      />
                    </Button> */}
                            </>
                          )}
                        </Grid.Column>

                        <Grid.Column
                          className="site__summary__col__two"
                          mobile={16}
                          tablet={6}
                          computer={6}
                        >
                          {productDetails?.is_addon && (
                            <>
                              <div className="site__col__two__header">
                                <p>ADD ON’s</p>
                              </div>
                              {addonData?.length > 0 && (
                                <section className="ldp-addon-wrapper">
                                  <div className="site__col__two__content">
                                    {addonData?.length > 0 &&
                                      addonData?.map((ele, i) => (
                                        <>
                                          <div className="site__addon__card">
                                            <div className="site__addon__card__content">
                                              <div className="addon__card__body">
                                                <div className="addon__card__img">
                                                  {ele?.image !== null ? (
                                                    <img
                                                      src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.image?.id}`}
                                                      alt="Urbanserve"
                                                      width="100%"
                                                    />
                                                  ) : (
                                                    //   <Image
                                                    //   src={`${process.env.NEXT_PUBLIC_APP_IMAGE_SERVER}image-resize?url=${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.image?.id}&width=150&height=150`}
                                                    //   alt="Urbanserve Product Icon"
                                                    //   quality={100}
                                                    //   height="50"
                                                    //   width="50"
                                                    //   // blurDataURL={rgbDataURL(5, 135, 255)}
                                                    //   blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(10, 20))}`}
                                                    //   placeholder="blur"
                                                    // />
                                                    <img
                                                      src="/site__main__images/site__addon.png"
                                                      alt="Urbanserve"
                                                      width="100%"
                                                    />
                                                  )}
                                                </div>
                                                <div className="addon__card__content">
                                                  <div className="addon__card__content__text">
                                                    <h3>{ele.title}</h3>
                                                    <p>{`£ ${ele.price} per unit`}</p>
                                                  </div>
                                                  <div className="addon__card__content__chip">
                                                    <p>One off</p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="addon__card__footer">
                                                <div className="card__footer__left">
                                                  <Autocomplete
                                                    id="free-solo-2-demo"
                                                    variant="outlined"
                                                    disableClearable
                                                    options={quatity}
                                                    classes={{
                                                      root:
                                                        classes.rootSecondary,
                                                    }}
                                                    value={ele?.quantity}
                                                    onChange={(e, newValue) => {
                                                      handleAddonQuantityChange(
                                                        ele,
                                                        newValue,
                                                      )
                                                    }}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        size="small"
                                                      />
                                                    )}
                                                  />
                                                  <img
                                                    width="100%"
                                                    src="/site__main__images/site__close.png"
                                                    alt="Urbanserve"
                                                  />
                                                  <p>£{ele?.price}</p>
                                                </div>
                                                <div className="card__footer__right">
                                                  <p>£{ele?.total}</p>
                                                  <Button
                                                    disabled={
                                                      ele?.quantity ===
                                                      selectedAddonIDs.filter(
                                                        (i) => i.id === ele?.id,
                                                      )?.[0]?.quantity
                                                        ? true
                                                        : false
                                                    }
                                                    className="card__footer__btn"
                                                    onClick={() => {
                                                      addonHandler(
                                                        ele,
                                                        ele?.quantity,
                                                      )
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        ele?.quantity ===
                                                        selectedAddonIDs.filter(
                                                          (i) =>
                                                            i.id === ele?.id,
                                                        )?.[0]?.quantity
                                                          ? '#E9E9EA'
                                                          : 'transparent',
                                                      border:
                                                        ele?.quantity ===
                                                        selectedAddonIDs.filter(
                                                          (i) =>
                                                            i.id === ele?.id,
                                                        )?.[0]?.quantity
                                                          ? 'none'
                                                          : '1px solid #0587FF',
                                                      color:
                                                        ele?.quantity ===
                                                        selectedAddonIDs.filter(
                                                          (i) =>
                                                            i.id === ele?.id,
                                                        )?.[0]?.quantity
                                                          ? 'rgba(33, 38, 43, 0.5'
                                                          : '#0587FF',
                                                    }}
                                                  >
                                                    {addonTextGenerator(ele)}
                                                  </Button>
                                                </div>
                                              </div>
                                              {selectedAddonIDs.filter(
                                                (i) => i.id === ele?.id,
                                              )?.length > 0 && (
                                                <div
                                                  className="site__package__remove__btn"
                                                  onClick={() =>
                                                    addonRemoveHandler(ele)
                                                  }
                                                  style={{
                                                    marginTop: '18px',
                                                    maxWidth: '96px',
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
                                              )}
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                  </div>
                                </section>
                              )}
                            </>
                          )}
                        </Grid.Column>
                      </Grid>
                    )}
                  </div>
                </section>
                {/* Main content */}

                {/* Product Summary Start */}
                {/* <section className="site__summary__cta__wrapper">
        <div className="site__summary__cta__container site_xl_container">
          <div className="site__summary__cta__content">
            <div className="cta__left">
              <img
                width="100%"
                src="/site__main__images/site__location__black.png"
                alt="Urbanserve"
              />
              <p>{location}</p>
            </div>
            <div className="cta__right">
              <div className="cta__right__info">
                <h3>{productDetails?.title}</h3>
                <h6>£{price}</h6>
                <p>
                  {categoryDetails?.category_name?.toLowerCase() ==
                    'boiler installation' &&
                  categoryDetails?.type_of_category?.name ==
                    'is_installation'
                    ? ''
                    : recurringType
                    ? recurringType
                    : ``}
                </p>
              </div>
              {selectedAddonIDs?.length > 0 && (
                <img
                  width="100%"
                  src="/site__main__images/site__plus.png"
                  alt="Urbanserve"
                />
              )}
              {selectedAddonIDs?.length <= 1
                ? selectedAddonIDs?.map((addon) => (
                    <div className="cta__right__info">
                      <h3>{addon?.title}</h3>
                      <h6>£{addon?.total}</h6>
                      <p>One Off</p>
                    </div>
                  ))
                : selectedAddonIDs?.length > 1 && (
                    <div className="cta__right__info">
                      <h3>Add On's</h3>
                      <h6>£{addonsTotal}</h6>
                      <p>One off</p>
                    </div>
                  )}

              <Button
                className="cta__btn"
                onClick={() => handleCheckout()}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section> */}
                {/* Product Summary End */}

                {/* Product Summary Bottom */}
                {/* {selectedAddonIDs?.length === 0 && (
        <section className="site__summary__bottom__wrapper">
          <div className="site__summary__bottom__content">
            <h3>{productDetails?.title}</h3>

            <div className="site__summary__inner">
              <div className="site__summary__inner__content">
                <h6>£{price}</h6>
                <p>{recurringType ? recurringType : ``}</p>
              </div>
              <Button
                className="inner__btn"
                onClick={() => handleCheckout()}
              >
                Book Now
              </Button>
            </div>
          </div>
        </section>
      )} */}
                {/* Product Summary Bottom */}

                {/* Product Summary Addon Bottom */}
                {/* {selectedAddonIDs?.length >= 1 && (
        <section className="site__addon__bottom__wrapper">
          <h3>
            {selectedAddonIDs?.length === 1 &&
              selectedAddonIDs?.map(
                (addon) => `${productDetails?.title} + ${addon?.title}`,
              )}
            {selectedAddonIDs?.length > 1 &&
              `${productDetails?.title} + Add On's`}
            {selectedAddonIDs?.length === 0 && `${productDetails?.title}`}
          </h3>
          <div className="site__addon__bottom__content">
            <div className="addon__left">
              <div className="addon__left__pricing">
                <h4>Pay now </h4>
                <span>
                  £
                  {price !== NaN ? price + addonsTotal : 'Not Applicable'}
                </span>
              </div>
              <Button
                className="addon__pay__btn"
                onClick={() => setSummaryModalOpen(true)}
              >
                View Summary
              </Button>
            </div>
            <Button
              className="addon__btn"
              onClick={() => handleCheckout()}
            >
              Book Now
            </Button>
          </div>
        </section>
      )} */}
                {/* Product Summary Addon Bottom */}
              </>
            )}

            {price > 0 && (
              <section className="site__package__summary__box">
                <div>
                  <div
                    className="site__package__summary"
                    style={{
                      backgroundColor: `#0587ff`,
                    }}
                    onClick={() => handleCheckout()}
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
                        {selectedAddonIDs?.length <= 0
                          ? `1`
                          : selectedAddonIDs?.length + 1}
                      </span>
                      <p
                        style={{
                          color: `#fff`,
                        }}
                      >
                        £
                        {price !== NaN ? price + addonsTotal : 'Not Applicable'}
                      </p>
                    </div>
                    <div className="site__package__summary__next">
                      <p
                        style={{
                          color: `#fff`,
                        }}
                      >
                        Next
                      </p>
                      <img
                        width="18px"
                        height="12px"
                        src={
                          '/site__main__images/site__chevron__right__light.png'
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Site Footer Start */}
            <div style={{paddingBottom: price > 0 ? '6rem' : '0rem'}}>
              <SiteFooter />
            </div>
            {/* Site Footer End */}

            {/* Product offering modal */}
            <Drawer
              open={isproductOfferingModalOpen}
              onClose={() => setIsProductOfferingModalOpen(false)}
              anchor="right"
              classes={{
                paper: classes.qaDrawerPaper,
              }}
            >
              <div className={classes.editQAHeader}>
                <img
                  width="100%"
                  className={classes.qaDrawerClose}
                  src="/site__main__images/site__close.png"
                  alt="Urbanserve"
                  onClick={() => setIsProductOfferingModalOpen(false)}
                />
              </div>

              <div className={classes.editQaPadding}>
                <h3 className={classes.editQATitle}>Your answers</h3>
                <p className={classes.editQASubHeader}>
                  Edit your answers below to adjust your results
                </p>
                <div className={classes.editQAContainer}>
                  <span className={classes.editQAanwser}>
                    {productOfferinModalgData?.bedrooms} Bedrooms
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <RemoveCircleIcon
                      onClick={() => {
                        if (+productOfferinModalgData?.bedrooms !== 0) {
                          let bedrooms = +productOfferinModalgData?.bedrooms - 1
                          setProductOfferingModalData({
                            ...productOfferinModalgData,
                            bedrooms,
                          })
                        }
                      }}
                      style={{
                        cursor: 'pointer',
                        color:
                          productOfferinModalgData?.bedrooms == 0
                            ? '#E9E9EA'
                            : '#0587ff',
                        marginRight: '15px',
                        width: '30px',
                        height: '30px',
                      }}
                    />
                    <AddCircleIcon
                      onClick={() => {
                        let bedrooms = +productOfferinModalgData?.bedrooms + 1
                        setProductOfferingModalData({
                          ...productOfferinModalgData,
                          bedrooms,
                        })
                      }}
                      style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        fill: '#0587ff',
                      }}
                    />
                  </div>
                </div>

                <div className={classes.editQAContainer}>
                  <span className={classes.editQAanwser}>
                    {productOfferinModalgData?.baths} Baths
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <RemoveCircleIcon
                      onClick={() => {
                        if (+productOfferinModalgData?.baths !== 0) {
                          let baths = +productOfferinModalgData?.baths - 1
                          setProductOfferingModalData({
                            ...productOfferinModalgData,
                            baths,
                          })
                        }
                      }}
                      style={{
                        cursor: 'pointer',
                        color:
                          productOfferinModalgData?.baths == 0
                            ? '#E9E9EA'
                            : '#0587ff',
                        width: '30px',
                        height: '30px',
                        marginRight: '15px',
                      }}
                    />
                    <AddCircleIcon
                      onClick={() => {
                        let baths = +productOfferinModalgData?.baths + 1
                        setProductOfferingModalData({
                          ...productOfferinModalgData,
                          baths,
                        })
                      }}
                      style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        fill: '#0587ff',
                      }}
                    />
                  </div>
                </div>

                <div className={classes.editQAContainer}>
                  <span className={classes.editQAanwser}>
                    {productOfferinModalgData?.showers} Showers
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <RemoveCircleIcon
                      onClick={() => {
                        if (+productOfferinModalgData?.showers !== 0) {
                          let showers = +productOfferinModalgData?.showers - 1
                          setProductOfferingModalData({
                            ...productOfferinModalgData,
                            showers,
                          })
                        }
                      }}
                      style={{
                        cursor: 'pointer',
                        color:
                          productOfferinModalgData?.showers == 0
                            ? '#E9E9EA'
                            : '#0587ff',
                        width: '30px',
                        height: '30px',
                        marginRight: '15px',
                      }}
                    />
                    <AddCircleIcon
                      onClick={() => {
                        let showers = +productOfferinModalgData?.showers + 1
                        setProductOfferingModalData({
                          ...productOfferinModalgData,
                          showers,
                        })
                      }}
                      style={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        fill: '#0587ff',
                      }}
                    />
                  </div>
                </div>
                <div className={classes.editQAButtonContainer}>
                  <Button
                    className="footer__btn"
                    onClick={() => onProductOfferApply()}
                    style={{backgroundColor: '#0587ff'}}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </Drawer>

            {/* Mobile Summary Drawer */}
            <Drawer
              open={isSummaryModalOpen}
              anchor="bottom"
              classes={{paper: classes.drawerPaper}}
              onClose={() => setSummaryModalOpen(false)}
            >
              {/* Header */}
              <div className={`${classes.drawer__header} ${classes.drawerPD}`}>
                <div className={classes.drawer__info}>
                  <img
                    width="100%"
                    src="/site__main__images/product__image.png"
                    alt="Urbanserve"
                    className={classes.drawer__img}
                  />
                  <h3 className={classes.drawer__title}>
                    {productDetails?.title}
                  </h3>
                </div>
                <img
                  width="100%"
                  src="/site__main__images/site__close.png"
                  alt="Urbanserve"
                  className={classes.drawer__close}
                  onClick={() => setSummaryModalOpen(false)}
                />
              </div>
              {/* Divider */}
              <div className={classes.drawer__divider}></div>

              {/* Product infor */}
              <div className={`${classes.drawer__product} ${classes.drawerPD}`}>
                <div>
                  <div className={classes.drawer__btn__section}>
                    <p className={classes.product__info}>{recurringType}</p>
                    {recurringType !== 'One Off' && (
                      <Button
                        className={`${classes.drawer__product} drawer__btn`}
                      >
                        Subscription
                      </Button>
                    )}
                  </div>
                  {recurringType !== 'One Off' && (
                    <p className={classes.product__text}>
                      You can cancel subcription after 6 visits
                    </p>
                  )}
                </div>
                <p className={classes.product__price}>£{price}</p>
              </div>

              {/* Divider */}
              <div className={classes.drawer__divider}></div>

              {/* Product Addons */}
              {selectedAddonIDs?.length > 0 &&
                selectedAddonIDs?.map((addon) => (
                  <>
                    <div
                      className={`${classes.drawer__addon} ${classes.drawerPD}`}
                    >
                      {addon?.image !== null ? (
                        <img
                          width="100%"
                          src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${addon?.image?.id}`}
                          alt="Urbanserve"
                          className={classes.drawer__img}
                        />
                      ) : (
                        <img
                          width="100%"
                          src="/site__main__images/product__image.png"
                          alt="Urbanserve"
                          className={classes.drawer__img}
                        />
                      )}
                      <h4 className={classes.drawer__addon__title}>
                        {addon?.title}
                      </h4>
                      <Button
                        className={`${classes.drawer__product} drawer__btn`}
                      >
                        One off
                      </Button>
                    </div>
                    <div className={classes.drawer__divider}></div>
                    <div
                      className={`${classes.drawer__flex} ${classes.drawerPD}`}
                    >
                      <div className={classes.drawer__addon__quantity}>
                        <p className={classes.addon__quantity}>
                          {addon?.quantity}
                        </p>
                        <img
                          width="100%"
                          src="/site__main__images/site__close.png"
                          alt="Urbanserve"
                          className={classes.quantity__img}
                        />
                        <p className={classes.addon__quantity}>
                          £{addon?.price}
                        </p>
                      </div>
                      <p className={classes.addon__price}>£{addon?.total}</p>
                    </div>
                  </>
                ))}

              {/* Divider */}

              {/* Addon quantity */}

              {/* Divider */}
              <div className={classes.drawer__divider}></div>

              {/* discount details */}
              <div className={`${classes.drawer__flex} ${classes.drawerPD}`}>
                <h3 className={classes.discount__title}>Discount</h3>
                <p className={classes.discount__price}>- £{price}</p>
              </div>

              {/*  */}
              <div className={`${classes.drawer__footer} ${classes.drawerPD}`}>
                <h6 className={classes.footer__title}>
                  Pay Now:{' '}
                  <span className={classes.footer__price}>
                    {`£${price !== NaN ? price + addonsTotal : 'NA'}`}
                  </span>
                </h6>
                <div
                  className={`${classes.footer__content} ${classes.footer__mb}`}
                >
                  <img
                    width="100%"
                    src="/site__main__images/icon__check.png"
                    alt="Urbanserve"
                    className={classes.footer__check}
                  />
                  <p className={classes.footer__text}>
                    Pay in advance for first booking.
                  </p>
                </div>
                <div className={classes.footer__content}>
                  <img
                    width="100%"
                    src="/site__main__images/icon__check.png"
                    alt="Urbanserve"
                    className={classes.footer__check}
                  />
                  <p className={classes.footer__text}>
                    {`£${
                      price !== NaN ? price + addonsTotal : 'NA'
                    } subscription will be colllected after consecutive
          booking completion`}
                  </p>
                </div>
                <Button
                  className="footer__btn"
                  onClick={() => handleCheckout()}
                >
                  Book Now
                </Button>
              </div>
            </Drawer>
            {/* Mobile Summary Drawer */}

            {/*  */}
            <Drawer
              open={isQaEditOpen}
              onClose={() => setQaEditOpen(!isQaEditOpen)}
              anchor="right"
              classes={{
                paper: classes.qaDrawerPaper,
              }}
            >
              <div className={classes.qaDrawerHeader}>
                <h3 className={classes.qaDrawerTitleEdit}>Edit Product QA</h3>
                <img
                  width="100%"
                  className={classes.qaDrawerClose}
                  src="/site__main__images/site__close.png"
                  alt="Urbanserve"
                  onClick={() => setQaEditOpen(!isQaEditOpen)}
                />
              </div>
              <div className={classes.qaDrawerContent}>
                <h4 className={classes.qaDrawerProduct}>
                  {productDetails?.title}
                </h4>
                <h4 className={classes.qaDrawerInfo}>
                  {selectedQA?.question_title}
                </h4>
                <>
                  {selectedQA !== [] && selectedQA?.answers?.length > 0
                    ? selectedQA?.answers?.map((ans, i) => (
                        <>
                          {/* <List.Item>
                  <List.Content floated='right'>
                    <Button className={currentQaEdit?.answer === ans?.id ? 'site-success-btn' : 'site-primary-btn'} onClick={() => handleQAChange(ans)}>{currentQaEdit?.answer === ans?.id ? `Selected` : 'Select'}</Button>
                  </List.Content>
                  <Image avatar
                    src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ans?.answer_image}`}
                  />
                  <List.Content>{ans?.answer_title}</List.Content>
                  <Icon size="large" name="check circle outline" style={{ display: currentQaEdit?.answer === ans?.id ? 'inline-block' : 'none', verticalAlign: 'middle', paddingLeft: '0.5rem' }} color="#00A56F" />
                </List.Item> */}
                          <div
                            className="qaEditCard"
                            onClick={() => handleQAChange(ans)}
                            style={{
                              border:
                                currentQaEdit?.answer === ans?.id
                                  ? '2px solid #3698ff'
                                  : 'none',
                            }}
                          >
                            <div className="qaEditContent">
                              <div className="qaEditContentImg">
                                {ans?.answer_image ? (
                                  <img
                                    src={
                                      ans?.answer_image?.type === 'public'
                                        ? `${ans?.answer_image?.file_path}`
                                        : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${ans?.answer_image?.id}/show-file`
                                    }
                                    alt="Urbanserve Service Icon"
                                    width="100%"
                                    className="qa__image"
                                  />
                                ) : (
                                  <img
                                    src="/site__main__images/product__image.png"
                                    width="100%"
                                    className="qa__image"
                                  />
                                )}
                              </div>
                              <p>{ans?.answer_title}</p>
                            </div>
                            <div>
                              {currentQaEdit?.answer === ans?.id && (
                                <img
                                  width="32px"
                                  height="32px"
                                  style={{marginRight: '20px'}}
                                  src="/site__main__images/site__check__blue.png"
                                  alt="Urbanserve"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      ))
                    : ''}
                </>
              </div>
            </Drawer>
          </div>

          {/* Product Offer modal */}
          <Drawer
            open={isproductOfferDetailModalOpen}
            onClose={() => setIsProductOfferDetailModalOpen(false)}
            anchor="right"
            classes={{
              paper: classes.detailModal,
            }}
          >
            <div
              className={classes.qaDrawerHeader}
              style={{justifyContent: 'flex-end'}}
            >
              <img
                width="100%"
                className={classes.qaDrawerClose}
                src="/site__main__images/site__close.png"
                alt="Urbanserve"
                onClick={() => setIsProductOfferDetailModalOpen(false)}
              />
            </div>
            <Box style={{padding: 0}}>
              {isFetchingProductOfferDetail ? (
                <div
                  style={{
                    height: '50vh',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Loader active inline="centered" />
                </div>
              ) : (
                <>
                  <div className="details__container">
                    <div className="details__flex">
                      <div className="details__lg__img">
                        <div className="details__img__holder">
                          {console.log(
                            'productOfferDetail::',
                            productOfferDetail,
                          )}
                          <img
                            src={
                              productOfferDetail?.product_offering_image?.[0]
                                ?.file?.type === 'public'
                                ? `${productOfferDetail?.product_offering_image?.[0]?.file?.file_path}`
                                : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${productOfferDetail?.product_offering_image?.[0]?.file?.id}/show-file`
                            }
                            alt="Urbanserve Icon"
                            // layout="fill"
                            // objectFit="contain"
                            // quality={100}
                          />
                        </div>
                      </div>
                      <div className="details__content">
                        <h3 className="details__header">
                          {productOfferDetail?.title}
                        </h3>
                        {productOfferDetail?.max_radiators && (
                          <h3 className="details__info">
                            Powers upto {productOfferDetail?.max_radiators}{' '}
                            radiators
                          </h3>
                        )}
                        <div className="details__mb__img">
                          <img
                            src={
                              productOfferDetail?.product_offering_image?.[0]
                                ?.file?.type === 'public'
                                ? `${productOfferDetail?.product_offering_image?.[0]?.file?.file_path}`
                                : `${process.env.NEXT_PUBLIC_APP_BACKEND_URI}files/${productOfferDetail?.product_offering_image?.[0]?.file?.id}/show-file`
                            }
                            alt="Urbanserve Icon"
                            // layout="fill"
                            // objectFit="contain"
                            // quality={100}
                          />
                        </div>
                        <div className="site__offer__btn__section details__price">
                          <h4 className="ProductOfferingPriceTitle">
                            Your Fixed Price (inc. Installation)
                          </h4>
                          <h2 className="ProductOfferingPrice">
                            £{productOfferDetail.price}
                          </h2>
                          <p className="ProductOfferingVatInc">VAT included</p>

                          <div
                            style={{
                              textAlign: 'center',
                              padding: '8px 18px',
                            }}
                          >
                            <p className="ProductOfferingFromPrice">
                              or from{' '}
                              <span
                                style={{
                                  textDecoration: 'underline',
                                  color: '#21262B',
                                  textUnderlineOffset: '5px',
                                }}
                              >
                                {' '}
                                £10 a month{' '}
                              </span>{' '}
                              at 10.9% APR
                            </p>
                          </div>

                          <Button
                            fluid
                            className="btn__quote__outline site__offer__btn__outlined "
                            style={{marginBottom: 8}}
                          >
                            Save Quote
                          </Button>

                          <Button
                            fluid
                            className="btn__quote__field site__offer__btn__filled modal__quote__btn"
                            onClick={() => {
                              setSelectedProductOffer(productOfferDetail?.id)
                              setSelectedProductData(productOfferDetail)
                              setPrice(+productOfferDetail?.price)
                            }}
                          >
                            {productOfferDetail?.id === selectedProductOffer
                              ? 'Selected'
                              : 'Choose'}
                          </Button>
                        </div>
                        {productOfferDetail?.warranty?.length > 0 &&
                          productOfferDetail?.warranty?.map((ele) => (
                            <div className="details__flow">
                              <div className="details__flow__img">
                                <Image
                                  src={`/site__main__images/icon__check.png`}
                                  alt="Urbanserve Icon"
                                  layout="fill"
                                  objectFit="contain"
                                  quality={100}
                                />
                              </div>
                              <h5 className="details__flow__title">
                                {ele?.years} Years {ele?.title}
                              </h5>
                            </div>
                          ))}
                        {productOfferDetail?.radiators?.length > 0 &&
                          productOfferDetail?.radiators?.map((ele) => (
                            <div className="details__flow">
                              <div className="details__flow__img">
                                <Image
                                  src={`/site__main__images/icon__check.png`}
                                  alt="Urbanserve Icon"
                                  layout="fill"
                                  objectFit="contain"
                                  quality={100}
                                />
                              </div>
                              <h5 className="details__flow__title">
                                Powers upto {ele?.total_radiator} radiators
                              </h5>
                            </div>
                          ))}
                        {productOfferDetail?.thermostat?.length > 0 &&
                          productOfferDetail?.thermostat?.map((ele) => (
                            <div className="details__flow">
                              <div className="details__flow__img">
                                <Image
                                  src={`/site__main__images/icon__check.png`}
                                  alt="Urbanserve Icon"
                                  layout="fill"
                                  objectFit="contain"
                                  quality={100}
                                />
                              </div>
                              <h5 className="details__flow__title">
                                Comes with {ele?.title}{' '}
                              </h5>
                            </div>
                          ))}
                        {productOfferDetail?.flow_rate?.length > 0 &&
                          productOfferDetail?.flow_rate?.map((ele) => (
                            <div className="details__flow">
                              <div className="details__flow__img">
                                <Image
                                  src={`/site__main__images/icon__check.png`}
                                  alt="Urbanserve Icon"
                                  layout="fill"
                                  objectFit="contain"
                                  quality={100}
                                />
                              </div>
                              <h5 className="details__flow__title">
                                {ele?.title} {ele?.rate}
                              </h5>
                            </div>
                          ))}
                        {productOfferDetail?.central_heating?.length > 0 &&
                          productOfferDetail?.central_heating?.map((ele) => (
                            <div className="details__flow">
                              <div className="details__flow__img">
                                <Image
                                  src={`/site__main__images/icon__check.png`}
                                  alt="Urbanserve Icon"
                                  layout="fill"
                                  objectFit="contain"
                                  quality={100}
                                />
                              </div>
                              <h5 className="details__flow__title">
                                {ele?.title} {ele?.heating_kw}
                              </h5>
                            </div>
                          ))}
                        {productOfferDetail?.solar_compatible && (
                          <div className="details__flow">
                            <div className="details__flow__img">
                              <Image
                                src={`/site__main__images/icon__check.png`}
                                alt="Urbanserve Icon"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                              />
                            </div>
                            <h5 className="details__flow__title">
                              Solar compatible
                            </h5>
                          </div>
                        )}
                        {productOfferDetail?.olev_approved && (
                          <div className="details__flow">
                            <div className="details__flow__img">
                              <Image
                                src={`/site__main__images/icon__check.png`}
                                alt="Urbanserve Icon"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                              />
                            </div>
                            <h5 className="details__flow__title">
                              OLEV approved
                            </h5>
                          </div>
                        )}
                        {productOfferDetail?.effiency_rating && (
                          <div className="details__flow">
                            <div className="details__flow__img">
                              <Image
                                src={`/site__main__images/icon__check.png`}
                                alt="Urbanserve Icon"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                              />
                            </div>
                            <h5 className="details__flow__title">
                              Effiency rating of{' '}
                              {productOfferDetail?.effiency_rating}
                            </h5>
                          </div>
                        )}
                        {productOfferDetail?.power_output && (
                          <div className="details__flow">
                            <div className="details__flow__img">
                              <Image
                                src={`/site__main__images/icon__check.png`}
                                alt="Urbanserve Icon"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                              />
                            </div>
                            <h5 className="details__flow__title">
                              Power output of {productOfferDetail?.power_output}
                            </h5>
                          </div>
                        )}
                        {productOfferDetail?.fuel_type && (
                          <div className="details__flow">
                            <div className="details__flow__img">
                              <Image
                                src={`/site__main__images/icon__check.png`}
                                alt="Urbanserve Icon"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                              />
                            </div>
                            <h5 className="details__flow__title">
                              Fuel type is {productOfferDetail?.fuel_type}
                            </h5>
                          </div>
                        )}
                        {productOfferDetail?.smart_enabled === 'true' && (
                          <div className="details__flow">
                            <div className="details__flow__img">
                              <Image
                                src={`/site__main__images/icon__check.png`}
                                alt="Urbanserve Icon"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                              />
                            </div>
                            <h5 className="details__flow__title">
                              Smart enabled
                            </h5>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="details__include__container">
                    <div className="details__include">
                      <h3 className="details__include__header">
                        What's in the Product?
                      </h3>
                      <AccordionUI
                        elevation={0}
                        classes={{
                          root: muiClasses.MuiAccordionroot,
                          // paper: classes.qaDrawerPaper,
                        }}
                      >
                        <AccordionSummaryUI expandIcon={<AccordIcon />}>
                          <div className="accord__header">Boiler</div>
                        </AccordionSummaryUI>
                        <AccordionDetailsUI
                          className="site_accordion_description"
                          classes={{
                            root: muiClasses.MuiAccordionroot,
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'rgba(33, 38, 43, 0.7)',
                            fontFamily: 'Urbanist,sans-serif',
                            fontSize: '16px',
                            lineHeight: '19px',
                            paddingBottom: '26px',
                            paddingTop: '4px',
                          }}
                        >
                          <div className="accord__content">
                            <h4 className="content__header">Measurement</h4>
                            <p className="content__info">
                              {productOfferDetail?.dimension}
                            </p>
                          </div>

                          {productOfferDetail?.warranty &&
                            productOfferDetail?.warranty?.map((ele) => (
                              <div className="accord__content">
                                <h4 className="content__header">Warranty</h4>
                                <p className="content__info">
                                  {ele?.years} Year(s)
                                </p>
                              </div>
                            ))}

                          {productOfferDetail?.boiler_type && (
                            <div className="accord__content">
                              <h4 className="content__header">Boiler Type</h4>
                              <p className="content__info">
                                {productOfferDetail?.boiler_type}
                              </p>
                            </div>
                          )}

                          {productOfferDetail?.fuel_type && (
                            <div className="accord__content">
                              <h4 className="content__header">Fuel Type</h4>
                              <p className="content__info">
                                {productOfferDetail?.fuel_type}
                              </p>
                            </div>
                          )}

                          {productOfferDetail?.solar_compatible && (
                            <div className="accord__content">
                              <h4 className="content__header">
                                Solar Compatible
                              </h4>
                              <p className="content__info">
                                {productOfferDetail?.solar_compatible
                                  ? 'Yes'
                                  : 'No'}
                              </p>
                            </div>
                          )}

                          {productOfferDetail?.flow_rate &&
                            productOfferDetail?.flow_rate?.map((ele) => (
                              <div className="accord__content">
                                <h4 className="content__header">Flow Rate</h4>
                                <p className="content__info">
                                  {ele?.title} {ele?.rate}
                                </p>
                              </div>
                            ))}

                          {productOfferDetail?.central_heating &&
                            productOfferDetail?.central_heating?.map((ele) => (
                              <div className="accord__content">
                                <h4 className="content__header">
                                  Central heating output
                                </h4>
                                <p className="content__info">
                                  {ele?.title} is {ele?.heating_kw}
                                </p>
                              </div>
                            ))}

                          {productOfferDetail?.effiency_rating && (
                            <div className="accord__content">
                              <h4 className="content__header">Efficiency</h4>
                              <p className="content__info">
                                {productOfferDetail?.effiency_rating}
                              </p>
                            </div>
                          )}
                        </AccordionDetailsUI>
                      </AccordionUI>
                    </div>
                  </div>
                </>
              )}
            </Box>
          </Drawer>
          {/* Included modal */}
          <Drawer
            open={isIncludeModalOpen}
            onClose={() => setIsIncludeModalOpen(false)}
            anchor="right"
            classes={{
              root: muiClasses.MuiAccordionroot,
              paper: classes.qaDrawerPaper,
            }}
          >
            <div
              className={classes.includedDrawerHeader}
              style={{justifyContent: 'flex-end'}}
            >
              <img
                width="100%"
                className={classes.qaDrawerClose}
                src="/site__main__images/site__close.png"
                alt="Urbanserve"
                onClick={() => setIsIncludeModalOpen(false)}
              />
            </div>
            <div className={classes.includedDrawerPadding}>
              <h3 className={classes.qaDrawerTitle}>
                Included in Installation
              </h3>
              <div>
                <p className="site_include_modal_description">
                  Your Fixed Priced Installation indclueds VAT and comes with
                  bells and whistles to make your installation atmost
                  convinient.
                </p>
                {allIncludedItem.length > 0 &&
                  allIncludedItem.map(
                    (ele) =>
                      ele?.included && (
                        <AccordionUI
                          elevation={0}
                          classes={{
                            root: muiClasses.MuiAccordionroot,
                            paper: classes.qaDrawerPaper,
                          }}
                        >
                          <AccordionSummaryUI expandIcon={<AccordIcon />}>
                            <div className="site_accordion_title">
                              {ele?.include_item_name}
                            </div>
                          </AccordionSummaryUI>
                          <AccordionDetailsUI
                            className="site_accordion_description"
                            classes={{
                              root: muiClasses.MuiAccordionroot,
                            }}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              color: 'rgba(33, 38, 43, 0.7)',
                              fontFamily: 'Urbanist,sans-serif',
                              fontSize: '16px',
                              lineHeight: '19px',
                              paddingBottom: '26px',
                              paddingTop: '4px',
                            }}
                            dangerouslySetInnerHTML={{__html: ele?.description}}
                          >
                            {/* {ele?.description} */}
                          </AccordionDetailsUI>
                        </AccordionUI>
                      ),
                  )}
              </div>
            </div>
          </Drawer>
        </>
      ) : (
        <InvalidAccess
          pageAccess="Summary"
          title="You have not selected any service. Expore services we offer and try again!"
        />
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    /* Product Details */
    fetchProductDetails: (data) => dispatch(getProductDetailsRequest(data)),
    addProductToCart: (...args) => dispatch(addCart(...args)),
    fetchProductOffer: (data) => dispatch(getProductOfferingRequest(data)),
    getProductOfferDetail: (data) =>
      dispatch(getProductOfferDetailRequest(data)),
  }
}

const withConnect = connect(null, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(SiteMain))
