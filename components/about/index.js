import React, { useEffect, useState } from 'react'
import { Dropdown, Input, Search, Grid, Header, Segment } from 'semantic-ui-react'
import { connect, useSelector } from 'react-redux'
import { compose } from "redux";
import {
  getProductList,
  getPopularServices,
  getServiceResult,
} from '../../Stores/Services/actions'
// import { getPostcode } from '../../utils/postcodeSearch'
function about({ fetchProductList, fetchPopularServiceList, fetchServiceResultList }) {

  const {
    isPopularServiceLoading,
    isProductLoading,
    isServiceLoading,
    popularServiceList,
    productList,
    serviceList,
  } = useSelector((state) => state?.ServicesReducer);

  const [allProductList, setAllProductList] = useState([]);
  const [state, setState] = useState({ product_id: '', postcode: '' });
  const [postcodeResult, setPostcodeResult] = useState([])


  useEffect(() => {
    fetchProductList();
    fetchPopularServiceList()
  }, [])

  // useEffect(() => {
  //   if (state.postcode.length > 1 && state.postcode.length !== 7) {
  //     getPostcodeList();
  //   }
  // }, [state.postcode])

  const getProductList = async () => {
    let data = JSON.parse(JSON.stringify(productList))
    if (data.length > 0) {
      let products = []
      await data.map(async (ele) => {
        await ele.products.length > 0 && ele.products.map(async (item) => {
          item.value = await item.id;
          item.text = await item.title;
          await products.push(item)
        })
      })
      await setAllProductList(products)
    }
  }

  useEffect(() => {
    let data = JSON.parse(JSON.stringify(productList))
    if (data.length > 0) {
      getProductList()
    }
  }, [productList])

  // const getPostcodeList = async () => {
  //   let res = await getPostcode(state.postcode)
  //   if (res) {
  //     setPostcodeResult(res)
  //   } else {
  //     setPostcodeResult([])
  //   }
  // }

  const onSubmit = () => {
    let payload = {
      product_id: state.product_id,
      postcode: state.postcode.replace(/ /g, '')
    }
    fetchServiceResultList(payload);
  }

  return (
    <div>
      {/* About Container */}
      {/* <section className="about-cm-wrapper">
        <div className="about-cm-container container">
          <div className="about-cm-one">
            <div className="about-cm-content">
              <h1 className="about-cm-title">About Urbanserve</h1>
              <p className="about-cm-info">
                Read about our story and why we're trying to make it easier for
                you to connect to the people you need.
              </p>
              <button className="about-cm-button">Our Story</button>
            </div>
            <div className="about-cm-one-img">
              <img src="/images/hand-holding-phone.png"></img>
            </div>
          </div>

        </div>

        <section className="testimonial-cm-wrapper">
          <div className="testimonial-cm-container container">
            <div className="testimonial-cm-content">
              <h1>See what others have said</h1>
              <div className="testimonial-cm-cards">
                <div className="testimonial-cm-card-one">
                  <div className="card-one-rating">
                    <img src="/images/icon-stars.png" width="100%"></img>
                    <span>21 Apr</span>
                  </div>
                  <h6>Great Easy to use</h6>
                  <p className="comment">
                    The tracking system makes it easy to see when my engineer
                    was going to visit.
                  </p>
                  <p className="author">Vicky W</p>
                </div>

                <div className="testimonial-cm-card-two">
                  <div className="card-two-rating">
                    <img src="/images/icon-stars.png" width="100%"></img>
                    <span>21 Apr</span>
                  </div>
                  <h6>Great Easy to use</h6>
                  <p className="comment">
                    The tracking system makes it easy to see when my engineer
                    was going to visit.
                  </p>
                  <p className="author">Vicky W</p>
                </div>

                <div className="testimonial-cm-card-three">
                  <div className="card-three-rating">
                    <img src="/images/icon-stars.png" width="100%"></img>
                    <span>21 Apr</span>
                  </div>
                  <h6>Great Easy to use</h6>
                  <p className="comment">
                    The tracking system makes it easy to see when my engineer
                    was going to visit.
                  </p>
                  <p className="author">Vicky W</p>
                </div>
              </div>
              <div className="testimonial-cm-rating">
                <img
                  className="testimonial-cm-star"
                  src="/images/icon-stars.png"
                  width="100%"
                ></img>
                <img
                  className="testimonial-cm-trust"
                  src="/images/icon-trust.png"
                  width="100%"
                ></img>
                <h3 className="rating">
                  Rated: <span className="bold">Excellent</span>
                </h3>
              </div>

              <div className="testimonial-cm-form">
                <div className="testimonial-cm-form-img">
                  <img src="/images/img-map.png" width="100%"></img>
                </div>
                <div className="banner-left-card">
                  <div className="banner-left-text">
                    <h6>We cover the whole of the UK</h6>
                  </div>
                  <div className="ui card" wfd-id="181">
                    <div className="content" wfd-id="182">
                      <div className="header card-header" wfd-id="185">
                        Book a service now
                      </div>
                      <Dropdown
                        placeholder='Select Product'
                        fluid
                        selection
                        disabled={isProductLoading}
                        options={allProductList}
                        noResultsMessage={'No results found.'}
                        value={state.product_id}
                        onChange={(e, newValue) => {
                          setState({
                            ...state,
                            product_id: newValue.value
                          })
                        }}
                      />
                      <div className="home-search-input">
                        <Search
                          fluid
                          placeholder="Postcode"
                          // loading={isLoading}
                          onResultSelect={(data, result) => {
                            setState({
                              ...state,
                              postcode: result.result.title
                            })
                          }}
                          onSearchChange={(data, result) => {
                            setState({
                              ...state,
                              postcode: result.value.toUpperCase()
                            })
                          }}
                          results={postcodeResult}
                          value={state.postcode}
                        />
                      </div>

                      <button className="button"
                        disabled={state.product_id == "" ? true : false}
                        onClick={() => onSubmit()}
                      >
                        Check availability & prices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section> */}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    //Fetch list
    fetchProductList: (data) => dispatch(getProductList(data)),
    fetchPopularServiceList: (data) => dispatch(getPopularServices(data)),
    fetchServiceResultList: (data) => dispatch(getServiceResult(data)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)((about));
