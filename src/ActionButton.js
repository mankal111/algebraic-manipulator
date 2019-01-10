import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { performAction } from './actions/expressionActions';

export class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submenuInputs: [],
    };
    this.mainActionClickHandler = this.mainActionClickHandler.bind(this);
    this.submenuClickHandler = this.submenuClickHandler.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const { action, selectedExpressionNode } = this.props;
    const { name, value } = event.target;
    const { submenuInputs } = this.state;
    const otherName = name === 1 ? 2 : 1;
    const otherValue = action.inputsRelation
      ? action.inputsRelation(selectedExpressionNode, value)
      : null;
    const newInputs = [...submenuInputs];
    newInputs[name] = Number.parseInt(value, 10);
    if (otherValue !== null) {
      newInputs[otherName] = otherValue;
    }
    this.setState({ submenuInputs: newInputs });
  }

  mainActionClickHandler(event) {
    const {
      triggerAction,
      action,
      selectedExpressionNode: { value },
      select,
    } = this.props;
    select(event.target.getAttribute('name'));
    if (['SplitToSum', 'SplitToProduct'].includes(action.id)) {
      let inputs = [];
      if (action.inputsRelation) {
        inputs = [
          value,
          action.inputsRelation(value, value),
        ];
      } else {
        action.submenuStructure.forEach(item => (item.type === 'input') && inputs.push(0));
      }
      this.setState({ submenuInputs: inputs });
    } else {
      triggerAction(action.title);
    }
  }

  submenuClickHandler() {
    const { triggerAction, action } = this.props;
    const { submenuInputs } = this.state;
    triggerAction(action.title, submenuInputs);
  }

  render() {
    const { action, selected } = this.props;
    const { submenuInputs } = this.state;
    let currentInputIndex = -1;
    return (
      <span className="actionButtonContainer">
        <span
          className="actionButton"
          name={action.id}
          onClick={this.mainActionClickHandler}
          onKeyPress={this.mainActionClickHandler}
          role="button"
          tabIndex="0"
        >
          {action.title}
        </span>
        { selected && action.submenuStructure && (
          <div>
            { action.submenuStructure.map((item, i) => {
              switch (item.type) {
              case 'input':
                currentInputIndex += 1;
                return (
                  <input
                    name={currentInputIndex}
                    onChange={this.onInputChange}
                    value={submenuInputs[currentInputIndex]}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${i}`}
                  />
                );
              case 'text': return (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${i}`}
                >
                  {item.content}
                </span>
              );
              case 'button': return (
                <span
                  onClick={item.triggerAction && this.submenuClickHandler}
                  onKeyPress={item.triggerAction && this.submenuClickHanlder}
                  role="button"
                  tabIndex="0"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${i}`}
                >
                  {item.text}
                </span>
              );
              default:
                return null;
              }
            })
            }
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
  selected: PropTypes.bool,
  select: PropTypes.func.isRequired,
};

ActionButton.defaultProps = {
  selectedExpressionNode: {},
  selected: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionButton);
