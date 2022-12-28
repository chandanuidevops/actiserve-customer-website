const path = require('path')
const withSass = require('@zeit/next-sass')

const withImages = require('next-images')
module.exports = {
  // basePath: "http://actiserve.slicktechnologies.co.uk/",
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, './Assets/styles')],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/test',
        destination: '/london', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     // '/london': { page: '/:slug', query: {slug: 'london'} },
  //     // '/leicester': { page: '/:slug', query: {slug: 'leicester'} },
  //   }
  // },
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    // Important: return the modified config
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   issuer: {
    //     test: /\.(js|ts)x?$/,
    //   },
    //   use: ['@svgr/webpack'],
    // });
    return config
  },
}
module.exports = withImages({
  // fileExtensions: ["jpg", "jpeg", "png", "gif"],
  esModule: true,
  inlineImageLimit: false,
})

module.exports = withSass({
  /* bydefault config  option Read For More Optios
  here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
  cssModules: true,
})

module.exports = {
  module: {
    // apply loaders to files that meet given conditions
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        },
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
      },
    ],
  },
}
module.exports = {
  images: {
    domains: ['assets.urbanserve.co.uk', 'd3qcvvb43jhmrb.cloudfront.net'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/tradesman',
        destination: '/tradespeople',
        permanent: true,
      },
    ]
  },
}
