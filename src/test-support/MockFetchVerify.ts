import fetchMock, {
  MockOptionsMethodGet,
  MockResponse,
  MockResponseFunction,
} from 'fetch-mock';

export default class MockFetchVerify {
  public static get(
    matcher: string,
    reponse: MockResponse | MockResponseFunction,
    options?: MockOptionsMethodGet,
  ): FetchMockStub {
    if (fetchMock.called(matcher)) {
      throw new Error(`GET '${matcher}' has already been requested`);
    }
    fetchMock.get(matcher, reponse, options);
    return new FetchMockStub(matcher);
  }
}

class FetchMockStub {
  constructor(private matcher: string) {}

  public verify() {
    if (!fetchMock.called(this.matcher)) {
      throw new Error(`GET '${this.matcher}' has not been requested`);
    }
  }
}
