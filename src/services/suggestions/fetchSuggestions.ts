import { ApiClientWrapper } from 'src/services/apiClient';
import { Suggestions } from 'boclips-api-client/dist/sub-clients/suggestions/model/Suggestions';

export async function fetchSuggestions(query: string): Promise<Suggestions> {
  const client = await ApiClientWrapper.get();

  return client.suggestions.suggest(query);
}
