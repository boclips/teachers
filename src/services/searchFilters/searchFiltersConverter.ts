import queryString from 'query-string';
import { SearchFiltersParameters } from 'src/types/SearchFiltersParameters';

export default class SearchFiltersConverter {
  public fromSearchUrl(searchUrl: string): SearchFiltersParameters {
    const parsedUrl = queryString.parse(searchUrl);

    return {
      durationMin: +parsedUrl.duration_min || null,
      durationMax: +parsedUrl.duration_max || null,
      ageRangeMin: +parsedUrl.age_range_min || null,
      ageRangeMax: +parsedUrl.age_range_max || null,
      subject: this.parseSubjects(parsedUrl.subject),
    };
  }

  private parseSubjects(subject: string[] | string): string[] {
    if (subject == null) {
      return [];
    }
    return subject.toString().split(',');
  }
}
