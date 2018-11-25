import React, {Component} from 'react';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import MainComponent from './MainComponent';
import './index.less';

const store = configureStore();

export default class extends Component {
  render() {
    return (<Provider store={store}>
      <MainComponent
        formula={this.props.formula}
        onFormulaChange={this.props.onFormulaChange}
      />
    </Provider>);
  }
}
