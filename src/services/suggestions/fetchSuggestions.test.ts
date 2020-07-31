import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeSuggestionsClient } from 'boclips-api-client/dist/sub-clients/suggestions/client/FakeSubjectsClient';
import { fetchSuggestions } from 'src/services/suggestions/fetchSuggestions';
import { Suggestions } from 'boclips-api-client/dist/sub-clients/suggestions/model/Suggestions';

const getFakeBoclipsClient: () => Promise<FakeBoclipsClient> = async () => {
  const client = await ApiClientWrapper.get();

  return client as FakeBoclipsClient;
};

test('fetch suggestions', async () => {
  const suggestionsClient: FakeSuggestionsClient = (
    await getFakeBoclipsClient()
  ).suggestions;

  const populatedSuggestions: Suggestions = {
    suggestionTerm: 'his',
    channels: [
      {
        name: 'The History Channel',
      },
      {
        name: 'Crash Course History',
      },
    ],
    subjects: [
      {
        id: 'subject-id-one',
        name: 'Art History',
      },
      {
        id: 'subject-id-two',
        name: 'History',
      },
    ],
  };

  suggestionsClient.populate(populatedSuggestions);

  const suggestions = await fetchSuggestions('his');

  expect(suggestions.channels).toHaveLength(2);
  expect(suggestions.subjects).toHaveLength(2);
});
