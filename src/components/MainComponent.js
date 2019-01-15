import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import math from 'mathjs';
import { Paper, withStyles } from '@material-ui/core';
import Expression from './Expression';
import ActionsMenu from './ActionsMenu';
import { setExpressionTree } from '../actions/expressionActions';

const styles = {
  root: {
    margin: 18,
    padding: 18,
    maxWidth: 400,
    fontSize: 35,
  },
};

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
    const { expressionTree, classes } = this.props;
    return (
      <Paper className={classes.root}>
        {
          <Expression
            treeRoot={expressionTree}
            path="Root"
          />
        }
        <ActionsMenu />
      </Paper>
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
  classes: PropTypes.shape({}).isRequired,
};

MainComponent.defaultProps = {
  expression: '',
  expressionTree: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainComponent));
