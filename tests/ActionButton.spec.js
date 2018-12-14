import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton, mapDispatchToProps } from '../src/ActionButton';
import { performAction } from '../src/actions/expressionActions';

describe('ActionButton', () => {
  let props;
  let wrapper;
  const actionButton = () => {
    if (!wrapper) {
      wrapper = shallow(
        <ActionButton {...props} />,
      );
    }
    return wrapper;
  };

  beforeEach(() => {
    props = {
      action: 'some action',
      onClick: () => {},
    };
    wrapper = undefined;
  });

  it('always renders a component containing the action text', () => {
    expect(actionButton().text()).toBe(props.action);
  });

  it('calls onClick when the component is clicked', () => {
    const dispatch = expect.createSpy();
    props.onClick = mapDispatchToProps(dispatch, props).actionClick;
    actionButton().simulate('click');
    expect(dispatch).toHaveBeenCalledWith(performAction(props.action));
  });
});
