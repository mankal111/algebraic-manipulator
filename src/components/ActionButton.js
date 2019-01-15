import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button } from '@material-ui/core';
import { performAction } from '../actions/expressionActions';
import './ActionButton.less';

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
    let { name, value } = event.target;
    const { submenuInputs } = this.state;
    name = Number.parseInt(name, 10);
    value = Number.parseInt(value, 10) || 0;
    const otherName = name === 0 ? 1 : 0;
    const otherValue = action.inputsRelation
      ? action.inputsRelation(selectedExpressionNode, value)
      : null;
    const newInputs = [...submenuInputs];
    newInputs[name] = value;
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
    select(event.currentTarget.name);
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

  submenuClickHandler(event) {
    const { triggerAction, action } = this.props;
    const { submenuInputs } = this.state;
    const args = submenuInputs.length ? submenuInputs : [event.currentTarget.dataset.value];
    triggerAction(action.title, args);
  }

  render() {
    const { action, selected, selectedExpressionNode: { op } } = this.props;
    const { submenuInputs } = this.state;
    let currentInputIndex = -1;
    return (
      <div className="actionButtonContainer">
        <Button
          className="actionButton"
          variant="contained"
          color="primary"
          name={action.id}
          onClick={this.mainActionClickHandler}
          onKeyPress={this.mainActionClickHandler}
        >
          {action.title}
        </Button>
        { selected && action.submenuStructure && (
          <div className="submenu">
            { action.submenuStructure.map((item, i) => {
              switch (item.type) {
              case 'input':
                currentInputIndex += 1;
                return (
                  <Input
                    name={currentInputIndex}
                    onChange={this.onInputChange}
                    value={submenuInputs[currentInputIndex]}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${i}`}
                    margin="normal"
                    variant="filled"
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
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={item.triggerAction && this.submenuClickHandler}
                  onKeyPress={item.triggerAction && this.submenuClickHanlder}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${i}`}
                  data-value={item.value}
                >
                  {item.text.replace(/\$op\$/g, op === '*' ? '·' : op)}
                </Button>
              );
              default:
                return null;
              }
            })
            }
          </div>
        )}
      </div>
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
