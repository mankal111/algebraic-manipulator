import initialState from './initialState';
import {SET_EXPRESSION_TREE, SET_SELECTED_EXPRESSION_PATH} from '../actions/actionTypes';

export default (state = initialState.expression, action) => {
    switch (action.type) {
        case SET_EXPRESSION_TREE:
            return {...state, expressionTree: action.tree};
        case SET_SELECTED_EXPRESSION_PATH:
            return {...state, selectedExpressionPath: action.path};
        default:
            return state;
    }
}