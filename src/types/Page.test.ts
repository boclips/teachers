import { Link } from './Link';
import Page from './Page';

describe('has next page', () => {
  it('returns true when we have next page', () => {
    const page = new Page({
      items: [],
      links: {
        next: new Link({ href: 'blah' }),
      },
    });

    expect(page.hasNextPage()).toBeTruthy();
  });

  it('returns false when next link is not available', () => {
    const page = new Page({
      items: [],
      links: { next: undefined },
    });

    expect(page.hasNextPage()).toBeFalsy();
  });

  it('returns false when links are not available', () => {
    const page = new Page({
      items: [],
      links: undefined,
    });

    expect(page.hasNextPage()).toBeFalsy();
  });

  it('returns false when pageable is undefined', () => {
    const page = new Page(undefined);

    expect(page.hasNextPage()).toBeFalsy();
  });
});

describe('items', () => {
  it('returns valid items', () => {
    const page = new Page({
      items: [1234],
      links: {
        next: new Link({ href: 'blah' }),
      },
    });

    expect(page.items()).toEqual([1234]);
  });

  it('returns undefined when no items are set', () => {
    const page = new Page({
      items: undefined,
      links: {
        next: new Link({ href: 'blah' }),
      },
    });

    expect(page.items()).toEqual(undefined);
  });

  it('returns undefined when pageable is undefined', () => {
    const page = new Page(undefined);

    expect(page.items()).toEqual(undefined);
  });
});
