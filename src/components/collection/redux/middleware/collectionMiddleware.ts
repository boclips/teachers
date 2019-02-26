import addToCollectionMiddleware from './addToCollectionMiddleware';
import addToCollectionResultMiddleware from './addToCollectionResultMiddleware';
import createCollectionMiddleware from './createCollectionMiddleware';
import fetchCollectionsMiddleware from './fetchCollectionsMiddleware';
import removeFromCollectionMiddleware from './removeFromCollectionMiddleware';
import removeFromCollectionResultMiddleware from './removeFromCollectionResultMiddleware';
import renameCollectionMiddleware from './renameCollectionMiddleware';

export default [
  fetchCollectionsMiddleware,
  addToCollectionMiddleware,
  addToCollectionResultMiddleware,
  removeFromCollectionMiddleware,
  removeFromCollectionResultMiddleware,
  createCollectionMiddleware,
  renameCollectionMiddleware,
];
