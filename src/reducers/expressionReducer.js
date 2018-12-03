import initialState from './initialState';
import { SET_EXPRESSION_TREE, SET_SELECTED_EXPRESSION } from '../actions/actionTypes';

export default (state = initialState.expression, action) => {
  switch (action.type) {
  case SET_EXPRESSION_TREE:
    return { ...state, expressionTree: action.tree };
  case SET_SELECTED_EXPRESSION:
    return { ...state, selectedExpressionPath: action.path, selectedExpressionNode: action.node };
  default:
    return state;
  }
};
