import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../../app/redux/createReducer';
import { Tag } from '../../../../../types/Tag';
import { fetchedTagsAction } from '../actions/fetchedTagsAction';

export const tagsReducer: Reducer<Tag[]> = createReducer(
  [],
  actionHandler(fetchedTagsAction, (_: Tag[], tags: Tag[]) => {
    return tags;
  }),
);
