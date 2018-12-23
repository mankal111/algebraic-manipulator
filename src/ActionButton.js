import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { performAction } from './actions/expressionActions';

export class ActionButton extends Component {
  constructor() {
    super();
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    const { onClick, action } = this.props;
    onClick(action);
  }

  render() {
    const { action } = this.props;
    return (
      <span
        className="actionButton"
        onClick={this.onClickHandler}
        onKeyPress={this.onClickHandler}
        role="button"
        tabIndex="0"
      >
        {action}
      </span>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  onClick: actionName => dispatch(performAction(actionName)),
});

ActionButton.propTypes = {
  action: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(ActionButton);
