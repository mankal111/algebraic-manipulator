import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './OperatorExpression.less';
import ActionButton from './ActionButton';
import actions from './ListsOfActions';

export class ActionsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAction: null,
    };
    this.selectAction = this.selectAction.bind(this);
  }

  selectAction(actionName) {
    const { selectedAction } = this.state;
    this.setState({
      selectedAction: actionName === selectedAction ? null : actionName,
    });
  }

  render() {
    const { selectedNode: { type } } = this.props;
    const { selectedAction } = this.state;
    const actionsList = actions[type];

    return actionsList ? (
      <div className="actionsMenuContainer">
        {actionsList.map(action => (
          <ActionButton
            action={action}
            key={action.id}
            selected={action.id === selectedAction}
            select={this.selectAction}
          />
        ))}
      </div>
    ) : null;
  }
}

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
