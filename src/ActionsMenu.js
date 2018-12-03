import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import './OperatorExpression.less';

export const ActionsMenu = (props) => {
  const {
    actionsList,
  } = props;
  return (
    <span className="actionsMenuContainer">
      {actionsList.map(action => <span key={action}>{action}</span>)}
    </span>
  );
};

export const mapStateToProps = state => ({
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
});

ActionsMenu.propTypes = {
  actionsList: PropTypes.arrayOf({}),
};

ActionsMenu.defaultProps = {
  actionsList: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionsMenu);
