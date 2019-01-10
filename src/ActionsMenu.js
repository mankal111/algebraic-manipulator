import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import './OperatorExpression.less';
import ActionButton from './ActionButton';
import actions from './ListsOfActions';

export const ActionsMenu = (props) => {
  const { selectedNode: { type } } = props;
  const actionsList = actions[type];

  return actionsList ? (
    <div className="actionsMenuContainer">
      {actionsList.map(action => (
        <ActionButton
          action={action}
          key={action.id}
          selected={true}
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
