import { completionsFor, Suggestion } from './completions';

describe('completions', () => {
  const getCompletions = (allCompletions: Suggestion[]) => (text: string) =>
    completionsFor({ subjects: allCompletions })(text).map(
      (completion) => completion.text,
    );

  test('returns an empty list given an empty input', () => {
    expect(getCompletions([{ value: 'one' }])('')).toEqual([]);
  });

  test('returns empty list when less than 3 chars typed', () => {
    expect(getCompletions([{ value: 'one' }])('on')).toEqual([]);
  });

  test('returns matching completions when 3 chars typed', () => {
    expect(getCompletions([{ value: 'three' }])('thr')).toEqual(['three']);
  });

  test('returns matching completions when 3 chars typed matching different case', () => {
    expect(getCompletions([{ value: 'tHree' }])('thr')).toEqual(['tHree']);
    expect(getCompletions([{ value: 'three' }])('THR')).toEqual(['three']);
  });

  test('returns empty list when non-matching chars typed', () => {
    expect(
      getCompletions([{ value: 'one' }, { value: 'two' }, { value: 'three' }])(
        'four',
      ),
    ).toEqual([]);
  });

  test('does not return completions that match in the middle of a word', () => {
    expect(getCompletions([{ value: 'abcd' }])('bcd')).toEqual([]);
  });

  test('matches in the middle of a sentence', () => {
    expect(
      getCompletions([{ value: 'the lazy dog' }, { value: 'jumps' }])('lazy'),
    ).toEqual(['the lazy dog']);
  });

  test('distinguishes between matches from different lists', () => {
    const results = completionsFor({
      subjects: [{ value: 'three' }],
      topics: [{ value: 'two three' }],
    })('thr');
    expect(results[0].list).toEqual('topics');
    expect(results[0].text).toEqual('two three');

    expect(results[1].list).toEqual('subjects');
    expect(results[1].text).toEqual('three');
  });

  test('matches with whitespace present', () => {
    expect(
      getCompletions([{ value: 'andrew' }, { value: 'jacek' }])('   and'),
    ).toEqual(['andrew']);
    expect(
      getCompletions([{ value: ' andrew ' }, { value: 'jacek' }])('and'),
    ).toEqual(['andrew']);
  });

  test('prioritises matches in the beginning', () => {
    expect(
      getCompletions([{ value: 'aaa bbb' }, { value: 'bbb ccc' }])('bbb'),
    ).toEqual(['bbb ccc', 'aaa bbb']);
  });

  test('prioritises shorter matches over longer ones', () => {
    expect(
      getCompletions([{ value: 'aaaa' }, { value: 'aaa' }])('aaa'),
    ).toEqual(['aaa', 'aaaa']);
  });

  test('highlight matching chunks in the beginning', () => {
    const highlights = completionsFor({ subjects: [{ value: 'bbb ccc' }] })(
      'bbb',
    ).map((completion) => completion.textWithHighlights);

    expect(highlights).toEqual([
      [
        { text: 'bbb', matches: true },
        { text: ' ccc', matches: false },
      ],
    ]);
  });

  test('highlight matching chunks in the middle', () => {
    const highlights = completionsFor({ subjects: [{ value: 'aaa bbb ccc' }] })(
      'bbb',
    ).map((completion) => completion.textWithHighlights);

    expect(highlights).toEqual([
      [
        { text: 'aaa ', matches: false },
        { text: 'bbb', matches: true },
        { text: ' ccc', matches: false },
      ],
    ]);
  });

  test('highlight matching chunks in the end', () => {
    const highlights = completionsFor({ subjects: [{ value: 'aaa bbb' }] })(
      'bbb',
    ).map((completion) => completion.textWithHighlights);

    expect(highlights).toEqual([
      [
        { text: 'aaa ', matches: false },
        { text: 'bbb', matches: true },
      ],
    ]);
  });
  test('returns an array of maximum 6 completions', () => {
    const highlights = completionsFor({
      subjects: [
        { value: 'geography1' },
        { value: 'geography2' },
        { value: 'geography3' },
        { value: 'geography4' },
        { value: 'geography5' },
        { value: 'geography6' },
        { value: 'geography7' },
      ],
    })('geo').map((completion) => completion.textWithHighlights);

    expect(highlights.length).toBeLessThan(7);
  });
});
