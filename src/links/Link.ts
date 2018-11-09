export class Link {
  private link: RawLink;

  constructor(link: RawLink) {
    this.link = link;
  }

  public getLink(params?: any) {
    let link = this.link.href;
    if (process.env.NODE_ENV === 'development') {
      link = link.replace('localhost:8080', 'localhost:8081');
      link = link.replace(
        'https://video-service.staging-boclips.com',
        'http://localhost:8081',
      );
    }
    if (this.link.templated) {
      if (params && this.containsAllTemplatedParams(params)) {
        return this.getAllParams().reduce(
          (prev, current) => prev.replace(`{${current}}`, params[current]),
          link,
        );
      }
      throw new Error('Templated link requires params {search:"value"}');
    } else {
      if (params) {
        throw new Error('Non templated link does not support params');
      }
      return link;
    }
  }

  private containsAllTemplatedParams(params: any) {
    return this.getAllParams()
      .map(param => params.hasOwnProperty(param))
      .reduce((previousValue, currentValue) => previousValue && currentValue);
  }

  public getAllParams(): string[] {
    return this.link.href.match(/[^{\}]+(?=})/g);
  }
}

interface RawLink {
  href: string;
  templated?: boolean;
}
