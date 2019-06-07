/* tslint:disable:no-string-literal */
import axios from 'axios';
import AxiosLogger from 'axios-logger';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import eventually from './test-support/eventually';
import MockFetchVerify from './test-support/MockFetchVerify';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  (axios.interceptors.request as any).handlers = [];
  (axios.interceptors.request as any).use(AxiosLogger.requestLogger);

  MockFetchVerify.clear();
});

jest.mock('react', () => {
  const r = jest.requireActual('react');
  return { ...r, memo: x => x };
});

// JSDom doesn't implement scrollTo
window.scrollTo = jest.fn();

export async function waitForElement(selector: string) {
  await eventually(() => {
    expect(findElement(selector)).toBeTruthy();
  });

  return findElement(selector);
}

export function findElement(selector: string) {
  return global['document'].querySelector(selector);
}