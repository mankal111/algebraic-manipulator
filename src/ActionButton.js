import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { performAction } from './actions/expressionActions';

export class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submenuVisible: false,
    };
    this.mainActionClickHandler = this.mainActionClickHandler.bind(this);
  }

  mainActionClickHandler() {
    const { triggerAction, action } = this.props;
    if (['Split To Sum', 'Split To Product'].includes(action)) {
      this.setState({ submenuVisible: true });
    } else {
      triggerAction(action);
    }
  }

  render() {
    const { action } = this.props;
    const { submenuVisible } = this.state;
    return (
      <span className="actionButtonContainer">
        <span
          className="actionButton"
          onClick={this.mainActionClickHandler}
          onKeyPress={this.mainActionClickHandler}
          role="button"
          tabIndex="0"
        >
          {action}
        </span>
        { submenuVisible && <span>submenu</span> }
      </span>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  triggerAction: actionName => dispatch(performAction(actionName)),
});

ActionButton.propTypes = {
  action: PropTypes.string.isRequired,
  triggerAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(ActionButton);
