import {Link} from './Link';

describe('non templated link', () => {

  test('returns original link', () => {
    const link = new Link({href: 'a-link'});

    expect(link.getLink()).toEqual('a-link')
  });

  describe('when params', () => {
    test('throws error', () => {
      const link = new Link({href: 'a-link'});

      expect(() => link.getLink({})).toThrowError('Non templated link does not support params');
    });
  });

});

describe('templated link', () => {

  test('returns original interpolated link', () => {
    const link = new Link({href: 'a-link?search={search}', templated: true});

    expect(link.getLink({search: 'perro'})).toEqual('a-link?search=perro')
  });

  describe('when no params', () => {
    test('throws error', () => {
      const link = new Link({href: 'a-link?search={search}', templated: true});

      expect(() => link.getLink()).toThrowError('Templated link requires params {search:"value"}');
    });
  });

  describe('when missing params', () => {
    test('throws error', () => {
      const link = new Link({href: 'a-link?search={search}', templated: true});

      expect(() => link.getLink({})).toThrowError('Templated link requires params {search:"value"}');
    });
  });

});
