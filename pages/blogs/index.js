import React, {useState, useEffect} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import SiteFooter from '../../components/SiteFooter'
import SiteMainNavbar from '../../components/SiteMain/SiteMainNavbar'
import HelmetComponent from '../../components/Helmet'
import Pagination from '../../components/Pagination'
import {getBlogsListing, getLatestBlogs} from '../../Stores/Blogs/actions'
import {Container, Grid, Loader} from 'semantic-ui-react'
import Router, {useRouter} from 'next/router'
function Blogs({
  getBlogsListing,
  isFetchingBlogs,
  blogs,
  getLatestBlogs,
  latestBlogs,
  isFetchingLatestBlogs,
}) {
  useEffect(() => {
    getBlogsListing()
    getLatestBlogs()
  }, [])

  const router = useRouter()
  const changeRoute = (e) => {
    router.push(`/blogs/${e}`)
  }
  const isBrowser = () => typeof window !== 'undefined'

  let link = isBrowser() ? `${window.location.hostname}/blogs` : ''

  return (
    <>
      <HelmetComponent
        title={`UrbanServe | Blogs`}
        ogTitle={`UrbanServe | Blogs`}
        description="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogDescription="UrbanServe is the leading on demand cleaning and repair service. We offer a wide range of services, from carpet cleaning to boiler servicing, at the click of a button. Book now and enjoy peace of mind!"
        ogUrl={isBrowser() && `&& ${window?.location?.hostname}/blogs`}
        createJsonLD={false}
      />
      <SiteMainNavbar />
      {isFetchingBlogs || isFetchingLatestBlogs ? (
        <Loader active inline="centered" style={{}} />
      ) : (
        <>
          <div class="body__wrapper">
            <section className="blog__section">
              <Container>
                <div className="list_container">
                  <Grid container>
                    {latestBlogs.length > 0 &&
                      latestBlogs?.map((ele, i) => (
                        <Grid.Column
                          className="column_margin"
                          key={i}
                          mobile={16}
                          tablet={8}
                          computer={8}
                        >
                          <div className="list__box">
                            <a
                              href="javascript:void(0)"
                              className="post_image_block_link "
                              onClick={() => changeRoute(ele?.slug)}
                            >
                              <img
                                className="post_image"
                                src={ele?.image?.file_path}
                              />
                            </a>
                            <div className="card_all_post">
                              <a
                                href="javascript:void(0)"
                                onClick={() => changeRoute(ele?.slug)}
                                className="title_link_block "
                              >
                                <h3>
                                  {ele?.title?.length > 60
                                    ? ele?.title.substring(0, 60) + '...'
                                    : ele?.title}
                                </h3>
                              </a>
                              <div className="author_block">
                                <div>
                                  {ele?.tags?.split(',')?.map((tag, j) => (
                                    <div
                                      className="ui label"
                                      key={j}
                                      style={{marginBottom: '7px'}}
                                    >
                                      {tag}
                                    </div>
                                  ))}

                                  <div className="hero_date">
                                    {' '}
                                    {ele?.updated_at}{' '}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid.Column>
                      ))}
                  </Grid>
                </div>
              </Container>
            </section>
            <section className="blog__section no__padding">
              <Container>
                <div className="list_container no__padding">
                  <div className="section_title_line">
                    <h2 className="section_title">All Posts</h2>
                    <div className="red_line_small"></div>
                    <div className="black_line_big"></div>
                  </div>
                  <Grid container>
                    {blogs?.data?.length > 0 &&
                      blogs?.data?.map((ele, i) => (
                        <Grid.Column
                          className="column_margin"
                          key={i}
                          mobile={16}
                          tablet={8}
                          computer={5}
                        >
                          <div className="list__box">
                            <a
                              href="javascript:void(0)"
                              className="post_image_block_link "
                              onClick={() => changeRoute(ele?.slug)}
                            >
                              <img
                                className="post_image"
                                src={ele?.image?.file_path}
                              />
                            </a>
                            <div className="card_all_post">
                              <a
                                onClick={() => changeRoute(ele?.slug)}
                                href="javascript:void(0)"
                                className="title_link_block "
                              >
                                <h3>
                                  {ele?.title?.length > 50
                                    ? ele?.title.substring(0, 50) + '...'
                                    : ele?.title}
                                </h3>
                              </a>
                              <div className="author_block">
                                <div>
                                  {ele?.tags?.split(',')?.map((tag, j) => (
                                    <div
                                      className="ui label"
                                      key={j}
                                      style={{marginBottom: '7px'}}
                                    >
                                      {tag}
                                    </div>
                                  ))}

                                  <div className="hero_date">
                                    {ele?.updated_at}{' '}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid.Column>
                      ))}
                  </Grid>
                </div>
                <Pagination
                  style={{display: 'flex', justifyContent: 'center'}}
                  count={blogs?.last_page}
                  page={blogs?.current_page}
                  onPager={(page) => getBlogsListing({page})}
                  variant="outlined"
                  shape="rounded"
                />
              </Container>
            </section>
          </div>

          <SiteFooter />
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.BlogsReducer?.blogs,
  isFetchingBlogs: state.BlogsReducer?.isFetchingBlogs,
  latestBlogs: state.BlogsReducer?.latestBlogs,
  isFetchingLatestBlogs: state.BlogsReducer?.isFetchingLatestBlogs,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogsListing: (data) => dispatch(getBlogsListing(data)),
    getLatestBlogs: (data) => dispatch(getLatestBlogs(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Blogs)
