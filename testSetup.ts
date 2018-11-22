/* tslint:disable:no-string-literal */
import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { JSDOM } from 'jsdom';
import MockFetchVerify from './test-support/MockFetchVerify';

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

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
