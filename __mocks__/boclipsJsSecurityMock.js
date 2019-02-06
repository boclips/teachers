const mock = jest.genMockFromModule('boclips-js-security');

mock.authenticate = options => {
  options.onLogin({ authenticated: true });
};

module.exports = mock;
