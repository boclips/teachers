import addToCollectionMiddleware from './addToCollectionMiddleware';
import addToCollectionResultMiddleware from './addToCollectionResultMiddleware';
import fetchCollectionMiddleware from './fetchCollectionMiddleware';
import removeFromCollectionMiddleware from './removeFromCollectionMiddleware';

export default [
  fetchCollectionMiddleware,
  addToCollectionMiddleware,
  addToCollectionResultMiddleware,
  removeFromCollectionMiddleware,
];
