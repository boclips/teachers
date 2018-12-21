import AppConfig from './AppConfig';

describe('AppConfig', () => {
  it('getHost returns the host of the application', () => {
    const host = AppConfig.getHost();

    expect(host).toBe('about://');
  });
});
