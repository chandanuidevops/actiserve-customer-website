import React, {useEffect, useState} from 'react'

/* Components */
import SiteMainNavbar from '../../../components/SiteMain/SiteMainNavbar'
import {Grid, Segment, Button, Loader} from 'semantic-ui-react'
import {useMediaQuery} from 'react-responsive'
/* Material UI */
import Autocomplete from '@material-ui/lab/Autocomplete'

import {withStyles, TextField, Drawer} from '@material-ui/core'

/* Next Js */
import {useRouter} from 'next/router'

/* Redux */
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'

/* Components */
import Stepper from '../../../components/Stepper'
import HelmetComponent from '../../../components/Helmet'
import InvalidAccess from '../../../components/InvalidAccess'
import SiteFooter from '../../../components/SiteFooter'

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
  drawerPD: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  drawer__img: {
    width: '52px',
    height: '50px',
    marginRight: '16px',
    objectFit: 'contain',
  },
  drawer__header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '48px',
    paddingBottom: '14px',
  },
  drawer__divider: {
    borderBottom: '1px solid #E9E9EA',
    margin: '0px 20px',
  },
  drawer__close: {
    width: '18px',
    height: '18px',
    top: '0',
    right: '0',
    marginRight: '1rem',
    marginTop: '1rem',
    position: 'absolute',
    cursor: 'pointer',
  },
  drawer__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  drawer__info: {
    display: 'flex',
    alignItems: 'center',
  },
  drawer__product: {
    padding: '14px 0px',
    margin: '0px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  product__info: {
    margin: '0',
    padding: '0',
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.02em',
    color: '#21262b',
    display: 'inline-block',
    textTransform: 'capitalize',
  },
  drawer__btn__section: {
    display: 'flex',
    alignItems: 'center',
  },
  product__text: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: '0.02em',
    color: 'rgba(33, 38, 43, 0.5)',
  },
  product__price: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  includedPrice: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '25px',
    letterSpacing: '0.02em',
    color: '#21262b',
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
    color: '#0587FF',
  },
  discount__title: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  drawer__footer: {
    paddingTop: '14px',
    paddingBottom: '14px',
    backgroundColor: '#F7F9FB',
  },
  footer__title: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#21262b',
    textAlign: 'center',
  },
  footer__price: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.02em',
    color: '#0587FF',
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
    color: 'rgba(33, 38, 43, 0.7)',
  },
  addon__remove__text: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '22px',
    color: '#df5c53',
    cursor: 'pointer',
  },
  drawerPaper: {
    maxWidth: theme.breakpoints.values.sm * 0.75,
    width: '100%',
    height: '100vh',
  },
  includedDrawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px',
    marginTop: '54px',
    marginBottom: '22px',
  },
  addonDrawerClose: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  addonDrawerPadding: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  addonTitle: {
    fontFamily: 'Urbanist__bold,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '38px',
    letterSpacing: '0.02em',
    color: '#21262b',
  },
  addonInfo: {
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
})
function SiteMain(props) {
  const {classes} = props
  const [update, setUpdate] = useState(false)

  const Router = useRouter()

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

  /* Summart Addon Mobile Drawer */
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false)

  /* Addon Details Drawer */
  const [isAddonModalOpen, setAddonModalOpen] = useState(false)

  /* Addon drawer modal data */
  const [addonModalDetail, setAddonModalData] = useState(null)

  /* If Addon modal is closed, reset addon modal data to null */
  useEffect(() => {
    if (!isAddonModalOpen) {
      setAddonModalData(null)
    }
  }, [isAddonModalOpen])

  const [productDetails, setProductDetails] = useState(null)
  const [cartData, setCartData] = useState(null)
  const [productSelected, setProductSelected] = useState(null)
  const [productAddons, setProductAddons] = useState([])
  const [productIncludedItems, setProductIncludedItems] = useState([])

  /* Selected Addon Array */
  const [selectedAddonIDs, setSelectedAddonIDs] = useState([])
  const [addonsTotal, setAddonsTotal] = useState(0)

  /* Addon State */
  const [addonData, setAddonData] = useState([])

  /* Cart calculation */
  const [sub_total_price, set_sub_total_price] = useState(0)
  const [total_price, set_total_price] = useState(0)
  const [discount_price, set_discount_price] = useState(0)

  /* Detect window */
  const isBrowser = () => typeof window !== 'undefined'
  useEffect(() => {
    if (isBrowser() === true) {
      let product_details = localStorage.getItem('actiserve_cart_product')
      if (product_details !== null && product_details !== '') {
        let productObj = JSON.parse(product_details)
        if (productObj) {
          setProductDetails(productObj)
        }
      }

      let cart_items = localStorage.getItem('cartItems')
      if (cart_items !== null && cart_items !== '') {
        let cartObj = JSON.parse(cart_items)
        if (cartObj) {
          setCartData(cartObj)
        }
        if (cartObj?.addons) {
          setSelectedAddonIDs(cartObj?.addons)
        }
      }
    }
  }, [])

  /* Set Product Addons Data */
  useEffect(() => {
    if (productDetails && productDetails?.product_addons) {
      setProductAddons(productDetails?.product_addons)
    }
    if (productDetails && productDetails?.product_include_items) {
      setProductIncludedItems(productDetails?.product_include_items)
    }
    if (productDetails) {
      setProductExists(true)
    } else {
      setProductExists(false)
    }
  }, [productDetails])

  useEffect(() => {
    if (cartData && cartData?.product_selected) {
      let parsedData = JSON.parse(cartData?.product_selected)
      if (parsedData) {
        setProductSelected(parsedData)
      }
    }
  }, [cartData])

  useEffect(() => {
    if (productAddons?.length > 0) {
      let parsedAddons = JSON.parse(JSON.stringify(productAddons))
      if (parsedAddons) {
        parsedAddons?.map((ele) => {
          ele.quantity = '1'
          ele.total = 1 * ele?.price
          ele.is_disabled = false
        })
        setAddonData(parsedAddons)
      }
    }
  }, [productAddons])

  useEffect(() => {
    let sub_total = 0
    let total = 0
    if (productSelected) {
      sub_total =
        productSelected?.price + addonsTotal - productSelected?.discount_price
      set_discount_price(productSelected?.discount_price)
      set_sub_total_price(sub_total)
      set_total_price(sub_total)
    }
  }, [productSelected, addonsTotal])

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

  useEffect(() => {
    let addon_total = 0
    selectedAddonIDs &&
      selectedAddonIDs.map((ele) => {
        addon_total += ele?.total
        setAddonsTotal(addon_total)
        setUpdate(!update)
      })

    if (selectedAddonIDs?.length <= 0) {
      setAddonsTotal(0)
    }
  }, [selectedAddonIDs])

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

  /* Addon Remove Handler */
  const addonRemoveHandler = (addon) => {
    let addon_total = 0
    if (addon) {
      let filteredIds = selectedAddonIDs.filter((i) => i.id !== addon?.id)
      setSelectedAddonIDs(filteredIds)
      setUpdate(!update)

      selectedAddonIDs.map((ele) => {
        addon_total += ele?.total
        setAddonsTotal(addon_total)
        setUpdate(!update)
      })
    }

    let tempData = JSON.parse(JSON.stringify(addonData))
    tempData?.map((ele) => {
      if (ele?.id === addon?.id) {
        ele.quantity = '1'
        ele.total = ele.price * 1
      }
    })

    setAddonData(tempData)
    setUpdate(!update)
  }

  const handleAddonQuantityAdd = async (addon, quantity) => {
    let tempData = JSON.parse(JSON.stringify(addonData))
    await tempData?.map((ele) => {
      if (ele?.id === addon?.id) {
        ele.quantity = parseInt(quantity) + 1
        ele.total = ele.price * parseInt(ele.quantity)
      }
    })
    if (tempData) {
      setAddonData(tempData)
      setUpdate(!update)
    }
  }

  const handleAddonQuantityMinus = async (addon, quantity) => {
    if (quantity > 1) {
      let tempData = JSON.parse(JSON.stringify(addonData))
      await tempData?.map((ele) => {
        if (ele?.id === addon?.id) {
          ele.quantity = parseInt(quantity) - 1
          ele.total = ele.price * parseInt(ele.quantity)
        }
      })
      if (tempData) {
        setAddonData(tempData)
        setUpdate(!update)
      }
    }
  }

  // function handleCalculation(productPrice, type) {
  //   let total_price = 0
  //   let sub_total = 0
  //   let price = productPrice
  //   if (price) {
  //     if (productSelected?.discount_price !== null) {
  //       let discount = productSelected?.discount_price
  //       set_discount_price(productSelected?.discount)
  //       sub_total = price + addonsTotal - discount
  //       set_sub_total_price(sub_total)
  //     }
  //     if (productDetails?.vat_rate !== null) {
  //       let total_value =
  //         productDetails?.product_discount !== null ? sub_total : price

  //       let vatRate = productDetails?.vat_rate / 100
  //       if (vatRate >= 0) {
  //         total_price =
  //           productDetails?.product_discount !== null
  //             ? sub_total + vatRate
  //             : price + vatRate
  //         set_total_price(total_price)
  //       }
  //     }
  //   }
  //   setCartData({
  //     ...cartData,
  //     addons: selectedAddonIDs,
  //     total_price: total_price,
  //     sub_total_price: sub_total_price,
  //   })
  //   setUpdate(!update)
  // }

  const handleCheckout = async () => {
    await localStorage.setItem(
      'actiserve_cart_addons',
      JSON.stringify(selectedAddonIDs),
    )
    await localStorage.setItem(
      'urbanserve_includes_items',
      JSON.stringify(productIncludedItems),
    )
    let finalData = {
      ...cartData,
      addons: selectedAddonIDs,
      discount_price: productSelected?.discount_price,
      sub_total_price,
      total_price,
    }
    await localStorage.setItem('cartItems', JSON.stringify(finalData))
    Router.push('/checkout')
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

          <div className="site__bg__main">
            <SiteMainNavbar />

            {/* Stepper Starts */}
            <Stepper
              activeStep={['addon']}
              completeStep={['confirm']}
              showAddon={true}
            />
            {/* Stepper Ends */}
            <section className="site__addon__wrapper">
              <div className="site__addon__container site_xl_container">
                <h2 className="site__adddon__header">
                  {productSelected?.title}
                </h2>
                <p className="site__adddon__info">
                  {' '}
                  {productSelected?.description}
                </p>
              </div>
            </section>

            <section className="site_xl_container site__addon__content__container">
              <Grid stackable columns={3} className="site__addon__content">
                <Grid.Column>
                  {addonData?.length > 0 &&
                    addonData?.map(
                      (ele, i) =>
                        i % 2 === 0 && (
                          <Segment className="site__addon__segment">
                            <div className="site__addon">
                              <div className="site__addon__img__holder">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.image?.id}`}
                                  alt="Urbanserve"
                                  width="100%"
                                />
                              </div>
                              <h2 className="site__addon__title">
                                {ele.title}
                              </h2>
                              <p className="site__addon__price">£{ele.price}</p>

                              {ele?.quantity_applicable ? (
                                <div class="site__incrementor">
                                  <span
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
                                    {ele?.quantity}
                                  </span>
                                  <span
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                    class="site__incrementor__plus"
                                  >
                                    +
                                  </span>
                                </div>
                              ) : (
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
                                    addonHandler(ele, ele?.quantity)
                                  }}
                                  style={{
                                    backgroundColor:
                                      ele?.quantity ===
                                      selectedAddonIDs.filter(
                                        (i) => i.id === ele?.id,
                                      )?.[0]?.quantity
                                        ? '#E9E9EA'
                                        : 'transparent',
                                    border:
                                      ele?.quantity ===
                                      selectedAddonIDs.filter(
                                        (i) => i.id === ele?.id,
                                      )?.[0]?.quantity
                                        ? 'none'
                                        : '1px solid #0587FF',
                                    color:
                                      ele?.quantity ===
                                      selectedAddonIDs.filter(
                                        (i) => i.id === ele?.id,
                                      )?.[0]?.quantity
                                        ? 'rgba(33, 38, 43, 0.5'
                                        : '#0587FF',
                                  }}
                                >
                                  {addonTextGenerator(ele)}
                                </Button>
                              )}

                              <div
                                className="site__footer"
                                onClick={() => {
                                  setAddonModalOpen(true)
                                  setAddonModalData(ele)
                                }}
                              >
                                <p>More Info</p>
                              </div>
                            </div>
                          </Segment>
                        ),
                    )}
                </Grid.Column>
                <Grid.Column>
                  {addonData?.length > 0 &&
                    addonData?.map(
                      (ele, i) =>
                        i % 2 === 1 && (
                          <Segment className="site__addon__segment">
                            <div className="site__addon">
                              <div className="site__addon__img__holder">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${ele?.image?.id}`}
                                  alt="Urbanserve"
                                  width="100%"
                                />
                              </div>
                              <h2 className="site__addon__title">
                                {ele.title}
                              </h2>
                              <p className="site__addon__price">£{ele.price}</p>
                              {ele?.quantity_applicable ? (
                                <>
                                  <div
                                    class="site__incrementor"
                                    style={{marginBottom: '1rem'}}
                                  >
                                    <span
                                      onClick={() =>
                                        handleAddonQuantityMinus(
                                          ele,
                                          ele?.quantity,
                                        )
                                      }
                                      style={{
                                        cursor:
                                          ele?.quatity === 1
                                            ? 'non-allowed'
                                            : 'pointer',
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
                                      {ele?.quantity}
                                    </span>
                                    <span
                                      style={{
                                        cursor: 'pointer',
                                      }}
                                      onClick={() =>
                                        handleAddonQuantityAdd(
                                          ele,
                                          ele?.quantity,
                                        )
                                      }
                                      class="site__incrementor__plus"
                                    >
                                      +
                                    </span>
                                  </div>
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
                                      addonHandler(ele, ele?.quantity)
                                    }}
                                    style={{
                                      backgroundColor:
                                        ele?.quantity ===
                                        selectedAddonIDs.filter(
                                          (i) => i.id === ele?.id,
                                        )?.[0]?.quantity
                                          ? '#E9E9EA'
                                          : 'transparent',
                                      border:
                                        ele?.quantity ===
                                        selectedAddonIDs.filter(
                                          (i) => i.id === ele?.id,
                                        )?.[0]?.quantity
                                          ? 'none'
                                          : '1px solid #0587FF',
                                      color:
                                        ele?.quantity ===
                                        selectedAddonIDs.filter(
                                          (i) => i.id === ele?.id,
                                        )?.[0]?.quantity
                                          ? 'rgba(33, 38, 43, 0.5'
                                          : '#0587FF',
                                    }}
                                  >
                                    {addonTextGenerator(ele)}
                                  </Button>
                                </>
                              ) : (
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
                                    addonHandler(ele, ele?.quantity)
                                  }}
                                  style={{
                                    backgroundColor:
                                      ele?.quantity ===
                                      selectedAddonIDs.filter(
                                        (i) => i.id === ele?.id,
                                      )?.[0]?.quantity
                                        ? '#E9E9EA'
                                        : 'transparent',
                                    border:
                                      ele?.quantity ===
                                      selectedAddonIDs.filter(
                                        (i) => i.id === ele?.id,
                                      )?.[0]?.quantity
                                        ? 'none'
                                        : '1px solid #0587FF',
                                    color:
                                      ele?.quantity ===
                                      selectedAddonIDs.filter(
                                        (i) => i.id === ele?.id,
                                      )?.[0]?.quantity
                                        ? 'rgba(33, 38, 43, 0.5'
                                        : '#0587FF',
                                  }}
                                >
                                  {addonTextGenerator(ele)}
                                </Button>
                              )}

                              <div
                                className="site__footer"
                                onClick={() => {
                                  setAddonModalOpen(true)
                                  setAddonModalData(ele)
                                }}
                              >
                                <p>More Info</p>
                              </div>
                              {/* <div class="site__incrementor">
                                        <span
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
                                            {ele?.quantity}
                                        </span>
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            class="site__incrementor__plus"
                                        >
                                            +
                                        </span>
                                    </div> */}
                            </div>
                          </Segment>
                        ),
                    )}
                </Grid.Column>

                <Grid.Column only="tablet computer">
                  <Segment style={{padding: 0}}>
                    <div className="site__offer__btn__section site__addon__summary site__addon__summary__common__pd">
                      <h4 className="ProductOfferingPriceTitle">
                        Your Fixed Price (inc. Installation)
                      </h4>
                      <h2 className="ProductOfferingPrice">
                        £{productSelected?.price}
                      </h2>
                      <p className="ProductOfferingVatInc">VAT included</p>

                      <div
                        style={{
                          textAlign: 'center',
                          paddingTop: '8px',
                          paddingBottom: '8px',
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
                        className="btn__quote__outline site__offer__btn__outlined addon__email__btn"
                      >
                        Email my quote
                      </Button>

                      <Button
                        fluid
                        className="btn__quote__field site__offer__btn__filled addon__nxt__btn"
                        onClick={() => handleCheckout()}
                      >
                        Next
                      </Button>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #E9E9EA',
                        margin: '0px 20px',
                        padding: '14px 0px',
                      }}
                    >
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <img
                          width="100%"
                          src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${productSelected?.product_offering_image?.[0]?.file?.id}`}
                          alt="Urbanserve"
                          className={classes.drawer__img}
                        />
                        <h3 className={classes.drawer__title}>
                          {productSelected?.title}
                        </h3>
                      </div>
                      <p className={classes.product__price}>
                        {' '}
                        £{productSelected?.price}
                      </p>
                    </div>

                    {/* <p className="site__addon__back">Change boiler</p> */}

                    {productIncludedItems?.length > 0 &&
                      productIncludedItems?.map(
                        (ele) =>
                          ele?.included && (
                            <>
                              <div
                                className={`${classes.drawer__product} ${classes.drawerPD} site__addon__summary__common__pd`}
                              >
                                <div>
                                  <div className={classes.drawer__btn__section}>
                                    <p className={classes.product__info}>
                                      {ele?.include_item_name}
                                    </p>
                                  </div>
                                  {/* <p className={classes.product__text}>
                            You can cancel subcription after recurringPeriod visits
                        </p> */}
                                </div>
                                <p className={classes.includedPrice}>Free</p>
                              </div>
                              <div className={classes.drawer__divider}></div>
                            </>
                          ),
                      )}

                    {selectedAddonIDs?.length > 0 &&
                      selectedAddonIDs?.map((ele) => (
                        <>
                          <div
                            className={`${classes.drawer__product} ${classes.drawerPD} site__addon__summary__common__pd`}
                          >
                            <div>
                              <div className={classes.drawer__btn__section}>
                                <p className={classes.product__info}>
                                  {ele?.title}
                                </p>
                              </div>
                              <p
                                className={classes.addon__remove__text}
                                onClick={() => addonRemoveHandler(ele)}
                              >
                                Remove
                              </p>
                            </div>
                            <p className={classes.includedPrice}>
                              £{ele?.total}
                            </p>
                          </div>
                          <div className={classes.drawer__divider}></div>
                        </>
                      ))}

                    <div
                      className={`${classes.drawer__flex} ${classes.drawerPD} site__addon__summary__common__pd`}
                    >
                      <h3 className={classes.discount__title}>Discount</h3>
                      <p className={classes.discount__price}>
                        - £{productSelected?.discount_price}
                      </p>
                    </div>
                    <div
                      className={`${classes.drawer__footer} ${classes.drawerPD} `}
                    >
                      <h6 className={classes.footer__title}>
                        Total:{' '}
                        <span className={classes.footer__price}>
                          £{total_price}
                        </span>
                      </h6>
                    </div>
                  </Segment>
                </Grid.Column>
              </Grid>
            </section>

            {/* Site Footer Start */}
            <div className="site_footer_pb">
              <SiteFooter />
            </div>
            {/* Site Footer End */}

            {/* Mobile Summary Drawer */}
            <Drawer
              open={isSummaryModalOpen}
              anchor="bottom"
              // classes={{ paper: classes.drawerPaper }}
              onClose={() => setSummaryModalOpen(false)}
            >
              <div className={`${classes.drawer__header} ${classes.drawerPD}`}>
                <div className={classes.drawer__info}>
                  <img
                    width="100%"
                    src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${productSelected?.product_offering_image?.[0]?.file?.id}`}
                    alt="Urbanserve"
                    className={classes.drawer__img}
                  />
                  <h3 className={classes.drawer__title}>
                    {productSelected?.title}
                  </h3>
                  <p className={classes.product__price}>
                    {' '}
                    £
                    {selectedAddonIDs?.length > 0
                      ? productSelected?.price + addonsTotal
                      : productSelected?.price}
                  </p>
                </div>
                <img
                  width="100%"
                  src="/site__main__images/site__close.png"
                  alt="Urbanserve"
                  className={classes.drawer__close}
                  onClick={() => setSummaryModalOpen(false)}
                />
              </div>
              <div className={classes.drawer__divider}></div>

              {productIncludedItems?.length > 0 &&
                productIncludedItems?.map(
                  (ele) =>
                    ele?.included && (
                      <>
                        <div
                          className={`${classes.drawer__product} ${classes.drawerPD} site__addon__summary__common__pd`}
                        >
                          <div>
                            <div className={classes.drawer__btn__section}>
                              <p className={classes.product__info}>
                                {ele?.include_item_name}
                              </p>
                            </div>
                            {/* <p className={classes.product__text}>
                      You can cancel subcription after recurringPeriod visits
                  </p> */}
                          </div>
                          <p className={classes.includedPrice}>Free</p>
                        </div>
                        <div className={classes.drawer__divider}></div>
                      </>
                    ),
                )}

              {productIncludedItems?.length < 0 && (
                <div className={classes.drawer__divider}></div>
              )}

              {/* Product Addons */}
              {selectedAddonIDs?.length > 0 &&
                selectedAddonIDs?.map((addon) => (
                  <>
                    <div
                      className={`${classes.drawer__addon} ${classes.drawerPD}`}
                    >
                      {addon?.image !== null ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_APP_BACKEND_URI}/api/category/get-file/${addon?.image?.id}`}
                          alt="Urbanserve"
                          width="100%"
                          className={classes.drawer__img}
                        />
                      ) : (
                        <img
                          src="/site__main__images/site__addon.png"
                          alt="Urbanserve"
                          width="100%"
                          className={classes.drawer__img}
                        />
                      )}
                      <h4 className={classes.product__info}>
                        {addon?.quantity_applicable
                          ? ` ${addon.quantity} x ${addon?.title}`
                          : `${addon?.title}`}
                      </h4>

                      <h2
                        className={classes.includedPrice}
                        style={{marginLeft: 'auto'}}
                      >
                        £{addon?.price}
                      </h2>
                    </div>
                    <div className={classes.drawer__divider}></div>
                  </>
                ))}

              <div className={`${classes.drawer__flex} ${classes.drawerPD}`}>
                <h3 className={classes.discount__title}>Discount</h3>
                <p className={classes.discount__price}>
                  - £{productSelected?.discount_price}
                </p>
              </div>

              <div className={`${classes.drawer__footer} ${classes.drawerPD}`}>
                <h6 className={classes.footer__title}>
                  Total:{' '}
                  <span className={classes.footer__price}>£{total_price}</span>
                </h6>
              </div>
            </Drawer>
            {/* Mobile Summary Drawer */}

            {/* Addon Summary Drawer */}
            <Drawer
              open={isAddonModalOpen}
              anchor="right"
              classes={{paper: classes.drawerPaper}}
              onClose={() => setAddonModalOpen(false)}
            >
              <div
                className={classes.includedDrawerHeader}
                style={{justifyContent: 'flex-end'}}
              >
                <img
                  width="100%"
                  src="/site__main__images/site__close.png"
                  alt="Urbanserve"
                  className={classes.addonDrawerClose}
                  onClick={() => setAddonModalOpen(false)}
                />
              </div>

              <div className={classes.addonDrawerPadding}>
                <h2 className={classes.addonTitle}>
                  {addonModalDetail?.title ?? `~`}
                </h2>
                <h2 className={classes.addonInfo}>
                  {addonModalDetail?.description ?? `~`}
                </h2>
              </div>
            </Drawer>
            {/* Mobile Summary Drawer */}

            <section className="site__package__summary__box addon__summary__box">
              <div>
                <p
                  onClick={() => setSummaryModalOpen(true)}
                  className="site__package__summary__view"
                >
                  View Summary
                </p>
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
                        color: `#fff`,
                        borderColor: `#fff`,
                      }}
                    >
                      {1 + selectedAddonIDs?.length}
                    </span>
                    <p
                      style={{
                        color: `#fff`,
                      }}
                    >
                      £{total_price}
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
          </div>
        </>
      ) : (
        <InvalidAccess
          pageAccess="Addons"
          title="You have not selected any service. Expore services we offer and try again!"
        />
      )}
    </>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

const withConnect = connect(null, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(SiteMain))
