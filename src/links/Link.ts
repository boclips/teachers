export class Link {
  private link: RawLink;

  constructor(link: RawLink) {
    this.link = link;
  }

  public getLink(params?: any) {
    if (this.link.templated) {
      if (params && this.containsAllTemplatedParams(params)) {
        return this.getAllParams()
          .reduce((prev, current) => prev.replace(`{${current}}`, params[current]), this.link.href);
      }
      throw new Error('Templated link requires params {search:"value"}');
    } else {
      if (params) {
        throw new Error('Non templated link does not support params');
      }
      return this.link.href;
    }
  }

  private containsAllTemplatedParams(params: any) {
    return this.getAllParams()
      .map((param) => params.hasOwnProperty(param))
      .reduce(((previousValue, currentValue) => previousValue && currentValue));
  }

  public getAllParams(): string[] {
    return this.link.href.match(/[^{\}]+(?=})/g);
  }
}

interface RawLink {
  href: string;
  templated?: boolean;
}
