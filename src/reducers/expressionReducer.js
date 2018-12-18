import _ from 'lodash';
import math from 'mathjs';
import initialState from './initialState';
import {
  SET_EXPRESSION_TREE,
  SET_SELECTED_EXPRESSION,
  PERFORM_ACTION,
} from '../actions/actionTypes';

const getTrimmedPath = path => path.replace(/Root?./, '');

const performActionOnTree = (state, actionName) => {
  const newTree = state.expressionTree.cloneDeep();
  const selectedPath = getTrimmedPath(state.selectedExpressionPath);
  const selectedNode = state.selectedExpressionNode;
  let newNode = selectedNode;
  switch (actionName) {
  case 'commutate':
    // mathjs creates a subtraction operation,
    // which causes problem in operation commutation (1-2=2-1)
    // so if the operation is subtraction, we turn it to addition
    // and negate the second operant before the commutation
    if (selectedNode.fn === 'subtract') {
      if (selectedNode.args[1].type === 'ConstantNode') {
        selectedNode.args[1] = new math.expression.node.ConstantNode(-selectedNode.args[1].value);
      }
      newNode = new math.expression.node.OperatorNode(
        '+',
        'add',
        [selectedNode.args[1], selectedNode.args[0]],
      );
    } else {
      newNode = new math.expression.node.OperatorNode(
        selectedNode.op,
        selectedNode.fn,
        [selectedNode.args[1], selectedNode.args[0]],
      );
    }
    break;
  case 'evaluate':
    newNode = new math.expression.node.ConstantNode(selectedNode.eval());
    break;
  default:
    break;
  }
  return {
    expressionTree: selectedPath === '' ? newNode
      : _.set(
        newTree,
        selectedPath,
        newNode,
      ),
    selectedExpressionNode: newNode,
  };
};

export default (state = initialState.expression, action) => {
  switch (action.type) {
  case SET_EXPRESSION_TREE:
    return { ...state, expressionTree: action.tree, selectedExpressionNode: {} };
  case SET_SELECTED_EXPRESSION:
    return {
      ...state,
      selectedExpressionPath: action.path,
      selectedExpressionNode: action.node,
    };
  case PERFORM_ACTION:
    return { ...state, ...performActionOnTree(state, action.actionName) };
  default:
    return state;
  }
};
