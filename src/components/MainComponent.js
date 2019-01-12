import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import math from 'mathjs';
import Expression from './Expression';
import ActionsMenu from './ActionsMenu';
import { setExpressionTree } from '../actions/expressionActions';
import './MainComponent.less';

export class MainComponent extends Component {
  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    const { expression, onExpressionChange, expressionTree } = this.props;
    if (expression !== prevProps.expression) {
      this.initialize();
    }
    onExpressionChange(expressionTree.toString({ parenthesis: 'auto' }));
  }

  initialize() {
    const { expression, setExpressionTreeOnState } = this.props;
    const expressionTree = math.parse(expression);
    setExpressionTreeOnState(expressionTree);
  }

  render() {
    const { expressionTree } = this.props;
    return (
      <div className="mainContainer">
        <div className="expressionContainer">
          {
            <Expression
              treeRoot={expressionTree}
              path="Root"
            />
          }
        </div>
        <ActionsMenu />
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
  expression: PropTypes.string,
  onExpressionChange: PropTypes.func.isRequired,
  setExpressionTreeOnState: PropTypes.func.isRequired,
  expressionTree: PropTypes.shape({}),
};

MainComponent.defaultProps = {
  expression: '',
  expressionTree: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainComponent);
