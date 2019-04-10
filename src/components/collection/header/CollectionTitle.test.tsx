import { shallow } from 'enzyme';
import React from 'react';
import publicLogo from '../../../../resources/images/global.svg';
import privateLogo from '../../../../resources/images/private.svg';
import { By } from '../../../../test-support/By';
import { CollectionTitle } from './CollectionTitle';

it('Renders an element with the title in', () => {
  const wrapper = shallow(
    <CollectionTitle
      title="Title of Collection"
      isPublic={true}
      isMine={true}
    />,
  );
  expect(wrapper.find(By.dataQa('collection-name')).text()).toEqual(
    'Title of Collection',
  );
});

it('Renders globe icon when collection is public and is mine', () => {
  const wrapper = shallow(
    <CollectionTitle
      title="Title of Collection"
      isPublic={true}
      isMine={true}
    />,
  );
  const newLocal = wrapper.find(By.dataQa('collection-visibility')).prop('src');
  expect(newLocal).toContain(publicLogo);
});

it('Renders padlock icon when collection is private and is mine', () => {
  const wrapper = shallow(
    <CollectionTitle
      title="Title of Collection"
      isPublic={true}
      isMine={true}
    />,
  );
  expect(
    wrapper.find(By.dataQa('collection-visibility')).prop('src'),
  ).toContain(privateLogo);
});

it('Does not render a padlock icon when collection is private but is not mine', () => {
  const wrapper = shallow(
    <CollectionTitle
      title="Title of Collection"
      isPublic={true}
      isMine={false}
    />,
  );
  expect(wrapper.find(By.dataQa('collection-visibility'))).toHaveLength(0);
});
