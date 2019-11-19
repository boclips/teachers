import { actionCreatorFactory } from '../../../../app/redux/actions';

export const fetchVideoAction = actionCreatorFactory<string>('FETCH_VIDEO');
