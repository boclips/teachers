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
    fetchMock.get(matcher, reponse, { overwriteRoutes: true, ...options });
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
