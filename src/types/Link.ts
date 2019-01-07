import URI from 'urijs';
import 'urijs/src/URITemplate';

export class Link {
  private link: RawLink;

  constructor(link: RawLink) {
    this.link = link;
  }

  public getOriginalLink() {
    return this.link.href;
  }

  public getTemplatedLink(paramKeysValues: any): string {
    return URI.expand(this.link.href, paramKeysValues).href();
  }
}

export interface RawLink {
  href: string;
  templated?: boolean;
}
