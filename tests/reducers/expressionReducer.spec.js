import expect from 'expect';
import math from 'mathjs';
import reducer from '../../src/reducers/expressionReducer';
import initialState from '../../src/reducers/initialState';
import { setExpressionTree, setSelectedExpression, performAction } from '../../src/actions/expressionActions';

describe('expression reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.expression);
  });

  it('handles setExpressionTree action', () => {
    expect(reducer(initialState.expression, setExpressionTree('someTree')))
      .toEqual({
        ...initialState.expression,
        expressionTree: 'someTree',
        selectedExpressionNode: {},
      });
  });

  it('handles setSelectedExpression action', () => {
    expect(reducer(initialState.expression,
      setSelectedExpression('somePath', { name: 'someObject' })))
      .toEqual({
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
    expect(reducer(testState, performAction('commutate')))
      .toEqual({
        ...testState,
        expressionTree: expectedNode,
        selectedExpressionNode: expectedNode,
      });
  });

  it('handles evaluate action', () => {
    const initialNode = math.parse('1+2');
    const expectedNode = math.parse('3');
    delete expectedNode.comment;
    const testState = {
      ...initialState.expression,
      expressionTree: initialNode,
      selectedExpressionNode: initialNode,
      selectedExpressionPath: 'Root',
    };
    expect(reducer(testState, performAction('evaluate')))
      .toEqual({
        ...testState,
        expressionTree: expectedNode,
        selectedExpressionNode: expectedNode,
      });
  });

  it('handles unknown action', () => {
    const initialTree = math.parse('(1+2)+3');
    const selectedNode = initialTree.args[0];
    delete initialTree.comment;
    const testState = {
      ...initialState.expression,
      expressionTree: initialTree,
      selectedExpressionNode: selectedNode,
      selectedExpressionPath: 'Root.args.0',
    };
    expect(reducer(testState, performAction('dance')))
      .toEqual(testState);
  });
});
