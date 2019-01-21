import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosMock = new MockAdapter(axios);

export default class MockFetchVerify {
  public static get(
    matcher: string | RegExp,
    responseBody?: any,
    status: number = 200,
    responseHeaders: any = {},
  ): void {
    axiosMock.onGet(matcher).reply(status, responseBody, responseHeaders);
  }

  public static post(matcher, requestBody, status) {
    axiosMock.onPost(matcher, requestBody).reply(status);
  }

  public static put(
    matcher: string | RegExp,
    responseBody?: any,
    status: number = 200,
    responseHeaders: any = {},
  ): void {
    axiosMock.onPut(matcher).reply(status, responseBody, responseHeaders);
  }

  public static destroy(
    matcher: string | RegExp,
    responseBody?: any,
    status: number = 200,
    responseHeaders: any = {},
  ): void {
    axiosMock.onDelete(matcher).reply(status, responseBody, responseHeaders);
  }

  public static clear() {
    axiosMock.reset();
  }
}
