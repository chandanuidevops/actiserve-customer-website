import React, {useState, useEffect} from 'react'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import SiteFooter from '../../../components/SiteFooter'
import SiteMainNavbar from '../../../components/SiteMain/SiteMainNavbar'
import HelmetComponent from '../../../components/Helmet'

/* Actions */
import {getSingleBlog} from '../../../Stores/Blogs/actions'
import {getGroupRequest} from '../../../Stores/GroupDetails/actions'
import {
  Container,
  Loader,
  Button,
  List as SemanticList,  Modal,
  Dimmer,
} from 'semantic-ui-react'
import Router, {useRouter} from 'next/router'
import {
  Typography,
  IconButton,
  TextField,
  makeStyles,
  Drawer,
} from '@material-ui/core'
import Images from '../../../Assets/Icons'
import Image from 'next/image'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useNavigator from '../../../utils/useNavigator'
/* Helper Packages */
import {useMediaQuery} from 'react-responsive'
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  customBadge: {
    backgroundColor: '#0D6773',
    color: 'white',
  },
  drawerPaper: {
    width: '100%',
    height: '65vh',
  },
  listPadding: {
    padding: '1rem 0.4rem',
  },
  FilterTitle: {
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '1.1rem',
    color: '#21262b',
    lineHeight: '1.857rem',
    letterSpacing: '0.05em',
    fontWeight: '600',
  },
  rootSecondary: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0px',

      '& .MuiFormControl-root': {
        color: '#2A2A2A',
      },
      '& fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&:hover fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&.Mui-focused fieldset': {
        // borderColor: '#2A2A2A',
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '& .MuiFormControl-root': {
        background: 'red',
      },
    },
    '& .MuiAutocomplete-inputRoot': {
      fontFamily: 'Urbanist',
      padding: '0px 20px !important',
      minHeight: '68px',
      maxHeight: '68px',
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
  bookBtn: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0px',
      maxHeight: '48px',

      '& .MuiFormControl-root': {
        color: '#2A2A2A',
      },
      '& fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&:hover fieldset': {
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '&.Mui-focused fieldset': {
        // borderColor: '#2A2A2A',
        border: '2px solid #2A2A2A',
        color: '#2A2A2A',
      },
      '& .MuiFormControl-root': {
        background: 'red',
      },
    },
    '& .MuiAutocomplete-inputRoot': {
      backgroundColor: 'white',
      fontFamily: 'Urbanist',
      color: '#2A2A2A',
      padding: '0px 20px !important',
      minHeight: '48px',
      maxHeight: '48px',
      color: '#2A2A2A !important',
    },
    '&.MuiInputBase-input': {
      color: '#2A2A2A !important',
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: 'rgba(95, 164, 227, 0.1)',
    },
    '&.MuiOutlinedInput-input': {
      color: 'red !important',
    },
  },
  customTextField: {
    '& input::placeholder': {
      fontSize: '1.143rem',
      color: '#2A2A2A !important',
    },
  },
}))
function BlogDetails({
  getSingleBlog,
  isFetchingSingleBlog,
  currentBlog,
  fetchGroupListingDetails,
}) {
  const classes = useStyles()

  const {groupListingDetails, isFetchingGroupListingDetails} = useSelector(
    (state) => state?.groupDetailsReducer,
  )

  const router = useRouter()
  const slug = router?.query?.slug
  // Check if tablet or mobile screen is active
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})
  /* Mobile Drawer For Group */
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [userCity, setUserCity] = useState('')
  const {
    isLocationValid,
    isValidatingLocation,
    isUrlLocationValid,
    isValidatingUrlLocation,
  } = useSelector((state) => state?.groupDetailsReducer)
  const [
    icon,
    errorModalOpen,
    closeErrorModal,
    resetGeoState,
    successModalOpen,
    closeSuccessModal,
    address,
    city,
    formattedAddress,
    detectUsingGPS,
  ] = useNavigator()

  // If user selects location drop down redirect and save the location in local storate
  useEffect(() => {
    if (userCity && userCity?.title) {
      localStorage.setItem(
        'urbanserve_user_location',
        userCity?.title?.toLowerCase(),
      )
      localStorage.setItem(
        'urbanserve_user_last_location',
        userCity?.title?.toLowerCase(),
      )
      router.push(`/${userCity?.title?.toLowerCase()}`)
    }
  }, [userCity])
  useEffect(() => {
    getSingleBlog(slug)
    /* Fetch groups data */
    fetchGroupListingDetails()
  }, [slug])

  return (
    <>
      <HelmetComponent
        title="UrbanServe - Blogs"
        description="Urbanserve Company is your one-stop destination for expert. Get dozens of trusted professionals near you to take care of all your home and beauty needs"
        ogTitle=""
        ogType="urbanserve company"
        ogUrl=""
        ogImage=""
        ogDescription=""
      />
      <SiteMainNavbar />

      {isFetchingSingleBlog || Object.keys(currentBlog)?.length == 0 ? (
        <Loader active inline="centered" style={{}} />
      ) : (
        <>
          <div className="body__wrapper">
            <div className="inner_hero_block ">
              <div className="header_post_info_block">
                <h1 className="inner_post_title">{currentBlog?.title}</h1>
                <div className="author_block">
                  <div>
                    {currentBlog?.tags?.split(',')?.map((tag, j) => (
                      <div className="ui label" style={{marginBottom: '7px'}}>
                        {tag}
                      </div>
                    ))}

                    <div className="hero_date"> {currentBlog?.updated_at}</div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${currentBlog?.image?.file_path})`
                }}
                className="post_inner_image_block"
              ></div>
            </div>
            <section className="blog__section section_margin">
              <Container>
                <div class="intro_post">
                  <Typography
                    dangerouslySetInnerHTML={{__html: currentBlog?.description}}
                  />
                </div>
              </Container>
            </section>
          </div>

          {/* Site Book Starts */}
          <section className="site__book__wrapper call_to_action_bg">
            <div className="site__book__container site_lg_container">
              <div className="site__book__content">
                <div className="site__book__sm__img">
                  <Image
                    alt="Urbanserve Icon"
                    src={Images.imgQuantity.src}
                    width={500}
                    height={500}
                    objectFit="contain"
                  />
                </div>

                <div className="site__book__text">
                  <h3>Ready to book</h3>
                </div>
                <div className="site__book__input">
                  {isTabletOrMobile && (
                    <Button
                      fluid
                      className="site__book__btn"
                      onClick={() => setDrawerOpen(true)}
                    >
                      {userCity ? userCity?.title : `Search your city`}
                      <div
                        style={{
                          position: 'relative',
                          width: '10px',
                          height: '10px',
                        }}
                      >
                        <Image
                          src={Images.iconSearch.src}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </Button>
                  )}

                  {!isTabletOrMobile && (
                    <Autocomplete
                      id="combo-box-demo"
                      variant="outlined"
                      placeholder="Select your city"
                      options={groupListingDetails}
                      getOptionLabel={(option) => option.title}
                      style={{maxHeight: '40px', minWidth: '100%'}}
                      className="site__book__btn"
                      onChange={(event, newValue) => {
                        newValue && setUserCity(newValue)
                      }}
                      classes={{
                        root: classes.bookBtn,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select your city"
                          classes={{root: classes.customTextField}}
                          InputProps={{
                            ...params.InputProps,

                            endAdornment: (
                              <IconButton size="small"></IconButton>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                </div>

                <div className="site__book__lg__img">
                  <Image
                    alt="Urbanserve Icon"
                    src={Images.imgQuantity.src}
                    width={300}
                    height={300}
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Site Book Ends */}
          <SiteFooter />

          {/* Mobile / Tablet Drawer */}
          <Drawer
            open={drawerOpen}
            anchor="bottom"
            classes={{paper: classes.drawerPaper}}
            style={{zIndex: '100'}}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  alignItems: 'center',
                  padding: '1rem 1rem',
                  borderBottom: '1px solid #e9e9ea',
                }}
              >
                <h3 className={classes.FilterTitle}>Select your city</h3>
                <IconButton
                  size="small"
                  disableFocusRipple
                  disableRipple
                  onClick={() => {
                    setDrawerOpen(false)
                  }}
                  style={{display: 'flex', justifyContent: 'flex-end'}}
                >
                  <img
                    src="/site__main__images/site__close.png"
                    width="20%"
                  ></img>
                </IconButton>
              </div>
              <div className={classes.listPadding}>
                <div
                  style={{
                    cursor: 'pointer',
                    alignItems: 'center',
                    display: 'flex',
                    padding: '0rem 0.2rem',
                  }}
                  onClick={() => {
                    setDrawerOpen(true)
                  }}
                >
                  {detectUsingGPS}
                </div>
                {isFetchingGroupListingDetails ? (
                  <Loader active inline="centered" />
                ) : (
                  <SemanticList selection verticalAlign="middle">
                    {groupListingDetails?.map((ele) => (
                      <>
                        <SemanticList.Item
                          onClick={() => {
                            setUserCity(ele)
                            setDrawerOpen(false)
                          }}
                        >
                          <SemanticList.Content>
                            <h2 className="modal__group__name">{ele?.title}</h2>
                          </SemanticList.Content>
                        </SemanticList.Item>
                      </>
                    ))}
                  </SemanticList>
                )}
              </div>
            </div>
          </Drawer>
          <Modal size="mini" open={errorModalOpen} onClose={resetGeoState}>
        <Modal.Content>
          <Modal.Description>
            <p>
              Location permission is denied or your browser doesnt support
              GeoLocation
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button className="location__btn" onClick={resetGeoState}>
            Okay
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Invalid Location Modal */}
      <Modal size="mini" open={successModalOpen} onClose={resetGeoState}>
        <Modal.Content>
          <Modal.Description>
            {isValidatingUrlLocation ? (
              <Dimmer active>
                <Loader size="small">Loading</Loader>
              </Dimmer>
            ) : isUrlLocationValid?.length > 0 && !isValidatingUrlLocation ? (
              <p>{formattedAddress ?? `~`}</p>
            ) : (
              <>
                <p>Your location is {formattedAddress}</p>
                <p>We don't serve in your area yet!</p>
              </>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="location__btn"
            onClick={resetGeoState}
            style={{marginBottom: '0rem'}}
          >
            {isUrlLocationValid?.length > 0 ? `Explore Services` : `Okay`}
          </Button>
        </Modal.Actions>
      </Modal>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  currentBlog: state.BlogsReducer?.currentBlog,
  isFetchingSingleBlog: state.BlogsReducer?.isFetchingSingleBlog,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleBlog: (data) => dispatch(getSingleBlog(data)),
    fetchGroupListingDetails: (data) => dispatch(getGroupRequest(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(BlogDetails)
