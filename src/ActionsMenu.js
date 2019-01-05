import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './OperatorExpression.less';
import ActionButton from './ActionButton';

export const actionsForOperator = [
  { title: 'Evaluate', id: 'Evaluate' },
  { title: 'Commutate', id: 'Commutate' },
  { title: 'Associative', id: 'Associative' },
];

export const actionsForConstant = [
  { title: 'Split To Sum', id: 'SplitToSum', inputsRelation: (constant, input) => constant - input },
  { title: 'Split To Product', id: 'SplitToProduct', inputsRelation: (constant, input) => constant / input },
];

export const ActionsMenu = (props) => {
  const { selectedNode: { type } } = props;
  const actionsList = (type === 'OperatorNode') ? actionsForOperator : actionsForConstant;

  return actionsList ? (
    <div className="actionsMenuContainer">
      {actionsList.map(action => (
        <ActionButton
          action={action}
          key={action.id}
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
