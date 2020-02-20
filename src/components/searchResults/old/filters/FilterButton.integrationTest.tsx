import { Button, Modal, Slider } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { By } from 'test-support/By';
import EventSimulator from 'test-support/EventSimulator';
import {
  MockStoreFactory,
  RouterFactory,
} from 'test-support/factories';
import { setWidth } from 'test-support/setWidth';
import { AgeRange } from 'src/types/AgeRange';
import { SubjectsForm } from '../../../account/form/SubjectsForm';
import { AgeRangeSlider } from '../../../common/AgeRangeSlider';
import { SelectSubjects } from '../../../multipleSelect/SelectSubjects';
import { bulkUpdateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import DurationSlider from '../../filters/DurationSlider';
import FilterButtonConnected, {
  FilterButtonWithMediaBreakPoint as FilterButton,
} from './FilterButton';

let store = null;

beforeEach(() => {
  store = MockStoreFactory.sample();
});

function mountWith(storeForMount: Store, child: React.ReactElement) {
  return mount(
    <Provider store={storeForMount}>
      <MemoryRouter>{child}</MemoryRouter>
    </Provider>,
  );
}

describe('basic modal interaction', () => {
  test('modal opens', () => {
    const wrapper = mountWith(store, <FilterButton onSubmit={jest.fn()} />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    expect(wrapper.find(Modal).props().visible).toBe(true);
  });

  test('modal closes when user cancels', () => {
    const wrapper = mountWith(store, <FilterButton onSubmit={jest.fn()} />);
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
    const wrapper = mountWith(store, <FilterButton onSubmit={jest.fn()} />);
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
    const wrapper = mountWith(store, <FilterButton onSubmit={spy} />);
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
      ageRange: { max: undefined, min: undefined },
      duration: { max: 240, min: 120 },
      subjects: undefined,
    });
  });

  it('calls back with an updated subject list', () => {
    const spy = jest.fn();
    const wrapper = mountWith(store, <FilterButton onSubmit={spy} />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    wrapper
      .find(SubjectsForm)
      .find(SelectSubjects)
      .simulate('click');

    const menuItems = wrapper.find('Trigger').find('MenuItem');

    menuItems.find(`[value="subject-one-id"]`).simulate('click');

    simulator.click(
      wrapper.findWhere(n => n.length && n.text() === 'OK').find(Button),
    );

    expect(spy).toHaveBeenCalledWith({
      ageRange: { max: undefined, min: undefined },
      duration: { max: undefined, min: undefined },
      subjects: ['subject-one-id'],
    });
  });

  it('calls back with an updated age range', () => {
    const spy = jest.fn();
    const wrapper = mountWith(store, <FilterButton onSubmit={spy} />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    wrapper
      .find(AgeRangeSlider)
      .props()
      .onChange(new AgeRange(5, 11));

    simulator.click(
      wrapper.findWhere(n => n.length && n.text() === 'OK').find(Button),
    );

    expect(spy).toHaveBeenCalledWith({
      ageRange: { max: 11, min: 5 },
      duration: { max: undefined, min: undefined },
      subjects: undefined,
    });
  });

  it("doesn't call back at all if there's no change to filters", () => {
    const spy = jest.fn();
    const wrapper = mountWith(store, <FilterButton onSubmit={spy} />);
    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    simulator.click(
      wrapper.findWhere(n => n.length && n.text() === 'OK').find(Button),
    );

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('default slider values', () => {
  it('can set default duration values', () => {
    const wrapper = mountWith(
      store,
      <FilterButton
        onSubmit={jest.fn}
        durationMin={4 * 60}
        durationMax={10 * 60}
      />,
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
  it('can set default age range values', () => {
    const wrapper = mountWith(
      store,
      <FilterButton onSubmit={jest.fn} ageRangeMax={10} ageRangeMin={7} />,
    );

    const simulator = new EventSimulator(wrapper);

    simulator.click(wrapper.find(By.dataQa('open-filter-modal')).first());

    expect(
      wrapper
        .find(AgeRangeSlider)
        .find(Slider)
        .props().defaultValue,
    ).toEqual([7, 10]);
  });
});

describe('url changes', () => {
  it('updates with the correct duration and age range', () => {
    store = MockStoreFactory.sample({
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
        ageRange: {
          min: 10,
          max: 15,
        },
      });

    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual(
      bulkUpdateSearchParamsAction([
        {
          duration_max: 130,
          duration_min: 70,
        },
        {
          age_range_max: 15,
          age_range_min: 10,
        },
        {
          subject: undefined,
        },
      ]),
    );
  });

  it('updates with the only the correct duration, clearing other filters', () => {
    store = MockStoreFactory.sample({
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
          duration_max: 130,
          duration_min: 70,
        },
        {
          age_range_min: undefined,
          age_range_max: undefined,
        },
        {
          subject: undefined,
        },
      ]),
    );
  });

  it('does not pass null values to url', () => {
    store = MockStoreFactory.sample({
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
          max: null,
        },
        ageRange: {
          min: 10,
          max: null,
        },
      });

    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()[0]).toEqual(
      bulkUpdateSearchParamsAction([
        {
          duration_max: undefined,
          duration_min: 70,
        },
        {
          age_range_max: undefined,
          age_range_min: 10,
        },
        {
          subject: undefined,
        },
      ]),
    );
  });
});

describe('number of filters text', () => {
  it('shows number of filters applied when width is less than md', () => {
    setWidth(500);
    const wrapper = mountWith(
      store,
      <FilterButton onSubmit={jest.fn()} numberOfFiltersApplied={1} />,
    );

    expect(
      wrapper.find(FilterButton).find(By.dataQa('filter-button-text')),
    ).toHaveText('Filter (1)');
  });

  it('does not show any number next to filters text when no filters', () => {
    setWidth(500);

    const wrapper = mountWith(
      store,
      <FilterButton onSubmit={jest.fn()} numberOfFiltersApplied={0} />,
    );

    expect(
      wrapper.find(FilterButton).find(By.dataQa('filter-button-text')),
    ).toHaveText('Filter ');
  });

  it('does not show number of filters applied when width is greater than md', () => {
    setWidth(1000);

    const wrapper = mountWith(
      store,
      <FilterButton onSubmit={jest.fn()} numberOfFiltersApplied={0} />,
    );

    expect(
      wrapper.find(FilterButton).find(By.dataQa('filter-button-text')),
    ).toHaveText('Filter ');
  });
});
