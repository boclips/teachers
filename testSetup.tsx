/* tslint:disable:no-string-literal */
import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import * as React from 'react';
import MockFetchVerify from './test-support/MockFetchVerify';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('boclips-react-player', () => ({
  BoclipsPlayer: () => <div id="a-player" />,
}));

beforeEach(() => {
  (axios.interceptors.request as any).handlers = [];
  MockFetchVerify.clear();
});

jest.mock('react', () => {
  const r = jest.requireActual('react');
  return { ...r, memo: x => x };
});
