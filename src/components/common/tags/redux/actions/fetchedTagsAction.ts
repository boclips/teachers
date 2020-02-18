import { actionCreatorFactory } from 'src/app/redux/actions';
import { Tag } from 'src/types/Tag';

export const fetchedTagsAction = actionCreatorFactory<Tag[]>('TAGS_FETCHED');
