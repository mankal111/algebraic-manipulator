import * as types from './actionTypes';

export const setExpressionTree = tree => (
  { type: types.SET_EXPRESSION_TREE, tree }
);

export const setSelectedExpressionPath = path => (
  { type: types.SET_SELECTED_EXPRESSION_PATH, path }
);
