import { Reducer } from 'redux';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../../app/redux/createReducer';
import { Tag } from '../../../../../types/Tag';
import { fetchedTagsAction } from '../actions/fetchedTagsAction';

export const tagsReducer: Reducer<Tag[]> = createReducerWithInitialState(
  [],
  actionHandler(fetchedTagsAction, (_: Tag[], tags: Tag[]) => tags),
);
