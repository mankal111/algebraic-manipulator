import * as types from './actionTypes';

export const setExpressionTree = tree => (
  { type: types.SET_EXPRESSION_TREE, tree }
);

export const setSelectedExpression = (path, node) => (
  { type: types.SET_SELECTED_EXPRESSION, path, node }
);

export const performAction = (actionName, arg1, arg2) => (
  {
    type: types.PERFORM_ACTION,
    actionName,
    arg1,
    arg2,
  }
);
