import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import eventually from '../../../test-support/eventually';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';
import {
  userCollectionResponse,
  video177,
  video177Slim,
} from '../../../test-support/video-service-responses';
import CollectionEditButton from '../../components/collection/header/CollectionEditButton';
import {
  CollectionEditModalHelper,
  CollectionFormHelper,
} from '../../components/collection/header/CollectionEditButton.test';

test('displays video collection', async () => {
  new ApiStub()
    .fetchCollection(userCollectionResponse([video177Slim]))
    .fetchVideo({ video: video177 });

  const collectionPage = await CollectionPage.load();

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

test('can edit collection', async () => {
  new ApiStub()
    .fetchCollection(userCollectionResponse([video177Slim]))
    .fetchVideo({ video: video177 });

  const newTitle = 'this is a shiny new title';
  MockFetchVerify.patch(
    '/v1/collections/id',
    { title: newTitle, isPublic: null },
    204,
  );

  const collectionPage = await CollectionPage.load();
  const wrapper = collectionPage.wrapper;

  CollectionEditModalHelper.openModal(wrapper);
  CollectionFormHelper.editCollectionText(wrapper, 'this is a shiny new title');
  CollectionEditModalHelper.confirmModal(wrapper.find(CollectionEditButton));

  await eventually(() => {
    expect(wrapper.find(By.dataQa('collection-name')).text()).toEqual(newTitle);
  });
});
