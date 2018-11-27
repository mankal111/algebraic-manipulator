import expect from 'expect';
import { mount } from '../enzyme';
import React from 'react';
import MainComponent from 'src/';

describe('MainComponent', () => {
  let props;
  let mountedMainComponent;
  const mainComponent = () => {
    if (!mountedMainComponent) {
      mountedMainComponent = mount(
        <MainComponent {...props} />
      );
    }
    return mountedMainComponent;
  }

  beforeEach(() => {
    props = {
      formula: "1",
      onFormulaChange: () => {}
    }
    mountedMainComponent = undefined;
  })

  it('always renders a div', () => {
    const divs = mainComponent().find('div');
    expect(divs.length).toBeGreaterThan(0);
  })

  it('calls onFormulaChange when props formula is changed', () => {
    const spy = expect.spyOn(props, 'onFormulaChange');
    mainComponent();
    expect(spy).toHaveBeenCalledWith("1");
    mainComponent().setProps({ formula: "2"});
    expect(spy).toHaveBeenCalledWith("2");
  })
})