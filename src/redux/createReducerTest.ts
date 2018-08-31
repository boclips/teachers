import {Reducer} from '';
import {Action, actionCreatorFactory, actionCreatorFactoryVoid} from './actions';
import createReducer, {Handler} from './createReducer';

it('throws when initial state is undefined', () => {
  expect(() => {
    createReducer(undefined);
  }).toThrowError();
});

it('throws when there are multiple handlers for the same action type', () => {
  const handler1: Handler<string, number> = [actionCreatorFactoryVoid('ABC'), (s: string) => s];
  const handler2: Handler<string, number> = [actionCreatorFactoryVoid('ABC'), (s: string) => s];
  expect(() => {
    createReducer('', handler1, handler2);
  }).toThrowError();
});

describe('reducer', () => {

  const r: Reducer<string, Action<number>> = (s: string, a: Action<number>) => s + a.payload;

  const h: Handler<string, number> = [actionCreatorFactory<number>('CONCAT'), r];

  const reducer = createReducer<string>('', h);

  it('returns initial state when current state undefined', () => {
    expect(reducer(undefined, {type: '@@INIT'})).toEqual('');
  });

  it('returns current state when action does not match', () => {
    expect(reducer('3', {type: '@@OTHER'})).toEqual('3');
  });

  it('delegates to a handler when action matches', () => {
    expect(reducer('4', {type: 'CONCAT', payload: '5'})).toEqual('45');
  });

});
