import React from 'react'
import {Button, Header, Modal} from 'semantic-ui-react'
import siteImages from '../../Assets/Icons'
import Image from 'next/image'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import actions from '../../Stores/Auth/actions'
import Drawer from '@material-ui/core/Drawer'
import {withStyles} from '@material-ui/core/styles'
import Link from 'next/link'

const LogoutAction = actions.logout

const styles = (theme) => ({
  drawerPaper: {
    maxWidth: theme.breakpoints.values.sm * 0.65,
    width: '100%',
    height: '100vh',
    backgroundColor: '#f7f9fb',
  },
  modal_content: {
    // padding: '1rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #e9e9ea',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  listItemImgHolder: {
    width: '20px',
    height: '20px',
    position: 'relative',
  },
  listItemTitle: {
    fontFamily: 'Urbanist,sans-serif',
    color: '#21262b',
    fontSize: '14px',
    lineHeight: '19px',
    paddingLeft: '10px',
    width: '100%',
  },
  logoutText: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    color: '#21262b',
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'center',
    padding: '2.5rem 0rem',
    color: '#df5c53',
  },
  profile: {
    padding: '1rem',
    backgroundColor: '#fff',
    marginBottom: '15px',
  },
  profileTitle: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    color: '#21262b',
    fontSize: '16px',
    lineHeight: '19px',
    textTransform: 'capitalize',
  },
  profileClose: {
    width: '15px',
    height: '15px',
    marginLeft: 'auto',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    marginTop: '8px',
    marginBottom: '8px',
  },
  profileCloseImg: {
    width: '15px',
    height: '15px',
    objectFit: 'contain',
    marginLeft: 'auto',
    marginTop: '12px',
    marginBottom: '12px',
    marginRight: '8px',
  },
  profileInfo: {
    fontFamily: 'Urbanist,sans-serif',
    color: 'rgba(33, 38, 43, 0.7)',
    fontSize: '14px',
    lineHeight: '19px',
    margin: 0,
  },
})

const menuContent = [
  {
    icon: siteImages.menuAbout.src,
    title: 'About Us',
    to: '/about',
  },
  {
    icon: siteImages.menuPolicy.src,
    title: 'Blogs',
    to: '/blogs',
  },
  {
    icon: siteImages.menuContact.src,
    title: 'Contact',
    to: '/contact',
  },
  {
    icon: siteImages.menuTradesman.src,
    title: 'Tradespeople',
    to: '/tradespeople',
  },
]

function ExitModal({open, onClose, Logout, classes, user, loggedIn}) {
  function handleCheckout() {
    Logout()
    onClose()
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => onClose()}
      classes={{paper: classes.drawerPaper}}
    >
      <img
        className={classes.profileCloseImg}
        src="/site__main__images/site__close.png"
        alt="Urbanserve Icon"
        onClick={() => onClose()}
      />
      {loggedIn && user && (
        <div className={classes.profile}>
          <h4 className={classes.profileTitle}>{user?.name ?? `~`}</h4>
          {user?.email && (
            <p className={classes.profileInfo}>{user?.email ?? `~`}</p>
          )}
          {user?.mobile_no && (
            <p className={classes.profileInfo}>{user?.mobile_no ?? `~`}</p>
          )}
        </div>
      )}
      <div className={classes.modal_content}>
        {/* {!loggedIn && (
          <Link href="/login">
            <div className={classes.listItem}>
              <div className={classes.listItemImgHolder}>
                <Image
                  src={siteImages?.menuLoginIn?.src}
                  alt="Urbanserve Icon"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </div>
              <p className={classes.listItemTitle}>Login</p>
            </div>
          </Link>
        )} */}
        {/* {!loggedIn && (
          <Link href="/login">
            <div className={classes.listItem}>
              <div className={classes.listItemImgHolder}>
                <Image
                  src={siteImages?.menuSignup?.src}
                  alt="Urbanserve Icon"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </div>
              <p className={classes.listItemTitle}>Register</p>
            </div>
          </Link>
        )} */}

        {menuContent?.length > 0 &&
          menuContent?.map((item) => (
            <Link href={item?.to}>
              <div className={classes.listItem}>
                <div className={classes.listItemImgHolder}>
                  <Image
                    src={item?.icon}
                    alt="Urbanserve Icon"
                    layout="fill"
                    objectFit="contain"
                    quality={100}
                  />
                </div>
                <p className={classes.listItemTitle}>{item?.title ?? '~'}</p>
              </div>
            </Link>
          ))}
        {loggedIn && user && (
          <h6 className={classes.logoutText} onClick={() => Logout()}>
            Logout
          </h6>
        )}
      </div>
    </Drawer>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    Logout: (data) => dispatch(LogoutAction(data)),
  }
}

const withConnect = connect(null, mapDispatchToProps)

export default withStyles(styles)(compose(withConnect)(ExitModal))
