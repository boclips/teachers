import { shallow } from 'enzyme';
import React from 'react';
import { By } from '../../../../../test-support/By';
import { VideoCollectionFactory } from '../../../../../test-support/factories';
import { CollectionSubtitle } from '../../CollectionSubtitle';
import CollectionCardTitle from './CollectionCardTitle';

test('renders title', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(<CollectionCardTitle collection={collection} />);

  expect(wrapper.find(By.dataQa('collection-title')).text()).toEqual('hello');
});

test('renders collection subtitle', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(<CollectionCardTitle collection={collection} />);

  expect(wrapper.find(CollectionSubtitle).props()).toEqual({ collection });
});
