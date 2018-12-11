import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = (props) => {
  const { action, onClick } = props;
  const onClickHandler = () => {
    onClick(action);
  };
  return (
    <span
      key={action}
      onClick={onClickHandler}
      onKeyPress={onClickHandler}
      role="button"
      tabIndex="0"
    >
      {action}
    </span>
  );
};

ActionButton.propTypes = {
  action: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
