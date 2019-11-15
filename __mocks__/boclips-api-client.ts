import { TestSupport } from 'boclips-api-client';

const mockClient = jest.genMockFromModule('boclips-api-client') as any;

const fakeClient = new TestSupport.FakeBoclipsClient();

mockClient.ApiBoclipsClient.initialize = () => Promise.resolve(fakeClient);

module.exports = mockClient;
