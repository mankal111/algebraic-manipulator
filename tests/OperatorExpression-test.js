import expect from 'expect';
import React from 'react';
import { mount } from '../enzyme';
import OperatorExpression from 'src/OperatorExpression';
import math from 'mathjs';

let wrapper;
beforeEach(() => {
    wrapper = mount(
      <OperatorExpression
        node={math.parse("2x + (4 - 3y)")}
      />
    );
});

describe('OperatorExpression', () => {
  it('renders without problems', () => {
    expect(wrapper.exists()).toEqual(true);
  })

  it('should render a div with the correct class', () => {
    expect(wrapper.find('.parenthesisExpression').length).toEqual(1);
    expect(wrapper.find('.addOperator').length).toEqual(1);
    expect(wrapper.find('.subtractOperator').length).toEqual(1);
    expect(wrapper.find('.multiplyOperator').length).toEqual(2);
    expect(wrapper.find('.constantNode').length).toEqual(3);
    expect(wrapper.find('.symbolNode').length).toEqual(2);
  })

  it('should add "focus" class after operator click', () => {
    const operatorExpression = wrapper.find('.operatorExpression').at(1);
    expect(operatorExpression.hasClass('focus')).toEqual(false);
    operatorExpression.find('.operator').first().prop('onClick')();
    expect(operatorExpression.render().hasClass('focus')).toEqual(true);
  })

  it.skip('should remove "focus" class from the previous operatorExpression after new operator click', () => {
    const operatorExpression = wrapper.find('.operatorExpression').at(1);
    const secondOperatorExpression = wrapper.find('.operatorExpression').at(2);
    operatorExpression.find('.operator').first().prop('onClick')();
    expect(operatorExpression.render().hasClass('focus')).toEqual(true);
    expect(secondOperatorExpression.render().hasClass('focus')).toEqual(false);
    secondOperatorExpression.find('.operator').first().prop('onClick')();
    expect(operatorExpression.render().hasClass('focus')).toEqual(false);
    expect(secondOperatorExpression.render().hasClass('focus')).toEqual(true);
  })
})
