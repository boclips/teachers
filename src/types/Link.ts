import URI from 'urijs';
import 'urijs/src/URITemplate';
import { Link as ApiLink } from 'boclips-api-client/dist/types';

export class Link {
  private link: RawLink;

  public constructor(link: RawLink) {
    this.link = link;
  }

  public getOriginalLink() {
    return this.link.href;
  }

  public get isTemplated(): boolean {
    return this.link.templated === true;
  }

  public getTemplatedLink(paramKeysValues: {
    [paramName: string]: any;
  }): string {
    return URI.expand(this.link.href, paramKeysValues).href();
  }
}

export interface RawLink {
  href: string;
  templated?: boolean;
}

export const convertToApiClientLink = (link: Link): ApiLink =>
  new ApiLink({ href: link.getOriginalLink() });
