import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogContent,
  makeStyles,
  Button,
  DialogTitle,
  Dialog,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  FormHelperText,
  Drawer,
  TableCell,
  InputAdornment,
  TableRow,
  CircularProgress,
  Input,
  IconButton,
  Card,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect, useSelector } from 'react-redux';
import {
  additionalAddContact,
  additionalCloseAddContact,
  additionalCloseEditContact,
  additionalEditContact,
} from './../../Stores/Customers/actions';
import { errorAlert, successAlert } from '../../Stores/Alerts/actions';
import useValidator from './../../utils/useValidator';
import * as Yup from 'yup';
import CancelModal from '../CancelModal';
import { Close } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  cardContent: {
    width: '100%',
    padding: '0px !important',
  },
  inputSpacing: {
    width: '100%',
    marginTop: '0.5rem',
    '&:first-child': { marginTop: '0px' },
  },
  ml: { marginLeft: '0.5rem' },

  textCapitalize: {
    textTransform: 'capitalize',
  },
  optionDetail: {
    fontSize: '0.75rem',
    color: 'gray',
    textOverflow: 'ellipsis',
  },
  loaderContainer: {
    width: '100%',
    margin: '20 0',
  },
  drawerPaper: {
    // maxWidth: theme.breakpoints.values.sm * 0.75,
    width: '100%',
    height: '100vh',
  },
  drawerHeader: {
    ...theme.typography.heading,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  formControl: { width: '100%', marginBottom: '0.75rem' },
  content: { minWidth: '360px' },
  FilterTitle: {
    margin: '0 auto',
    paddingTop: '1rem',
    paddingBottom: '10px',
    color: 'black',
    fontSize: '24px',
    borderBottom: '1px solid lightgray',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
  },
  CloseIcon: {
    position: 'absolute',
    right: '-10px',
  },
  CloseIconSize: {
    fontSize: '35px',
    fill: '#000000',
  },
  filterName: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '23px',
    color: '#666666',
  },
  saveButton: {
    minWidth: '128px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '17px',
    color: '#fff',
    background: '#101928',
    border: '1px solid #eef0f2',
    textTransform: 'none',
    boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
    fontWeight: '700',
    lineHeight: '18px',
    padding: '8px 16px',
    minHeight: '44px',
  },
  ButtonSection: {
    padding: '1rem 0rem',
    color: 'black',
    fontSize: '18px',
    borderTop: '1px solid lightgray',
    width: '100%',
    textAlign: 'center',
  },
}));

const AdditionalContactsAddModal = ({
  isAddModalOpen,
  isEditModalOpen,
  isEditing,
  successAlert,
  errorAlert,
  editContact,
  addContact,
  closeEditModal,
  closeAddModal,
  currentContact,
  currentCustomer,
  customerId,
}) => {
  const onClose = isEditing ? closeEditModal : closeAddModal;
  const open = isAddModalOpen || isEditModalOpen;
  const {
    user
  } = useSelector((state) => state?.AuthReducer)
  const [opendrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();

  const {
    values,
    setValues,
    getFieldProps,
    touched,
    handleBlur,
    errors,
    handleSubmit,
  } = useValidator({
    initialValues: {
      type: user?.type,
      name: '',
      email: '',
      mobile_no: '',
      telephone_no: '',
      customer_id: user?.id,
    },
    validationSchema: Yup.object({
      customer_id: Yup.string(),
      // type: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      mobile_no: Yup.string()
        .test(
          `Mobile Number format`,
          `Invalid Mobile Number format!`,
          function (value) {
            const mobileRegex = /^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)?\d{4}(\s)?\d{6}$/;
            return (
              typeof value === 'string' &&
              mobileRegex.test(value.replace(/\s/g, ''))
            );
          },
        )
        .required('Mobile Number is Required'),
      telephone_no: Yup.string()
        .matches(/^[0-9]*$/, 'It should be numeric only')
        .nullable(),
    }),
    onSubmit: isEditing
      ? (values) => editContact(values)
      : (values) => addContact(values),
  });

  useEffect(() => {
    if (isEditing) setValues({ ...currentContact, customer_id: customerId });
  }, [isEditing, currentContact]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="contact-add-modal"
      aria-describedby="Contact add modal"
    >
      {/* <Typography variant="h4" style={{ fontWeight: 700, margin: '20px' }}>
        {isEditing ? 'Edit ' : 'Add'} Contact
      </Typography> */}

      <DialogContent className={classes.cardContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 className={classes.FilterTitle}>Add Contact</h3>
          <IconButton
            onClick={() => onClose()}
            style={{ marginRight: '1rem' }}
            className={classes.CloseIcon}
          >
            <Close className={classes.CloseIconSize} />
          </IconButton>
        </div>
        <Box
          width="100%"
          style={{ padding: '2rem' }}
          display="flex"
          justifyContent="center"
        >
          <Card style={{ width: '40%' }}>
            <form onSubmit={handleSubmit}>
              {/* <FormControl
            className={classes.formControl}
            error={!!(touched.type && errors.type)}
          >
            <InputLabel id="type_label">Contact type</InputLabel>
            <Select
              {...getFieldProps('type')}
              error={!!(touched.type && errors.type)}
              labelId="type_label"
              label="Contact type"
              id="type"
              name="type"
              placeholder="Contact Type"
            >
              {['landlord', 'letting agent', 'tenant'].map((type) => (
                <MenuItem
                  value={type}
                  key={type}
                  style={{ textTransform: 'capitalize' }}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
            {touched.type && errors.type ? (
              <FormHelperText error={!!(touched.type && errors.type)}>
                Contact type should be selected!
              </FormHelperText>
            ) : (
              ''
            )}
          </FormControl> */}
              <Box style={{ padding: '2rem' }}>
                <span className={classes.filterName}>Name*</span>
                <FormControl
                  className={classes.formControl}
                  error={!!(touched.name && errors.name)}
                >
                  {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                  <TextField
                    type="text"
                    onBlur={handleBlur}
                    variant="outlined"
                    size="small"
                    {...getFieldProps('name')}
                    id="name"
                    name="name"
                    // placeholder="Name"
                    error={!!(touched.name && errors.name)}
                    aria-describedby="user-name-text"
                  />
                  {touched.name && errors.name ? (
                    <FormHelperText error={!!errors.name} id="user-name-text">
                      Name is required!
                    </FormHelperText>
                  ) : (
                    ''
                  )}
                </FormControl>

                <span className={classes.filterName}>Email*</span>
                <FormControl
                  className={classes.formControl}
                  error={!!(touched.email && errors.email)}
                >
                  {/* <InputLabel htmlFor="email">Email</InputLabel> */}
                  <TextField
                    {...getFieldProps('email')}
                    type="email"
                    variant="outlined"
                    size="small"
                    error={!!(touched.email && errors.email)}
                    id="email"
                    name="email"
                  // placeholder="User email"
                  />
                  {touched.email && errors.email ? (
                    <FormHelperText error={!!errors.email}>
                      Email is required field!
                    </FormHelperText>
                  ) : (
                    ''
                  )}
                </FormControl>

                <span className={classes.filterName}>Telephone Number*</span>
                <FormControl
                  className={classes.formControl}
                  error={!!(touched.telephone_no && errors.telephone_no)}
                >
                  {/* <InputLabel htmlFor="telephone_no">Telephone no.</InputLabel> */}
                  <TextField
                    {...getFieldProps('telephone_no')}
                    type="text"
                    variant="outlined"
                    size="small"
                    error={!!(touched.telephone_no && errors.telephone_no)}
                    id="telephone_no"
                    name="telephone_no"
                  // placeholder="Telephone Number"
                  />
                  {touched.telephone_no && errors.telephone_no ? (
                    <FormHelperText error={!!errors.telephone_no}>
                      Telephone no. is Required
                    </FormHelperText>
                  ) : (
                    ''
                  )}
                </FormControl>

                <span className={classes.filterName}>Mobile Number*</span>
                <FormControl
                  className={classes.formControl}
                  error={!!(touched.mobile_no && errors.mobile_no)}
                >
                  {/* <InputLabel htmlFor="mobile_no">Mobile no.</InputLabel> */}
                  <TextField
                    {...getFieldProps('mobile_no')}
                    type="text"
                    variant="outlined"
                    size="small"
                    error={!!(touched.mobile_no && errors.mobile_no)}
                    id="mobile_no"
                    name="mobile_no"
                  // placeholder="Mobile Number"
                  />
                  {touched.mobile_no && errors.mobile_no ? (
                    <FormHelperText error={!!errors.mobile_no}>
                      Mobile no. is Required
                    </FormHelperText>
                  ) : (
                    ''
                  )}
                </FormControl>
              </Box>
            </form>
          </Card>
        </Box>
      </DialogContent>

      <Box
        className={classes.ButtonSection}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box style={{ marginRight: '1rem' }}>
          <form onSubmit={handleSubmit}>
            <CancelModal onCloses={onClose} />
            <Button
              type="submit"
              // variant="contained"
              // color="primary"
              className={classes.saveButton}
            >
              {isEditing ? 'Update ' : 'Save '}
            </Button>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    isAddModalOpen: state.CustomerReducer?.contacts?.isAddModalOpen,
    isEditModalOpen: state.CustomerReducer?.contacts?.isEditModalOpen,
    isEditing: state.CustomerReducer?.contacts?.isEditing,
    currentContact: state.CustomerReducer?.contacts?.currentContact,
    currentCustomer: state.CustomerReducer?.currentCustomer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addContact: (...args) => dispatch(additionalAddContact(...args)),
  editContact: (...args) => dispatch(additionalEditContact(...args)),
  closeEditModal: (...args) => dispatch(additionalCloseEditContact(...args)),
  closeAddModal: (...args) => dispatch(additionalCloseAddContact(...args)),
  successAlert: (...args) => dispatch(successAlert(...args)),
  errorAlert: (...args) => dispatch(errorAlert(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdditionalContactsAddModal);
