import {
  Action as ReduxAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from 'redux';

export const actionCreatorFactory: <P>(type: string) => ActionCreator<P> = <P>(
  type: string,
) => {
  const actionFactory = (payload: P) => ({ type, payload });
  (actionFactory as any).type = type;
  (actionFactory as any).toString = () => type;
  return actionFactory as ActionCreator<P>;
};

export const actionCreatorFactoryVoid: (type: string) => ActionCreator0 = (
  type: string,
) => actionCreatorFactory<never>(type) as ActionCreator0;

export interface Action<P> {
  type: string;
  payload: P;
}

export interface ActionCreator<Payload> {
  type: string;

  (payload: Payload): Action<Payload>;
}

export interface ActionCreator0 {
  type: string;

  (): Action<never>;
}

export type InterceptImpl<P> = (store: MiddlewareAPI, payload: P) => void;

export type SideEffect = <P>(
  actionCreator: ActionCreator<P>,
  impl: InterceptImpl<P>,
) => Middleware;

export const sideEffect: SideEffect = <P>(
  actionCreator: ActionCreator<P>,
  impl: InterceptImpl<P>,
) => (store: MiddlewareAPI) => (next: Dispatch) => (
    action: ReduxAction,
  ): any => {
    const result = next(action);
    if (action.type === actionCreator.type) {
      const actionWithPayload = (action as any) as Action<P>;
      impl((store as any) as MiddlewareAPI, actionWithPayload.payload);
    }
    return result;
  };

export interface SE<T = never> extends InterceptImpl<T> {}
