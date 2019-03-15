import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import eventually from '../../../test-support/eventually';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';
import {
  userCollectionResponse,
  video177Slim,
} from '../../../test-support/video-service-responses';
import CollectionEditButton from '../../components/collection/header/CollectionEditButton';
import {
  CollectionEditModalHelper,
  CollectionFormHelper,
} from '../../components/collection/header/CollectionEditButton.test';

test('displays video collection with videos', async () => {
  new ApiStub().fetchCollections().fetchVideo();

  const collectionPage = await CollectionPage.load();

  expect(collectionPage.isEmptyCollection()).toBeFalsy();
  expect(collectionPage.getVideos()).toHaveLength(1);
  expect(collectionPage.getVideos()[0]).toMatchObject({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentPartner: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    badgeAlt: 'Ad free',
    subjects: ['Maths', 'Physics'],
  });
});

describe('when empty collection', () => {
  new ApiStub().fetchCollections().fetchVideo();

  test('displays beautiful illustration', async () => {
    new ApiStub()
      .fetchCollections()
      .fetchCollection(userCollectionResponse([], 'empty'))
      .fetchVideo();

    const collectionPage = await CollectionPage.load('empty');

    await eventually(() => {
      expect(collectionPage.isEmptyCollection()).toBeTruthy();
    });
  });
});

describe('when editable collection', () => {
  test('can edit collection', async () => {
    new ApiStub().fetchCollections().fetchVideo();

    const newTitle = 'this is a shiny new title';
    MockFetchVerify.patch(
      '/v1/collections/id',
      { title: newTitle, isPublic: null },
      204,
    );

    const collectionPage = await CollectionPage.load();
    const wrapper = collectionPage.wrapper;

    expect(collectionPage.isEditable()).toBeTruthy();
    CollectionEditModalHelper.openModal(wrapper);
    CollectionFormHelper.editCollectionText(
      wrapper,
      'this is a shiny new title',
    );
    CollectionEditModalHelper.confirmModal(wrapper.find(CollectionEditButton));

    await eventually(() => {
      expect(wrapper.find(By.dataQa('collection-name')).text()).toEqual(
        newTitle,
      );
    });
  });

  test('can remove a video', async () => {
    new ApiStub()
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
      .fetchCollections()
      .fetchCollection(
        userCollectionResponse([video177Slim], 'non-editable', false),
      )
      .fetchVideo();

    const collectionPage = await CollectionPage.load('non-editable');

    expect(collectionPage.getVideos()).toHaveLength(1);
    expect(collectionPage.isEditable()).toBeFalsy();
  });
});
