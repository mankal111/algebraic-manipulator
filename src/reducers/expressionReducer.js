import initialState from './initialState';
import {
  SET_EXPRESSION_TREE,
  SET_SELECTED_EXPRESSION,
  PERFORM_ACTION,
} from '../actions/actionTypes';
import { performActionOnTree } from './expressionUtils';

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
    return { ...state, ...performActionOnTree(state, action.actionName, action.args) };
  default:
    return state;
  }
};
