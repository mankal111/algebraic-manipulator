import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import MainComponent from '../src';

describe('MainComponent', () => {
  let props;
  let mountedMainComponent;
  const mainComponent = () => {
    if (!mountedMainComponent) {
      mountedMainComponent = mount(
        <MainComponent {...props} />,
      );
    }
    return mountedMainComponent;
  };

  beforeEach(() => {
    props = {
      expression: '1',
      onExpressionChange: () => {},
    };
    mountedMainComponent = undefined;
  });

  it('always renders a div', () => {
    const container = mainComponent().find('.mainContainer');
    expect(container).toExist();
  });

  it('calls onExpressionChange when props formula is changed', () => {
    const spy = expect.spyOn(props, 'onExpressionChange');
    mainComponent();
    expect(spy).toHaveBeenCalledWith('1');
    mainComponent().setProps({ expression: '2' });
    expect(spy).toHaveBeenCalledWith('2');
  });
});
