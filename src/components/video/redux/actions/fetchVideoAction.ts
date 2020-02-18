import { actionCreatorFactory } from 'src/app/redux/actions';

export const fetchVideoAction = actionCreatorFactory<string>('FETCH_VIDEO');
