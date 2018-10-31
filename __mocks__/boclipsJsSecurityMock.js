const mock = jest.genMockFromModule('boclips-js-security');

mock.authenticate = (callback) => {
  callback({authenticated :true});
};

module.exports = mock;
