import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './OperatorExpression.less';
import ActionButton from './ActionButton';
import { performAction } from './actions/expressionActions';

export const actionsPerOperator = {
  add: [],
  multiply: [],
  default: ['commutate', 'evaluate'],
};

export const ActionsMenu = (props) => {
  const { operatorFn, actionClick } = props;
  const actionsList = [
    ...actionsPerOperator.default,
    ...actionsPerOperator[operatorFn],
  ];
  return operatorFn && (
    <div className="actionsMenuContainer">
      {actionsList.map(action => (
        <ActionButton
          action={action}
          onClick={actionClick}
        />
      ))}
    </div>
  );
};

export const mapStateToProps = state => ({
  operatorFn: _.get(state, 'expression.selectedExpressionNode.fn'),
});

export const mapDispatchToProps = dispatch => ({
  actionClick: actionName => dispatch(performAction(actionName)),
});

ActionsMenu.propTypes = {
  operatorFn: PropTypes.string,
};

ActionsMenu.defaultProps = {
  operatorFn: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionsMenu);
