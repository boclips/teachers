import { completionsFor } from './completions';

test('returns an empty list given an empty input', () => {
  expect(completionsFor(['one'])('')).toEqual([]);
});

test('returns empty list when less than 3 chars typed', () => {
  expect(completionsFor(['one'])('on')).toEqual([]);
});

test('returns matching completions when 3 chars typed', () => {
  expect(completionsFor(['one', 'two', 'three'])('thr')).toEqual(['three']);
});

test('returns matching completions when 3 chars typed matching different case', () => {
  expect(completionsFor(['tHree'])('thr')).toEqual(['tHree']);
  expect(completionsFor(['three'])('THR')).toEqual(['three']);
});

test('returns empty list when non-matching chars typed', () => {
  expect(completionsFor(['one', 'two', 'three'])('four')).toEqual([]);
});

test('does not return completions that match in the middle of a word', () => {
  expect(completionsFor(['abcd'])('bcd')).toEqual([]);
});

test('matches in the middle of a sentence', () => {
  expect(completionsFor(['the lazy dog', 'jumps'])('lazy')).toEqual([
    'the lazy dog',
  ]);
});

test('matches with whitespace present', () => {
  expect(completionsFor(['andrew', 'jacek'])('   and')).toEqual(['andrew']);
  expect(completionsFor([' andrew ', 'jacek'])('and')).toEqual(['andrew']);
});
