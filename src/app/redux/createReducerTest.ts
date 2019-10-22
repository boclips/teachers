import { actionCreatorFactory, actionCreatorFactoryVoid } from './actions';
import createReducerWithInitialState, { ActionHandler } from './createReducer';

it('throws when initial state is undefined', () => {
  expect(() => {
    createReducerWithInitialState(undefined);
  }).toThrowError();
});

it('throws when there are multiple handlers for the same action type', () => {
  const handler1: ActionHandler<string, number> = [
    actionCreatorFactoryVoid('ABC'),
    (s: string) => s,
  ];
  const handler2: ActionHandler<string, number> = [
    actionCreatorFactoryVoid('ABC'),
    (s: string) => s,
  ];
  expect(() => {
    createReducerWithInitialState('', handler1, handler2);
  }).toThrowError();
});

describe('reducer', () => {
  function reduce(s: string, n: number): string {
    return s + n;
  }

  const h: ActionHandler<string, number> = [
    actionCreatorFactory<number>('CONCAT'),
    reduce,
  ];

  const reducer = createReducerWithInitialState<string>('', h);

  it('returns initial state when current state undefined', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual('');
  });

  it('returns current state when action does not match', () => {
    expect(reducer('3', { type: '@@OTHER' })).toEqual('3');
  });

  it('delegates to a handler when action matches', () => {
    expect(reducer('4', { type: 'CONCAT', payload: '5' })).toEqual('45');
  });
});
