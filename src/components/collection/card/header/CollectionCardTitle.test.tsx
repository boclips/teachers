import { shallow } from 'enzyme';
import React from 'react';
import PublicLogoSVG from '../../../../../resources/images/global.svg';
import PrivateLogoSVG from '../../../../../resources/images/private.svg';
import { By } from '../../../../../test-support/By';
import { VideoCollectionFactory } from '../../../../../test-support/factories';
import CollectionCardTitle from './CollectionCardTitle';

test('renders title', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(<CollectionCardTitle collection={collection} />);

  expect(wrapper.find(By.dataQa('collection-title')).text()).toEqual('hello');
});

test('Renders globe icon when collection is public and showPrivacy is true', () => {
  const collection = VideoCollectionFactory.sample({
    title: 'hello',
    isPublic: true,
  });

  const wrapper = shallow(
    <CollectionCardTitle collection={collection} showPrivacy={true} />,
  );
  const logo = wrapper.find(By.dataQa('collection-visibility'));
  expect(logo.type()).toEqual(PublicLogoSVG);
});

test('Renders padlock icon when collection is private and showPrivacy is true', () => {
  const collection = VideoCollectionFactory.sample({
    title: 'hello',
    isPublic: true,
  });

  const wrapper = shallow(
    <CollectionCardTitle collection={collection} showPrivacy={true} />,
  );
  const logo = wrapper.find(By.dataQa('collection-visibility')).type();
  expect(logo).toEqual(PrivateLogoSVG);
});

test('Does not render any icon when showPrivacy is false', () => {
  const collection = VideoCollectionFactory.sample({
    title: 'hello',
  });

  const wrapper = shallow(
    <CollectionCardTitle collection={collection} showPrivacy={false} />,
  );
  expect(wrapper.find(By.dataQa('collection-visibility'))).toHaveLength(0);
});
