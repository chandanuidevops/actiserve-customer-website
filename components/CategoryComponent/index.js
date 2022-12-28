import React, { useEffect, useState } from 'react'

import { connect, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { compose } from "redux";
import { getCategoryDetailsRequest } from '../../Stores/CategoryDetails/actions'
import Skeleton from 'react-loading-skeleton';
import Layout from '../Layout/index';
import About from '../../components/about';
import { getProductRequest } from '../../Stores/GroupDetails/actions';
function HomeCleaning({ categoryDetails, fetchCategoryDetails, isFetching, product, fetchProduct }) {
  const allData = useSelector((state) => state)

  const history = useRouter();

  const [products, setProducts] = useState([])

  // Store slug from url to get data
  useEffect(() => {
    if (history.query?.slug?.[1]) {
      let categorySlug = history.query?.slug?.[1];
      if (categorySlug !== null && categorySlug !== '' && categorySlug !== undefined) {
        fetchCategoryDetails({ categorySlug })
      }
    }
  }, [history.query?.slug])

  // useEffect(() => {
  //   if (categoryDetails && categoryDetails?.products?.length > 0) {
  //     setProducts(categoryDetails?.products)
  //   }
  // }, [categoryDetails])

  useEffect(() => {
    if (product && product?.length > 0) {
      setProducts(product)
    }
  }, [product])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const isBrowser = () => typeof window !== "undefined"
  useEffect(() => {
    if (isBrowser()) {
      let current_category = localStorage?.getItem('actiserve_current_category')
      if (current_category) {
        fetchProduct(current_category)
      }
    }
  }, []);

  return (
    <Layout>
      <section className="ld-banner-wrapper">
        <div className="ld-banner-container container flex">
          <div className="ld-banner-left">
            {/* Title */}
            <h1 className="ld-banner-left-title">{isFetching ? <Skeleton /> : categoryDetails?.category_name}</h1>
            {/* List */}
            <div className="ld-banner-left-list">
              <ul>
                <li className="list-margin-bottom">Instant prices</li>
                <li className="list-margin-bottom">No form filling</li>
                <li>Local to you</li>
              </ul>
            </div>

            {/* Badges */}
            <div className="ld-banner-left-badge">
              <img className="ld-star badge-mr" src="/images/icon-stars.png" width="100%"></img>
              <img className="ld-trust badge-mr" src="/images/icon-trust.png" width="100%"></img>
              <h6 className="ld-text">Rated:Excellent</h6>
            </div>

            {/* Text */}
            <div className="ld-banner-left-info">
              <p>
                We know that life can get a little busy and hectic – so keeping your home clean should be the least of your worries. Whether you’re a homeowner, tenant or landlord, we offer numerous home cleaning services designed to make life run that little bit smoother and freeing up special time for you to get on with other things.
              </p>
            </div>
          </div>
          <div className="ld-banner-right">
            <div className="ld-banner-right-bg">
              <img className="ld-banner-right-logo" src="/images/id-banner.png" width="100%"></img>
            </div>
            <div className="ld-banner-right-bg-web">
              <img className="ld-banner-right-logo-web" src="/images/ld-banner-t.png" width="100%"></img>
            </div>
            <img className="ld-banner-right-hand" src="/images/ld-banner-hand.png" width="100%"></img>
          </div>
        </div>
      </section>
      {products?.length >= 0 && products.map((product, i) => (
        <section class="lp-price-wrapper">
          <div class="price-container container">
            <div class="cards">
              <div class={i == 0 ? 'card-one card-style' : i == 1 ? 'card-two card-style' : i == 2 ? 'card-three card-style' : i == 3 ? 'card-four card-style' : ''}>
                <button class="label">Loyalty Discount</button>
                <h4 onClick={() => history.replace(`/${history.query?.slug?.[0]}/product/${product?.title.toLowerCase().replace(/\s/gm, '-')}`)}>{isFetching ? <Skeleton /> : product?.title}</h4>
                <p>
                  From <span>${isFetching ? <Skeleton /> : product?.price}</span>/ph
                </p>
                <div class="card-one-list">
                  {/* <input
                    type="checkbox"
                    class="one-read-more-state"
                    id="one-price-list"
                  /> */}
                  <ul class="card-list one-read-more-wrap">
                    <li>Full house cleaning</li>
                    <li>Recurring service with discounts</li>
                    {/* <li class="one-read-more-target">Full house cleaning</li>
                    <li class="one-read-more-target">Full house cleaning</li>
                    <li class="one-read-more-target">Full house cleaning</li>
                    <li class="one-read-more-target">Full house cleaning</li>
                    <li class="one-read-more-target">Full house cleaning</li>
                    <label
                      for="one-price-list"
                      class="one-read-more-trigger"
                    ></label> */}
                  </ul>
                </div>
                <button class="card-btn">Check availability</button>
              </div>
            </div>
          </div>
        </section>

      ))}

      <section class="lp-how-wrapper">
        <div class="how-wrapper container">
          {/* <h6 class="how-heading header-light">No hussle, no fuss, book and track until the job is done.</h6> */}
          {/* <div class="how-btn">
                        <div class="how-btn-content">
                            <button>How it works</button>
                            <div id="triangle-down">
                            </div>
                        </div>
                    </div> */}

          {/* Info */}
          <div className="how-title">
            <h1>
              We are growing a commnity of cleaners, handymen, engineers,
              gardeners and more with the aim of connection you with the
              services you need, in your local area.
            </h1>
          </div>

          {/* Heading */}
          <div className="how-header">
            <h1>How it works</h1>
          </div>

          {/* Card */}
          <div class="how-cards">
            <div class="how-card-one">
              <div class="card-header">
                <img src="/images/how-1.png" width="100%" alt="" srcset="" />
              </div>
              <button>You Choose</button>
              <div className="card-one-line"></div>
              {/* <div class="card-footer">
                                <h6 class="text-bold">01. <span class="text-light">You Choose</span> </h6>
                            </div> */}
            </div>
            <div class="how-card-two">
              <div class="card-header">
                <img src="/images/how-2.png" width="100%" alt="" srcset="" />
              </div>
              <button>You Book</button>
              <div className="card-two-line"></div>
              {/* <div class="card-footer">
                                <h6 class="text-bold">02. <span class="text-light">You Book</span> </h6>
                            </div> */}
            </div>
            <div class="how-card-three">
              <div class="card-header">
                <img src="/images/how-3.png" width="100%" alt="" srcset="" />
              </div>
              <button>You Track</button>
              <div className="card-three-line"></div>

              {/* <div class="card-footer">
                                <h6 class="text-bold">03. <span class="text-light">You Track</span> </h6>
                            </div> */}
            </div>
            <div class="how-card-four">
              <div class="card-header">
                <img src="/images/how-4.png" width="100%" alt="" srcset="" />
              </div>
              <button>we deliver</button>
              <div className="card-four-line"></div>
              {/* <div class="card-footer">
                                <h6 class="text-bold">04. <span class="text-light">You Deliver</span> </h6>
                            </div> */}
            </div>
          </div>

          {/* Button */}
          <div className="how-find">
            <button>Find out more {'>'} </button>
          </div>
        </div>
      </section>
      <section className="work-wrapper feature-container">
        <div className="work-container container">
          <div className="row-flex">
            <div className="work-card">
              <span className="work-icon-circle">
                <img src="/images/feather-thumbs-up.png"></img>
              </span>
              {/* <h1 className="work-card-header">Virtual Appointments</h1> */}
              <p className="work-card-info">
                We offer fair and flexible pricing based on your location
              </p>
            </div>
            <div className="work-card">
              <span className="work-icon-circle">
                <img src="/images/feather-check-circle.png"></img>
              </span>
              {/* <h1 className="work-card-header">Work around your schedule</h1> */}
              <p className="work-card-info">
                We promise a no-faff service – there’s no long forms to fill in
              </p>
            </div>
            <div className="work-card">
              <span className="work-icon-circle">
                <img src="/images/feather-calendar.png"></img>
              </span>
              {/* <h1 className="work-card-header">No more faff</h1> */}
              <p className="work-card-info">
                We’ll work around your flexibility and availability
              </p>
            </div>
            <div className="work-card">
              <span className="work-icon-circle">
                <img src="/images/feather-shield.png"></img>
              </span>
              {/* <h1 className="work-card-header">No more waiting</h1> */}
              <p className="work-card-info">Quotes within 36 hours*</p>
            </div>
            <div className="work-card">
              <span className="work-icon-circle">
                <img src="/images/feather-lock.png"></img>
              </span>
              {/* <h1 className="work-card-header">Checked & vetted</h1> */}
              <p className="work-card-info">
                Our service providers are fully vetted and DBS checked
              </p>
            </div>
            <div className="work-card">
              <span className="work-icon-circle">
                <img src="/images/feather-phonelink.png"></img>
              </span>
              {/* <h1 className="work-card-header">No data sharing</h1> */}
              <p className="work-card-info">
                Our new virtual diagnostics are an environmentally friendly way
                to diagnose faults
              </p>
            </div>
          </div>
        </div>
      </section>

      <About />

    </Layout>
  )
}

const mapStateToProps = (state) => ({
  categoryDetails: state.CategoryDetailsReducer?.categoryDetails,
  isFetching: state.CategoryDetailsReducer?.isFetchingCategoryDetails,
  product: state.groupDetailsReducer?.product,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCategoryDetails: (data) => dispatch(getCategoryDetailsRequest(data)),
    fetchProduct: (data) => dispatch(getProductRequest(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeCleaning);
