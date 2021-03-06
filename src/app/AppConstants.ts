declare global {
  interface Window {
    Environment: any;
  }
}

window.Environment = window.Environment || {};

export class AppConstants {
  private window: Window;

  public constructor(window: Window) {
    this.window = window;
  }

  public get API_PREFIX(): string {
    return this.window.Environment.API_PREFIX;
  }

  public get RECAPTCHA_SITE_KEY(): string {
    return this.window.Environment.RECAPTCHA_SITE_KEY;
  }

  public get AUTH_ENDPOINT(): string {
    return this.window.Environment.AUTH_ENDPOINT;
  }

  public get HOST(): string {
    return `${this.window.location.protocol}//${this.window.location.hostname}${
      this.window.location.port ? `:${this.window.location.port}` : ''
    }`;
  }
}

export const Constants = new AppConstants(window);
