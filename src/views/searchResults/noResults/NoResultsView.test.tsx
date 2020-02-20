import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import NoResultsView from './NoResultsView';

describe('no results view', () => {
  let noResultsView: ReactWrapper;

  beforeEach(() => {
    noResultsView = mount(<NoResultsView query={'noresult'} />);

    noResultsView.update();
  });

  it('renders a message', () => {
    expect(
      noResultsView.find(By.dataQa('search-zero-results')).text(),
    ).toBeDefined();

    expect(noResultsView.find('.description').text()).toBeDefined();
  });
});
