import { Modal } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import FilterButton from './FilterButton';

test('modal opens', () => {
  const wrapper = mount(<FilterButton />);
  const simulator = new EventSimulator(wrapper);

  simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

  expect(wrapper.find(Modal).props().visible).toBe(true);
});

test('modal closes when user cancels', () => {
  const wrapper = mount(<FilterButton />);
  const simulator = new EventSimulator(wrapper);

  simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

  wrapper
    .find(Modal)
    .props()
    .onCancel(null);
  wrapper.update();

  expect(wrapper.find(Modal).props().visible).toBe(false);
});

describe('when a filter is submitted', () => {
  it('closes the modal', () => {
    const wrapper = mount(<FilterButton />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    wrapper
      .find(Modal)
      .props()
      .onOk(null);
    wrapper.update();

    expect(wrapper.find(Modal).props().visible).toBe(false);
  });

  it('calls back with an updated duration', () => {});

  it("doesn't call back at all if there's no change to filters", () => {});
});
