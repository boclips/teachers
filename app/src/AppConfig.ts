export default class AppConfig {
  public static getHost() {
    return (
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
    );
  }
}
