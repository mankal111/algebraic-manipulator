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
    const { action, selectedExpressionNode } = this.props;
    const { name, value } = event.target;
    const otherName = name === 'submenuInput1' ? 'submenuInput2' : 'submenuInput1';
    let otherValue = null;
    if (action.id === 'SplitToSum') {
      otherValue = selectedExpressionNode - value;
    } else if (action.id === 'SplitToProduct') {
      otherValue = selectedExpressionNode / value;
    }
    this.setState({ [name]: value });
    if (otherValue !== null) {
      this.setState({ [otherName]: otherValue });
    }
  }

  mainActionClickHandler() {
    const { triggerAction, action } = this.props;
    const { submenuVisible } = this.state;
    if (['SplitToSum', 'SplitToProduct'].includes(action.id)) {
      this.setState({ submenuVisible: !submenuVisible });
    } else {
      triggerAction(action.title);
    }
  }

  submenuClickHandler() {
    const { triggerAction, action } = this.props;
    const { submenuInput1, submenuInput2 } = this.state;
    const inputs = submenuInput1 && submenuInput2 && [submenuInput1, submenuInput2];
    triggerAction(action.title, inputs);
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
          {action.title}
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
            <span
              onClick={this.submenuClickHandler}
              onKeyPress={this.submenuClickHanlder}
              role="button"
              tabIndex="0"
            >
              OK
            </span>
          </div>
        )}
      </span>
    );
  }
}

export const mapStateToProps = state => ({
  selectedExpressionNode: state.expression.selectedExpressionNode,
});

export const mapDispatchToProps = dispatch => ({
  triggerAction: (actionName, args) => dispatch(performAction(actionName, args)),
});

ActionButton.propTypes = {
  action: PropTypes.shape().isRequired,
  triggerAction: PropTypes.func.isRequired,
  selectedExpressionNode: PropTypes.shape({}),
};

ActionButton.defaultProps = {
  selectedExpressionNode: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionButton);
