import React from 'react'
import Image from 'next/image'

import Images from '../../../Assets/Icons'
import Link from 'next/link'
import {Button} from 'semantic-ui-react'
import Router, {useRouter} from 'next/router'
export default function Navbar() {
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
      <section className="us__navbar">
        <div className="us__navbar__container">
          <div className="us__navbar__imgholder nav__left " align="left">
            <div className="logo__container" align="left">
              <Link href="javascript:void(0)">
                <Image
                  style={{position: 'relative'}}
                  onClick={() => backToHome()}
                  src={Images.logo}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </Link>
            </div>
          </div>

          <div
            className="us__navbar__imgholder nav__btn__container nav__right"
            align="right"
          >
            {!router.pathname.match('/trader-signup') && (
              <Link href="/tradespeople/get-started">
                <Button className="site__nav__btn">For Tradespeople</Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
