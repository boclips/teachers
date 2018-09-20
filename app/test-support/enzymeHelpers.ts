import Search from 'antd/lib/input/Search';
import { ReactWrapper } from 'enzyme';
import { By } from './By';

export function findOne(wrapper: ReactWrapper, dataQa: string, tag?: string) {
  const result: ReactWrapper = wrapper.find(By.dataQa(dataQa, tag));

  if (result.length !== 1) {
    throw new Error(`Found ${result.length} elements with data-qa=${dataQa}`);
  }

  return result;
}

export function findAll(wrapper: ReactWrapper, dataQa: string) {
  const results = wrapper.find(By.dataQa(dataQa));

  if (results.length === 0) {
    throw new Error(`Could not find element with data-qa=${dataQa}`);
  }

  return results;
}

export function enterKeys(element: ReactWrapper, value: string) {
  const isInput = element.find('input');

  if (!isInput.exists()) {
    throw new Error('Cannot enter keys on elements that are not input');
  }

  element.simulate('change', {
    target: { value },
  });
}

export function click(element: ReactWrapper) {
  element.simulate('click', { button: 0 });
}

export function submit(element: ReactWrapper) {
  element.simulate('submit');
}

export function search(element: ReactWrapper, query: string) {
  const searchElement = element.find(Search);

  if (!searchElement.exists()) {
    throw new Error(`Cannot find antd Search element in ${element.debug()}`);
  }

  const onSearch = searchElement.prop('onSearch');

  if (typeof onSearch !== 'function') {
    throw new Error(
      `onSearch prop is not a function in ${searchElement.debug()}`,
    );
  }

  onSearch(query);
}

export function login(element: ReactWrapper, username: string, password) {
  const usernameInput = element.find(By.dataQa('username-input', 'input'));
  const passwordInput = element.find(By.dataQa('password-input', 'input'));

  if (!usernameInput.exists()) {
    throw new Error(`Cannot find username input in ${element.debug()}`);
  }
  if (!passwordInput.exists()) {
    throw new Error(`Cannot find password input in ${element.debug()}`);
  }

  enterKeys(usernameInput, username);
  enterKeys(passwordInput, password);
  submit(element.find(By.dataQa('login-form', 'form')));
}
