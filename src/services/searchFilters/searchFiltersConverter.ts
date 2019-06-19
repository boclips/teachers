import queryString from 'query-string';
import { SearchFiltersParameters } from '../../types/SearchFiltersParameters';

export default class SearchFiltersConverter {
  public fromSearchUrl(searchUrl: string): SearchFiltersParameters {
    const parsedUrl = queryString.parse(searchUrl);

    return {
      durationMin: +parsedUrl.duration_min || null,
      durationMax: +parsedUrl.duration_max || null,
    };
  }
}
