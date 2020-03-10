import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { cleanup } from '@testing-library/react';
import FakeBoclipsAnalytics from './src/services/analytics/boclips/FakeBoclipsAnalytics';
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

// create window object
declare const window: any;

// JSDom doesn't implement scrollTo
window.scrollTo = jest.fn();

// This is mocking the Appcues import from index.html
window.Appcues = {
  page: jest.fn(),
  identify: jest.fn(),
  track: jest.fn(),
};

window.open = jest.fn();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export async function waitForElement(selector: string) {
  await eventually(() => {
    expect(findElement(selector)).toBeTruthy();
  });

  return findElement(selector);
}

export function findElement(selector: string) {
  return (global as any).document.querySelector(selector);
}

jest.mock(
  './src/services/analytics/boclips/BoclipsAnalytics',
  () => FakeBoclipsAnalytics,
);

beforeEach(() => {
  FakeBoclipsAnalytics.reset();
});

afterEach(() => {
  cleanup();
  document.body.outerHTML = '';
});

// Setup for using @testing-library/react and @testing-library/dom
configure({ testIdAttribute: 'data-qa' });
