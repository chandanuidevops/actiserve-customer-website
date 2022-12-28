let policy = {
  userAgent: '*',
}

if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development') {
  policy.disallow = '/'
}
if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'production') {
  policy.allow = '/'
  policy.disallow = ['/checkout', '/confirmation', '/thank-you']
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [policy],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_APP_URL}/sitemap-0.xml`,
      `${process.env.NEXT_PUBLIC_APP_URL}/server-sitemap.xml`,
    ],
  },
}
