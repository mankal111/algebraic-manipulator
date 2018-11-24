import * as types from './actionTypes';

export const setExpressionTree = tree => {
    return {type: types.SET_EXPRESSION_TREE, tree};
}

export const setSelectedExpressionPath = path => {
    return {type: types.SET_SELECTED_EXPRESSION_PATH, path};
}