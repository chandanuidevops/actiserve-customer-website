import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import actions from '../../../../Stores/Auth/actions'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import ExitModal from '../../../ExitModal'
import ProfileModal from '../../../ProfileModal'

const LogoutAction = actions.logout

const SiteMainNavbarV2 = ({Logout}) => {
  const userInfo = useSelector((state) => state?.AuthReducer?.user)

  const [loggedIn, setLoggedIn] = React.useState(false)

  // Exit Modal
  const [open, setOpen] = React.useState(false)

  // Profile Modal
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)
  useEffect(() => {
    if (userInfo && userInfo?.id !== null) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [userInfo])

  function handleLogout() {
    setOpen(!open)
  }

  return (
    <>
      <nav className="site__navbar__ct">
        <Link href="/">
          <img
            className="site__navbar__ct__logo"
            src="/site__main__images/site__logo_new.png"
            width="100%"
            alt="site__logo"
          />
        </Link>

        {/* <div>
          {loggedIn && (
            <button
              onClick={() => handleLogout()}
              className="site__navbar__ct__btn"
            >
              Log out
            </button>
          )}
        </div> */}
        <div className="site__navbar__ct__cta">
          <img
            className="site__ct__menu"
            src="/site__main__images/site__humburger.png"
            alt="Menu Icon"
            width="100%"
            onClick={() => setIsProfileModalOpen(true)}
          />
        </div>
      </nav>
      <ExitModal open={open} onClose={() => setOpen(!open)} />
      <ProfileModal
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(!isProfileModalOpen)}
        user={userInfo}
        loggedIn={loggedIn}
      />
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    Logout: (data) => dispatch(LogoutAction(data)),
  }
}

const withConnect = connect(null, mapDispatchToProps)

export default compose(withConnect)(SiteMainNavbarV2)
