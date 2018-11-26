import expect from 'expect';
import { mount } from '../enzyme';
import React from 'react';
import Component from 'src/';

describe('Index', () => {
  it('always renders a div', () => {
    const wrapper = mount(
      <Component
        formula="1+1"
        onFormulaChange={() => {}}
      />
    );
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  })
})
