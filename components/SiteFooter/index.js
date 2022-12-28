import React from 'react'
import {Grid} from 'semantic-ui-react'
import Link from 'next/link'
import Router, {useRouter} from 'next/router'
import Image from 'next/image'
import Images from '../../Assets/Icons'
import {useMediaQuery} from 'react-responsive'

import facebook from '../../public/images/social/facebook.svg'
import instagram from '../../public/images/social/instagram.svg'
import twitter from '../../public/images/social/twitter.svg'
import youtube from '../../public/images/social/youtube.svg'

const socialLinks = [
  {
    img: facebook,
    to: 'https://www.facebook.com/urbanserveuk/',
  },
  {
    img: instagram,
    to: 'https://www.instagram.com/urbanserve/',
  },
  // {
  //   img: twitter,
  //   to: '/',
  // },
  {
    img: youtube,
    to: 'https://www.youtube.com/channel/UCw5l46uY87IapzthOQ7S84g/',
  },
]
function SiteFooter() {
  const d = new Date()
  const router = useRouter()
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'})

  const routePage = (e) => {
    if (router.pathname.match('/trader-signup')) {
      if (confirm('Are you sure you want to leave?')) {
        if (e.match('http')) {
          window.location.href = e
        }
        router.push(e)
      }
    } else {
      router.push(e)
    }
  }
  return (
    <>
      {/* Site Footer Start */}
      <section className="site__footer__wrapper">
        <div className="site__footer__container container">
          <Grid stackable columns={3} className="site__footer__content">
            <Grid.Column className="site__footer__col__one">
              <ul>
                <li>Urbanserve</li>
                <li onClick={() => routePage('/contact')}>
                  <a href="/about" rel="nofollow">
                    <Link href="javascript:void(0)">Contact</Link>
                  </a>
                </li>
                <li onClick={() => routePage('/about')}>
                  <a href="/about" rel="nofollow">
                    <Link href="javascript:void(0)">About Us</Link>
                  </a>
                </li>
                <li onClick={() => routePage('/tradespeople')}>
                  <a href="/tradespeople" rel="nofollow" target="_blank">
                    <Link passHref={true} href="javascript:void(0)">
                      Tradespeople
                    </Link>
                  </a>
                </li>
                <li onClick={() => routePage('/privacy-and-cookie-policy')}>
                  <a href="/about">
                    <Link href="javascript:void(0)">
                      Privacy and Cookie Policy
                    </Link>
                  </a>
                </li>
                <li onClick={() => routePage('/terms-and-conditions')}>
                  <a href="/terms-and-conditions">
                    <Link href="javascript:void(0)">Terms & Conditions</Link>
                  </a>
                </li>
              </ul>
            </Grid.Column>
            <Grid.Column
              className="site__footer__col__two vertical-space"
              style={{display: 'flex'}}
            >
              <div>
                <h3>Data Safe</h3>
                <p>Your details are kept safe and never shared</p>
              </div>
              <div>
                <h3>Gas Safe</h3>
                <p>Our engineers are vetted and fully qualifed</p>
              </div>
            </Grid.Column>
            <Grid.Column className="site__footer__col__three">
              <div>
                <h3 className="site__footer__col__mt">Download Now</h3>
                <div className="site__footer__app__links">
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                    }}
                  >
                    <a
                      href={process.env.NEXT_PUBLIC_APP_GOOGLE}
                      target="_blank"
                    >
                      <Image
                        alt="Urbanserve Icon"
                        layout="fixed"
                        width={'100px'}
                        height={'30px'}
                        src={Images.imgPlayStore.src}
                        style={{cursor: 'pointer'}}
                        quality={100}
                      />
                    </a>
                    <a href={process.env.NEXT_PUBLIC_APP_APPLE} target="_blank">
                      <Image
                        alt="Urbanserve Icon"
                        layout="fixed"
                        width={'100px'}
                        height={'30px'}
                        src={Images.imgAppleStore.src}
                        quality={100}
                        style={{cursor: 'pointer'}}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="site__footer__payment">
                <div
                  style={{position: 'relative', width: '200px', height: '30px'}}
                >
                  <Image
                    alt="Urbanserve Icon"
                    layout="fill"
                    src={Images.imgPaymentBadge.src}
                    objectFit="contain"
                    quality={100}
                  />
                </div>
              </div>
              <div className="site__footer__social">
                {socialLinks.map((data, i) => (
                  <div className="site__footer__social__item">
                    <a href={data.to} rel="nofollow" target="_blank">
                      <Image
                        alt="Urbanserve Icon"
                        src={data.img}
                        width={isTabletOrMobile ? 20 : 25}
                        height={isTabletOrMobile ? 20 : 25}
                        objectFit="contain"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </Grid.Column>
          </Grid>
          <Grid
            textAlign="center"
            className="site__footer__logo"
            style={{padding: '0rem'}}
          >
            <Grid.Column mobile={16}>
              <img
                onClick={() => routePage('/')}
                src="/site__main__images/logo__light__footer.png"
                width="100%"
                alt="Urbanserve Icon"
              />
              <p className="site__footer__text">
                Copyright © 2010 - {d.getFullYear()} UrbanServe Ltd. All rights
                reserved.
              </p>
            </Grid.Column>
          </Grid>
        </div>
      </section>
      {/* Site Footer End */}
    </>
  )
}

export default SiteFooter
