import { shallow } from 'enzyme';
import React from 'react';
import PublicLogo from '../../../../resources/images/global.svg';
import PrivateLogo from '../../../../resources/images/private.svg';
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
  const logo = wrapper.find(By.dataQa('collection-visibility'));
  expect(logo.type()).toEqual(PublicLogo);
});

it('Renders padlock icon when collection is private and is mine', () => {
  const wrapper = shallow(
    <CollectionTitle
      title="Title of Collection"
      isPublic={true}
      isMine={true}
    />,
  );
  const logo = wrapper.find(By.dataQa('collection-visibility')).type();
  expect(logo).toEqual(PrivateLogo);
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
