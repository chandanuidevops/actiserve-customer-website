import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    minWidth: '128px',
    color: '#101928',
    background: '#fff',
    border: '1px solid #eef0f2',
    textTransform: 'none',
    boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
    fontWeight: '700',
    lineHeight: '18px',
    padding: '8px 16px',
    minHeight: '44px',
    marginRight: '0.8rem',
  },
  textStyle: {
    fontFamily: 'Mulish',
    fontWeight: '500',
  },
  SaveButton: {
    minWidth: '128px',
    color: '#fff',
    background: '#101928',
    border: '1px solid #eef0f2',
    textTransform: 'none',
    boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
    fontWeight: '700',
    lineHeight: '18px',
    padding: '8px 16px',
    minHeight: '44px',
    '&:hover': {
      background: '#101928',
      color: '#fff',
    },
  },
}));
export default function ConfirmAleartModal({
  onConfirm,
  opens,
  closeIconOpen,
  title = '',
  btnName = '',
  styleClass,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant={props.btnVarient}
        color={props.btnColor}
        className={styleClass}
        onClick={handleClickOpen}
      >
        {props.btnTitle}
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open || closeIconOpen}
      >
        <Typography
          className={classes.textStyle}
          gutterBottom
          style={{ padding: '20px' }}
        >
          {title}
        </Typography>
        <DialogActions>
          <Button
            autoFocus
            onClick={(...data) => {
              onConfirm(...data);
              handleClose();
            }}
            color="primary"
            className={classes.SaveButton}
          >
            Yes
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            open={opens}
            className={classes.cancelButton}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
ConfirmAleartModal.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
};
