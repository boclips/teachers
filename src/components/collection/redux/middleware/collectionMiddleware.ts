import addToCollectionMiddleware from './addToCollectionMiddleware';
import addToCollectionResultMiddleware from './addToCollectionResultMiddleware';
import bookmarkCollectionMiddleware from './bookmarkCollectionMiddleware';
import createCollectionMiddleware from './createCollectionMiddleware';
import editCollectionMiddleware from './editCollectionMiddleware';
import fetchCollectionMiddleware from './fetchCollectionMiddleware';
import fetchCollectionsMiddleware from './fetchCollectionsMiddleware';
import fetchPublicCollectionsMiddleware from './fetchPageableCollectionsMiddleware';
import fetchVideosForCollectionMiddleware from './fetchVideosForCollectionMiddleware';
import removeCollectionMiddleware from './removeCollectionMiddleware';
import removeFromCollectionMiddleware from './removeFromCollectionMiddleware';
import removeFromCollectionResultMiddleware from './removeFromCollectionResultMiddleware';
import unbookmarkCollectionMiddleware from './unbookmarkCollectionMiddleware';

export default [
  fetchCollectionMiddleware,
  fetchCollectionsMiddleware,
  ...fetchPublicCollectionsMiddleware,
  addToCollectionMiddleware,
  addToCollectionResultMiddleware,
  removeFromCollectionMiddleware,
  removeFromCollectionResultMiddleware,
  createCollectionMiddleware,
  editCollectionMiddleware,
  removeCollectionMiddleware,
  fetchVideosForCollectionMiddleware,
  bookmarkCollectionMiddleware,
  unbookmarkCollectionMiddleware,
];
