import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import { GrClose } from 'react-icons/gr';
import { removeAlert } from '../../Stores/Alerts/actions';

export default function WarningSnackbar() {
  const dispatch = useDispatch();
  const { warningSnackBarMessage, warningSnackBarOpen } = useSelector(
    (state) => state.AlertReducer,
  );
  useEffect(() => {
    if (warningSnackBarOpen)
      setTimeout(() => dispatch(removeAlert('warning')), 6000);
  }, [warningSnackBarOpen]);

  function handleClose() {
    dispatch(removeAlert('warning'));
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={warningSnackBarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      aria-describedby="client-warning-snackbar"
    >
      <Alert onClose={handleClose} severity="warning">
        {warningSnackBarMessage}
      </Alert>
    </Snackbar>
  );
}
