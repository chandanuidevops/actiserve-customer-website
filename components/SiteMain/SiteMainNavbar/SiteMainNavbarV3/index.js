import React from 'react'
import Link from 'next/link'
import Router, {useRouter} from 'next/router'
const SiteMainNavbarV3 = () => {
  const router = useRouter()

  const backToHome = () => {
    if (router.pathname.match('/trader-signup')) {
      if (confirm('Are you sure you want to leave?')) {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }
  return (
    <>
      <nav className="site__navbar__ct">
        <Link href="javascript:void(0)">
          <img
            onClick={() => backToHome()}
            className="site__navbar__ct__logo"
            src="/site__main__images/site__logo_new.png"
            width="100%"
            alt="site__logo"
          />
        </Link>
      </nav>
    </>
  )
}

export default SiteMainNavbarV3
