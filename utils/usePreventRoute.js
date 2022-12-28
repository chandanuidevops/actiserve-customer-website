// import React, { useState, useEffect } from 'react'
// import ReactDOM from "react-dom";

// import { BrowserRouter, Route, NavLink } from "react-router-dom";
// import NavigationPrompt from "react-router-navigation-prompt";
// import { withStyles } from '@material-ui/core/styles';
// import Dialog from '@material-ui/core/Dialog';
// import { makeStyles } from '@material-ui/core';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSubmitFailure } from '../Stores/usePrevent/actions';
// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

// const useStyles = makeStyles((theme) => ({
//     cancelButton: {
//         minWidth: '138px',
//         color: '#FFFFFF',
//         background: '#8C98A4',
//         border: '1px solid #eef0f2',
//         textTransform: 'none',
//         boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
//         fontWeight: '700',
//         lineHeight: '18px',
//         padding: '8px 16px',
//         minHeight: '44px',
//         marginRight: '0.8rem',
//         fontFamily: 'Ubuntu',
//         '&:hover': {
//             background: '#8C98A4',
//             color: '#FFFFFF',
//         },
//     },
//     textStyle: {
//         fontFamily: 'Ubuntu',
//         fontWeight: '500',
//     },
//     SaveButton: {
//         minWidth: '138px',
//         color: '#fff',
//         background: '#5FA4E3',
//         border: '1px solid #eef0f2',
//         textTransform: 'none',
//         boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
//         fontWeight: '700',
//         lineHeight: '18px',
//         padding: '8px 16px',
//         minHeight: '44px',
//         fontFamily: 'Ubuntu',
//         '&:hover': {
//             background: '#5FA4E3',
//             color: '#fff',
//         },
//     },
// }));

// function usePreventRoute() {
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const didSubmit = useSelector((state) => state.usePreventReducer.didSubmit);
//     // State to check if input if filled by user
//     const [isFormFilled, setFormFilled] = useState(false)

//     console.log("isFormFilled:::", isFormFilled)
//     console.log("didSubmit:::", didSubmit)

//     /* didSubmit is set to false on initial loading of the */
//     useEffect(() => {
//         dispatch(setSubmitFailure());
//     }, []);

//     /* After Successfull API Call, didSubmit is set to true*/
//     /* if didSubmit is true, the formFilled is set to false to disabled promt & reload*/
//     useEffect(() => {
//         if (didSubmit === true) {
//             setFormFilled(false);
//         }
//     }, [didSubmit]);

//     // Return modal 
//     // Use this modal anywhere in the component => {Prompt}
//     // This will confirmation modal. Route will change based on the confirmation from user.
//     const routerPrompt = <div>
//         <NavigationPrompt when={isFormFilled}>

//             {/* Custom Modal */}
//             {({ onConfirm, onCancel }) => (
//                 <React.Fragment>
//                     <Dialog
//                         aria-labelledby="customized-dialog-title"
//                         open={isFormFilled}
//                     >
//                         <Typography
//                             className={classes.textStyle}
//                             gutterBottom
//                             style={{ padding: '20px' }}
//                         >
//                             Are you sure you want to leave, you will lose your data if you
//                             continue!
//                         </Typography>
//                         <DialogActions>
//                             <Button
//                                 autoFocus
//                                 onClick={onConfirm}
//                                 color="primary"
//                                 className={classes.SaveButton}
//                             >
//                                 Yes
//                             </Button>
//                             <Button
//                                 autoFocus
//                                 onClick={onCancel}
//                                 color="primary"
//                                 className={classes.cancelButton}
//                             >
//                                 No
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </React.Fragment>
//             )}
//         </NavigationPrompt>
//     </div>

//     // Return Modal, method to set state true, method to set state false
//     return [routerPrompt, () => setFormFilled(true), () => setFormFilled(false)]
// }

// export default usePreventRoute
