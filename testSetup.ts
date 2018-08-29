import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
/* tslint:disable:no-string-literal */
global['window'] = window;
global['document'] = window.document;
global['navigator'] = {
  userAgent: 'node.js',
};
/* tslint:enable:no-string-literal */
copyProps(window, global);
