import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import OperatorExpression from 'src/OperatorExpression'
import math from 'mathjs'
import ReactTestUtils from 'react-dom/test-utils'

let node, component;
beforeEach(() => {
    node = document.createElement('div');
    component = ReactDOM.render(
      <OperatorExpression
        node={math.parse("2x + (4 - 3y)")}
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
    component = ReactTestUtils.renderIntoDocument(
      <OperatorExpression
        node={math.parse("2 + 4")}
      />
    );
    const operatorExpression = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'operatorExpression')[0];
    const operator = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'Operator')[0];
    expect(operatorExpression.classList.contains('focus')).toEqual(false);
    ReactTestUtils.Simulate.click(operator);
    expect(operatorExpression.classList.contains('focus')).toEqual(true);
  })
})
