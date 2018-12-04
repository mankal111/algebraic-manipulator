import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './OperatorExpression.less';

export const actionsPerOperator = {
  add: [],
  multiply: [],
  default: ['evaluate', 'commutate'],
};

export const ActionsMenu = (props) => {
  const { operatorFn } = props;
  const actionsList = [
    ...actionsPerOperator.default,
    ...actionsPerOperator[operatorFn],
  ];
  return operatorFn && (
    <div className="actionsMenuContainer">
      {actionsList.map(action => <span key={action}>{action}</span>)}
    </div>
  );
}

export const mapStateToProps = state => ({
  operatorFn: _.get(state, 'expression.selectedExpressionNode.fn'),
});

ActionsMenu.propTypes = {
  operatorFn: PropTypes.string,
};

ActionsMenu.defaultProps = {
  operatorFn: '',
};

export default connect(
  mapStateToProps,
)(ActionsMenu);
