import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { ActionsMenu } from '../src/ActionsMenu';

describe('ActionsMenu', () => {
  let props;
  let wrapper;
  const ActionsMenuComponent = () => {
    if (!wrapper) {
      wrapper = shallow(
        <ActionsMenu {...props} />,
      );
    }
    return wrapper;
  };

  beforeEach(() => {
    props = {
      actionsList: ['commutative', 'evaluate'],
    };
    wrapper = undefined;
  });

  it('renders a span for each action in the action list', () => {
    expect(ActionsMenuComponent().children().length).toBe(props.actionsList.length);
  });
});
