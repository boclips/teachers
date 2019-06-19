import { Button, Modal, Slider } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../../test-support/By';
import EventSimulator from '../../../../../test-support/EventSimulator';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../../test-support/factories';
import { bulkUpdateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import DurationSlider from './DurationSlider';
import FilterButtonConnected, { FilterButton } from './FilterButton';

describe('basic modal interaction', () => {
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

describe('default values', () => {
  it('can set default duration values', () => {
    const wrapper = mount(
      <FilterButton onSubmit={jest.fn} durationMin={4} durationMax={10} />,
    );

    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    expect(
      wrapper
        .find(DurationSlider)
        .find(Slider)
        .props().defaultValue,
    ).toEqual([4, 10]);
  });
});

describe('url changes', () => {
  it('updates with the correct duration', () => {
    const store = MockStoreFactory.sample({
      router: RouterFactory.sample({
        location: {
          pathname: '',
          search: `?q=hi`,
          hash: '',
          state: null,
        },
      }),
    });

    const wrapper = mount(
      <Provider store={store}>
        <FilterButtonConnected />
      </Provider>,
    );

    wrapper
      .find(FilterButton)
      .props()
      .onSubmit({
        duration: {
          min: 70,
          max: 130,
        },
      });

    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual(
      bulkUpdateSearchParamsAction([
        {
          duration_min: 70,
          duration_max: 130,
        },
      ]),
    );
  });
});
