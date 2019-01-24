export class AppConstants {
  private window: Window;

  constructor(window: Window) {
    this.window = window;
  }

  get HOST(): string {
    return (
      this.window.location.protocol +
      '//' +
      this.window.location.hostname +
      (this.window.location.port ? ':' + this.window.location.port : '')
    );
  }

  get ENVIRONMENT(): 'STAGING' | 'TESTING' | 'PRODUCTION' {
    const localHost = '.local-boclips.com';
    const testingHost = '.testing-boclips.com';
    const stagingHost = '.staging-boclips.com';
    const productionHost = '.boclips.com';

    if (this.window.location.hostname.indexOf(stagingHost) !== -1) {
      return 'STAGING';
    } else if (this.window.location.hostname.indexOf(productionHost) !== -1) {
      return 'PRODUCTION';
    } else if (this.window.location.hostname.indexOf(testingHost) !== -1) {
      return 'TESTING';
    } else if (this.window.location.hostname.indexOf(localHost) !== -1) {
      return 'TESTING';
    } else {
      throw Error('Environment could not be detected');
    }
  }

  get CORRELATION_ID_HEADER_FIELD(): string {
    return 'x-correlation-id';
  }

  get NEWS(): string {
    return 'news';
  }

  get CLASSROOM(): string {
    return 'classroom';
  }
}

export const Constants = new AppConstants(window);
