import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import StatefulSearchBar from './StatefulSearchBar';
import Mock = jest.Mock;

let onQuerySubmitted: Mock;

let wrapper: ReactWrapper;

beforeEach(() => {
  onQuerySubmitted = jest.fn();
  wrapper = mount(
    <StatefulSearchBar onSubmit={onQuerySubmitted} value="bears" />,
  );
});

function getValue() {
  const input = wrapper.find('input');
  return (input.getDOMNode() as any).value;
}

test('initializes input with value prop', () => {
  expect(getValue()).toEqual('bears');
});

test('does not invoke the search callback after mounting when value not specified', () => {
  onQuerySubmitted.mockClear();
  mount(<StatefulSearchBar onSubmit={onQuerySubmitted} />);
  expect(onQuerySubmitted).not.toHaveBeenCalled();
});

describe('when value prop changes', () => {
  beforeEach(() => {
    wrapper.setProps({ value: 'polar bears' });
  });

  test('updates input value', () => {
    expect(getValue()).toEqual('polar bears');
  });
});
