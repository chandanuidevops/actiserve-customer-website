import React, {useState, useEffect} from 'react'
import {
  Grid,
  Breadcrumb,
  Modal,
  Button,
  Segment,
  Icon,
  Image,
  Loader,
  Divider,
  List as SemanticList,
  Label,
} from 'semantic-ui-react'
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import {connect, useSelector} from 'react-redux'
import {compose} from 'redux'
import {
  TextField,
  makeStyles,
  Card,
  Drawer as MaterialDrawer,
  DialogContent,
} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import InfoIcon from '@material-ui/icons/Info'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/IconButton'
import Router from 'next/router'
import {Close} from '@material-ui/icons'
import actions from '../../Stores/Auth/actions'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
const LogoutAction = actions.logout

const useStyles = makeStyles((theme) => ({
  root: {
    minwidth: '260px',
    maxWidth: '260px',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawerPaper: {
    maxWidth: theme.breakpoints.values.sm * 0.65,
    width: '100%',
    height: '100vh',
  },
  menuLogo: {
    width: '40%',
    height: '40%',
  },
}))

function SiteNavComp({Logout}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const userInfo = useSelector((state) => state?.AuthReducer?.user)
  const anchorRef = React.useRef(null)
  const classStyles = useStyles()
  const [listOneOpen, setListOpenOne] = React.useState(false)

  const [innerListOpen, setInnerListOpen] = React.useState(false)
  const toggleInnerList = () => {
    setInnerListOpen(!innerListOpen)
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (userInfo && userInfo?.id !== null) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [userInfo])

  const [open, setOpen] = React.useState(false)

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleListOneClick = () => {
    setListOpenOne(!listOneOpen)
  }

  useEffect(() => {
    if (!isMenuOpen) {
      setInnerListOpen(false)
    }
  }, [isMenuOpen])

  return (
    <>
      <nav class="site__nav">
        <div class="site__nav__logo" onClick={() => Router.push('/')}>
          <img src="/images/logo.png" width="100%" />
        </div>
        <div class="site__nav__menu" onClick={() => toggleMenu()}>
          <img src="/images/menu.png" width="100%" />
        </div>
        <ul class="site__nav__ul">
          <li class="site__nav__li" onClick={() => Router.push('/')}>
            Home
          </li>
          <li
            class="site__nav__li"
            onClick={() => Router.push('/active-offers')}
          >
            Orders
          </li>
          <li class="site__nav__li" onClick={handleToggle}>
            <Button
              className="site__nav__li__btn"
              style={{display: 'flex', alignItems: 'center'}}
            >
              {loggedIn === true
                ? userInfo?.name.replace(/ .*/, '')
                : 'Profile'}
              <IconButton
                ref={anchorRef}
                size="small"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
              >
                <Icon
                  style={{color: 'white'}}
                  color="yellow"
                  name="chevron down"
                  style={{paddingLeft: '0.3rem'}}
                ></Icon>
              </IconButton>
            </Button>
          </li>
        </ul>
      </nav>

      <div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal={false}
          role={undefined}
          transition
          style={{zIndex: '2'}}
        >
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper style={{width: '260px', marginRight: '-1.4rem'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <Card
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    style={{marginTop: '1.2rem'}}
                  >
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      className={classStyles.root}
                    >
                      {loggedIn === false ? (
                        <>
                          <ListItem
                            button
                            onClick={() => {
                              Router.push('/sign-up')
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign Up" />
                          </ListItem>
                          <ListItem
                            button
                            onClick={() => {
                              Router.push('/login')
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log In" />
                          </ListItem>
                        </>
                      ) : (
                        <>
                          <ListItem
                            button
                            onClick={() => {
                              Router.push('/profile')
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                          </ListItem>
                          <ListItem
                            button
                            onClick={() => {
                              Router.push('/change-password')
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <VpnKeyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Change Password" />
                          </ListItem>
                        </>
                      )}
                      <ListItem button onClick={handleListOneClick}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                        {listOneOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={listOneOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classStyles.nested}
                            onClick={() => {
                              Router.push('/about')
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="About Urbanserve" />
                          </ListItem>
                        </List>
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classStyles.nested}
                            onClick={() => {
                              Router.push('/terms')
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Terms and Conditions" />
                          </ListItem>
                        </List>
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classStyles.nested}
                            onClick={() => {
                              Router.push('/privacy-and-cookie-policy')
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Privacy Policy" />
                          </ListItem>
                        </List>
                      </Collapse>
                      <ListItem button>
                        <ListItemIcon>
                          <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register as partner" />
                      </ListItem>
                      {loggedIn === true && (
                        <>
                          <Divider />
                          <ListItem
                            button
                            onClick={() => {
                              Logout()
                              handleToggle()
                              setListOpenOne(false)
                            }}
                          >
                            <ListItemIcon>
                              <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                          </ListItem>
                        </>
                      )}
                    </List>
                  </Card>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <MaterialDrawer
        open={isMenuOpen}
        onClose={toggleMenu}
        anchor="right"
        classes={{
          paper: classStyles.drawerPaper,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0rem 0.8rem',
          }}
        >
          <img
            className={classStyles.menuLogo}
            src="/images/logo.png"
            width="100%"
          />
          <IconButton onClick={toggleMenu}>
            <Close />
          </IconButton>
        </div>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classStyles.root}
        >
          {loggedIn === false ? (
            <>
              <ListItem
                button
                onClick={() => {
                  Router.push('/sign-up')
                  handleToggle()
                  handleListOneClick()
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  Router.push('/login')
                  handleToggle()
                  handleListOneClick()
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItem>
            </>
          ) : (
            <ListItem
              button
              onClick={() => {
                Router.push('/profile')
                handleToggle()
                handleListOneClick()
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          )}
          <ListItem button onClick={toggleInnerList}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
            {listOneOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={innerListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classStyles.nested}
                onClick={() => {
                  Router.push('/about')
                  handleToggle()
                  toggleInnerList()
                }}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="About Urbanserve" />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classStyles.nested}
                onClick={() => {
                  Router.push('/terms')
                  handleToggle()
                  toggleInnerList()
                }}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Terms and Conditions" />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classStyles.nested}
                onClick={() => {
                  Router.push('/privacy-and-cookie-policy')
                  handleToggle()
                  toggleInnerList()
                }}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Privacy Policy" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Register as partner" />
          </ListItem>
          {loggedIn === true && (
            <>
              <ListItem
                button
                onClick={() => {
                  Logout()
                  handleToggle()
                  toggleInnerList()
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </MaterialDrawer>
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: (data) => dispatch(LogoutAction(data)),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(SiteNavComp)
