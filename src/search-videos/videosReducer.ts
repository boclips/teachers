import {Reducer} from 'redux';
import createReducer from '../redux/createReducer';
import {storeVideosAction} from './searchVideosMiddleware';
import {Video} from './Video';

export const videosReducer: Reducer<Video[]> = createReducer([], [storeVideosAction, (_, action) => action.payload]);
