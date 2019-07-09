import KeycloakInstanceFake from '../test-support/KeycloakInstanceFake';

const mock = jest.genMockFromModule('boclips-js-security');

(mock as any).createInstance = jest.fn().mockImplementation(options => {
  options.onLogin(new KeycloakInstanceFake({ userId: 'my-user-id' }));
});
(mock as any).getInstance = jest.fn();

module.exports = mock;
