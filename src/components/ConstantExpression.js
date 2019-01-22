import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { setSelectedExpression } from '../actions/expressionActions';

const styles = {
  constantExpression: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(144, 137, 137, 0.15)',
    },
  },
  focus: {
    backgroundColor: 'paleturquoise',
  },
};

export const ConstantExpression = (props) => {
  const {
    node,
    selectedExpressionPath,
    path,
    selectExpression,
    classes,
  } = props;
  const isSelected = (selectedExpressionPath === path);
  return (
    <span
      className={`${classes.constantExpression} ${isSelected ? classes.focus : ''}`}
      onClick={selectExpression}
      onKeyPress={selectExpression}
      role="radio"
      tabIndex="0"
      aria-checked={isSelected}
    >
      {node.value}
    </span>
  );
};

export const mapStateToProps = state => ({
  selectedExpressionPath: state.expression.selectedExpressionPath,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  selectExpression: () => dispatch(setSelectedExpression(ownProps.path, ownProps.node)),
});

ConstantExpression.propTypes = {
  node: PropTypes.shape({}),
  path: PropTypes.string.isRequired,
  selectExpression: PropTypes.func.isRequired,
  selectedExpressionPath: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
};

ConstantExpression.defaultProps = {
  node: {},
  selectedExpressionPath: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ConstantExpression));
