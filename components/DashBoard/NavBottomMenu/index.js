// import React from "react";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import { FaUser, FaUserCog, FaSignOutAlt } from "react-icons/fa";
// import { useHistory, Link } from "react-router-dom";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import { useDispatch, useSelector } from "react-redux";
// import clsx from "clsx";
// import IconButton from "@material-ui/core/IconButton";
// import { Box, Collapse, Typography, useTheme } from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import actions from "../../../Stores/Auth/actions";
// import PropTypes from "prop-types";
// import { useStyles } from "../styles";

// export default function NavBottomMenu({ isDrawerOpen }) {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.AuthReducer?.user);
//   const logoutAction = actions.logout;

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };
//   function handleListKeyDown(event) {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpen(false);
//     }
//   }
//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   const onSignOutAction = (e) => {
//     e.preventDefault();
//     dispatch(logoutAction(history));
//   };

//   return (
//     <div className={classes.bottomUserMenuroot}>
//       <Box
//         display="flex"
//         px="0.25rem"
//         // className={classes.userMenuToggle}
//         onClick={() => {
//           history.push("/d/myprofile");
//         }}
//       >
//         <IconButton
//           ref={anchorRef}
//           aria-controls={open ? "menu-list-grow" : undefined}
//           aria-haspopup="true"
//           className={isDrawerOpen ? classes.listItemIcon : classes.avatar}
//           // onClick={handleToggle}
//         >
//           <AccountCircle />
//         </IconButton>

//         <Typography
//           className={classes.primaryText}
//           style={{ cursor: "pointer" }}
//         >
//           {user?.first_name}
//         </Typography>
//       </Box>
//     </div>
//   );
// }
// NavBottomMenu.propTypes = {
//   isDrawerOpen: PropTypes.bool,
// };
