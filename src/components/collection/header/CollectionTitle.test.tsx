import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Router } from 'react-router';
import { By } from '../../../../test-support/By';
import { VideoCollectionFactory } from '../../../../test-support/factories';
import CollectionTitle from './CollectionTitle';

const getComponent = collection =>
  mount(
    <Router history={createMemoryHistory()}>
      <CollectionTitle collection={collection} />
    </Router>,
  );

test('renders title', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = getComponent(collection);

  expect(wrapper.find(By.dataQa('collection-title')).text()).toEqual('hello');
});

test('Renders globe icon when collection is public and mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: true,
    isMine: true,
  });

  const wrapper = getComponent(collection);
  const logo = wrapper.find(By.dataQa('collection-visibility'));
  expect(logo.prop('className')).toContain('collection-title__logo--public');
});

test('Renders padlock icon when collection is private and mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: false,
    isMine: true,
  });

  const wrapper = getComponent(collection);
  const logo = wrapper.find(By.dataQa('collection-visibility'));
  expect(logo.prop('className')).toContain('collection-title__logo--private');
});

test('Does not render padlock icon when not mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: true,
    isMine: false,
  });

  const wrapper = getComponent(collection);
  expect(wrapper.find(By.dataQa('collection-visibility'))).toHaveLength(0);
});

test('Does not render globe icon when not mine', () => {
  const collection = VideoCollectionFactory.sample({
    isPublic: false,
    isMine: false,
  });

  const wrapper = getComponent(collection);
  expect(wrapper.find(By.dataQa('collection-visibility'))).toHaveLength(0);
});
