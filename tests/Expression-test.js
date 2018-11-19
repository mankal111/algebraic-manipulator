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

describe('Expression', () => {
  it('renders without problems', () => {
    expect(component).toExist();
  })
})
