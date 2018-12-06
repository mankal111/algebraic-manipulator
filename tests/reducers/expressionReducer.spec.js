import expect from 'expect';
import math from 'mathjs';
import reducer from '../../src/reducers/expressionReducer';
import initialState from '../../src/reducers/initialState';
import { SET_EXPRESSION_TREE, SET_SELECTED_EXPRESSION, PERFORM_ACTION } from '../../src/actions/actionTypes';

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
      selectedExpressionNode: {},
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

  it('handles commutate action', () => {
    const initialNode = math.parse('1+x');
    const expectedNode = math.parse('x+1');
    delete expectedNode.comment;
    const testState = {
      ...initialState.expression,
      expressionTree: initialNode,
      selectedExpressionNode: initialNode,
      selectedExpressionPath: 'Root',
    };
    expect(reducer(testState, {
      type: PERFORM_ACTION,
      actionName: 'commutate',
    })).toEqual({
      ...testState,
      expressionTree: expectedNode,
      selectedExpressionNode: expectedNode,
    });
  });

  it('handles commutate action', () => {
    const initialNode = math.parse('1+2');
    const expectedNode = math.parse('3');
    delete expectedNode.comment;
    const testState = {
      ...initialState.expression,
      expressionTree: initialNode,
      selectedExpressionNode: initialNode,
      selectedExpressionPath: 'Root',
    };
    expect(reducer(testState, {
      type: PERFORM_ACTION,
      actionName: 'evaluate',
    })).toEqual({
      ...testState,
      expressionTree: expectedNode,
      selectedExpressionNode: expectedNode,
    });
  });
});
