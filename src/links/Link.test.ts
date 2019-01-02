import { Link } from './Link';

test('returns link when not templated', () => {
  const link = new Link({ href: 'a-link' });

  expect(link.getOriginalLink()).toEqual('a-link');
});

describe('templated link', () => {
  test('can interpolate query params', () => {
    const link = new Link({
      href:
        'https://teachers.testing-boclips.com/v1/videos?query={query}&pageSize={pageSize}&pageNumber={pageNumber}',
      templated: true,
    });

    expect(
      link.getTemplatedLink({ query: 'perro', pageSize: 10, pageNumber: 0 }),
    ).toEqual(
      'https://teachers.testing-boclips.com/v1/videos?pageNumber=0&pageSize=10&query=perro',
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

  test('throws error when missing param', () => {
    const link = new Link({
      href: 'a-link?search={search}',
      templated: true,
    });

    expect(() => link.getTemplatedLink({})).toThrowError(
      'Templated link requires missing param search',
    );
  });
});
