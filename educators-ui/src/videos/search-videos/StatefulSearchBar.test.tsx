import Mock = jest.Mock;
import Search from 'antd/lib/input/Search';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import StatefulSearchBar from './StatefulSearchBar';

let onSearch: Mock;
let onQuerySubmitted: Mock;

let wrapper: ReactWrapper;

beforeEach(() => {
  onSearch = jest.fn();
  onQuerySubmitted = jest.fn();
  wrapper = mount(
    <StatefulSearchBar
      onSearch={onSearch}
      onQuerySubmitted={onQuerySubmitted}
      value={'bears'}
    />,
  );
});

function getValue() {
  const input = wrapper.find('input');
  return (input.getDOMNode() as any).value;
}

test('initializes input with value prop', () => {
  expect(getValue()).toEqual('bears');
});

test('invokes search callback after mounting when value specified', () => {
  expect(onSearch).toHaveBeenCalledWith('bears');
});

test('does not invoke the search callback after mounting when value not specified', () => {
  onSearch.mockClear();
  mount(
    <StatefulSearchBar
      onSearch={onSearch}
      onQuerySubmitted={onQuerySubmitted}
    />,
  );
  expect(onSearch).not.toHaveBeenCalled();
});

test('invokes query submit callback when query is submitted', () => {
  wrapper.find(Search).prop('onSearch')('polar bears');

  expect(onQuerySubmitted).toHaveBeenCalledWith('polar bears');
});

describe('when value prop changes', () => {
  beforeEach(() => {
    wrapper.setProps({ value: 'polar bears' });
  });

  test('updates input value', () => {
    expect(getValue()).toEqual('polar bears');
  });

  test('invokes search callback', () => {
    expect(onSearch).toHaveBeenCalledWith('polar bears');
  });
});
