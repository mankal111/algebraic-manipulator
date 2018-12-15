import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { setSelectedExpression } from './actions/expressionActions';
import './ConstantExpression.less';

export const ConstantExpression = (props) => {
  const {
    node,
    selectedExpressionPath,
    path,
    selectExpression,
  } = props;
  const isSelected = (selectedExpressionPath === path);
  return (
    <span
      className={`constantExpression ${isSelected ? 'focus' : ''}`}
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
};

ConstantExpression.defaultProps = {
  node: {},
  selectedExpressionPath: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConstantExpression);
