import { Reducer } from 'redux';
import { Tag } from 'src/types/Tag';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../../app/redux/createReducer';
import { fetchedTagsAction } from '../actions/fetchedTagsAction';

export const tagsReducer: Reducer<Tag[]> = createReducerWithInitialState(
  [],
  actionHandler(fetchedTagsAction, (_: Tag[], tags: Tag[]) => tags),
);
