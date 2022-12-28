import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  FormControl,
} from '@material-ui/core'

import React, {useEffect, useState} from 'react'
import {connect, useSelector} from 'react-redux'

import useValidator, {createFakeEvent} from '../../utils/useValidator'
import usePreventRoute from '../../utils/usePreventRoute'
import * as Yup from 'yup'
import {useHistory} from 'react-router-dom'
import useShallowEqual from '../../utils/useShallowEqual'
import {Close} from '@material-ui/icons'

import CancelModal from '../../components/CancelModal'
import CancelButton from '../../components/CancelButton'
import styled from 'styled-components'
import {useStyles} from '../Orders/OrdersApproved/styles'
import {closeCommentModal} from '../../Stores/CustomerOrderRequest/actions'
export const StyledFieldBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  color: #7e8c9a;
`
const FieldName = styled(Typography)`
  width: 50px;
  color: gray;
`
const FieldValue = styled(Typography)`
  font-size: 1.25rem;
  min-width: 80px;
  font-weight: 700;
`
const QuoteModal = ({closeCommentModal, isModalOpen, saveData, errorAlert}) => {
  const classes = useStyles()
  const onClose = closeCommentModal
  const history = useHistory()
  const token = useSelector((state) => state.AuthReducer?.token)
  const [shallowEqual] = useShallowEqual()

  const [initialValuesState, setInitialValuesState] = useState({
    comment: '',
  })

  const [Prompt, setFormFilled, setSubmit] = usePreventRoute()

  const {
    getFieldProps,
    errors,
    values,
    setValues,
    handleSubmit,
    touched,
    handleBlur,
    handleChange,
    clearFormState,
  } = useValidator({
    initialValues: {
      comment: '',
    },
    onSubmit,
    validationSchema: Yup.object({
      comment: Yup.string().required('Comment is Required!'),
    }),
  })

  function onSubmit(values) {
    saveData(values)
  }

  return (
    <Dialog maxWidth="lg" open={isModalOpen} onClose={closeCommentModal}>
      <>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Typography
              className={classes.sectionHeader}
              style={{marginTop: '1rem'}}
            >
              Add Comment of request for changes
            </Typography>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Card elevation={0} style={{width: '100%'}}>
                <Box
                  width="100%"
                  style={{marginRight: '1rem', display: 'block'}}
                >
                  <FormControl
                    style={{width: '100%'}}
                    error={!!(touched.description && errors.description)}
                  >
                    <TextField
                      multiline={true}
                      rows={5}
                      variant="outlined"
                      type="text"
                      size="small"
                      onBlur={handleBlur}
                      value={values?.comment}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          comment: e.target.value,
                        })
                        setFormFilled()
                      }}
                      helperText={touched.comment && errors.comment}
                      className={`${classes.fullWidth} ${classes.minWidthInput} ${classes.inputSpacing}`}
                      error={!!(touched.comment && errors.comment)}
                    />
                  </FormControl>
                </Box>
              </Card>
            </Box>
          </form>
        </DialogContent>

        <Box
          className={classes.ButtonSection}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Box style={{marginRight: '1rem'}}>
            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => setSubmit()}
                className={classes.SaveButton}
              >
                save
              </Button>
            </form>
          </Box>
        </Box>
      </>
      {Prompt}
    </Dialog>
  )
}

const mapStateToProps = (state) => ({})

function mapDispatchToProps(dispatch) {
  return {
    //   closeCommentModal: (data) => dispatch(closeCommentModal(data)),
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default connect(mapStateToProps, mapDispatchToProps)(QuoteModal)
