module.exports = {
  type: 'react-component',
  karma: {
    testContext: "tests.webpack.js",
    excludeFromCoverage: [
      "src/store/configureStore.js"
    ]
  },
  npm: {
    esModules: true,
    umd: {
      global: 'AlgebraicManipulator',
      externals: {
        react: 'React'
      }
    }
  }
}
