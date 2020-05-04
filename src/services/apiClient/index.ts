import { BoclipsClient } from 'boclips-api-client';

class ApiClient {
  private client;

  public set(client: Promise<BoclipsClient>) {
    this.client = client;
  }

  public get = (): Promise<BoclipsClient> => {
    if (!this.client) {
      throw new Error('ApiClient not set yet');
    }
    return this.client;
  };
}

export const ApiClientWrapper = new ApiClient();
export const getBoclipsClient = (): Promise<BoclipsClient> =>
  ApiClientWrapper.get();
