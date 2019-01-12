import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MainComponent from './components/MainComponent';

const store = configureStore();

const Index = ({ expression, onExpressionChange }) => (
  <Provider store={store}>
    <MainComponent
      expression={expression}
      onExpressionChange={onExpressionChange}
    />
  </Provider>
);

Index.propTypes = {
  expression: PropTypes.string,
  onExpressionChange: PropTypes.func,
};

Index.defaultProps = {
  expression: '',
  onExpressionChange: () => {},
};

export default Index;
