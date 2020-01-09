import getVideoDetailsLink from './getVideoDetailsLink';

it('creates a link without parameters when all params are null', () => {
  const link = getVideoDetailsLink({
    videoId: '123',
    absolute: true,
    userId: null,
    segment: null,
  });

  expect(link).toMatch(/http.*\/videos\/123/);
});
it('adds refererId when user id is not null', () => {
  const link = getVideoDetailsLink({
    videoId: '123',
    absolute: true,
    userId: 'dave',
    segment: null,
  });

  expect(link).toMatch(/http:.*videos\/123\?referer=dave/);
});

it('adds segment bounds when segment is not null', () => {
  const link = getVideoDetailsLink({
    videoId: '123',
    absolute: true,
    userId: null,
    segment: { start: 10, end: 20 },
  });

  expect(link).toMatch(/http:.*videos\/123\?segmentStart=10&segmentEnd=20/);
});

it('creates an absolute link when requested', () => {
  const link = getVideoDetailsLink({
    videoId: '123',
    absolute: true,
    userId: null,
    segment: null,
  });

  expect(link).toMatch(/http:.*videos\/123/);
});

it('creates relative links when absolute not requested', () => {
  const link = getVideoDetailsLink({
    videoId: '123',
    absolute: false,
    userId: null,
    segment: null,
  });

  expect(link).toEqual('/videos/123');
});
