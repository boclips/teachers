import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStoreFactory } from '../../../../test-support/factories';
import { AgeRange } from '../../../types/AgeRange';
import { BoclipsSlider } from '../../common/BoclipsSlider';
import CollectionEditForm from './EditCollectionForm';

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
          ageRange={new AgeRange(3, 9)}
          onAgeRangeChange={ageRangeChange}
        />
      </>
    </Provider>,
  );

  expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([3, 9]);
});
