import { shallow } from 'enzyme';
import React from 'react';
import { VideoCollectionFactory } from '../../../../../test-support/factories';
import { AgeRange } from '../../../../types/AgeRange';
import { AgeRangeTag } from '../../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../../video/tags/SubjectTag';
import BookmarkingButton from './BookmarkCollectionButton';
import CollectionCardHeader from './CollectionCardHeader';
import CollectionCardTitle from './CollectionCardTitle';
import RemoveCollectionButton from './RemoveCollectionButton';

test('renders title', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionCardHeader collection={collection} showRemoveButton={true} />,
  );

  expect(wrapper.find(CollectionCardTitle).props().collection).toEqual(
    collection,
  );
});

test('renders bookmarking button', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionCardHeader collection={collection} showRemoveButton={true} />,
  );

  expect(wrapper.find(BookmarkingButton).props().collection).toEqual(
    collection,
  );
});

test('renders remove collection button', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionCardHeader collection={collection} showRemoveButton={true} />,
  );

  expect(wrapper.find(RemoveCollectionButton).props().collection).toEqual(
    collection,
  );
});

test('does not render remove collection button', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionCardHeader collection={collection} showRemoveButton={false} />,
  );

  expect(wrapper.find(RemoveCollectionButton)).not.toExist();
});

test('renders first subject when present', () => {
  const collection = VideoCollectionFactory.sample({
    subjects: ['hello', 'world'],
  });
  const wrapper = shallow(
    <CollectionCardHeader collection={collection} showRemoveButton={false} />,
  );

  expect(wrapper.find(ConnectedSubjectTag).length).toEqual(1);
  expect(wrapper.find(ConnectedSubjectTag).props().id).toEqual('hello');
});

test('renders age range when present', () => {
  const collection = VideoCollectionFactory.sample({
    ageRange: new AgeRange({ min: 3, max: 9 }),
  });
  const wrapper = shallow(
    <CollectionCardHeader collection={collection} showRemoveButton={false} />,
  );

  expect(wrapper.find(AgeRangeTag).props().ageRange).toEqual('3 - 9');
});
