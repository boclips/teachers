import { extractFacetHits } from 'src/components/searchResults/filters/extractFacetHits';

it('can handle inexistent index ', () => {
  expect(extractFacetHits('whatevs', {})).toEqual(0);
});

it('can handle undefined', () => {
  expect(extractFacetHits('whatevs', undefined)).toEqual(0);
});

it('can handle legit data', () => {
  expect(extractFacetHits('real-id', { 'real-id': { hits: 10 } })).toEqual(10);
});
