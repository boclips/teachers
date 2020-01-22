import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStoreFactory } from '../../../../test-support/factories';
import { AgeRange } from '../../../types/AgeRange';
import { BoclipsSlider } from '../../common/BoclipsSlider';
import CollectionEditForm from './EditCollectionForm';

describe('EditCollectionForm', () => {
  it('can set correct initial age range for slider when age range is an interval', () => {
    const store = MockStoreFactory.sample();
    const wrapper = mount(
      <Provider store={store}>
        <React.Fragment>
          <CollectionEditForm
            title="irrelevant"
            isPublic={true}
            subjects={[]}
            description=""
            ageRange={new AgeRange(3, 9)}
          />
        </React.Fragment>
      </Provider>,
    );

    expect(wrapper.find(BoclipsSlider).props().defaultValue).toEqual([3, 9]);
  });
});
