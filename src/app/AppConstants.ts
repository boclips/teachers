export class AppConstants {
  private window: Window;

  public constructor(window: Window) {
    this.window = window;
  }

  public get API_PREFIX(): string {
    switch (this.ENVIRONMENT) {
      case 'TESTING':
        return 'https://api.testing-boclips.com';
      case 'STAGING':
        return 'https://api.staging-boclips.com';
      case 'PRODUCTION':
        return 'https://api.boclips.com';
    }
  }

  public get HOST(): string {
    return (
      this.window.location.protocol +
      '//' +
      this.window.location.hostname +
      (this.window.location.port ? ':' + this.window.location.port : '')
    );
  }

  public get ENVIRONMENT(): 'STAGING' | 'TESTING' | 'PRODUCTION' {
    const localHost = 'localhost';
    const localBoclips = '.local-boclips.com';
    const testingHost = '.testing-boclips.com';
    const stagingHost = '.staging-boclips.com';
    const productionHost = '.boclips.com';

    /**
     * When running locally, we should return the environment that has been
     * configured in .env.dev rather than the hostname.
     */
    // TODO(AO): Make this much smarter.
    return 'TESTING';

    const domain = process.env.ENVIRONMENT_DOMAIN
      ? '.' + process.env.ENVIRONMENT_DOMAIN
      : this.window.location.hostname;

    if (domain.indexOf(stagingHost) !== -1) {
      return 'STAGING';
    } else if (domain.indexOf(productionHost) !== -1) {
      return 'PRODUCTION';
    } else if (domain.indexOf(testingHost) !== -1) {
      return 'TESTING';
    } else if (domain.indexOf(localBoclips) !== -1) {
      return 'TESTING';
    } else if (domain.indexOf(localHost) !== -1) {
      return 'TESTING';
    } else {
      throw Error('Environment could not be detected');
    }
  }

  public get NEWS(): string {
    return 'news';
  }

  public get CLASSROOM(): string {
    return 'classroom';
  }
}

export const Constants = new AppConstants(window);
