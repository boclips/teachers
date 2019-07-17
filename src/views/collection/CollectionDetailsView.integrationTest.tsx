import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import eventually from '../../../test-support/eventually';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';
import {
  collectionResponse,
  video177Slim,
} from '../../../test-support/video-service-responses';
import CollectionEditButton from '../../components/collection/header/CollectionEditButton';
import {
  CollectionEditModalHelper,
  CollectionFormHelper,
} from '../../components/collection/header/CollectionEditButton.test';
import AgeRangeSlider from '../../components/common/AgeRangeSlider';
import { AgeRange } from '../../types/AgeRange';

describe('when video collection', () => {
  test('displays collection basic details', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo();

    const collectionPage = await CollectionPage.load();

    expect(collectionPage.getCollectionDetails()).toMatchObject({
      title: 'funky collection',
      isPublic: true,
      subjects: [],
      lastUpdated: 'Jan 16, 2019',
      ageRange: '3-9',
    });
  });

  test('displays video collection with videos', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo();

    const collectionPage = await CollectionPage.load();

    expect(collectionPage.isEmptyCollection()).toBeFalsy();
    expect(collectionPage.getVideos()).toHaveLength(1);
    expect(collectionPage.getVideos()[0]).toMatchObject({
      title: 'KS3/4 Science: Demonstrating Chemistry',
      description: 'Matthew Tosh shows us the science.',
      source: 'cp1',
      duration: ' 1m 2s',
      releasedOn: 'Feb 11, 2018',
      badgeAlt: 'Ad free',
      subjects: ['Maths', 'Physics'],
      playerVideoId: '177',
    });
  });
});

describe('when empty collection', () => {
  test('displays beautiful illustration', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchCollection(collectionResponse([], 'empty'));

    const collectionPage = await CollectionPage.load('empty');

    await eventually(() => {
      expect(collectionPage.isEmptyCollection()).toBeTruthy();
    });
  });
});

describe('when collection not found', () => {
  test('displays beautiful illustration', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchCollection();

    const collectionPage = await CollectionPage.load('not-found');

    await eventually(() => {
      expect(collectionPage.isCollectionNotFound()).toBeTruthy();
    });
  });
});

describe('when editable collection', () => {
  test('can edit title of collection', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo();

    const collectionPage = await CollectionPage.load();
    const wrapper = collectionPage.wrapper;

    expect(collectionPage.isEditable()).toBeTruthy();

    CollectionEditModalHelper.openModal(wrapper);
    const newTitle = 'this is a shiny new title';
    CollectionFormHelper.editCollectionText(wrapper, newTitle);
    MockFetchVerify.patch(
      'https://api.example.com/v1/collections/id',
      {
        title: newTitle,
        isPublic: null,
        subjects: null,
        ageRange: { min: null, max: null },
      },
      204,
    );
    CollectionEditModalHelper.confirmModal(wrapper.find(CollectionEditButton));

    await eventually(() => {
      expect(wrapper.find(By.dataQa('collection-name')).text()).toEqual(
        newTitle,
      );
    });

    await eventually(() => {
      // TODO: wrapper.html() does not contain an element with data-qa="age-range". Yet, wrapper.find will find one.
      expect(wrapper.html().indexOf('data-qa="age-range"')).toBeGreaterThan(0);
    });
  });

  test('can edit age range of collection', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo();

    MockFetchVerify.patch(
      'https://api.example.com/v1/collections/id',
      {
        title: null,
        isPublic: null,
        subjects: null,
        ageRange: { min: 5, max: 11 },
      },
      204,
    );

    const collectionPage = await CollectionPage.load();
    const wrapper = collectionPage.wrapper;

    expect(collectionPage.isEditable()).toBeTruthy();
    CollectionEditModalHelper.openModal(wrapper);

    const slider = wrapper.find(AgeRangeSlider);

    slider.props().onChange(new AgeRange(5, 11));
    CollectionEditModalHelper.confirmModal(wrapper.find(CollectionEditButton));

    await eventually(() => {
      expect(
        wrapper
          .find(By.dataQa('age-range'))
          .find(By.dataQa('filter-tag'))
          .text(),
      ).toEqual('5-11');
    });
  });

  test('can remove a video', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo()
      .removeFromCollection();

    const collectionPage = await CollectionPage.load();
    expect(collectionPage.getVideos()).toHaveLength(1);

    collectionPage.removeVideo(0);

    await eventually(() => {
      expect(collectionPage.getVideos()).toHaveLength(0);
    });
  });
});

describe('when non editable collection', () => {
  test('does not render edit collection button', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchCollection(
        collectionResponse([video177Slim], 'non-editable', false),
      )
      .fetchVideo();

    const collectionPage = await CollectionPage.load('non-editable');

    expect(collectionPage.getVideos()).toHaveLength(1);
    expect(collectionPage.isEditable()).toBeFalsy();
  });
});
