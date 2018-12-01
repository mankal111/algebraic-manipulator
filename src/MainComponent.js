import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import math from 'mathjs';
import Expression from './Expression';
import { setExpressionTree } from './actions/expressionActions';

export class MainComponent extends Component {
  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    const { formula } = this.props;
    if (formula !== prevProps.formula) {
      this.initialize();
    }
  }

  initialize() {
    const { formula, onFormulaChange, setExpressionTreeOnState } = this.props;
    const expressionTree = math.parse(formula);
    setExpressionTreeOnState(expressionTree);
    onFormulaChange(expressionTree.toString());
  }

  render() {
    const { expressionTree } = this.props;
    return (
      <div className="formulaContainer">
        {
          <Expression
            treeRoot={expressionTree}
            path="Root"
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expressionTree: state.expression.expressionTree,
});

const mapDispatchToProps = dispatch => ({
  setExpressionTreeOnState: expressionTree => dispatch(setExpressionTree(expressionTree)),
});

MainComponent.propTypes = {
  formula: PropTypes.string,
  onFormulaChange: PropTypes.func,
  setExpressionTreeOnState: PropTypes.func.isRequired,
  expressionTree: PropTypes.shape({}),
};

MainComponent.defaultProps = {
  formula: '',
  onFormulaChange: () => {},
  expressionTree: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainComponent);
