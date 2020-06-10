import { extractFacetHits } from 'src/components/searchResults/filters/utils/extractFacetHits';

it('can handle inexistent index ', () => {
  expect(extractFacetHits('whatevs', {})).toEqual(0);
});

it('can handle undefined', () => {
  expect(extractFacetHits('whatevs', undefined)).toEqual(0);
});

it('can handle legit data', () => {
  expect(extractFacetHits('real-id', { 'real-id': { hits: 10 } })).toEqual(10);
});

it('defaults hits greater 500 to 500', () => {
  expect(extractFacetHits('real-id', { 'real-id': { hits: 1000 } })).toEqual(
    500,
  );
});
