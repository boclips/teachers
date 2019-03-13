import { shallow } from 'enzyme';
import React from 'react';
import publicLogo from '../../../../resources/images/global.svg';
import privateLogo from '../../../../resources/images/private.svg';
import { By } from '../../../../test-support/By';
import { CollectionTitle } from './CollectionTitle';

it('Renders an element with the title in', () => {
  const wrapper = shallow(
    <CollectionTitle title="Title of Collection" isPublic={true} />,
  );
  expect(wrapper.find(By.dataQa('collection-name')).text()).toEqual(
    'Title of Collection',
  );
});

it('Renders globe icon when collection is public', () => {
  const wrapper = shallow(
    <CollectionTitle title="Title of Collection" isPublic={true} />,
  );
  const newLocal = wrapper.find(By.dataQa('collection-visibility')).prop('src');
  expect(newLocal).toContain(publicLogo);
});

it('Renders padlock icon when collection is private', () => {
  const wrapper = shallow(
    <CollectionTitle title="Title of Collection" isPublic={true} />,
  );
  expect(
    wrapper.find(By.dataQa('collection-visibility')).prop('src'),
  ).toContain(privateLogo);
});
