import ReferAFriendUrlBuilder from './ReferAFriendUrlBuilder';

describe('url builder', () => {
  it('can build a valid url ', () => {
    const url = new ReferAFriendUrlBuilder()
      .setFirstName('test')
      .setLastName('last')
      .setEmail('test@last.com')
      .setUserId('123')
      .setBaseUrl('https://base/')
      .build();

    expect(url).toEqual(
      'https://base/&firstname=test&lastname=last&email=test%40last.com&view=iframe&externalid=123',
    );
  });

  it('can handle missing values', () => {
    const url = new ReferAFriendUrlBuilder()
      .setFirstName('test')
      .setBaseUrl('https://base')
      .build();

    expect(url).toEqual(
      'https://base&firstname=test&lastname=&email=&view=iframe&externalid=',
    );
  });
});
