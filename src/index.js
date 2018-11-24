import React, {Component} from 'react';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Expression from './Expression';
import math from 'mathjs';
import './index.less';

const store = configureStore();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialFormula: '',
      currentFormula: '',
      selectedNodePath: ''
    }
    this.initialize = this.initialize.bind(this);
    this.selectNode = this.selectNode.bind(this);
  }

  componentDidMount() {
    this.initialize()
  }

  componentDidUpdate(prevProps) {
    if (this.props.formula !== prevProps.formula) {
      this.initialize();
    }
  }

  initialize() {
    const expressionTree = math.parse(this.props.formula);
    this.setState(
      {
        initialFormula: expressionTree,
        currentFormula: expressionTree
      },
      () => this.props.onFormulaChange(this.state.currentFormula.toString())
    );
  }

  selectNode(path) {
    this.setState({selectedNodePath: path});
  }
  
  render() {
    return (<Provider store={store}>
      <div className="formulaContainer">
      {
        this.state.currentFormula && 
        <Expression
          treeRoot={this.state.currentFormula}
          path='Root'
          selectNode={this.selectNode}
          selectedNodePath={this.state.selectedNodePath}
        />
      }
      </div>
    </Provider>);
  }
}
