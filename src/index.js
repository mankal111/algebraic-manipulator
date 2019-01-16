import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MainComponent from './components/MainComponent';

const store = configureStore();

const Index = ({ expression, onExpressionChange, title }) => (
  <Provider store={store}>
    <MainComponent
      title={title}
      expression={expression}
      onExpressionChange={onExpressionChange}
    />
  </Provider>
);

Index.propTypes = {
  title: PropTypes.string,
  expression: PropTypes.string,
  onExpressionChange: PropTypes.func,
};

Index.defaultProps = {
  title: '',
  expression: '',
  onExpressionChange: () => {},
};

export default Index;
