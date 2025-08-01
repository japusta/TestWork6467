self.__BUILD_MANIFEST = {
  polyfillFiles: ['static/chunks/polyfills.js'],
  devFiles: ['static/chunks/react-refresh.js'],
  ampDevFiles: ['static/chunks/webpack.js', 'static/chunks/amp.js'],
  lowPriorityFiles: ['static/development/_buildManifest.js', 'static/development/_ssgManifest.js'],
  rootMainFiles: ['static/chunks/webpack.js', 'static/chunks/main-app.js'],
  pages: {
    '/_app': ['static/chunks/webpack.js', 'static/chunks/main.js', 'static/chunks/pages/_app.js'],
    '/_error': [
      'static/chunks/webpack.js',
      'static/chunks/main.js',
      'static/chunks/pages/_error.js',
    ],
  },
  ampFirstPages: [],
};
