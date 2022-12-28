import Axios from 'axios';
import React, { Suspense, lazy, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

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
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  additionalGetContacts,
  additionalOpenAddContact,
  additionalOpenEditContacts,
  additionalDeleteContact,
} from './../../Stores/Customers/actions';
// import { ReactComponent as EditIcon } from './../../Assets/Images/edit.svg';
// import { ReactComponent as DeleteIcon } from './../../Assets/Images/delete.svg';

const AdditionalContactsAddModal = lazy(() =>
  import('./AdditionalContactsAddModal'),
);

const ActionButton = withStyles({
  root: {
    '&:hover': { background: 'transparent' },
    padding: '0px 0px',
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  card: {
    background: '#fff',
    boxShadow:
      '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
    borderRadius: '4px',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  table: {
    minWidth: 650,
    marginBottom: 0,
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
    fontWeight: 600,
  },
  tableCell: {
    fontFamily: 'Montserrat,sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
  },
  sectionTitle: {
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '36px',
    lineHeight: '45px',
    color: '#000000',
  },
  addButton: {
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
  title: {
    display: 'none',
    color: 'black',
    fontSize: '22px',
    fontWeight: '600',
    fontFamily: 'Montserrat, sans-serif',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tableHead: {
    background: '#fff',
  },
  emptyText: {
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
  },
}));

const AdditionalContacts = ({
  jobId,
  isEditing,
  getContacts,
  editContact,
  addContact,
  contacts,
  isFetchingContacts,
  deleteContact,
  currentCustomer,
}) => {
  const classes = useStyles();
  const {
    user
  } = useSelector((state) => state?.AuthReducer)
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    getContacts({
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
        <Typography variant="h4" className={classes.title}>
          Additional Contacts
        </Typography>
        <Button
          onClick={addContact}
          variant="contained"
          className={classes.addButton}
          endIcon={<AddIcon />}
        >
          Add Contact
        </Button>
      </Box>
      <Card className={classes.card}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell component="th">Name</TableCell>
                <TableCell component="th">Telephone no.</TableCell>
                <TableCell component="th">Mobile no.</TableCell>
                <TableCell component="th">Email</TableCell>
                <TableCell component="th">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetchingContacts ? (
                <TableRow>
                  <TableCell colSpan={6} scope="row" align="center">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ) : Array.isArray(contacts) && contacts.length > 0 ? (
                contacts.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <MuiLink
                        href={`tel:${row.telephone_no}`}
                        className={classes.tableCell}
                      >
                        {row.telephone_no}
                      </MuiLink>
                    </TableCell>
                    <TableCell>
                      <MuiLink
                        href={`tel:${row.mobile_no}`}
                        className={classes.tableCell}
                      >
                        {row.mobile_no}
                      </MuiLink>
                    </TableCell>
                    <TableCell>
                      <MuiLink
                        href={`mailto:${row.email}`}
                        className={classes.tableCell}
                      >
                        {row.email}
                      </MuiLink>
                    </TableCell>
                    <TableCell>
                      <ActionButton onClick={() => editContact(row)}>
                        Edit
                        {/* <EditIcon /> */}
                      </ActionButton>
                      <ActionButton
                        onClick={handleClickOpen}
                        className={classes.ml}
                      >
                        Delete
                        {/* <DeleteIcon /> */}
                      </ActionButton>
                    </TableCell>

                    <Dialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          Are you sure you want to delete the contact details?
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            deleteContact(row);
                            handleClose();
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
                  <TableCell colSpan={6} scope="row" align="center">
                    <i className={classes.emptyText}>No contacts found!</i>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Suspense fallback={<></>}>
        <AdditionalContactsAddModal customerId={currentCustomer?.id} />
      </Suspense>
    </>
  );
};
AdditionalContacts.propTypes = {
  jobId: PropTypes.string,
  addContact: PropTypes.func,
  getContacts: PropTypes.func,
  editContact: PropTypes.func,
  deleteContact: PropTypes.func,
  contacts: PropTypes.array,
  isFetchingContacts: PropTypes.bool,
  isEditing: PropTypes.bool,
  currentCustomer: PropTypes.any,
};
const mapStateToProps = (state) => ({
  contacts: state.CustomerReducer?.contacts?.data,
  isFetchingContacts: state.CustomerReducer?.contacts?.isFetching,
  currentCustomer: state.CustomerReducer?.currentCustomer,
});
const mapDispatchToProps = (dispatch) => ({
  getContacts: (...args) => dispatch(additionalGetContacts(...args)),
  addContact: (...args) => dispatch(additionalOpenAddContact(...args)),
  editContact: (...args) => dispatch(additionalOpenEditContacts(...args)),
  deleteContact: (...args) => dispatch(additionalDeleteContact(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalContacts);
