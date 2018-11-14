import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'

import Component from 'src/'

var node, component, returnedFormula;
beforeEach(function(){
    node = document.createElement('div');
    component = ReactDOM.render(
      <Component
        formula="1+1"
        onFormulaChange={f => {returnedFormula = f}}
      />,
      node
    );
});

describe('Component', () => {
  it('renders without problems', () => {
    expect(component).toExist();
  })

  it('before any action, onFormulaChange returns the props formula', () => {
    expect(returnedFormula).toEqual("1+1");
    component = ReactDOM.render(
      <Component
        formula="1+1+1"
        onFormulaChange={f => {returnedFormula = f}}
      />,
      node
    );
    expect(returnedFormula).toEqual("1+1+1");
  })
})
