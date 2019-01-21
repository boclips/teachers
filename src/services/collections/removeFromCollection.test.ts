import MockFetchVerify from '../../../test-support/MockFetchVerify';
import {
  VideoCollectionFactory,
  VideoFactory,
} from './../../../test-support/factories';
import removeFromCollection from './removeFromCollection';

const video = VideoFactory.sample({ id: '123' });
const collection = VideoCollectionFactory.sample({ videos: [video] });

test('remove from collection', async () => {
  MockFetchVerify.destroy('/v1/collections/default/videos/123', '', 200);

  const success = await removeFromCollection(video, collection);

  expect(success).toEqual(true);
});

test('server error when removing from collection', async () => {
  MockFetchVerify.destroy('/v1/collections/default/videos/123', '', 500);

  const success = await removeFromCollection(video, collection);

  expect(success).toEqual(false);
});

test('client error when removing from to collection', async () => {
  MockFetchVerify.destroy('/v1/collections/default/videos/123', '', 404);

  const success = await removeFromCollection(video, collection);

  expect(success).toEqual(false);
});
