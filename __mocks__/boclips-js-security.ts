const mock = jest.genMockFromModule('boclips-js-security');

(mock as any).createInstance = jest.fn().mockImplementation(options => {
  options.onLogin();
});
(mock as any).getInstance = jest.fn().mockReturnValue({
  getTokenFactory: () => () => Promise.resolve('test-token'),
});

module.exports = mock;
