import { AppConstants } from './AppConstants';

describe('AppConstants', () => {
  const originalDomain = process.env.ENVIRONMENT_DOMAIN;

  beforeEach(() => {
    delete process.env.ENVIRONMENT_DOMAIN;
  });

  afterEach(() => {
    process.env.ENVIRONMENT_DOMAIN = originalDomain;
  });

  it('obtain host', () => {
    const appConfig = new AppConstants({
      location: {
        hostname: 'something.com',
        protocol: 'https:',
        port: '123',
      },
    } as Window);

    const host = appConfig.HOST;

    expect(host).toBe('https://something.com:123');
  });

  describe('obtain environment information', () => {
    it('determine local environment', () => {
      const appConfig = new AppConstants({
        location: {
          hostname: 'localhost',
          protocol: 'https:',
          port: '123',
        },
      } as Window);

      expect(appConfig.ENVIRONMENT).toBe('TESTING');
    });

    it('determine testing environment', () => {
      const appConfig = new AppConstants({
        location: {
          hostname: 'teachers.testing-boclips.com',
          protocol: 'https:',
          port: '123',
        },
      } as Window);

      expect(appConfig.ENVIRONMENT).toBe('TESTING');
    });

    it('determine local environment', () => {
      const appConfig = new AppConstants({
        location: {
          hostname: 'teachers.local-boclips.com',
          protocol: 'https:',
          port: '123',
        },
      } as Window);

      expect(appConfig.ENVIRONMENT).toBe('TESTING');
    });

    it('determine staging environment', () => {
      const appConfig = new AppConstants({
        location: {
          hostname: 'teachers.staging-boclips.com',
          protocol: 'https:',
          port: '123',
        },
      } as Window);

      expect(appConfig.ENVIRONMENT).toBe('STAGING');
    });

    it('determine production environment', () => {
      const appConfig = new AppConstants({
        location: {
          hostname: 'teachers.boclips.com',
          protocol: 'https:',
          port: '123',
        },
      } as Window);

      expect(appConfig.ENVIRONMENT).toBe('PRODUCTION');
    });

    it('throws error when it cannot detect environment', () => {
      const appConfig = new AppConstants({
        location: {
          hostname: 'google.com',
          protocol: 'https:',
          port: '1111',
        },
      } as Window);

      expect(() => {
        /* tslint:disable */
        appConfig.ENVIRONMENT;
      }).toThrow();
    });

    describe('the ENVIRONMENT_DOMAIN env var can override the constant', () => {
      const dataProvider = [
        {
          environmentDomain: 'testing-boclips.com',
          expectedEnvironment: 'TESTING',
        },
        {
          environmentDomain: 'staging-boclips.com',
          expectedEnvironment: 'STAGING',
        },
        {
          environmentDomain: 'boclips.com',
          expectedEnvironment: 'PRODUCTION',
        },
      ];

      dataProvider.forEach(({ environmentDomain, expectedEnvironment }) => {
        it(`can be overridden to be ${expectedEnvironment}`, () => {
          process.env.ENVIRONMENT_DOMAIN = environmentDomain;

          const appConfig = new AppConstants({
            location: {
              hostname: 'teachers.boclips.com',
              protocol: 'https:',
              port: '1111',
            },
          } as Window);

          expect(appConfig.ENVIRONMENT).toBe(expectedEnvironment);
        });

        it("throws error when the enviroment variable isn't valid", () => {
          process.env.ENVIRONMENT_DOMAIN = 'google.com';

          const appConfig = new AppConstants({
            location: {
              hostname: 'teachers.boclips.com',
              protocol: 'https:',
              port: '1111',
            },
          } as Window);

          expect(() => {
            /* tslint:disable */
            appConfig.ENVIRONMENT;
          }).toThrow();
        });
      });
    });
  });
});
