import {Reducer} from 'redux';
import {storeLinksAction} from '../config/ConfigLoader';
import createReducer from '../redux/createReducer';
import {Links} from './Links';

export const linksReducer: Reducer<Links> = createReducer<Links>(null, [storeLinksAction, (_, action) => action.payload]);
