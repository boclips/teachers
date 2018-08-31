import {Reducer} from 'redux';
import {Action, ActionCreator} from './actions';

export type ReducerDefinedState<TState, TPayload> = (state: TState, action: Action<TPayload>) => TState;

export type Handler<TState, TPayload> = [ActionCreator<TPayload>, ReducerDefinedState<TState, TPayload>];

export default function createReducer<TState>(initialState: TState, ...handlers: Array<Handler<TState, any>>): Reducer<TState> {

  if (initialState === undefined) {
    throw new Error('Initial state must not be undefined');
  }

  const handlersMap: { [type: string]: Reducer<TState> } = {};
  handlers.forEach(([action, handler]) => {
    const type = action.type;
    if (handlersMap.hasOwnProperty(type)) {
      throw new Error(`Two handlers for one action type: ${type}`);
    }
    return handlersMap[type] = handler;
  });

  return function reducer(state: TState = initialState, action: Action<any>) {
    if (handlersMap.hasOwnProperty(action.type)) {
      return handlersMap[action.type](state, action);
    } else {
      return state;
    }
  };
}
