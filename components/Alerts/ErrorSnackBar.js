import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { removeAlert } from '../../Stores/Alerts/actions';

export default function ErrorSnackbar() {
  const dispatch = useDispatch();
  const { errorSnackBarMessage, errorSnackBarOpen } = useSelector(
    (state) => state.AlertReducer,
  );
  function handleClose() {
    dispatch(removeAlert('error'));
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={errorSnackBarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      aria-describedby="client-error-snackbar"
    >
      <Alert onClose={handleClose} severity="error">
        {errorSnackBarMessage}
      </Alert>
    </Snackbar>
  );
}
