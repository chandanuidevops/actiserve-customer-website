import React, {useEffect, useState} from 'react'
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  CssBaseline,
  TextField,
  Grid,
  Container,
  InputAdornment,
  Paper,
  InputLabel,
  FormHelperText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core'
import {Button} from 'semantic-ui-react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {connect} from 'react-redux'
import {compose} from 'redux'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {useHistory} from 'react-router-dom'
import Router, {useRouter} from 'next/router'

import {Loader} from 'semantic-ui-react'
import Alerts from '../../components/Alerts'
import {errorAlert} from '../../Stores/Alerts/actions'
import {useStyles} from './styles'
import useValidator from '../../utils/useValidator'
import {
  addAreacode,
  getPostCode,
  fetchPostCode,
  updateAreacode,
  disableAdding,
} from '../../Stores/Traders/actions'
import {Autocomplete} from '@material-ui/lab'
import * as Yup from 'yup'
import styled from 'styled-components'
import SiteFooter from '../../components/SiteFooter'
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

function Address({
  onNext,
  addAreacode,
  isAddingAreacode,
  areacodes,
  getPostCode,
  postcode,
  isFetchingPostcode,
  errorAlert,
  postCodesAction,
  isFetchingPostcodeData,
  postcodeData,
  updateAreacode,
  changeStep,
  disableAdding,
  isAddingPostcodeSuccess,
  isAddingSuccess,
}) {
  const router = useRouter()
  const id = router?.query?.traderId
  const classes = useStyles()

  const [loader, setLoader] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState([])
  const [selectedArea, setSelectedArea] = useState([])
  const [checkStep, setCheckStep] = useState(false)
  const [othersAutoComplete, setOthersAutoComplete] = useState([])
  const [changingRoute, setChangingRoute] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const {
    getFieldProps,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    clearFormState,
  } = useValidator({
    initialValues: {
      trader_id: id,
      postcodes: [],
      others: [],
    },
    onSubmit,
    validationSchema: Yup.object({
      postcodes: Yup.array().of(
        Yup.object().shape({
          postcode: Yup.string().required('Atleast one area code is required'),
        }),
      ),
    }),
  })

  useEffect(() => {
    let timer1 = setTimeout(() => setLoader(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  function onSubmit(val) {
    setIsConfirmModalOpen(false)
    if (postcodeData.length > 0) {
      setEnabled(false)
      setChangingRoute(true)
      if (
        postcodeData[0].trader_available_postcode.length > 0 ||
        postcodeData[1].trader_other_postcode.length > 0
      ) {
        updateAreacode(values)
      } else {
        addAreacode(values)
      }
    } else {
      addAreacode(values)
    }
  
  }
  useEffect(() => {
    if(enabled){
      window.addEventListener("beforeunload", (ev) => 
      {  
          ev.preventDefault();
          return ev.returnValue = 'Are you sure you want to close?';
      });
    }else{
      window.removeEventListener("beforeunload", onSubmit,true);
    }


   
  }, [enabled])
  useEffect(() => {
    postCodesAction(values.trader_id)
    getPostCode(values.trader_id)
  }, [])
  useEffect(() => {
    if (isAddingPostcodeSuccess) {
      Router.push(`/trader-signup/${values?.trader_id}/business-information`)
    }
  }, [isAddingPostcodeSuccess])

  const handleSelectGroup = (catId, groupId) => {
    let groups = JSON.parse(JSON.stringify(selectedGroup))
    let selectArea = JSON.parse(JSON.stringify(selectedArea))
    let selectOthers = JSON.parse(JSON.stringify(othersAutoComplete))
    let postcodes = JSON.parse(JSON.stringify(postcode))
    let data = {
      catId: catId,
      groupId: groupId,
    }

    let filteredGroup = selectedGroup.filter(
      (e, index) => e?.catId == catId && e?.groupId == groupId,
    )

    if (filteredGroup.length == 0) {
      //group selection
      groups.push(data)
      //
      // area code selection

      postcodes.map((group, i) => {
        if (group.type_of_category.id == catId) {
          group.postcode.map((postgroup, j) => {
            if (postgroup.id == groupId) {
              postgroup.area.map((area, k) => {
                let areCode = {
                  id: area.area_code.id,
                  area_code: area.area_code.area_code,
                  group_id: groupId,
                  type_of_category_id: catId,
                }
                selectArea.push(areCode)
              })
            }
          })
        }
      })
    } else {
      //remove group selection
      let index = groups.findIndex(
        (e) => e.catId === catId && e.groupId === groupId,
      )
      groups.splice(index, 1)

      // remove multiple area code selection
      selectArea = selectArea.filter(
        (e, index) =>
          e?.type_of_category_id !== catId || e?.group_id !== groupId,
      )
      // remove others area code
      selectOthers = selectOthers.filter(
        (e, index) =>
          e?.type_of_category_id !== catId || e?.group_id !== groupId,
      )
      setOthersAutoComplete(selectOthers)
    }

    setSelectedArea(selectArea)
    setSelectedGroup(groups)
  }

  function findSelected(catId, groupId) {
    //add background color for selected group
    let selected = JSON.parse(JSON.stringify(selectedGroup))
    let filteredGroup = selected.filter(
      (ele, index) => ele?.catId == catId && ele?.groupId == groupId,
    )
    return filteredGroup.length > 0 ? true : false
  }

  const handleChangeCheck = (catId, groupId, areaId, areaCode) => {
    let selected = JSON.parse(JSON.stringify(selectedArea))
    //check area code selected
    let check = selected.some(
      (e) =>
        e.id == areaId &&
        e.group_id == groupId &&
        e.type_of_category_id == catId,
    )
    //index of area code selected
    let index = selected.findIndex(
      (e) =>
        e.id == areaId &&
        e.group_id == groupId &&
        e.type_of_category_id == catId,
    )
    if (check) {
      // remove  area code selection
      selected.splice(index, 1)
    } else {
      // add  area code selection
      let areCode = {
        id: areaId,
        area_code: areaCode,
        group_id: groupId,
        type_of_category_id: catId,
      }
      selected.push(areCode)
    }
    setSelectedArea(selected)
  }

  const handleChangeOthers = (event, value, catId, groupId, allArea) => {
    let selectedOthers = JSON.parse(JSON.stringify(othersAutoComplete))
    if (event.target.value !== undefined && event.target.value !== 0) {
      // add others field
      let areaCode = {
        area_code: event.target.value.toUpperCase(),
        type_of_category_id: catId,
        group_id: groupId,
      }
      if (validateAreaCode(event.target.value, allArea)) {
        selectedOthers.push(areaCode)
        setOthersAutoComplete(selectedOthers)
      }
    }
    if (value?.length == 0) {
      selectedOthers = selectedOthers.filter(
        (e, index) =>
          e?.type_of_category_id !== catId || e?.group_id !== groupId,
      )
      setOthersAutoComplete(selectedOthers)
    }
  }

  useEffect(() => {
    let selectArea = JSON.parse(JSON.stringify(selectedArea))
    let selectOthers = JSON.parse(JSON.stringify(othersAutoComplete))

    selectArea = selectArea.map((item) => {
      return {
        postcode: item.area_code,
        group_id: item.group_id,
        type_of_category_id: item.type_of_category_id,
      }
    })

    //sort by group id
    selectOthers.sort((a, b) =>
      a.type_of_category_id > b.type_of_category_id
        ? 1
        : b.type_of_category_id > a.type_of_category_id
        ? -1
        : 0,
    )

    let other = []

    let other_postcode = []
    selectOthers.forEach((ele, i) => {
      let check = false

      if (
        other.find(
          (post) =>
            post.type_of_category_id == ele.type_of_category_id &&
            post.group_id == ele.group_id,
        )?.group_id !== undefined
      ) {
        other.map((element) => {
          if (
            element.type_of_category_id == ele.type_of_category_id &&
            element.group_id == ele.group_id
          ) {
            let partial = element.other_postcode
            partial.push(ele.area_code)

            return {
              group_id: element.group_id,
              other_postcode: partial,
              type_of_category_id: element.type_of_category_id,
            }
          } else {
            return element
          }
        })

        check = true
      } else {
        other_postcode = []
      }

      if (!check) {
        other_postcode.push(ele.area_code)

        let obj = {
          group_id: ele.group_id,
          other_postcode: other_postcode,
          type_of_category_id: ele.type_of_category_id,
        }

        other.push(obj)
      }
    })

    setValues({
      ...values,
      postcodes: selectArea,
      others: other,
    })
  }, [selectedGroup, selectedArea, othersAutoComplete,postcodeData])

  // Redirect to 4th step is process is completed
  useEffect(() => {
    if (
      postcodeData[2]?.trader_profile?.profile_step == 4 &&
      values?.trader_id
    ) {
      Router.push(`/trader-signup/${values?.trader_id}/business-information`)
    }
  }, [postcodeData])

  //area code validation
  const validateAreaCode = (area, allArea) => {
    const regex = new RegExp(/^[A-Za-z]{2}[0-9]{1,3}$/)
    if (regex.test(area)) {
      //check area code exist

      const check = allArea.some(
        (e) => e.area_code.area_code.toUpperCase() === area.toUpperCase(),
      )
      if (check) {
        errorAlert('This area code already exist in above Postcode Group')
        return false
      }

      return true
    } else {
      errorAlert('Invalid area code')
      return false
    }
  }
  const handleDelete = (option) => {
    let selectOthers = JSON.parse(JSON.stringify(othersAutoComplete))
    selectOthers = selectOthers.filter(
      (e, index) =>
        e?.type_of_category_id !== option.type_of_category_id ||
        e?.group_id !== option.group_id ||
        e?.area_code !== option.area_code,
    )
    setOthersAutoComplete(selectOthers)
  }
  // set update data

  useEffect(() => {
    if (postcodeData.length > 0) {
      if (postcodeData[2].trader_profile?.is_active) {
        Router.push(`/login`)
      }
      if (postcodeData[2].trader_profile?.profile_step >= 2) {
        setCheckStep(true)
      } else {
        Router.push(`/trader-signup/${id}/personal-information`)
      }
      let objGroup = {}
      let addedGroups = []
      //conditions for added  others postcodes
      if (postcodeData[1].trader_other_postcode.length > 0) {
        let selectOthers = JSON.parse(
          JSON.stringify(postcodeData[1].trader_other_postcode),
        )
        let addedOthers = []

        selectOthers.forEach((ele) => {
          //set added others postcodes
          ele.other_postcode.forEach((e) => {
            const obj = {
              type_of_category_id: ele.type_of_category_id,
              group_id: ele.group_id,
              area_code: e,
            }
            addedOthers.push(obj)
          })
          //set added postcode groups
          objGroup = {
            catId: ele.type_of_category_id,
            groupId: ele.group_id,
          }

          addedGroups.push(objGroup)
        })

        setOthersAutoComplete(addedOthers)
      }

      //conditions for added postcodes
      if (postcodeData[0].trader_available_postcode.length > 0) {
        const selectArea = JSON.parse(
          JSON.stringify(postcodeData[0].trader_available_postcode),
        )
        const post_code = JSON.parse(JSON.stringify(postcode))
        let area = []

        let arr = selectArea.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.group_id === value.group_id &&
                t.type_of_category_id === value.type_of_category_id,
            ),
        )
        arr.forEach((ele) => {
          const checkGroup = addedGroups.some(
            (e) =>
              ele?.group_id == e?.groupId &&
              ele?.type_of_category_id == e?.catId,
          )
          if (!checkGroup) {
            //set added postcode groups
            objGroup = {
              catId: ele.type_of_category_id,
              groupId: ele.group_id,
            }

            addedGroups.push(objGroup)
          }
        })

        selectArea.forEach((ele) => {
          //find poscode uuid
          let filterArea = []
          post_code.forEach((e) => {
            if (e.type_of_category.id == ele.type_of_category_id) {
              const filteredGroup = e.postcode.filter(
                (element) => element.id == ele.group_id,
              )

              filterArea = filteredGroup[0].area.filter(
                (item) => item.area_code.area_code == ele.postcode,
              )
            }
          })
          //create new array of objects for added postcodes
          if (filterArea.length > 0) {
            const obj = {
              type_of_category_id: ele.type_of_category_id,
              group_id: ele.group_id,
              area_code: ele.postcode,
              id: filterArea[0]?.area_code.id,
            }
            area.push(obj)
          }
        })
        setSelectedArea(area)
      }
      setSelectedGroup(addedGroups)
    }
    setChangingRoute(false)
  }, [postcode,postcodeData])

  const goBack = () => {
    disableAdding(false)
    Router.push(`/trader-signup/${id}/personal-information`)
  }




  return (
    <>
      {loader ||
      isFetchingPostcode ||
      changingRoute ||
      isAddingAreacode ||
      isFetchingPostcodeData ? (
        <div className={classes.content}>
          <Loader
            active
            inline="centered"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      ) : (
        <>
          <Alerts />
          <section className={ ` ${classes.container} ${classes.formMinHeight}`  }     >
            <div className={classes.postcodeContainer}>
              <form
              // onSubmit={handleSubmit}
              >
                <div
                  className={`${classes.cardWrap} ${classes.cardWrapSm}`}
                  style={{display: 'block'}}
                >
                  <div className={classes.cardItem}>
                    <h4 className={'page_heading'}>Postcode</h4>
                    <div className={classes.root}>
                      {postcode?.length > 0 &&
                        postcode?.map((ele, i) => (
                          <Accordion
                            key={i}
                            elevation={0}
                            classes={{
                              root: classes.MuiAccordionroot,
                            }}
                          >
                            <AccordionSummary expandIcon={<AccordIcon />}>
                              <Typography className={classes.heading}>
                                {ele?.type_of_category?.name
                                  ?.split('is_')
                                  .join('')
                                  .split('_')
                                  .join(' ')}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              classes={{
                                root: classes.MuiAccordionroot,
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
                              {ele?.postcode?.map((post, j) => (
                                <div className="site__trader__postcode__group">
                                  <div
                                    key={j}
                                    type="button"
                                    onClick={() => {
                                      handleSelectGroup(
                                        ele?.type_of_category?.id,
                                        post.id,
                                      )
                                    }}
                                    className={
                                      findSelected(
                                        ele?.type_of_category?.id,
                                        post.id,
                                      ) == true
                                        ? 'us__chip__btn__active'
                                        : 'us__chip__btn__disabled'
                                    }
                                    variant="contained"
                                  >
                                    <p className="us__chip__text">
                                      {post.title}
                                    </p>
                                    <p>
                                      {findSelected(
                                        ele?.type_of_category?.id,
                                        post.id,
                                      ) == true
                                        ? 'Remove'
                                        : 'Select'}
                                    </p>
                                  </div>
                                  {findSelected(
                                    ele?.type_of_category?.id,
                                    post.id,
                                  ) == true && (
                                    <div className="site__trader__postcode__timeline"></div>
                                  )}
                                  {selectedGroup.filter(
                                    (elem, index) =>
                                      elem?.catId ==
                                        ele?.type_of_category?.id &&
                                      elem?.groupId == post.id,
                                  ).length > 0 && (
                                    <Grid container spacing={0}>
                                      {post?.area?.length > 0 &&
                                        post?.area?.map((area, index) => (
                                          <Grid
                                            item
                                            sm={4}
                                            md={3}
                                            className={
                                              classes.postcodeCheckGrid
                                            }
                                          >
                                            <div style={{padding: '0px 4px'}}>
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    checked={selectedArea.some(
                                                      (e) =>
                                                        e.id ==
                                                          area?.area_code?.id &&
                                                        e.group_id == post.id &&
                                                        e.type_of_category_id ==
                                                          ele.type_of_category
                                                            .id,
                                                    )}
                                                    onChange={() =>
                                                      handleChangeCheck(
                                                        ele.type_of_category.id,
                                                        post.id,
                                                        area?.area_code?.id,
                                                        area?.area_code
                                                          ?.area_code,
                                                      )
                                                    }
                                                  />
                                                }
                                                label={
                                                  area?.area_code?.area_code
                                                }
                                                style={{
                                                  fontFamily:
                                                    'Urbanist__semibold',
                                                  fontSize: '12px',
                                                }}
                                              />
                                            </div>
                                          </Grid>
                                        ))}

                                      <Grid item sm={12}>
                                        <div className="site__trader__postcode__timeline"></div>
                                        <p className={classes.heading3}>
                                          Please input any Area Code you cover
                                          other than mentioned above
                                        </p>
                                        <Autocomplete
                                          multiple
                                          options={othersAutoComplete.filter(
                                            (elem) =>
                                              elem?.type_of_category_id ==
                                                ele?.type_of_category?.id &&
                                              elem?.group_id == post.id,
                                          )}
                                          freeSolo
                                          style={{marginBottom: '10px'}}
                                          renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                              <Chip
                                                deleteIcon={
                                                  <HighlightOffIcon
                                                    onMouseDown={() => {
                                                      handleDelete(option)
                                                    }}
                                                  />
                                                }
                                                onDelete={handleDelete}
                                                variant="outlined"
                                                label={option.area_code}
                                              />
                                            ))
                                          }
                                          value={othersAutoComplete.filter(
                                            (elem) =>
                                              elem?.type_of_category_id ==
                                                ele?.type_of_category?.id &&
                                              elem?.group_id == post.id,
                                          )}
                                          getOptionLabel={(option) =>
                                            option.area_code
                                          }
                                          onChange={(event, newValue) => {
                                            handleChange('others')({
                                              target: {
                                                value:
                                                  newValue.length == 0
                                                    ? ''
                                                    : newValue?.map((x) => x),
                                              },
                                              persist: () => {},
                                            })

                                            handleChangeOthers(
                                              event,
                                              newValue,
                                              ele?.type_of_category?.id,
                                              post.id,
                                              post?.area,
                                            )
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              size="small"
                                              variant="outlined"
                                            />
                                          )}
                                        />
                                      </Grid>
                                    </Grid>
                                  )}
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </div>
                  </div>

                  <div className={classes.bntFullContainer}>
                  <Button
                      style={{marginRight: '10px'}}
                      type="button"
                      className={`us_btn`}
                      onClick={() => {
                        goBack()
                      }}
                    >
                      <img
                        style={{marginLeft: '0px', marginRight: '7px'}}
                        className={classes.btnimg}
                        src={
                          '/site__main__images/site__chevron__left__light.png'
                        }
                      />
                      Back
                    </Button>
                    <Button
                      fluid
                      className={`us_btn`}
                      type="button"
                      onClick={() => {
                        setIsConfirmModalOpen(true)
                      }}
                    >
                      Next
                      <img
                        className={classes.btnimg}
                        src={
                          '/site__main__images/site__chevron__right__light.png'
                        }
                      />
                    </Button>
                  
                  </div>
                </div>

                <Dialog
                  onClose={() => setIsConfirmModalOpen(false)}
                  aria-labelledby="customized-dialog-title"
                  open={isConfirmModalOpen}
                  fullWidth={'sm'}
                  maxWidth={'sm'}
                >
                  <DialogTitle>
                    {/* <p className={classes.modalTitle}>{productDetails?.title}</p> */}
                  </DialogTitle>
                  <DialogContent>
                    <p className={classes.modalinfo}>
                      Do you confirm to have provided the postcode cover for all
                      the services and continue Next?
                    </p>
                  </DialogContent>
                  <DialogActions>
                    <form onSubmit={handleSubmit}>
                      <Button
                        fluid
                        className={`us_btn`}
                        style={{ marginRight: '20px'}}
                        type="submit"
                      >
                        Yes
                      </Button>
                    </form>
                    <Button
                      fluid
                      className={`us_btn_disabled`}
                      type="button"
                      style={{maxWidth: '60px'}}
                      onClick={() => setIsConfirmModalOpen(false)}
                    >
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            </div>
          </section>
          <div className="site__footer"      >
            <SiteFooter />
          </div>
        </>
      )}
    </>
  )
}



const mapStateToProps = (state) => ({
  isAddingAreacode: state.TraderReducer?.isAddingAreacode,
  areacodes: state.TraderReducer?.areacodes,
  isFetchingPostcode: state.TraderReducer?.isFetchingPostcode,
  postcode: state.TraderReducer?.postcode,
  isFetchingPostcodeData: state.TraderReducer?.isFetchingPostcodeData,
  postcodeData: state.TraderReducer?.postcodeData,
  isAddingPostcodeSuccess: state.TraderReducer?.isAddingPostcodeSuccess,
  isAddingSuccess: state.TraderReducer?.isAddingSuccess,
})
function mapDispatchToProps(dispatch) {
  return {
    addAreacode: (data) => dispatch(addAreacode(data)),
    updateAreacode: (data) => dispatch(updateAreacode(data)),
    getPostCode: (data) => dispatch(getPostCode(data)),
    errorAlert: (data) => dispatch(errorAlert(data)),
    postCodesAction: (data) => dispatch(fetchPostCode(data)),
    disableAdding: (data) => dispatch(disableAdding(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Address)
