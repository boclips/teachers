import queryString from 'query-string';

export class Link {
  private link: RawLink;

  constructor(link: RawLink) {
    this.link = link;
  }

  public getLink(paramKeysValues?: any) {
    const templateUrl = this.link.href;

    if (this.link.templated) {
      const { url, query } = queryString.parseUrl(templateUrl);

      const baseUrl = this.interpolateBaseUrl(url, paramKeysValues);
      const newQuery = this.interpolateQueryString(query, paramKeysValues);

      if (newQuery === '') {
        return baseUrl;
      } else {
        return baseUrl + '?' + newQuery;
      }
    } else {
      if (paramKeysValues) {
        throw new Error('Non templated link does not support params');
      }
      return templateUrl;
    }
  }

  private interpolateQueryString(query: any, paramKeysValues: any) {
    const queryAcc = {};
    Object.getOwnPropertyNames(query).forEach(name => {
      if (paramKeysValues && paramKeysValues.hasOwnProperty(name)) {
        queryAcc[name] = paramKeysValues[name];
      } else {
        throw new Error(`Templated link requires missing param ${name}`);
      }
    });
    return queryString.stringify(queryAcc);
  }

  private interpolateBaseUrl(url: any, paramKeysValues: any) {
    const urlParts = url.split('/');
    const newParts = urlParts.map(part => {
      if (part.match(/^{.*}$/)) {
        const key = part.substring(1).substring(0, part.length - 2);
        return key.length > 0 ? paramKeysValues[key] : part;
      } else {
        return part;
      }
    });
    return newParts.join('/');
  }
}

interface RawLink {
  href: string;
  templated?: boolean;
}
