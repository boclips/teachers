import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AgeRangeTag } from 'src/components/common/tags/AgeRangeTag';
import { AgeRangeTags } from 'src/components/common/tags/AgeRangeTags';
import { MockStoreFactory } from '../../../../test-support/factories';

test('AgeRangeTags can render multiple tags', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={MockStoreFactory.sample()}>
        <AgeRangeTags ageRanges={[3, 4, 5, 6, 7, 8, 9]} hideLabel />
      </Provider>
    </BrowserRouter>,
  );

  const ageRangeTags = wrapper.find(AgeRangeTag);

  expect(ageRangeTags.children().length).toEqual(2);
  expect(ageRangeTags.children().first().text()).toEqual('3-5');
  expect(ageRangeTags.children().last().text()).toEqual('5-9');
});
