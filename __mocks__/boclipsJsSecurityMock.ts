import KeycloakInstanceFake from '../test-support/KeycloakInstanceFake';

const mock = jest.genMockFromModule('boclips-js-security');

(mock as any).authenticate = options => {
  options.onLogin(
    new KeycloakInstanceFake({
      userId: 'my-user-id',
    }),
  );
};

module.exports = mock;
