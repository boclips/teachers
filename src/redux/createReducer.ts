import { Reducer } from 'redux';
import { Action, ActionCreator } from './actions';

export type ActionHandlerFunction<TState, TPayload> = (
  state: TState,
  payload: TPayload,
) => TState;

export type ActionHandler<TState, TPayload> = [
  ActionCreator<TPayload>,
  ActionHandlerFunction<TState, TPayload>
];

export function actionHandler<TState, TPayload>(
  action: ActionCreator<TPayload>,
  handler: ActionHandlerFunction<TState, TPayload>,
): ActionHandler<TState, TPayload> {
  return [action, handler];
}

export default function createReducer<TState>(
  initialState: TState,
  ...handlers: Array<ActionHandler<TState, any>>
): Reducer<TState> {
  if (initialState === undefined) {
    throw new Error('Initial state must not be undefined');
  }

  const handlersMap: { [type: string]: Reducer<TState> } = {};
  handlers.forEach(([action, handler]) => {
    const type = action.type;
    if (handlersMap.hasOwnProperty(type)) {
      throw new Error(`Two handlers for one action type: ${type}`);
    }
    return (handlersMap[type] = handler);
  });

  return function reducer(state: TState = initialState, action: Action<any>) {
    if (handlersMap.hasOwnProperty(action.type)) {
      return handlersMap[action.type](state, action.payload);
    } else {
      return state;
    }
  };
}
