import { shallow } from 'enzyme';
import React from 'react';
import { By } from 'test-support/By';
import { VideoCollectionFactory } from 'test-support/factories';
import CollectionCardContainer from '../CollectionCardContainer';
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

  test('renders empty placeholder if no collections', () => {
    const wrapper = shallow(
      <CollectionCardList
        collections={[]}
        title=""
        emptyPlaceholder="boogaloonga"
        maxNumberOfCollections={2}
      />,
    );

    expect(wrapper.find(By.dataQa('empty-placeholder'))).toExist();
  });

  test('does not render empty placeholder if collections', () => {
    const wrapper = shallow(
      <CollectionCardList
        collections={[
          VideoCollectionFactory.sample(),
          VideoCollectionFactory.sample(),
          VideoCollectionFactory.sample(),
        ]}
        title=""
        maxNumberOfCollections={2}
        emptyPlaceholder="boogaloonga"
      />,
    );

    expect(wrapper.find(By.dataQa('empty-placeholder'))).not.toExist();
  });
});
