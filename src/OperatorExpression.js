import { connect } from 'react-redux';
import React from 'react';
import { setSelectedExpressionPath } from './actions/expressionActions';
import Expression from './Expression';
import './OperatorExpression.less';

export const OperatorExpression = (props) => {
  const { node } = props;
  const opSymbol = node.op === '*' ? '·' : node.op; 
  const isSelected = (props.selectedExpressionPath === props.path);
  return (
    <span className={`operatorExpression ${isSelected ? 'focus' : ''}`}>
      <Expression
        treeRoot={node.args[0]}
        path={`${props.path}.args[0]`}
      />
      <span
        className={`${node.fn}Operator operator`}
        onClick={props.selectExpression}
      >
        {opSymbol}
      </span>
      <Expression
        treeRoot={node.args[1]}
        path={`${props.path}.args[1]`}
      />
    </span>
  );
}

export const mapStateToProps = (state) => {
  return {
    selectedExpressionPath: state.expression.selectedExpressionPath
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectExpression: () => dispatch(setSelectedExpressionPath(ownProps.path)) 
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OperatorExpression);
