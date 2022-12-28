import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  saveButton: {
    backgroundColor: "#1A273A",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "45px",
    textTransform: "capitalize",
    color: "#fff",
    [theme.breakpoints.up("sm")]: {
      minWidth: "6%",
      fontSize: "8px",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "8%",
      fontSize: "14px",
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "12%",
      fontSize: "18px",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "18%",
      fontSize: "36px",
    },
  },
  cancelButton: {
    minWidth: "128px",
    color: "#101928",
    background: "#fff",
    border: "1px solid #eef0f2",
    textTransform: "none",
    boxShadow: "0 4px 6px 0 rgb(16 25 40 / 10%)",
    fontWeight: "700",
    lineHeight: "18px",
    padding: "8px 16px",
    minHeight: "44px",
    marginRight: "0.8rem",
  },
}));
export default function CancelModal({ onCloses, opens }) {
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
        variant="text"
        color="secondary"
        type="button"
        onClick={handleClickOpen}
        className={classes.cancelButton}
      >
        Cancel
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Typography gutterBottom style={{ padding: "20px" }}>
          Are you sure you want to leave, you will lose your data if you
          continue!
        </Typography>
        <DialogActions>
          <Button autoFocus onClick={onCloses} color="primary">
            Yes
          </Button>
          <Button autoFocus onClick={handleClose} color="primary" open={opens}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
CancelModal.propTypes = {
  open: PropTypes.bool,
  onCloses: PropTypes.func,
};
