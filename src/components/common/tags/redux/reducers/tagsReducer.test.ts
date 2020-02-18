import { Link } from 'src/types/Link';
import { fetchedTagsAction } from '../actions/fetchedTagsAction';
import { tagsReducer } from './tagsReducer';

test('reduces tags', () => {
  const action = fetchedTagsAction([
    {
      id: '1',
      label: 'French',
      links: {
        self: new Link({ href: 'https://api.example.com/v1/videos/177/tag' }),
      },
    },
  ]);

  const stateAfter = tagsReducer([], action);

  expect(stateAfter).toHaveLength(1);
  expect(stateAfter[0].id).toBe('1');
  expect(stateAfter[0].label).toBe('French');
  expect(stateAfter[0].links.self).toEqual({
    link: {
      href: 'https://api.example.com/v1/videos/177/tag',
    },
  });
});
