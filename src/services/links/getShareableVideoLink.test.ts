import { parseUrl } from 'query-string';
import { getShareableVideoLink } from './getShareableVideoLink';

describe('getVideoDetailsLink', () => {
  it('creates a link with referer and share indicator', () => {
    const link = getShareableVideoLink('123', 'user-1');

    const parsedUrl = parseUrl(link);
    expect(parsedUrl.url).toContain('videos/123');
    expect(parsedUrl.query.referer).toEqual('user-1');
    expect(parsedUrl.query.share).toEqual('true');
    expect(parsedUrl.query.segmentStart).toBeUndefined();
    expect(parsedUrl.query.segmentEnd).toBeUndefined();
  });

  it('adds segment bounds when segment is not null', () => {
    const link = getShareableVideoLink('123', 'dave', { start: 10, end: 20 });

    const parsedUrl = parseUrl(link);
    expect(parsedUrl.query.segmentStart).toEqual('10');
    expect(parsedUrl.query.segmentEnd).toEqual('20');
  });

  it('adds segment bounds when segment start is null', () => {
    const link = getShareableVideoLink('123', 'dave', { start: null, end: 20 });

    const parsedUrl = parseUrl(link);
    expect(parsedUrl.query.segmentStart).toBeUndefined();
    expect(parsedUrl.query.segmentEnd).toEqual('20');
  });

  it('adds segment bounds when segment end is null', () => {
    const link = getShareableVideoLink('123', 'dave', { start: 10, end: null });

    const parsedUrl = parseUrl(link);
    expect(parsedUrl.query.segmentStart).toEqual('10');
    expect(parsedUrl.query.segmentEnd).toBeUndefined();
  });
});
