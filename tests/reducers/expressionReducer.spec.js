import expect from 'expect';
import reducer from '../../src/reducers/expressionReducer';
import initialState from '../../src/reducers/initialState';
import { SET_EXPRESSION_TREE, SET_SELECTED_EXPRESSION } from '../../src/actions/actionTypes';

describe('expression reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.expression);
  });

  it('handles setExpressionTree action', () => {
    expect(reducer(initialState.expression, {
      type: SET_EXPRESSION_TREE,
      tree: 'someTree',
    })).toEqual({
      ...initialState.expression,
      expressionTree: 'someTree',
    });
  });

  it('handles setSelectedExpressionPath action', () => {
    expect(reducer(initialState.expression, {
      type: SET_SELECTED_EXPRESSION,
      path: 'somePath',
      node: { name: 'someObject' },
    })).toEqual({
      ...initialState.expression,
      selectedExpressionPath: 'somePath',
      selectedExpressionNode: { name: 'someObject' },
    });
  });
});
