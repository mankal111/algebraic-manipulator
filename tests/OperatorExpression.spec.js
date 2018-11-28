import expect from 'expect';
import React from 'react';
import { shallow } from '../enzyme';
import { OperatorExpression, mapDispatchToProps } from 'src/OperatorExpression';

describe('OperatorExpression', () => {
  let props;
  let wrapper;
  const operatorExpression = () => {
    if (!wrapper) {
      wrapper = shallow(
        <OperatorExpression {...props} />
      );
    }
    return wrapper;
  }

  beforeEach(() => {
    props = {
      node: {op: '+', args: [{}, {}], fn: 'add'},
      path: 'some path',
      selectedExpressionPath: 'some other path',
      selectExpression: () => {}
    }
    wrapper = undefined;
  })

  it('always renders a span with three children', () => {
    expect(operatorExpression().children().length).toBe(3);
  })

  it('converts \'*\' operator symbol to \'·\'', () => {
    props.node.op = '*';
    expect(operatorExpression().find('.operator').text()).toBe('·');
  })

  it('if it has the same path with the selected one, it has the class \'focus\'', () => {
    props.selectedExpressionPath = props.path;
    expect(operatorExpression().hasClass('focus')).toBeTruthy();
  })

  it('calls \'selectExpression\' callback when operation symbol is clicked', () => {
    const dispatch = expect.createSpy();
    props.selectExpression = mapDispatchToProps(dispatch, props).selectExpression;
    operatorExpression().find('.operator').simulate('click');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SELECTED_EXPRESSION_PATH',
      path: props.path
    });
  })
})