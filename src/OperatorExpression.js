import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { setSelectedExpressionPath } from './actions/expressionActions';
import Expression from './Expression';
import './OperatorExpression.less';

export const OperatorExpression = (props) => {
  const {
    node,
    selectedExpressionPath,
    path,
    selectExpression,
  } = props;
  const opSymbol = node.op === '*' ? '·' : node.op;
  const isSelected = (selectedExpressionPath === path);
  return (
    <span className={`operatorExpression ${isSelected ? 'focus' : ''}`}>
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
  selectExpression: () => dispatch(setSelectedExpressionPath(ownProps.path)),
});

OperatorExpression.propTypes = {
  node: PropTypes.shape({}),
  path: PropTypes.string.isRequired,
  selectExpression: PropTypes.func,
  selectedExpressionPath: PropTypes.string,
};

OperatorExpression.defaultProps = {
  node: {},
  selectExpression: () => {},
  selectedExpressionPath: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OperatorExpression);
