import { ReactWrapper } from 'enzyme';
import { By } from './By';

export function findOne(wrapper: ReactWrapper, dataQa: string, tag?: string) {
  const result: ReactWrapper = wrapper.find(By.dataQa(dataQa, tag)).hostNodes();

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

export function search(query: string) {
  console.log('push to ', query);
}
