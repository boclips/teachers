/* tslint:disable:no-string-literal */
import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { JSDOM } from 'jsdom';
import * as React from 'react';
import MockFetchVerify from './test-support/MockFetchVerify';

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

jest.mock('boclips-react-player', () => ({
  BoclipsPlayer: () => <div id="a-player" />,
}));

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    );
  Object.defineProperties(target, props);
}

global['window'] = window;
global['document'] = window.document;
global['navigator'] = {
  userAgent: 'node.js',
};
copyProps(window, global);

beforeEach(() => {
  (axios.interceptors.request as any).handlers = [];
  MockFetchVerify.clear();
});

jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: x => x };
});
