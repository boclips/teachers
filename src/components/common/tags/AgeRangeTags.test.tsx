import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MockStoreFactory } from '../../../../test-support/factories';
import { AgeRangeTag } from './AgeRangeTag';
import AgeRangeTags from './AgeRangeTags';

test('AgeRangeTags can render multiple tags', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={MockStoreFactory.sample()}>
        <AgeRangeTags ages={[3, 4, 5, 6]} />
      </Provider>
    </BrowserRouter>,
  );

  const ageRangeTags = wrapper.find(AgeRangeTag);

  expect(ageRangeTags.children().length).toEqual(2);
  expect(
    ageRangeTags
      .children()
      .first()
      .text(),
  ).toEqual('Ages:3-5');
  expect(
    ageRangeTags
      .children()
      .last()
      .text(),
  ).toEqual('Ages:5-7');
});