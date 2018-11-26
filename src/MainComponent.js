import React, {Component} from 'react';
import Expression from './Expression';
import {connect} from 'react-redux';
import {setExpressionTree} from './actions/expressionActions';
import math from 'mathjs';

export class MainComponent extends Component {
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
    this.props.setExpressionTree(expressionTree);
    this.props.onFormulaChange(expressionTree.toString());
  }
  
  render() { 
    return (
      <div className="formulaContainer">
        {
          <Expression
            treeRoot={this.props.expressionTree}
            path='Root'
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    expressionTree: state.expression.expressionTree
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setExpressionTree: expressionTree => dispatch(setExpressionTree(expressionTree)) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent)