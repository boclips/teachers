import { mount, shallow } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import { VideoCollectionFactory } from '../../../../test-support/factories';
import CollectionTitle from './CollectionTitle';

test('renders title', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = mount(<CollectionTitle collection={collection} />);

  expect(wrapper.find(By.dataQa('collection-title')).text()).toEqual('hello');
});

test('Renders globe icon when collection is public and mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: true,
    isMine: true,
  });

  const wrapper = shallow(<CollectionTitle collection={collection} />);
  const logo = wrapper.find(By.dataQa('collection-visibility'));
  expect(logo.prop('className')).toContain('collection-title__logo--public');
});

test('Renders padlock icon when collection is private and mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: false,
    isMine: true,
  });

  const wrapper = shallow(<CollectionTitle collection={collection} />);
  const logo = wrapper.find(By.dataQa('collection-visibility'));
  expect(logo.prop('className')).toContain('collection-title__logo--private');
});

test('Does not render padlock icon when not mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: true,
    isMine: false,
  });

  const wrapper = shallow(<CollectionTitle collection={collection} />);
  expect(wrapper.find(By.dataQa('collection-visibility'))).toHaveLength(0);
});
test('Does not render globe icon when not mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: false,
    isMine: false,
  });

  const wrapper = shallow(<CollectionTitle collection={collection} />);
  expect(wrapper.find(By.dataQa('collection-visibility'))).toHaveLength(0);
});
