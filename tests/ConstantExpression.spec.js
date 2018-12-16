import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import {
  ConstantExpression,
  mapDispatchToProps,
  mapStateToProps,
} from '../src/ConstantExpression';

describe('ConstantExpression', () => {
  let props;
  let wrapper;
  const constantExpression = () => {
    if (!wrapper) {
      wrapper = shallow(
        <ConstantExpression {...props} />,
      );
    }
    return wrapper;
  };

  beforeEach(() => {
    props = {
      node: { value: 1 },
      path: 'some path',
      selectExpression: () => {},
    };
    wrapper = undefined;
  });

  it('always renders a span with three children', () => {
    expect(constantExpression().children().length).toBe(1);
  });

  it('if it has the same path with the selected one, it has the class \'focus\'', () => {
    props = {
      ...props,
      ...mapStateToProps({ expression: { selectedExpressionPath: props.path } }),
    }
    expect(constantExpression().hasClass('focus')).toBeTruthy();
  });

  it('calls \'selectExpression\' callback when constant component is clicked', () => {
    const dispatch = expect.createSpy();
    props.selectExpression = mapDispatchToProps(dispatch, props).selectExpression;
    constantExpression().simulate('click');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SELECTED_EXPRESSION',
      path: props.path,
      node: props.node,
    });
  });
});
