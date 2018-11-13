import expect from 'expect'
import React from 'react'
import {renderToStaticMarkup as render} from 'react-dom/server'

import Component from 'src/'

describe('Component', () => {
  it('contains h2', () => {
    expect(render(
      <Component />
    )).toContain("h2");
  })
})
