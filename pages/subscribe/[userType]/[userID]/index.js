import React, {useEffect, useState} from 'react'
import SiteNav from '../../../../components/SiteMain/SiteMainNavbar'
import SiteFooter from '../../../../components/SiteFooter'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {
  checkSubscription,
  subscribeUser,
} from '../../../../Stores/Subscribe/actions'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider
} from '@material-ui/core'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'
import {Loader} from 'semantic-ui-react'
import useValidator from '../../../../utils/useValidator'
import * as Yup from 'yup'
const Subscribe = ({
  subscribeUser,
  checkSubscription,
  isCheckingSubscription,
  subscribeData,
  isSubscribing,
}) => {
  const router = useRouter()

  const dispatch = useDispatch()

  const {userType, userID} = router?.query
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const [userData, setUserData] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [showOther, setShowOther] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
      unsubscribe_reason: '',
    },
    onSubmit,
    validationSchema: {}
  })

  useEffect(() => {
    if (userID && userType) {
      setUserData(true)
    }
  }, [userID, userType])

  useEffect(() => {
    if (userData == true) {
      let payload = {
        type: userType,
        id: userID,
      }
      dispatch(checkSubscription(payload))
    }
  }, [userData])

  console.log('subscribeData>', subscribeData)

  const submitData = (e) => {
    if (e) {
      let formData = {
        id: userID,
        type: userType,
        is_mail_subscribe: e,
      }
      subscribeUser(formData)
    } else {
      setOpen(true)
    }
  }

  function onSubmit(val) {
    let formData = {
      id: userID,
      type: userType,
      is_mail_subscribe: false,
      unsubscribe_reason: values.unsubscribe_reason,
    }
    subscribeUser(formData)
    clearFormState()
    setOpen(false)
  }
  useEffect(() => {
    setValues({
      unsubscribe_reason: '',
    })
  }, [subscribeData])
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
    if(event.target.value=='other'){
      setShowOther(true)
    }else{
      setShowOther(false)
      setValues({unsubscribe_reason:''})
    }
    
  }

  return (
    <>
      <SiteNav />
      {isSubscribing || isCheckingSubscription ? (
        <Loader
          active
          inline="centered"
          style={{
            minHeight: '300px',
          }}
        />
      ) : (
        <section
          className="site__subscribe__wrapper"
          style={{
            minHeight: '300px',
          }}
        >
          <div className="site__subscribe__container site_sm_container">
            <div className="site__subscribe__header">
              <h1 className="subscribe__header">
                We are happy to Welcome you and broadcast our newsletters &
                communication mails.
              </h1>
            </div>
            <div>
              {subscribeData?.is_mail_subscribe ? (
                <div className="subscribe__content">
                  <h2 className="subscribe__header">
                    You have  subscribed.
                  </h2>
                  <p className="subscribe__subheader">Welcome to UrbanServe!</p>
                  <Button style={{margin:'auto'}}
                    onClick={() => submitData(false)}
                    fluid
                    className="us_btn"
                    type="button"
                  >
                    Unsubscribe
                  </Button>

                  {/* <Button onClick={() => submitData(false)}>Unsubscribe</Button> */}
                </div>
              ) : (
                <div className="subscribe__content">
                  <h2 className="subscribe__header">
                    Please click on below link to add your email to our
                    Subcriber list!
                  </h2>
                  <p className="subscribe__subheader">Welcome to UrbanServe!</p>
                  <Button style={{margin:'auto'}}
                    onClick={() => submitData(true)}
                    fluid
                    className="us_btn"
                    type="button"
                  >
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Dialog
        open={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
        We regret to see you going, be kind to hlep us know the reason
        </DialogTitle>
        <Divider light />
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <FormControl component="fieldset">
              
              <RadioGroup
                value={values.unsubscribe_reason}
                onChange={handleRadioChange}
                name="unsubscribe_reason"
              >
                <FormControlLabel
                checked={selectedValue =='does these mails are quite frequent'}
                  value="does these mails are quite frequent" 
                  control={<Radio />}
                  label="does these mails are quite frequent"
                />
                <FormControlLabel
                 checked={selectedValue =='does these mails have irrelevant content'}
                  value="does these mails have irrelevant content"
                  control={<Radio />}
                  label="does these mails have irrelevant content"
                />
                <FormControlLabel
                 checked={selectedValue =='other'}
                  value="other"
                  control={<Radio />}
                  label="any other reason?"
                />
         
              </RadioGroup>
            </FormControl>
              {
                showOther &&(
                  <TextField
                  margin="dense"
                  id="name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  multiline={true}
                  rows={5}
                  inputProps={{
                    ...getFieldProps('unsubscribe_reason'),
                  }}
                  helperText={
                    touched.unsubscribe_reason && errors.unsubscribe_reason
                  }
                  error={
                    !!(touched.unsubscribe_reason && errors.unsubscribe_reason)
                  }
                />
                )
              }

          </DialogContent>
          <Divider light />
          <DialogActions>
            <Button
              onClick={handleClose}
              fluid
              className="us_btn_disabled"
              type="button"
              style={{marginRight: '20px'}}
            >
              Cancel
            </Button>

            <Button fluid className="us_btn" type="submit">
              Unsubscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <SiteFooter />
    </>
  )
}

const mapStateToProps = ({SubscribeReducer}) => ({
  isCheckingSubscription: SubscribeReducer.isCheckingSubscription,
  subscribeData: SubscribeReducer.subscribeData,
  isSubscribing: SubscribeReducer.isSubscribing,
})
function mapDispatchToProps(dispatch) {
  return {
    checkSubscription: (...args) => dispatch(checkSubscription(...args)),
    subscribeUser: (...args) => dispatch(subscribeUser(...args)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Subscribe)
