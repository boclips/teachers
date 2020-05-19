import addToCollectionResultMiddleware from './addToCollectionResultMiddleware';
import addToCollectionMiddleware from './addToMyCollectionMiddleware';
import bookmarkCollectionMiddleware from './bookmarkCollectionMiddleware';
import createCollectionMiddleware from './createCollectionMiddleware';
import editCollectionMiddleware from './editMyCollectionMiddleware';
import fetchCollectionMiddleware from './fetchCollectionMiddleware';
import fetchCollectionsMiddleware from './fetchCollectionsMiddleware';
import fetchPageableCollectionsMiddleware from './fetchPageableCollectionsMiddleware';
import fetchVideosForCollectionMiddleware from './fetchVideosForCollectionMiddleware';
import removeFromCollectionResultMiddleware from './removeFromCollectionResultMiddleware';
import removeFromCollectionMiddleware from './removeFromMyCollectionMiddleware';
import removeCollectionMiddleware from './removeMyCollectionMiddleware';
import unbookmarkCollectionMiddleware from './unbookmarkCollectionMiddleware';

export default [
  fetchCollectionMiddleware,
  fetchCollectionsMiddleware,
  ...fetchPageableCollectionsMiddleware,
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
