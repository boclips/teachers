import { shallow } from 'enzyme';
import React from 'react';
import { VideoCollectionFactory } from '../../../../test-support/factories';
import { AgeRange } from '../../../types/AgeRange';
import { AgeRangeTag } from '../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../video/tags/SubjectTag';
import BookmarkingButton from '../buttons/bookmark/BookmarkCollectionButton';
import CollectionButtonsContainer from '../buttons/CollectionButtonsContainer';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionHeader from './CollectionHeader';
import CollectionTitle from './CollectionTitle';

test('renders title', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={true} />,
  );

  expect(wrapper.find(CollectionTitle).props().collection).toEqual(collection);
});

test('renders bookmarking button', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={true} />,
  );

  expect(
    wrapper
      .find(BookmarkingButton)
      .first()
      .props().collection,
  ).toEqual(collection);
});

test('renders edit collection buttons', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={true} />,
  );

  expect(wrapper.find(CollectionButtonsContainer).props().collection).toEqual(
    collection,
  );
});

test('does not render buttons or subtitle when not showing full card', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={false} />,
  );

  expect(wrapper.find(CollectionSubtitle)).not.toExist();
  expect(wrapper.find(CollectionButtonsContainer)).not.toExist();
});

test('renders first subject when present and showAllSubjects is false', () => {
  const collection = VideoCollectionFactory.sample({
    subjects: ['hello', 'world'],
  });
  const wrapper = shallow(
    <CollectionHeader
      collection={collection}
      showAllSubjects={false}
      showFullCard={false}
    />,
  );

  expect(wrapper.find(ConnectedSubjectTag).length).toEqual(1);
  expect(wrapper.find(ConnectedSubjectTag).props().id).toEqual('hello');
});

test('renders all subjects when present and showAllSubjects is true', () => {
  const collection = VideoCollectionFactory.sample({
    subjects: ['hello', 'world'],
  });
  const wrapper = shallow(
    <CollectionHeader
      collection={collection}
      showAllSubjects={true}
      showFullCard={true}
    />,
  );

  expect(wrapper.find(ConnectedSubjectTag).length).toEqual(2);
});

test('renders age range when present', () => {
  const collection = VideoCollectionFactory.sample({
    ageRange: new AgeRange(3, 9),
  });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={false} />,
  );

  expect(wrapper.find(AgeRangeTag).props().ageRange).toEqual('3-9');
});

test('renders collection subtitle when buttons are rendered', () => {
  const collection = VideoCollectionFactory.sample({ title: 'hello' });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={true} />,
  );
  expect(wrapper.find(CollectionSubtitle)).toExist();
});

test('does not render tags container when no tags are present', () => {
  const collection = VideoCollectionFactory.sample({
    ageRange: null,
    subjects: [],
  });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={false} />,
  );

  expect(wrapper.find('.tags-container')).not.toExist();
});

test('does not render tags container when no tags are present - age range min and max both null', () => {
  const collection = VideoCollectionFactory.sample({
    ageRange: new AgeRange(),
    subjects: [],
  });
  const wrapper = shallow(
    <CollectionHeader collection={collection} showFullCard={false} />,
  );

  expect(wrapper.find('.tags-container')).not.toExist();
});

test('does render tags container when no tags are present but show tags container is true', () => {
  const collection = VideoCollectionFactory.sample({
    ageRange: null,
    subjects: [],
  });
  const wrapper = shallow(
    <CollectionHeader
      collection={collection}
      showFullCard={false}
      showTagsContainerIfEmpty={true}
    />,
  );

  expect(wrapper.find('.tags-container')).toExist();
});
