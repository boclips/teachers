import queryString from 'query-string';
import { SearchFiltersParameters } from '../../types/SearchFiltersParameters';

export default class SearchFiltersConverter {
  public fromSearchUrl(searchUrl: string): SearchFiltersParameters {
    const parsedUrl = queryString.parse(searchUrl);

    return {
      durationMin: +parsedUrl.duration_min || null,
      durationMax: +parsedUrl.duration_max || null,
      ageRangeMin: +parsedUrl.age_range_min || null,
      ageRangeMax: +parsedUrl.age_range_max || null,
      subjects: this.parseSubjects(parsedUrl.subjects),
    };
  }

  private parseSubjects(subjects: string[] | string): string[] {
    if (subjects == null) {
      return [];
    }
    return subjects.toString().split(',');
  }
}
