import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import Expression from 'src/Expression'
import math from 'mathjs'

let node, component;
beforeEach(() => {
    node = document.createElement('div');
    component = ReactDOM.render(
      <Expression
        treeRoot={math.parse("2x + (4 - 3y)")}
      />,
      node
    );
});

describe('Component', () => {
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
})
