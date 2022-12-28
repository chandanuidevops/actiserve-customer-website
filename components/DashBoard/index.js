import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import actions from "../../Stores/Auth/actions";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { ToolBarWrapper, useStyles } from "./styles";
// import Logo from "../../Components/Logo";

// import navIcons from "../../Assets/Icons/index.js";
import { AccountCircle, Menu } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { useRouter } from 'next/router'
// import { FaSignOutAlt } from "react-icons/fa";
// import { ReactComponent as TabIcon } from "../../Assets/sidebar_icon/tab.svg";
// import { ReactComponent as TabIconclose } from "../../Assets/sidebar_icon/tabclose.svg";

const logoutAction = actions.logout;

const routes = [
  // {
  //   label: "Jobs",
  //   path: "/d/jobs",
  //   icon: <navIcons.JobsIcon fill="#495B6D" height="20px" width="20px" />,
  //   item_name: "JOB",
  // },

  {
    label: "New Offers",
    path: "/visits",
    // icon: <navIcons.JobsIcon fill="#495B6D" height="20px" width="20px" />,
    item_name: "JOB",
  },
  {
    label: "Order Booked",
    path: "/orders",
    // icon: <navIcons.BookedIcon fill="#495B6D" height="20px" width="20px" />,
    item_name: "JOB",
  },
  {
    label: "Order Completed",
    path: "/job-completed",
    // icon: <navIcons.CompletedIcon fill="#495B6D" height="20px" width="20px" />,
    item_name: "JOB",
  },
  {
    label: "Profile",
    path: "/profile",
    // icon: <navIcons.CompletedIcon fill="#495B6D" height="20px" width="20px" />,
    item_name: "PROFILE",
  },

  // {
  //   label: "Engineers",
  //   path: "/d/engineers",
  //   icon: <navIcons.EngineersIcon fill="#495B6D" height="20px" width="20px" />,
  //   item_name: "ENGINEER",
  // },
  // {
  //   label: "Trader",
  //   path: "/d/traders",
  //   // icon: <navIcons.EngineersIcon fill="#495B6D" height="20px" width="20px" />,
  //   item_name: "ENGINEER",
  // },
];
function DashBoard({ children, logout }) {
  const classes = useStyles();
  const history = useRouter()
  const [open, setOpen] = React.useState(true);
  const [subMenuOpen, setsubMenuOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const user = useSelector((state) => state.AuthReducer?.user);
  // const history = useHistory();
  // const location = useLocation();
  const dispatch = useDispatch();

  const handleToggle = () => {
    setsubMenuOpen((prevOpen) => !prevOpen);
  };

  const onSignOutAction = (e) => {
    e.preventDefault();
    dispatch(logoutAction(history));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <ToolBarWrapper className={classes.toolbar}>
          {/* {open && (
            <Link to="/">
              <Logo />
            </Link>
          )} */}
          <IconButton
            className={clsx(classes.drawerToggleIcon, {
              [classes.drawerToggleIconOpen]: !open,
            })}
            onClick={toggleDrawer}
          >
            {/* {open ? (
              <TabIcon style={{ width: "30px" }} />
            ) : (
              <TabIconclose style={{ width: "30px" }} />
            )} */}
          </IconButton>
        </ToolBarWrapper>
        <List
          className={classes.navList}
          style={
            open == false
              ? {
                marginRight: "0px",
                marginLeft: "0px",
                border: "none !important",
              }
              : null
          }
        >
          {routes.map((route) => (
            <ListItem
              // component={NavLink}
              onClick={() => {
                history.push(route.path)
              }
              }
              to={route.path}
              className={classes.listItem}
              activeClassName={classes.activeNavLink}
              // selected={
              //   location?.pathname.includes(route?.path) && open == false
              //     ? true
              //     : false
              // }
              classes={{
                selected: classes.selected,
              }}
            >
              <Box display="flex" className={classes.routeBox}>
                <ListItemIcon
                  className={classes.listItemIcon}
                // style={
                //   location?.pathname.includes(route?.path) == true &&
                //     open == false
                //     ? { filter: "invert(100%)" }
                //     : null
                // }
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  className={clsx({
                    [classes.listItemText]: true,
                    [classes.listItemTextClose]: !open,
                  })}
                >
                  {route.label}
                </ListItemText>
              </Box>
            </ListItem>
          ))}
        </List>

        {/* <List>
          <ListItem
            button
            onClick={() => {
              history.push("/d/myprofile");
            }}
            className={classes.listItem}
            activeClassName={classes.activeNavLink}
          >
            <Box display="flex">
              <ListItemIcon className={classes.listItemIcon}>
                <AccountCircle fill="#495B6D" />
              </ListItemIcon>

              <ListItemText
                style={{ textTransform: "capitalize" }}
                className={clsx({
                  [classes.listItemText]: true,
                  [classes.listItemTextClose]: !open,
                })}
              >
                {user?.first_name}
              </ListItemText>
            </Box>
          </ListItem>
          <ListItem
            button
            onClick={onSignOutAction}
            className={classes.listItem}
            activeClassName={classes.activeNavLink}
          >
            <Box display="flex">
              <ListItemIcon className={classes.listItemIcon}>
                <FaSignOutAlt fill="#495B6D" />
              </ListItemIcon>

              <ListItemText
                className={clsx({
                  [classes.listItemText]: true,
                  [classes.listItemTextClose]: !open,
                })}
              >
                Logout
              </ListItemText>
            </Box>
          </ListItem>
        </List> */}
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
}

DashBoard.propTypes = {
  logout: PropTypes.func.isRequired,
  children: PropTypes.node,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: (history) => dispatch(logoutAction(history)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(DashBoard);
