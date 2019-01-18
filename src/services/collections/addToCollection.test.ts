import MockFetchVerify from '../../../test-support/MockFetchVerify';
import {
  VideoCollectionFactory,
  VideoFactory,
} from './../../../test-support/factories';
import addToCollection from './addToCollection';

const video = VideoFactory.sample({ id: '123' });

const collection = VideoCollectionFactory.sample();

test('add to collection', async () => {
  MockFetchVerify.put('/v1/collections/default/videos/123', '', 200);

  const success = await addToCollection(video, collection);

  expect(success).toEqual(true);
});

test('server error when adding to collection', async () => {
  MockFetchVerify.put('/v1/collections/default/videos/123', '', 500);

  const success = await addToCollection(video, collection);

  expect(success).toEqual(false);
});

test('client error when adding to collection', async () => {
  MockFetchVerify.put('/v1/collections/default/videos/123', '', 404);

  const success = await addToCollection(video, collection);

  expect(success).toEqual(false);
});
