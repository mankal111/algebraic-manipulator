import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MainComponent from './MainComponent';
import './index.less';

const store = configureStore();

const Index = ({ formula, onFormulaChange }) => (
  <Provider store={store}>
    <MainComponent
      formula={formula}
      onFormulaChange={onFormulaChange}
    />
  </Provider>
);

Index.propTypes = {
  formula: PropTypes.string,
  onFormulaChange: PropTypes.func,
};

Index.defaultProps = {
  formula: '',
  onFormulaChange: () => {},
};
