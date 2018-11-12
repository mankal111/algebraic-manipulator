import expect from 'expect'
import React from 'react'
import {renderToStaticMarkup as render} from 'react-dom/server'

import Component from 'src/'

describe('Component', () => {
  it('displays the given formula', () => {
    const initialFormula="2y + 4x = 5";
    expect(render(
      <Component
        formula={initialFormula}
        onFormulaChange={() => {}}
      />
    )).toContain(initialFormula);
  })
})
