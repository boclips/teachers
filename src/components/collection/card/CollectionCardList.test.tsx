import { shallow } from 'enzyme';
import React from 'react';
import { VideoCollectionFactory } from '../../../../test-support/factories';
import CollectionCardContainer from './CollectionCardContainer';
import { CollectionCardList } from './CollectionCardList';

describe('CollectionCardList', () => {
  test('renders collections', () => {
    const wrapper = shallow(
      <CollectionCardList
        collections={[
          VideoCollectionFactory.sample(),
          VideoCollectionFactory.sample(),
          VideoCollectionFactory.sample(),
        ]}
        title=""
      />,
    );

    expect(wrapper.find(CollectionCardContainer)).toHaveLength(3);
  });

  test('caps max number of collections', () => {
    const wrapper = shallow(
      <CollectionCardList
        collections={[
          VideoCollectionFactory.sample(),
          VideoCollectionFactory.sample(),
          VideoCollectionFactory.sample(),
        ]}
        title=""
        maxNumberOfCollections={2}
      />,
    );

    expect(wrapper.find(CollectionCardContainer)).toHaveLength(2);
  });
});
