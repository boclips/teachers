import { parseUrl } from 'query-string';
import { getShareableCollectionLink } from 'src/services/links/getShareableCollectionLink';

describe('getShareableCollectionLink', () => {
  it('creates a link with referer', () => {
    const link = getShareableCollectionLink('123', 'user-1');

    const parsedUrl = parseUrl(link);
    expect(parsedUrl.url).toContain('collections/123');
    expect(parsedUrl.query.referer).toEqual('user-1');
  });
});
