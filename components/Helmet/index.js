import React, {useState, useEffect} from 'react'

import {Helmet} from 'react-helmet'
import OgLogo from '../../public/images/logo/logo-og.png'
import Head from 'next/head'
import theme from '../../Theme/theme'

export default function HelmetComponent(props) {
  const {
    title,
    description,
    ogTitle,
    ogType,
    ogUrl,
    ogImage,
    ogDescription,
    showDescription,
    createJsonLD,
    jsonLDData,
    showNoFollow,
  } = props

  const StaticDescription = `UrbanServe - Hassle Free On Demand Services`
  const StaticOGTitle = `UrbanServe - Hassle Free On Demand Services`
  const StaticURL = `https://www.urbanserve.co.uk/`

  const addJsonLd = () => {
    return {
      __html: `
    {
      "@context" : "http://schema.org",
      "@type" : "Organization",
      "name" : "UrbanServe",
      "url" : "https://www.urbanserve.co.uk",
      "sameAs" : [
        "https://www.facebook.com/urbanserveuk/",
        "https://www.youtube.com/channel/UCw5l46uY87IapzthOQ7S84g/",
        "https://www.instagram.com/urbanserve/"
      ]
    }
    `,
    }
  }

  const createCustomJsonLD = () => {
    let data = jsonLDData
    return {
      __html: data && JSON.stringify(data),
    }
  }

  const [showLink, setShowLink] = useState(false)

  useEffect(() => {
    setShowLink(false)
  }, [])

  useEffect(() => {
    ogUrl && setShowLink(true)
  }, [ogUrl])

  return (
    <Head>
      <title>
        {title ? title : 'UrbanServe - Hassle Free On Demand Services'}
      </title>
      {showLink && <link rel="canonical" href={ogUrl}></link>}
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={description ? description : StaticDescription}
      />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta
        property="og:title"
        content={ogTitle ? ogTitle : StaticDescription}
      />
      <meta
        property="og:description"
        content={ogDescription ? ogDescription : StaticDescription}
      />
      <meta property="og:locale" content="en_GB" />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={ogUrl ? ogUrl : StaticURL} />
      <meta name="og:image" content={ogImage ? ogImage : OgLogo?.src} />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />
      <meta name="og:site_name" content="UrbanServe" />
      {showNoFollow && <meta NAME="robots" CONTENT="noindex,nofollow" />}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WQXTGK4');`,
        }}
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addJsonLd()}
        key="item-jsonld"
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-404213438"
      />
      {createJsonLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={createCustomJsonLD()}
          key="home-jsonld"
        />
      )}
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKuzNoW9BtUlVXhzy56YreXRT71ov4RL8&libraries=places"></script>
      <meta name="theme-color" content={theme.palette.primary.main} />
      <link rel="shortcut icon" href="/site__main__images/favicon.png" />
      <link rel="preload" href="/fonts/Urbanist.ttf" as="font" crossOrigin="" />
      <link
        rel="preload"
        href="/fonts/Urbanist-Bold.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/Urbanist-Regular.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/Urbanist-SemiBold-Bold.ttf"
        as="font"
        crossOrigin=""
      />
    </Head>
  )
}
