import { Button, Modal, Slider } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import DurationSlider from './DurationSlider';
import FilterButton from './FilterButton';

test('modal opens', () => {
  const wrapper = mount(<FilterButton onSubmit={jest.fn()} />);
  const simulator = new EventSimulator(wrapper);

  simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

  expect(wrapper.find(Modal).props().visible).toBe(true);
});

test('modal closes when user cancels', () => {
  const wrapper = mount(<FilterButton onSubmit={jest.fn()} />);
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
    const wrapper = mount(<FilterButton onSubmit={jest.fn()} />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    wrapper
      .find(Modal)
      .props()
      .onOk(null);
    wrapper.update();

    expect(wrapper.find(Modal).props().visible).toBe(false);
  });

  it('calls back with an updated duration', () => {
    const spy = jest.fn();
    const wrapper = mount(<FilterButton onSubmit={spy} />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    wrapper
      .find(DurationSlider)
      .find(Slider)
      .props()
      .onChange([2, 4]);

    simulator.click(
      wrapper.findWhere(n => n.length && n.text() === 'OK').find(Button),
    );

    expect(spy).toHaveBeenCalledWith({
      duration: {
        min: 120,
        max: 240,
      },
    });
  });

  it("doesn't call back at all if there's no change to filters", () => {
    const spy = jest.fn();
    const wrapper = mount(<FilterButton onSubmit={spy} />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    simulator.click(
      wrapper.findWhere(n => n.length && n.text() === 'OK').find(Button),
    );

    expect(spy).not.toHaveBeenCalled();
  });
});
