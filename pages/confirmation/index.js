import React, {useEffect, useState, Suspense} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import Link from 'next/link'
import moment from 'moment'

/* Semantic UI */
import {
  Header,
  Icon,
  Button,
  Image,
  List,
  Grid,
  Form,
  Input,
} from 'semantic-ui-react'

/* Components */
import MainNav from '../../components/MainNav'

/* Utils */
import useValidator from '../../utils/useValidator'
import * as Yup from 'yup'
import {
  Box,
  FormControl as FormControlDefault,
  makeStyles,
  withStyles,
  TextField,
  FormHelperText,
} from '@material-ui/core'

/* API Calls */
import actions from '../../Stores/Auth/actions'
import {editCustomer} from '../../Stores/CustomerFlow/actions'
import SiteMainNavbarV2 from '../../components/SiteMain/SiteMainNavbar/SiteMainNavbarV2'
import SiteFooter from '../../components/SiteFooter'
import InvalidAccess from '../../components/InvalidAccess'
import Router, {useRouter} from 'next/router'
import HelmetComponent from '../../components/Helmet'
const LoginAction = actions.CustomerLogin

export const Confirmation = ({
  orderData,
  CustomerLogin,
  editCustomerAction,
}) => {
  const history = useRouter()
  const isBrowser = () => typeof window !== 'undefined'

  const [orderDetails, setOrderDetails] = useState(null)
  const [packages, setPackages] = useState([])

  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  const [showPassword, setShowPassword] = React.useState(false)

  const router = useRouter()

  useEffect(() => {
    const exitingFunction = () => {
      localStorage.setItem('order_details', null)
    }

    history.events.on('routeChangeStart', exitingFunction)

    return () => {
      history.events.off('routeChangeStart', exitingFunction)
    }
  }, [])

  function onTogglePassword() {
    setShowPassword(!showPassword)
  }
  // Login Validator
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
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      // email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
  })

  function onSubmit() {
    if (userInfo === null) {
      let credentials = {
        customer_type: orderDetails?.customer_details?.customer?.customer_type,
        email: orderDetails?.customer_details?.customer?.email,
        mobile_no: orderDetails?.customer_details?.customer?.mobile_no,
        name: orderDetails?.customer_details?.customer?.customer_type,
        password: values?.password,
        telephone_no: orderDetails?.customer_details?.customer?.telephone_no,
      }
      editCustomerAction({
        data: credentials,
        token: orderDetails?.access_token,
        id: orderDetails?.customer_id,
        history,
      })
    }
  }

  //   useEffect(() => {
  //     if (orderDetails !== null) {
  //       setValues({
  //         ...values,
  //         email: orderDetails?.customer_details?.customer?.email,
  //       })
  //     }
  //   }, [orderDetails])

  useEffect(() => {
    if (orderData?.id === undefined) {
      if (isBrowser() === true) {
        let orderDetail = localStorage.getItem('order_details')
        if (orderDetail !== null) {
          let orderObj = JSON.parse(orderDetail)
          if (orderObj) {
            setOrderDetails(orderObj)
          }
        }

        let packages = localStorage.getItem('urbanserve_cart_package')
        if (packages) {
          let parsedPackages = JSON.parse(packages)
          if (parsedPackages) {
            setPackages(parsedPackages)
          }
        }
      }
    } else {
      setOrderDetails(orderData)
    }
  }, [orderData])

  function nameGenerate(dirty) {
    let clean = JSON.parse(dirty)
    if (clean?.title) {
      return clean?.title
    } else {
      ;('~')
    }
  }

  let link = isBrowser() ? `${window.location.hostname}/confirmation` : ''

  return (
    <div>
      <HelmetComponent
        title="UrbanServe | Confirmation"
        ogTitle="UrbanServe | Confirmation"
        description="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogDescription="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogUrl={link}
        createJsonLD={false}
        showNoFollow={true}
      />

      {orderDetails ? (
        <>
          <SiteMainNavbarV2 />

          <section className="site-confirm-wrapper">
            <div className="container site-confirm-container">
              <Header as="h2" icon textAlign="center">
                <img
                  className="site-success"
                  src="/site__main__images/icon__success.png"
                  width="100%"
                  alt="Urbanserve Icon"
                />
                <Header.Content
                  className="site-confirm-title"
                  style={{paddingBottom: 5}}
                >
                  Thank you for your order.
                </Header.Content>
                <h3 className="site-confirm-info">
                  Kindly check you email for order details!
                </h3>
              </Header>

              <div className="site-confirm-details">
                <h3 className="site-confirm-info">Order Details</h3>
                <div className="site-confirm-flex">
                  <div className="site-confirm-flex-item">
                    <h4 className="site-confirm-title">Product</h4>
                    <p className="site-confirm-sub-title">
                      {orderDetails?.is_product_applicable
                        ? nameGenerate(orderDetails?.product_selected)
                        : orderDetails?.product_details?.title}
                    </p>
                  </div>

                  {/* Packages */}
                  {orderDetails?.is_package_applicable && packages?.length > 0 && (
                    <div className="site-confirm-flex-item">
                      <h4 className="site-confirm-title">Packages</h4>
                      <div>
                        {packages?.length > 0 &&
                          packages?.map((data) => (
                            <>
                              <p className="site-package-title">
                                {data?.title}
                              </p>
                              {data?.packages?.length > 0 &&
                                data?.packages?.map((ele) => (
                                  <p className="site-package-sub-title">
                                    {ele?.quantity_applicate
                                      ? `${ele?.quantity} x ${ele?.title} for £${ele?.total_price}`
                                      : ` ${ele?.title} for £${ele?.total_price}`}
                                  </p>
                                ))}
                            </>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <div className="site-confirm-flex-item">
                    <h4 className="site-confirm-title">Booked On</h4>
                    <p className="site-confirm-sub-title">
                      {moment(
                        orderDetails?.date_of_purchase,
                        'YYYY-MM-DD h:mm:ss',
                      ).format('dddd, MMMM Do YYYY, h:mm A')}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="site-confirm-flex-item">
                    <h4 className="site-confirm-title">Total Price</h4>
                    <p className="site-confirm-sub-title">
                      £{orderDetails?.total_price}
                    </p>
                  </div>
                </div>
                <p className="site-confirm-helper">
                  Download our app and manage your orders with ease!
                </p>
                <div className="site-confirm-apps">
                  <a href={process.env.NEXT_PUBLIC_APP_GOOGLE} target="_blank">
                    <img src="/images/footer-gapp.png" />
                  </a>

                  <a href={process.env.NEXT_PUBLIC_APP_APPLE} target="_blank">
                    <img
                      className="app-google"
                      src="/images/footer-apple-app.png"
                    />
                  </a>
                </div>
                <Link style={{cursor: 'pointer'}} href="/">
                  <p
                    className="site-confirm-helper"
                    style={{
                      margin: '3rem 0rem',
                      cursor: 'pointer',
                      color: '#0587ff',
                      display: 'inline-block',
                    }}
                  >
                    Return to Home Page
                  </p>
                </Link>
              </div>

              <div>
                <Grid centered>
                  {/* <Grid.Row>
                    <Grid.Column computer={6} tablet={6} mobile={16}> */}
                  {/* {userInfo !== null && (
                    <p className="site-confirm-helper">
                      Manage your orders from{' '}
                      <b>
                        <Link style={{cursor: 'pointer'}} href="/active-offers">
                          here!
                        </Link>
                      </b>
                    </p>
                  )} */}
                  {/* <form onSubmit={handleSubmit}>
                                        {userInfo === null && <Form.Field className='fieldMb'>
                                            <Input
                                                className="checkout-form-field"
                                                type={"text"}
                                                placeholder='Email'
                                                fluid
                                                disabled={true}
                                                {...getFieldProps('email')}
                                            />
                                        </Form.Field>}
                                        {userInfo === null && (
                                            <>
                                                <Form.Field className='fieldMb' >
                                                    <Input
                                                        fluid
                                                        className="checkout-form-field"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder='Password'
                                                        icon={
                                                            <Icon
                                                                name={showPassword ? "eye slash" : "eye"}
                                                                link
                                                                onClick={() => onTogglePassword()}
                                                            />
                                                        }
                                                        error={!!(touched.password && errors.password)}
                                                        touched={!!(touched.password && errors.password)}
                                                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                                                    />
                                                    {touched.password && errors.password ? (
                                                        <FormHelperText error={!!errors.password}>
                                                            Password is Required
                                                        </FormHelperText>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Form.Field>
                                                <Button
                                                    className='fieldMb'
                                                    type="submit"
                                                    style={{ backgroundColor: '#FCBF49', color: 'white', marginBottom: '12px' }}>
                                                    Submit
                                                </Button>
                                            </>)}
                                    </form> */}
                  {/* </Grid.Column>
                  </Grid.Row> */}
                </Grid>
              </div>
            </div>
          </section>

          {/* Site Footer Start */}
          <SiteFooter />
          {/* Site Footer End */}
        </>
      ) : (
        <InvalidAccess
          pageAccess="Confirmation"
          title="You have not booked any service. Expore services we offer and try again!"
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  orderData: state.FinalOrderReducer?.addOrderSuccessData,
})
const mapDispatchToProps = (dispatch) => {
  return {
    CustomerLogin: (...args) => dispatch(LoginAction(...args)),
    editCustomerAction: (...args) => dispatch(editCustomer(...args)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Confirmation)
