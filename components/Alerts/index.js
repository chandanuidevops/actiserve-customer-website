/**
 *
 * Alerts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import SuccessSnackbar from './SuccessSnackBar';
import ErrorSnackBar from './ErrorSnackBar';
import WarningSnackbar from './WarningSnackBar';

export function Alerts({ children }) {
  return (
    <>
      <SuccessSnackbar />
      <ErrorSnackBar />
      <WarningSnackbar />
      {children}
    </>
  );
}

Alerts.propTypes = {
  children: PropTypes.node,
};

export default Alerts;
