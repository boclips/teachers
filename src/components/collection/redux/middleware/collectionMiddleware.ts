import addToCollectionMiddleware from './addToCollectionMiddleware';
import addToCollectionResultMiddleware from './addToCollectionResultMiddleware';
import fetchCollectionsMiddleware from './fetchCollectionsMiddleware';
import removeFromCollectionMiddleware from './removeFromCollectionMiddleware';
import removeFromCollectionResultMiddleware from './removeFromCollectionResultMiddleware';

export default [
  fetchCollectionsMiddleware,
  addToCollectionMiddleware,
  addToCollectionResultMiddleware,
  removeFromCollectionMiddleware,
  removeFromCollectionResultMiddleware,
];
