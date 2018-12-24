import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { performAction } from './actions/expressionActions';

export class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submenuVisible: false,
      submenuInput1: 0,
      submenuInput2: 0,
    };
    this.mainActionClickHandler = this.mainActionClickHandler.bind(this);
    this.submenuClickHandler = this.submenuClickHandler.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  mainActionClickHandler() {
    const { triggerAction, action } = this.props;
    const { submenuVisible } = this.state;
    if (['Split To Sum', 'Split To Product'].includes(action)) {
      this.setState({ submenuVisible: !submenuVisible });
    } else {
      triggerAction(action);
    }
  }

  submenuClickHandler() {
    const { triggerAction, action } = this.props;
    const { submenuInput1, submenuInput2 } = this.state;
    triggerAction(action, submenuInput1, submenuInput2);
  }

  render() {
    const { action } = this.props;
    const { submenuVisible, submenuInput1, submenuInput2 } = this.state;
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
        { submenuVisible && (
          <div>
            <input
              name="submenuInput1"
              onChange={this.onInputChange}
              value={submenuInput1}
            />
            <input
              name="submenuInput2"
              onChange={this.onInputChange}
              value={submenuInput2}
            />
            <span onClick={this.submenuClickHandler}>OK</span>
          </div>
        )}
      </span>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  triggerAction: (actionName, arg1, arg2) => dispatch(performAction(actionName, arg1, arg2)),
});

ActionButton.propTypes = {
  action: PropTypes.string.isRequired,
  triggerAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(ActionButton);
