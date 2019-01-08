import queryString from 'query-string';
import { Link } from './Link';

test('returns link when not templated', () => {
  const link = new Link({ href: 'a-link' });

  expect(link.getOriginalLink()).toEqual('a-link');
});

describe('templated link', () => {
  test('can interpolate query params', () => {
    const link = new Link({
      href:
        'https://teachers.testing-boclips.com/v1/videos?query={query}&size={size}&page={page}{&use_case}',
      templated: true,
    });

    const url = link.getTemplatedLink({ query: 'perro', size: 10, page: 0 });
    const queryParams = queryString.parse(url.split('?')[1]);

    expect(queryParams.query).toEqual('perro');
    expect(queryParams.page).toEqual('0');
    expect(queryParams.size).toEqual('10');
  });

  test('can interpolate optional query params', () => {
    const link = new Link({
      href:
        'https://teachers.testing-boclips.com/v1/videos?query={query}{&use_case}',
      templated: true,
    });

    expect(link.getTemplatedLink({ query: 'perro', use_case: 'foo' })).toEqual(
      'https://teachers.testing-boclips.com/v1/videos?query=perro&use_case=foo',
    );
  });

  test('ignores empty curlies', () => {
    const link = new Link({
      href: 'https://teachers.testing-boclips.com/v1/videos/{}',
      templated: true,
    });

    expect(link.getOriginalLink()).toEqual(
      'https://teachers.testing-boclips.com/v1/videos/{}',
    );
  });

  test('can interpolate path params', () => {
    const link = new Link({
      href: 'https://teachers.testing-boclips.com/v1/videos/{id}',
      templated: true,
    });

    expect(link.getTemplatedLink({ id: 'andrew-was-crying' })).toEqual(
      'https://teachers.testing-boclips.com/v1/videos/andrew-was-crying',
    );
  });
});
