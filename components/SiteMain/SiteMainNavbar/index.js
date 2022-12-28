import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import actions from '../../../Stores/Auth/actions'
import {compose} from 'redux'
import {connect, useSelector} from 'react-redux'
import ExitModal from '../../ExitModal'
import ProfileModal from '../../ProfileModal'
import Router from 'next/router'
import Images from '../../../Assets/Icons'
import Image from 'next/image'
const LogoutAction = actions.logout

function SiteMainNavbar(props) {
  const userInfo = useSelector((state) => state?.AuthReducer?.user)

  const [loggedIn, setLoggedIn] = React.useState(false)

  // Exit Modal
  const [open, setOpen] = React.useState(false)

  // Force update
  const [update, setUpdate] = React.useState(false)

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
    setUpdate(!update)
  }

  const handleLogoRedirect = async () => {
    let defaultLocation = null
    defaultLocation = await localStorage.getItem('urbanserve_user_location')

    if (defaultLocation) {
      await Router.push(`/${defaultLocation}`)
    } else {
      await Router.push(`/`)
    }
  }

  function actionGenerator() {
    if (loggedIn) {
      return (
        <button
          onClick={() => {
            handleLogout()
            setUpdate(!update)
          }}
          className="site__nav__btn"
        >
          Log out
        </button>
      )
    } else {
      return (
        <Link href="/login">
          <button className="site__nav__btn">Log in</button>
        </Link>
      )
    }
  }
  return (
    <>
      <section
        className={
          props.theme === 'dark'
            ? 'site__navbar__wrapper navbar_bg_dark'
            : 'site__navbar__wrapper navbar_bg_light'
        }
      >
        <div className="site__navbar__container site_lg_container">
          <nav className="site__navbar">
            <div className="site__navbar__logo">
              <Link href="/">
                <a href="/">
                  <div
                    style={{
                      position: 'relative',
                      width: '123px',
                      height: '68px',
                    }}
                  >
                    <Image
                      src={
                        props.theme === 'dark'
                          ? Images.logoLight.src
                          : Images.logo.src
                      }
                      layout="fill"
                      objectFit="contain"
                      quality={100}
                    />
                  </div>
                </a>
              </Link>
            </div>

            <div className="site__navbar__content">
              <ul>
                <li
                  className={
                    props.theme === 'dark'
                      ? 'navbar_bg_light_text li-pr'
                      : 'navbar_bg_dark_text li-pr'
                  }
                >
                  <Link href="/about">
                    <a href="/about" rel="nofollow">
                      About Us
                    </a>
                  </Link>
                </li>
                <li
                  className={
                    props.theme === 'dark'
                      ? 'navbar_bg_light_text li-pr'
                      : 'navbar_bg_dark_text li-pr'
                  }
                >
                  <Link href="/blogs">
                    <a href="/blogs" rel="nofollow">
                      Blogs
                    </a>
                  </Link>
                </li>
                <li className="li-bpr">
                  <Link href="/contact">
                    <a href="/contact" rel="nofollow">
                      <button className="site__nav__btn">Contact</button>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/tradespeople">
                    <a href="/tradespeople" rel="nofollow">
                      <button className="site__nav__btn">Tradespeople</button>
                    </a>
                  </Link>
                </li>
                {/* <li>{actionGenerator()}</li> */}
              </ul>
            </div>

            <div className="site__navbar__mb">
              <img
                src={
                  props.theme === 'dark'
                    ? '/images/home/img-menu-light.webp'
                    : '/images/home/img-menu-dark.webp'
                }
                alt="Menu Icon"
                width="100%"
                onClick={() => setIsProfileModalOpen(true)}
              />
            </div>
          </nav>
        </div>
      </section>

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

export default compose(withConnect)(SiteMainNavbar)
