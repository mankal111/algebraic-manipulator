import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { setSelectedExpression } from '../actions/expressionActions';
import Expression from './Expression';

const styles = {
  focus: {
    backgroundColor: 'paleturquoise',
    '&>.operator': {
      backgroundColor: 'yellowgreen',
    },
  },
  operator: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(144, 137, 137, 0.15)',
    },
  },
};

export const OperatorExpression = (props) => {
  const {
    node,
    selectedExpressionPath,
    path,
    selectExpression,
    classes,
  } = props;
  const opSymbol = node.op === '*' ? '·' : node.op;
  const isSelected = (selectedExpressionPath === path);
  return (
    <span className={`${classes.operatorExpression} ${isSelected ? classes.focus : ''}`}>
      <Expression
        treeRoot={node.args[0]}
        path={`${path}.args[0]`}
      />
      <span
        className={`${node.fn}Operator operator`}
        onClick={selectExpression}
        onKeyPress={selectExpression}
        role="radio"
        tabIndex="0"
        aria-checked={isSelected}
      >
        {opSymbol}
      </span>
      <Expression
        treeRoot={node.args[1]}
        path={`${path}.args[1]`}
      />
    </span>
  );
};

export const mapStateToProps = state => ({
  selectedExpressionPath: state.expression.selectedExpressionPath,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  selectExpression: () => dispatch(setSelectedExpression(ownProps.path, ownProps.node)),
});

OperatorExpression.propTypes = {
  node: PropTypes.shape({}),
  path: PropTypes.string.isRequired,
  selectExpression: PropTypes.func.isRequired,
  selectedExpressionPath: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
};

OperatorExpression.defaultProps = {
  node: {},
  selectedExpressionPath: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(OperatorExpression));
