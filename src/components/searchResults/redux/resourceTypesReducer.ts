import { Reducer } from 'redux';
import createReducerWithInitialState from 'src/app/redux/createReducer';
import { ResourceType } from 'src/types/ResourceType';

export const resourceTypesReducer: Reducer<
  ResourceType[]
> = createReducerWithInitialState<ResourceType[]>([
  { value: 'ACTIVITY', label: 'Activity' },
  { value: 'LESSON_PLAN', label: 'Lesson Guide' },
]);
