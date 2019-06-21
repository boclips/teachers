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
        'https://teachers.testing-boclips.com/v1/videos?query={query}&size={size}&page={page}{&include_tag}',
      templated: true,
    });

    const url = link.getTemplatedLink({ query: 'perro', size: 10, page: 0 });
    const queryParams = queryString.parse(url.split('?')[1]);

    expect(queryParams.query).toEqual('perro');
    expect(queryParams.page).toEqual('0');
    expect(queryParams.size).toEqual('10');
    expect(queryParams.include_tag).toBeUndefined();
  });

  test('can interpolate optional query params', () => {
    const link = new Link({
      href:
        'https://teachers.testing-boclips.com/v1/videos?query={query}{&include_tag}',
      templated: true,
    });

    expect(
      link.getTemplatedLink({ query: 'perro', include_tag: 'foo' }),
    ).toEqual(
      'https://teachers.testing-boclips.com/v1/videos?query=perro&include_tag=foo',
    );
  });

  test('can interpolate multiple query params', () => {
    const link = new Link({
      href:
        'https://teachers.testing-boclips.com/v1/videos?query={query}{&subject}',
      templated: true,
    });

    expect(
      link.getTemplatedLink({ query: 'perro', subject: ['foo', 'bar'] }),
    ).toEqual(
      'https://teachers.testing-boclips.com/v1/videos?query=perro&subject=foo,bar',
    );
  });

  test('ignores a null optional query params', () => {
    const link = new Link({
      href:
        'https://teachers.testing-boclips.com/v1/videos?query={query}{&include_tag}',
      templated: true,
    });

    expect(
      link.getTemplatedLink({ query: 'perro', include_tag: null }),
    ).toEqual('https://teachers.testing-boclips.com/v1/videos?query=perro');
  });

  test('ignores an undefined optional query params', () => {
    const link = new Link({
      href:
        'https://teachers.testing-boclips.com/v1/videos?query={query}{&include_tag}',
      templated: true,
    });

    expect(link.getTemplatedLink({ query: 'perro' })).toEqual(
      'https://teachers.testing-boclips.com/v1/videos?query=perro',
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
