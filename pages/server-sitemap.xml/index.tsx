import {getServerSideSitemap} from 'next-sitemap'
import {GetServerSideProps} from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/end-of-tenancy-or-deep-cleaning`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/carpet-and-upholstery-cleaning`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/gutter-cleaning`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/boiler-service-and-health-check`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/mobile-car-valeting`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    //
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/landing/end-of-tenancy-or-deep-cleaning`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/landing/carpet-and-upholstery-cleaning`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/landing/gutter-cleaning`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_APP_URL}/leicester/landing/mobile-car-valeting`,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
  ]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
