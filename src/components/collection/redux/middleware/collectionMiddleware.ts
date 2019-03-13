import addToCollectionMiddleware from './addToCollectionMiddleware';
import addToCollectionResultMiddleware from './addToCollectionResultMiddleware';
import createCollectionMiddleware from './createCollectionMiddleware';
import editCollectionMiddleware from './editCollectionMiddleware';
import fetchCollectionsMiddleware from './fetchCollectionsMiddleware';
import fetchVideosForCollectionMiddleware from './fetchVideosForCollectionMiddleware';
import removeCollectionMiddleware from './removeCollectionMiddleware';
import removeFromCollectionMiddleware from './removeFromCollectionMiddleware';
import removeFromCollectionResultMiddleware from './removeFromCollectionResultMiddleware';

export default [
  fetchCollectionsMiddleware,
  addToCollectionMiddleware,
  addToCollectionResultMiddleware,
  removeFromCollectionMiddleware,
  removeFromCollectionResultMiddleware,
  createCollectionMiddleware,
  editCollectionMiddleware,
  removeCollectionMiddleware,
  fetchVideosForCollectionMiddleware,
];
