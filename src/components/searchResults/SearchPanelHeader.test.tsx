import { render } from '@testing-library/react';
import { SearchPanelHeader } from 'src/components/searchResults/SearchPanelHeader';
import { noOp } from 'src/utils';
import React from 'react';

describe('SearchPanelHeader', () => {
  it('Says "1 result found" when count is equal to 1', () => {
    const wrapper = render(
      <SearchPanelHeader totalElements={1} onOpenFilterDrawer={noOp} />,
    );

    expect(wrapper.getByText('1 result found')).toBeVisible();
  });
  it('Says "x results found" when count is greater than 1', () => {
    const wrapper = render(
      <SearchPanelHeader totalElements={10} onOpenFilterDrawer={noOp} />,
    );

    expect(wrapper.getByText('10 results found')).toBeVisible();
  });

  it('Says "500 results found" when count is greater than 500', () => {
    const wrapper = render(
      <SearchPanelHeader totalElements={510} onOpenFilterDrawer={noOp} />,
    );

    expect(wrapper.getByText('500 results found')).toBeVisible();
  });

  it('Does not display search count when count is 0', () => {
    const wrapper = render(
      <SearchPanelHeader totalElements={0} onOpenFilterDrawer={noOp} />,
    );

    expect(wrapper.queryByTestId('search-count')).toBeNull();
  });
  it('Renders a filter button', () => {});
});
