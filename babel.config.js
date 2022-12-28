module.exports = {
  'presets': [
    'next/babel',
  ],
  'env': {
    'test': {
      'presets': [
        [
          'next/babel',
          {
            'preset-env': {
              'modules': 'commonjs',
            },
            "publicRuntimeConfig": {
              "NEXT_PUBLIC_APP_BACKEND_URI": process.env.NEXT_PUBLIC_APP_BACKEND_URI
            },
          },
        ],
      ],
    },
  },
}
