import { Link } from './Link';

test('returns link when not templated', () => {
  const link = new Link({ href: 'a-link' });

  expect(link.getLink()).toEqual('a-link');
});

test('throws when params are passed to non-templated link', () => {
  const link = new Link({ href: 'a-link' });

  expect(() => link.getLink({})).toThrowError(
    'Non templated link does not support params',
  );
});

describe('templated link', () => {
  test('can interpolate query params', () => {
    const link = new Link({
      href:
        'https://educators.testing-boclips.com/v1/videos?query={query}&pageSize={pageSize}&pageNumber={pageNumber}',
      templated: true,
    });

    expect(
      link.getLink({ query: 'perro', pageSize: 10, pageNumber: 0 }),
    ).toEqual(
      'https://educators.testing-boclips.com/v1/videos?pageNumber=0&pageSize=10&query=perro',
    );
  });

  test('ignores empty curlies', () => {
    const link = new Link({
      href: 'https://educators.testing-boclips.com/v1/videos/{}',
      templated: true,
    });

    expect(link.getLink()).toEqual(
      'https://educators.testing-boclips.com/v1/videos/{}',
    );
  });

  test('can interpolate path params', () => {
    const link = new Link({
      href: 'https://educators.testing-boclips.com/v1/videos/{id}',
      templated: true,
    });

    expect(link.getLink({ id: 'andrew-was-crying' })).toEqual(
      'https://educators.testing-boclips.com/v1/videos/andrew-was-crying',
    );
  });

  test('throws error when no params specified', () => {
    const link = new Link({
      href: 'a-link?search={search}',
      templated: true,
    });

    expect(() => link.getLink()).toThrowError(
      'Templated link requires missing param search',
    );
  });

  test('throws error when missing param', () => {
    const link = new Link({
      href: 'a-link?search={search}',
      templated: true,
    });

    expect(() => link.getLink({})).toThrowError(
      'Templated link requires missing param search',
    );
  });
});
