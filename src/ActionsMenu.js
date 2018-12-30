import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './OperatorExpression.less';
import ActionButton from './ActionButton';

export const actionsPerOperator = {
  add: [],
  subtract: [],
  multiply: [],
  default: ['Evaluate', 'Commutate', 'Associative'],
};

export const actionsForConstant = [
  'Split To Sum',
  'Split To Product',
];

export const ActionsMenu = (props) => {
  const { selectedNode: { type, fn } } = props;
  let actionsList;
  if (type === 'OperatorNode') {
    actionsList = [
      ...actionsPerOperator.default,
      ...actionsPerOperator[fn],
    ];
  } else if (type === 'ConstantNode') {
    actionsList = actionsForConstant;
  }

  return actionsList ? (
    <div className="actionsMenuContainer">
      {actionsList.map(action => (
        <ActionButton
          action={action}
          key={action}
        />
      ))}
    </div>
  ) : null;
};

export const mapStateToProps = state => ({
  selectedNode: state.expression.selectedExpressionNode,
});

ActionsMenu.propTypes = {
  selectedNode: PropTypes.shape(),
};

ActionsMenu.defaultProps = {
  selectedNode: {},
};

export default connect(
  mapStateToProps,
)(ActionsMenu);
