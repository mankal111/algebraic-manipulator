import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import Component from 'src/'

let node, component, returnedFormula;
beforeEach(() => {
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

  it('should call onFormulaChange with the props formula, before any other action', () => {
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

  it('should render the right amount of divs, one for each first level node', () => {
    expect(node.getElementsByClassName('formulaContainer')[0].children.length).toEqual(1);
  })
})
