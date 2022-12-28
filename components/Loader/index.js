import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Loader({ open }) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={!!open}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
}
Loader.propTypes = {
  open: PropTypes.bool,
};
