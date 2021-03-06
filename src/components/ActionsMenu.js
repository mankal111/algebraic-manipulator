import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ActionButton from './ActionButton';
import actions from '../ListsOfActions';

const styles = {
  menu: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: 9,
  },
};

export class ActionsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAction: null,
    };
    this.selectAction = this.selectAction.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ selectedAction: null });
  }

  selectAction(actionName) {
    const { selectedAction } = this.state;
    this.setState({
      selectedAction: actionName === selectedAction ? null : actionName,
    });
  }

  render() {
    const { selectedNode: { type }, classes } = this.props;
    const { selectedAction } = this.state;
    const actionsList = actions[type];

    return actionsList ? (
      <div className={classes.menu}>
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
  classes: PropTypes.shape({}).isRequired,
};

ActionsMenu.defaultProps = {
  selectedNode: {},
};

export default connect(
  mapStateToProps,
)(withStyles(styles)(ActionsMenu));
