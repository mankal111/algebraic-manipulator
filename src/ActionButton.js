import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { performAction } from './actions/expressionActions';

export const ActionButton = (props) => {
  const { action, onClick } = props;
  const onClickHandler = () => {
    onClick(action);
  };
  return (
    <span
      className="actionButton"
      onClick={onClickHandler}
      onKeyPress={onClickHandler}
      role="button"
      tabIndex="0"
    >
      {action}
    </span>
  );
};

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
