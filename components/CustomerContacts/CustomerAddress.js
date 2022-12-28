import Axios from 'axios';
import React, { Suspense, lazy, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import { ReactComponent as EditIcon } from '../../Assets/Images/edit.svg';
// import { ReactComponent as DeleteIcon } from '../../Assets/Images/delete.svg';

import {
  Button,
  Card,
  makeStyles,
  Typography,
  TableBody,
  TableContainer,
  Box,
  Popover,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Link as MuiLink,
  Chip,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  submitCustomerAdd,
  submitCustomerAddressEdit,
  customerAddressDeleteSubmit,
  getCustomerAddressListing,
  openCustomerAddressAddModel,
  customerAddressEditModalStartFetching,
  openCustomerAddressDeleteModel,
  closeCustomerAddressDeleteModel,
} from '../../Stores/Customers/actions';

const CustomerAddressAddModel = lazy(() => import('./CustomerAddressAddModel'));

const useStyles = makeStyles((theme) => ({
  card: {
    background: '#fff',
    boxShadow:
      '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
    borderRadius: '4px',
  },
  table: {
    minWidth: 650,
    marginBottom: 0,
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    maxHeight: '280px',
    overflowY: 'hidden',
   
  },
  noSpacing: { margin: 0, padding: '0px !important' },
  noMargin: { margin: 0 },
  mb: { marginBottom: '1rem' },
  mrAuto: { marginLeft: 'auto' },
  ml: { marginLeft: '0.5rem' },
  marginTop: { marginTop: '0.5rem' },
  deleteButton: { marginBottom: '0.5rem' },
  sectionHeading: {
    display: 'none',
    color: 'black',
    fontSize: '22px',
    fontWeight: '600',
    fontFamily: 'Montserrat, sans-serif',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tableCell: {
    fontFamily: 'Montserrat,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
  },
  tableHead: {
    background: '#fff',
  },
  AddButton: {
    minWidth: '128px',
    background: '#000',
    color: '#fff',
    boxShadow: `0 4px 6px 0 rgb(16 25 40 / 10%)`,
    textTransform: 'capitalize',
    paddingLeft: '25px',
    paddingRight: '25px',
    fontWeight: 700,
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '0px',
    fontFamily: 'Montserrat,sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '30px',
    fontSize: '14px',
    '&:hover': {
      background: '#000',
      color: '#fff',
    }
  },
  emptyText: {
    fontFamily: 'Mulish',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
  },
}));

const ActionButton = withStyles({
  root: {
    '&:hover': { background: 'transparent' },
    padding: '0px 0px',
  },
})(Button);

const CustomerAddress = ({
  customerId,
  isEditing,
  getCustomerAddressListing,
  editCustomerAddress,
  addCustomerAddress,
  customerAddress,
  isFetchingCustomerAddress,
  deleteCustomerAddress,
  openCustomerAddressAddModel,
  customerAddressEditModalStartFetching,
  currentCustomer,
  isAddressDeleting,
  openCustomerAddressDeleteModel,
  closeCustomerAddressDeleteModel,
  isAddressDeleteModalOpen,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    user
  } = useSelector((state) => state?.AuthReducer)
  const customersdata = useSelector((state) => state?.CustomerReducer)
  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteClose = () => {
    setAnchorEl(null);
  };
  const isDeleteOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const cancelTokenSource = Axios.CancelToken.source();
    getCustomerAddressListing({
      customer_id: user?.id,
      cancelToken: cancelTokenSource.token,
    });
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
        pt="1rem"
        pb="1rem"
      >
        <Typography variant="h4" className={classes.sectionHeading}>
          Addresses
        </Typography>

        <Button
          onClick={openCustomerAddressAddModel}
          endIcon={<AddIcon />}
          variant="contained"
          className={classes.AddButton}
        >
          Add Address
        </Button>
      </Box>
      <Card className={classes.card} style={{marginLeft: '1rem', marginRight: '1rem'}}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell component="th">Default</TableCell>
                <TableCell component="th"> Address 1 </TableCell>
                <TableCell component="th"> Address 2</TableCell>
                <TableCell component="th"> Address 3</TableCell>
                <TableCell component="th"> Address 4</TableCell>
                <TableCell component="th"> Address 5</TableCell>
                <TableCell component="th"> Postcode </TableCell>
                <TableCell component="th"> City </TableCell>
                <TableCell component="th"> Actions </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetchingCustomerAddress ? (
                <>
                  <TableRow>
                    <TableCell colSpan={10} scope="row" align="center">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={10} scope="row" align="center">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </>
              ) : Array.isArray(customerAddress) &&
                customerAddress.length > 0 ? (
                customerAddress.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>
                      {row.is_default ? (
                        <Chip variant="outlined" label={'Default'}></Chip>
                      ) : (
                        '~'
                      )}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.address_1 ? row.address_1 : '~'}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.address_2 ? row.address_2 : '~'}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.address_3 ? row.address_3 : '~'}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.address_4 ? row.address_4 : '~'}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.address_5 ? row.address_5 : '~'}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.postcode}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.city ? row.address_1 : '~'}
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        disableRipple
                        onClick={() =>
                          customerAddressEditModalStartFetching(row)
                        }
                      >
                        Edit
                        {/* <EditIcon /> */}
                      </ActionButton>
                      <ActionButton
                        disableRipple
                        onClick={() => openCustomerAddressDeleteModel(row)}
                      >
                        Delete
                        {/* <DeleteIcon /> */}
                      </ActionButton>
                    </TableCell>

                    <Dialog
                      onClose={closeCustomerAddressDeleteModel}
                      aria-labelledby="customized-dialog-title"
                      open={isAddressDeleteModalOpen}
                    >
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          Are you sure you want to delete the customer address?
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          autoFocus
                          onClick={closeCustomerAddressDeleteModel}
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            deleteCustomerAddress(row);
                            closeCustomerAddressDeleteModel();
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} scope="row" align="center">
                    <i className={classes.emptyText}>No Addresses found!</i>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Suspense fallback={<></>}>
        <CustomerAddressAddModel
          customerId={user.id}
          customerType={user?.customer_type}
          isEditing={isEditing}
        />
      </Suspense>
    </>
  );
};

const mapStateToProps = ({ CustomerReducer }) => ({
  customerAddress: CustomerReducer.customers_address.data,
  isAddressFetching: CustomerReducer.isAddressFetching,
  isFetchingCustomerAddress: CustomerReducer.isFetchingCustomersAddress,
  isEditing: CustomerReducer.isAddressEditing,
  deletingCustomerAddress: CustomerReducer.deletingCustomerAddress,
  currentCustomer: CustomerReducer.currentCustomer,
  isAddressDeleting: CustomerReducer.isAddressDeleting,
  isAddressDeleteModalOpen: CustomerReducer.isAddressDeleteModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  addCustomerAddress: (...args) => dispatch(submitCustomerAdd(...args)),
  editCustomerAddress: (...args) =>
    dispatch(submitCustomerAddressEdit(...args)),
  deleteCustomerAddress: (...args) =>
    dispatch(customerAddressDeleteSubmit(...args)),
  getCustomerAddressListing: (...args) =>
    dispatch(getCustomerAddressListing(...args)),
  openCustomerAddressAddModel: (...args) =>
    dispatch(openCustomerAddressAddModel(...args)),
  customerAddressEditModalStartFetching: (...args) =>
    dispatch(customerAddressEditModalStartFetching(...args)),
  openCustomerAddressDeleteModel: (...args) =>
    dispatch(openCustomerAddressDeleteModel(...args)),
  closeCustomerAddressDeleteModel: (...args) =>
    dispatch(closeCustomerAddressDeleteModel(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddress);
