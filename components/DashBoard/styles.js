import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const drawerWidth = 265;

export const ToolBarWrapper = styled.div`
  display: flex;
  justify-content: space-between !important;
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  right: 20px;
`;

export const StyledPopover = styled.div`
  height: 50px;
  width: 100px;
  right: -16px;
  padding: 8px;
  background: #fff;
  position: absolute;
  border-radius: 4px;
  color: #000;
`;

export const useStyles = makeStyles((theme) => ({
  primaryText: {
    textTransform: "capitalize",
    textOverflow: "ellipsis",
    // margin: '20px',
  },
  secondaryText: {
    ...theme?.typography?.secondary,
    fontSize: "0.75rem",
  },
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
    color: "#000",
  },
  hide: {
    display: "none",
  },
  drawer: {
    background: `#1A273A`,
    color: `#495B6D`,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: "16.1%",
    background: `#1A273A`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    // width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: "80px",
      background: "#1A273A",
      border: "none",
    },
  },
  drawerToggleIcon: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  drawerToggleIconOpen: {
    marginRight: "auto",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.3rem",
    marginBottom: "-0.3rem",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  // content: {
  //   display: "flex",
  //   flexGrow: 1,
  //   padding: 0,
  //   background: "#f7f7f8",
  //   minHeight: "100vh",
  //   width: 0,
  //   [theme.breakpoints.down("lg")]: {
  //     marginRight: 0,
  //   },
  // },
  navList: {
    marginRight: "0.5rem",
    marginBottom: "auto",
    marginLeft: "0.5rem",
  },
  listItemIcon: {
    justifyContent: `center`,
    alignItems: `center`,
    minWidth: `45px`,
    minHeight: `0.8rem !important`,
    color: `#fff`,
  },
  listItem: {
    padding: `1rem 0.75rem`,
    overflow: `hidden`,
  },
  listBottomItem: {
    padding: `0.75rem 0.75rem`,
    overflow: `hidden`,
  },
  // listItemActive: {
  //   color: `#CB787F`,
  // },
  listItemText: {
    margin: "0 !important",
    marginLeft: "25px",
    marginTop: "2px !important",
    fontSize: "1rem",
    color: `#fff`,
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "15px",
    lineHeight: "24px",
  },
  listItemTextClose: { display: "none !important" },
  // NavBottomMenu
  bottomUserMenuroot: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    color: `#495B6D`,
  },

  subMenu: {
    display: "flex",
    paddingTop: "0px",
    flexDirection: "column",
    width: "100%",
    background: `#1A273A`,
  },
  subMenuItem: {
    background: "#1A273A",
    fontSize: "0.75rem",
    display: "flex",
    fontSize: "0.85rem",
    color: `#fff`,
    borderLeft: "2px solid #fff",
  },
  subMenuList: {
    paddingTop: "0",
    paddingBottom: "0",
    color: `#fff`,
    paddingLeft: "10px",
  },
  subMenuLink: {
    color: `#fff`,
    marginLeft: "35px",
  },
  bottomUserMenu: {
    marginTop: "auto",
  },
  userMenuToggle: { padding: "0px 0.75rem" },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  userMenuIcons: {
    display: "flex",
    justifyContent: `center`,
    alignItems: `center`,
    minWidth: `48px`,
    minHeight: `1.5rem !important`,
    color: `#fff`,
    "& svg": {
      width: "1rem",
      height: "1rem",
    },
  },
  menuItem: {
    background: "#f7f7f8",
    fontSize: "0.75rem",
    display: "flex",
    padding: `0.75rem 0.75rem`,
  },
  menuItemSeperator: {
    borderTop: "1px solid #495B6D",
    borderBottom: "1px solid #495B6D",
  },
  fullWidth: { width: "100%" },
  collapseLinks: {
    textDecoration: "none",
    color: `#495B6D`,
    fontFamily: "Mulish",
  },
  // routeBox: {
  //   backgroundColor:'#3F4C5F',
  // },
  avatar: {
    filter: `drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.04)), drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.06)), drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.04))`,
  },
  activeNavLink: {
    backgroundColor: "#3F4C5F",
    color: "#fff",
    fontWeight: 700,
    borderRadius: "5px",
    // marginLeft: '0.8rem',
    // '& > div:before': {
    //   position: 'absolute',
    //   content: '""',
    //   width: '10px',
    //   height: '10px',
    //   top: '1px',
    //   right: '1px',
    //   borderRight: '2px solid #CB787F',
    //   borderTop: '2px solid #CB787F',
    // },
    // '& > div:after': {
    //   position: 'absolute',
    //   content: '""',
    //   width: '10px',
    //   height: '10px',
    //   left: '1px',
    //   bottom: '1px',
    //   borderLeft: '2px solid #CB787F',
    //   borderBottom: '2px solid #CB787F',
    // },
    // '&:before': {
    //   position: 'absolute',
    //   content: '""',
    //   width: '10px',
    //   height: '10px',
    //   top: '1px',
    //   left: '1px',
    //   borderLeft: '2px solid #CB787F',
    //   borderTop: '2px solid #CB787F',
    // },
    // '&:after': {
    //   position: 'absolute',
    //   content: '""',
    //   width: '10px',
    //   height: '10px',
    //   right: '1px',
    //   bottom: '1px',
    //   borderRight: '2px solid #CB787F',
    //   borderBottom: '2px solid #CB787F',
    // },
    "& svg,path": {
      fill: "#fff",
    },
    // '& .nav-icon-no-fill': {
    //   '& path': {
    //     stroke: '#CB787F',
    //     fill: 'none !important',
    //   },
    // },
    // '& .nav-icon-no-path-fill': {
    //   '& path': {
    //     fill: '#CB787F',
    //     stroke: 'none !important',
    //   },
    //   '& rect': {
    //     stroke: '#CB787F',
    //     fill: 'none !important',
    //   },
    // },
  },
  tooltip: {
    fontFamily: "Mulish",
  },
}));
