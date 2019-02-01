import React from 'react';
import withNewsNavigation, {
  NewsNavigationProps,
} from '../../common/higerOrderComponents/withNewsNavigation';
import { TabNames, TabsComponent } from './TabsComponent';

export class TabsContainer extends React.Component<NewsNavigationProps> {
  private onTabsChange = (targetTab: string) => {
    switch (targetTab) {
      case TabNames.NEWS:
        this.props.goToNewsResults();
        return;
      case TabNames.MAIN:
        this.props.goToSearchResults();
        return;
      default:
        console.error(`Cannot find an action for: ${targetTab} tab`);
    }
  };

  public render() {
    return (
      <TabsComponent
        isNewsMode={this.props.isNewsMode}
        onTabChange={this.onTabsChange}
        tabs={[TabNames.MAIN, TabNames.NEWS]}
      />
    );
  }
}

export default withNewsNavigation(TabsContainer);
