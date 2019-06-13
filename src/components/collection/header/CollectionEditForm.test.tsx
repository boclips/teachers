import { Slider } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStoreFactory } from '../../../../test-support/factories';
import CollectionEditForm from './CollectionEditForm';

test('can set correct initial age range for slider when age range is an interval', () => {
  const ageRangeChange = () => {
    return false;
  };
  const store = MockStoreFactory.sample();
  const wrapper = mount(
    <Provider store={store}>
      <>
        <CollectionEditForm
          title="irrelevant"
          isPublic={true}
          subjects={[]}
          ageRange={[3, 9]}
          onAgeRangeChange={ageRangeChange}
          sliderRange={{ min: 3, max: 19 }}
        />
      </>
    </Provider>,
  );

  expect(wrapper.find(Slider).props().value).toEqual([3, 9]);
});
