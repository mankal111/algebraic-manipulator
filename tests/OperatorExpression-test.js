import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import OperatorExpression from 'src/OperatorExpression'
import math from 'mathjs'
import ReactTestUtils from 'react-dom/test-utils'

let node, component, reactComponent;
beforeEach(() => {
    node = document.createElement('div');
    component = ReactDOM.render(
      <OperatorExpression
        node={math.parse("2x + (4 - 3y)")}
        ref={node => reactComponent = node}
      />,
      node
    );
});

describe('OperatorExpression', () => {
  it('renders without problems', () => {
    expect(component).toExist();
  })

  it('should render a div with the correct class', () => {
    expect(node.getElementsByClassName('parenthesisExpression').length).toEqual(1);
    expect(node.getElementsByClassName('addOperator').length).toEqual(1);
    expect(node.getElementsByClassName('subtractOperator').length).toEqual(1);
    expect(node.getElementsByClassName('multiplyOperator').length).toEqual(2);
    expect(node.getElementsByClassName('constantNode').length).toEqual(3);
    expect(node.getElementsByClassName('symbolNode').length).toEqual(2);
  })

  it('should add "focus" class after operator click', () => {
    const addOperator = node.getElementsByClassName('operatorExpression')[0];
    expect(addOperator.classList.contains('focus')).toEqual(false);
    // need to find a way to simulate a click event
    // ReactTestUtils.Simulate.click(reactComponent.querySelector('.Operator'));
    // expect(addOperator.classList.contains('focus')).toEqual(true);
  })
})
