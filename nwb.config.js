module.exports = {
  type: 'react-component',
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
