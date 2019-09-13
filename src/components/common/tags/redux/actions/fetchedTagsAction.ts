import { actionCreatorFactory } from '../../../../../app/redux/actions';
import { Tag } from '../../../../../types/Tag';

export const fetchedTagsAction = actionCreatorFactory<Tag[]>('TAGS_FETCHED');
