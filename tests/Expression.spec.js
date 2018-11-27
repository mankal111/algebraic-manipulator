import expect from 'expect';
import { shallow } from '../enzyme';
import React from 'react';
import Expression from 'src/Expression';
import math from 'mathjs';

// let node, component;
// beforeEach(() => {
//     node = document.createElement('div');
//     component = ReactDOM.render(
//       <Expression
//         treeRoot={math.parse("2x + (4 - 3y)")}
//       />,
//       node
//     );
// });

describe('Expression', () => {
  let props;
  let wrapper;
  const expressionComponent = () => {
    if (!wrapper) {
      wrapper = shallow(
        <Expression {...props} />,
        {context: {store: () => {}}}
      );
    }
    return wrapper;
  }

  beforeEach(() => {
    props = {
      treeRoot: math.parse("2x + (4 - 3y)")
    }
    wrapper = undefined;
  })

  const setExpressionInProps = exp => props.treeRoot = math.parse(exp);

  it('renders an operatorExpression component if the given node is an operator node', () => {
    setExpressionInProps("1+1");
    expect(expressionComponent().name()).toMatch('OperatorExpression');
  })

  it('renders a parenthesisExpression component if the given node is a parenthesis node', () => {
    setExpressionInProps("(1+1)");
    expect(expressionComponent().hasClass('parenthesisExpression')).toBeTruthy();
  })

  it('renders a constant component if the given node is a constant node', () => {
    setExpressionInProps("1");
    expect(expressionComponent().hasClass('constantExpression')).toBeTruthy();
  })

  it('renders a symbol component if the given node is a symbol node', () => {
    setExpressionInProps("x");
    expect(expressionComponent().hasClass('symbolExpression')).toBeTruthy();
  })
})
