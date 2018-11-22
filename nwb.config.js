module.exports = {
  type: 'react-component',
  karma: {
    testContext: "tests.webpack.js"
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
