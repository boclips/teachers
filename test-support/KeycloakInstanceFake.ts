import {
  KeycloakError,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakProfile,
  KeycloakPromise,
  KeycloakPromiseCallback,
  KeycloakTokenParsed,
} from 'keycloak-js';

interface KeycloakInstanceFakeOptions {
  userId: string;
  mixpanelDistinctId: string;
}

export default class KeycloakInstanceFake implements KeycloakInstance {
  public tokenParsed?: KeycloakTokenParsed;
  public authenticated = true;
  private mixpanelDistinctId: string;

  constructor(options: KeycloakInstanceFakeOptions) {
    const { userId, mixpanelDistinctId } = options;

    this.tokenParsed = { sub: userId };
    this.mixpanelDistinctId = mixpanelDistinctId;
  }

  public init(
    _?: KeycloakInitOptions,
  ): KeycloakPromise<boolean, KeycloakError> {
    return null;
  }

  public login(_?: KeycloakLoginOptions): KeycloakPromise<void, void> {
    return null;
  }

  public logout(_?: any): KeycloakPromise<void, void> {
    return null;
  }

  public register(_?: any): KeycloakPromise<void, void> {
    return null;
  }

  public accountManagement(): KeycloakPromise<void, void> {
    return null;
  }

  public createLoginUrl(_?: KeycloakLoginOptions): string {
    return null;
  }

  public createLogoutUrl(_?: any): string {
    return null;
  }

  public createRegisterUrl(_?: KeycloakLoginOptions): string {
    return null;
  }

  public createAccountUrl(): string {
    return null;
  }

  public isTokenExpired(_?: number): boolean {
    return null;
  }

  public updateToken(_: number): KeycloakPromise<boolean, boolean> {
    return null;
  }

  public clearToken(): void {
    return null;
  }

  public hasRealmRole(_: string): boolean {
    return null;
  }

  public hasResourceRole(__: string, _?: string): boolean {
    return null;
  }

  public loadUserProfile(): KeycloakPromise<any, void> {
    return {
      success: (callback: KeycloakPromiseCallback<any>) => {
        callback({
          attributes: {
            mixpanelDistinctId: [this.mixpanelDistinctId],
          },
        });
        return {
          success: (): KeycloakPromise<KeycloakProfile, void> =>
            this.loadUserProfile(),
          error: () => this.loadUserProfile(),
        };
      },
      error: () => this.loadUserProfile(),
    };
  }

  public loadUserInfo(): KeycloakPromise<{}, void> {
    return null;
  }
}
